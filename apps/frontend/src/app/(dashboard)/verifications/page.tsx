'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Download, Plus, Search, ChevronDown, Copy, Eye, MoreHorizontal, X, Flag,
  ArrowUpDown, Clock, XCircle, ShieldCheck, RefreshCw
} from 'lucide-react'
import { api, ApiError } from '../../../lib/api'
import type { Verification } from '../../../types/api'

type VerificationRow = {
  id: string
  did: string
  type: string
  status: string
  risk: number | null
  country: string
  duration: string
  cost: string
  time: string
}

const FILTER_MOCK_VALUES: Record<string, string> = {
  'Status': 'Verified',
  'Type': 'KYC L2',
  'Date Range': 'Last 7 days',
  'Country': 'US',
  'Risk Level': 'High',
}

const TYPE_SUBTITLES: Record<string, string> = {
  'KYC L1': 'ID only',
  'KYC L2': 'ID + Liveness',
  'KYC L3': 'ID + Liveness + AML',
  'Email': 'Email OTP',
  'Phone': 'SMS OTP',
  'Address': 'Address proof',
}

const TYPE_COSTS: Record<string, number> = {
  'KYC L1': 1.00,
  'KYC L2': 5.00,
  'KYC L3': 20.00,
  'Email': 0.10,
  'Phone': 0.20,
  'Address': 2.00,
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  if (s === 'verified') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-medium text-success"><ShieldCheck className="w-3 h-3" /> Verified</span>
  if (s === 'pending') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-warning/15 border border-warning/30 text-[11px] font-medium text-warning"><Clock className="w-3 h-3" /> Pending</span>
  if (s === 'failed') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/15 border border-error/30 text-[11px] font-medium text-error"><XCircle className="w-3 h-3" /> Failed</span>
  if (s === 'processing') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cta/15 border border-cta/30 text-[11px] font-medium text-cta"><RefreshCw className="w-3 h-3 animate-spin" /> Processing</span>
  return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-border/30 border border-border text-[11px] font-medium text-text-secondary">{status}</span>
}

function RiskBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/12 border border-warning/25 text-[11px] font-medium text-warning"><Flag className="w-2.5 h-2.5" /> Flagged</span>
  if (score <= 30) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/12 border border-success/25 text-[11px] font-medium text-success">{score} Low</span>
  if (score <= 70) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/12 border border-warning/25 text-[11px] font-medium text-warning">{score} Med</span>
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error/12 border border-error/25 text-[11px] font-medium text-error">{score} High</span>
}

function randomHex16(): string {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function nowTimestamp(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function VerificationsPage() {
  const [allData, setAllData] = useState<VerificationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  useEffect(() => {
    api.get<{ data: Verification[], total: number }>('/v1/dashboard/verifications?limit=50')
      .then((res) => {
        const mapped = res.data.map((v) => ({
          id: v.id.slice(0, 8),
          did: v.subjectDid ?? '—',
          type: v.level === 1 ? 'KYC L1' : v.level === 2 ? 'KYC L2' : 'KYC L3',
          status: v.status.charAt(0).toUpperCase() + v.status.slice(1),
          risk: null as number | null,
          country: '—',
          duration: '—',
          cost: '—',
          time: new Date(v.createdAt).toISOString().replace('T', ' ').slice(0, 16),
        }))
        setAllData(mapped)
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          setFetchError(err.detail ?? err.message)
        } else {
          setFetchError('Failed to load verifications')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // Compute stats from real data
  const stats = {
    All: allData.length,
    Verified: allData.filter(d => d.status === 'Completed').length,
    Pending: allData.filter(d => d.status === 'Pending').length,
    Failed: allData.filter(d => d.status === 'Failed').length,
    Processing: allData.filter(d => ['Document_uploaded', 'Document_processing', 'Awaiting_liveness', 'Liveness_uploaded', 'Liveness_processing'].includes(d.status)).length,
    Flagged: 0,
  }

  // New Verification modal state
  const [showModal, setShowModal] = useState(false)
  const [newVerifStep, setNewVerifStep] = useState<1 | 2>(1)
  const [newVerifType, setNewVerifType] = useState('KYC L2')
  const [newVerifEmail, setNewVerifEmail] = useState('')
  const [newVerifRef, setNewVerifRef] = useState('')

  const openModal = () => {
    setNewVerifStep(1)
    setNewVerifType('KYC L2')
    setNewVerifEmail('')
    setNewVerifRef('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setNewVerifStep(1)
    setNewVerifType('KYC L2')
    setNewVerifEmail('')
    setNewVerifRef('')
  }

  // Mock: creating verifications requires API key auth, not JWT — kept as local state simulation
  const handleStartVerification = () => {
    const estimatedCost = TYPE_COSTS[newVerifType] ?? 0
    const newRow: VerificationRow = {
      id: String(Date.now()),
      did: `did:solidus:mainnet:${randomHex16()}`,
      type: newVerifType,
      status: 'Processing',
      risk: null,
      country: '—',
      duration: '—',
      cost: `$${estimatedCost.toFixed(2)}`,
      time: nowTimestamp(),
    }
    setAllData(prev => [newRow, ...prev])
    closeModal()
  }

  const setFilter = (label: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [label]: value }))
  }

  const removeFilter = (label: string) => {
    setActiveFilters(prev => {
      const next = { ...prev }
      delete next[label]
      return next
    })
  }

  const clearAllFilters = () => setActiveFilters({})

  let filtered = allData
  if (activeTab === 'Flagged') filtered = filtered.filter(d => (d.risk !== null && d.risk > 70) || d.risk === null)
  else if (activeTab !== 'All') filtered = filtered.filter(d => d.status === activeTab)
  if (search) filtered = filtered.filter(d => d.did.toLowerCase().includes(search.toLowerCase()))
  if (activeFilters['Status']) filtered = filtered.filter(d => d.status === activeFilters['Status'])
  if (activeFilters['Type']) filtered = filtered.filter(d => d.type === activeFilters['Type'])
  if (activeFilters['Risk Level'] === 'High') filtered = filtered.filter(d => d.risk !== null && d.risk > 70)
  if (activeFilters['Country'] === 'US') filtered = filtered.filter(d => d.country.includes('US'))

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? filtered.map(d => d.id) : [])
  }

  const toggleOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const activeFilterCount = Object.keys(activeFilters).length
  const estimatedCost = TYPE_COSTS[newVerifType] ?? 0

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cta border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white leading-none">Verifications</h2>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 rounded-md border border-border text-[14px] font-medium text-white hover:bg-elevated transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={openModal}
            className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Verification
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="w-full bg-error/10 border border-error/30 rounded-lg px-4 py-3 text-[13px] text-error">
          {fetchError}
        </div>
      )}

      {/* Filter Bar */}
      <div className="w-full bg-surface rounded-lg p-4 px-5 flex items-center gap-3 flex-wrap">
        <div className="relative flex-shrink-0 w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by DID, email, or reference..."
            className="w-full h-9 pl-9 pr-3 bg-transparent border-none outline-none text-[14px] font-normal text-white placeholder:text-text-disabled"
          />
        </div>
        <div className="w-px h-5 bg-border mx-1" />
        {['Status', 'Type', 'Date Range', 'Country', 'Risk Level'].map((label) => {
          const isActive = label in activeFilters
          const value = activeFilters[label] ?? ''
          if (isActive) {
            return (
              <button
                key={label}
                className="h-9 px-3 rounded-full bg-cta/15 border border-cta/30 flex items-center gap-1.5 text-[13px] text-cta font-medium"
              >
                <span>{label}: {value}</span>
                <X
                  className="w-3 h-3"
                  onClick={e => { e.stopPropagation(); removeFilter(label) }}
                />
              </button>
            )
          }
          return (
            <button
              key={label}
              onClick={() => setFilter(label, FILTER_MOCK_VALUES[label] ?? '')}
              className="h-9 px-3 rounded-md bg-elevated border border-border flex items-center gap-2 hover:bg-border/50 transition-colors"
            >
              <span className="text-[14px] font-normal text-white">{label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            </button>
          )
        })}
        {activeFilterCount > 1 && (
          <button
            onClick={clearAllFilters}
            className="text-[12px] text-text-disabled hover:text-white transition-colors ml-1"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1">
        {(['All', 'Verified', 'Pending', 'Failed', 'Processing'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-8 px-3 rounded-full flex items-center gap-2 transition-colors ${activeTab === tab ? 'bg-cta text-white' : 'bg-transparent text-text-secondary hover:text-white hover:bg-elevated/50'}`}
          >
            <span className={`text-[12px] ${activeTab === tab ? 'font-medium' : 'font-normal'}`}>{tab}</span>
            <div className={`h-5 px-1.5 rounded-full flex items-center justify-center text-[11px] font-medium ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-elevated text-text-disabled'}`}>
              {stats[tab]}
            </div>
          </button>
        ))}
        <div className="w-px h-4 bg-border mx-1" />
        <button
          onClick={() => setActiveTab('Flagged')}
          className={`h-8 px-3 flex items-center gap-2 transition-all border-b-2 ${activeTab === 'Flagged' ? 'border-warning text-warning' : 'border-transparent text-text-secondary hover:bg-elevated/50'}`}
        >
          <span className={`text-[12px] ${activeTab === 'Flagged' ? 'font-medium' : 'font-normal'}`}>Flagged</span>
          <div className="h-5 px-1.5 rounded-full bg-warning/15 flex items-center justify-center text-[11px] font-medium text-warning">{stats.Flagged}</div>
        </button>
      </div>

      {/* Table */}
      <div className="w-full bg-surface rounded-lg overflow-hidden flex flex-col relative">
        {selectedIds.length > 0 && (
          <div className="absolute top-0 left-0 right-0 h-11 bg-cta/10 border-b border-cta/20 z-10 flex items-center px-5 justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-medium text-white">{selectedIds.length} selected</span>
              <button onClick={() => setSelectedIds([])} className="text-[12px] font-normal text-cta hover:underline">Deselect All</button>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-7 px-3 rounded text-[12px] font-medium text-white hover:bg-cta/20 transition-colors">Export Selected</button>
              <button className="h-7 px-3 rounded text-[12px] font-medium text-error hover:bg-error/10 transition-colors">Revoke Selected</button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-elevated h-11 border-b border-border">
                <th className="w-12 pl-5 pr-2">
                  <input type="checkbox" className="w-4 h-4 accent-cta rounded" onChange={toggleAll} checked={selectedIds.length === filtered.length && filtered.length > 0} />
                </th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-white">DID <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Type</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Status</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[100px]">Risk</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Country</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Duration</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Cost</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-white">Timestamp <ArrowUpDown className="w-3 h-3 text-cta" /></div>
                </th>
                <th className="py-0 px-5 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(r => {
                const isSelected = selectedIds.includes(r.id)
                return (
                  <tr
                    key={r.id}
                    className={`h-12 border-b border-elevated hover:bg-elevated transition-colors duration-150 group ${isSelected ? 'bg-cta/5' : ''}`}
                    style={{ borderLeft: isSelected ? '3px solid #0066FF' : (r.risk !== null && r.risk > 70) ? '3px solid #FF3B30' : '3px solid transparent' }}
                  >
                    <td className="w-12 pl-5 pr-2">
                      <input type="checkbox" className="w-4 h-4 accent-cta rounded" checked={isSelected} onChange={() => toggleOne(r.id)} />
                    </td>
                    <td className="py-0 px-4 font-mono text-[13px] font-normal text-white">
                      <div className="flex items-center gap-2">
                        <Link href={`/verifications/${r.id}`} className="truncate max-w-[220px] hover:underline hover:text-cta transition-colors">
                          {r.did.substring(0, 24)}...
                        </Link>
                        <button className="text-text-disabled hover:text-white opacity-0 group-hover:opacity-100" onClick={() => navigator.clipboard.writeText(r.did)}>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-0 px-4 text-[13px] font-normal text-white">{r.type}</td>
                    <td className="py-0 px-4"><StatusBadge status={r.status} /></td>
                    <td className="py-0 px-4"><RiskBadge score={r.risk} /></td>
                    <td className="py-0 px-4 text-[13px] font-normal text-white">
                      <span className="text-[16px] leading-none">{r.country.split(' ')[0]}</span>{' '}{r.country.split(' ')[1] ?? ''}
                    </td>
                    <td className="py-0 px-4 text-[13px] font-normal text-text-secondary">{r.duration}</td>
                    <td className="py-0 px-4 font-mono text-[13px] font-normal text-white">{r.cost}</td>
                    <td className="py-0 px-4 font-mono text-[13px] font-normal text-text-secondary">{r.time}</td>
                    <td className="py-0 px-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/verifications/${r.id}`} className="p-1.5 text-text-secondary hover:text-white hover:bg-border/50 rounded-md transition-colors">
                          <Eye className="w-[18px] h-[18px]" />
                        </Link>
                        <button className="p-1.5 text-text-secondary hover:text-white hover:bg-border/50 rounded-md transition-colors">
                          <MoreHorizontal className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan={10} className="h-[400px]">
                    <div className="flex flex-col items-center justify-center w-full h-full text-center">
                      <Search className="w-12 h-12 text-text-secondary mb-4" />
                      <h3 className="text-[22px] font-semibold text-white mb-2">No results</h3>
                      <p className="text-[14px] font-normal text-text-secondary mb-6">Try adjusting your filters or search query.</p>
                      <button onClick={() => { setSearch(''); setActiveTab('All'); clearAllFilters() }} className="text-[14px] font-medium text-cta hover:underline">Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="h-[60px] px-5 flex items-center justify-between border-t border-elevated bg-surface">
            <span className="text-[12px] font-normal text-text-secondary">
              Showing 1–{Math.min(20, filtered.length)} of {stats[activeTab as keyof typeof stats] ?? filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button disabled className="h-7 px-2 text-[12px] font-medium text-text-disabled cursor-not-allowed">Previous</button>
              {[1, 2, 3].map(n => (
                <button key={n} className={`w-7 h-7 rounded-full text-[12px] font-medium flex items-center justify-center ${n === 1 ? 'bg-cta text-white' : 'text-text-secondary hover:bg-elevated hover:text-white transition-colors'}`}>{n}</button>
              ))}
              <span className="w-7 h-7 flex items-center justify-center text-text-secondary text-[12px]">...</span>
              <button className="w-7 h-7 rounded-full text-text-secondary hover:bg-elevated hover:text-white transition-colors text-[12px] font-medium flex items-center justify-center">63</button>
              <button className="h-7 px-2 text-[12px] font-medium text-white hover:text-cta transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* New Verification Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-surface rounded-xl border border-border w-full max-w-[480px] p-6 flex flex-col gap-5 shadow-elevated mx-4">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[18px] font-semibold text-white leading-snug">
                  {newVerifStep === 1 ? 'New Verification' : 'Subject Details'}
                </h3>
                <p className="text-[13px] text-text-secondary mt-0.5">
                  {newVerifStep === 1 ? 'Select the verification type to run.' : 'Enter the subject information below.'}
                </p>
              </div>
              <button onClick={closeModal} className="p-1.5 text-text-secondary hover:text-white hover:bg-elevated rounded-md transition-colors -mt-1 -mr-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {newVerifStep === 1 ? (
              <>
                {/* Type selection grid */}
                <div className="grid grid-cols-3 gap-2">
                  {(['KYC L1', 'KYC L2', 'KYC L3', 'Email', 'Phone', 'Address'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setNewVerifType(t)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${newVerifType === t ? 'border-cta bg-cta/10' : 'border-border hover:border-border/80 bg-elevated/30 hover:bg-elevated/60'}`}
                    >
                      <div className="text-[13px] font-semibold text-white">{t}</div>
                      <div className="text-[11px] text-text-secondary mt-0.5">{TYPE_SUBTITLES[t] ?? ''}</div>
                    </button>
                  ))}
                </div>

                {/* Step 1 footer */}
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={closeModal}
                    className="h-9 px-4 rounded-md border border-border text-[14px] font-medium text-white hover:bg-elevated transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setNewVerifStep(2)}
                    disabled={!newVerifType}
                    className="h-9 px-4 rounded-md bg-cta text-white text-[14px] font-medium hover:bg-cta/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Subject details fields */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-white">Subject Email</label>
                    <input
                      type="email"
                      value={newVerifEmail}
                      onChange={e => setNewVerifEmail(e.target.value)}
                      placeholder="subject@example.com"
                      className="h-10 px-3 rounded-lg bg-elevated border border-border text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-white">
                      Reference ID <span className="text-text-secondary font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={newVerifRef}
                      onChange={e => setNewVerifRef(e.target.value)}
                      placeholder="e.g. user_123"
                      className="h-10 px-3 rounded-lg bg-elevated border border-border text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta transition-colors"
                    />
                  </div>
                  <div className="text-[13px] text-text-secondary">
                    Estimated cost: <span className="font-semibold text-white">${estimatedCost.toFixed(2)}</span>
                  </div>
                </div>

                {/* Step 2 footer */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setNewVerifStep(1)}
                    className="h-9 px-4 rounded-md border border-border text-[14px] font-medium text-white hover:bg-elevated transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleStartVerification}
                    disabled={!newVerifEmail.trim()}
                    className="h-9 px-4 rounded-md bg-cta text-white text-[14px] font-medium hover:bg-cta/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Start Verification
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
