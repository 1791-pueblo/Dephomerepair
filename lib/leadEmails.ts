import type { LeadResult } from './leadScoring';

/** What the customer submitted on /quote (photos travel separately as attachments). */
export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  location: string;
  urgency: string;
  contactMethod: string;
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const URGENCY_LABEL: Record<string, string> = {
  emergency: 'Emergency (today)',
  urgent: 'Within a few days',
  normal: 'Within 1–2 weeks',
  flexible: 'Flexible',
};

const OUTCOME_LABEL: Record<LeadResult['outcome'], string> = {
  book: 'Shown the booking step',
  confirm: 'Told we will reach out to confirm details',
  decline: 'Shown the polite "not a fit" message',
};

/** Notification to Jason with the lead, score and suggested reply. */
export function leadNotification(lead: QuoteRequest, result: LeadResult, photoCount: number) {
  const subject = `[${result.quality} ${result.score}] New quote request: ${lead.service} in ${lead.location} (${lead.name})`;
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email || '(none)'],
    ['Prefers', lead.contactMethod],
    ['Service', lead.service],
    ['Location', lead.location],
    ['Urgency', URGENCY_LABEL[lead.urgency] || lead.urgency],
    ['Photos', photoCount ? `${photoCount} attached` : 'none'],
  ];
  const text = [
    `Score: ${result.score}/100 (${result.quality}) · Booking probability ${result.bookingProbability}`,
    `Area: ${result.areaFit}${result.notAFit ? ` · Not a fit: ${result.notAFit}` : ''}`,
    `Customer saw: ${OUTCOME_LABEL[result.outcome]}`,
    `Next step: ${result.nextStep}`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Description:',
    lead.description,
    '',
    'Why this score:',
    ...result.reasons.map((r) => `- ${r}`),
    '',
    'Suggested reply:',
    result.suggestedReply,
  ].join('\n');

  const phoneDigits = lead.phone.replace(/\D/g, '');
  const html = `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#1A1A1A;max-width:640px">
  <h2 style="margin:0 0 4px">${esc(result.quality)} lead · ${result.score}/100</h2>
  <p style="margin:0 0 12px;color:#424242">Booking probability ${esc(result.bookingProbability)} · Area: ${esc(result.areaFit)}${result.notAFit ? ` · <b>Not a fit:</b> ${esc(result.notAFit)}` : ''}<br>Customer saw: ${esc(OUTCOME_LABEL[result.outcome])}</p>
  <p style="background:#FFF7E0;border:1px solid #FFAB00;border-radius:8px;padding:10px"><b>Next step:</b> ${esc(result.nextStep)}</p>
  <table style="border-collapse:collapse;margin:12px 0">
    ${rows.map(([k, v]) => `<tr><td style="padding:3px 12px 3px 0;color:#666">${esc(k)}</td><td style="padding:3px 0"><b>${esc(v)}</b></td></tr>`).join('')}
  </table>
  <p><a href="tel:${phoneDigits}">Call</a> · <a href="sms:${phoneDigits}">Text</a>${lead.email ? ` · <a href="mailto:${esc(lead.email)}">Email</a>` : ''}</p>
  <h3 style="margin:16px 0 4px">Description</h3>
  <p style="white-space:pre-wrap;margin:0">${esc(lead.description)}</p>
  <h3 style="margin:16px 0 4px">Why this score</h3>
  <ul style="margin:0;padding-left:18px">${result.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
  <h3 style="margin:16px 0 4px">Suggested reply</h3>
  <p style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:10px;white-space:pre-wrap">${esc(result.suggestedReply)}</p>
</div>`;
  return { subject, text, html };
}

/**
 * DRAFT customer auto-confirmation. Off unless LEAD_AUTOREPLY_ENABLED=true.
 * Jason must approve this wording before it is turned on.
 */
export function customerAutoReply(lead: QuoteRequest, result: LeadResult, bookingUrl: string) {
  const firstName = lead.name.trim().split(' ')[0] || 'there';
  const subject = 'We got your request: DEP Home Repair';
  let middle: string;
  if (result.outcome === 'book' && bookingUrl) {
    middle = `It looks like a good fit. You can pick a time for your estimate here: ${bookingUrl}\nIf none of those times work, just reply to this email or text us.`;
  } else if (result.outcome === 'book') {
    middle = `It looks like a good fit. We'll text you within one business day to set up a time.`;
  } else if (result.outcome === 'confirm') {
    middle = `We'll reach out within one business day to confirm a few details before we schedule.`;
  } else {
    middle = `From what you described, this one may be outside the work we do or the area we cover. We'll take a look and let you know either way.`;
  }
  const text = [
    `Hi ${firstName},`,
    '',
    `Thanks for reaching out to DEP Home Repair. We received your request for ${lead.service.toLowerCase()} in ${lead.location}.`,
    '',
    middle,
    '',
    'If it is urgent, call or text us at 602-598-1988.',
    '',
    'DEP Home Repair',
    'Chandler, Gilbert, southwest Mesa & south Scottsdale',
    'Not a licensed contractor. Jobs are kept under $1,000 total, labor and materials, with no permits.',
  ].join('\n');
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1A1A1A;max-width:560px;white-space:pre-wrap">${esc(text).replace(
    esc(bookingUrl || '\u0000'),
    `<a href="${esc(bookingUrl)}">${esc(bookingUrl)}</a>`,
  )}</div>`;
  return { subject, text, html };
}
