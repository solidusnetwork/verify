'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Crypto & DeFi', 'Fintech', 'Gaming', 'Healthcare', 'Marketplaces'];

  const caseStudies = [
    {
      company: 'TrustLayer Exchange',
      industry: 'Crypto & DeFi',
      metric: '95% cost reduction',
      description: 'Migrated 1.4M existing users in 72 hours. Re-verification costs dropped from $8.50 to $0.40 per user.'
    },
    {
      company: 'Sterling Fintech',
      industry: 'Fintech',
      metric: 'Integration in 48 hours',
      description: 'From signed contract to first live verification in under two days. Zero compliance blockers.'
    },
    {
      company: 'Generali DeFi',
      industry: 'Infrastructure',
      metric: '3 weeks → 2 days',
      description: 'Reduced validator onboarding from 21 days to 2 days by eliminating per-chain re-KYC with portable credentials.'
    },
    {
      company: 'NexusPay',
      industry: 'Payments',
      metric: '2M verifications/month',
      description: 'Processing 2 million monthly verifications at $0.05 per re-use, with 99.6% success rate across 47 countries.'
    },
    {
      company: 'ShieldGaming',
      industry: 'Gaming',
      metric: '100% GDPR compliant',
      description: 'Age verification at account creation, with zero biometric data stored — critical for COPPA and EU law compliance.'
    },
    {
      company: 'MediVerify',
      industry: 'Healthcare',
      metric: 'HIPAA + BIPA compliant',
      description: 'Patient identity verification that satisfies both HIPAA identity proofing and Illinois BIPA biometric data law requirements.'
    }
  ];

  const filteredStudies = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter(study => study.industry === activeFilter || (activeFilter === 'Fintech' && study.industry === 'Payments'));

  return (
    <div className="min-h-screen font-sans flex flex-col bg-surface">

      {/* Section 1: Header */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[80px] pb-[64px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            Customer Stories
          </div>
          <h1 className="text-text-primary text-[48px] font-bold mt-[12px] leading-tight">
            Real teams. Real results.
          </h1>
          <p className="text-text-secondary text-[18px] mt-[16px] max-w-[600px] leading-relaxed">
            How compliance and engineering teams across crypto, fintech, gaming, and healthcare are using Solidus Verify to cut costs and ship faster.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border border border-border rounded-[12px] overflow-hidden mt-[48px]">
            <div className="bg-elevated py-[28px] px-4 flex flex-col items-center justify-center text-center">
              <div className="text-cta text-[36px] font-bold leading-tight">1B+</div>
              <div className="text-text-secondary text-[13px] mt-1">Verifications processed</div>
            </div>
            <div className="bg-elevated py-[28px] px-4 flex flex-col items-center justify-center text-center">
              <div className="text-cta text-[36px] font-bold leading-tight">96%</div>
              <div className="text-text-secondary text-[13px] mt-1">Average cost reduction</div>
            </div>
            <div className="bg-elevated py-[28px] px-4 flex flex-col items-center justify-center text-center">
              <div className="text-cta text-[36px] font-bold leading-tight">{"< 2 days"}</div>
              <div className="text-text-secondary text-[13px] mt-1">Average integration time</div>
            </div>
            <div className="bg-elevated py-[28px] px-4 flex flex-col items-center justify-center text-center">
              <div className="text-success text-[36px] font-bold leading-tight">0</div>
              <div className="text-text-secondary text-[13px] mt-1">Biometric data breaches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Case Study */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[64px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full bg-bg rounded-[16px] p-[48px] flex flex-col lg:flex-row gap-[64px] overflow-hidden relative">

          <div className="lg:w-[60%] flex flex-col items-start z-10">
            <div className="text-text-secondary text-[12px] font-medium tracking-[0.08em] uppercase">
              Featured Case Study
            </div>

            <div className="flex items-center gap-[8px] mt-[16px]">
              <div className="bg-surface border border-border rounded-[8px] px-[16px] py-[8px] text-text-primary text-[14px] font-semibold">
                TrustLayer Exchange
              </div>
              <div className="bg-[rgba(168,230,0,0.15)] text-lime px-[12px] py-[6px] rounded-full text-[12px] font-medium">
                Crypto &amp; DeFi
              </div>
            </div>

            <h2 className="text-white text-[36px] font-bold leading-[1.2] mt-[24px]">
              How TrustLayer Exchange reduced KYC cost by 95%
            </h2>

            <div className="flex items-center gap-[16px] mt-[20px] flex-wrap">
              <div className="bg-[rgba(255,59,48,0.10)] border border-[rgba(255,59,48,0.20)] rounded-[8px] px-[16px] py-[12px]">
                <div className="text-text-secondary text-[12px]">Before</div>
                <div className="text-error text-[24px] font-bold leading-tight">$8.50</div>
                <div className="text-text-secondary text-[12px]">per user KYC cost</div>
              </div>
              <ArrowRight className="w-[20px] h-[20px] text-text-secondary" />
              <div className="bg-[rgba(168,230,0,0.10)] border border-[rgba(168,230,0,0.25)] rounded-[8px] px-[16px] py-[12px]">
                <div className="text-text-secondary text-[12px]">After</div>
                <div className="text-lime text-[24px] font-bold leading-tight">$0.40</div>
                <div className="text-text-secondary text-[12px]">per user KYC cost</div>
              </div>
            </div>

            <div className="mt-[32px] border-l-[3px] border-cta pl-[20px]">
              <p className="text-white text-[18px] leading-relaxed italic">
                &ldquo;We processed 2 million verifications last month and paid less than we used to pay for 100,000. Solidus is the only KYC infrastructure that gets more cost-efficient the more you use it.&rdquo;
              </p>
              <div className="text-text-secondary text-[13px] font-medium mt-[12px]">
                — Karim Mansour, Head of Compliance, TrustLayer Exchange
              </div>
            </div>

            <Link href="/case-studies/trustlayer" className="mt-[32px] text-cta text-[14px] font-semibold flex items-center gap-1 hover:underline">
              Read full case study <ArrowRight className="w-[14px] h-[14px]" />
            </Link>
          </div>

          <div className="lg:w-[40%] flex items-center justify-center z-10">
            <div className="w-full max-w-[400px] bg-surface border border-border rounded-[12px] p-[24px] shadow-2xl relative">
              <div className="text-text-secondary text-[14px] font-semibold uppercase tracking-wider mb-2">Cost Savings · This Month</div>
              <div className="text-lime text-[36px] font-bold leading-none">$4,200,000</div>
              <div className="text-text-secondary text-[12px] mt-1">vs. $88,000,000 traditional KYC</div>

              <div className="w-full h-[80px] mt-6 flex items-end gap-1 relative">
                <svg viewBox="0 0 200 80" className="w-full h-full text-success opacity-20 preserve-aspect-ratio-none fill-current absolute bottom-0">
                  <path d="M0,80 L0,50 C20,60 40,30 60,40 C80,50 100,20 120,30 C140,40 160,10 180,15 L200,5 L200,80 Z" />
                </svg>
                <svg viewBox="0 0 200 80" className="w-full h-full text-success preserve-aspect-ratio-none stroke-current absolute bottom-0" fill="none" strokeWidth="2">
                  <path d="M0,50 C20,60 40,30 60,40 C80,50 100,20 120,30 C140,40 160,10 180,15 L200,5" />
                </svg>
              </div>

              <div className="flex justify-between items-center border-t border-border pt-[16px] mt-[16px]">
                <div className="text-white text-[14px] font-semibold">2,000,000 verifications</div>
                <div className="text-success text-[14px] font-semibold">$0.40 avg. cost</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Industries Filter + Case Grid */}
      <section className="bg-elevated px-8 sm:px-[120px] pt-[64px] pb-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold mb-[24px]">More customer stories</h2>

          <div className="flex flex-wrap gap-[8px]">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`h-[36px] px-[16px] rounded-[8px] text-[14px] font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-bg text-white'
                    : 'bg-surface border border-border text-text-secondary hover:bg-elevated'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-[32px]">
            {filteredStudies.map((study, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-[12px] p-[24px] hover:border-cta hover:shadow-[0_4px_16px_rgba(0,102,255,0.08)] transition-all duration-150 flex flex-col items-start cursor-pointer group">
                <div className="flex items-center justify-between w-full">
                  <div className="bg-elevated border border-border rounded-[8px] px-[12px] py-[6px] text-text-primary text-[13px] font-semibold">
                    {study.company}
                  </div>
                  <div className="text-text-disabled text-[12px] font-medium px-[8px] py-[2px] rounded-[6px] border border-border">
                    {study.industry}
                  </div>
                </div>

                <h3 className="text-text-primary text-[18px] font-semibold mt-[16px]">{study.company}</h3>

                <div className="bg-[rgba(0,102,255,0.06)] border border-[rgba(0,102,255,0.12)] rounded-[6px] px-[10px] py-[6px] text-cta text-[13px] font-semibold mt-[8px]">
                  {study.metric}
                </div>

                <p className="text-text-secondary text-[14px] mt-[10px] line-clamp-3 leading-relaxed flex-grow">
                  {study.description}
                </p>

                <div className="text-cta text-[14px] font-medium mt-[16px] flex items-center gap-1 group-hover:underline">
                  Read case study <ArrowRight className="w-[14px] h-[14px]" />
                </div>
              </div>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="py-12 text-center text-text-secondary bg-surface rounded-xl border border-border">
              No case studies found for {activeFilter}.
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Submit Story CTA */}
      <section className="bg-surface px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-[80px] items-center">

          <div className="w-full md:w-[480px]">
            <h2 className="text-text-primary text-[32px] font-bold">Building with Solidus Verify?</h2>
            <p className="text-text-secondary text-[16px] mt-[12px] leading-relaxed">
              Share your story. We&apos;ll write the case study, design the assets, and promote your team&apos;s work to 40,000+ developers and compliance professionals.
            </p>

            <div className="flex flex-col gap-[12px] mt-[24px]">
              {[
                "Featured on solidus.network/case-studies",
                "LinkedIn feature post from @SolidusNetwork",
                "Co-branded PDF case study for your sales team",
                "Optional: joint press release"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-[12px]">
                  <CheckCircle className="w-[16px] h-[16px] text-success mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary text-[14px]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-grow w-full max-w-[520px]">
            <div className="bg-elevated border border-border rounded-[12px] p-[32px]">
              <h3 className="text-text-primary text-[18px] font-semibold">Tell us about your project</h3>

              <form className="flex flex-col gap-[16px] mt-[20px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <div>
                    <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Company Name</label>
                    <input type="text" className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] focus:outline-none focus:border-cta" />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Your Name</label>
                    <input type="text" className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] focus:outline-none focus:border-cta" />
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Your Role</label>
                  <input type="text" className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] focus:outline-none focus:border-cta" />
                </div>

                <div>
                  <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Website</label>
                  <input type="url" placeholder="https://" className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] placeholder-[#999999] focus:outline-none focus:border-cta" />
                </div>

                <div>
                  <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Monthly verifications</label>
                  <div className="relative">
                    <select className="w-full h-[40px] bg-surface border border-border rounded-[8px] pl-[12px] pr-[36px] text-[14px] text-text-primary appearance-none focus:outline-none focus:border-cta cursor-pointer">
                      <option>&lt; 10K</option>
                      <option>10K–100K</option>
                      <option>100K–1M</option>
                      <option>1M+</option>
                    </select>
                    <ChevronRight className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-text-disabled pointer-events-none rotate-90" />
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Key result you&apos;d like to highlight</label>
                  <textarea
                    className="w-full h-[80px] bg-surface border border-border rounded-[8px] p-[12px] text-[14px] resize-none focus:outline-none focus:border-cta"
                    placeholder="E.g. reduced onboarding friction, eliminated manual review..."
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] placeholder-[#999999] focus:outline-none focus:border-cta" />
                </div>

                <button type="button" className="w-full h-[48px] bg-cta hover:bg-cta/90 text-white font-semibold text-[14px] rounded-[8px] transition-colors mt-[4px]">
                  Submit Your Story
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
