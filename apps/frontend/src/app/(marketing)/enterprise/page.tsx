'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, FileCheck, Download, Server, Activity,
  Calendar, Building2, Lock, Code,
  ChevronRight,
} from 'lucide-react'

export default function EnterprisePage() {
  return (
    <main className="w-full flex-1 flex flex-col bg-bg text-white">

      {/* Hero Section */}
      <section className="w-full max-w-[1000px] mx-auto px-6 md:px-[120px] pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cta/10 border border-cta/20 px-4 py-2 rounded-full mb-8">
          <Building2 className="w-4 h-4 text-cta" />
          <span className="text-[13px] font-semibold text-cta tracking-wide uppercase">Solidus Enterprise</span>
        </div>
        <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
          Enterprise KYC<br />at any scale
        </h1>
        <p className="text-[18px] md:text-[20px] text-white/70 max-w-[600px] mx-auto mb-10 leading-relaxed">
          Custom deployment models, dedicated SLA, white-glove migration, and volume pricing for the world's most demanding applications.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="h-12 px-8 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[16px] font-semibold text-white">
            Contact Sales
          </button>
          <button className="h-12 px-8 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-lg text-[16px] font-semibold text-white">
            View Documentation
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-[120px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
            <Code className="w-8 h-8 text-cta mb-6" />
            <h3 className="text-[20px] font-bold text-white mb-3">White-label API</h3>
            <p className="text-[15px] text-white/70 leading-relaxed">
              Full programmatic control. Implement a branded verification flow with custom logos, colors, and completely custom UI while we handle the backend compliance.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
            <Server className="w-8 h-8 text-cta mb-6" />
            <h3 className="text-[20px] font-bold text-white mb-3">On-premise Deployment</h3>
            <p className="text-[15px] text-white/70 leading-relaxed">
              Run our validator nodes directly within your VPC. Zero PII leaves your network, guaranteeing compliance with the strictest data residency laws.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
            <Activity className="w-8 h-8 text-cta mb-6" />
            <h3 className="text-[20px] font-bold text-white mb-3">Dedicated SLA</h3>
            <p className="text-[15px] text-white/70 leading-relaxed">
              99.99% uptime commitment with a dedicated Slack channel, 15-minute incident response times, and a dedicated Technical Account Manager.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Advisory & Logos Grid */}
      <section className="w-full max-w-[1000px] mx-auto px-6 md:px-[120px] py-10 text-center">
        <div className="mb-16 bg-cta/10 border border-cta/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 overflow-hidden shrink-0 flex items-center justify-center text-white font-bold text-[24px]">
              MS
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-white mb-1">Expert Compliance Advisory</h3>
              <p className="text-[15px] text-white/70">Book a strategy session with Michael Sterling, our Chief Compliance Officer.</p>
            </div>
          </div>
          <button className="h-10 px-6 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[14px] font-semibold text-white whitespace-nowrap flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Book Session
          </button>
        </div>

        <p className="text-[13px] font-semibold text-white/50 tracking-wider uppercase mb-8">Trusted by industry leaders</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {['Acme Corp', 'GlobalBank', 'FintechX', 'NeoTrust'].map((logo, idx) => (
            <div key={idx} className="h-12 border border-white/20 rounded-lg flex items-center justify-center bg-white/5 text-[14px] font-bold text-white">
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Volume Pricing Note */}
      <section className="w-full max-w-[1000px] mx-auto px-6 md:px-[120px] py-16">
        <div className="bg-gradient-to-r from-[#0066FF]/20 to-transparent border border-cta/30 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-[24px] font-bold text-white mb-2">Volume Pricing Available</h3>
            <p className="text-[16px] text-white/70">Custom tiers for 1M+, 10M+, and 100M+ monthly verifications with progressive volume discounts.</p>
          </div>
          <button className="h-10 px-6 bg-surface text-text-primary hover:bg-gray-100 transition-colors rounded-lg text-[14px] font-semibold whitespace-nowrap">
            Get a Quote
          </button>
        </div>
      </section>

      {/* Migration Guide Section */}
      <section className="w-full bg-white/5 py-[80px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[120px]">
          <div className="max-w-[600px] mx-auto text-center mb-12">
            <h2 className="text-[36px] font-bold text-white mb-4 leading-[1.2]">Migrating from another provider?</h2>
            <p className="text-[16px] text-white/70 leading-[1.7]">
              We make it easy. Our team handles the migration planning — you focus on your product. Typical migrations complete in 48–72 hours with zero downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                provider: 'Sumsub',
                desc: 'Export your applicant list via the Sumsub Management API. Solidus ingests verified user records and re-issues equivalent W3C VCs. All new verifications run through Solidus from day one. 48–72 hours typical migration window.',
              },
              {
                provider: 'Stripe Identity',
                desc: 'Export verification records via the Stripe API. Solidus maps verified sessions to DID-based credentials. Your existing webhook endpoints remain unchanged — only the payload format updates. 24–48 hours typical.',
              },
              {
                provider: 'Onfido',
                desc: "Export applicant data and check results from Onfido's reporting API. Solidus reissues credentials for verified users without requiring re-verification. Integration layer takes 1–2 days. Users never see a disruption.",
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-bg border border-white/10 rounded-xl p-6 flex flex-col hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all duration-200 group">
                <div className="flex items-center gap-2.5 mb-4">
                  <ArrowRight className="w-6 h-6 text-cta" />
                  <h3 className="text-[20px] font-semibold text-white">From {card.provider}</h3>
                </div>
                <p className="text-[14px] text-white/70 leading-[1.7] mb-6 flex-1">
                  {card.desc}
                </p>
                <button className="flex items-center gap-1 text-[14px] font-medium text-cta group-hover:underline w-fit">
                  Migration guide <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-bg border border-white/10 rounded-xl p-8 overflow-x-auto">
            <div className="flex min-w-[800px]">
              {[
                { day: 'Day 1', title: 'Export data', desc: 'We export your applicant records from your existing provider using their API.' },
                { day: 'Day 2', title: 'API integration', desc: 'Solidus integration added alongside your existing provider in shadow mode.' },
                { day: 'Day 3', title: 'Shadow mode test', desc: 'Run both systems in parallel. Compare outputs. Validate parity.' },
                { day: 'Day 5', title: 'Cutover', desc: 'Existing provider decommissioned. Solidus is live. Migration complete.' },
              ].map((step, idx, arr) => (
                <div key={idx} className={`flex-1 px-6 flex flex-col items-center text-center ${idx !== arr.length - 1 ? 'border-r border-white/10' : ''}`}>
                  <div className="w-9 h-9 bg-cta rounded-full flex items-center justify-center text-white text-[16px] font-bold mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2">{step.day} — {step.title}</h3>
                  <p className="text-[13px] text-white/70 max-w-[200px] line-clamp-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-[15px] text-white/70">Need a custom migration plan?</span>
            <button className="h-10 px-5 border border-white/20 hover:bg-surface hover:text-text-primary transition-colors duration-200 rounded-lg text-[14px] font-medium text-white">
              Talk to an Engineer
            </button>
          </div>
        </div>
      </section>

      {/* Security Questionnaire Section */}
      <section className="w-full py-[64px] border-b border-white/10">
        <div className="max-w-[1000px] mx-auto px-6 md:px-[120px] flex flex-col md:flex-row gap-16 items-start">

          <div className="flex-1 flex flex-col gap-5">
            <FileCheck className="w-12 h-12 text-cta" />
            <h2 className="text-[32px] font-semibold text-white leading-tight">Security Questionnaire & RFP Support</h2>
            <p className="text-[16px] text-white/70 leading-[1.7]">
              Enterprise procurement teams require security questionnaires before onboarding any vendor. We've pre-filled the most common formats so your security team doesn't start from scratch. Download, verify, sign.
            </p>

            <div className="flex flex-col gap-3 mt-1">
              {[
                'SIG Lite questionnaire (pre-filled PDF)',
                'SOC 2 bridge letter (covers Year 1 controls)',
                'GDPR Article 28 Data Processing Agreement template',
                'MSA template with security addendum',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cta shrink-0 mt-[3px]" />
                  <span className="text-[14px] text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-[16px] font-semibold text-white mb-4">Available Documents</h3>

              <div className="flex flex-col">
                {[
                  { name: 'SIG Lite — Security Questionnaire', meta: 'PDF · 2.4 MB', action: 'Download', badge: null },
                  { name: 'GDPR Article 28 DPA Template', meta: 'DOCX · 186 KB', action: 'Download', badge: null },
                  { name: 'SOC 2 Bridge Letter', meta: 'PDF · 340 KB', action: 'Download', badge: 'Updated Q1 2026' },
                  { name: 'Sample MSA + Security Addendum', meta: 'DOCX · 420 KB', action: 'Request', badge: null },
                ].map((doc, idx, arr) => (
                  <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 ${idx !== arr.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-medium text-white">{doc.name}</span>
                      <span className="text-[12px] text-white/50">{doc.meta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.badge && (
                        <div className="h-5 px-2 rounded-full bg-success/10 border border-success/25 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-success uppercase tracking-wider">{doc.badge}</span>
                        </div>
                      )}
                      <button className="h-7 px-3 border border-white/20 hover:bg-white/10 transition-colors rounded text-[12px] font-medium text-white flex items-center gap-1.5">
                        {doc.action === 'Download' ? <Download className="w-3 h-3 text-white/70" /> : <Lock className="w-3 h-3 text-white/70" />}
                        {doc.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[12px] text-white/50 mt-3">
              Need to share a full architecture diagram or vulnerability disclosure history under NDA?{' '}
              <a href="#contact" className="font-medium text-cta hover:underline inline-flex items-center gap-0.5">
                Contact Enterprise Sales <ArrowRight className="w-3 h-3" />
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="w-full py-[80px]">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[32px] font-bold text-white mb-3">Talk to Enterprise Sales</h2>
            <p className="text-[16px] text-white/70">
              Tell us about your verification needs and our team will get in touch within 24 hours.
            </p>
          </div>

          <form className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-white/90">First Name</label>
                <input type="text" className="h-10 bg-bg border border-white/10 rounded-lg px-3 text-[14px] text-white focus:outline-none focus:border-cta" placeholder="Jane" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-white/90">Last Name</label>
                <input type="text" className="h-10 bg-bg border border-white/10 rounded-lg px-3 text-[14px] text-white focus:outline-none focus:border-cta" placeholder="Doe" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-white/90">Work Email</label>
              <input type="email" className="h-10 bg-bg border border-white/10 rounded-lg px-3 text-[14px] text-white focus:outline-none focus:border-cta" placeholder="jane@company.com" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-white/90">Company</label>
              <input type="text" className="h-10 bg-bg border border-white/10 rounded-lg px-3 text-[14px] text-white focus:outline-none focus:border-cta" placeholder="Acme Corp" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-white/90">Monthly Verification Volume</label>
              <select className="h-10 bg-bg border border-white/10 rounded-lg px-3 text-[14px] text-white focus:outline-none focus:border-cta appearance-none">
                <option>Less than 100k</option>
                <option>100k - 1M</option>
                <option>1M - 10M</option>
                <option>10M+</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-white/90">How can we help?</label>
              <textarea className="min-h-[100px] bg-bg border border-white/10 rounded-lg p-3 text-[14px] text-white focus:outline-none focus:border-cta resize-y" placeholder="Tell us about your use case..."></textarea>
            </div>

            <button type="button" className="h-12 w-full bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[15px] font-semibold text-white mt-2">
              Submit Request
            </button>
          </form>
        </div>
      </section>

    </main>
  )
}
