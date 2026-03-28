'use client'

import React, { useState } from 'react'
import {
  Search, ChevronDown, X, FileText,
  AlertCircle, Shield, Clock, Mail, CheckCircle, ArrowRight
} from 'lucide-react'

type Country = {
  name: string
  code: string
  flag: string
  types: number
  status: string
  region: string
  blocked?: boolean
}

export default function SupportedDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocType, setSelectedDocType] = useState('All Document Types')
  const [activeRegion, setActiveRegion] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false)

  const stats = [
    { value: '11,000+', label: 'Document types accepted' },
    { value: '183', label: 'Countries covered' },
    { value: '847', label: 'Document template variants' },
    { value: '99.1%', label: 'Average recognition rate' }
  ]

  const regions = ['All', 'Europe', 'Americas', 'APAC', 'Africa', 'Middle East']

  const docTypes = [
    'All Document Types',
    'Passport',
    'National ID',
    "Driver's License",
    'Residence Permit',
    'Bank Statement'
  ]

  const countries: Country[] = [
    { name: 'United States', code: 'US', flag: '🇺🇸', types: 4, status: 'green', region: 'Americas' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', types: 4, status: 'green', region: 'Europe' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', types: 4, status: 'green', region: 'Europe' },
    { name: 'France', code: 'FR', flag: '🇫🇷', types: 3, status: 'green', region: 'Europe' },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷', types: 3, status: 'green', region: 'Americas' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵', types: 3, status: 'green', region: 'APAC' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺', types: 3, status: 'green', region: 'APAC' },
    { name: 'India', code: 'IN', flag: '🇮🇳', types: 2, status: 'green', region: 'APAC' },
    { name: 'China', code: 'CN', flag: '🇨🇳', types: 2, status: 'amber', region: 'APAC' },
    { name: 'Indonesia', code: 'ID', flag: '🇮🇩', types: 2, status: 'green', region: 'APAC' },
    { name: 'Mexico', code: 'MX', flag: '🇲🇽', types: 3, status: 'green', region: 'Americas' },
    { name: 'South Korea', code: 'KR', flag: '🇰🇷', types: 3, status: 'green', region: 'APAC' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦', types: 4, status: 'green', region: 'Americas' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦', types: 2, status: 'green', region: 'Africa' },
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬', types: 2, status: 'amber', region: 'Africa' },
    { name: 'Turkey', code: 'TR', flag: '🇹🇷', types: 3, status: 'green', region: 'Europe' },
    { name: 'UAE', code: 'AE', flag: '🇦🇪', types: 3, status: 'green', region: 'Middle East' },
    { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', types: 2, status: 'green', region: 'Middle East' },
    { name: 'DPRK', code: 'KP', flag: '🇰🇵', types: 0, status: 'red', region: 'APAC', blocked: true },
    { name: 'Iran', code: 'IR', flag: '🇮🇷', types: 0, status: 'red', region: 'Middle East', blocked: true },
  ]

  const filteredCountries = countries.filter(c => {
    const matchesRegion = activeRegion === 'All' || c.region === activeRegion
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  const accuracyData = [
    { type: 'Passport', eu: '99.7%', am: '99.5%', apac: '99.6%', af: '98.8%', me: '99.2%', overall: '99.5%' },
    { type: 'National ID', eu: '99.4%', am: '98.9%', apac: '98.7%', af: '97.2%', me: '98.6%', overall: '98.9%' },
    { type: "Driver's License", eu: '98.1%', am: '98.4%', apac: '97.8%', af: '96.4%', me: '97.6%', overall: '97.9%' },
    { type: 'Residence Permit', eu: '97.8%', am: '97.2%', apac: '97.0%', af: '95.8%', me: '96.4%', overall: '96.9%' },
    { type: 'Bank Statement', eu: '95.2%', am: '94.8%', apac: '94.1%', af: '92.7%', me: '93.9%', overall: '94.5%' },
  ]

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRequestSubmitted(true)
  }

  const getAccuracyColor = (val: string) => {
    const num = parseFloat(val)
    if (num < 97) return 'text-warning'
    return 'text-text-primary'
  }

  const activeCountry = countries.find(c => c.code === selectedCountry) ?? null

  return (
    <div className="font-sans flex flex-col bg-surface">

      {/* Section 1: Header */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[80px] pb-[56px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-text-primary text-[48px] font-bold leading-tight">Supported Documents</h1>
          <p className="text-text-secondary text-[18px] mt-[12px] max-w-[640px]">
            Every document type and country we support — with real-time accuracy data for your compliance team.
          </p>

          <div className="flex flex-wrap gap-[48px] mt-[32px]">
            {stats.map((stat, i) => (
              <div key={i} className="bg-elevated border border-border rounded-[12px] py-[16px] px-[24px]">
                <div className="text-text-primary text-[32px] font-bold leading-none">{stat.value}</div>
                <div className="text-text-secondary text-[13px] mt-[4px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Filter / Search Bar */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[32px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="bg-elevated border border-border rounded-[12px] p-[16px] px-[20px] flex flex-wrap lg:flex-nowrap items-center gap-[12px]">

            {/* Search */}
            <div className="relative flex-grow max-w-[320px]">
              <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-text-disabled" />
              <input
                type="text"
                placeholder="Search country or code…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] bg-surface border border-border rounded-[8px] pl-[36px] pr-[12px] text-[14px] text-text-primary placeholder-[#999999] focus:outline-none focus:border-cta"
              />
            </div>

            {/* Doc Type Dropdown */}
            <div className="relative">
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="appearance-none h-[40px] bg-surface border border-border rounded-[8px] pl-[12px] pr-[36px] text-[14px] text-text-primary focus:outline-none focus:border-cta cursor-pointer min-w-[180px]"
              >
                {docTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-text-disabled pointer-events-none" />
            </div>

            <div className="w-[1px] h-[24px] bg-border hidden lg:block mx-[12px]"></div>

            {/* Regions */}
            <div className="flex flex-wrap gap-[8px] flex-grow">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`h-[32px] px-[14px] rounded-[8px] text-[14px] font-medium transition-colors ${
                    activeRegion === region
                      ? 'bg-bg text-white'
                      : 'bg-surface border border-border text-text-primary hover:bg-elevated'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            <div className="text-text-secondary text-[13px] ml-auto">
              Showing {filteredCountries.length} countries
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 & 4: Country Grid and Detail */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[80px] w-full flex justify-center relative">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[16px]">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                onClick={() => setSelectedCountry(selectedCountry === country.code ? null : country.code)}
                className={`
                  rounded-[12px] p-[16px] h-[120px] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 relative
                  ${country.blocked
                    ? 'bg-[rgba(255,59,48,0.03)] border border-[rgba(255,59,48,0.20)] hover:bg-[rgba(255,59,48,0.05)]'
                    : 'bg-surface border border-border hover:border-cta hover:shadow-[0_2px_8px_rgba(0,102,255,0.08)]'}
                  ${selectedCountry === country.code && !country.blocked ? 'border-cta shadow-[0_2px_8px_rgba(0,102,255,0.08)]' : ''}
                `}
              >
                <div className="text-[40px] leading-none mb-[8px]">{country.flag}</div>
                <h3 className="text-text-primary text-[14px] font-semibold leading-tight">{country.name}</h3>

                {country.blocked ? (
                  <div className="text-error text-[11px] font-medium mt-[2px]">Blocked</div>
                ) : (
                  <div className="text-text-secondary text-[12px] mt-[2px]">{country.types} types accepted</div>
                )}

                <div
                  className={`absolute bottom-[12px] right-[12px] w-[8px] h-[8px] rounded-full
                    ${country.status === 'green' ? 'bg-success' : country.status === 'amber' ? 'bg-warning' : 'bg-error'}
                  `}
                />
              </div>
            ))}
          </div>

          <div className="mt-[32px] flex justify-center w-full">
            <button className="text-cta text-[14px] font-medium flex items-center gap-1 hover:underline">
              View all 183 countries <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Expanded Country Detail (Section 4) */}
          {selectedCountry && activeCountry && !activeCountry.blocked && (
            <div className="mt-[40px] w-full rounded-[12px] overflow-hidden shadow-sm">
              <div className="bg-surface border border-border rounded-t-[12px] px-[24px] py-[16px] flex justify-between items-center">
                <div className="flex items-center gap-[12px]">
                  <span className="text-[28px] leading-none">{activeCountry.flag}</span>
                  <div className="flex items-baseline gap-[8px]">
                    <h3 className="text-text-primary text-[20px] font-semibold">{activeCountry.name}</h3>
                    <span className="text-text-secondary text-[13px]">{activeCountry.region}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-text-disabled hover:text-text-primary p-1 transition-colors"
                >
                  <X className="w-[20px] h-[20px]" />
                </button>
              </div>

              <div className="bg-surface border border-t-0 border-border rounded-b-[12px] p-[24px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                  {/* Col A */}
                  <div>
                    <h4 className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em] mb-[16px]">Accepted Document Types</h4>
                    <div className="flex flex-col gap-[12px]">
                      {[
                        { name: 'Passport', count: '3 variants (biometric, pre-2017, emergency)' },
                        { name: 'National ID', count: '2 variants (current, pre-2010)' },
                        { name: "Driver's License", count: 'EU format + pre-EU format' },
                        { name: 'Residence Permit', count: '4 variants' },
                      ].map((doc, i) => (
                        <div key={i} className="flex gap-[8px] items-start">
                          <FileText className="w-[16px] h-[16px] text-cta mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-text-primary text-[14px] font-medium">{doc.name}</div>
                            <div className="text-text-secondary text-[12px] mt-0.5">{doc.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col B */}
                  <div>
                    <h4 className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em] mb-[16px]">Verification Accuracy</h4>
                    <div className="flex flex-col gap-[16px]">
                      {[
                        { name: 'Passport', val: 99.7 },
                        { name: 'National ID', val: 99.4 },
                        { name: "Driver's License", val: 98.1 },
                        { name: 'Residence Permit', val: 97.8 },
                      ].map((doc, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-text-secondary text-[13px]">{doc.name}</div>
                            <div className="text-text-primary text-[12px] font-semibold">{doc.val}%</div>
                          </div>
                          <div className="w-full h-[8px] bg-elevated rounded-full overflow-hidden">
                            <div
                              className="h-full bg-success rounded-full"
                              style={{ width: `${doc.val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col C */}
                  <div>
                    <h4 className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em] mb-[16px]">Special Requirements</h4>
                    <div className="flex flex-col gap-[12px]">
                      {[
                        'MRZ (machine-readable zone) required',
                        'Both sides of national ID required',
                        'Document must be valid — no expired docs accepted'
                      ].map((req, i) => (
                        <div key={i} className="flex gap-[8px] items-start">
                          <AlertCircle className="w-[16px] h-[16px] text-warning mt-0.5 flex-shrink-0" />
                          <div className="text-text-secondary text-[13px] leading-relaxed">{req}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col D */}
                  <div>
                    <h4 className="text-text-primary text-[13px] font-semibold uppercase tracking-[0.04em] mb-[16px]">Regulations</h4>
                    <div className="flex items-start gap-[8px]">
                      <Shield className="w-[16px] h-[16px] text-cta mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap gap-[8px]">
                        {['GDPR', 'AMLD6', 'eIDAS 2', 'BaFin'].map((reg, i) => (
                          <div key={i} className="bg-[rgba(0,102,255,0.08)] text-cta text-[12px] font-medium px-[8px] py-[3px] rounded-[8px]">
                            {reg}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Section 5: Accuracy by Document Type */}
      <section className="bg-elevated px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold">Document Verification Accuracy</h2>
          <p className="text-text-secondary text-[16px] mt-[8px]">
            Average accuracy rates by document type and region, measured over the last 90 days across 12M+ verification sessions.
          </p>

          <div className="bg-surface border border-border rounded-[12px] overflow-hidden mt-[40px] shadow-sm overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="bg-elevated border-b border-border h-[44px] flex items-center px-[24px]">
                <div className="w-[20%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Document Type</div>
                <div className="w-[13.3%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Europe</div>
                <div className="w-[13.3%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Americas</div>
                <div className="w-[13.3%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">APAC</div>
                <div className="w-[13.3%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Africa</div>
                <div className="w-[13.3%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Middle East</div>
                <div className="w-[13.5%] text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Overall</div>
              </div>

              {accuracyData.map((row, i) => (
                <div key={i} className={`h-[48px] flex items-center px-[24px] border-b border-border ${i % 2 === 0 ? 'bg-surface' : 'bg-elevated'}`}>
                  <div className="w-[20%] text-text-primary text-[14px]">{row.type}</div>
                  <div className={`w-[13.3%] text-[14px] ${getAccuracyColor(row.eu)}`}>{row.eu}</div>
                  <div className={`w-[13.3%] text-[14px] ${getAccuracyColor(row.am)}`}>{row.am}</div>
                  <div className={`w-[13.3%] text-[14px] ${getAccuracyColor(row.apac)}`}>{row.apac}</div>
                  <div className={`w-[13.3%] text-[14px] ${getAccuracyColor(row.af)}`}>{row.af}</div>
                  <div className={`w-[13.3%] text-[14px] ${getAccuracyColor(row.me)}`}>{row.me}</div>
                  <div className="w-[13.5%] text-success text-[14px] font-semibold">{row.overall}</div>
                </div>
              ))}

              <div className="px-[24px] py-[12px] text-text-disabled text-[12px]">
                Data from 90-day rolling window, March 2026. Accuracy defined as correct data extraction + validity determination.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Request a Document Type */}
      <section className="bg-surface px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-[80px]">

          <div className="w-full md:w-[480px]">
            <h2 className="text-text-primary text-[32px] font-bold">Don&apos;t see your document type?</h2>
            <p className="text-text-secondary text-[16px] mt-[12px]">
              We add new document types based on demand. Submit a request and our document engineering team will review it — most requests resolved within 30 days.
            </p>

            <div className="mt-[24px] flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <Clock className="w-[16px] h-[16px] text-cta" />
                <span className="text-text-secondary text-[14px]">30-day average turnaround</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <Mail className="w-[16px] h-[16px] text-cta" />
                <span className="text-text-secondary text-[14px]">Email confirmation on acceptance</span>
              </div>
            </div>
          </div>

          <div className="flex-grow w-full max-w-[560px]">
            <div className="bg-elevated border border-border rounded-[12px] p-[32px]">
              {!isRequestSubmitted ? (
                <>
                  <h3 className="text-text-primary text-[18px] font-semibold mb-[24px]">Request a Document Type</h3>
                  <form onSubmit={handleRequestSubmit} className="flex flex-col gap-[16px]">
                    <div>
                      <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Country</label>
                      <div className="relative">
                        <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-text-disabled" />
                        <input
                          type="text"
                          placeholder="Search country or code…"
                          className="w-full h-[40px] bg-surface border border-border rounded-[8px] pl-[36px] pr-[12px] text-[14px] text-text-primary focus:outline-none focus:border-cta"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Document type</label>
                      <input
                        type="text"
                        placeholder="e.g. Residence Permit, Military ID, Voter ID"
                        className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] text-text-primary placeholder-[#999999] focus:outline-none focus:border-cta"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Use case description</label>
                      <textarea
                        placeholder="Describe your use case and the countries you serve…"
                        className="w-full h-[80px] bg-surface border border-border rounded-[8px] p-[12px] text-[14px] text-text-primary placeholder-[#999999] focus:outline-none focus:border-cta resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary text-[12px] font-medium mb-[6px]">Your email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="w-full h-[40px] bg-surface border border-border rounded-[8px] px-[12px] text-[14px] text-text-primary placeholder-[#999999] focus:outline-none focus:border-cta"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-[48px] bg-cta text-white rounded-[8px] text-[14px] font-semibold hover:bg-cta/90 transition-colors mt-[8px]"
                    >
                      Submit Request
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-[40px]">
                  <CheckCircle className="w-[40px] h-[40px] text-success mb-[16px]" />
                  <h3 className="text-text-primary text-[18px] font-semibold">Request submitted</h3>
                  <p className="text-text-secondary text-[14px] mt-[8px]">
                    We&apos;ll review your request and email you within 5 business days.
                  </p>
                  <button
                    onClick={() => setIsRequestSubmitted(false)}
                    className="mt-[24px] text-cta text-[14px] font-medium hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
