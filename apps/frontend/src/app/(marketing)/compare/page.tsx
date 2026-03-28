'use client'

import React, { useState, useRef } from 'react'
import {
  Info, CheckCircle, XCircle, AlertTriangle, Minus,
  ChevronDown, ChevronUp, CircleDot, FileText, Quote, ArrowRight
} from 'lucide-react'

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState('vs. Sumsub')
  const [expandedMigration, setExpandedMigration] = useState<string | null>('Sumsub')

  const migrationRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { label: 'vs. Sumsub', id: 'Sumsub' },
    { label: 'vs. Stripe Identity', id: 'Stripe Identity' },
    { label: 'vs. Persona', id: 'Persona' },
    { label: 'vs. Onfido', id: 'Onfido' },
    { label: 'vs. Veriff', id: 'Veriff' },
  ]

  const handleTabClick = (tab: { label: string; id: string }) => {
    setActiveTab(tab.label)
    setExpandedMigration(tab.id)
    if (migrationRef.current) {
      migrationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const toggleMigration = (id: string) => {
    setExpandedMigration(prev => (prev === id ? null : id))
  }

  return (
    <>
      {/* Section 1: Header */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[80px] pb-[48px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            COMPETITIVE COMPARISON
          </div>
          <h1 className="text-text-primary text-[48px] font-bold mt-[12px] leading-tight">
            Solidus Verify vs. the competition
          </h1>
          <p className="text-text-secondary text-[18px] mt-[16px] max-w-[660px] leading-relaxed">
            An honest, side-by-side comparison of Solidus Verify against Sumsub, Stripe Identity, Persona, and Onfido — including pricing, technology, compliance coverage, and privacy model.
          </p>
          <div className="flex items-center gap-[6px] mt-[12px]">
            <Info className="w-[14px] h-[14px] text-text-disabled" />
            <span className="text-text-disabled text-[12px]">
              Competitor data sourced from public pricing pages and documentation as of March 2026. Subject to change.
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Navigation Tab Bar */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[32px] w-full flex justify-center sticky top-[72px] z-40">
        <div className="max-w-[1200px] w-full">
          <div className="bg-elevated border border-border rounded-[12px] p-[6px] inline-flex flex-wrap gap-[4px]">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab)}
                className={`h-[40px] px-[18px] rounded-[8px] text-[14px] font-medium transition-all ${
                  activeTab === tab.label
                    ? 'bg-surface shadow-[0_1px_4px_rgba(0,0,0,0.08)] text-text-primary'
                    : 'text-text-secondary hover:bg-[rgba(255,255,255,0.60)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Detailed Comparison Table */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold mb-[32px]">Full feature comparison</h2>

          <div className="bg-surface border border-border rounded-[12px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* Table Header */}
                <div className="flex h-[56px] border-b border-border bg-surface sticky top-0 z-10">
                  <div className="w-[24%] px-[24px] flex items-center bg-surface">
                    <span className="text-text-secondary text-[12px] font-medium uppercase">Feature</span>
                  </div>
                  <div className="w-[19%] px-[16px] flex items-center bg-[rgba(0,102,255,0.06)] border-l border-r border-border">
                    <span className="text-cta text-[12px] font-semibold uppercase">Solidus Verify</span>
                  </div>
                  <div className="w-[19%] px-[16px] flex items-center bg-surface">
                    <span className="text-text-secondary text-[12px] font-medium uppercase">Sumsub</span>
                  </div>
                  <div className="w-[19%] px-[16px] flex items-center bg-surface border-l border-r border-border">
                    <span className="text-text-secondary text-[12px] font-medium uppercase">Stripe Identity</span>
                  </div>
                  <div className="w-[19%] px-[16px] flex items-center bg-surface">
                    <span className="text-text-secondary text-[12px] font-medium uppercase">Persona</span>
                  </div>
                </div>

                {/* PRICING */}
                <div className="bg-elevated border-b border-border h-[36px] px-[24px] flex items-center">
                  <span className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em]">Pricing</span>
                </div>

                {/* KYC L2 Cost */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">KYC L2 Verification</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex flex-col justify-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <div className="flex items-center gap-[6px]">
                      <span className="font-mono text-success text-[14px] font-semibold">$5.00</span>
                    </div>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex flex-col justify-center">
                    <span className="font-mono text-text-primary text-[14px]">~$12–20</span>
                    <span className="text-text-disabled text-[11px]">volume dep.</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex flex-col justify-center border-l border-r border-border">
                    <span className="font-mono text-text-primary text-[14px]">$1.50</span>
                    <span className="text-text-disabled text-[11px]">doc check only</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex flex-col justify-center">
                    <span className="font-mono text-text-primary text-[14px]">$3–8</span>
                    <span className="text-text-disabled text-[11px]">tier dep.</span>
                  </div>
                </div>

                {/* Re-verification cost */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Re-verification cost</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex flex-col justify-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <span className="font-mono text-success text-[14px] font-bold">$0.05</span>
                    <span className="text-success text-[11px] font-medium">per presentation</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[6px]">
                    <span className="text-error text-[14px]">Same as initial</span>
                    <XCircle className="w-[12px] h-[12px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <span className="text-error text-[14px]">Same as initial</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <span className="text-error text-[14px]">Same as initial</span>
                  </div>
                </div>

                {/* Free tier */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Free tier</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">100 verifications/month</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Sandbox only</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Test mode</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <Minus className="w-[14px] h-[14px] text-text-secondary flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">No free tier</span>
                  </div>
                </div>

                {/* Enterprise pricing transparency */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Enterprise pricing transparency</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Public volume table</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <XCircle className="w-[14px] h-[14px] text-error flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Sales call required</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Public page</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <XCircle className="w-[14px] h-[14px] text-error flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Quote only</span>
                  </div>
                </div>

                {/* TECHNOLOGY */}
                <div className="bg-elevated border-b border-border h-[36px] px-[24px] flex items-center">
                  <span className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em]">Technology</span>
                </div>

                {/* On-chain credentials */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">On-chain credentials</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Native — Solidus chain</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <XCircle className="w-[14px] h-[14px] text-error flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Not supported</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Not supported</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <XCircle className="w-[14px] h-[14px] text-error flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Not supported</span>
                  </div>
                </div>

                {/* W3C VC standard */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">W3C VC standard</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* BBS+ selective disclosure */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">BBS+ selective disclosure</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* Biometric data storage */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Biometric data storage</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Zero — processed and deleted</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Retained per contract</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] border-l border-r border-border">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Retained per policy</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Retained per policy</span>
                  </div>
                </div>

                {/* Open source protocol */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Open source protocol</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Apache 2.0</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* COMPLIANCE */}
                <div className="bg-elevated border-b border-border h-[36px] px-[24px] flex items-center">
                  <span className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em]">Compliance</span>
                </div>

                {/* GDPR */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">GDPR</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                </div>

                {/* SOC 2 */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">SOC 2</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Planned 2026</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                </div>

                {/* ISO 27001 */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">ISO 27001</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Planned 2026</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                </div>

                {/* MiCA */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">MiCA</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Partial</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* eIDAS 2 */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">eIDAS 2</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* FATF Travel Rule */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">FATF Travel Rule</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning" />
                  </div>
                </div>

                {/* FEATURES */}
                <div className="bg-elevated border-b border-border h-[36px] px-[24px] flex items-center">
                  <span className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em]">Features</span>
                </div>

                {/* Workflow builder */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Workflow builder</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">No-code, in beta</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                </div>

                {/* Case management */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Case management</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                </div>

                {/* Document types */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Document types</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">11,000+</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <span className="text-text-primary text-[14px]">6,000+</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <span className="text-text-primary text-[14px]">33 countries</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <span className="text-text-primary text-[14px]">5,000+</span>
                  </div>
                </div>

                {/* Countries */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Countries</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">183</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">220</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <span className="text-text-primary text-[14px]">~35</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <span className="text-text-primary text-[14px]">200+</span>
                  </div>
                </div>

                {/* SDK languages */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">SDK languages</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <span className="text-text-primary text-[14px]">JS, Python, Go, React Native</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <span className="text-text-primary text-[14px]">JS, iOS, Android</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <span className="text-text-primary text-[14px]">7 languages</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <span className="text-text-primary text-[14px]">JS, iOS, Android</span>
                  </div>
                </div>

                {/* PRIVACY */}
                <div className="bg-elevated border-b border-border h-[36px] px-[24px] flex items-center">
                  <span className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em]">Privacy</span>
                </div>

                {/* Zero biometric storage */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Zero biometric storage</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* User-controlled credentials */}
                <div className="flex min-h-[52px] border-b border-border bg-elevated">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">User-controlled credentials</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center border-l border-r border-border">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center">
                    <XCircle className="w-[14px] h-[14px] text-error" />
                  </div>
                </div>

                {/* Right to erasure */}
                <div className="flex min-h-[52px] border-b border-border bg-surface">
                  <div className="w-[24%] px-[24px] py-[16px] flex items-center text-text-primary text-[14px]">Right to erasure</div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] bg-[rgba(0,102,255,0.02)] border-l border-r border-border">
                    <CheckCircle className="w-[14px] h-[14px] text-success flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Credential revocation</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Process-based</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px] border-l border-r border-border">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Process-based</span>
                  </div>
                  <div className="w-[19%] px-[16px] py-[16px] flex items-center gap-[8px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-warning flex-shrink-0" />
                    <span className="text-text-primary text-[14px]">Process-based</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Table Footnote */}
            <div className="bg-elevated px-[24px] py-[12px]">
              <p className="text-text-disabled text-[11px] leading-relaxed">
                ✓ Confirmed from public documentation · ~ Partial implementation · ✗ Not supported as of March 2026. This comparison is provided for informational purposes and may not reflect the latest product updates from competitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Migration Guides */}
      <section ref={migrationRef} className="bg-elevated px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold">Switching from another provider?</h2>
          <p className="text-text-secondary text-[16px] mt-[12px] max-w-[560px] leading-relaxed">
            Migration is straightforward. Most teams are live within 2–3 days. Our team helps with data mapping, credential backfill, and cutover strategy.
          </p>

          <div className="flex flex-col gap-[12px] mt-[40px] max-w-[800px]">

            {/* Accordion 1: Sumsub */}
            <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
              <button
                onClick={() => toggleMigration('Sumsub')}
                className="w-full flex justify-between items-center px-[24px] py-[20px] bg-surface hover:bg-elevated transition-colors"
              >
                <h3 className="text-text-primary text-[16px] font-semibold">Migrating from Sumsub</h3>
                {expandedMigration === 'Sumsub' ? <ChevronUp className="w-[16px] h-[16px] text-text-disabled" /> : <ChevronDown className="w-[16px] h-[16px] text-text-disabled" />}
              </button>
              {expandedMigration === 'Sumsub' && (
                <div className="px-[24px] pb-[24px] border-t border-border pt-[20px]">
                  <p className="text-text-secondary text-[14px] font-medium mb-[16px]">Timeline: 2–3 days to full cutover.</p>
                  <p className="text-text-secondary text-[14px] mb-[20px] leading-relaxed">
                    Sumsub stores verification records in their dashboard. You&apos;ll need to export existing user KYC status and decide whether to trust-migrate (carry forward Sumsub approvals) or re-verify all users on Solidus.
                  </p>

                  <div className="flex flex-col gap-[8px]">
                    {[
                      'Export user list and KYC status from Sumsub dashboard (CSV export)',
                      'Map Sumsub approval levels to Solidus KYC levels (L1/L2/L3)',
                      'Use Solidus Bulk Import API to create credential records for trust-migrated users',
                      'Swap API endpoint in your backend from Sumsub → Solidus',
                      'Run parallel for 48 hours to confirm parity, then remove Sumsub',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-[10px]">
                        <CircleDot className="w-[14px] h-[14px] text-cta mt-[3px] flex-shrink-0" />
                        <span className="text-text-secondary text-[14px]">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-elevated border border-border rounded-[8px] p-[12px] mt-[16px] flex items-start gap-[10px]">
                    <FileText className="w-[14px] h-[14px] text-cta mt-[2px] flex-shrink-0" />
                    <span className="text-text-secondary text-[13px] leading-relaxed">
                      Sumsub exports in JSON and CSV. Solidus Bulk Import accepts both formats with a field mapping config.
                    </span>
                  </div>

                  <div className="mt-[20px] border border-border rounded-[8px] overflow-hidden w-fit">
                    <div className="flex border-b border-border">
                      <div className="bg-elevated px-[16px] py-[10px] w-[140px] text-[13px] text-text-secondary font-medium border-r border-border">Current (Sumsub)</div>
                      <div className="bg-surface px-[16px] py-[10px] w-[200px] text-[13px] text-text-primary">$15.00/user avg.</div>
                    </div>
                    <div className="flex">
                      <div className="bg-elevated px-[16px] py-[10px] w-[140px] text-[13px] text-text-secondary font-medium border-r border-border">Solidus</div>
                      <div className="bg-surface px-[16px] py-[10px] w-[200px] text-[13px] text-success font-medium">$5.00 initial + $0.05/reuse</div>
                    </div>
                  </div>

                  <button className="text-cta text-[14px] font-medium mt-[20px] hover:underline inline-flex items-center gap-[4px]">
                    Contact migration support <ArrowRight className="w-[14px] h-[14px]" />
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 2: Stripe Identity */}
            <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
              <button
                onClick={() => toggleMigration('Stripe Identity')}
                className="w-full flex justify-between items-center px-[24px] py-[20px] bg-surface hover:bg-elevated transition-colors"
              >
                <h3 className="text-text-primary text-[16px] font-semibold">Migrating from Stripe Identity</h3>
                {expandedMigration === 'Stripe Identity' ? <ChevronUp className="w-[16px] h-[16px] text-text-disabled" /> : <ChevronDown className="w-[16px] h-[16px] text-text-disabled" />}
              </button>
              {expandedMigration === 'Stripe Identity' && (
                <div className="px-[24px] pb-[24px] border-t border-border pt-[20px]">
                  <p className="text-text-secondary text-[14px] font-medium mb-[16px]">Timeline: 1 day.</p>
                  <p className="text-text-secondary text-[14px] leading-relaxed">
                    Note that Stripe Identity only supports document-only verification (no liveness), so migrating typically means an upgrade in verification depth. Stripe has limited export options, so most teams choose to have users claim a new Solidus credential upon their next login.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: Persona */}
            <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
              <button
                onClick={() => toggleMigration('Persona')}
                className="w-full flex justify-between items-center px-[24px] py-[20px] bg-surface hover:bg-elevated transition-colors"
              >
                <h3 className="text-text-primary text-[16px] font-semibold">Migrating from Persona</h3>
                {expandedMigration === 'Persona' ? <ChevronUp className="w-[16px] h-[16px] text-text-disabled" /> : <ChevronDown className="w-[16px] h-[16px] text-text-disabled" />}
              </button>
              {expandedMigration === 'Persona' && (
                <div className="px-[24px] pb-[24px] border-t border-border pt-[20px]">
                  <p className="text-text-secondary text-[14px] font-medium mb-[16px]">Timeline: 2–3 days.</p>
                  <p className="text-text-secondary text-[14px] leading-relaxed">
                    Persona relies heavily on its internal workflow system. Export your existing flows as reference maps, and our solutions engineers will help you rebuild equivalent rule sets within the Solidus Workflow Builder.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 4: Onfido */}
            <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
              <button
                onClick={() => toggleMigration('Onfido')}
                className="w-full flex justify-between items-center px-[24px] py-[20px] bg-surface hover:bg-elevated transition-colors"
              >
                <h3 className="text-text-primary text-[16px] font-semibold">Migrating from Onfido</h3>
                {expandedMigration === 'Onfido' ? <ChevronUp className="w-[16px] h-[16px] text-text-disabled" /> : <ChevronDown className="w-[16px] h-[16px] text-text-disabled" />}
              </button>
              {expandedMigration === 'Onfido' && (
                <div className="px-[24px] pb-[24px] border-t border-border pt-[20px]">
                  <p className="text-text-secondary text-[14px] font-medium mb-[16px]">Timeline: 2–3 days.</p>
                  <p className="text-text-secondary text-[14px] leading-relaxed">
                    If you are using Onfido&apos;s frontend SDK, you can drop in the Solidus SDK as a replacement. Our SDK uses nearly identical method signatures for common initialization and callback operations to minimize frontend engineering work.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 5: Veriff */}
            <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
              <button
                onClick={() => toggleMigration('Veriff')}
                className="w-full flex justify-between items-center px-[24px] py-[20px] bg-surface hover:bg-elevated transition-colors"
              >
                <h3 className="text-text-primary text-[16px] font-semibold">Migrating from Veriff</h3>
                {expandedMigration === 'Veriff' ? <ChevronUp className="w-[16px] h-[16px] text-text-disabled" /> : <ChevronDown className="w-[16px] h-[16px] text-text-disabled" />}
              </button>
              {expandedMigration === 'Veriff' && (
                <div className="px-[24px] pb-[24px] border-t border-border pt-[20px]">
                  <p className="text-text-secondary text-[14px] font-medium mb-[16px]">Timeline: 1–2 days.</p>
                  <p className="text-text-secondary text-[14px] leading-relaxed">
                    Veriff uses session-based flows similar to Solidus. This provides the most direct migration path, mapping 1:1 between Veriff session URLs and Solidus Verification Session creation endpoints.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: Independent Assessment */}
      <section className="bg-surface px-8 sm:px-[120px] py-[64px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex justify-center">
          <div className="bg-bg rounded-[12px] p-[40px] max-w-[820px] w-full flex flex-col items-center text-center">
            <Quote className="w-[28px] h-[28px] text-cta mb-[16px]" />
            <h2 className="text-white text-[24px] font-semibold italic leading-[1.5]">
              &ldquo;Solidus is the first KYC provider to treat credential portability as a first-class feature rather than an afterthought. The combination of W3C VC compliance, BBS+ selective disclosure, and on-chain anchoring puts it in a category of one.&rdquo;
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-[16px] mt-[24px]">
              <span className="text-text-secondary text-[13px] font-medium">
                — Compliance Technology Review, Q1 2026
              </span>
              <div className="bg-surface border border-border rounded-[6px] px-[10px] py-[4px]">
                <span className="text-text-secondary text-[11px] font-medium">Independent Research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="bg-elevated px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          <h2 className="text-text-primary text-[40px] font-bold text-center">Ready to switch?</h2>
          <p className="text-text-secondary text-[18px] mt-[16px] max-w-[520px] text-center leading-relaxed">
            Join 1,000+ teams that chose portable, privacy-respecting KYC over repeated re-verification costs.
          </p>

          <div className="flex flex-wrap justify-center gap-[12px] mt-[40px]">
            <div className="flex flex-col items-center gap-[8px]">
              <button className="h-[48px] bg-cta text-white px-[28px] rounded-[8px] text-[14px] font-semibold hover:bg-cta/90 transition-colors">
                Start Free Trial
              </button>
              <span className="text-text-disabled text-[12px]">100 free verifications — no credit card</span>
            </div>
            <div>
              <button className="h-[48px] bg-transparent border border-border text-text-primary px-[24px] rounded-[8px] text-[14px] font-medium hover:bg-border transition-colors">
                Talk to Sales
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-[32px] mt-[32px]">
            {['No credit card required', 'Migration support included', '99.4% success rate', '180+ countries'].map((trust, i) => (
              <span key={i} className="text-text-secondary text-[13px] flex items-center gap-[6px]">
                <span className="w-[4px] h-[4px] bg-cta rounded-full"></span>
                {trust}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
