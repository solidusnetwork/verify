'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Rss, ExternalLink, Mail, CheckCircle } from 'lucide-react';

const filters = [
  { label: 'All', bg: 'bg-bg', text: 'text-white' },
  { label: 'New Feature', bg: 'bg-[rgba(0,102,255,0.08)]', text: 'text-cta' },
  { label: 'Improvement', bg: 'bg-[rgba(52,199,89,0.08)]', text: 'text-success' },
  { label: 'Bug Fix', bg: 'bg-[rgba(255,149,0,0.08)]', text: 'text-warning' },
  { label: 'Breaking Change', bg: 'bg-[rgba(255,59,48,0.08)]', text: 'text-error' },
];

const entries = [
  {
    id: 1,
    version: 'v2.4.1',
    date: 'March 17, 2026',
    type: 'New Feature',
    typeColor: 'text-cta',
    typeBg: 'bg-[rgba(0,102,255,0.10)]',
    typeBorder: 'border-[rgba(0,102,255,0.20)]',
    title: 'Workflow Builder (Beta)',
    desc: 'Build custom verification flows without writing code. The Workflow Builder is now available in beta for all Growth and Enterprise accounts.',
    bullets: [
      'Drag-and-drop step sequencing — Document Upload, Liveness, AML screening, custom webhooks',
      'Conditional branching: route users through different verification tiers based on geography or risk score',
      'Live preview mode: simulate the verification experience before deploying to production',
      'Export workflow as YAML for version control and CI/CD integration',
    ],
    link: '/docs/workflow-builder'
  },
  {
    id: 2,
    version: 'v2.4.0',
    date: 'March 10, 2026',
    type: 'New Feature',
    typeColor: 'text-cta',
    typeBg: 'bg-[rgba(0,102,255,0.10)]',
    typeBorder: 'border-[rgba(0,102,255,0.20)]',
    title: 'KYC L3 Enhanced Screening: PEP + Adverse Media',
    desc: 'KYC Level 3 verification now includes Politically Exposed Person (PEP) screening and adverse media analysis across 200+ news sources in 40 languages, powered by real-time data feeds.',
    bullets: [
      'PEP database covers 1.4M+ individuals across 240 jurisdictions, updated daily',
      'Adverse media screening scans global news, court records, and regulatory announcements',
      'Results surfaced in the verification detail panel with source links and confidence scores',
      'Configurable sensitivity threshold in Settings → Compliance for your risk appetite',
      'FATF Recommendation 12 compliant out of the box',
    ],
    link: '/docs/kyc-levels'
  },
  {
    id: 3,
    version: 'v2.3.2',
    date: 'February 28, 2026',
    type: 'Improvement',
    typeColor: 'text-success',
    typeBg: 'bg-[rgba(52,199,89,0.10)]',
    typeBorder: 'border-[rgba(52,199,89,0.20)]',
    title: 'Liveness Detection Accuracy Improvement',
    desc: 'Our liveness model has been updated following a six-week retraining cycle on a broader and more demographically diverse dataset.',
    bullets: [
      'False positive rate reduced from 2.1% to 0.8% — 61% improvement',
      'Performance improvements for users with glasses, facial hair, and varying skin tones',
      'Low-light performance improved: detection now reliable down to 40 lux ambient lighting',
      'No changes to the API or SDK — improvement is automatic',
    ]
  },
  {
    id: 4,
    version: 'v2.3.1',
    date: 'February 20, 2026',
    type: 'Bug Fix',
    typeColor: 'text-warning',
    typeBg: 'bg-[rgba(255,149,0,0.10)]',
    typeBorder: 'border-[rgba(255,149,0,0.20)]',
    title: 'Webhook Retry Logic Fixed',
    desc: 'A bug introduced in v2.3.0 caused webhook retries to use a fixed 30-second interval instead of the documented exponential backoff. This has been corrected.',
    bullets: [
      'Exponential backoff now correctly applied: 30s → 2m → 8m → 32m → 128m → stop',
      'Retry count now displayed accurately in the Webhooks delivery log',
      'Existing failing endpoints will automatically resume correct retry behavior — no action needed',
      'Webhook delivery SLA metrics recalculated retroactively from Feb 15 onward',
    ]
  },
  {
    id: 5,
    version: 'v2.3.0',
    date: 'February 14, 2026',
    type: 'New Feature',
    typeColor: 'text-cta',
    typeBg: 'bg-[rgba(0,102,255,0.10)]',
    typeBorder: 'border-[rgba(0,102,255,0.20)]',
    title: 'Geographic Restrictions in Compliance Settings',
    desc: 'Compliance teams can now configure per-country blocking directly in the dashboard, without engineering support. Blocked countries return a structured error response to your API.',
    bullets: [
      'Country multi-select in Settings → Compliance → Geographic Restrictions',
      'Supports allow-list mode (only these countries) and block-list mode (all except these)',
      'Returns HTTP 451 Unavailable For Legal Reasons with structured JSON body including user-visible reason',
      'Audit log records all geographic restriction changes with actor and timestamp',
      'Pre-built OFAC and EU sanctions block-lists available as one-click templates',
    ],
    link: '/docs/geographic-restrictions'
  }
];

export default function ChangelogPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const filteredEntries = activeFilter === 'All'
    ? entries
    : entries.filter(e => e.type === activeFilter);

  return (
    <div className="min-h-screen font-sans flex flex-col bg-surface">

      {/* Section 1: Header */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[80px] pb-[56px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full relative">
          <div className="flex items-center gap-1 mb-[24px]">
            <Link href="/docs" className="text-text-secondary text-[12px] font-normal hover:text-cta">Docs</Link>
            <ChevronRight className="w-[12px] h-[12px] text-text-disabled" />
            <span className="text-text-primary text-[12px] font-normal">Changelog</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <h1 className="text-text-primary text-[48px] font-bold leading-tight">Changelog</h1>
              <p className="text-text-secondary text-[18px] mt-[12px]">What&apos;s new in Solidus Verify.</p>
            </div>
            <a href="/feed.xml" className="bg-warning/5 border border-[rgba(255,149,0,0.25)] h-[32px] px-[12px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-warning/10 transition-colors self-start sm:mt-4">
              <Rss className="w-[16px] h-[16px] text-warning" />
              <span className="text-cta text-[14px] font-normal">RSS Feed</span>
            </a>
          </div>

          <div className="w-full h-[1px] bg-border mt-[48px]" />
        </div>
      </section>

      {/* Section 2: Changelog Feed */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[80px] w-full flex justify-center flex-grow">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-[80px]">

          {/* Left Sidebar */}
          <aside className="w-full md:w-[240px] flex-shrink-0 relative">
            <div className="sticky top-[104px]">
              <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-[0.06em] mb-[16px]">Jump To</h3>

              <div className="flex flex-col gap-1">
                <div className="text-text-primary text-[15px] font-semibold mb-2">2026</div>
                <button className="text-left text-cta text-[13px] font-normal hover:text-cta pl-2 border-l-2 border-cta">March</button>
                <button className="text-left text-text-secondary text-[13px] font-normal hover:text-cta pl-2 border-l-2 border-transparent">February</button>
              </div>

              <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-[0.06em] mt-[32px] mb-[12px]">Filter</h3>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.label;
                  return (
                    <button
                      key={filter.label}
                      onClick={() => setActiveFilter(filter.label)}
                      className={`h-[24px] px-[10px] rounded-[6px] text-[12px] font-medium flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-bg text-white'
                          : `${filter.bg} ${filter.text} hover:opacity-80`
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Feed */}
          <main className="flex-grow max-w-[800px]">
            <div className="flex flex-col gap-[40px]">
              {filteredEntries.map((entry, index) => (
                <div key={entry.id} className="flex flex-col">
                  <div>
                    <div className="flex items-end gap-3 mb-[12px]">
                      <div className="text-text-primary text-[14px] font-medium">{entry.date}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-[8px]">
                      <div className="bg-elevated border border-border rounded-[6px] px-[10px] py-[4px] font-mono text-[12px] font-medium text-text-primary">
                        {entry.version}
                      </div>
                      <div className={`${entry.typeBg} border ${entry.typeBorder} rounded-[6px] px-[8px] py-[3px] text-[12px] font-semibold ${entry.typeColor}`}>
                        {entry.type}
                      </div>
                    </div>

                    <h3 className="text-text-primary text-[22px] font-semibold mt-[12px]">{entry.title}</h3>
                    <p className="text-text-secondary text-[16px] leading-relaxed mt-[8px]">{entry.desc}</p>

                    <ul className="mt-[12px] flex flex-col gap-[8px]">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-[14px] h-[14px] text-cta mt-1 flex-shrink-0" />
                          <span className="text-text-secondary text-[15px]">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {entry.link && (
                      <Link href={entry.link} className="inline-flex items-center gap-1 text-cta text-[14px] font-medium mt-[16px] hover:underline">
                        See docs <ExternalLink className="w-[14px] h-[14px]" />
                      </Link>
                    )}
                  </div>

                  {index < filteredEntries.length - 1 && (
                    <div className="w-full h-[1px] bg-border mt-[40px]" />
                  )}
                </div>
              ))}

              {filteredEntries.length === 0 && (
                <div className="text-center py-12 text-text-secondary">
                  No changelog entries found for this filter.
                </div>
              )}
            </div>
          </main>

        </div>
      </section>

      {/* Section 3: Subscribe */}
      <section className="bg-elevated px-8 py-[80px] w-full flex justify-center">
        <div className="bg-surface border border-border rounded-[12px] p-[48px] max-w-[560px] w-full flex flex-col items-center text-center shadow-sm">
          <div className="bg-[rgba(0,102,255,0.08)] p-[10px] rounded-[12px] flex items-center justify-center">
            <Mail className="text-cta w-[40px] h-[40px]" />
          </div>

          <h2 className="text-text-primary text-[28px] font-bold mt-[20px]">
            Get changelog updates by email
          </h2>
          <p className="text-text-secondary text-[16px] mt-[8px]">
            One email per release. No marketing. Unsubscribe any time.
          </p>

          <div className="mt-[28px] w-full max-w-[440px]">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-[8px] w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-grow h-[48px] bg-surface border border-border rounded-[8px] px-[16px] text-[15px] text-text-primary placeholder-[#999999] focus:outline-none focus:border-cta transition-colors"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 h-[48px] bg-cta text-white px-[24px] rounded-[8px] text-[14px] font-semibold hover:bg-cta/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-[8px] h-[48px]">
                <CheckCircle className="w-[24px] h-[24px] text-success" />
                <span className="text-text-primary text-[15px] font-medium">You&apos;re subscribed.</span>
              </div>
            )}
          </div>

          <p className="text-text-disabled text-[12px] mt-[12px]">
            We send 1–3 emails per month. Unsubscribe in one click.
          </p>
        </div>
      </section>

    </div>
  );
}
