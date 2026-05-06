'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, ZoomIn, ZoomOut, Maximize, X, CheckCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

export default function ComplianceAtlasPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>('European Union');
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);

  const mapRegions = [
    { id: 'US', name: 'United States', status: 'Standard KYC', color: '#34C759', bg: 'rgba(52,199,89,0.25)', border: '#34C759', x: 150, y: 150, w: 180, h: 100, rx: 12 },
    { id: 'BR', name: 'Brazil', status: 'Enhanced Due Diligence', color: '#FF9500', bg: 'rgba(255,149,0,0.25)', border: '#FF9500', x: 220, y: 280, w: 100, h: 120, rx: 12 },
    { id: 'DE', name: 'Germany', status: 'Standard KYC', color: '#34C759', bg: 'rgba(52,199,89,0.25)', border: '#34C759', x: 480, y: 120, w: 50, h: 60, rx: 8 },
    { id: 'ZA', name: 'South Africa', status: 'Enhanced Due Diligence', color: '#FF9500', bg: 'rgba(255,149,0,0.25)', border: '#FF9500', x: 500, y: 320, w: 60, h: 70, rx: 10 },
    { id: 'SY', name: 'Syria', status: 'High-Risk / Restricted', color: '#FF3B30', bg: 'rgba(255,59,48,0.25)', border: '#FF3B30', x: 550, y: 190, w: 30, h: 30, rx: 6 },
    { id: 'CN', name: 'China', status: 'Enhanced Due Diligence', color: '#FF9500', bg: 'rgba(255,149,0,0.25)', border: '#FF9500', x: 680, y: 140, w: 140, h: 110, rx: 12 },
    { id: 'KP', name: 'DPRK', status: 'Blocked / Sanctioned', color: '#8E8E93', bg: 'rgba(142,142,147,0.20)', border: '#8E8E93', x: 830, y: 160, w: 25, h: 30, rx: 4 },
    { id: 'AU', name: 'Australia', status: 'Standard KYC', color: '#34C759', bg: 'rgba(52,199,89,0.25)', border: '#34C759', x: 780, y: 340, w: 100, h: 80, rx: 12 },
  ];

  const getFlag = (id: string) => {
    const flags: Record<string, string> = { US: '🇺🇸', BR: '🇧🇷', DE: '🇩🇪', ZA: '🇿🇦', SY: '🇸🇾', CN: '🇨🇳', KP: '🇰🇵', AU: '🇦🇺' };
    return flags[id] ?? '🌍';
  };

  const getRegionName = (id: string) => {
    const regions: Record<string, string> = { US: 'Americas', BR: 'Americas', DE: 'EU / Europe', ZA: 'Africa', SY: 'Middle East', CN: 'APAC', KP: 'APAC', AU: 'APAC' };
    return regions[id] ?? 'Global';
  };

  const regulationsData = [
    {
      region: 'European Union',
      count: 5,
      frameworks: [
        { id: 'GDPR', name: 'General Data Protection Regulation', geo: 'EU', year: '2018', status: 'SUPPORTED', desc: 'The GDPR is the toughest privacy and security law in the world, requiring clear consent and the right to erasure.', supports: ['Zero biometric storage', 'Right to erasure via credential revocation', 'Consent-first verification flow', 'Data minimization by design', 'EU data residency option'] },
        { id: 'AMLD6', name: 'Anti-Money Laundering Directive 6', geo: 'EU', year: '2021', status: 'SUPPORTED', desc: 'Sets stringent requirements for AML compliance, PEP screening, and corporate transparency.', supports: ['KYC L2 & L3 for CDD/EDD', 'PEP screening (L3)', 'Beneficial ownership capture', 'Audit trail blockchain-anchored'] },
        { id: 'MiCA', name: 'Markets in Crypto-Assets Regulation', geo: 'EU', year: '2026', status: 'SUPPORTED', desc: 'Standardizes crypto-asset service provider (CASP) compliance across the European Union.', supports: ['CASP identity verification', 'Travel Rule data capture', 'VASP onboarding flow', 'eIDAS 2 credential compatibility'] },
        { id: 'eIDAS 2', name: 'European Digital Identity', geo: 'EU', year: '2026', status: 'SUPPORTED', desc: 'Establishes a unified European digital identity framework and wallet system.', supports: ['W3C VC credentials mapped to LoA Substantial and High', 'Cross-border credential recognition', 'EUDI wallet compatibility path'] },
        { id: 'DORA', name: 'Digital Operational Resilience Act', geo: 'EU', year: '2026', status: 'SUPPORTED', desc: 'Ensures digital operational resilience for financial entities operating in the EU.', supports: ['ICT incident logging', 'Audit log tamper-evidence', 'SLA reporting for financial entities'] },
      ]
    },
    {
      region: 'United States',
      count: 3,
      frameworks: [
        { id: 'BSA/AML', name: 'Bank Secrecy Act / AML', geo: 'US', year: '1970+', status: 'SUPPORTED', desc: 'Federal law combating money laundering and financial crimes in the US.', supports: ['FinCEN CDD rule compliance', 'Sanctions screening (OFAC)', 'Suspicious Activity Report (SAR) data retention'] },
        { id: 'BIPA', name: 'Biometric Information Privacy Act', geo: 'Illinois', year: '2008', status: 'SUPPORTED', desc: 'The most stringent biometric privacy law in the United States.', supports: ['Explicit written consent capture', 'Zero-storage biometric processing', 'Automated data destruction'] },
        { id: 'CCPA', name: 'California Consumer Privacy Act', geo: 'California', year: '2020', status: 'SUPPORTED', desc: 'Enhances privacy rights and consumer protection for residents of California.', supports: ['Data access APIs', 'Right to delete integration', 'Opt-out of sale compliance'] },
      ]
    },
    {
      region: 'Global',
      count: 1,
      frameworks: [
        { id: 'FATF Travel Rule', name: 'FATF Recommendation 16', geo: 'Global', year: '2019', status: 'SUPPORTED', desc: 'Requires originator and beneficiary information to accompany crypto asset transfers.', supports: ['FATF Recommendation 16 compliance', 'Originator and beneficiary data capture', 'Threshold detection ($1,000 / €1,000)'] },
      ]
    }
  ];

  const selectedRegion = mapRegions.find(r => r.id === selectedCountry);

  return (
    <div className="min-h-screen font-sans flex flex-col bg-surface">
      {/* Section 1: Header */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[80px] pb-[64px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            REGULATORY COVERAGE
          </div>
          <h1 className="text-text-primary text-[48px] font-bold mt-[12px] leading-tight">
            Global KYC Regulatory Atlas
          </h1>
          <p className="text-text-secondary text-[18px] mt-[16px] max-w-[640px] leading-relaxed">
            Country-by-country compliance requirements, how Solidus Verify satisfies them, and what you need to know before going live in each jurisdiction.
          </p>

          <div className="flex flex-wrap gap-[32px] mt-[40px]">
            {[
              "183 jurisdictions mapped",
              "9 major regulatory frameworks",
              "Updated March 2026"
            ].map((stat, i) => (
              <div key={i} className="bg-elevated border border-border rounded-[10px] px-[20px] py-[12px] flex items-center gap-[8px]">
                <Globe className="w-[16px] h-[16px] text-cta" />
                <span className="text-text-primary text-[13px]">{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Interactive World Map */}
      <section className="bg-elevated px-8 sm:px-[120px] py-[64px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="bg-surface border border-border rounded-[12px] p-0 overflow-hidden relative shadow-sm">

            <div className="border-b border-border px-[24px] py-[16px] flex flex-wrap gap-[16px] justify-between items-center">
              <h3 className="text-text-primary text-[16px] font-semibold">Regulatory Complexity by Country</h3>
              <div className="flex flex-wrap gap-[16px]">
                {[
                  { label: 'Standard KYC', color: '#34C759' },
                  { label: 'Enhanced Due Diligence Required', color: '#FF9500' },
                  { label: 'High-Risk / Restricted', color: '#FF3B30' },
                  { label: 'Blocked / Sanctioned', color: '#8E8E93' }
                ].map((legend, i) => (
                  <div key={i} className="flex items-center gap-[6px]">
                    <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: legend.color }} />
                    <span className="text-text-secondary text-[12px]">{legend.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[500px] bg-surface overflow-hidden group">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#E0E0E5" opacity="0.5" />
                </pattern>
                <rect width="1000" height="500" fill="url(#dotGrid)" />

                {mapRegions.map((region) => {
                  const isHovered = hoveredCountry === region.id;
                  const isSelected = selectedCountry === region.id;

                  return (
                    <rect
                      key={region.id}
                      x={region.x}
                      y={region.y}
                      width={region.w}
                      height={region.h}
                      rx={region.rx}
                      fill={isSelected ? 'rgba(0,102,255,0.20)' : region.bg}
                      stroke={isSelected ? '#0066FF' : region.border}
                      strokeWidth={isSelected ? "1.5" : "0.5"}
                      style={{
                        opacity: isHovered && !isSelected ? 0.65 : 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={() => setHoveredCountry(region.id)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => setSelectedCountry(region.id)}
                    />
                  );
                })}
              </svg>

              {/* Tooltip */}
              {hoveredCountry && !selectedCountry && (() => {
                const hovered = mapRegions.find(r => r.id === hoveredCountry);
                return hovered ? (
                  <div
                    className="absolute pointer-events-none bg-bg text-white text-[13px] px-[10px] py-[6px] rounded-[6px] shadow-lg flex flex-col gap-[2px] transition-opacity"
                    style={{
                      left: `${hovered.x / 1000 * 100}%`,
                      top: `${(hovered.y - 40) / 500 * 100}%`,
                    }}
                  >
                    <span className="font-semibold">{hovered.name}</span>
                    <span className="text-text-secondary text-[11px]">{hovered.status}</span>
                  </div>
                ) : null;
              })()}

              {/* Zoom Controls */}
              <div className="absolute bottom-[24px] right-[24px] flex gap-[8px]">
                {([ZoomIn, ZoomOut, Maximize] as const).map((Icon, i) => (
                  <button key={i} className="w-[32px] h-[32px] bg-surface border border-border rounded-[6px] flex items-center justify-center text-text-secondary hover:bg-elevated transition-colors shadow-sm">
                    <Icon className="w-[16px] h-[16px]" />
                  </button>
                ))}
              </div>

              {/* Country Detail Panel */}
              <div
                className={`absolute top-0 right-0 w-full sm:w-[480px] h-full bg-surface border-l border-border transform transition-transform duration-280 ease-out flex flex-col shadow-2xl ${
                  selectedCountry ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="px-[24px] py-[20px] border-b border-border flex justify-between items-center bg-surface z-10">
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[24px] leading-none">{selectedCountry ? getFlag(selectedCountry) : ''}</span>
                    <div>
                      <h3 className="text-text-primary text-[20px] font-semibold leading-tight">
                        {selectedRegion?.name ?? ''}
                      </h3>
                      <div className="text-text-secondary text-[12px]">
                        {selectedCountry ? getRegionName(selectedCountry) : ''}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="text-text-disabled hover:text-text-primary transition-colors"
                  >
                    <X className="w-[20px] h-[20px]" />
                  </button>
                </div>

                <div className="p-[24px] overflow-y-auto flex-grow bg-surface">
                  <div className="bg-[rgba(0,102,255,0.08)] text-cta text-[12px] font-medium px-[10px] py-[4px] rounded-[6px] inline-flex">
                    {selectedCountry ? getRegionName(selectedCountry) : ''}
                  </div>

                  <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-[0.06em] mt-[20px]">Regulatory Framework</h3>
                  <div className="flex flex-wrap gap-[6px] mt-[8px]">
                    {['AMLD6', 'BaFin', 'eIDAS 2', 'GDPR'].map(tag => (
                      <div key={tag} className="bg-elevated border border-border text-text-primary text-[12px] font-medium px-[8px] py-[3px] rounded-[6px]">
                        {tag}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-[0.06em] mt-[24px] mb-[8px]">KYC Requirements vs. Solidus Coverage</h3>
                  <div className="border border-border rounded-[8px] overflow-hidden">
                    <div className="flex bg-elevated border-b border-border px-[12px] py-[8px]">
                      <div className="w-1/2 text-text-secondary text-[12px] font-medium">Requirement</div>
                      <div className="w-1/2 text-text-secondary text-[12px] font-medium">Solidus</div>
                    </div>
                    {[
                      { req: 'Document verification', status: 'Covered', icon: CheckCircle, color: '#34C759' },
                      { req: 'Liveness check', status: 'Covered', icon: CheckCircle, color: '#34C759' },
                      { req: 'PEP screening', status: 'Covered (L3)', icon: CheckCircle, color: '#34C759' },
                      { req: 'Adverse media', status: 'Covered (L3)', icon: CheckCircle, color: '#34C759' },
                      { req: 'Source of funds (>€15K)', status: 'Manual — not automated', icon: AlertCircle, color: '#FF9500' },
                      { req: 'eIDAS 2 LoA High', status: 'Credential mapped', icon: CheckCircle, color: '#34C759' },
                    ].map((row, i) => (
                      <div key={i} className="flex px-[12px] h-[40px] items-center border-b border-border last:border-0 bg-surface">
                        <div className="w-1/2 text-text-primary text-[13px] pr-[12px] truncate">{row.req}</div>
                        <div className="w-1/2 flex items-center gap-[6px]">
                          <row.icon className="w-[14px] h-[14px]" style={{ color: row.color }} />
                          <span className="text-[13px] text-text-primary truncate">{row.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-[0.06em] mt-[24px] mb-[8px]">Special Requirements</h3>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      'Enhanced Due Diligence required for PEP individuals',
                      'Source of funds declaration required for transfers exceeding €15,000',
                      'BaFin requires data residency in EU — Solidus EU region satisfies this'
                    ].map((req, i) => (
                      <div key={i} className="flex gap-[8px] items-start">
                        <AlertCircle className="w-[14px] h-[14px] text-warning mt-[3px] flex-shrink-0" />
                        <div className="text-text-primary text-[13px] leading-relaxed">{req}</div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-text-secondary text-[13px] font-semibold uppercase tracking-[0.06em] mt-[24px] mb-[8px]">Accepted Document Types</h3>
                  <div className="flex flex-wrap gap-[8px]">
                    {['Passport', 'National ID', "Driver's License", 'Residence Permit'].map(doc => (
                      <div key={doc} className="bg-[rgba(52,199,89,0.08)] text-success text-[12px] font-medium px-[10px] py-[4px] rounded-full">
                        {doc}
                      </div>
                    ))}
                  </div>

                  <a href="/docs/germany" className="text-cta text-[14px] font-medium mt-[24px] inline-flex items-center gap-1 hover:underline">
                    View Solidus implementation <ChevronRight className="w-[14px] h-[14px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Regulations Directory */}
      <section className="bg-surface px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold">Regulatory Frameworks We Support</h2>
          <p className="text-text-secondary text-[16px] mt-[12px] max-w-[600px]">
            How each major KYC and privacy regulation maps to Solidus Verify features.
          </p>

          <div className="mt-[40px] flex flex-col gap-[16px]">
            {regulationsData.map((region) => (
              <div key={region.region}>
                <button
                  onClick={() => setExpandedRegion(expandedRegion === region.region ? null : region.region)}
                  className={`w-full flex justify-between items-center bg-elevated border border-border rounded-[10px] px-[20px] py-[16px] transition-all hover:bg-elevated/80 ${expandedRegion === region.region ? 'pb-[16px] mb-[8px] rounded-b-[4px]' : ''}`}
                >
                  <div className="flex items-center gap-[12px]">
                    <h3 className="text-text-primary text-[18px] font-semibold">{region.region}</h3>
                    <span className="text-text-secondary text-[13px]">{region.count} frameworks</span>
                  </div>
                  <ChevronDown className={`w-[16px] h-[16px] text-text-secondary transition-transform ${expandedRegion === region.region ? 'rotate-180' : ''}`} />
                </button>

                {expandedRegion === region.region && (
                  <div className="flex flex-col gap-[8px] pl-[12px] sm:pl-[24px] mt-[8px] border-l-2 border-border">
                    {region.frameworks.map(fw => (
                      <div key={fw.id} className="bg-surface border border-border rounded-[8px] overflow-hidden transition-all duration-200">
                        <button
                          onClick={() => setExpandedFramework(expandedFramework === fw.id ? null : fw.id)}
                          className="w-full px-[20px] py-[16px] flex justify-between items-center hover:bg-elevated"
                        >
                          <div className="flex items-center gap-[16px] flex-wrap">
                            <h3 className="text-text-primary text-[15px] font-semibold">{fw.id}</h3>
                            <span className="text-text-secondary text-[12px] hidden sm:inline-block">{fw.name} · {fw.geo} · {fw.year}</span>
                            <div className="bg-[rgba(52,199,89,0.10)] text-success text-[11px] font-medium px-[8px] py-[2px] rounded-[4px]">
                              {fw.status}
                            </div>
                          </div>
                          <ChevronDown className={`w-[16px] h-[16px] text-text-disabled transition-transform ${expandedFramework === fw.id ? 'rotate-180' : ''}`} />
                        </button>

                        {expandedFramework === fw.id && (
                          <div className="px-[20px] pb-[20px] pt-[4px] border-t border-border bg-elevated">
                            <p className="text-text-secondary text-[14px] leading-relaxed mt-[12px]">{fw.desc}</p>
                            <h4 className="text-text-primary text-[13px] font-semibold mt-[16px] mb-[12px]">Solidus supports:</h4>
                            <div className="flex flex-col gap-[8px]">
                              {fw.supports.map((sup, idx) => (
                                <div key={idx} className="flex items-start gap-[8px]">
                                  <CheckCircle className="w-[14px] h-[14px] text-success mt-[3px] flex-shrink-0" />
                                  <span className="text-text-secondary text-[14px]">{sup}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Compliance Advisory CTA */}
      <section className="bg-bg px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-[80px]">

          <div className="w-full md:w-[520px]">
            <h2 className="text-white text-[36px] font-bold leading-tight">
              Need help mapping regulations to your jurisdiction?
            </h2>
            <p className="text-text-secondary text-[18px] mt-[16px] leading-relaxed">
              Our compliance advisory team works with crypto exchanges, fintech platforms, and enterprise customers to document their KYC obligations and configure Solidus Verify accordingly.
            </p>

            <div className="flex flex-col gap-[16px] mt-[28px]">
              {[
                "Jurisdiction-specific compliance gap analysis",
                "GDPR, MiCA, and FATF implementation review",
                "Regulatory change monitoring for your markets",
                "Co-sign on compliance documentation for auditors"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-[12px]">
                  <CheckCircle className="w-[16px] h-[16px] text-lime mt-[2px] flex-shrink-0" />
                  <span className="text-white text-[15px]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-[12px] mt-[36px]">
              <button className="h-[48px] bg-cta hover:bg-cta/90 text-white px-[24px] rounded-[8px] text-[14px] font-semibold transition-colors">
                Talk to a Compliance Advisor
              </button>
              <button className="h-[48px] bg-transparent border border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.05)] text-white px-[24px] rounded-[8px] text-[14px] font-medium transition-colors">
                Download Compliance Brief
              </button>
            </div>
          </div>

          <div className="flex-grow w-full max-w-[480px]">
            <div className="bg-surface border border-border rounded-[12px] p-[32px]">
              <h3 className="text-text-secondary text-[15px] font-semibold uppercase tracking-[0.06em]">
                Request Compliance Guidance
              </h3>

              <form className="flex flex-col gap-[14px] mt-[20px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[12px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta"
                  />
                  <input
                    type="text"
                    placeholder="Jurisdiction"
                    className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[12px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta"
                  />
                </div>

                <div className="relative">
                  <select className="w-full h-[44px] bg-elevated border border-border rounded-[8px] pl-[12px] pr-[36px] text-[14px] text-white appearance-none focus:outline-none focus:border-cta cursor-pointer">
                    <option value="" disabled className="text-text-disabled">Primary regulation concern...</option>
                    <option value="GDPR">GDPR</option>
                    <option value="MiCA">MiCA</option>
                    <option value="FATF">FATF Travel Rule</option>
                    <option value="AML/BSA">AML/BSA</option>
                    <option value="eIDAS 2">eIDAS 2</option>
                    <option value="BIPA">BIPA</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-text-disabled pointer-events-none" />
                </div>

                <textarea
                  placeholder="Describe your situation..."
                  className="w-full h-[72px] bg-elevated border border-border rounded-[8px] p-[12px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta resize-none"
                />

                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full h-[44px] bg-elevated border border-border rounded-[8px] px-[12px] text-[14px] text-white placeholder-text-disabled focus:outline-none focus:border-cta"
                />

                <button type="button" className="w-full h-[44px] bg-cta hover:bg-cta/90 text-white font-semibold text-[14px] rounded-[8px] transition-colors mt-[6px]">
                  Get Compliance Guidance
                </button>
              </form>

              <div className="text-text-disabled text-[12px] text-center mt-[12px]">
                Response within 1 business day. Free for all accounts.
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
