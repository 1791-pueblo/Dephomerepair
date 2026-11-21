'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BUDGET_OPTIONS,
  QUALIFIER_SERVICE_OPTIONS as SERVICE_OPTIONS,
  URGENCY_OPTIONS,
  scoreLead,
  type LeadInput,
  type LeadResult,
} from '../../lib/leadScoring';

const qualityColors: Record<string, string> = {
  High: 'text-green-700 bg-green-50 border-green-200',
  Medium: 'text-amber-700 bg-amber-50 border-amber-200',
  Low: 'text-red-700 bg-red-50 border-red-200',
};

const qualityBarColor: Record<string, string> = {
  High: 'bg-green-500',
  Medium: 'bg-amber-400',
  Low: 'bg-red-400',
};

export default function LeadQualifier() {
  const [input, setInput] = useState<LeadInput>({
    name: '',
    phone: '',
    location: '',
    service: '',
    urgency: '',
    description: '',
    budget: '',
    contactMethod: '',
  });
  const [result, setResult] = useState<LeadResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScore = () => {
    const res = scoreLead(input);
    setResult(res);
    setTimeout(() => {
      document.getElementById('lead-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.suggestedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInput({
      name: '',
      phone: '',
      location: '',
      service: '',
      urgency: '',
      description: '',
      budget: '',
      contactMethod: '',
    });
    setResult(null);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="DEP Home Repair" width={140} height={56} className="h-12 sm:h-14 w-auto" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link href="/#services" className="hover:text-[#0056B3] transition">Services</Link>
            <Link href="/#quote" className="hover:text-[#0056B3] transition">Instant Quote</Link>
            <Link href="/#contact" className="hover:text-[#0056B3] transition">Contact</Link>
            <Link href="/" className="bg-[#0056B3] hover:bg-blue-900 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-sm">
              ← Back to Site
            </Link>
          </nav>
          <Link href="/" className="md:hidden text-sm font-semibold text-[#0056B3]">← Back</Link>
        </div>
      </header>

      {/* Page Hero */}
      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            🎯 Internal Tool — DEP Home Repair
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Lead Qualification Assistant</h1>
          <p className="text-base sm:text-lg opacity-90 max-w-xl mx-auto">
            Score incoming leads, generate a professional reply, and determine the best next action — fast.
          </p>
        </div>
      </section>

      <main className="py-12 sm:py-16 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">

          {/* Input Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Enter Lead Details</h2>

            <div className="space-y-5">
              {/* Name + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#424242] mb-1.5">Customer Name</label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah M."
                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#424242] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={input.phone}
                    onChange={handleChange}
                    placeholder="e.g. 480-555-0100"
                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1.5">Location / City</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                  placeholder="e.g. Chandler, AZ"
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1.5">Service Requested</label>
                <select
                  name="service"
                  value={input.service}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
                >
                  <option value="">Select service type…</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1.5">Urgency</label>
                <select
                  name="urgency"
                  value={input.urgency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
                >
                  <option value="">Select urgency…</option>
                  {URGENCY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1.5">Budget Range</label>
                <select
                  name="budget"
                  value={input.budget}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
                >
                  <option value="">Select budget…</option>
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1.5">
                  Job Description{' '}
                  <span className="font-normal text-gray-400">(paste what the customer wrote)</span>
                </label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="e.g. I have a 2x3 hole in my bedroom drywall from a door handle. Needs patch and texture match. Located in Chandler near the 202."
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleScore}
              className="mt-8 w-full bg-[#0056B3] hover:bg-blue-900 text-white py-4 rounded-2xl font-bold text-lg transition shadow-md"
            >
              Score This Lead →
            </button>
          </div>

          {/* Result */}
          {result && (
            <div
              id="lead-result"
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100 space-y-6"
            >
              <h2 className="text-xl font-bold text-[#1A1A1A]">Lead Assessment</h2>

              {/* Score bar */}
              <div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-5xl font-bold text-[#1A1A1A]">{result.score}</span>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full border ${qualityColors[result.quality]}`}
                  >
                    {result.quality} Quality
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${qualityBarColor[result.quality]}`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>Lead Score / 100</span>
                  <span>100</span>
                </div>
              </div>

              {/* Scoring Breakdown */}
              <div>
                <h3 className="text-sm font-semibold text-[#424242] uppercase tracking-wide mb-3">
                  Scoring Factors
                </h3>
                <ul className="space-y-2">
                  {result.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#424242]">
                      <span className="mt-0.5 text-[#0056B3]">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] rounded-2xl p-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Booking Probability
                  </div>
                  <div className="text-xl font-bold text-[#1A1A1A]">{result.bookingProbability}</div>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Next Step
                  </div>
                  <div className="text-sm font-semibold text-[#0056B3]">{result.nextStep}</div>
                </div>
              </div>

              {/* Suggested Reply */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[#424242] uppercase tracking-wide">
                    Suggested Reply
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="text-xs text-[#0056B3] hover:text-blue-900 font-medium border border-[#0056B3]/30 hover:border-[#0056B3] px-3 py-1 rounded-full transition"
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
                  {result.suggestedReply}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-[#1A1A1A] py-3 rounded-2xl font-semibold text-sm transition"
                >
                  Score Another Lead
                </button>
                <a
                  href="tel:6025981988"
                  className="flex-1 text-center bg-[#FFAB00] hover:bg-amber-500 text-black py-3 rounded-2xl font-semibold text-sm transition shadow-sm"
                >
                  📞 Call Customer Now
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#1A1A1A] text-white py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} DEP Home Repair · Internal Tools · Not a licensed contractor.
      </footer>
    </>
  );
}
