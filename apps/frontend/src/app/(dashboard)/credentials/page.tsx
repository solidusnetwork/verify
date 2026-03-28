'use client'

import React, { useState } from 'react'
import {
  ShieldCheck, Copy, Search, X, AlertTriangle, ExternalLink, Award, Clock,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type CredentialStatus = 'Active' | 'Revoked' | 'Expiring'

interface Credential {
  id: string
  did: string
  type: string
  subject: string
  issuedAt: string
  expiresAt: string
  status: CredentialStatus
  issuer: string
}

interface Presentation {
  id: string
  verifier: string
  credType: string
  date: string
  status: 'Accepted' | 'Rejected'
}

const INITIAL_CREDENTIALS: Credential[] = [
  { id: '1', did: 'did:solidus:mainnet:3xK9mP2nQ8vL7wR4jE6fB1', type: 'KYC L2', subject: 'Alice Johnson', issuedAt: '2026-03-17', expiresAt: '2027-03-17', status: 'Active', issuer: 'Solidus Verify' },
  { id: '2', did: 'did:solidus:mainnet:7hY2kL5pR9mN4vQ8wE3fB6', type: 'KYC L1', subject: 'Bob Williams', issuedAt: '2026-02-28', expiresAt: '2027-02-28', status: 'Active', issuer: 'Solidus Verify' },
  { id: '3', did: 'did:solidus:mainnet:9mR4kP7nL2vQ5wY8hE1fB3', type: 'KYC L3', subject: 'Carol Davis', issuedAt: '2026-01-15', expiresAt: '2027-01-15', status: 'Revoked', issuer: 'Solidus Verify' },
  { id: '4', did: 'did:solidus:mainnet:2xK8mP5nQ3vL9wR1jE4fB7', type: 'Address Proof', subject: 'David Chen', issuedAt: '2026-03-10', expiresAt: '2027-03-10', status: 'Active', issuer: 'Solidus Verify' },
  { id: '5', did: 'did:solidus:mainnet:5hY9kL2pR6mN8vQ3wE7fB1', type: 'KYC L2', subject: 'Emma Wilson', issuedAt: '2025-12-01', expiresAt: '2026-04-01', status: 'Expiring', issuer: 'Solidus Verify' },
]

const PRESENTATIONS: Presentation[] = [
  { id: '1', verifier: 'Acme Exchange', credType: 'KYC L2', date: '2026-03-20 14:22', status: 'Accepted' },
  { id: '2', verifier: 'GlobalFin Corp', credType: 'KYC L1', date: '2026-03-19 09:15', status: 'Accepted' },
  { id: '3', verifier: 'FastPay Ltd', credType: 'KYC L2', date: '2026-03-18 16:44', status: 'Rejected' },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: CredentialStatus }) {
  if (status === 'Active')
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/10 border border-success/20 text-[11px] font-medium text-success">
        <ShieldCheck className="w-3 h-3" /> Active
      </span>
    )
  if (status === 'Revoked')
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/10 border border-error/20 text-[11px] font-medium text-error">
        <X className="w-3 h-3" /> Revoked
      </span>
    )
  // Expiring
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-warning/10 border border-warning/20 text-[11px] font-medium text-warning">
      <AlertTriangle className="w-3 h-3" /> Expiring
    </span>
  )
}

function StatCard({
  label,
  value,
  valueClass,
}: {
  label: string
  value: number | string
  valueClass?: string
}) {
  return (
    <div className="bg-surface rounded-lg p-5 flex flex-col gap-1 border border-border">
      <span className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">{label}</span>
      <span className={`text-[28px] font-semibold leading-none ${valueClass ?? 'text-white'}`}>{value}</span>
    </div>
  )
}

// Credential card displayed inside the detail panel
function CredentialCard({ credential }: { credential: Credential }) {
  return (
    <div className="mx-6 mt-4 rounded-xl p-5 bg-gradient-to-br from-cta to-[#0044CC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border-2 border-white/30" />
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border border-white/20" />
      </div>
      {/* Top row */}
      <div className="flex items-start justify-between mb-6 relative">
        <span className="text-[12px] font-semibold text-white/80 tracking-[0.04em] uppercase">{credential.issuer}</span>
        <ShieldCheck className="w-6 h-6 text-white/80" />
      </div>
      {/* Credential type */}
      <div className="mb-1 relative">
        <span className="text-[22px] font-bold text-white leading-none">{credential.type}</span>
      </div>
      <div className="mb-6 relative">
        <span className="text-[14px] font-medium text-white/90">{credential.subject}</span>
      </div>
      {/* Bottom row */}
      <div className="flex items-end justify-between relative">
        <span className="text-[10px] text-white/60">Issued by Solidus Protocol</span>
        <span className="font-mono text-[10px] text-white/70 truncate max-w-[160px]">
          {credential.did.substring(0, 30)}…
        </span>
      </div>
    </div>
  )
}

// Detail panel slide-in
function DetailPanel({
  credential,
  onClose,
  onRevoke,
}: {
  credential: Credential
  onClose: () => void
  onRevoke: (id: string) => void
}) {
  const presentations = PRESENTATIONS.filter(p => p.credType === credential.type)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[480px] bg-surface border-l border-border flex flex-col shadow-elevated overflow-y-auto">
        {/* Panel header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[12px] text-text-secondary truncate max-w-[340px]">{credential.did}</span>
            <StatusBadge status={credential.status} />
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual credential card */}
        <CredentialCard credential={credential} />

        {/* Details grid */}
        <div className="px-6 py-4 border-b border-border">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Issued At', value: credential.issuedAt },
              { label: 'Expires At', value: credential.expiresAt },
              { label: 'Issuer', value: credential.issuer },
              { label: 'KYC Level', value: credential.type },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em]">{label}</span>
                <span className="text-[13px] font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Presentation history */}
        <div className="px-6 py-4 flex-1">
          <h3 className="text-[13px] font-semibold text-text-secondary uppercase tracking-[0.04em] mb-3">
            Presentation History
          </h3>
          {presentations.length === 0 ? (
            <p className="text-[13px] text-text-disabled">No presentations yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {presentations.map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2.5 px-3 bg-elevated rounded-md border border-border"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-medium text-white">{p.verifier}</span>
                    <span className="text-[11px] text-text-secondary">{p.credType} · {p.date}</span>
                  </div>
                  {p.status === 'Accepted' ? (
                    <span className="text-[11px] font-medium text-success">Accepted</span>
                  ) : (
                    <span className="text-[11px] font-medium text-error">Rejected</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revoke button */}
        {(credential.status === 'Active' || credential.status === 'Expiring') && (
          <div className="px-6 pb-6 pt-2 border-t border-border">
            <button
              onClick={() => onRevoke(credential.id)}
              className="w-full h-10 rounded-md bg-error/10 border border-error/20 text-error text-[14px] font-medium hover:bg-error/20 transition-colors"
            >
              Revoke Credential
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Revoke confirmation modal
function RevokeModal({
  credential,
  onConfirm,
  onCancel,
  loading,
}: {
  credential: Credential
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface rounded-xl border border-border w-full max-w-[480px] p-6 flex flex-col gap-5 shadow-elevated">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-white">Revoke Credential</h3>
          <button onClick={onCancel} className="text-text-secondary hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-start gap-3 bg-error/10 border border-error/20 rounded-md p-4">
          <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <p className="text-[13px] text-error leading-relaxed">
            This action cannot be undone. The credential will be permanently invalidated.
          </p>
        </div>

        <div>
          <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">
            Credential DID
          </span>
          <div className="bg-elevated rounded-md p-3">
            <span className="font-mono text-[12px] text-white break-all">{credential.did}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <button
            onClick={onCancel}
            disabled={loading}
            className="h-9 px-4 rounded-md border border-border text-[14px] text-white hover:bg-elevated transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="h-9 px-5 bg-error hover:bg-error/90 text-white text-[14px] font-medium rounded-md transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Revoking…
              </>
            ) : (
              'Revoke Credential'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type StatusFilter = 'All' | CredentialStatus

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>(INITIAL_CREDENTIALS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [revokeTarget, setRevokeTarget] = useState<Credential | null>(null)
  const [revokeLoading, setRevokeLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  // Derived stats
  const active = credentials.filter(c => c.status === 'Active').length
  const revoked = credentials.filter(c => c.status === 'Revoked').length
  const expiring = credentials.filter(c => c.status === 'Expiring').length

  // Filtered list
  const filtered = credentials.filter(c => {
    const matchSearch =
      !search ||
      c.did.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleCopyDID = (did: string, id: string) => {
    navigator.clipboard.writeText(did)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  const handleRevokeClick = (credential: Credential) => {
    setRevokeTarget(credential)
  }

  const handleRevokeConfirm = () => {
    if (!revokeTarget) return
    setRevokeLoading(true)
    setTimeout(() => {
      setCredentials(prev =>
        prev.map(c => c.id === revokeTarget.id ? { ...c, status: 'Revoked' as CredentialStatus } : c)
      )
      // If the panel is open for this credential, update it too
      if (selectedCredential?.id === revokeTarget.id) {
        setSelectedCredential(prev => prev ? { ...prev, status: 'Revoked' } : null)
      }
      setRevokeLoading(false)
      setRevokeTarget(null)
    }, 900)
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white leading-none">Credentials</h2>
        <button className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors flex items-center gap-2">
          <Award className="w-4 h-4" /> Issue Credential
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Credentials" value={active} valueClass="text-success" />
        <StatCard label="Total Issued" value={credentials.length} valueClass="text-white" />
        <StatCard label="Revoked" value={revoked} valueClass="text-error" />
        <StatCard label="Expiring Soon" value={expiring} valueClass="text-warning" />
      </div>

      {/* Filter bar */}
      <div className="bg-surface rounded-lg p-4 flex items-center gap-3">
        {/* Search */}
        <div className="relative w-[280px] flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by DID, subject, or type…"
            className="w-full h-9 pl-9 pr-3 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-text-disabled"
          />
        </div>
        <div className="w-px h-5 bg-border" />
        {/* Status pills */}
        <div className="flex items-center gap-2">
          {(['All', 'Active', 'Expiring', 'Revoked'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`h-8 px-3.5 rounded-full text-[13px] font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-cta text-white'
                  : 'bg-elevated border border-border text-text-secondary hover:text-white hover:bg-border/50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-elevated h-11 border-b border-border">
                <th className="py-0 px-5 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">DID</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Subject</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Type</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Issued</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Expires</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Status</th>
                <th className="py-0 px-5 w-[140px] text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(cred => (
                  <tr
                    key={cred.id}
                    onClick={() => setSelectedCredential(cred)}
                    className="h-12 border-b border-elevated hover:bg-elevated transition-colors duration-150 cursor-pointer group"
                  >
                    {/* DID */}
                    <td className="py-0 px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] text-white truncate max-w-[200px]">
                          {cred.did}
                        </span>
                        <button
                          onClick={e => { e.stopPropagation(); handleCopyDID(cred.did, cred.id) }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-text-disabled hover:text-white"
                        >
                          <Copy className={`w-3.5 h-3.5 ${copied === cred.id ? 'text-success' : ''}`} />
                        </button>
                      </div>
                    </td>
                    {/* Subject */}
                    <td className="py-0 px-4">
                      <span className="text-[13px] font-medium text-white">{cred.subject}</span>
                    </td>
                    {/* Type */}
                    <td className="py-0 px-4">
                      <span className="text-[13px] text-text-secondary">{cred.type}</span>
                    </td>
                    {/* Issued */}
                    <td className="py-0 px-4">
                      <span className="font-mono text-[13px] text-text-secondary">{cred.issuedAt}</span>
                    </td>
                    {/* Expires */}
                    <td className="py-0 px-4">
                      <span className="font-mono text-[13px] text-text-secondary">{cred.expiresAt}</span>
                    </td>
                    {/* Status */}
                    <td className="py-0 px-4">
                      <StatusBadge status={cred.status} />
                    </td>
                    {/* Actions */}
                    <td
                      className="py-0 px-5"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedCredential(cred)}
                          className="h-7 px-3 rounded text-[12px] font-medium text-text-secondary border border-border hover:text-white hover:bg-elevated transition-colors"
                        >
                          View
                        </button>
                        {(cred.status === 'Active' || cred.status === 'Expiring') && (
                          <button
                            onClick={() => handleRevokeClick(cred)}
                            className="h-7 px-3 rounded text-[12px] font-medium text-error hover:bg-error/10 transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="h-[300px]">
                    <div className="flex flex-col items-center justify-center w-full h-full text-center">
                      <Search className="w-10 h-10 text-text-secondary mb-3" />
                      <h3 className="text-[18px] font-semibold text-white mb-1">No credentials found</h3>
                      <p className="text-[13px] text-text-secondary mb-4">Try adjusting your filters or search query.</p>
                      <button
                        onClick={() => { setSearch(''); setStatusFilter('All') }}
                        className="text-[13px] font-medium text-cta hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="h-[52px] px-5 flex items-center border-t border-elevated bg-surface">
            <span className="text-[12px] text-text-secondary">
              Showing {filtered.length} of {credentials.length} credentials
            </span>
          </div>
        )}
      </div>

      {/* Expiry warning banner */}
      {expiring > 0 && (
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-5 flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-warning/10 rounded-full mt-0.5 shrink-0">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[16px] font-semibold text-warning">{expiring.toLocaleString()} Credential{expiring !== 1 ? 's' : ''} Expiring Soon</h3>
              <p className="text-[14px] text-text-secondary">
                These credentials expire within 30 days. Consider notifying affected users to re-verify before expiry to avoid access disruption.
              </p>
            </div>
          </div>
          <button className="h-9 px-4 bg-warning hover:bg-warning/90 text-text-primary rounded-md text-[13px] font-semibold transition-colors shrink-0">
            Send Re-verification Nudge
          </button>
        </div>
      )}

      {/* Detail panel */}
      {selectedCredential && (
        <DetailPanel
          credential={credentials.find(c => c.id === selectedCredential.id) ?? selectedCredential}
          onClose={() => setSelectedCredential(null)}
          onRevoke={id => {
            const cred = credentials.find(c => c.id === id)
            if (cred) handleRevokeClick(cred)
          }}
        />
      )}

      {/* Revoke confirmation modal */}
      {revokeTarget && (
        <RevokeModal
          credential={revokeTarget}
          onConfirm={handleRevokeConfirm}
          onCancel={() => setRevokeTarget(null)}
          loading={revokeLoading}
        />
      )}
    </div>
  )
}
