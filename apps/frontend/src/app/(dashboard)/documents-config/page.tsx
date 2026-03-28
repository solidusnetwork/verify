'use client'

import React, { useState } from 'react'
import {
  FileCheck, Zap, Shield, Download, Search, Plus,
  CheckCircle, XCircle, Circle, ChevronDown, X, Check,
} from 'lucide-react'

const MOCK_DATA = [
  { id: 'us', country: 'United States', code: 'US', flag: '🇺🇸', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' }, status: 'Accepted', variants: [
    { name: 'US Passport Book', status: 'accepted' },
    { name: 'US Passport Card', status: 'accepted' },
    { name: "US Driver's License (all 50 states)", status: 'accepted' },
    { name: 'US Green Card', status: 'accepted' },
    { name: 'US Military ID', status: 'partial' },
  ]},
  { id: 'de', country: 'Germany', code: 'DE', flag: '🇩🇪', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'accepted', bank: 'na' }, status: 'Accepted', variants: [] },
  { id: 'gb', country: 'United Kingdom', code: 'GB', flag: '🇬🇧', types: { passport: 'accepted', nationalId: 'na', driverLicense: 'accepted', residence: 'accepted', bank: 'na' }, status: 'Accepted', variants: [] },
  { id: 'sg', country: 'Singapore', code: 'SG', flag: '🇸🇬', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'na', residence: 'na', bank: 'na' }, status: 'Accepted', variants: [] },
  { id: 'fr', country: 'France', code: 'FR', flag: '🇫🇷', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' }, status: 'Accepted', variants: [] },
  { id: 'jp', country: 'Japan', code: 'JP', flag: '🇯🇵', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' }, status: 'Accepted', variants: [] },
  { id: 'br', country: 'Brazil', code: 'BR', flag: '🇧🇷', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' }, status: 'Partial', variants: [] },
  { id: 'cn', country: 'China', code: 'CN', flag: '🇨🇳', types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'na', residence: 'na', bank: 'na' }, status: 'Partial', variants: [] },
  { id: 'kp', country: 'North Korea', code: 'KP', flag: '🇰🇵', types: { passport: 'blocked', nationalId: 'blocked', driverLicense: 'blocked', residence: 'blocked', bank: 'blocked' }, status: 'Blocked', variants: [] },
  { id: 'ir', country: 'Iran', code: 'IR', flag: '🇮🇷', types: { passport: 'blocked', nationalId: 'blocked', driverLicense: 'blocked', residence: 'blocked', bank: 'blocked' }, status: 'Blocked', variants: [] },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'accepted') return <CheckCircle className="w-4 h-4 text-success" />
  if (status === 'blocked') return <XCircle className="w-4 h-4 text-error" />
  if (status === 'partial') return <Circle className="w-4 h-4 text-warning fill-warning/50" />
  return <span className="text-[14px] text-text-disabled">—</span>
}

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Accepted') return <div className="px-2 py-0.5 rounded bg-success/12 border border-success/25 text-[12px] font-medium text-success w-fit">Accepted</div>
  if (status === 'Blocked') return <div className="px-2 py-0.5 rounded bg-error/12 border border-error/25 text-[12px] font-medium text-error w-fit">Blocked</div>
  if (status === 'Partial') return <div className="px-2 py-0.5 rounded bg-warning/12 border border-warning/25 text-[12px] font-medium text-warning w-fit">Partial</div>
  return null
}

export default function DocumentsConfigPage() {
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isPolicyAccept, setIsPolicyAccept] = useState(true)

  const toggleRow = (id: string) => {
    if (expandedRows.includes(id)) setExpandedRows(expandedRows.filter(r => r !== id))
    else setExpandedRows([...expandedRows, id])
  }

  const selectAll = () => {
    if (selectedRows.length === MOCK_DATA.length) setSelectedRows([])
    else setSelectedRows(MOCK_DATA.map(d => d.id))
  }

  const filteredData = MOCK_DATA.filter(d =>
    d.country.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 pb-12 max-w-[1200px] mx-auto w-full flex flex-col gap-6">

      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white">Accepted Documents</h2>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 rounded-md border border-border text-[14px] font-medium text-white hover:bg-elevated transition-colors flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-text-secondary" />
            Export Config
          </button>
          <button
            disabled={!unsavedChanges}
            className={`h-9 px-4 rounded-md text-[14px] font-semibold transition-colors ${
              unsavedChanges
                ? 'bg-cta hover:bg-cta/90 text-white shadow-[0_2px_8px_rgba(0,102,255,0.24)]'
                : 'bg-elevated text-text-secondary cursor-not-allowed border border-border'
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Intro Card */}
      <div className="bg-surface rounded-lg p-5 px-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-1">
          <FileCheck className="w-6 h-6 text-cta" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[16px] font-semibold text-white">Document Acceptance Policy</h3>
          <p className="text-[14px] font-normal text-text-secondary leading-relaxed">
            Configure which document types and countries are accepted for KYC verification sessions. Changes take effect immediately — no redeployment required.
          </p>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-lime" />
              <span className="text-[12px] font-normal text-text-secondary">Changes apply immediately</span>
            </div>
            <span className="text-[12px] text-text-disabled font-bold">·</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-lime" />
              <span className="text-[12px] font-normal text-text-secondary">847 document types currently active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="flex gap-4">
        <div className="flex-1 bg-surface rounded-lg px-5 py-3 flex items-center justify-between h-[64px]">
          <span className="text-[13px] font-medium text-text-secondary">Total Accepted Document Types</span>
          <div className="flex items-center gap-3">
            <span className="text-[36px] font-bold text-white leading-none">847</span>
            <span className="text-[12px] font-medium text-success mt-1">+12 this month</span>
          </div>
        </div>
        <div className="flex-1 bg-surface rounded-lg px-5 py-3 flex items-center justify-between h-[64px]">
          <span className="text-[13px] font-medium text-text-secondary">Countries Covered</span>
          <div className="flex items-center gap-3">
            <span className="text-[36px] font-bold text-white leading-none">183</span>
            <span className="text-[12px] font-medium text-success mt-1">+2 this month</span>
          </div>
        </div>
        <div className="flex-1 bg-surface rounded-lg px-5 py-3 flex items-center justify-between h-[64px]">
          <span className="text-[13px] font-medium text-text-secondary">Blocked Document Types</span>
          <div className="flex items-center gap-3">
            <span className="text-[36px] font-bold text-error leading-none">24</span>
            <span className="text-[12px] font-medium text-warning mt-1">+1 this week</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface rounded-lg p-3.5 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-disabled" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country or document type…"
              className="w-full h-9 pl-8 pr-3 bg-elevated border border-border outline-none rounded-md text-[13px] font-normal text-white placeholder:text-text-disabled focus:border-cta transition-colors"
            />
          </div>

          <button className="h-9 px-3 rounded-md bg-elevated border border-border text-[13px] font-normal text-white hover:bg-border transition-colors flex items-center gap-1.5">
            All Regions <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </button>
          <button className="h-9 px-3 rounded-md bg-elevated border border-border text-[13px] font-normal text-white hover:bg-border transition-colors flex items-center gap-1.5">
            All Statuses <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold rounded-md transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Override
        </button>
      </div>

      {/* Bulk Action Bar */}
      {selectedRows.length > 0 && (
        <div className="h-[44px] bg-cta/10 border border-cta/20 rounded-lg mb-[-16px] z-10 flex items-center px-5 justify-between animate-in slide-in-from-top-2 fade-in duration-200">
          <span className="text-[13px] font-medium text-white">{selectedRows.length} countries selected</span>
          <div className="flex items-center gap-3">
            <button className="text-[13px] font-medium text-success hover:underline" onClick={() => setUnsavedChanges(true)}>Accept All Document Types</button>
            <div className="w-px h-3 bg-cta/30" />
            <button className="text-[13px] font-medium text-error hover:underline" onClick={() => setUnsavedChanges(true)}>Block Country</button>
            <div className="w-px h-3 bg-cta/30" />
            <button className="text-[13px] font-normal text-cta hover:underline" onClick={() => setSelectedRows([])}>Deselect</button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="w-full bg-surface rounded-lg overflow-hidden flex flex-col relative mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-elevated h-[44px] border-b border-border">
                <th className="w-12 pl-5 pr-2">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={selectAll}
                      checked={selectedRows.length === MOCK_DATA.length && MOCK_DATA.length > 0}
                      className="w-4 h-4 rounded-[3px] border border-border bg-transparent checked:bg-cta checked:border-cta appearance-none cursor-pointer relative checked:after:content-['✓'] checked:after:text-white checked:after:text-[10px] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                    />
                  </div>
                </th>
                <th className="py-0 px-2 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[220px]">Country</th>
                <th className="py-0 px-2 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[100px] text-center">Passport</th>
                <th className="py-0 px-2 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[110px] text-center">National ID</th>
                <th className="py-0 px-2 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[130px] text-center">Driver&apos;s License</th>
                <th className="py-0 px-2 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[140px] text-center">Residence Permit</th>
                <th className="py-0 px-2 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[130px] text-center">Bank Statement</th>
                <th className="py-0 pl-2 pr-5 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase w-[120px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => {
                const isExpanded = expandedRows.includes(row.id)
                const isSelected = selectedRows.includes(row.id)

                return (
                  <React.Fragment key={row.id}>
                    <tr
                      onClick={() => toggleRow(row.id)}
                      className={`h-[52px] border-b border-elevated hover:bg-elevated transition-colors duration-150 cursor-pointer ${isSelected ? 'bg-cta/5' : ''}`}
                    >
                      <td className="w-12 pl-5 pr-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedRows([...selectedRows, row.id])
                              else setSelectedRows(selectedRows.filter(r => r !== row.id))
                            }}
                            className="w-4 h-4 rounded-[3px] border border-border bg-transparent checked:bg-cta checked:border-cta appearance-none cursor-pointer relative checked:after:content-['✓'] checked:after:text-white checked:after:text-[10px] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                          />
                        </div>
                      </td>
                      <td className="py-0 px-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[20px]">{row.flag}</span>
                          <div className="flex flex-col gap-[1px]">
                            <span className="text-[14px] font-medium text-white leading-none">{row.country}</span>
                            <span className="text-[12px] font-normal text-text-secondary leading-none">{row.code}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-0 px-2 text-center"><StatusIcon status={row.types.passport} /></td>
                      <td className="py-0 px-2 text-center"><StatusIcon status={row.types.nationalId} /></td>
                      <td className="py-0 px-2 text-center"><StatusIcon status={row.types.driverLicense} /></td>
                      <td className="py-0 px-2 text-center"><StatusIcon status={row.types.residence} /></td>
                      <td className="py-0 px-2 text-center"><StatusIcon status={row.types.bank} /></td>
                      <td className="py-0 pl-2 pr-5">
                        <div className="flex items-center justify-between">
                          <StatusBadge status={row.status} />
                          {row.variants.length > 0 && (
                            <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Sub-table Accordion */}
                    {isExpanded && row.variants.length > 0 && (
                      <tr>
                        <td colSpan={8} className="p-0 border-b border-elevated">
                          <div className="bg-bg/40 border-t border-border w-full overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 pl-[80px] pr-5 py-2">
                            {row.variants.map((v, idx) => (
                              <div key={idx} className="flex items-center justify-between h-[36px] border-b border-border/50 last:border-0 max-w-[400px]">
                                <span className="text-[12px] font-normal text-text-secondary">{v.name}</span>
                                <StatusIcon status={v.status} />
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Override Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-[520px] bg-surface rounded-[12px] shadow-2xl flex flex-col border border-border animate-in zoom-in-95 fade-in duration-200">

            <div className="px-6 py-4 border-b border-elevated flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-white">Add Country Override</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:text-white hover:bg-elevated transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-disabled" />
                <input
                  type="text"
                  placeholder="Search country…"
                  className="w-full h-11 pl-9 pr-3 bg-elevated border border-border outline-none rounded-md text-[14px] font-normal text-white placeholder:text-text-disabled focus:border-cta transition-colors"
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Document Types</span>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {(['Passport', 'National ID', "Driver's License", 'Residence Permit', 'Bank Statement', 'Military ID'] as const).map((type, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                        i < 3 ? 'bg-cta border-cta' : 'bg-elevated border-border group-hover:border-text-secondary'
                      }`}>
                        {i < 3 && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-[14px] font-normal text-white">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-elevated rounded-lg border border-border">
                <span className="text-[14px] font-medium text-white">Accept selected types</span>
                <div
                  className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${isPolicyAccept ? 'bg-cta' : 'bg-border'}`}
                  onClick={() => { setIsPolicyAccept(!isPolicyAccept); setUnsavedChanges(true) }}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${isPolicyAccept ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-elevated flex items-center justify-end gap-3 bg-surface rounded-b-[12px]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-md text-[14px] font-medium text-white hover:bg-elevated transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setIsModalOpen(false); setUnsavedChanges(true) }}
                className="h-9 px-4 rounded-md bg-cta hover:bg-cta/90 text-[14px] font-semibold text-white transition-colors shadow-[0_2px_8px_rgba(0,102,255,0.24)]"
              >
                Save Override
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
