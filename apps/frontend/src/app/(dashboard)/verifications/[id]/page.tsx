'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  CheckCircle, ShieldOff, Flag, Inbox, Copy,
  Download, Code, ShieldCheck, AlertTriangle,
  Loader2, Lock, CircleCheck, ChevronRight,
} from 'lucide-react'
import { api, ApiError } from '../../../../lib/api'
import type { Verification } from '../../../../types/api'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Map backend status to display status */
function displayStatus(raw: string): string {
  const s = raw.toLowerCase()
  if (s === 'completed') return 'Verified'
  if (s === 'pending') return 'Pending'
  if (s === 'failed') return 'Failed'
  if (s === 'document_uploaded' || s === 'document_processing' ||
      s === 'awaiting_liveness' || s === 'liveness_uploaded' ||
      s === 'liveness_processing') return 'Processing'
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function levelLabel(level: number): string {
  return `KYC L${level}`
}

function formatTimestamp(iso: string): string {
  return iso.replace('T', ' ').replace(/\.\d+Z$/, ' UTC').replace('Z', ' UTC')
}

function formatDuration(startIso: string, endIso: string | null): string {
  if (!endIso) return '—'
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime()
  if (ms < 0) return '—'
  const totalSec = Math.round(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  if (min === 0) return `${sec}s`
  return `${min}m ${sec}s`
}

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
  const id = params.id as string

  // API state
  const [verification, setVerification] = useState<Verification | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // UI state
  const [isFlagged, setIsFlagged] = useState(false)
  const [showFlagPopover, setShowFlagPopover] = useState(false)
  const [isFlagging, setIsFlagging] = useState(false)
  const [flagReason, setFlagReason] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [showRawJson, setShowRawJson] = useState(false)

  const popoverRef = useRef<HTMLDivElement>(null)

  // Fetch verification on mount
  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError('')
    api.get<Verification>(`/v1/dashboard/verifications/${id}`)
      .then((data) => {
        setVerification(data)
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          setError(err.detail ?? err.message)
        } else {
          setError('Failed to load verification details')
        }
      })
      .finally(() => setLoading(false))
  }, [id])

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

  // ─── Loading State ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cta border-t-transparent" />
          <span className="text-[14px] text-text-secondary">Loading verification...</span>
        </div>
      </div>
    )
  }

  // ─── Error State ──────────────────────────────────────────────────────────

  if (error || !verification) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <AlertTriangle className="w-10 h-10 text-error" />
          <h3 className="text-[18px] font-semibold text-white">Failed to load verification</h3>
          <p className="text-[14px] text-text-secondary">{error || 'Verification not found'}</p>
          <Link
            href="/verifications"
            className="text-[14px] font-medium text-cta hover:underline mt-2"
          >
            Back to Verifications
          </Link>
        </div>
      </div>
    )
  }

  // ─── Derived values ───────────────────────────────────────────────────────

  const v = verification
  const shortId = v.id.length > 16 ? v.id.slice(0, 8) : v.id
  const verificationStatus = displayStatus(v.status)
  const did = v.subjectDid ?? '—'
  const hasDid = !!v.subjectDid
  const isCompleted = v.status === 'completed'
  const duration = formatDuration(v.createdAt, v.completedAt)

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6 pb-24 relative animate-in fade-in duration-500">

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
          <h2 className={`text-[28px] font-semibold leading-none ${verificationStatus.toLowerCase() === 'failed' ? 'text-error' : 'text-white'}`}>
            Verification #{shortId}
          </h2>
          <span className="text-[14px] font-normal text-text-secondary">
            Started: {formatTimestamp(v.createdAt)}
            {v.completedAt ? ` · Completed: ${formatTimestamp(v.completedAt)}` : ''}
            {v.completedAt ? ` · Duration: ${duration}` : ''}
          </span>
        </div>

        <div className="flex items-center gap-3 relative">
          <StatusBadge status={verificationStatus} isFlagged={isFlagged} />

          {v.sandbox && (
            <div className="h-8 px-3 rounded-full bg-warning/10 border border-warning/25 flex items-center justify-center">
              <span className="text-[12px] font-semibold text-warning">Sandbox</span>
            </div>
          )}

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

        {/* -- LEFT COLUMN (60%) -- */}
        <div className="flex-[6] w-full flex flex-col gap-4">

          {/* Subject */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Subject</h3>
            {hasDid ? (
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-medium text-text-secondary">DID</span>
                <div className="flex items-center justify-between max-w-[400px]">
                  <span className="font-mono text-[16px] font-normal text-white truncate pr-2">{did}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(did)}
                    className="text-text-secondary hover:text-white transition-colors shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-medium text-text-secondary">DID</span>
                <span className="text-[14px] font-normal text-text-secondary">No DID assigned</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <DetailRow label="Verification Type" value={levelLabel(v.level)} />
              <DetailRow label="Session ID" value={
                <span className="font-mono text-[13px]">{v.id}</span>
              } />
            </div>
          </div>

          {/* Document Details */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Document Details</h3>

            {isCompleted ? (
              <>
                <p className="text-[13px] text-text-secondary">
                  Document details are not available in the dashboard response. Use the API to retrieve full verification data.
                </p>

                {/* Document images placeholder */}
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
              </>
            ) : (
              <p className="text-[13px] text-text-secondary">
                Document details will be available once the verification is completed.
              </p>
            )}
          </div>

          {/* Verification Steps */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Verification Steps</h3>
            <div className="flex flex-col relative pl-2">
              {/* Connecting line */}
              <div className="absolute top-4 bottom-6 left-[17px] w-[2px] bg-elevated z-0" />
              <div className="flex flex-col z-10">
                {buildSteps(v).map((step, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-3 bg-surface ${i !== arr.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="shrink-0 bg-surface py-0.5">
                      {step.done ? (
                        <CircleCheck className="w-5 h-5 text-success fill-success/10" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-text-disabled" />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[14px] font-medium ${step.done ? 'text-white' : 'text-text-secondary'}`}>{step.title}</span>
                        <span className="text-[12px] font-normal text-text-secondary shrink-0 pl-4">
                          {step.time ?? '—'}
                        </span>
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

        {/* -- RIGHT COLUMN (40%) -- */}
        <div className="flex-[4] w-full flex flex-col gap-4">

          {/* Issued Credential */}
          {isCompleted && v.credentialId ? (
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
                  <h3 className="text-[22px] font-semibold text-white mb-1">{levelLabel(v.level)}</h3>
                  <span className="text-[14px] font-normal text-cta">verify.solidus.network</span>
                  <div className="mt-auto flex flex-col gap-0.5">
                    <span className="text-[12px] font-normal text-text-secondary">
                      Issued {v.completedAt ? new Date(v.completedAt).toISOString().slice(0, 10) : '—'}
                    </span>
                    <span className="text-[12px] font-normal text-text-secondary">
                      Expires {v.expiresAt ? new Date(v.expiresAt).toISOString().slice(0, 10) : '—'}
                    </span>
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
  "id": "${v.credentialId}",
  "type": ["VerifiableCredential", "KYCCredential"],
  "issuer": "did:solidus:issuer:verify",
  "issuanceDate": "${v.completedAt ?? '—'}",
  "credentialSubject": {
    "id": "${v.subjectDid ?? '—'}",
    "kycLevel": ${v.level},
    "verificationId": "${v.id}",
    "verifiedAt": "${v.completedAt ?? '—'}"
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
          ) : (
            <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-3">
              <h3 className="text-[16px] font-semibold text-white">Credential</h3>
              <p className="text-[13px] text-text-secondary">
                {v.status === 'failed'
                  ? 'No credential was issued — verification failed.'
                  : 'Credential will be issued once verification is complete.'}
              </p>
            </div>
          )}

          {/* Session Details */}
          <div className="bg-surface rounded-lg p-4 px-5 flex flex-col gap-3">
            <h3 className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.08em]">Session Details</h3>
            <div className="flex flex-col gap-0">
              {[
                { label: 'Status', value: <span className="text-[13px] text-white capitalize">{v.status.replace(/_/g, ' ')}</span> },
                { label: 'Level', value: <span className="text-[13px] text-white">{levelLabel(v.level)}</span> },
                { label: 'Environment', value: <span className="text-[13px] text-white">{v.sandbox ? 'Sandbox' : 'Production'}</span> },
                { label: 'Created', value: <span className="font-mono text-[12px] text-white">{formatTimestamp(v.createdAt)}</span> },
                { label: 'Updated', value: <span className="font-mono text-[12px] text-white">{formatTimestamp(v.updatedAt)}</span> },
                ...(v.completedAt ? [{ label: 'Completed', value: <span className="font-mono text-[12px] text-white">{formatTimestamp(v.completedAt)}</span> }] : []),
                { label: 'Expires', value: <span className="font-mono text-[12px] text-white">{formatTimestamp(v.expiresAt)}</span> },
                ...(v.credentialId ? [{ label: 'Credential ID', value: (
                  <button className="flex items-center gap-1.5 group" onClick={() => navigator.clipboard.writeText(v.credentialId!)}>
                    <span className="font-mono text-[12px] text-cta group-hover:underline truncate max-w-[200px]">{v.credentialId}</span>
                    <Copy className="w-3 h-3 text-cta" />
                  </button>
                ) }] : []),
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between h-9 border-b border-border last:border-0">
                  <span className="text-[12px] font-medium text-text-secondary">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
          </div>

          {/* Risk Signals — placeholder since backend doesn't return metadata */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col">
            <h3 className="text-[16px] font-semibold text-white mb-4">Risk Signals</h3>
            <p className="text-[13px] text-text-secondary">
              Risk signal data is not yet available in the dashboard API.
            </p>
            <div className="mt-3 flex items-center gap-2 p-2 px-3 rounded-md bg-elevated">
              <ShieldCheck className="w-4 h-4 text-text-secondary shrink-0" />
              <span className="text-[12px] font-normal text-text-secondary">Risk analysis pending</span>
            </div>
          </div>

          {/* Event Log — minimal based on available timestamps */}
          <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-white">Event Log</h3>
            <div className="flex flex-col">
              {buildEventLog(v).map((log, i, arr) => (
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

// ─── Step builder ───────────────────────────────────────────────────────────

interface StepInfo {
  title: string
  time: string | null
  desc: string | null
  done: boolean
}

/** Build verification steps from status and timestamps */
function buildSteps(v: Verification): StepInfo[] {
  const statusOrder = [
    'pending',
    'document_uploaded',
    'document_processing',
    'awaiting_liveness',
    'liveness_uploaded',
    'liveness_processing',
    'completed',
  ]

  const currentIndex = statusOrder.indexOf(v.status)
  const isAtOrPast = (target: string) => {
    const targetIndex = statusOrder.indexOf(target)
    // failed can happen at any stage
    if (v.status === 'failed') return false
    return currentIndex >= targetIndex
  }

  const created = formatTimestamp(v.createdAt).slice(0, -4).trim() // remove " UTC"
  const completed = v.completedAt ? formatTimestamp(v.completedAt).slice(0, -4).trim() : null

  const steps: StepInfo[] = [
    {
      title: 'Session Created',
      time: created,
      desc: null,
      done: true, // always done if we have the record
    },
    {
      title: 'Document Uploaded',
      time: isAtOrPast('document_uploaded') ? '—' : null,
      desc: null,
      done: isAtOrPast('document_uploaded'),
    },
    {
      title: 'Document Processed',
      time: isAtOrPast('document_processing') ? '—' : null,
      desc: null,
      done: isAtOrPast('awaiting_liveness'),
    },
  ]

  // Only show liveness steps for L2+
  if (v.level >= 2) {
    steps.push(
      {
        title: 'Liveness Check',
        time: isAtOrPast('liveness_uploaded') ? '—' : null,
        desc: null,
        done: isAtOrPast('liveness_uploaded'),
      },
      {
        title: 'Liveness Processed',
        time: isAtOrPast('liveness_processing') ? '—' : null,
        desc: null,
        done: isAtOrPast('completed'),
      },
    )
  }

  if (v.status === 'completed') {
    steps.push({
      title: 'Credential Issued',
      time: completed,
      desc: v.credentialId ? `Credential: ${v.credentialId.slice(0, 24)}...` : null,
      done: true,
    })
  } else if (v.status === 'failed') {
    steps.push({
      title: 'Verification Failed',
      time: formatTimestamp(v.updatedAt).slice(0, -4).trim(),
      desc: null,
      done: true,
    })
  }

  return steps
}

// ─── Event log builder ──────────────────────────────────────────────────────

function buildEventLog(v: Verification): { time: string; desc: string }[] {
  const timeOf = (iso: string) => {
    const d = new Date(iso)
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}`
  }

  const events: { time: string; desc: string }[] = [
    { time: timeOf(v.createdAt), desc: 'Verification session created' },
  ]

  if (v.subjectDid) {
    events.push({ time: timeOf(v.createdAt), desc: `Subject DID: ${v.subjectDid}` })
  }

  if (v.status !== 'pending') {
    events.push({ time: timeOf(v.updatedAt), desc: `Status changed to: ${v.status.replace(/_/g, ' ')}` })
  }

  if (v.completedAt) {
    events.push({ time: timeOf(v.completedAt), desc: 'Verification completed' })
  }

  if (v.credentialId) {
    events.push({ time: timeOf(v.completedAt ?? v.updatedAt), desc: `Credential issued: ${v.credentialId}` })
  }

  return events
}
