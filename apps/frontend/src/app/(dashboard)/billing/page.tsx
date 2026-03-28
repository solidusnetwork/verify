'use client'

import React, { useState } from 'react'
import {
  CheckCircle, CreditCard, Download, X,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES_GROWTH = [
  'Up to 50,000 verifications/mo',
  'KYC L1, L2, L3',
  'Credential issuance',
  'Webhook support',
  'Team management',
  'Priority support',
]

const INVOICES = [
  { date: 'Feb 2026', description: 'Growth Plan - Feb 2026', amount: '$48.30', status: 'Paid' },
  { date: 'Jan 2026', description: 'Growth Plan - Jan 2026', amount: '$52.15', status: 'Paid' },
  { date: 'Dec 2025', description: 'Growth Plan - Dec 2025', amount: '$41.90', status: 'Paid' },
]

const USAGE_CURRENT  = 1248
const USAGE_LIMIT    = 10000
const USAGE_PERCENT  = (USAGE_CURRENT / USAGE_LIMIT) * 100

// ─── Upgrade Plan Modal ───────────────────────────────────────────────────────

const PLAN_STARTER_FEATURES  = ['Up to 1,000 verifications/mo', 'Basic KYC L1 & L2', 'API Access']
const PLAN_GROWTH_FEATURES   = ['Up to 50,000 verifications/mo', 'KYC L1, L2, L3', 'Webhook support', 'Team management', 'Priority support']
const PLAN_ENTERPRISE_FEATURES = ['Unlimited verifications', 'All features', 'Dedicated SLA', 'Dedicated support', 'Custom contracts']

function UpgradePlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-xl border border-border w-full max-w-[820px] p-6 flex flex-col gap-6 shadow-elevated">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-semibold text-white">Choose a Plan</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Starter */}
          <div className="bg-elevated rounded-lg border border-border p-5 flex flex-col gap-4">
            <div>
              <div className="text-[16px] font-semibold text-white mb-0.5">Starter</div>
              <div className="text-[13px] text-text-secondary">Perfect for early-stage projects</div>
            </div>
            <div>
              <span className="text-[26px] font-bold text-white">$0</span>
              <span className="text-[13px] text-text-secondary">/mo</span>
              <div className="text-[12px] text-text-secondary mt-0.5">+ $0.025 / verification</div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {PLAN_STARTER_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-[13px] text-text-secondary">
                  <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button className="h-9 w-full rounded-md border border-border text-[13px] font-medium text-text-secondary hover:text-white hover:bg-border/30 transition-colors">
              Downgrade
            </button>
          </div>

          {/* Growth — current */}
          <div className="bg-elevated rounded-lg border-2 border-cta p-5 flex flex-col gap-4 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="h-6 px-3 rounded-full bg-cta text-white text-[11px] font-semibold flex items-center">Current Plan</span>
            </div>
            <div>
              <div className="text-[16px] font-semibold text-white mb-0.5">Growth</div>
              <div className="text-[13px] text-text-secondary">For growing teams</div>
            </div>
            <div>
              <span className="text-[26px] font-bold text-white">$50</span>
              <span className="text-[13px] text-text-secondary">/mo</span>
              <div className="text-[12px] text-text-secondary mt-0.5">+ $0.015 / verification</div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {PLAN_GROWTH_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-[13px] text-white">
                  <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button disabled className="h-9 w-full rounded-md bg-cta/20 border border-cta/30 text-[13px] font-medium text-cta cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-elevated rounded-lg border border-border p-5 flex flex-col gap-4">
            <div>
              <div className="text-[16px] font-semibold text-white mb-0.5">Enterprise</div>
              <div className="text-[13px] text-text-secondary">For large-scale operations</div>
            </div>
            <div>
              <span className="text-[26px] font-bold text-white">Custom</span>
              <div className="text-[12px] text-text-secondary mt-0.5">Volume-based pricing</div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {PLAN_ENTERPRISE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-[13px] text-white">
                  <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button className="h-9 w-full rounded-md bg-cta hover:bg-cta/90 text-white text-[13px] font-medium transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BillingPage() {
  const [showUpgrade, setShowUpgrade] = useState(false)

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white leading-none">Billing</h2>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Current Plan Card */}
          <div className="bg-surface rounded-lg border-t-2 border-t-cta p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[28px] font-bold text-white leading-none">Growth</span>
                  <span className="h-6 px-3 rounded-full bg-cta/10 border border-cta/20 text-cta text-[11px] font-semibold flex items-center">
                    Current Plan
                  </span>
                </div>
                <div className="text-[14px] text-text-secondary">
                  $0.015 / verification &nbsp;·&nbsp; $50/mo base
                </div>
              </div>
              <button
                onClick={() => setShowUpgrade(true)}
                className="shrink-0 h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[13px] font-medium rounded-md transition-colors"
              >
                Upgrade Plan
              </button>
            </div>

            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {FEATURES_GROWTH.map(f => (
                <li key={f} className="flex items-center gap-2 text-[13px] text-white">
                  <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Method Card */}
          <div className="bg-surface rounded-lg p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-white">Payment Method</h3>
              <button className="h-8 px-3 rounded-md border border-border text-[13px] font-medium text-white hover:bg-elevated transition-colors">
                Update
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-elevated rounded-lg border border-border">
              <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-cta" />
              </div>
              <div>
                <div className="text-[14px] font-medium text-white">Visa ending in 4242</div>
                <div className="text-[12px] text-text-secondary mt-0.5">Exp 09/28</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Usage Card */}
          <div className="bg-surface rounded-lg p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[16px] font-semibold text-white">Current Period Usage</h3>
                <div className="text-[12px] text-text-secondary mt-0.5">Mar 1 – Mar 23, 2026</div>
              </div>
            </div>

            {/* Big stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-elevated rounded-lg p-4">
                <div className="text-[22px] font-bold text-white leading-none">1,248</div>
                <div className="text-[11px] text-text-secondary mt-1">Verifications Used</div>
              </div>
              <div className="bg-elevated rounded-lg p-4">
                <div className="text-[22px] font-bold text-white leading-none">$50.72</div>
                <div className="text-[11px] text-text-secondary mt-1">This Period</div>
              </div>
              <div className="bg-elevated rounded-lg p-4">
                <div className="text-[22px] font-bold text-white leading-none">8</div>
                <div className="text-[11px] text-text-secondary mt-1">Days Until Billing</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-white font-medium">
                  {USAGE_CURRENT.toLocaleString()} / {USAGE_LIMIT.toLocaleString()} verifications
                </span>
                <span className="text-[12px] text-text-secondary">
                  {(USAGE_LIMIT - USAGE_CURRENT).toLocaleString()} remaining
                </span>
              </div>
              <div className="h-2 w-full bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-cta rounded-full transition-all"
                  style={{ width: `${USAGE_PERCENT}%` }}
                />
              </div>
              <div className="text-[11px] text-text-secondary">
                {USAGE_PERCENT.toFixed(2)}% of monthly limit used
              </div>
            </div>

            {/* Projection */}
            <div className="flex items-center gap-2 p-3 bg-elevated rounded-lg border border-border">
              <span className="text-[12px] text-text-secondary">
                Projected this month: <span className="text-white font-medium">~1,634 verifications</span>
                <span className="text-text-secondary ml-1">($74.51)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-[16px] font-semibold text-white">Invoice History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-elevated border-b border-border h-11">
                <th className="py-0 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Date</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Description</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Amount</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Status</th>
                <th className="py-0 px-6 w-20 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase text-right">Download</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv, i) => (
                <tr key={i} className="h-14 border-b border-border hover:bg-elevated transition-colors">
                  <td className="py-0 px-6 font-mono text-[13px] text-text-secondary">{inv.date}</td>
                  <td className="py-0 px-4 text-[14px] text-white">{inv.description}</td>
                  <td className="py-0 px-4 font-mono text-[14px] text-white">{inv.amount}</td>
                  <td className="py-0 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-medium text-success">
                      <CheckCircle className="w-3 h-3" /> {inv.status}
                    </span>
                  </td>
                  <td className="py-0 px-6 text-right">
                    <button className="p-1.5 text-cta hover:bg-cta/10 rounded-md transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpgrade && <UpgradePlanModal onClose={() => setShowUpgrade(false)} />}
    </div>
  )
}
