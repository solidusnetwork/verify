'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, CheckCircle, ChevronDown, Circle, CreditCard,
  Database, Globe, Loader2, Mail, MessageSquare, MoreHorizontal,
  Play, Search, Shield, Trash2, UserCheck, X
} from 'lucide-react'

const STEP_LIBRARY = [
  {
    category: 'Triggers',
    items: [
      { icon: <Globe className="w-4 h-4 text-text-secondary" />, label: 'Session Created' },
      { icon: <Globe className="w-4 h-4 text-text-secondary" />, label: 'Webhook Received' },
    ],
  },
  {
    category: 'Checks',
    items: [
      { icon: <UserCheck className="w-4 h-4 text-cta" />, label: 'KYC Level 1' },
      { icon: <Shield className="w-4 h-4 text-cta" />, label: 'KYC Level 2' },
      { icon: <Search className="w-4 h-4 text-cta" />, label: 'KYC Level 3' },
      { icon: <Database className="w-4 h-4 text-cta" />, label: 'Watchlist Screening' },
    ],
  },
  {
    category: 'Logic',
    items: [
      { icon: <Circle className="w-4 h-4 text-warning" />, label: 'Condition' },
      { icon: <Circle className="w-4 h-4 text-warning" />, label: 'A/B Test' },
    ],
  },
  {
    category: 'Actions',
    items: [
      { icon: <CreditCard className="w-4 h-4 text-success" />, label: 'Issue Credential' },
      { icon: <Mail className="w-4 h-4 text-success" />, label: 'Send Email' },
      { icon: <MessageSquare className="w-4 h-4 text-success" />, label: 'Send SMS' },
    ],
  },
]

type TestState = 'idle' | 'running' | 'completed'

export default function WorkflowBuilderPage() {
  const [workflowName, setWorkflowName] = useState('Standard KYC L2')
  const [hasUnsaved, setHasUnsaved] = useState(false)
  const [testModalOpen, setTestModalOpen] = useState(false)
  const [testState, setTestState] = useState<TestState>('idle')

  const handleRunTest = () => {
    setTestState('running')
    setTimeout(() => setTestState('completed'), 2000)
  }

  const closeTestModal = () => {
    setTestModalOpen(false)
    setTimeout(() => setTestState('idle'), 300)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 shrink-0 bg-surface border-b border-border px-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1.5 px-3 py-2 text-cta hover:bg-cta/5 rounded-md transition-colors text-[12px]">
            <ArrowLeft className="w-4 h-4" /> Workflows
          </Link>
          <div className="w-px h-6 bg-border mx-1" />
          <input
            value={workflowName}
            onChange={e => { setWorkflowName(e.target.value); setHasUnsaved(true) }}
            className="bg-transparent text-[16px] font-semibold text-white px-2 py-1 outline-none rounded-md border border-transparent hover:border-border focus:border-cta border-dashed focus:border-solid transition-colors"
            style={{ width: `${Math.max(120, workflowName.length * 9 + 20)}px` }}
          />
          <span className="ml-2 rounded-full px-2.5 py-0.5 bg-warning/10 border border-warning/25 text-warning text-[11px] font-medium">Draft</span>
          {hasUnsaved && <div className="w-1.5 h-1.5 rounded-full bg-warning ml-2" title="Unsaved changes" />}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTestModalOpen(true)} className="h-9 px-4 flex items-center gap-2 border border-border rounded-md hover:bg-elevated transition-colors text-[14px] font-medium text-white">
            <Play className="w-3.5 h-3.5 text-text-secondary" /> Test Flow
          </button>
          <button className="h-9 px-5 bg-cta hover:bg-cta/90 text-white rounded-md text-[14px] font-semibold transition-colors">Publish</button>
          <button className="w-9 h-9 flex items-center justify-center bg-elevated border border-border rounded-md hover:bg-border transition-colors">
            <MoreHorizontal className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* 3-panel layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: Step Library */}
        <div className="w-[260px] shrink-0 bg-surface border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search steps..." className="h-8 w-full bg-elevated border border-border rounded-md pl-9 pr-3 text-[13px] text-white outline-none placeholder:text-text-secondary focus:border-cta/50" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            {STEP_LIBRARY.map(cat => (
              <div key={cat.category} className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">{cat.category}</span>
                <div className="flex flex-col gap-1.5">
                  {cat.items.map(item => (
                    <div key={item.label} className="flex items-center gap-2.5 p-2 rounded-md hover:bg-elevated cursor-grab border border-transparent hover:border-border transition-colors">
                      <div className="w-6 h-6 rounded bg-elevated flex items-center justify-center shrink-0 border border-border">
                        {item.icon}
                      </div>
                      <span className="text-[13px] text-white">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Canvas */}
        <div
          className="flex-1 relative bg-bg overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(#2A2A42 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        >
          <div className="absolute inset-0 overflow-auto">
            <div className="w-[1200px] h-[900px] relative" style={{ margin: '40px auto', transform: 'translateX(100px)' }}>

              {/* SVG Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#48484F" />
                  </marker>
                  <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#0066FF" />
                  </marker>
                </defs>
                <path d="M 400 46 L 400 90" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 400 148 L 400 196" stroke="#0066FF" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />
                <path d="M 400 250 L 400 260 L 660 260 L 660 270" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" strokeLinejoin="round" />
                <path d="M 400 250 L 400 290" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 400 250 L 400 260 L 140 260 L 140 270" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" strokeLinejoin="round" />
                <path d="M 140 328 L 140 376" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 660 328 L 660 376" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 660 434 L 660 482" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 400 348 L 400 396" stroke="#48484F" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              </svg>

              {/* Edge labels */}
              <div className="absolute text-[11px] font-medium text-text-secondary bg-bg px-1 z-10" style={{ left: 516, top: 251 }}>Pass</div>
              <div className="absolute text-[11px] font-medium text-text-secondary bg-bg px-1 z-10" style={{ left: 408, top: 262 }}>Review</div>
              <div className="absolute text-[11px] font-medium text-text-secondary bg-bg px-1 z-10" style={{ left: 260, top: 251 }}>Fail</div>

              {/* Nodes */}
              {/* Start */}
              <div className="absolute z-10 flex justify-center" style={{ left: 280, top: 10, width: 240 }}>
                <div className="bg-surface border border-border rounded-full px-5 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-[13px] font-medium text-white">Session Created</span>
                </div>
              </div>

              {/* KYC L2 — selected */}
              <div className="absolute z-10" style={{ left: 280, top: 90, width: 240 }}>
                <div className="bg-surface border-2 border-cta rounded-lg p-3 shadow-[0_0_0_2px_rgba(0,102,255,0.2)] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-cta/10 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-cta" />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-white">KYC Level 2</div>
                      <div className="text-[12px] text-text-secondary">passport + liveness</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div className="absolute z-10" style={{ left: 280, top: 196, width: 240 }}>
                <div className="bg-surface border border-warning rounded-lg p-3 flex flex-col items-center cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Circle className="w-3.5 h-3.5 text-warning" />
                    <span className="text-[13px] font-medium text-white">Check Result</span>
                  </div>
                  <div className="text-[11px] text-text-secondary">Branching logic</div>
                </div>
              </div>

              {/* Left: Notify Failed */}
              <div className="absolute z-10" style={{ left: 20, top: 270, width: 240 }}>
                <div className="bg-surface border border-border rounded-lg p-3 cursor-pointer hover:border-text-disabled transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-elevated flex items-center justify-center shrink-0 border border-border">
                      <Globe className="w-4 h-4 text-text-secondary" />
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-white">Notify: kyc.failed</div>
                      <div className="text-[12px] text-text-secondary">WebhookAction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left: End */}
              <div className="absolute z-10 flex justify-center" style={{ left: 20, top: 376, width: 240 }}>
                <div className="bg-surface border border-border rounded-full px-5 py-2 text-text-secondary">
                  <span className="text-[13px] font-medium">End</span>
                </div>
              </div>

              {/* Center: Escalate L3 */}
              <div className="absolute z-10" style={{ left: 280, top: 290, width: 240 }}>
                <div className="bg-surface border border-border rounded-lg p-3 cursor-pointer hover:border-text-disabled transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-cta/10 flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4 text-cta" />
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-white">Escalate to KYC L3</div>
                      <div className="text-[12px] text-text-secondary">extended document review</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: L3 Result */}
              <div className="absolute z-10" style={{ left: 280, top: 396, width: 240 }}>
                <div className="bg-surface border border-warning rounded-lg p-3 flex flex-col items-center cursor-pointer opacity-60">
                  <div className="flex items-center gap-2 mb-1">
                    <Circle className="w-3.5 h-3.5 text-warning" />
                    <span className="text-[13px] font-medium text-white">L3 Result</span>
                  </div>
                  <div className="text-[11px] text-text-secondary">(Simplified)</div>
                </div>
              </div>

              {/* Right: Issue Credential */}
              <div className="absolute z-10" style={{ left: 540, top: 270, width: 240 }}>
                <div className="bg-surface border border-border rounded-lg p-3 cursor-pointer hover:border-text-disabled transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-success/10 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-white">Issue L2 Credential</div>
                      <div className="text-[12px] text-text-secondary">IssueCredential</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Notify Completed */}
              <div className="absolute z-10" style={{ left: 540, top: 376, width: 240 }}>
                <div className="bg-surface border border-border rounded-lg p-3 cursor-pointer hover:border-text-disabled transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-elevated flex items-center justify-center shrink-0 border border-border">
                      <Globe className="w-4 h-4 text-text-secondary" />
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-white">Notify: kyc.completed</div>
                      <div className="text-[12px] text-text-secondary">WebhookAction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: End */}
              <div className="absolute z-10 flex justify-center" style={{ left: 540, top: 482, width: 240 }}>
                <div className="bg-surface border border-border rounded-full px-5 py-2 text-text-secondary">
                  <span className="text-[13px] font-medium">End</span>
                </div>
              </div>

            </div>
          </div>

          {/* Status indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-surface/80 backdrop-blur border border-border rounded-full px-3 py-1.5 z-20">
            <div className="w-2 h-2 rounded-full bg-text-secondary" />
            <span className="text-[11px] text-text-secondary">Editing draft</span>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex items-center bg-surface border border-border rounded-lg z-20">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-elevated text-text-secondary hover:text-white transition-colors rounded-l-lg border-r border-border text-[16px]">−</button>
            <span className="text-[12px] font-medium w-12 text-center text-white">100%</span>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-elevated text-text-secondary hover:text-white transition-colors rounded-r-lg border-l border-border text-[16px]">+</button>
          </div>
        </div>

        {/* Right: Step Config */}
        <div className="w-[280px] shrink-0 bg-surface border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-[14px] font-semibold text-white">Step Configuration</h3>
            <p className="text-[12px] text-text-secondary mt-0.5">KYCL2Check</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">

            {/* Document types */}
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Document Types Accepted</label>
              <div className="flex flex-col gap-2">
                {['Passport', "Driver's License", 'National ID'].map(doc => (
                  <label key={doc} className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-cta bg-cta flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[13px] text-white">{doc}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded border border-text-disabled bg-transparent shrink-0" />
                  <span className="text-[13px] text-white">Residence Permit</span>
                </label>
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Liveness toggle */}
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-white">Liveness Required</label>
              <div className="w-9 h-5 bg-success rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Confidence threshold */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-white">Min Confidence Threshold</label>
                <span className="text-[13px] text-cyan">75%</span>
              </div>
              <div className="h-1.5 w-full bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-cta rounded-full w-[75%]" />
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Failure handling */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-white">Failure Handling</label>
              <div className="relative">
                <select className="h-9 w-full bg-elevated border border-border rounded-md px-3 text-[13px] text-white outline-none appearance-none pr-8 cursor-pointer">
                  <option>Route to Review Queue</option>
                  <option>Fail Immediately</option>
                  <option>Retry (Max 3)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-text-secondary">Cost per run</span>
              <span className="text-[13px] font-mono text-success">$5.00</span>
            </div>

          </div>
          <div className="p-4 border-t border-border">
            <button className="w-full h-9 flex items-center justify-center gap-2 text-error border border-error/30 hover:bg-error/10 rounded-md text-[13px] font-medium transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Step
            </button>
          </div>
        </div>

      </div>

      {/* Test Flow Modal */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={closeTestModal} />
          <div className="relative w-[480px] bg-surface rounded-xl border border-border overflow-hidden shadow-elevated">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-white">Test Flow</h3>
              <button onClick={closeTestModal} className="text-text-secondary hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {testState === 'idle' ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider">Test Subject</label>
                    <input
                      defaultValue="did:solidus:mainnet:7a3b8c9d2e1f4a6b"
                      className="h-11 w-full bg-elevated border border-border rounded-md px-3 font-mono text-[14px] text-white outline-none focus:border-cta/50 transition-colors"
                    />
                  </div>
                  <button onClick={handleRunTest} className="w-full h-11 mt-2 bg-cta hover:bg-cta/90 text-white rounded-md text-[15px] font-semibold transition-colors">
                    Run Test
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="text-[14px] text-white">Session Created</span>
                      </div>
                      <span className="font-mono text-[12px] text-text-secondary">12ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {testState === 'running' ? (
                          <Loader2 className="w-5 h-5 text-cta animate-spin" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-success" />
                        )}
                        <span className="text-[14px] text-white">KYC Level 2 Check</span>
                      </div>
                      <span className="font-mono text-[12px] text-text-secondary">{testState === 'running' ? '—' : '842ms'}</span>
                    </div>
                    {testState === 'completed' && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-success" /><span className="text-[14px] text-white">Check Result (Pass)</span></div>
                          <span className="font-mono text-[12px] text-text-secondary">2ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-success" /><span className="text-[14px] text-white">Issue L2 Credential</span></div>
                          <span className="font-mono text-[12px] text-text-secondary">156ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-success" /><span className="text-[14px] text-white">Notify: kyc.completed</span></div>
                          <span className="font-mono text-[12px] text-text-secondary">84ms</span>
                        </div>
                      </>
                    )}
                  </div>
                  {testState === 'completed' && (
                    <div className="p-3 bg-success/10 border border-success/25 rounded-lg">
                      <span className="text-[14px] font-semibold text-success">Flow passed — Credential would be issued.</span>
                    </div>
                  )}
                  {testState === 'completed' && (
                    <button onClick={() => setTestState('idle')} className="w-full h-10 border border-border hover:bg-elevated text-white rounded-md text-[14px] font-medium transition-colors">
                      Run Another Test
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
