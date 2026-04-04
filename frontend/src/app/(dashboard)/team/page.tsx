'use client'

import React, { useState, useEffect } from 'react'
import { UserPlus, ShieldCheck, Shield, CheckCircle, MoreHorizontal, ChevronDown, X } from 'lucide-react'

const ROLES = [
  { id: 'admin', name: 'Admin', desc: 'Full access including billing and team management', count: 2, color: 'text-cta' },
  { id: 'analyst', name: 'Analyst', desc: 'View and review verification cases', count: 4, color: 'text-warning' },
  { id: 'developer', name: 'Developer', desc: 'API access and webhook configuration', count: 3, color: 'text-success' },
  { id: 'viewer', name: 'Viewer', desc: 'Read-only access to dashboard and reports', count: 1, color: 'text-text-secondary' },
]

const MEMBERS = [
  { id: '1', name: 'Alex Chen', email: 'alex@acmecorp.com', role: 'Admin', initials: 'AC', has2FA: true, lastActive: 'Active now', joinedAt: '2025-11-01' },
  { id: '2', name: 'Sarah Kim', email: 'sarah@acmecorp.com', role: 'Analyst', initials: 'SK', has2FA: true, lastActive: '2 hours ago', joinedAt: '2025-12-15' },
  { id: '3', name: 'Mike Torres', email: 'mike@acmecorp.com', role: 'Analyst', initials: 'MT', has2FA: false, lastActive: '1 day ago', joinedAt: '2026-01-08' },
  { id: '4', name: 'Jenny Park', email: 'jenny@acmecorp.com', role: 'Developer', initials: 'JP', has2FA: true, lastActive: '3 hours ago', joinedAt: '2026-01-20' },
  { id: '5', name: 'Chris Lee', email: 'chris@acmecorp.com', role: 'Developer', initials: 'CL', has2FA: false, lastActive: '2 days ago', joinedAt: '2026-02-01' },
  { id: '6', name: 'Dana White', email: 'dana@acmecorp.com', role: 'Viewer', initials: 'DW', has2FA: true, lastActive: '1 week ago', joinedAt: '2026-02-14' },
  { id: '7', name: 'Ryan Scott', email: 'ryan@acmecorp.com', role: 'Analyst', initials: 'RS', has2FA: false, lastActive: '4 hours ago', joinedAt: '2026-03-01' },
]

const PERMISSIONS = {
  headers: ['Feature', 'Admin', 'Analyst', 'Developer', 'Viewer'],
  rows: [
    { feature: 'View verifications', admin: true, analyst: true, developer: true, viewer: true },
    { feature: 'Review cases', admin: true, analyst: true, developer: false, viewer: false },
    { feature: 'Issue credentials', admin: true, analyst: false, developer: false, viewer: false },
    { feature: 'Revoke credentials', admin: true, analyst: false, developer: false, viewer: false },
    { feature: 'Manage API keys', admin: true, analyst: false, developer: true, viewer: false },
    { feature: 'Configure webhooks', admin: true, analyst: false, developer: true, viewer: false },
    { feature: 'View audit log', admin: true, analyst: true, developer: true, viewer: true },
    { feature: 'Manage team', admin: true, analyst: false, developer: false, viewer: false },
    { feature: 'Manage billing', admin: true, analyst: false, developer: false, viewer: false },
    { feature: 'Export data', admin: true, analyst: true, developer: false, viewer: false },
  ],
}

const CURRENT_USER_EMAIL = 'alex@acmecorp.com'

function getAvatarClasses(role: string): { bg: string; text: string } {
  switch (role) {
    case 'Admin':
      return { bg: 'bg-cta/20', text: 'text-cta' }
    case 'Analyst':
      return { bg: 'bg-warning/20', text: 'text-warning' }
    case 'Developer':
      return { bg: 'bg-success/20', text: 'text-success' }
    default:
      return { bg: 'bg-elevated', text: 'text-text-secondary' }
  }
}

function getRoleBadgeClasses(role: string): string {
  switch (role) {
    case 'Admin':
      return 'bg-cta/10 border border-cta/20 text-cta'
    case 'Analyst':
      return 'bg-warning/10 border border-warning/20 text-warning'
    case 'Developer':
      return 'bg-success/10 border border-success/20 text-success'
    default:
      return 'bg-elevated text-text-secondary'
  }
}

function getRoleCardBorderColor(roleId: string): string {
  switch (roleId) {
    case 'admin':
      return 'border-l-cta'
    case 'analyst':
      return 'border-l-warning'
    case 'developer':
      return 'border-l-success'
    default:
      return 'border-l-text-secondary'
  }
}

function getRoleHeaderColor(role: string): string {
  switch (role) {
    case 'Admin':
      return 'text-cta'
    case 'Analyst':
      return 'text-warning'
    case 'Developer':
      return 'text-success'
    default:
      return 'text-text-secondary'
  }
}

interface Toast {
  title: string
  desc: string
}

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false)
  const [showPermissions, setShowPermissions] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('analyst')
  const [inviteMessage, setInviteMessage] = useState('')
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return
    const email = inviteEmail
    setShowInvite(false)
    setInviteEmail('')
    setInviteRole('analyst')
    setInviteMessage('')
    setToast({ title: 'Invitation sent', desc: `Invitation sent to ${email}` })
  }

  const closeInviteModal = () => {
    setShowInvite(false)
    setInviteEmail('')
    setInviteRole('analyst')
    setInviteMessage('')
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white leading-none">Team</h2>
        <button
          onClick={() => setShowInvite(true)}
          className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {ROLES.map(role => (
          <div
            key={role.id}
            className={`bg-surface rounded-lg p-5 border-l-4 ${getRoleCardBorderColor(role.id)}`}
          >
            <p className="text-white font-semibold text-[15px] mb-1">{role.name}</p>
            <p className={`text-[32px] font-bold leading-none mb-2 ${role.color}`}>{role.count}</p>
            <p className="text-text-secondary text-[13px] leading-snug">{role.desc}</p>
          </div>
        ))}
      </div>

      {/* Members Table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-[16px] font-semibold text-white">Members</h3>
          <p className="text-[13px] text-text-secondary mt-0.5">{MEMBERS.length} members in your organization</p>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em]">Member</th>
              <th className="text-left px-4 py-3 text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em]">Role</th>
              <th className="text-left px-4 py-3 text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em]">2FA</th>
              <th className="text-left px-4 py-3 text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em]">Last Active</th>
              <th className="text-left px-4 py-3 text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em]">Joined</th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MEMBERS.map(member => {
              const avatar = getAvatarClasses(member.role)
              const isCurrentUser = member.email === CURRENT_USER_EMAIL
              return (
                <tr key={member.id} className="hover:bg-elevated/30 transition-colors">
                  {/* Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${avatar.bg}`}>
                        <span className={`font-medium text-[13px] ${avatar.text}`}>{member.initials}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-[14px] font-medium">{member.name}</span>
                          {isCurrentUser && (
                            <span className="text-[11px] text-text-disabled">(You)</span>
                          )}
                        </div>
                        <span className="text-text-secondary text-[12px]">{member.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-[12px] font-medium ${getRoleBadgeClasses(member.role)}`}>
                      {member.role}
                    </span>
                  </td>

                  {/* 2FA */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      {member.has2FA ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-success" />
                          <span className="text-[13px] text-success">Enabled</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 text-text-disabled" />
                          <span className="text-[13px] text-text-disabled">Disabled</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Last Active */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      {member.lastActive === 'Active now' && (
                        <span className="w-2 h-2 rounded-full bg-success shrink-0" />
                      )}
                      <span className="text-[13px] text-text-secondary">{member.lastActive}</span>
                    </div>
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-mono text-text-disabled">{member.joinedAt}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    {!isCurrentUser && (
                      <button className="p-1.5 text-text-disabled hover:text-white hover:bg-elevated rounded-md transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <button
          onClick={() => setShowPermissions(v => !v)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-elevated/30 transition-colors"
        >
          <h3 className="text-[16px] font-semibold text-white">Permissions Matrix</h3>
          <ChevronDown
            className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${showPermissions ? 'rotate-180' : ''}`}
          />
        </button>

        {showPermissions && (
          <div className="border-t border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-[12px] font-medium text-text-secondary w-1/2">Feature</th>
                  {(['Admin', 'Analyst', 'Developer', 'Viewer'] as const).map(role => (
                    <th key={role} className={`text-center px-4 py-3 text-[12px] font-semibold ${getRoleHeaderColor(role)}`}>
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.rows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border/50 ${i % 2 === 1 ? 'bg-elevated/30' : ''}`}>
                    <td className="px-6 py-3 text-[13px] text-white">{row.feature}</td>
                    {(['admin', 'analyst', 'developer', 'viewer'] as const).map(roleKey => (
                      <td key={roleKey} className="px-4 py-3 text-center">
                        {row[roleKey] ? (
                          <CheckCircle className="w-4 h-4 text-success mx-auto" />
                        ) : (
                          <span className="text-[16px] text-text-disabled leading-none">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Member Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-xl border border-border w-full max-w-[480px] p-6 flex flex-col gap-5 shadow-elevated mx-4">

            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-white">Invite Team Member</h3>
              <button onClick={closeInviteModal} className="text-text-secondary hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email */}
            <div>
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">
                Email Address <span className="text-error normal-case tracking-normal">*</span>
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-2">
                Role
              </label>
              <div className="flex flex-col gap-2">
                {ROLES.map(role => {
                  const isSelected = inviteRole === role.id
                  const selectedBorderClass = {
                    admin: 'border-cta bg-cta/[0.06]',
                    analyst: 'border-warning bg-warning/[0.06]',
                    developer: 'border-success bg-success/[0.06]',
                    viewer: 'border-text-secondary bg-elevated',
                  }[role.id] ?? 'border-border bg-elevated'

                  return (
                    <label
                      key={role.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? selectedBorderClass : 'border-border bg-elevated hover:border-border/70'}`}
                    >
                      <input
                        type="radio"
                        name="invite-role"
                        value={role.id}
                        checked={isSelected}
                        onChange={() => setInviteRole(role.id)}
                        className="sr-only"
                      />
                      <span className={`text-[14px] font-semibold block mb-0.5 ${role.color}`}>{role.name}</span>
                      <span className="text-[13px] text-text-secondary">{role.desc}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Personal Message */}
            <div>
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">
                Personal Message <span className="text-text-disabled normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                value={inviteMessage}
                onChange={e => setInviteMessage(e.target.value)}
                placeholder="Add a personal message..."
                rows={3}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={closeInviteModal}
                className="h-9 px-4 rounded-md border border-border text-[14px] text-white hover:bg-elevated transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                disabled={!inviteEmail.trim()}
                className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-elevated border-l-4 border-success rounded-r-md shadow-lg p-3 px-4 flex items-start gap-3 min-w-[260px]">
          <div>
            <p className="text-[14px] font-semibold text-white">{toast.title}</p>
            <p className="text-[13px] text-text-secondary mt-0.5">{toast.desc}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-text-disabled hover:text-white transition-colors ml-auto shrink-0 mt-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
