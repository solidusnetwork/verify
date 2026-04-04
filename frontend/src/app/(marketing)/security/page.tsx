'use client'

import React, { useState } from 'react'
import {
  ChevronDown,
  Smartphone, Server, ShieldCheck, Database, Wallet, ArrowRight,
  ScanFace, Minimize2, Key, Trash2, CheckSquare, Github,
  FileText, Code, Bug, CheckCircle, Globe
} from 'lucide-react'

const SecurityHero = () => {
  return (
    <div className="w-full bg-surface pt-24 pb-16 px-8 flex flex-col items-center">
      <h1 className="text-[48px] font-bold text-text-primary mb-4 text-center">Security & Compliance</h1>
      <p className="text-[18px] text-text-secondary text-center max-w-[700px] leading-relaxed">
        Every architectural decision made with a compliance officer's requirements as the constraint.
      </p>
    </div>
  )
}

const ArchitectureDiagramSection = () => {
  return (
    <div className="w-full bg-elevated py-20 px-8 flex flex-col items-center overflow-hidden">
      <h2 className="text-[36px] font-bold text-text-primary mb-12 text-center">How we protect your users' data</h2>

      <div className="w-full max-w-[1200px] bg-surface rounded-xl border border-border p-10 overflow-x-auto">
        <div className="flex items-center min-w-[900px]">

          <div className="flex flex-col items-center gap-3 w-[120px] shrink-0">
            <div className="w-16 h-16 rounded-xl bg-elevated border border-border flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-text-primary" />
            </div>
            <span className="text-[13px] font-semibold text-text-primary text-center">User's Device</span>
          </div>

          <div className="flex-1 flex flex-col items-center relative -mx-4 z-0">
            <div className="w-full h-px border-t border-dashed border-text-secondary relative">
              <ArrowRight className="w-4 h-4 text-text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-0.5" />
            </div>
            <span className="text-[11px] text-text-secondary bg-elevated px-2 py-0.5 rounded mt-2 font-mono">TLS 1.3</span>
          </div>

          <div className="flex flex-col items-center gap-3 w-[160px] shrink-0 relative">
            <div className="absolute -top-[48px] left-1/2 -translate-x-1/2 w-[220px] text-center">
              <span className="text-[11px] text-error font-medium bg-error/10 border border-error/20 px-2 py-1 rounded">
                Document images processed + deleted. No biometric data persisted.
              </span>
              <div className="w-px h-3 bg-error/30 mx-auto" />
            </div>
            <div className="w-16 h-16 rounded-xl bg-cta/10 border border-cta/20 flex items-center justify-center z-10 bg-surface">
              <Server className="w-8 h-8 text-cta" />
            </div>
            <span className="text-[13px] font-semibold text-text-primary text-center">Solidus API Edge</span>
          </div>

          <div className="flex-1 flex flex-col items-center relative -mx-4 z-0">
            <div className="w-full h-px border-t border-dashed border-text-secondary relative">
              <ArrowRight className="w-4 h-4 text-text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-0.5" />
            </div>
            <span className="text-[11px] text-text-secondary bg-elevated px-2 py-0.5 rounded mt-2 font-mono">BLAKE3 hash</span>
          </div>

          <div className="flex flex-col items-center gap-3 w-[140px] shrink-0">
            <div className="w-16 h-16 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center z-10 bg-surface">
              <ShieldCheck className="w-8 h-8 text-lime" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-semibold text-text-primary text-center">Validators</span>
              <span className="text-[11px] text-text-secondary">consensus</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center relative -mx-4 z-0">
            <div className="w-full h-px border-t border-dashed border-text-secondary relative">
              <ArrowRight className="w-4 h-4 text-text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-0.5" />
            </div>
            <span className="text-[11px] text-text-secondary bg-elevated px-2 py-0.5 rounded mt-2 font-mono">BLS signature</span>
          </div>

          <div className="flex flex-col items-center gap-3 w-[140px] shrink-0">
            <div className="w-16 h-16 rounded-xl bg-bg flex items-center justify-center z-10">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-semibold text-text-primary text-center">Solidus Blockchain</span>
              <span className="text-[11px] text-text-secondary text-center leading-tight mt-0.5">credential hash anchored</span>
            </div>
          </div>

          <div className="flex-1 flex items-center relative -mx-4 z-0">
            <div className="w-full h-px border-t border-dashed border-text-secondary relative">
              <ArrowRight className="w-4 h-4 text-text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-0.5" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-[140px] shrink-0">
            <div className="w-16 h-16 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center z-10 bg-surface">
              <Wallet className="w-8 h-8 text-cyan" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-semibold text-text-primary text-center">User's DID Wallet</span>
              <span className="text-[11px] text-text-secondary text-center leading-tight mt-0.5">credential stored by user</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const CertificationsGrid = () => {
  const certs = [
    { name: 'GDPR', desc: "No personal data stored on-chain. Right to erasure: supported.", status: 'Current', color: 'bg-success/10 text-success' },
    { name: 'SOC 2 Type II', desc: 'Audit in progress. Report available post-Year 2.', status: 'Planned', color: 'bg-cta/10 text-cta' },
    { name: 'ISO 27001', desc: 'Information security management system.', status: 'Planned', color: 'bg-cta/10 text-cta' },
    { name: 'BIPA', desc: 'Written biometric consent flow. No biometric template stored.', status: 'Current', color: 'bg-success/10 text-success' },
    { name: 'MiCA', desc: 'Credential attestation satisfies MiCA KYC requirements.', status: 'Current', color: 'bg-success/10 text-success' },
    { name: 'eIDAS 2', desc: 'W3C VC credentials compatible with eIDAS 2 wallet standard.', status: 'Current', color: 'bg-success/10 text-success' },
    { name: 'FATF Travel Rule', desc: 'Credential attestation model satisfies VASP Travel Rule.', status: 'Current', color: 'bg-success/10 text-success' },
    { name: 'PCI-DSS', desc: 'Not applicable — no card data processed.', status: 'N/A', color: 'bg-text-secondary/10 text-text-secondary' },
  ]

  return (
    <div className="w-full bg-surface py-20 px-8 flex flex-col items-center">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certs.map((c, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-7 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <ShieldCheck className="w-12 h-12 text-cta mb-4" />
            <h3 className="text-[20px] font-semibold text-text-primary mb-2">{c.name}</h3>
            <p className="text-[14px] text-text-secondary mb-6 flex-1">{c.desc}</p>
            <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${c.color}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PrivacyArchitecturePrinciples = () => {
  const principles = [
    { icon: ScanFace, title: 'Zero Biometric Storage', desc: 'Liveness images are processed in-memory and discarded. No facial template is ever written to disk.' },
    { icon: Minimize2, title: 'Data Minimization', desc: 'Only cryptographic proofs are stored on-chain — never names, passport numbers, or photos.' },
    { icon: Key, title: "User-Controlled Credentials", desc: "Credentials live in the user's DID wallet. You cannot access them without the user's consent." },
    { icon: Trash2, title: 'GDPR Right to Erasure', desc: 'Deleting an account removes all off-chain data. The on-chain hash cannot be reversed to PII.' },
    { icon: CheckSquare, title: 'Consent-First', desc: 'A signed consent transaction is required before any verification begins.' },
    { icon: Github, title: 'Open Source', desc: 'All credential issuance logic is open-source and independently auditable.' },
  ]

  return (
    <div className="w-full bg-surface pb-20 pt-8 px-8 flex flex-col items-center border-b border-border">
      <h2 className="text-[36px] font-bold text-text-primary mb-12 text-center">Privacy by architecture</h2>

      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {principles.map((p, i) => (
          <div key={i} className="flex flex-col items-start">
            <p.icon className="w-8 h-8 text-cta mb-4" />
            <h3 className="text-[18px] font-semibold text-text-primary mb-2">{p.title}</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const RegulatoryDetailSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const regs = [
    {
      name: 'GDPR', region: 'European Union', status: 'Current',
      rows: [
        { req: 'Article 5(1)(e) — Storage limitation', impl: 'Biometric data deleted immediately after processing. Verification result stored as BLAKE3 hash only. No PII persisted post-session.' },
        { req: 'Article 17 — Right to erasure', impl: 'Account deletion removes all off-chain data within 24 hours. The on-chain hash is a one-way cryptographic proof and cannot be reversed to recover PII.' },
        { req: 'Article 25 — Privacy by design', impl: 'Zero-knowledge architecture. No personal data stored on the Solidus protocol layer. Compliance is architectural, not policy-dependent.' },
        { req: 'Article 32 — Security of processing', impl: 'TLS 1.3 in transit. BLAKE3 hashing for verification results. BLS signatures for validator consensus. FIPS-validated key management.' },
      ],
    },
    {
      name: 'MiCA', region: 'European Union', status: 'Current',
      rows: [
        { req: 'Article 68 — KYC for VASP operators', impl: 'KYC Level 2 satisfies MiCA Article 68 identity verification requirements for crypto-asset service providers operating in the EU.' },
        { req: 'FATF Travel Rule (via MiCA)', impl: 'Credential attestation model is compatible with FATF Travel Rule originator/beneficiary identification via W3C VC metadata fields.' },
      ],
    },
    {
      name: 'eIDAS 2', region: 'European Union', status: 'Current',
      rows: [
        { req: 'EU Digital Identity Wallet (EUDIW) compatibility', impl: 'W3C VC credentials issued by Solidus are structurally compatible with the EU Digital Identity Wallet (EUDIW) standard. No format conversion required.' },
        { req: 'Electronic Attestation of Attributes (EAA)', impl: 'Solidus credentials qualify as Electronic Attestation of Attributes under eIDAS 2, enabling their use in EU-regulated identity workflows.' },
      ],
    },
    {
      name: 'FATF Travel Rule', region: 'Global', status: 'Current',
      rows: [
        { req: 'VASP originator/beneficiary identification', impl: 'Solidus credentials include VASP-identifiable fields compliant with FATF Recommendation 16 Travel Rule requirements for virtual asset transfers.' },
        { req: 'Counterparty VASP lookup', impl: 'Credential attestation model supports counterparty VASP discovery without exposing raw PII in the transaction flow.' },
      ],
    },
    {
      name: 'BIPA', region: 'Illinois, USA', status: 'Current',
      rows: [
        { req: 'Written informed consent (740 ILCS 14/15(b))', impl: 'A signed consent transaction is required on-chain before any biometric processing begins. Consent is cryptographically verifiable and timestamped.' },
        { req: 'Biometric data retention prohibition', impl: 'Facial biometrics are processed in memory only. No facial template, biometric identifier, or biometric information is written to any storage medium.' },
        { req: 'Destruction schedule', impl: 'As no biometric data is retained, no retention schedule is required. BIPA §15(e) satisfied by architectural non-retention.' },
      ],
    },
  ]

  return (
    <div className="w-full bg-surface py-20 px-8 flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-12 text-center">Regulatory compliance, mapped</h2>

      <div className="w-full max-w-[1040px] flex flex-col gap-3">
        {regs.map((r, i) => (
          <div key={i} className="bg-surface border border-border rounded-lg overflow-hidden transition-shadow shadow-sm hover:shadow-md">

            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${openIdx === i ? 'border-b border-border bg-elevated' : 'bg-surface'}`}
            >
              <h3 className="text-[20px] font-semibold text-text-primary">{r.name}</h3>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex h-6 px-2.5 rounded-full bg-elevated border border-border items-center justify-center">
                  <span className="text-[11px] font-semibold text-text-secondary">{r.region}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${openIdx === i ? 'rotate-180 text-text-primary' : ''}`} />
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[1000px] opacity-100 p-6' : 'max-h-0 opacity-0 px-6 py-0'}`}>
              <div className="w-full border border-border rounded-lg overflow-hidden">
                <div className="flex bg-elevated px-4 py-2.5">
                  <div className="w-1/2 text-[12px] font-semibold text-text-secondary">Requirement</div>
                  <div className="w-1/2 text-[12px] font-semibold text-text-secondary">Solidus Implementation</div>
                </div>
                <div className="flex flex-col bg-surface">
                  {r.rows.map((row, ri) => (
                    <div key={ri} className="flex px-4 py-3.5 border-t border-border items-start hover:bg-elevated transition-colors">
                      <div className="w-1/2 pr-4 text-[13px] font-medium text-text-primary">{row.req}</div>
                      <div className="w-1/2 pl-4 text-[13px] text-text-secondary leading-relaxed">{row.impl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

const AuditReportsSection = () => {
  const reports = [
    {
      icon: ShieldCheck, color: 'text-cta', bg: 'bg-cta/10',
      name: 'Protocol Security Audit Q1 2026', scope: 'Credential issuance + validator consensus mechanisms',
      date: 'January 2026', json: true,
    },
    {
      icon: Code, color: 'text-lime', bg: 'bg-lime/10',
      name: 'Open Source Audit Q1 2026', scope: 'Protocol smart contracts + validator node software',
      date: 'March 2026', json: true,
    },
    {
      icon: Globe, color: 'text-cyan', bg: 'bg-cyan/10',
      name: 'GDPR Compliance Assessment', scope: 'Data processing mapping, Article 25 privacy-by-design audit',
      date: 'February 2026', json: true,
    },
    {
      icon: FileText, color: 'text-text-secondary', bg: 'bg-text-secondary/10',
      name: 'Penetration Test Summary 2026', scope: 'API surface, authentication layer, webhook endpoints',
      date: 'March 2026', json: false, note: 'Summary only · Full report on NDA request',
    },
  ]

  return (
    <div className="w-full bg-surface pb-20 px-8 flex flex-col items-center">
      <div className="w-full max-w-[1040px] bg-surface border border-border rounded-xl p-8 shadow-sm">
        <h2 className="text-[28px] font-bold text-text-primary mb-6">Audit Reports & Certifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map((r, i) => (
            <div key={i} className="bg-elevated rounded-lg p-5 border border-border flex flex-col sm:flex-row justify-between sm:items-start gap-4 hover:border-cta/30 transition-colors group">

              <div className="flex items-start gap-3.5 flex-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${r.bg}`}>
                  <r.icon className={`w-[18px] h-[18px] ${r.color}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16px] font-semibold text-text-primary">{r.name}</h3>
                  <p className="text-[14px] text-text-secondary">{r.scope}</p>
                  <span className="text-[12px] text-text-secondary mt-0.5">{r.date}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0 self-end sm:self-start">
                <div className="flex items-center gap-1.5">
                  <button className="h-7 px-2.5 rounded border border-border bg-surface text-[11px] font-semibold text-text-primary hover:bg-elevated transition-colors">PDF</button>
                  {r.json && <button className="h-7 px-2.5 rounded border border-border bg-surface text-[11px] font-semibold text-text-primary hover:bg-elevated transition-colors">JSON</button>}
                </div>
                {r.note && <span className="text-[11px] text-text-secondary max-w-[140px] text-right mt-1">{r.note}</span>}
              </div>

            </div>
          ))}
        </div>

        <p className="text-[12px] text-text-secondary text-center mt-6">
          Independent security audits commissioned quarterly. All reports published in full unless noted. Next scheduled audit: May 2026.
        </p>
      </div>
    </div>
  )
}

const BugBountySection = () => {
  return (
    <div className="w-full bg-elevated py-16 px-8 flex flex-col items-center">
      <div className="w-full max-w-[900px] bg-surface border border-border rounded-xl p-8 flex flex-col md:flex-row gap-12 shadow-sm">

        <div className="flex-1 flex flex-col items-start">
          <Bug className="w-12 h-12 text-cta mb-5" />
          <h2 className="text-[28px] font-bold text-text-primary mb-4">Responsible Disclosure</h2>
          <p className="text-[16px] text-text-secondary leading-[1.7] mb-5">
            We take security seriously. If you discover a vulnerability in Solidus Verify, report it responsibly. We commit to acknowledging reports within 24 hours and resolving critical issues within 7 days. We will not pursue legal action against good-faith security researchers.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              '24-hour acknowledgment guaranteed',
              '7-day resolution target for critical issues',
              'No legal action against responsible researchers',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-[14px] text-text-primary">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col w-full">
          <div className="w-full bg-elevated rounded-lg border border-border flex flex-col overflow-hidden mb-4">
            <div className="flex justify-between items-center px-4 py-2.5 border-b border-border bg-elevated">
              <span className="text-[12px] font-semibold text-text-secondary">Severity</span>
              <span className="text-[12px] font-semibold text-text-secondary">Reward</span>
            </div>
            <div className="flex flex-col bg-surface">

              <div className="flex justify-between items-center px-4 py-3.5 border-b border-border hover:bg-elevated transition-colors">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-error">Critical</span>
                  <span className="text-[11px] text-text-secondary">(RCE, auth bypass)</span>
                </div>
                <span className="text-[16px] font-semibold text-success">Up to $10,000</span>
              </div>

              <div className="flex justify-between items-center px-4 py-3.5 border-b border-border hover:bg-elevated transition-colors">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-warning">High</span>
                  <span className="text-[11px] text-text-secondary">(data exposure, privilege escalation)</span>
                </div>
                <span className="text-[16px] font-semibold text-text-primary">$2,500</span>
              </div>

              <div className="flex justify-between items-center px-4 py-3.5 border-b border-border hover:bg-elevated transition-colors">
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-text-primary">Medium</span>
                  <span className="text-[11px] text-text-secondary">(CSRF, stored XSS)</span>
                </div>
                <span className="text-[16px] font-semibold text-text-primary">$500</span>
              </div>

              <div className="flex justify-between items-center px-4 py-3.5 hover:bg-elevated transition-colors">
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-text-secondary">Low</span>
                  <span className="text-[11px] text-text-secondary">(information disclosure)</span>
                </div>
                <span className="text-[14px] text-text-secondary">Acknowledgment</span>
              </div>

            </div>
          </div>

          <button className="w-full h-[44px] rounded-lg bg-cta hover:bg-cta/90 text-[15px] font-semibold text-white transition-colors mb-2">
            Submit Report
          </button>
          <p className="text-[11px] text-text-secondary text-center">
            Security reports: security@solidus.network · PGP key available on request · Response within 24 hours
          </p>
        </div>

      </div>
    </div>
  )
}

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <ArchitectureDiagramSection />
      <CertificationsGrid />
      <PrivacyArchitecturePrinciples />
      <RegulatoryDetailSection />
      <AuditReportsSection />
      <BugBountySection />
    </>
  )
}
