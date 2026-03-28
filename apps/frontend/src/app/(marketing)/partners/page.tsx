'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Users, Globe, TrendingUp, Award, Check, Cpu, Briefcase,
  Minus, CheckCircle, Quote, ChevronDown, ArrowRight
} from 'lucide-react'

export default function PartnersPage() {
  const [partnerType, setPartnerType] = useState('Integration')

  return (
    <div className="font-sans flex flex-col bg-bg">

      {/* Section 1: Hero (Dark) */}
      <section className="bg-bg px-8 sm:px-[120px] py-[100px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col lg:flex-row gap-[80px]">

          <div className="lg:w-[580px]">
            <div className="text-lime text-[12px] font-medium tracking-[0.08em] uppercase">
              PARTNER PROGRAM
            </div>
            <h1 className="text-white text-[52px] font-bold mt-[12px] leading-[1.1] whitespace-pre-line">
              {"The Solidus\nPartner Program"}
            </h1>
            <p className="text-text-secondary text-[20px] mt-[20px] max-w-[480px] leading-relaxed">
              Grow your business by building on the identity layer of the internet. Earn revenue share, get co-marketing support, and gain access to a network of thousands of compliance-first builders.
            </p>

            <div className="flex flex-wrap gap-[12px] mt-[40px]">
              <button className="h-[48px] bg-cta text-white px-[28px] rounded-[8px] text-[14px] font-semibold hover:bg-cta/90 transition-colors">
                Become a Partner
              </button>
              <button className="h-[48px] bg-transparent border border-[rgba(255,255,255,0.20)] text-white px-[24px] rounded-[8px] text-[14px] font-medium hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
                View Partner Portal <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-[32px] mt-[40px]">
              <div className="flex items-center gap-[8px]">
                <Users className="w-[16px] h-[16px] text-text-secondary" />
                <span className="text-text-secondary text-[13px]">50+ active partners</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <Globe className="w-[16px] h-[16px] text-text-secondary" />
                <span className="text-text-secondary text-[13px]">24 countries</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <TrendingUp className="w-[16px] h-[16px] text-text-secondary" />
                <span className="text-text-secondary text-[13px]">Avg. 30% revenue share</span>
              </div>
            </div>
          </div>

          <div className="lg:w-[480px] flex items-center justify-center">
            <div className="w-full bg-surface border border-border rounded-[12px] p-[32px] flex flex-col relative">

              {/* Dashed connecting line */}
              <div className="absolute left-[41px] top-[50px] bottom-[50px] w-[2px] border-l-2 border-dashed border-border z-0"></div>

              {/* Tier row A */}
              <div className="flex items-center justify-between z-10 bg-surface py-[8px]">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-elevated flex items-center justify-center z-10 border border-border">
                    <Award className="w-[20px] h-[20px] text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-white text-[14px] font-semibold">Referral</div>
                    <div className="text-text-secondary text-[12px]">Silver</div>
                  </div>
                </div>
                <div className="text-text-secondary text-[13px] font-medium">20% rev share</div>
              </div>

              {/* Tier row B */}
              <div className="flex items-center justify-between z-10 bg-surface py-[8px] mt-[24px]">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-elevated flex items-center justify-center z-10 border border-border">
                    <Award className="w-[20px] h-[20px] text-lime" />
                  </div>
                  <div>
                    <div className="text-white text-[14px] font-semibold">Integration</div>
                    <div className="text-text-secondary text-[12px]">Gold</div>
                  </div>
                </div>
                <div className="text-lime text-[13px] font-medium">30% rev share</div>
              </div>

              {/* Tier row C */}
              <div className="flex items-center justify-between z-10 bg-surface py-[8px] mt-[24px]">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-elevated flex items-center justify-center z-10 border border-border">
                    <Award className="w-[20px] h-[20px] text-cyan" />
                  </div>
                  <div>
                    <div className="text-white text-[14px] font-semibold">Strategic</div>
                    <div className="text-text-secondary text-[12px]">Platinum</div>
                  </div>
                </div>
                <div className="text-cyan text-[13px] font-medium">Custom</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Partner Tiers */}
      <section className="bg-elevated px-8 sm:px-[120px] py-[100px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          <h2 className="text-text-primary text-[36px] font-bold text-center">Choose your partnership level</h2>
          <p className="text-text-secondary text-[16px] mt-[12px] max-w-[560px] text-center leading-relaxed">
            Three tiers designed for different stages of partnership — from first referral to full strategic alliance.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] mt-[48px] w-full">

            {/* Referral (Silver) */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] flex flex-col">
              <div className="bg-elevated border border-border text-text-secondary text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] inline-block w-fit tracking-wide">
                SILVER
              </div>
              <h3 className="text-text-primary text-[22px] font-semibold mt-[16px]">Referral</h3>

              <div className="bg-[rgba(0,102,255,0.06)] border border-[rgba(0,102,255,0.12)] rounded-[8px] p-[16px] mt-[12px]">
                <div className="text-text-secondary text-[12px]">Revenue Share</div>
                <div className="text-cta text-[28px] font-bold leading-tight">20%</div>
                <div className="text-text-secondary text-[12px]">on referred accounts · 12 months</div>
              </div>

              <div className="flex flex-col gap-[10px] mt-[20px] flex-grow">
                {[
                  "20% revenue share for 12 months on referred accounts",
                  "Access to partner marketing kit (logos, copy, case studies)",
                  "Listed in Solidus partner directory",
                  "Monthly partner newsletter with product updates"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-[8px]">
                    <Check className="w-[14px] h-[14px] text-success mt-[4px] flex-shrink-0" />
                    <span className="text-text-primary text-[14px] leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-[24px]">
                <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-wider mb-[8px]">Requirements</h3>
                <p className="text-text-secondary text-[14px]">2+ successful customer referrals per quarter</p>
              </div>

              <button className="w-full h-[44px] bg-transparent border border-border text-text-primary rounded-[8px] text-[14px] font-medium hover:bg-elevated transition-colors mt-[24px]">
                Join as Referral Partner
              </button>
            </div>

            {/* Integration (Gold) */}
            <div className="bg-surface border-2 border-cta rounded-[12px] p-[32px] flex flex-col relative shadow-[0_0_0_2px_#0066FF]">
              <div className="flex items-center gap-[12px]">
                <div className="bg-[rgba(168,230,0,0.12)] text-[#8BB000] text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] inline-block w-fit tracking-wide">
                  GOLD
                </div>
                <div className="bg-cta text-white text-[11px] font-semibold px-[8px] py-[4px] rounded-[6px] uppercase tracking-wide">
                  Most Popular
                </div>
              </div>

              <h3 className="text-text-primary text-[22px] font-semibold mt-[16px]">Integration</h3>

              <div className="bg-[rgba(0,102,255,0.06)] border border-[rgba(0,102,255,0.12)] rounded-[8px] p-[16px] mt-[12px]">
                <div className="text-text-secondary text-[12px]">Revenue Share</div>
                <div className="text-cta text-[28px] font-bold leading-tight">30%</div>
                <div className="text-text-secondary text-[12px]">on referred accounts · recurring</div>
              </div>

              <div className="flex flex-col gap-[10px] mt-[20px] flex-grow">
                {[
                  "30% revenue share + renewal commissions",
                  "Co-marketing: joint blog posts, webinar opportunities",
                  "Listed with featured placement in partner directory",
                  "Product roadmap input — quarterly partner council",
                  "Integration technical support during launch"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-[8px]">
                    <Check className="w-[14px] h-[14px] text-success mt-[4px] flex-shrink-0" />
                    <span className="text-text-primary text-[14px] leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-[24px]">
                <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-wider mb-[8px]">Requirements</h3>
                <p className="text-text-secondary text-[14px]">Published technical integration + 5+ active customers</p>
              </div>

              <button className="w-full h-[44px] bg-cta text-white rounded-[8px] text-[14px] font-semibold hover:bg-cta/90 transition-colors mt-[24px]">
                Apply for Integration Partnership
              </button>
            </div>

            {/* Strategic (Platinum) */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] flex flex-col">
              <div className="bg-[rgba(0,212,255,0.12)] text-[#007A99] text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] inline-block w-fit tracking-wide">
                PLATINUM
              </div>
              <h3 className="text-text-primary text-[22px] font-semibold mt-[16px]">Strategic</h3>

              <div className="bg-[rgba(0,102,255,0.06)] border border-[rgba(0,102,255,0.12)] rounded-[8px] p-[16px] mt-[12px]">
                <div className="text-text-secondary text-[12px]">Revenue Share</div>
                <div className="text-text-primary text-[28px] font-bold leading-tight">Custom</div>
                <div className="text-text-secondary text-[12px]">negotiated per agreement</div>
              </div>

              <div className="flex flex-col gap-[10px] mt-[20px] flex-grow">
                {[
                  "Custom revenue share structure",
                  "Joint go-to-market strategy and co-selling",
                  "Dedicated partner manager — direct line",
                  "Joint case studies and press releases",
                  "Early access to beta features",
                  "Executive business reviews (quarterly)"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-[8px]">
                    <Check className="w-[14px] h-[14px] text-success mt-[4px] flex-shrink-0" />
                    <span className="text-text-primary text-[14px] leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-[24px]">
                <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-wider mb-[8px]">Requirements</h3>
                <p className="text-text-secondary text-[14px]">By application only — enterprise-scale business</p>
              </div>

              <button className="w-full h-[44px] bg-transparent border border-border text-text-primary rounded-[8px] text-[14px] font-medium hover:bg-elevated transition-colors mt-[24px]">
                Apply for Strategic Partnership
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Partner Types */}
      <section className="bg-surface px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          <h2 className="text-text-primary text-[32px] font-bold text-center">Who partners with Solidus?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[48px] w-full">

            {/* Tech Partners */}
            <div className="bg-surface border border-border rounded-[12px] p-[28px] flex flex-col">
              <div className="bg-[rgba(0,102,255,0.08)] rounded-[12px] p-[10px] w-fit">
                <Cpu className="w-[40px] h-[40px] text-cta" />
              </div>
              <h3 className="text-text-primary text-[20px] font-semibold mt-[16px]">Technology Partners</h3>
              <p className="text-text-secondary text-[14px] mt-[8px] leading-relaxed flex-grow">
                SaaS platforms, payments companies, and infrastructure providers that embed Solidus Verify as a native compliance layer for their customers.
              </p>
              <div className="mt-[16px]">
                <h3 className="text-text-secondary text-[13px] font-medium uppercase tracking-wider mb-[4px]">Typical Partners</h3>
                <p className="text-text-secondary text-[14px]">Fintech SaaS · Crypto exchanges · Payment processors · Wallet providers</p>
              </div>
            </div>

            {/* Solution Integrators */}
            <div className="bg-surface border border-border rounded-[12px] p-[28px] flex flex-col">
              <div className="bg-[rgba(0,102,255,0.08)] rounded-[12px] p-[10px] w-fit">
                <Briefcase className="w-[40px] h-[40px] text-cta" />
              </div>
              <h3 className="text-text-primary text-[20px] font-semibold mt-[16px]">Solution Integrators</h3>
              <p className="text-text-secondary text-[14px] mt-[8px] leading-relaxed flex-grow">
                Consulting firms, compliance advisory practices, and system integrators that implement Solidus Verify for their clients and earn referral or project-based revenue.
              </p>
              <div className="mt-[16px]">
                <h3 className="text-text-secondary text-[13px] font-medium uppercase tracking-wider mb-[4px]">Typical Partners</h3>
                <p className="text-text-secondary text-[14px]">Big 4 consulting · RegTech advisors · Compliance agencies · Law firms</p>
              </div>
            </div>

            {/* Resellers */}
            <div className="bg-surface border border-border rounded-[12px] p-[28px] flex flex-col">
              <div className="bg-[rgba(0,102,255,0.08)] rounded-[12px] p-[10px] w-fit">
                <Globe className="w-[40px] h-[40px] text-cta" />
              </div>
              <h3 className="text-text-primary text-[20px] font-semibold mt-[16px]">Regional Resellers</h3>
              <p className="text-text-secondary text-[14px] mt-[8px] leading-relaxed flex-grow">
                Regional distributors and local market specialists who resell Solidus Verify to customers in markets where local presence and language support matter.
              </p>
              <div className="mt-[16px]">
                <h3 className="text-text-secondary text-[13px] font-medium uppercase tracking-wider mb-[4px]">Typical Partners</h3>
                <p className="text-text-secondary text-[14px]">APAC distributors · LATAM resellers · MENA compliance firms</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Current Partners */}
      <section className="bg-elevated px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          <h2 className="text-text-primary text-[32px] font-bold text-center">Trusted by teams building the future of compliance</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[32px] mt-[48px] max-w-[900px] w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-[48px] bg-border rounded-[8px] flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-200 cursor-pointer"
              >
                <span className="text-text-disabled text-[12px]">Partner Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Benefits Matrix */}
      <section className="bg-surface px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold">What you get at each tier</h2>

          <div className="bg-surface border border-border rounded-[12px] overflow-hidden mt-[40px] overflow-x-auto shadow-sm">
            <div className="min-w-[700px]">
              {/* Header */}
              <div className="flex bg-elevated border-b border-border h-[52px]">
                <div className="w-[40%] px-[24px] flex items-center text-text-secondary text-[13px] font-medium">Benefit</div>
                <div className="w-[20%] px-[16px] flex items-center justify-center text-text-primary text-[13px] font-semibold">Referral (Silver)</div>
                <div className="w-[20%] px-[16px] flex items-center justify-center text-text-primary text-[13px] font-semibold bg-[rgba(168,230,0,0.06)] border-l border-r border-border">Integration (Gold)</div>
                <div className="w-[20%] px-[16px] flex items-center justify-center text-text-primary text-[13px] font-semibold">Strategic (Platinum)</div>
              </div>

              {/* Rows */}
              {[
                { name: 'Revenue share', s: '20%', g: '30%', p: 'Custom' },
                { name: 'Co-marketing', s: false, g: true, p: true },
                { name: 'Product roadmap input', s: false, g: true, p: true },
                { name: 'Joint case studies', s: false, g: false, p: true },
                { name: 'Dedicated partner manager', s: false, g: false, p: true },
                { name: 'Partner directory listing', s: '✓', g: 'Featured', p: 'Featured + priority' },
                { name: 'Technical certification', s: false, g: true, p: true },
                { name: 'Executive business reviews', s: false, g: false, p: '✓ (quarterly)' },
                { name: 'Early feature access', s: false, g: 'Limited', p: 'Full' },
              ].map((row, i) => (
                <div key={i} className={`flex h-[52px] border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-surface' : 'bg-elevated'}`}>
                  <div className="w-[40%] px-[24px] flex items-center text-text-primary text-[14px]">{row.name}</div>

                  {/* Silver Col */}
                  <div className="w-[20%] px-[16px] flex items-center justify-center">
                    {typeof row.s === 'boolean' ? (
                      row.s ? <CheckCircle className="w-[16px] h-[16px] text-success" /> : <Minus className="w-[16px] h-[16px] text-text-secondary" />
                    ) : (
                      <span className="text-text-primary text-[14px]">{row.s}</span>
                    )}
                  </div>

                  {/* Gold Col */}
                  <div className="w-[20%] px-[16px] flex items-center justify-center bg-[rgba(168,230,0,0.02)] border-l border-r border-border">
                    {typeof row.g === 'boolean' ? (
                      row.g ? <CheckCircle className="w-[16px] h-[16px] text-success" /> : <Minus className="w-[16px] h-[16px] text-text-secondary" />
                    ) : (
                      <span className="text-text-primary text-[14px] font-medium">{row.g}</span>
                    )}
                  </div>

                  {/* Platinum Col */}
                  <div className="w-[20%] px-[16px] flex items-center justify-center">
                    {typeof row.p === 'boolean' ? (
                      row.p ? <CheckCircle className="w-[16px] h-[16px] text-success" /> : <Minus className="w-[16px] h-[16px] text-text-secondary" />
                    ) : (
                      <span className="text-text-primary text-[14px]">{row.p}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Application CTA */}
      <section className="bg-bg px-8 sm:px-[120px] py-[100px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-[80px] items-center">

          <div className="w-full md:w-[480px]">
            <h2 className="text-white text-[36px] font-bold leading-tight">Ready to partner with Solidus?</h2>
            <p className="text-text-secondary text-[16px] mt-[16px] leading-relaxed">
              Applications are reviewed within 3 business days. We&apos;ll match you with the right tier and walk you through the onboarding process.
            </p>

            <div className="bg-surface border border-border rounded-[12px] p-[24px] mt-[32px]">
              <Quote className="w-[16px] h-[16px] text-cta" />
              <p className="text-white text-[14px] italic mt-[8px] leading-relaxed">
                &ldquo;Joining the Solidus Partner Program was the fastest enterprise sales motion we&apos;ve ever run. First check arrived 3 weeks after signing.&rdquo;
              </p>
              <div className="text-text-secondary text-[12px] mt-[12px]">
                — Clara Mäkinen, CEO, RegStar Nordic
              </div>
            </div>
          </div>

          <div className="flex-grow w-full max-w-[560px]">
            <div className="bg-surface border border-border rounded-[12px] p-[32px]">
              <h3 className="text-white text-[18px] font-semibold">Apply to Partner Program</h3>

              <form className="flex flex-col gap-[14px] mt-[20px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <input type="text" placeholder="Company Name" className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[14px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta" />
                  <input type="url" placeholder="Website" className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[14px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta" />
                </div>

                <div className="grid grid-cols-2 gap-[12px]">
                  <input type="text" placeholder="Your Name" className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[14px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta" />
                  <input type="text" placeholder="Title" className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[14px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta" />
                </div>

                <div className="flex flex-wrap gap-[8px]">
                  {['Referral', 'Integration', 'Strategic'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPartnerType(type)}
                      className={`h-[36px] px-[16px] rounded-[6px] text-[13px] font-medium transition-colors ${
                        partnerType === type
                          ? 'bg-cta border border-cta text-white'
                          : 'bg-elevated border border-border text-white hover:bg-elevated'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <select className="w-full h-[44px] bg-elevated border border-border rounded-[8px] pl-[14px] pr-[36px] text-[14px] text-white appearance-none focus:outline-none focus:border-cta cursor-pointer">
                    <option value="" disabled className="text-text-disabled">Annual Revenue</option>
                    <option value="< $1M">&lt; $1M</option>
                    <option value="$1M–$10M">$1M–$10M</option>
                    <option value="$10M–$100M">$10M–$100M</option>
                    <option value="$100M+">$100M+</option>
                  </select>
                  <ChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-text-disabled pointer-events-none" />
                </div>

                <textarea
                  placeholder="Tell us about your business and how you'd like to work with Solidus"
                  className="w-full h-[80px] bg-elevated border border-border rounded-[8px] p-[14px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta resize-none"
                />

                <input type="email" placeholder="Work Email" className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[14px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta" />

                <button type="button" className="w-full h-[48px] bg-cta hover:bg-cta/90 text-white font-semibold text-[14px] rounded-[8px] transition-colors mt-[6px]">
                  Submit Application
                </button>
              </form>

              <div className="text-text-disabled text-[12px] text-center mt-[12px]">
                We review every application personally. Response within 3 business days.
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
