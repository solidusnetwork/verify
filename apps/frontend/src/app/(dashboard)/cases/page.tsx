'use client'

import React, { useState } from 'react'
import {
  Copy,
  AlertCircle,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  MessageCircle,
  AlertTriangle,
  Search,
  X,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
type CaseStatus = 'pending' | 'In Review' | 'Approved' | 'Rejected' | 'Escalated'

interface Case {
  id: string
  did: string
  type: string
  riskScore: number
  riskLevel: RiskLevel
  reason: string
  assignee: string | null
  sla: string
  age: string
  isOverdue: boolean
  status: CaseStatus
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CASES: Case[] = [
  { id: '1', did: 'did:solidus:mainnet:3xK9mP2nQ8vL7wR4jE6fB1cD5hY0tN', type: 'KYC L2', riskScore: 87, riskLevel: 'high', reason: 'Liveness Fail', assignee: 'Sarah K.', sla: '1h 22m', age: '3h 14m', isOverdue: false, status: 'pending' },
  { id: '2', did: 'did:solidus:mainnet:7hY2kL5pR9mN4vQ8wE3fB6cD1xK0tG', type: 'KYC L1', riskScore: 62, riskLevel: 'medium', reason: 'Doc Mismatch', assignee: null, sla: '0h 38m', age: '5h 01m', isOverdue: true, status: 'pending' },
  { id: '3', did: 'did:solidus:mainnet:9mR4kP7nL2vQ5wY8hE1fB3cD6xK0tJ', type: 'KYC L3', riskScore: 94, riskLevel: 'critical', reason: 'Watchlist', assignee: 'Alex C.', sla: '0h 05m', age: '7h 52m', isOverdue: true, status: 'In Review' },
  { id: '4', did: 'did:solidus:mainnet:2xK8mP5nQ3vL9wR1jE4fB7cD0hY6tM', type: 'KYC L2', riskScore: 45, riskLevel: 'medium', reason: 'IP Blacklist', assignee: 'Mike T.', sla: '3h 10m', age: '1h 30m', isOverdue: false, status: 'pending' },
  { id: '5', did: 'did:solidus:mainnet:5hY9kL2pR6mN8vQ3wE7fB1cD4xK0tF', type: 'KYC L1', riskScore: 31, riskLevel: 'low', reason: 'Multiple Fails', assignee: null, sla: '4h 45m', age: '0h 45m', isOverdue: false, status: 'pending' },
  { id: '6', did: 'did:solidus:mainnet:1mR7kP4nL8vQ2wY5hE9fB6cD3xK0tH', type: 'KYC L2', riskScore: 78, riskLevel: 'high', reason: 'Liveness Fail', assignee: 'Sarah K.', sla: '2h 00m', age: '2h 15m', isOverdue: false, status: 'Approved' },
  { id: '7', did: 'did:solidus:mainnet:4xK3mP1nQ7vL5wR9jE2fB8cD6hY0tL', type: 'KYC L3', riskScore: 91, riskLevel: 'critical', reason: 'Fraud Attempt', assignee: 'Alex C.', sla: '0h 00m', age: '4h 22m', isOverdue: true, status: 'Rejected' },
  { id: '8', did: 'did:solidus:mainnet:6hY1kL8pR3mN5vQ9wE4fB2cD7xK0tE', type: 'KYC L1', riskScore: 55, riskLevel: 'medium', reason: 'Doc Expired', assignee: null, sla: '1h 55m', age: '1h 05m', isOverdue: false, status: 'Escalated' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function RiskScoreBadge({ score, level, large }: { score: number; level: RiskLevel; large?: boolean }) {
  const colorClasses: Record<RiskLevel, string> = {
    critical: 'bg-error/10 border border-error/20 text-error',
    high: 'bg-error/10 border border-error/20 text-error',
    medium: 'bg-warning/10 border border-warning/20 text-warning',
    low: 'bg-success/10 border border-success/20 text-success',
  }

  if (large) {
    return (
      <div className={`inline-flex flex-col items-center justify-center rounded-lg px-4 py-2 ${colorClasses[level]}`}>
        <span className="text-[28px] font-bold leading-none">{score}</span>
        <span className="text-[11px] font-medium uppercase tracking-wider mt-0.5 capitalize">{level}</span>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${colorClasses[level]}`}>
      <span className="text-[13px] font-semibold leading-none">{score}</span>
      <span className="text-[11px] capitalize leading-none">{level}</span>
    </div>
  )
}

function ReasonBadge({ reason }: { reason: string }) {
  const styleMap: Record<string, string> = {
    'Liveness Fail': 'bg-error/10 text-error',
    'Watchlist': 'bg-error/10 text-error border border-error/20',
    'Doc Mismatch': 'bg-warning/10 text-warning',
    'IP Blacklist': 'bg-elevated text-text-secondary',
    'Multiple Fails': 'bg-elevated text-text-secondary',
    'Doc Expired': 'bg-warning/10 text-warning',
    'Fraud Attempt': 'bg-error/10 text-error border border-error/20',
  }

  const classes = styleMap[reason] ?? 'bg-elevated text-text-secondary'

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none ${classes}`}>
      {reason}
    </span>
  )
}

function AssigneeCell({ assignee }: { assignee: string | null }) {
  if (!assignee) {
    return <span className="text-[13px] italic text-text-disabled">Unassigned</span>
  }

  const initials = assignee
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full bg-elevated border border-border flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-medium text-text-secondary">{initials}</span>
      </div>
      <span className="text-[13px] text-text-primary">{assignee}</span>
    </div>
  )
}

// ─── Decision option config ───────────────────────────────────────────────────

const DECISION_OPTIONS = [
  {
    value: 'approve',
    label: 'Approve',
    description: 'Verification passes. Credential will be issued.',
    Icon: CheckCircle,
    selectedClasses: 'bg-success/[0.06] border-success',
    iconClass: 'text-success',
  },
  {
    value: 'reject',
    label: 'Reject',
    description: 'Verification fails. No credential.',
    Icon: XCircle,
    selectedClasses: 'bg-error/[0.06] border-error',
    iconClass: 'text-error',
  },
  {
    value: 'escalate',
    label: 'Escalate',
    description: 'Send to senior analyst.',
    Icon: ArrowUpCircle,
    selectedClasses: 'bg-warning/[0.06] border-warning',
    iconClass: 'text-warning',
  },
  {
    value: 'request_info',
    label: 'Request More Info',
    description: 'Prompt user to resubmit.',
    Icon: MessageCircle,
    selectedClasses: 'bg-cta/[0.06] border-cta',
    iconClass: 'text-cta',
  },
]

// ─── Case Detail Panel ────────────────────────────────────────────────────────

interface DetailPanelProps {
  caseItem: Case
  isPanelClosing: boolean
  decision: string
  decisionNotes: string
  onDecisionChange: (v: string) => void
  onNotesChange: (v: string) => void
  onClose: () => void
  onSubmit: () => void
}

function CaseDetailPanel({
  caseItem,
  isPanelClosing,
  decision,
  decisionNotes,
  onDecisionChange,
  onNotesChange,
  onClose,
  onSubmit,
}: DetailPanelProps) {
  const canSubmit = decision !== '' && decisionNotes.trim() !== ''
  const shortDid = caseItem.did.length > 42 ? caseItem.did.slice(0, 42) + '…' : caseItem.did

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/32 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-bg border-l border-border shadow-[-8px_0_32px_rgba(0,0,0,0.4)] z-50 flex flex-col transition-transform duration-250 ${
          isPanelClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-[18px] font-semibold text-text-primary">Case Review</h2>
              <p className="font-mono text-[11px] text-text-secondary mt-1 truncate">{caseItem.did}</p>
              {caseItem.status === 'In Review' && (
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="h-5 w-5 rounded-full bg-elevated border border-border flex items-center justify-center">
                    <span className="text-[9px] font-medium text-text-secondary">AC</span>
                  </div>
                  <span className="text-[12px] text-text-secondary">In review by Alex C.</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 h-8 w-8 rounded-md hover:bg-elevated flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Concurrent review warning for case 3 */}
          {caseItem.id === '3' && (
            <div className="mx-6 mt-4 flex items-center gap-2 bg-warning/[0.08] border border-warning/20 rounded-lg px-4 py-3">
              <AlertTriangle size={14} className="text-warning flex-shrink-0" />
              <span className="text-[13px] text-warning">Alex Chen is also reviewing this case.</span>
            </div>
          )}

          {/* Risk Summary bar */}
          <div className="mx-6 mt-4 bg-elevated rounded-lg p-3 flex items-start gap-4">
            <RiskScoreBadge score={caseItem.riskScore} level={caseItem.riskLevel} large />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-error/10 text-error">Liveness 34%</span>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-warning/10 text-warning">IP blacklist match</span>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-warning/10 text-warning">2 prior fails</span>
              </div>
              <div className="flex items-center gap-4 mt-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-text-disabled block">Age</span>
                  <span className="text-[13px] text-text-primary font-medium">{caseItem.age}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-text-disabled block">SLA</span>
                  <span className={`text-[13px] font-medium ${caseItem.isOverdue ? 'text-error' : 'text-text-primary'}`}>{caseItem.sla}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Summary */}
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-text-disabled mb-3">Verification Summary</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { label: 'Document Type', value: 'Passport (US)', valueClass: 'text-text-primary' },
                { label: 'Liveness Score', value: '34%', valueClass: 'text-error' },
                { label: 'Document Confidence', value: '92.1%', valueClass: 'text-success' },
                { label: 'Face Similarity', value: '34%', valueClass: 'text-error' },
                { label: 'Session Started', value: '2026-03-17 14:32:08 UTC', valueClass: 'text-text-primary font-mono text-[11px]' },
                { label: 'KYC Level', value: caseItem.type, valueClass: 'text-text-primary' },
              ].map(({ label, value, valueClass }) => (
                <div key={label}>
                  <span className="text-[11px] text-text-disabled block mb-0.5">{label}</span>
                  <span className={`text-[13px] ${valueClass}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Flagged callout */}
          <div className="mx-6 mt-4 bg-warning/[0.06] border border-warning/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-warning flex-shrink-0" />
              <span className="text-[13px] font-semibold text-warning">Why Flagged</span>
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              This session failed liveness detection with a score of 34%, well below the 70% threshold. An IP address match was also found against a known blacklist, and the account has 2 prior failed verification attempts.
            </p>
            <p className="text-[11px] text-text-disabled mt-2">
              All three signals must be resolved before this case can be approved.
            </p>
          </div>

          {/* Decision section */}
          <div className="px-6 py-4 mt-2">
            <h3 className="text-[15px] font-semibold text-text-primary mb-3">Decision</h3>

            <div className="flex flex-col gap-2">
              {DECISION_OPTIONS.map(({ value, label, description, Icon, selectedClasses, iconClass }) => {
                const isSelected = decision === value
                return (
                  <label
                    key={value}
                    className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                      isSelected ? selectedClasses : 'border-border hover:bg-elevated'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      value={value}
                      checked={isSelected}
                      onChange={() => onDecisionChange(value)}
                      className="sr-only"
                    />
                    <Icon size={16} className={`mt-0.5 flex-shrink-0 ${iconClass}`} />
                    <div className="min-w-0">
                      <span className="text-[13px] font-medium text-text-primary block">{label}</span>
                      <span className="text-[12px] text-text-secondary">{description}</span>
                    </div>
                  </label>
                )
              })}
            </div>

            {/* Decision Notes */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-medium text-text-secondary">
                  Decision Notes <span className="text-error">*</span>
                </label>
                <span className="text-[11px] text-text-disabled">{decisionNotes.length}/500</span>
              </div>
              <textarea
                value={decisionNotes}
                onChange={(e) => onNotesChange(e.target.value.slice(0, 500))}
                placeholder="Add notes for the audit trail..."
                rows={4}
                className="w-full bg-elevated border border-border rounded-lg px-3 py-2.5 text-[13px] text-text-primary placeholder:text-text-disabled resize-none focus:outline-none focus:border-cta/50 transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              onClick={canSubmit ? onSubmit : undefined}
              disabled={!canSubmit}
              className={`mt-3 w-full h-10 rounded-lg text-[14px] font-semibold transition-colors ${
                canSubmit
                  ? 'bg-cta text-white hover:bg-cta/90 cursor-pointer'
                  : 'bg-elevated text-text-disabled cursor-not-allowed'
              }`}
            >
              Submit Decision
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] bg-elevated border-l-4 border-success rounded-r-md shadow-lg px-4 py-3 min-w-[280px] max-w-[360px]">
      <p className="text-[14px] font-semibold text-text-primary">{title}</p>
      <p className="text-[12px] text-text-secondary mt-0.5">{desc}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>(CASES)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'in_review' | 'overdue'>('all')
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [isPanelClosing, setIsPanelClosing] = useState(false)
  const [decision, setDecision] = useState('')
  const [decisionNotes, setDecisionNotes] = useState('')
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null)
  const [animatingOutId, setAnimatingOutId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const selectedCase = cases.find((c) => c.id === selectedCaseId) ?? null

  // ── Stats ──
  const pendingCount = CASES.filter((c) => c.status === 'pending').length
  const overdueCount = CASES.filter((c) => c.isOverdue).length

  // ── Filtering ──
  const filteredCases = cases.filter((c) => {
    const matchesSearch = search === '' || c.did.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false
    if (activeFilter === 'pending') return c.status === 'pending'
    if (activeFilter === 'in_review') return c.status === 'In Review'
    if (activeFilter === 'overdue') return c.isOverdue
    return true
  })

  // ── Selection ──
  const allVisibleSelected =
    filteredCases.length > 0 && filteredCases.every((c) => selectedIds.includes(c.id))

  function toggleSelectAll() {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !filteredCases.find((c) => c.id === id)))
    } else {
      setSelectedIds((prev) => {
        const newIds = filteredCases.map((c) => c.id).filter((id) => !prev.includes(id))
        return [...prev, ...newIds]
      })
    }
  }

  function toggleSelectRow(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  // ── Panel open/close ──
  function openPanel(id: string) {
    setSelectedCaseId(id)
    setIsPanelClosing(false)
    setDecision('')
    setDecisionNotes('')
  }

  function closePanel() {
    setIsPanelClosing(true)
    setTimeout(() => {
      setSelectedCaseId(null)
      setIsPanelClosing(false)
    }, 250)
  }

  // ── Submit decision ──
  function handleSubmitDecision() {
    if (!selectedCaseId) return
    const caseId = selectedCaseId

    setAnimatingOutId(caseId)
    closePanel()

    setTimeout(() => {
      setCases((prev) => prev.filter((c) => c.id !== caseId))
      setSelectedIds((prev) => prev.filter((id) => id !== caseId))
      setAnimatingOutId(null)

      const toastData = { title: 'Case Resolved', desc: 'Decision recorded and audit trail updated.' }
      setToast(toastData)
      setTimeout(() => setToast(null), 3000)
    }, 300)
  }

  // ── Filter buttons config ──
  const FILTERS: { key: typeof activeFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'in_review', label: 'In Review' },
    { key: 'overdue', label: 'Overdue' },
  ]

  return (
    <div className="p-6 flex flex-col gap-4">

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: 'Pending Review',
            value: String(pendingCount),
            sub: 'Require manual decision',
            valueClass: 'text-text-primary',
          },
          {
            label: 'Overdue',
            value: String(overdueCount),
            sub: 'Past SLA threshold',
            valueClass: 'text-error',
          },
          {
            label: 'Avg Review Time',
            value: '1h 24m',
            sub: 'Last 7 days',
            valueClass: 'text-text-primary',
          },
        ].map(({ label, value, sub, valueClass }) => (
          <div key={label} className="bg-surface border border-border rounded-lg p-5">
            <p className="text-[12px] font-medium uppercase tracking-wider text-text-secondary mb-1">{label}</p>
            <p className={`text-[32px] font-bold leading-none ${valueClass}`}>{value}</p>
            <p className="text-[12px] text-text-disabled mt-1.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Filter bar ── */}
      <div className="bg-surface rounded-lg p-4 flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-[320px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by DID..."
            className="w-full h-9 bg-elevated border border-border rounded-md pl-8 pr-3 text-[13px] text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-cta/50 transition-colors"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`h-9 px-3 rounded-md text-[13px] font-medium transition-colors ${
                activeFilter === key
                  ? 'bg-cta text-white'
                  : 'bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Assign Selected */}
        <button
          disabled={selectedIds.length === 0}
          className="h-9 px-4 rounded-md text-[13px] font-medium bg-elevated text-text-secondary cursor-not-allowed disabled:opacity-50"
        >
          Assign Selected
        </button>
      </div>

      {/* ── Cases table ── */}
      <div className="bg-surface rounded-lg overflow-hidden border border-border">
        <table className="w-full">
          <thead>
            <tr className="h-11 bg-elevated border-b border-border">
              <th className="w-10 px-3">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleSelectAll}
                  className="h-3.5 w-3.5 rounded border-border bg-elevated accent-cta cursor-pointer"
                />
              </th>
              {['DID', 'Type', 'Risk Score', 'Reason Flagged', 'Assigned To', 'SLA', 'Age', 'Actions'].map((col) => (
                <th
                  key={col}
                  className="px-3 text-left text-[12px] font-medium uppercase tracking-wider text-text-secondary whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => {
              const isSelected = selectedIds.includes(c.id)
              const isAnimatingOut = animatingOutId === c.id
              return (
                <tr
                  key={c.id}
                  onClick={() => openPanel(c.id)}
                  className={`h-14 border-b border-border last:border-b-0 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'bg-cta/5' : 'hover:bg-elevated'
                  } ${isAnimatingOut ? 'scale-y-95 opacity-0' : ''}`}
                >
                  {/* Checkbox */}
                  <td className="w-10 px-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(c.id)}
                      className="h-3.5 w-3.5 rounded border-border bg-elevated accent-cta cursor-pointer"
                    />
                  </td>

                  {/* DID */}
                  <td className="px-3">
                    <div className="group flex items-center gap-1.5 max-w-[180px]">
                      <span className="font-mono text-[12px] text-text-primary truncate">{c.did}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(c.did) }}
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-text-disabled hover:text-text-secondary transition-opacity"
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-3">
                    <span className="text-[13px] text-text-primary whitespace-nowrap">{c.type}</span>
                  </td>

                  {/* Risk Score */}
                  <td className="px-3">
                    <RiskScoreBadge score={c.riskScore} level={c.riskLevel} />
                  </td>

                  {/* Reason Flagged */}
                  <td className="px-3">
                    <ReasonBadge reason={c.reason} />
                  </td>

                  {/* Assigned To */}
                  <td className="px-3">
                    <AssigneeCell assignee={c.assignee} />
                  </td>

                  {/* SLA */}
                  <td className="px-3">
                    {c.isOverdue ? (
                      <div className="flex items-center gap-1.5">
                        <AlertCircle size={13} className="text-error flex-shrink-0" />
                        <span className="text-[13px] font-bold text-error whitespace-nowrap">{c.sla}</span>
                      </div>
                    ) : (
                      <span className="text-[13px] text-text-secondary whitespace-nowrap">{c.sla}</span>
                    )}
                  </td>

                  {/* Age */}
                  <td className="px-3">
                    <span className="text-[13px] text-text-secondary whitespace-nowrap">{c.age}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-3" onClick={(e) => e.stopPropagation()}>
                    {c.status === 'Approved' ? (
                      <span className="text-[13px] font-medium text-success">Approved</span>
                    ) : c.status === 'Rejected' ? (
                      <span className="text-[13px] font-medium text-error">Rejected</span>
                    ) : c.status === 'Escalated' ? (
                      <span className="text-[13px] font-medium text-warning">Escalated</span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openPanel(c.id)}
                          className="h-7 px-3 rounded-md border border-border text-[12px] font-medium text-text-secondary hover:bg-elevated hover:text-text-primary transition-colors whitespace-nowrap"
                        >
                          Review
                        </button>
                        <button className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-text-disabled hover:bg-elevated hover:text-text-secondary transition-colors">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination footer */}
        <div className="h-[52px] px-5 flex items-center justify-between border-t border-border bg-elevated">
          <span className="text-[13px] text-text-secondary">Showing 1–8 of 38</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`h-7 min-w-[28px] px-2 rounded-md text-[13px] font-medium transition-colors ${
                  page === 1
                    ? 'bg-cta text-white'
                    : 'bg-transparent text-text-secondary hover:bg-elevated hover:text-text-primary'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-text-disabled text-[13px]">…</span>
            <button className="h-7 px-3 rounded-md text-[13px] font-medium text-text-secondary hover:bg-elevated hover:text-text-primary transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Detail panel ── */}
      {selectedCase && (
        <CaseDetailPanel
          caseItem={selectedCase}
          isPanelClosing={isPanelClosing}
          decision={decision}
          decisionNotes={decisionNotes}
          onDecisionChange={setDecision}
          onNotesChange={setDecisionNotes}
          onClose={closePanel}
          onSubmit={handleSubmitDecision}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast title={toast.title} desc={toast.desc} />}
    </div>
  )
}
