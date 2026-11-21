import { NextResponse } from 'next/server';
import { QUOTE_SERVICE_OPTIONS, URGENCY_OPTIONS, scoreLead } from '../../../lib/leadScoring';
import { customerAutoReply, leadNotification, type QuoteRequest } from '../../../lib/leadEmails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTACT_METHODS = ['Text', 'Call', 'Email'];
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 900_000; // per photo after client resize (base64 decoded)
const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot

// Best-effort in-memory rate limit: 5 submissions per IP per 10 minutes (resets on cold start).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

type Photo = { filename: string; content: string };

async function sendEmail(payload: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: 'RESEND_API_KEY not set' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { sent: false, reason: `Resend ${res.status}: ${(await res.text()).slice(0, 300)}` };
    return { sent: true, reason: '' };
  } catch (err) {
    return { sent: false, reason: `Resend request failed: ${(err as Error).message}` };
  }
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please call or text 602-598-1988.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Spam traps: hidden honeypot field, and a form filled in impossibly fast.
  // Answer like a normal success so bots learn nothing, but don't score or notify.
  const startedAt = Number(body.startedAt) || 0;
  if (str(body.website, 200) || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    console.warn('[lead] spam trap hit', { ip, honeypot: !!str(body.website, 200), fillMs: startedAt ? Date.now() - startedAt : null });
    return NextResponse.json({ ok: true, outcome: 'confirm', firstName: '' });
  }

  const lead: QuoteRequest = {
    name: str(body.name, 80),
    phone: str(body.phone, 30),
    email: str(body.email, 120),
    service: str(body.service, 60),
    description: str(body.description, 1500),
    location: str(body.location, 80),
    urgency: str(body.urgency, 20),
    contactMethod: str(body.contactMethod, 10),
  };

  const errors: string[] = [];
  if (lead.name.length < 2) errors.push('name');
  if (lead.phone.replace(/\D/g, '').length < 10) errors.push('phone');
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.push('email');
  if (lead.contactMethod === 'Email' && !lead.email) errors.push('email');
  if (!QUOTE_SERVICE_OPTIONS.includes(lead.service)) errors.push('service');
  if (lead.description.length < 10) errors.push('description');
  if (lead.location.length < 2) errors.push('location');
  if (!URGENCY_OPTIONS.some((o) => o.value === lead.urgency)) errors.push('urgency');
  if (!CONTACT_METHODS.includes(lead.contactMethod)) errors.push('contactMethod');
  if (/https?:\/\/|www\./i.test(`${lead.name} ${lead.location}`)) errors.push('spam');
  if ((lead.description.match(/https?:\/\//gi) || []).length > 2) errors.push('spam');
  if (errors.length) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', fields: errors }, { status: 400 });
  }

  // Photos: client-resized JPEG data URLs, attached to the notification email (not stored anywhere).
  const photos: Photo[] = [];
  if (Array.isArray(body.photos)) {
    for (const [i, p] of body.photos.slice(0, MAX_PHOTOS).entries()) {
      const m = typeof p === 'string' ? p.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/) : null;
      if (!m) continue;
      if ((m[2].length * 3) / 4 > MAX_PHOTO_BYTES) continue;
      photos.push({ filename: `photo-${i + 1}.${m[1] === 'jpeg' ? 'jpg' : m[1]}`, content: m[2] });
    }
  }

  const result = scoreLead({ ...lead, budget: 'unknown' });

  // Always log server-side so a lead is never lost, even without email set up.
  console.log('[lead] new quote request', JSON.stringify({
    at: new Date().toISOString(),
    ...lead,
    photos: photos.length,
    score: result.score,
    quality: result.quality,
    areaFit: result.areaFit,
    notAFit: result.notAFit,
    outcome: result.outcome,
    nextStep: result.nextStep,
  }));

  const from = process.env.LEAD_FROM || 'DEP Home Repair Leads <onboarding@resend.dev>';
  const notifyTo = process.env.LEAD_NOTIFY_TO || 'azdeprepair@gmail.com';
  const note = leadNotification(lead, result, photos.length);
  const notify = await sendEmail({
    from,
    to: notifyTo.split(',').map((s) => s.trim()).filter(Boolean),
    subject: note.subject,
    text: note.text,
    html: note.html,
    ...(lead.email ? { reply_to: lead.email } : {}),
    ...(photos.length ? { attachments: photos } : {}),
  });
  if (!notify.sent) console.warn('[lead] notification email not sent:', notify.reason);

  // Customer auto-confirmation: OFF unless explicitly enabled (wording pending Jason's approval).
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || '';
  if (process.env.LEAD_AUTOREPLY_ENABLED === 'true' && lead.email && process.env.LEAD_FROM) {
    const reply = customerAutoReply(lead, result, bookingUrl);
    const sent = await sendEmail({
      from: process.env.LEAD_FROM,
      to: [lead.email],
      subject: reply.subject,
      text: reply.text,
      html: reply.html,
      reply_to: process.env.LEAD_REPLY_TO || 'info@dephomerepair.com',
    });
    if (!sent.sent) console.warn('[lead] customer auto-reply not sent:', sent.reason);
  }

  return NextResponse.json({
    ok: true,
    outcome: result.outcome,
    firstName: lead.name.split(' ')[0],
  });
}
