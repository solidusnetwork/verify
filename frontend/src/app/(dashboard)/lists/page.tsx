'use client'

import React, { useState } from 'react'
import {
  CheckCircle, XCircle, GitBranch, Copy, Trash2, Plus, X, MoreHorizontal,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

type AllowEntry = { id: string; did: string; addedBy: string; date: string; note: string | null }
type DenyEntry  = { id: string; did: string; reason: string | null; addedBy: string; date: string; isSystem: boolean }
type CustomList = { id: string; name: string; entries: number; description: string; type: 'allow' | 'deny' | 'route'; workflows: number; updated: string }

const INITIAL_ALLOW: AllowEntry[] = [
  { id: '1', did: 'did:solidus:mainnet:3xK9mP2nQ8vL7wR4', addedBy: 'admin@acmecorp.com', date: '2026-03-15', note: 'VIP partner user' },
  { id: '2', did: 'partner@fastpay.com', addedBy: 'admin@acmecorp.com', date: '2026-03-14', note: 'FastPay integration' },
  { id: '3', did: 'did:solidus:mainnet:7hY2kL5pR9mN4vQ8', addedBy: 'sarah@acmecorp.com', date: '2026-03-12', note: null },
  { id: '4', did: 'did:solidus:mainnet:9mR4kP7nL2vQ5wY8', addedBy: 'admin@acmecorp.com', date: '2026-03-10', note: 'Internal test account' },
  { id: '5', did: 'test@acmecorp.com', addedBy: 'mike@acmecorp.com', date: '2026-03-08', note: null },
]

const INITIAL_DENY: DenyEntry[] = [
  { id: '1', did: 'did:solidus:mainnet:2xK8mP5nQ3vL9wR1', reason: 'Fraudulent activity', addedBy: 'Solidus Engine', date: '2026-03-18', isSystem: true },
  { id: '2', did: 'blocked@frauduser.com', reason: 'Identity theft attempt', addedBy: 'admin@acmecorp.com', date: '2026-03-16', isSystem: false },
  { id: '3', did: 'did:solidus:mainnet:5hY9kL2pR6mN8vQ3', reason: 'Multiple verification fails', addedBy: 'Solidus Engine', date: '2026-03-14', isSystem: true },
  { id: '4', did: 'spam@example.com', reason: null, addedBy: 'sarah@acmecorp.com', date: '2026-03-12', isSystem: false },
  { id: '5', did: 'did:solidus:mainnet:1mR7kP4nL8vQ2wY5', reason: 'AML screening match', addedBy: 'Solidus Engine', date: '2026-03-10', isSystem: true },
]

const INITIAL_CUSTOM: CustomList[] = [
  { id: '1', name: 'VIP Partners', entries: 24, description: 'Trusted partner accounts that bypass enhanced verification steps.', type: 'allow', workflows: 3, updated: '2 days ago' },
  { id: '2', name: 'High-Risk Countries', entries: 12, description: 'Users from these countries undergo enhanced KYC L3 verification.', type: 'route', workflows: 1, updated: '1 week ago' },
  { id: '3', name: 'Suspended Accounts', entries: 38, description: 'Accounts pending compliance review. All sessions blocked until cleared.', type: 'deny', workflows: 2, updated: '3 days ago' },
  { id: '4', name: 'Beta Testers', entries: 7, description: 'Internal test accounts that use sandbox mode automatically.', type: 'route', workflows: 1, updated: '5 days ago' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function initials(email: string) {
  const parts = email.split('@')[0]?.split(/[._-]/) ?? []
  return (parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('') || email[0]?.toUpperCase()) ?? '?'
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-text-disabled hover:text-white ml-1.5"
    >
      {copied ? <CheckCircle className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

function ListTypeBadge({ type }: { type: 'allow' | 'deny' | 'route' }) {
  if (type === 'allow') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/12 border border-success/25 text-[11px] font-medium text-success"><CheckCircle className="w-2.5 h-2.5" /> Allow</span>
  if (type === 'deny')  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error/12 border border-error/25 text-[11px] font-medium text-error"><XCircle className="w-2.5 h-2.5" /> Deny</span>
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cta/12 border border-cta/25 text-[11px] font-medium text-cta"><GitBranch className="w-2.5 h-2.5" /> Route</span>
}

// ─── Delete Confirm Cell ──────────────────────────────────────────────────────

function DeleteCell({ onConfirm, accentClass }: { onConfirm: () => void; accentClass: string }) {
  const [confirming, setConfirming] = useState(false)
  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[12px] text-text-secondary">Remove?</span>
        <button
          onClick={() => { onConfirm(); setConfirming(false) }}
          className={`text-[12px] font-medium ${accentClass} hover:underline`}
        >
          Yes
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[12px] font-medium text-text-secondary hover:underline"
        >
          No
        </button>
      </div>
    )
  }
  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-text-secondary hover:text-error hover:bg-error/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
    >
      <Trash2 className="w-[15px] h-[15px]" />
    </button>
  )
}

// ─── Create List Modal ────────────────────────────────────────────────────────

type ListTypeOption = 'allow' | 'deny' | 'route'

function CreateListModal({ onClose, onCreate }: {
  onClose: () => void
  onCreate: (name: string, description: string, type: ListTypeOption) => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedType, setSelectedType] = useState<ListTypeOption | null>(null)

  const canCreate = name.trim().length > 0 && selectedType !== null

  const typeOptions: { value: ListTypeOption; label: string; sub: string; icon: React.ReactNode; activeClasses: string }[] = [
    {
      value: 'allow',
      label: 'Allow List',
      sub: 'Bypass verification steps',
      icon: <CheckCircle className="w-5 h-5" />,
      activeClasses: 'border-success bg-success/10 text-success',
    },
    {
      value: 'deny',
      label: 'Deny List',
      sub: 'Permanently block access',
      icon: <XCircle className="w-5 h-5" />,
      activeClasses: 'border-error bg-error/10 text-error',
    },
    {
      value: 'route',
      label: 'Route List',
      sub: 'Condition in workflows',
      icon: <GitBranch className="w-5 h-5" />,
      activeClasses: 'border-cta bg-cta/10 text-cta',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface rounded-xl border border-border w-full max-w-[480px] p-6 flex flex-col gap-5 shadow-elevated">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-white">Create Custom List</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">
              List Name <span className="text-error">*</span>
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. VIP Partners"
              className="w-full h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">
              Description <span className="text-text-disabled normal-case tracking-normal">(optional)</span>
            </label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What is this list used for?"
              className="w-full h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-2">
              List Type <span className="text-error">*</span>
            </label>
            <div className="flex gap-2">
              {typeOptions.map(opt => {
                const isActive = selectedType === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedType(opt.value)}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-colors ${
                      isActive ? opt.activeClasses : 'border-border text-text-secondary hover:border-border/80 hover:text-white'
                    }`}
                  >
                    {opt.icon}
                    <span className="text-[13px] font-medium">{opt.label}</span>
                    <span className="text-[11px] leading-tight">{opt.sub}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-md border border-border text-[14px] text-white hover:bg-elevated transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (canCreate) {
                onCreate(name.trim(), description.trim(), selectedType!)
                onClose()
              }
            }}
            disabled={!canCreate}
            className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Allow List Tab ───────────────────────────────────────────────────────────

function AllowListTab() {
  const [entries, setEntries] = useState<AllowEntry[]>(INITIAL_ALLOW)
  const [didInput, setDidInput] = useState('')
  const [noteInput, setNoteInput] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const canAdd = didInput.trim().length > 0

  const addEntry = () => {
    if (!canAdd) return
    const newEntry: AllowEntry = {
      id: Date.now().toString(),
      did: didInput.trim(),
      addedBy: 'admin@acmecorp.com',
      date: new Date().toISOString().split('T')[0]!,
      note: noteInput.trim() || null,
    }
    setEntries(prev => [newEntry, ...prev])
    setDidInput('')
    setNoteInput('')
  }

  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id))

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedIds(e.target.checked ? entries.map(e => e.id) : [])
  const toggleOne = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <div className="flex flex-col gap-3">
      {/* Add bar */}
      <div className="bg-surface rounded-lg p-3.5 px-5 flex items-center gap-3">
        <input
          value={didInput}
          onChange={e => setDidInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addEntry() }}
          placeholder="did:solidus:mainnet:… or email@example.com"
          className="flex-1 h-9 bg-elevated border border-border rounded-md px-3 font-mono text-[13px] text-white placeholder:text-text-disabled outline-none focus:border-success/50 transition-colors"
        />
        <input
          value={noteInput}
          onChange={e => setNoteInput(e.target.value)}
          placeholder="Optional note"
          className="w-[200px] h-9 bg-elevated border border-border rounded-md px-3 text-[13px] text-white placeholder:text-text-disabled outline-none focus:border-success/50 transition-colors"
        />
        <button
          onClick={addEntry}
          disabled={!canAdd}
          className={`h-9 px-4 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 ${canAdd ? 'bg-success text-white hover:bg-success/90' : 'bg-elevated text-text-disabled cursor-not-allowed'}`}
        >
          <Plus className="w-3.5 h-3.5" /> Add to Allow List
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-elevated h-11 border-b border-border">
                <th className="w-12 pl-5 pr-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-success rounded"
                    onChange={toggleAll}
                    checked={selectedIds.length === entries.length && entries.length > 0}
                  />
                </th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">DID / Email</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Note</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Added By</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Date Added</th>
                <th className="py-0 px-5 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => {
                const isSelected = selectedIds.includes(entry.id)
                return (
                  <tr
                    key={entry.id}
                    className={`h-12 border-b border-elevated hover:bg-elevated transition-colors duration-150 group ${isSelected ? 'bg-success/5' : ''}`}
                  >
                    <td className="w-12 pl-5 pr-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-success rounded"
                        checked={isSelected}
                        onChange={() => toggleOne(entry.id)}
                      />
                    </td>
                    <td className="py-0 px-4">
                      <div className="flex items-center">
                        <span className="font-mono text-[13px] text-white truncate max-w-[260px]">{entry.did}</span>
                        <CopyButton text={entry.did} />
                      </div>
                    </td>
                    <td className="py-0 px-4 text-[13px] text-text-secondary">
                      {entry.note ?? <span className="text-text-disabled">—</span>}
                    </td>
                    <td className="py-0 px-4 text-[14px] text-white">{entry.addedBy}</td>
                    <td className="py-0 px-4 font-mono text-[12px] text-text-secondary">{entry.date}</td>
                    <td className="py-0 px-5 text-right">
                      <DeleteCell onConfirm={() => removeEntry(entry.id)} accentClass="text-error" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="h-[52px] px-5 flex items-center border-t border-elevated">
          <span className="text-[12px] text-text-secondary">Showing 1–{entries.length} of 142</span>
        </div>
      </div>
    </div>
  )
}

// ─── Deny List Tab ────────────────────────────────────────────────────────────

function DenyListTab() {
  const [entries, setEntries] = useState<DenyEntry[]>(INITIAL_DENY)
  const [didInput, setDidInput] = useState('')
  const [reasonInput, setReasonInput] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const canAdd = didInput.trim().length > 0

  const addEntry = () => {
    if (!canAdd) return
    const newEntry: DenyEntry = {
      id: Date.now().toString(),
      did: didInput.trim(),
      reason: reasonInput.trim() || null,
      addedBy: 'admin@acmecorp.com',
      date: new Date().toISOString().split('T')[0]!,
      isSystem: false,
    }
    setEntries(prev => [newEntry, ...prev])
    setDidInput('')
    setReasonInput('')
  }

  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id))

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedIds(e.target.checked ? entries.map(e => e.id) : [])
  const toggleOne = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <div className="flex flex-col gap-3">
      {/* Warning card */}
      <div className="bg-error/[0.06] border border-error/20 rounded-lg p-3 px-4 flex items-start gap-3">
        <XCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
        <p className="text-[13px] text-error/80 leading-relaxed">
          Users on the deny list are <span className="font-semibold text-error">permanently blocked</span> from all verification flows. This applies across all workflows and cannot be bypassed by other rules.
        </p>
      </div>

      {/* Add bar */}
      <div className="bg-surface rounded-lg p-3.5 px-5 flex items-center gap-3">
        <input
          value={didInput}
          onChange={e => setDidInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addEntry() }}
          placeholder="did:solidus:mainnet:… or email@example.com"
          className="flex-1 h-9 bg-elevated border border-border rounded-md px-3 font-mono text-[13px] text-white placeholder:text-text-disabled outline-none focus:border-error/50 transition-colors"
        />
        <input
          value={reasonInput}
          onChange={e => setReasonInput(e.target.value)}
          placeholder="Reason (optional)"
          className="w-[200px] h-9 bg-elevated border border-border rounded-md px-3 text-[13px] text-white placeholder:text-text-disabled outline-none focus:border-error/50 transition-colors"
        />
        <button
          onClick={addEntry}
          disabled={!canAdd}
          className={`h-9 px-4 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 ${canAdd ? 'bg-error text-white hover:bg-error/90' : 'bg-elevated text-text-disabled cursor-not-allowed'}`}
        >
          <Plus className="w-3.5 h-3.5" /> Add to Deny List
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-elevated h-11 border-b border-border">
                <th className="w-12 pl-5 pr-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-error rounded"
                    onChange={toggleAll}
                    checked={selectedIds.length === entries.length && entries.length > 0}
                  />
                </th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">DID / Email</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Reason</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Added By</th>
                <th className="py-0 px-4 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Date Added</th>
                <th className="py-0 px-5 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => {
                const isSelected = selectedIds.includes(entry.id)
                return (
                  <tr
                    key={entry.id}
                    className={`h-12 border-b border-elevated hover:bg-elevated transition-colors duration-150 group ${isSelected ? 'bg-error/5' : ''}`}
                  >
                    <td className="w-12 pl-5 pr-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-error rounded"
                        checked={isSelected}
                        onChange={() => toggleOne(entry.id)}
                      />
                    </td>
                    <td className="py-0 px-4">
                      <div className="flex items-center">
                        <span className="font-mono text-[13px] text-white truncate max-w-[260px]">{entry.did}</span>
                        <CopyButton text={entry.did} />
                      </div>
                    </td>
                    <td className="py-0 px-4 text-[13px] text-text-secondary">
                      {entry.reason ?? <span className="text-text-disabled">—</span>}
                    </td>
                    <td className="py-0 px-4">
                      {entry.isSystem ? (
                        <span className="text-[13px] italic text-text-secondary">Solidus Engine</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-error/20 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-semibold text-error">{initials(entry.addedBy)}</span>
                          </div>
                          <span className="text-[14px] text-white">{entry.addedBy}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-0 px-4 font-mono text-[12px] text-text-secondary">{entry.date}</td>
                    <td className="py-0 px-5 text-right">
                      <DeleteCell onConfirm={() => removeEntry(entry.id)} accentClass="text-error" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="h-[52px] px-5 flex items-center border-t border-elevated">
          <span className="text-[12px] text-text-secondary">Showing 1–{entries.length} of 38</span>
        </div>
      </div>
    </div>
  )
}

// ─── Custom Lists Tab ─────────────────────────────────────────────────────────

function CustomListsTab() {
  const [lists, setLists] = useState<CustomList[]>(INITIAL_CUSTOM)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreate = (name: string, description: string, type: ListTypeOption) => {
    const newList: CustomList = {
      id: Date.now().toString(),
      name,
      entries: 0,
      description: description || 'No description provided.',
      type,
      workflows: 0,
      updated: 'just now',
    }
    setLists(prev => [...prev, newList])
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-text-secondary">
          Custom lists can be referenced as conditions in the Workflow Builder.
        </p>
        <button
          onClick={() => setShowCreateModal(true)}
          className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[13px] font-medium rounded-md transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Create Custom List
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {lists.map(list => (
          <div
            key={list.id}
            className="bg-surface rounded-lg border border-border p-5 hover:border-cta/40 hover:bg-cta/[0.04] transition-colors flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[15px] font-semibold text-white leading-tight">{list.name}</span>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-elevated text-[11px] font-medium text-text-secondary">
                  {list.entries} entries
                </span>
              </div>
              <button className="shrink-0 p-1 text-text-secondary hover:text-white hover:bg-elevated rounded-md transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[12px] text-text-secondary leading-relaxed">{list.description}</p>

            <div className="flex items-center gap-2">
              <ListTypeBadge type={list.type} />
              <span className="flex items-center gap-1 text-[11px] text-text-secondary">
                <GitBranch className="w-3 h-3" />
                Used in {list.workflows} workflow{list.workflows !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-[11px] text-text-disabled">Updated {list.updated}</span>
              <button className="text-[12px] font-medium text-cta hover:underline transition-colors">
                View Entries →
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <CreateListModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = ['Allow List', 'Deny List', 'Custom Lists'] as const
type Tab = typeof TABS[number]

export default function ListsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Allow List')

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white leading-none">Lists</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-[26px] font-bold text-white leading-none">142</div>
            <div className="text-[13px] font-medium text-white mt-0.5">Allow List</div>
            <div className="text-[12px] text-text-secondary mt-0.5">Bypass verification</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5 text-error" />
          </div>
          <div>
            <div className="text-[26px] font-bold text-white leading-none">38</div>
            <div className="text-[13px] font-medium text-white mt-0.5">Deny List</div>
            <div className="text-[12px] text-text-secondary mt-0.5">Permanently blocked</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center shrink-0">
            <GitBranch className="w-5 h-5 text-cta" />
          </div>
          <div>
            <div className="text-[26px] font-bold text-white leading-none">4</div>
            <div className="text-[13px] font-medium text-white mt-0.5">Custom Lists</div>
            <div className="text-[12px] text-text-secondary mt-0.5">Workflow conditions</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface rounded-lg p-1 flex gap-1 self-start">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-8 px-4 rounded-md text-[13px] font-medium transition-colors ${
              activeTab === tab
                ? 'bg-elevated text-white'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Allow List'   && <AllowListTab />}
      {activeTab === 'Deny List'    && <DenyListTab />}
      {activeTab === 'Custom Lists' && <CustomListsTab />}
    </div>
  )
}
