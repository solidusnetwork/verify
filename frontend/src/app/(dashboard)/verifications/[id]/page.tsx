'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  CheckCircle, ShieldOff, Flag, Inbox, Copy, Eye, EyeOff,
  Download, Code, ExternalLink, ShieldCheck, AlertTriangle,
  Loader2, Lock, CircleCheck, ChevronRight,
} from 'lucide-react'

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status, isFlagged }: { status: string; isFlagged?: boolean }) {
  const s = status.toLowerCase()
  let bg = 'bg-text-disabled/15'
  let border = 'border-text-disabled/30'
  let text = 'text-text-secondary'
  if (s === 'verified') { bg = 'bg-success/15'; border = 'border-success/30'; text = 'text-success' }
  else if (s === 'pending' || s === 'processing') { bg = 'bg-warning/15'; border = 'border-warning/30'; text = 'text-warning' }
  else if (s === 'failed') { bg = 'bg-error/15'; border = 'border-error/30'; text = 'text-error' }
  return (
    <div className={`relative h-8 px-4 rounded-full ${bg} border ${border} flex items-center justify-center`}>
      <span className={`text-[14px] font-semibold ${text} capitalize`}>{status}</span>
      {isFlagged && (
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-warning border-2 border-surface" />
      )}
    </div>
  )
}

// ─── Detail Row ────────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] font-medium text-text-secondary">{label}</span>
      <div className="text-[14px] font-normal text-white">{value}</div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function VerificationDetailPage() {
  const params = useParams()
  const id = (params.id as string) ?? 'vsn_9f8e7d6c5b4a3291'
  const shortId = id.includes('_') ? id.split('_')[1] : id

  const [isFlagged, setIsFlagged] = useState(false)
  const [showFlagPopover, setShowFlagPopover] = useState(false)
  const [isFlagging, setIsFlagging] = useState(false)
  const [flagReason, setFlagReason] = useState('')
  const [showToast, setShowToast] = useState(false)

  const [showMaskedDoc, setShowMaskedDoc] = useState(true)
  const [showMaskedDob, setShowMaskedDob] = useState(true)
  const [showRawJson, setShowRawJson] = useState(false)

  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showFlagPopover) return
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowFlagPopover(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showFlagPopover])

  const handleFlagConfirm = () => {
    setIsFlagging(true)
    setTimeout(() => {
      setIsFlagging(false)
      setShowFlagPopover(false)
      setIsFlagged(true)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }, 800)
  }

  const did = 'did:solidus:mainnet:7a3b8c9d2e1f4a6b'

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6 pb-24 relative">

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-surface rounded-md p-3 px-4 shadow-elevated z-50 flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-normal text-white leading-tight">Flagged for review</span>
            <span className="text-[12px] font-normal text-text-secondary leading-tight">Session added to review queue.</span>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[14px] font-normal">
        <Link href="/" className="text-cta hover:underline">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5 text-text-disabled" />
        <Link href="/verifications" className="text-cta hover:underline">Verifications</Link>
        <ChevronRight className="w-3.5 h-3.5 text-text-disabled" />
        <span className="font-mono text-text-secondary">{shortId}</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-semibold text-white leading-none">
            Verification #{shortId}
          </h2>
          <span className="text-[14px] font-normal text-text-secondary">
            Started: 2026-03-17 14:32:08 UTC · Completed: 2026-03-17 14:33:51 UTC · Duration: 1m 43s
          </span>
        </div>

        <div className="flex items-center gap-3 relative">
          <StatusBadge status="Verified" isFlagged={isFlagged} />

          {!isFlagged ? (
            <div className="relative" ref={popoverRef}>
              <button
                onClick={() => setShowFlagPopover(!showFlagPopover)}
                className="h-9 px-4 rounded-md border border-warning/30 flex items-center gap-1.5 hover:bg-warning/10 hover:border-warning/50 transition-all duration-150"
              >
                <Flag className="w-4 h-4 text-warning" />
                <span className="text-[14px] font-medium text-warning">Flag for Review</span>
              </button>

              {showFlagPopover && (
                <div className="absolute top-full right-0 mt-2 w-[280px] bg-elevated border border-border rounded-lg p-4 shadow-elevated z-20 animate-in fade-in slide-in-from-top-1 duration-200">
                  <h3 className="text-[14px] font-semibold text-white mb-2">Flag for Review</h3>
                  <p className="text-[13px] font-normal text-text-secondary mb-3 leading-snug">
                    Add this verification to the manual review queue.
                  </p>
                  <input
                    type="text"
                    placeholder="Reason (optional)"
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    className="w-full h-8 bg-surface border border-border rounded px-3 text-[13px] text-white placeholder:text-text-disabled outline-none focus:border-cta transition-colors mb-3"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setShowFlagPopover(false)}
                      disabled={isFlagging}
                      className="h-7 px-3 rounded border border-white/15 text-[12px] font-medium text-text-secondary hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFlagConfirm}
                      disabled={isFlagging}
                      className="h-7 px-4 rounded bg-warning/15 border border-warning/35 text-[12px] font-semibold text-warning hover:bg-warning/25 transition-colors flex items-center justify-center min-w-[70px]"
                    >
                      {isFlagging ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-8 px-4 rounded-md bg-warning/12 border border-warning/30 flex items-center gap-1.5">
              <Inbox className="w-3.5 h-3.5 text-warning" />
              <span className="text-[12px] font-semibold text-warning">In Review Queue</span>
            </div>
          )}

          <button className="h-9 px-4 rounded-md border border-error/30 flex items-center gap-1.5 hover:bg-error/10 hover:border-error/50 transition-all duration-150">
            <ShieldOff className="w-4 h-4 text-error" />
            <span className="text-[14px] font-medium text-error">Revoke</span>
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">

        {/* ── LEFT COLUMN (60%) ──────────────────────────────────────────────── */}
        <div className="flex-[6] w-full flex flex-col gap-4">

          {/* Subject */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Subject</h3>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-text-secondary">DID</span>
              <div className="flex items-center justify-between max-w-[400px]">
                <span className="font-mono text-[14px] font-normal text-white truncate pr-2">{did}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(did)}
                  className="text-text-secondary hover:text-white transition-colors shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-text-secondary">Reference</span>
              <span className="text-[14px] font-normal text-white">usr_7a3b8c9d · order_4a6b2e1f</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-medium text-success">Email ✓</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-medium text-success">Phone ✓</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-medium text-success">KYC L2 ✓</span>
            </div>
          </div>

          {/* Document Details */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Document Details</h3>

            <div className="grid grid-cols-2 gap-4 gap-y-5">
              <DetailRow label="Document Type" value="Passport" />
              <DetailRow label="Issuing Country" value="United States 🇺🇸" />

              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-medium text-text-secondary">Document Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[14px] font-normal text-white">
                    {showMaskedDoc ? '●●●●●●7842' : 'P892017842'}
                  </span>
                  <button
                    onClick={() => setShowMaskedDoc(!showMaskedDoc)}
                    className="text-text-secondary hover:text-white transition-colors"
                  >
                    {showMaskedDoc ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <DetailRow label="Expiry" value="2028-11-15" />

              <DetailRow label="Full Name" value="JOHN A. SMITH" />

              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-medium text-text-secondary">Date of Birth</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[14px] font-normal text-white">
                    {showMaskedDob ? '●●●●-●●-●●' : '1989-04-22'}
                  </span>
                  <button
                    onClick={() => setShowMaskedDob(!showMaskedDob)}
                    className="text-text-secondary hover:text-white transition-colors"
                  >
                    {showMaskedDob ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <DetailRow label="Nationality" value="American" />
              <DetailRow label="Gender" value="M" />
            </div>

            {/* Document images */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-4">
                <div className="w-[160px] h-[104px] bg-elevated rounded-md relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-2 left-2 bg-surface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-medium text-text-secondary z-10">FRONT</div>
                  <div className="w-full h-full bg-gradient-to-br from-border to-surface opacity-50 blur-sm absolute inset-0" />
                  <Lock className="w-6 h-6 text-text-secondary relative z-10" />
                </div>
                <div className="w-[160px] h-[104px] bg-elevated rounded-md relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-2 left-2 bg-surface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-medium text-text-secondary z-10">FACE</div>
                  <div className="w-full h-full bg-gradient-to-br from-border to-surface opacity-50 blur-sm absolute inset-0" />
                  <Lock className="w-6 h-6 text-text-secondary relative z-10" />
                </div>
              </div>
              <span className="text-[11px] font-normal text-text-secondary">Images deleted after processing (GDPR)</span>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Verification Steps</h3>
            <div className="flex flex-col relative pl-2">
              {/* Connecting line */}
              <div className="absolute top-4 bottom-6 left-[17px] w-[2px] bg-elevated z-0" />
              <div className="flex flex-col z-10">
                {[
                  { title: 'Document Uploaded', time: '2026-03-17 14:32:08', desc: null },
                  { title: 'Document Authenticity Verified', time: '2026-03-17 14:32:14', desc: 'Confidence: 98.4%' },
                  { title: 'Liveness Check Passed', time: '2026-03-17 14:32:51', desc: 'Face similarity: 96.1%' },
                  { title: 'Data Extraction Complete', time: '2026-03-17 14:32:55', desc: null },
                  { title: 'Validator Consensus Reached', time: '2026-03-17 14:33:48', desc: '3/5 validators confirmed · Block #4,817,293' },
                  { title: 'Credential Issued', time: '2026-03-17 14:33:51', desc: null, isLast: true },
                ].map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-3 bg-surface ${!step.isLast ? 'border-b border-border' : ''}`}
                  >
                    <div className="shrink-0 bg-surface py-0.5">
                      <CircleCheck className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-medium text-white">{step.title}</span>
                        <span className="text-[12px] font-normal text-text-secondary shrink-0 pl-4">{step.time}</span>
                      </div>
                      {step.desc && (
                        <span className="text-[12px] font-normal text-text-secondary">{step.desc}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (40%) ─────────────────────────────────────────────── */}
        <div className="flex-[4] w-full flex flex-col gap-4">

          {/* Issued Credential */}
          <div
            className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4 shadow-brand"
            style={{ borderTop: '2px solid', borderImage: 'linear-gradient(90deg, #A8E600, #00D4FF) 1' }}
          >
            <h3 className="text-[16px] font-semibold text-white">Issued Credential</h3>

            {!showRawJson ? (
              <div className="w-full h-[200px] bg-elevated rounded-lg p-5 flex flex-col relative overflow-hidden">
                <span className="text-[11px] font-medium text-text-secondary uppercase tracking-wider mb-2">
                  VERIFIABLE CREDENTIAL · W3C VC DATA MODEL 2.0
                </span>
                <h3 className="text-[22px] font-semibold text-white mb-1">KYC Level 2</h3>
                <span className="text-[14px] font-normal text-cta">verify.solidus.network</span>
                <div className="mt-auto flex flex-col gap-0.5">
                  <span className="text-[12px] font-normal text-text-secondary">Issued 2026-03-17</span>
                  <span className="text-[12px] font-normal text-text-secondary">Expires 2027-03-17</span>
                </div>
                {/* Mock QR */}
                <div className="absolute bottom-5 right-5 w-20 h-20 bg-surface rounded flex items-center justify-center">
                  <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-0.5 opacity-30">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`bg-text-secondary rounded-sm ${(i % 2 === 0 || i % 3 === 0) ? 'opacity-100' : 'opacity-20'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-elevated rounded-lg p-4">
                <pre className="font-mono text-[12px] text-success whitespace-pre-wrap leading-relaxed overflow-x-auto">{`{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "id": "vc:solidus:mainnet:abc123def456",
  "type": ["VerifiableCredential", "KYCCredential"],
  "issuer": "did:solidus:issuer:verify",
  "issuanceDate": "2026-03-17T14:33:51Z",
  "expirationDate": "2027-03-17T14:33:51Z",
  "credentialSubject": {
    "id": "${did}",
    "kycLevel": 2,
    "verificationId": "${id}",
    "verifiedAt": "2026-03-17T14:33:51Z"
  }
}`}</pre>
              </div>
            )}

            <div className="flex gap-2 w-full">
              <button className="flex-1 h-9 bg-cta hover:bg-cta/90 text-white rounded-md text-[14px] font-medium flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={() => setShowRawJson(!showRawJson)}
                className="flex-1 h-9 bg-transparent border border-border hover:bg-elevated text-white rounded-md text-[14px] font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Code className="w-4 h-4" /> {showRawJson ? 'View Card' : 'View JSON'}
              </button>
            </div>
          </div>

          {/* On-Chain Record */}
          <div className="bg-surface rounded-lg p-4 px-5 flex flex-col gap-3">
            <h3 className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.08em]">On-Chain Record</h3>
            <div className="flex flex-col gap-0">
              {[
                { label: 'Block', value: <span className="font-mono text-[13px] text-white">4,817,293</span> },
                {
                  label: 'Tx Hash',
                  value: (
                    <button className="flex items-center gap-1.5 group">
                      <span className="font-mono text-[12px] text-cta group-hover:underline">0x4f2e1a8b3c7d9e0f…</span>
                      <ExternalLink className="w-3 h-3 text-cta" />
                    </button>
                  ),
                },
                { label: 'Validator', value: <span className="font-mono text-[12px] text-white">val-0x7a3b8c9d2e1f4a6b</span> },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between h-9 border-b border-border last:border-0">
                  <span className="text-[12px] font-medium text-text-secondary">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
          </div>

          {/* Risk Signals */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col">
            <h3 className="text-[16px] font-semibold text-white mb-4">Risk Signals</h3>
            <div className="flex flex-col">
              <div className="flex items-center justify-between h-9 border-b border-border">
                <span className="text-[12px] font-medium text-text-secondary">IP Address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] text-white">185.220.101.47</span>
                  <div className="h-5 px-2 rounded-full bg-success/12 border border-success/25 flex items-center justify-center">
                    <span className="text-[11px] font-medium text-success">Risk: Low</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between h-9 border-b border-border">
                <span className="text-[12px] font-medium text-text-secondary">IP Location</span>
                <span className="text-[14px] text-white">🇺🇸 United States · New York, NY</span>
              </div>
              <div className="flex items-center justify-between h-9 border-b border-border">
                <span className="text-[12px] font-medium text-text-secondary">Document Country</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white">🇺🇸 United States</span>
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                  <span className="text-[12px] font-medium text-success">Match</span>
                </div>
              </div>
              <div className="flex items-center justify-between h-9 border-b border-border">
                <span className="text-[12px] font-medium text-text-secondary">Proxy Detection</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white">No proxy detected</span>
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                </div>
              </div>
              <div className="flex items-center justify-between h-9">
                <span className="text-[12px] font-medium text-text-secondary">Device</span>
                <span className="text-[13px] text-white">Desktop · Chrome 122 · macOS 14</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 p-2 px-3 rounded-md bg-elevated">
              <ShieldCheck className="w-4 h-4 text-success shrink-0" />
              <span className="text-[12px] font-normal text-success">No risk signals detected</span>
            </div>
          </div>

          {/* Event Log */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Event Log</h3>
            <div className="flex flex-col">
              {[
                { time: '14:32:08', desc: 'Verification session created' },
                { time: '14:32:09', desc: 'Subject DID resolved' },
                { time: '14:32:10', desc: 'Document upload URL generated' },
                { time: '14:32:14', desc: 'Document received (passport_front.jpg)' },
                { time: '14:32:51', desc: 'Liveness session completed' },
                { time: '14:32:55', desc: 'Data extraction completed' },
                { time: '14:33:48', desc: 'Validator consensus confirmed (21-validator committee)' },
                { time: '14:33:51', desc: `W3C VC issued to ${did}` },
              ].map((log, i, arr) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 py-2 ${i !== arr.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <span className="font-mono text-[11px] text-text-secondary w-[60px] pt-0.5 shrink-0">{log.time}</span>
                  <span className="text-[13px] font-normal text-white leading-snug">{log.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
