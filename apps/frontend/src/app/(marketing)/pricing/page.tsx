'use client'

import React, { useState } from 'react'
import {
  Globe, ChevronDown, Moon, ShieldCheck, Mail, ArrowRight,
  Check, Minus, AlertTriangle, Info, Repeat
} from 'lucide-react'

const PricingHeader = ({ isSub, setIsSub }: { isSub: boolean; setIsSub: (val: boolean) => void }) => {
  return (
    <div className="w-full bg-surface pt-24 pb-12 px-8 md:px-[120px] flex flex-col items-center">
      <h1 className="text-[48px] font-bold text-text-primary mb-4 text-center">Pricing</h1>
      <p className="text-[18px] text-text-secondary mb-12 text-center max-w-[600px]">
        Pay per verification. No setup fees. No minimums. Cancel anytime.
      </p>

      <div className="flex items-center p-1 bg-elevated rounded-full relative">
        <button
          onClick={() => setIsSub(false)}
          className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors ${!isSub ? 'bg-bg text-white shadow-sm' : 'text-text-secondary'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsSub(true)}
          className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${isSub ? 'bg-bg text-white shadow-sm' : 'text-text-secondary'}`}
        >
          Annual
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isSub ? 'bg-success/20 text-success' : 'bg-success/10 text-success'}`}>Save 20%</span>
        </button>
      </div>
    </div>
  )
}

const PlanCards = ({ isSub }: { isSub: boolean }) => {
  return (
    <div className="w-full bg-surface pb-16 px-8 flex flex-col items-center">
      <div className="w-full max-w-[1040px] grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Startup */}
        <div className="bg-surface border border-border rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow">
          <h3 className="text-[20px] font-bold text-text-primary mb-2">Startup</h3>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-[32px] font-bold text-text-primary">${isSub ? '79' : '99'}</span>
            <span className="text-[16px] text-text-secondary">/mo</span>
          </div>
          <span className="text-[14px] text-text-secondary mb-6">10,000 verification queries/month</span>

          <button className="w-full h-[44px] rounded-lg border border-border text-[15px] font-medium text-text-primary hover:bg-elevated transition-colors mb-8">
            Start Free Trial
          </button>

          <div className="flex flex-col gap-4 mt-auto">
            <span className="text-[12px] font-semibold text-text-primary tracking-wider uppercase">Features</span>
            {[
              'Email + phone verification',
              'KYC Level 1 & 2',
              'REST API + JavaScript SDK',
              'Standard SLA 99.5%',
              '1 team member',
              'Community support',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="text-[14px] text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth */}
        <div className="bg-surface border-2 border-cta rounded-xl p-8 flex flex-col relative scale-[1.03] shadow-xl z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cta text-white text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full">
            Most Popular
          </div>

          <h3 className="text-[20px] font-bold text-text-primary mb-2">Growth</h3>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-[32px] font-bold text-text-primary">${isSub ? '399' : '499'}</span>
            <span className="text-[16px] text-text-secondary">/mo</span>
          </div>
          <span className="text-[14px] text-text-secondary mb-6">100,000 queries/month</span>

          <button className="w-full h-[44px] rounded-lg bg-cta hover:bg-cta/90 text-[15px] font-semibold text-white transition-colors mb-8 shadow-md">
            Start Free Trial
          </button>

          <div className="flex flex-col gap-4 mt-auto">
            <span className="text-[12px] font-semibold text-text-primary tracking-wider uppercase">Everything in Startup, plus:</span>
            {[
              'KYC Level 3 + sanctions screening',
              'All SDKs (JS, Python, Go, Rust)',
              'Priority SLA 99.9%',
              '10 team members',
              'Compliance reporting dashboard',
              'Webhook delivery logs',
              'Priority email support',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="text-[14px] text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise */}
        <div className="bg-surface border border-border rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow">
          <h3 className="text-[20px] font-bold text-text-primary mb-2">Enterprise</h3>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-[32px] font-bold text-text-primary">Custom</span>
          </div>
          <span className="text-[14px] text-text-secondary mb-6">Unlimited queries</span>

          <button className="w-full h-[44px] rounded-lg border border-bg text-[15px] font-medium text-text-primary hover:bg-bg hover:text-white transition-colors mb-8">
            Contact Sales
          </button>

          <div className="flex flex-col gap-4 mt-auto">
            <span className="text-[12px] font-semibold text-text-primary tracking-wider uppercase">Everything in Growth, plus:</span>
            {[
              'White-label API + custom branding',
              'Dedicated compliance advisor',
              'On-premise deployment option',
              'Custom SLA + MSA',
              'Dedicated Slack channel',
              '24/7 phone support',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="text-[14px] text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <p className="text-[13px] text-text-secondary mt-8 text-center max-w-[500px]">
        All plans include 14-day free trial. First 1,000 verifications free. No credit card required to start.
      </p>
    </div>
  )
}

const VolumeCalculatorSection = () => {
  const [vol, setVol] = useState(50000)
  const max = 1000000

  const paygoCost = vol * 0.001
  const startupCost = vol <= 10000 ? 99 : 99 + (vol - 10000) * 0.001
  const growthCost = vol <= 100000 ? 499 : 499 + (vol - 100000) * 0.001

  return (
    <div className="w-full bg-elevated py-12 px-8 flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="text-[36px] font-bold text-text-primary">Calculate your cost</h2>
      </div>

      <div className="w-full max-w-[720px] bg-surface rounded-xl border border-border p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col gap-6">

        <div className="flex flex-col">
          <h3 className="text-[18px] font-semibold text-text-primary mb-4">Monthly verifications</h3>

          <input
            type="range" min={0} max={max} step={1000}
            value={vol} onChange={(e) => setVol(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-border outline-none mb-4 cursor-pointer"
            style={{ background: `linear-gradient(to right, #0066FF 0%, #0066FF ${(vol / max) * 100}%, #E0E0E5 ${(vol / max) * 100}%, #E0E0E5 100%)` }}
          />

          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-[36px] font-bold text-cta leading-none">{vol.toLocaleString()}</span>
            <span className="text-[14px] text-text-secondary">/month</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[1000, 10000, 50000, 100000, 500000].map(p => (
              <button
                key={p} onClick={() => setVol(p)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] transition-colors border ${
                  vol === p ? 'bg-cta/10 border-cta/30 text-cta font-semibold' : 'bg-elevated border-border text-text-secondary font-medium hover:border-cta/50'
                }`}
              >
                {p >= 1000 ? `${p / 1000}K` : p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-elevated rounded-lg p-5 px-6 flex flex-col">

          <div className="flex justify-between items-center py-3 border-b border-border">
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-text-secondary">Pay-as-you-go</span>
              <span className="text-[12px] text-text-disabled">No commitment</span>
            </div>
            <span className="text-[20px] font-semibold text-text-primary">${paygoCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border">
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-text-secondary">Startup</span>
              <span className="text-[12px] text-text-disabled">10,000 queries/mo included</span>
            </div>
            <div className="flex items-center gap-2">
              {startupCost < paygoCost && (
                <div className="h-[22px] px-2 rounded-full bg-success/10 border border-success/25 flex items-center">
                  <span className="text-[11px] font-semibold text-success">Save ${(paygoCost - startupCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                </div>
              )}
              <span className="text-[20px] font-semibold text-text-primary">${startupCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3">
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-text-secondary">Growth</span>
              <span className="text-[12px] text-text-disabled">100,000 queries/mo included</span>
            </div>
            <div className="flex items-center gap-2">
              {growthCost < startupCost && growthCost < paygoCost && (
                <div className="h-[22px] px-2 rounded-full bg-success/10 border border-success/25 flex items-center">
                  <span className="text-[11px] font-semibold text-success">Save ${(Math.min(paygoCost, startupCost) - growthCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                </div>
              )}
              <span className="text-[20px] font-semibold text-text-primary">${growthCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
            </div>
          </div>

        </div>

        <div className="mt-2">
          {vol <= 10000 && (
            <div className="bg-cta/5 border border-cta/20 rounded-md py-3 px-4 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-cta" />
              <span className="text-[13px] text-cta">Pay-as-you-go is the most economical at this volume.</span>
            </div>
          )}
          {vol > 10000 && vol <= 100000 && (
            <div className="bg-cta/5 border border-cta/20 rounded-md py-3 px-4 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-cta" />
              <span className="text-[13px] text-cta">Startup plan ($99/mo) saves you ${(paygoCost - startupCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo vs pay-as-you-go.</span>
            </div>
          )}
          {vol > 100000 && vol <= 500000 && (
            <div className="bg-cta/5 border border-cta/20 rounded-md py-3 px-4 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-cta" />
              <span className="text-[13px] text-cta">Growth plan ($499/mo) saves you ${(paygoCost - growthCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo vs pay-as-you-go.</span>
            </div>
          )}
          {vol > 500000 && (
            <div className="bg-warning/10 border border-warning/25 rounded-md py-3 px-4 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
              <span className="text-[13px] text-warning">
                Your volume exceeds the Growth plan quota. <a href="#" className="underline hover:text-warning/80">Contact Enterprise Sales →</a>
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

const FeatureComparisonTable = () => {
  const groups = [
    {
      title: 'Verification Types',
      rows: [
        { name: 'Email', s: true, g: true, e: true },
        { name: 'Phone', s: true, g: true, e: true },
        { name: 'KYC Level 1', s: true, g: true, e: true },
        { name: 'KYC Level 2', s: true, g: true, e: true },
        { name: 'KYC Level 3', s: false, g: true, e: true },
        { name: 'Sanctions + PEP', s: false, g: true, e: true },
      ],
    },
    {
      title: 'Limits & Configuration',
      rows: [
        { name: 'Monthly Quota', s: '10K', g: '100K', e: 'Unlimited' },
        { name: 'Team Members', s: '1', g: '10', e: 'Unlimited' },
        { name: 'SDKs', s: 'JS only', g: 'JS, Python, Go', e: 'All + Rust' },
      ],
    },
    {
      title: 'Support & Compliance',
      rows: [
        { name: 'SLA', s: '99.5%', g: '99.9%', e: 'Custom' },
        { name: 'Compliance', s: 'Basic', g: 'Full dashboard + CSV', e: 'Custom reports + advisor' },
        { name: 'Support', s: 'Community', g: 'Priority email', e: 'Dedicated Slack + phone' },
      ],
    },
  ]

  const renderCell = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val
        ? <Check className="w-5 h-5 text-success mx-auto" />
        : <Minus className="w-5 h-5 text-text-secondary mx-auto" />
    }
    return <span className="text-[14px] text-text-secondary">{val}</span>
  }

  return (
    <div className="w-full bg-surface py-16 px-8 flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-12">Compare plans</h2>

      <div className="w-full max-w-[1040px] border border-border rounded-xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="flex bg-bg px-6 py-5 text-white">
          <div className="w-[40%] text-[14px] font-semibold">Feature</div>
          <div className="w-[20%] text-center flex flex-col">
            <span className="text-[14px] font-semibold">Startup</span>
            <span className="text-[12px] text-white/60">$99/mo</span>
          </div>
          <div className="w-[20%] text-center flex flex-col">
            <span className="text-[14px] font-semibold text-cyan">Growth</span>
            <span className="text-[12px] text-cyan/60">$499/mo</span>
          </div>
          <div className="w-[20%] text-center flex flex-col">
            <span className="text-[14px] font-semibold">Enterprise</span>
            <span className="text-[12px] text-white/60">Custom</span>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col bg-surface">
          {groups.map((g, gi) => (
            <React.Fragment key={gi}>
              <div className="bg-elevated px-6 py-3 border-b border-border">
                <span className="text-[12px] font-bold text-text-primary uppercase tracking-wider">{g.title}</span>
              </div>
              {g.rows.map((row, ri) => (
                <div key={ri} className="flex px-6 py-4 border-b border-border last:border-0 hover:bg-elevated transition-colors items-center">
                  <div className="w-[40%] text-[14px] font-medium text-text-primary">{row.name}</div>
                  <div className="w-[20%] text-center">{renderCell(row.s)}</div>
                  <div className="w-[20%] text-center">{renderCell(row.g)}</div>
                  <div className="w-[20%] text-center">{renderCell(row.e)}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

const CompetitorPricingSection = () => {
  const rows: Array<{
    t: string
    s: React.ReactNode
    st: React.ReactNode
    su: React.ReactNode
    p: React.ReactNode
    v: React.ReactNode
    bg?: string
    h?: string
  }> = [
    {
      t: 'Email verification',
      s: <span className="font-semibold text-success">$0.10</span>,
      st: '$0.30', su: 'N/A', p: '$0.30', v: 'N/A',
    },
    {
      t: 'Phone verification', bg: 'bg-elevated',
      s: '$0.20',
      st: '$0.50', su: 'N/A', p: '$0.40', v: 'N/A',
    },
    {
      t: 'KYC L2 (doc + liveness)', h: 'h-[64px]',
      s: <span className="font-semibold text-success">$5.00</span>,
      st: <div className="flex flex-col leading-tight"><span>$1.50</span><span className="text-[11px] text-text-disabled">doc only, no credential</span></div>,
      su: <div className="flex flex-col leading-tight"><span>~$15–20</span><span className="text-[11px] text-text-disabled">estimate</span></div>,
      p: '$3–8',
      v: <span className="italic text-text-secondary">Contact sales</span>,
    },
    {
      t: 'Re-verification (credential reuse)', bg: 'bg-lime/5',
      s: <span className="text-[14px] font-bold text-success">$0.05</span>,
      st: 'Same as initial', su: 'Same', p: 'Same', v: 'Same',
    },
    {
      t: 'Credential issuance',
      s: '$0.01 standalone',
      st: <span className="italic text-text-disabled">Not included</span>,
      su: <span className="italic text-text-disabled">Not included</span>,
      p: <span className="italic text-text-disabled">Not included</span>,
      v: <span className="italic text-text-disabled">Not included</span>,
    },
  ]

  return (
    <div className="w-full bg-surface py-20 px-8 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-[36px] font-bold text-text-primary mb-3">How we compare</h2>
        <p className="text-[16px] text-text-secondary max-w-[600px] mx-auto">
          KYC providers rarely publish pricing. Here&apos;s an honest market comparison based on public information and analyst estimates.
        </p>
      </div>

      <div className="w-full max-w-[1040px] border border-border rounded-xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="flex bg-bg px-6 py-4">
          <div className="w-[220px] text-[12px] font-medium text-white/60">Verification Type</div>
          <div className="flex-1 text-center text-[12px] font-bold text-white bg-lime/10 -my-4 py-4 px-2">Solidus Verify</div>
          <div className="flex-1 text-center text-[12px] font-medium text-white/60">Stripe Identity</div>
          <div className="flex-1 text-center text-[12px] font-medium text-white/60">Sumsub (est.)</div>
          <div className="flex-1 text-center text-[12px] font-medium text-white/60">Persona</div>
          <div className="flex-1 text-center text-[12px] font-medium text-white/60">Veriff</div>
        </div>

        <div className="flex flex-col bg-surface">
          {rows.map((row, i) => (
            <div key={i} className={`flex px-6 items-center border-b border-border hover:bg-cta/5 transition-colors ${row.bg ?? 'bg-surface'} ${row.h ?? 'h-[56px]'}`}>
              <div className="w-[220px] text-[14px] font-medium text-text-primary shrink-0">{row.t}</div>
              <div className="flex-1 h-full flex items-center justify-center text-[14px] font-medium text-text-primary bg-lime/10">{row.s}</div>
              <div className="flex-1 text-center text-[14px] text-text-secondary">{row.st}</div>
              <div className="flex-1 text-center text-[14px] text-text-secondary">{row.su}</div>
              <div className="flex-1 text-center text-[14px] text-text-secondary">{row.p}</div>
              <div className="flex-1 text-center text-[14px] text-text-secondary">{row.v}</div>
            </div>
          ))}

          <div className="bg-elevated px-6 py-4 border-t border-border">
            <p className="text-[11px] text-text-disabled leading-relaxed">
              Market estimates based on public pricing pages and third-party analyst reports as of Q1 2026. Sumsub and Veriff pricing requires direct sales contact. Actual pricing varies by contract volume and region. Solidus pricing as per verify.solidus.network/pricing.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

const FAQSection = () => {
  const faqs = [
    { q: "What counts as a 'verification query'?", a: 'Each API call to the /sessions or /credentials endpoints counts as one query. A full KYC session spanning multiple documents and liveness checks is billed as a single query.' },
    { q: 'Can I switch plans mid-month?', a: 'Yes. Upgrades take effect immediately and are pro-rated. Downgrades take effect at the start of your next billing cycle.' },
    { q: 'What happens if I exceed my plan quota?', a: 'You will be charged a pay-as-you-go overage fee of $0.01 per additional query on the Startup and Growth plans. Enterprise plans have no hard caps.' },
    { q: 'Is there a free trial?', a: 'Yes. All plans include a 14-day free trial and your first 1,000 verifications are completely free. No credit card is required to start testing in Sandbox mode.' },
    { q: "What's the difference between a 'query' and a 'verification session'?", a: "A verification session represents the entire KYC flow for a user (e.g., uploading a passport and doing a selfie). It consumes exactly one query, regardless of how many background checks we perform." },
  ]

  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="w-full bg-surface py-16 px-8 flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-12">Frequently asked questions</h2>

      <div className="w-full max-w-[800px] flex flex-col">
        {faqs.map((faq, i) => (
          <div key={i} className="flex flex-col border-b border-border last:border-0">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="py-6 flex items-center justify-between text-left group"
            >
              <h3 className={`text-[20px] font-semibold transition-colors ${openIdx === i ? 'text-cta' : 'text-text-primary group-hover:text-cta'}`}>{faq.q}</h3>
              <Globe className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-cta' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[200px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-[16px] text-text-secondary leading-[1.6]">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WhatIsAQuerySection = () => {
  const items = [
    {
      Icon: Mail,
      title: 'Email Verification',
      desc: 'User clicks a confirmation link. Instant. No document required.',
      val: '$0.10 · 1 query',
      bg: 'bg-cta/10',
      border: 'border-cta/15',
      color: 'text-cta',
      valColor: '',
    },
    {
      Icon: ShieldCheck,
      title: 'KYC Level 2 Session',
      desc: 'User uploads passport, completes liveness check, validators confirm on-chain. Credential issued and anchored to the Solidus blockchain. All steps within a single session = 1 query.',
      val: '$5.00 · 1 query',
      bg: 'bg-cta/10',
      border: 'border-transparent',
      color: 'text-cta',
      valColor: '',
    },
    {
      Icon: Repeat,
      title: 'Credential Re-presentation',
      desc: "User's existing KYC credential is presented to a new service. No re-upload. No new liveness check. No new validation session.",
      val: '$0.05 · NOT a query — flat fee only',
      bg: 'bg-lime/10',
      border: 'border-lime/20',
      color: 'text-lime',
      valColor: 'text-success font-bold',
    },
  ]

  return (
    <div className="w-full bg-elevated py-12 px-8 flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-8">What counts as a query?</h2>

      <div className="w-full max-w-[720px] bg-surface rounded-xl border border-border p-8 shadow-sm flex flex-col">

        {items.map((row, i) => (
          <div key={i} className={`flex items-start gap-5 py-5 border-b border-border last:border-0 ${i === 0 ? 'pt-0' : ''}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${row.bg} ${row.border}`}>
              <row.Icon className={`w-5 h-5 ${row.color}`} />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <h3 className="text-[16px] font-semibold text-text-primary">{row.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">{row.desc}</p>
              <h3 className={`text-[14px] font-semibold mt-1 ${row.valColor || 'text-text-primary'}`}>{row.val}</h3>
            </div>
          </div>
        ))}

        <div className="mt-6 bg-lime/10 border border-lime/20 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-lime shrink-0 mt-0.5" />
          <p className="text-[14px] text-text-primary">
            Re-presentations are never queries. They are charged at a flat $0.05 regardless of how many times the credential is reused across different services.
          </p>
        </div>

      </div>
    </div>
  )
}

const EnterpriseCTA = () => {
  return (
    <div className="w-full bg-bg py-16 px-8 flex flex-col items-center">
      <h2 className="text-[32px] font-bold text-white mb-3 text-center">Need custom volume, white-label, or on-premise?</h2>
      <p className="text-[16px] text-white/60 text-center max-w-[700px] mb-8">
        We work with regulated institutions who need custom MSAs, dedicated infrastructure, and a compliance advisor on speed dial.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="h-12 px-8 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[15px] font-semibold text-white flex items-center gap-2">
          Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
        </button>
        <button className="h-12 px-6 rounded-lg text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
          View enterprise features
        </button>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const [isSub, setIsSub] = useState(false)

  return (
    <>
      <PricingHeader isSub={isSub} setIsSub={setIsSub} />
      <PlanCards isSub={isSub} />
      <VolumeCalculatorSection />
      <FeatureComparisonTable />
      <CompetitorPricingSection />
      <FAQSection />
      <WhatIsAQuerySection />
      <EnterpriseCTA />
    </>
  )
}
