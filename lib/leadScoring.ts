/**
 * Shared lead scoring for DEP Home Repair.
 * Used by the internal Lead Qualifier (/lead-qualifier) and the customer quote form API (/api/lead),
 * so a lead scores the same no matter where it comes from.
 */

export interface LeadInput {
  name: string;
  phone: string;
  location: string;
  service: string;
  urgency: string;
  description: string;
  budget: string;
  contactMethod: string;
}

export type LeadQuality = 'High' | 'Medium' | 'Low';
/** in = core area; nearby = East Valley edge or unclear part of Mesa/Scottsdale, confirm first; outside = not served now. */
export type AreaFit = 'in' | 'nearby' | 'outside' | 'unknown';
/** What the customer sees after submitting: booking link, "we'll reach out", or a polite decline. */
export type LeadOutcome = 'book' | 'confirm' | 'decline';

export interface LeadResult {
  score: number;
  quality: LeadQuality;
  reasons: string[];
  suggestedReply: string;
  nextStep: string;
  bookingProbability: string;
  areaFit: AreaFit;
  /** Set when the job is something DEP does not offer (irrigation, carpet, painting, grab bars). */
  notAFit: string | null;
  outcome: LeadOutcome;
}

export const CORE_SERVICES = [
  'Drywall & Finishing',
  'Electrical & Smart Home',
  'Plumbing & Fixtures',
  'Multiple Services',
];

/** Options shown on the internal Lead Qualifier. */
export const QUALIFIER_SERVICE_OPTIONS = [...CORE_SERVICES, 'Other / Unsure'];
/** Options shown on the customer quote form. */
export const QUOTE_SERVICE_OPTIONS = [...CORE_SERVICES, 'Other Small Job'];

export const URGENCY_OPTIONS = [
  { value: 'emergency', label: 'Emergency — need it today' },
  { value: 'urgent', label: 'Urgent — within a few days' },
  { value: 'normal', label: 'Normal — within 1–2 weeks' },
  { value: 'flexible', label: 'Flexible — no rush' },
];

export const BUDGET_OPTIONS = [
  { value: 'under200', label: 'Under $200' },
  { value: '200to500', label: '$200 – $500' },
  { value: '500to1000', label: '$500 – $1,000' },
  { value: 'over1000', label: 'Over $1,000' },
  { value: 'unknown', label: 'Not sure / Open to estimate' },
];

// --- Service area -----------------------------------------------------------
// Core: Chandler, Gilbert, southwest Mesa (roughly 85202 / 85210, Dobson Ranch), south Scottsdale, "East Valley".
// 85213 is kept for future expansion only, so it counts as outside for now.
const CORE_ZIPS = new Set([
  // Chandler
  '85224', '85225', '85226', '85248', '85249', '85286',
  // Gilbert
  '85233', '85234', '85295', '85296', '85297', '85298',
  // Southwest Mesa
  '85202', '85210',
  // South Scottsdale
  '85251', '85257',
]);
const CORE_PLACES = ['chandler', 'gilbert', 'southwest mesa', 'south west mesa', 'sw mesa', 'dobson ranch', 'south scottsdale', 'east valley'];
/** Nearby or ambiguous: worth a quick confirm before booking. */
const NEARBY_PLACES = ['mesa', 'scottsdale', 'tempe', 'ahwatukee', 'sun lakes', 'queen creek'];

export function classifyArea(location: string): { fit: AreaFit; reason: string } {
  const loc = location.toLowerCase().replace(/\s+/g, ' ').trim();
  if (!loc) return { fit: 'unknown', reason: 'No location provided — must confirm service area.' };
  const zip = loc.match(/\b(85\d{3})\b/)?.[1];
  if (zip === '85213') {
    return { fit: 'outside', reason: '85213 is outside the current service area (future expansion only).' };
  }
  if (zip && CORE_ZIPS.has(zip)) {
    return { fit: 'in', reason: `ZIP ${zip} is in the core service area (Chandler / Gilbert / southwest Mesa / south Scottsdale).` };
  }
  if (CORE_PLACES.some((p) => loc.includes(p))) {
    return { fit: 'in', reason: 'Located in core service area (Chandler / Gilbert / southwest Mesa / south Scottsdale / East Valley).' };
  }
  if (/\bnorth(ern)? (mesa|scottsdale)\b/.test(loc)) {
    return { fit: 'outside', reason: 'North Mesa / north Scottsdale is outside the current service area.' };
  }
  if (NEARBY_PLACES.some((p) => loc.includes(p))) {
    return { fit: 'nearby', reason: 'Nearby or unclear part of town — confirm cross streets before booking (southwest Mesa and south Scottsdale only).' };
  }
  if (zip) return { fit: 'outside', reason: `ZIP ${zip} is outside the current service area — confirm.` };
  return { fit: 'outside', reason: 'Location appears outside the current service area — confirm.' };
}

// --- Jobs DEP does not take -------------------------------------------------
export function detectNotAFit(service: string, description: string): string | null {
  const text = `${service} ${description}`.toLowerCase();
  if (/irrigation|sprinkler|drip (line|system|emitter)/.test(text)) return 'Irrigation / sprinkler work is not offered.';
  if (/carpet/.test(text)) return 'Carpet installation is not offered.';
  if (/grab ?bars?/.test(text)) return 'Grab bar installation is not offered.';
  const mentionsPaint = /\b(re)?paint(s|ing|ed|er|ers)?\b/.test(text);
  const patchContext = /patch|hole|drywall|texture|touch[- ]?up/.test(text);
  if (mentionsPaint && !patchContext) return 'Painting is not offered (only touch-up on our own drywall patches).';
  return null;
}

export function scoreLead(input: LeadInput): LeadResult {
  let score = 0;
  const reasons: string[] = [];

  // --- Service fit (0–25) ---
  const fitsService = CORE_SERVICES.includes(input.service);
  if (fitsService) {
    score += input.service === 'Multiple Services' ? 25 : 20;
    reasons.push('Service type matches DEP specialties.');
  } else {
    score += 5;
    reasons.push('Service type may be outside core specialties — verify scope.');
  }

  // --- Location (0–20) ---
  const area = classifyArea(input.location);
  if (area.fit === 'in') score += 20;
  else if (area.fit === 'nearby') score += 12;
  reasons.push(area.reason);

  // --- Urgency (0–20) ---
  if (input.urgency === 'emergency') {
    score += 20;
    reasons.push('Emergency request — high urgency, high booking likelihood.');
  } else if (input.urgency === 'urgent') {
    score += 16;
    reasons.push('Urgent timeline — strong conversion potential.');
  } else if (input.urgency === 'normal') {
    score += 10;
    reasons.push('Normal timeline — good lead, book within the week.');
  } else if (input.urgency === 'flexible') {
    score += 5;
    reasons.push('Flexible timeline — lower urgency, follow up periodically.');
  }

  // --- Description / Detail (0–15) ---
  const wordCount = input.description.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount >= 15) {
    score += 15;
    reasons.push('Detailed description provided — ready for accurate quote.');
  } else if (wordCount >= 6) {
    score += 8;
    reasons.push('Basic description given — consider requesting photos or more detail.');
  } else if (wordCount >= 1) {
    score += 3;
    reasons.push('Minimal description — needs clarification before quoting.');
  } else {
    reasons.push('No job description — request details before proceeding.');
  }

  // --- Budget fit (0–10) ---
  if (input.budget === 'over1000') {
    score += 10;
    reasons.push('High budget expectation — strong job value (check the $1,000 job limit).');
  } else if (input.budget === '500to1000') {
    score += 8;
    reasons.push('Mid-range budget — good fit for most services.');
  } else if (input.budget === '200to500') {
    score += 6;
    reasons.push('Budget in standard service range.');
  } else if (input.budget === 'unknown') {
    score += 5;
    reasons.push('Budget open — educate on pricing during follow-up.');
  } else if (input.budget === 'under200') {
    score += 2;
    reasons.push('Budget may be below minimum service cost — clarify expectations.');
  }

  // --- Contact quality (0–10) ---
  const hasPhone = input.phone.replace(/\D/g, '').length >= 10;
  const hasName = input.name.trim().length > 1;
  if (hasPhone && hasName) {
    score += 10;
    reasons.push('Full contact info provided.');
  } else if (hasPhone || hasName) {
    score += 5;
    reasons.push('Partial contact info — gather missing details.');
  } else {
    reasons.push('No contact info — cannot follow up without name/phone.');
  }

  // --- Fit caps: jobs we don't do, or outside the area, can't score as good leads ---
  const notAFit = detectNotAFit(input.service, input.description);
  if (notAFit) {
    reasons.push(`Not a fit: ${notAFit}`);
    score = Math.min(score, 20);
  } else if (area.fit === 'outside') {
    score = Math.min(score, 35);
  }

  score = Math.min(100, Math.max(1, score));

  // --- Quality classification ---
  let quality: LeadQuality;
  if (score >= 70) quality = 'High';
  else if (score >= 40) quality = 'Medium';
  else quality = 'Low';

  // --- Booking probability ---
  let bookingProbability: string;
  if (score >= 80) bookingProbability = '85–95%';
  else if (score >= 65) bookingProbability = '65–80%';
  else if (score >= 45) bookingProbability = '40–60%';
  else if (score >= 25) bookingProbability = '20–35%';
  else bookingProbability = '<15%';

  // --- Outcome shown to the customer ---
  let outcome: LeadOutcome;
  if (notAFit || area.fit === 'outside') outcome = 'decline';
  else if (score >= 70 && area.fit === 'in') outcome = 'book';
  else outcome = 'confirm';

  // --- Next step ---
  let nextStep: string;
  if (notAFit) {
    nextStep = 'Decline politely — job type is not offered.';
  } else if (area.fit === 'outside') {
    nextStep = 'Decline politely — outside current service area (or confirm cross streets if close).';
  } else if (score >= 70 && area.fit !== 'in') {
    nextStep = 'Confirm cross streets / service area, then book.';
  } else if (score >= 70 && wordCount >= 6) {
    nextStep = 'Book — send availability and confirm appointment.';
  } else if (score >= 70) {
    nextStep = 'Request photos / more detail, then book.';
  } else if (score >= 40 && fitsService) {
    nextStep = 'Follow up within 24 hrs — gather more info before quoting.';
  } else if (score >= 40) {
    nextStep = 'Follow up — clarify scope and confirm service area.';
  } else {
    nextStep = 'Disqualify or low-priority follow-up — does not meet core criteria.';
  }

  // --- Suggested reply (customer-facing, so "we") ---
  const firstName = input.name.trim().split(' ')[0] || 'there';
  let suggestedReply = '';

  if (notAFit) {
    suggestedReply =
      `Hi ${firstName}, thank you for reaching out to DEP Home Repair. ` +
      `Unfortunately that's not a service we offer, so we wouldn't be the right fit for this one. ` +
      `If anything drywall, electrical, or plumbing comes up, we'd be glad to help. — Jason, DEP Home Repair`;
  } else if (area.fit === 'outside') {
    suggestedReply =
      `Hi ${firstName}, thank you for reaching out to DEP Home Repair. ` +
      `Right now we only cover Chandler, Gilbert, southwest Mesa, and south Scottsdale, so your area is outside where we work. ` +
      `If you're close to one of those, send us your cross streets and we'll double-check. — Jason, DEP Home Repair`;
  } else if (score >= 70) {
    suggestedReply =
      `Hi ${firstName}, thanks for reaching out to DEP Home Repair! ` +
      `We'd be glad to get your ${input.service || 'project'} taken care of. ` +
      (area.fit !== 'in' ? `What are your nearest cross streets, so we can confirm you're in our area? ` : '') +
      (wordCount < 6 ? `Could you send a couple of photos so we can give you an accurate quote? ` : '') +
      `We have availability ` +
      (input.urgency === 'emergency'
        ? 'today — what time works for you?'
        : 'this week — does morning or afternoon work better?') +
      ` You can also call or text us directly at 602-598-1988.`;
  } else if (score >= 40) {
    suggestedReply =
      `Hi ${firstName}, thanks for contacting DEP Home Repair! ` +
      `To give you the best quote for your ${input.service || 'project'}, ` +
      `could you share a bit more detail` +
      (wordCount < 6 ? ' and a photo if possible' : '') +
      `? Once we have that, we can get back to you with pricing quickly. — Jason, DEP Home Repair`;
  } else {
    suggestedReply =
      `Hi ${firstName}, thank you for reaching out. ` +
      `Based on what you've shared, we want to make sure we can actually help before we go further. ` +
      `Could you confirm the location and describe the work needed? We'll let you know if it's within our service area and scope.`;
  }

  return { score, quality, reasons, suggestedReply, nextStep, bookingProbability, areaFit: area.fit, notAFit, outcome };
}
