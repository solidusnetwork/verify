'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck, Lock, Zap, UploadCloud,
  ScanFace, ArrowRight, Award, DollarSign, Building2, Gamepad2,
  TrendingDown, Mail, Smartphone, UserCheck, Code, CheckCircle,
  CheckCircle2, Globe2, Quote, Globe,
} from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="w-full bg-bg flex justify-center text-white py-16 md:py-24">
      <div className="w-full max-w-[1440px] px-8 md:px-[120px] flex flex-col lg:flex-row items-center gap-16">

        {/* Left Column */}
        <div className="flex-1 max-w-[600px] flex flex-col gap-6">
          <span className="text-[12px] font-semibold tracking-[0.08em] text-lime">
            VERIFY.SOLIDUS.NETWORK
          </span>
          <h1 className="text-[52px] font-bold leading-[1.1] whitespace-pre-line">
            {'KYC verification\nthat respects users.'}
          </h1>
          <p className="text-[18px] font-normal text-white/70 max-w-[480px] leading-relaxed">
            Verify email, phone, and identity in seconds. Credentials issued on-chain. Biometric data never stored.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="h-12 px-7 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[15px] font-semibold text-white flex items-center gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="h-12 px-7 bg-transparent border border-white/25 hover:bg-white/5 transition-colors rounded-lg text-[15px] font-semibold text-white flex items-center gap-2">
              View Docs <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: ShieldCheck, text: "No biometric storage" },
              { icon: Lock, text: "GDPR compliant" },
              { icon: Zap, text: "1-2s verification" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 rounded-full px-3.5 py-1.5 border border-white/5">
                <item.icon className="w-3.5 h-3.5 text-lime" />
                <span className="text-[12px] font-medium text-white/70">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full max-w-[520px] shrink-0">
          <div className="bg-surface rounded-2xl p-6 shadow-[0_16px_48px_rgba(0,0,0,0.48)] border border-white/10 w-full md:w-[480px] mx-auto flex flex-col gap-6">

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[11px] text-text-secondary bg-black/20 px-3 py-1 rounded-full">verify.solidus.network/demo</span>
              <div className="w-[52px]" />
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cta flex items-center justify-center text-white text-[12px] font-bold">1</div>
                <span className="text-[11px] text-cta font-medium">Submit</span>
              </div>
              <div className="w-12 h-px bg-elevated mb-5" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-elevated flex items-center justify-center text-text-secondary text-[12px] font-bold">2</div>
                <span className="text-[11px] text-text-secondary font-medium">Process</span>
              </div>
              <div className="w-12 h-px bg-elevated mb-5" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-elevated flex items-center justify-center text-text-secondary text-[12px] font-bold">3</div>
                <span className="text-[11px] text-text-secondary font-medium">Credential</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-bg/50 hover:bg-bg/80 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-text-secondary" />
                <span className="text-[14px] text-text-secondary">Drop passport or ID</span>
                <span className="text-[11px] text-text-disabled">JPG, PNG, PDF · max 10MB</span>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-elevated rounded-lg h-[160px] flex items-center justify-center border border-border">
                  <ScanFace className="w-12 h-12 text-cta opacity-50" />
                </div>
                <div className="flex-1 flex flex-col gap-3 justify-center px-4">
                  <div className="h-3 w-3/4 bg-elevated rounded-full" />
                  <div className="h-3 w-1/2 bg-elevated rounded-full" />
                  <div className="h-3 w-5/6 bg-elevated rounded-full" />
                </div>
              </div>

              <button className="w-full h-12 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[15px] font-semibold text-white mt-2">
                Submit for Verification
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

const DominantStatSection = () => {
  return (
    <div className="w-full bg-bg border-b border-white/5 py-16 px-8 md:px-[120px] flex flex-col items-center text-center">
      <span className="text-[12px] font-semibold text-text-secondary tracking-[0.12em] uppercase mb-3">
        TOTAL VERIFICATIONS ON THE NETWORK
      </span>
      <div className="flex items-center justify-center">
        <h2 className="text-[80px] font-bold text-lime tracking-[-2px] leading-none">
          48,700,000+
        </h2>
        <div className="w-2.5 h-2.5 rounded-full bg-success ml-4 animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 mt-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[28px] font-bold text-white">99.4%</span>
          <span className="text-[12px] text-text-secondary">verification success rate</span>
        </div>
        <div className="hidden md:block w-px h-10 bg-white/10" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[28px] font-bold text-cyan">1-2s</span>
          <span className="text-[12px] text-text-secondary">median finality</span>
        </div>
        <div className="hidden md:block w-px h-10 bg-white/10" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[28px] font-bold text-white">180+</span>
          <span className="text-[12px] text-text-secondary">countries supported</span>
        </div>
      </div>
    </div>
  )
}

const LiveStatsStrip = () => {
  return (
    <div className="w-full bg-elevated h-auto md:h-[72px] py-6 md:py-0 px-8 md:px-[120px] flex flex-col md:flex-row items-center justify-between border-b border-border">
      {[
        { val: "48.7M", label: "Verifications", dot: true, color: "text-text-primary" },
        { val: "99.4%", label: "Success Rate", color: "text-text-primary" },
        { val: "$0.001", label: "Per Query", color: "text-success" },
        { val: "180+", label: "Countries", color: "text-text-primary" }
      ].map((stat, i) => (
        <React.Fragment key={i}>
          <div className="flex items-baseline gap-2 py-2 md:py-0">
            <span className={`text-[28px] font-bold ${stat.color}`}>{stat.val}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-text-secondary uppercase tracking-wider font-medium">{stat.label}</span>
              {stat.dot && <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />}
            </div>
          </div>
          {i < 3 && <div className="hidden md:block w-px h-[28px] bg-border" />}
        </React.Fragment>
      ))}
    </div>
  )
}

const PartnerLogosSection = () => {
  const logos = ['Binance', 'Kraken', 'Coinbase', 'Uniswap', 'Aave', 'Compound', 'Gemini', 'dYdX', 'Chainlink', 'Polygon']
  return (
    <div className="w-full bg-surface py-16 px-8 md:px-[120px] flex flex-col items-center">
      <span className="text-[12px] font-semibold tracking-[0.08em] text-text-disabled mb-12 uppercase">
        Trusted by compliance teams at
      </span>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-[1000px]">
        {logos.map((logo, i) => (
          <div key={i} className="w-[160px] h-[56px] flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <span className="text-[20px] font-bold text-text-primary">{logo}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const CoverageSection = () => {
  return (
    <div className="w-full bg-surface py-16 px-8 md:px-[120px] flex flex-col items-center">
      <div className="w-full max-w-[1200px] border border-border rounded-xl overflow-hidden flex flex-col md:flex-row">
        {[
          { val: "183", label: "countries supported", color: "text-text-primary" },
          { val: "11,000+", label: "document types accepted", color: "text-text-primary" },
          { val: "99.4%", label: "verification accuracy", color: "text-cta" },
          { val: "1–2s", label: "average verification time", color: "text-text-primary" }
        ].map((stat, i) => (
          <div key={i} className={`flex-1 p-6 md:py-6 md:px-8 flex flex-col items-center justify-center text-center hover:bg-elevated transition-colors ${i < 3 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
            <h2 className={`text-[40px] font-bold ${stat.color} leading-tight`}>{stat.val}</h2>
            <span className="text-[12px] text-text-secondary uppercase tracking-wide mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
      <button className="mt-8 text-[14px] font-medium text-cta hover:underline flex items-center gap-1.5 group">
        View all supported documents <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}

const HowItWorksSection = () => {
  return (
    <div className="w-full bg-elevated py-20 px-8 md:px-[120px] flex flex-col items-center text-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-4">Verify once. Use everywhere.</h2>
      <p className="text-[16px] text-text-secondary max-w-[600px] mb-12 leading-relaxed">
        The credential is issued to the user's DID — not stored on your servers. Any Solidus-integrated service can verify it instantly, for $0.05 instead of $5–20.
      </p>

      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-stretch gap-4 relative">
        {[
          { step: 1, title: "Integrate", desc: "Add one npm package. One API call starts a KYC session." },
          { step: 2, title: "Verify", desc: "User submits document + liveness. Validators confirm on-chain." },
          { step: 3, title: "Credential Issued", desc: "A W3C Verifiable Credential goes into the user's DID wallet." },
          { step: 4, title: "Reuse Anywhere", desc: "Any Solidus service presents the credential. No re-upload. Ever." }
        ].map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex-1 bg-surface border border-border rounded-xl p-7 flex flex-col items-start text-left z-10">
              <div className="w-9 h-9 rounded-full bg-cta text-white flex items-center justify-center text-[18px] font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-[18px] font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-[14px] text-text-secondary leading-[1.6]">{item.desc}</p>
            </div>
            {i < 3 && (
              <div className="hidden md:flex items-center justify-center px-2">
                <ArrowRight className="w-6 h-6 text-text-disabled" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const ReusableCredentialSection = () => {
  return (
    <div className="w-full bg-bg py-20 px-8 md:px-[120px] flex flex-col items-center">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-[12px] font-semibold tracking-[0.08em] text-lime mb-3">THE SOLIDUS ADVANTAGE</span>
        <h2 className="text-[40px] font-bold text-white mb-4">Verify once. Present anywhere.</h2>
        <p className="text-[16px] text-white/60 max-w-[600px] leading-relaxed">
          Traditional KYC forces users to re-upload documents every time. Solidus issues a W3C Verifiable Credential stored in the user's DID wallet — presented instantly for $0.05 instead of $5–20.
        </p>
      </div>

      <div className="w-full max-w-[900px] flex flex-col md:flex-row items-center justify-center mt-8">

        {/* Left Node */}
        <div className="bg-surface rounded-xl p-6 w-[200px] flex flex-col items-center gap-2 border border-white/10 z-10 relative">
          <ShieldCheck className="w-8 h-8 text-lime" />
          <h3 className="text-[16px] font-semibold text-white">Verify Once</h3>
          <span className="text-[14px] text-text-secondary">Full KYC L2</span>
          <span className="text-[20px] font-bold text-lime mt-2">$5.00</span>
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex flex-1 flex-col items-center relative -mx-4 z-0">
          <div className="w-full h-px bg-dashed border-t border-dashed border-text-disabled relative">
            <ArrowRight className="w-5 h-5 text-text-disabled absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg" />
          </div>
          <span className="text-[11px] text-text-disabled text-center mt-4">W3C VC issued<br/>to DID wallet</span>
        </div>

        {/* Center Node */}
        <div className="w-[160px] h-[160px] bg-elevated rounded-xl flex flex-col items-center justify-center gap-2 relative z-10 shadow-[0_0_32px_rgba(0,212,255,0.20)] my-8 md:my-0"
             style={{ border: '2px solid transparent', backgroundClip: 'padding-box', backgroundImage: 'linear-gradient(#242438, #242438), linear-gradient(135deg, #A8E600, #00D4FF)' }}>
          <Award className="w-10 h-10 text-lime" />
          <h3 className="text-[14px] font-semibold text-white text-center">KYC L2<br/>Credential</h3>
          <span className="text-[12px] text-text-secondary">DID wallet</span>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex flex-1 h-[160px] items-center relative -mx-4 z-0 justify-center">
          <div className="w-full h-px border-t border-dashed border-border relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg text-[11px] text-lime text-center px-2 py-1 leading-tight border border-border rounded">$0.05 per<br/>presentation</span>
          </div>
        </div>

        {/* Right Nodes */}
        <div className="flex flex-col gap-3 z-10 relative">
          {[
            { icon: DollarSign, text: "DeFi Protocol" },
            { icon: Building2, text: "Fintech App" },
            { icon: Gamepad2, text: "Gaming Platform" }
          ].map((item, i) => (
            <div key={i} className="bg-surface rounded-lg py-3 px-4 w-[180px] flex items-center gap-3 border border-white/10">
              <item.icon className="w-4 h-4 text-cyan" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-white">{item.text}</span>
                <span className="text-[11px] text-text-secondary">$0.05 reuse</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full bg-lime/10 border border-lime/20">
        <TrendingDown className="w-[18px] h-[18px] text-lime" />
        <span className="text-[18px] font-semibold text-lime">96% cheaper for repeat verifications</span>
      </div>
    </div>
  )
}

const FeatureGridSection = () => {
  const features = [
    { icon: Mail, title: "Email Verification", desc: "Confirm email ownership via one-click link. Instant. Free." },
    { icon: Smartphone, title: "Phone Verification", desc: "SMS OTP. Global carrier coverage. Under 1 second." },
    { icon: UserCheck, title: "KYC Level 1", desc: "Name, DOB, address — no document required. $1 per verification." },
    { icon: ShieldCheck, title: "KYC Level 2", desc: "Government ID + liveness check. Credential issued on-chain. $5." },
    { icon: Award, title: "Verifiable Credentials", desc: "W3C-standard credentials in the user's DID wallet. Present anywhere." },
    { icon: Code, title: "REST API + SDKs", desc: "JavaScript, Python, Go SDKs. Integrate in under an hour." }
  ]

  return (
    <div className="w-full bg-surface py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-4 text-center">Everything your compliance team needs</h2>
      <p className="text-[16px] text-text-secondary text-center max-w-[600px] mb-12">
        From basic email verification to full KYC with liveness check and on-chain credential issuance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
        {features.map((f, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-7 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow duration-200">
            <f.icon className="w-6 h-6 text-cta mb-4" />
            <h3 className="text-[18px] font-semibold text-text-primary mb-2">{f.title}</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProductDemoSection = () => {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const tabs = ['Dashboard', 'Verifications', 'Analytics', 'Credentials']

  return (
    <div className="w-full bg-elevated py-20 px-8 md:px-[120px] flex flex-col items-center">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-[36px] font-bold text-text-primary mb-3">See it in action</h2>
        <p className="text-[16px] text-text-secondary max-w-[480px]">
          Take a self-guided tour of the Solidus Verify dashboard.
        </p>
      </div>

      <div className="w-full max-w-[900px] bg-bg rounded-2xl p-8 shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-white/10">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-[13px] transition-colors border ${
                activeTab === tab
                  ? 'bg-cta border-cta text-white font-semibold'
                  : 'bg-transparent border-white/10 text-text-secondary hover:text-white font-medium'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full h-[360px] bg-surface rounded-xl overflow-hidden relative border border-white/5">
          <div className="w-full h-full bg-surface flex items-end p-4">
            <span className="text-[13px] font-semibold text-white">Dashboard Demo</span>
          </div>

          {/* Mock Annotations */}
          <div className="absolute top-[20%] left-[10%] bg-surface rounded-md px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.20)]">
            <span className="text-[12px] font-semibold text-text-primary">Live verification metrics</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white" />
          </div>

          <div className="absolute top-[50%] right-[20%] bg-surface rounded-md px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.20)]">
            <span className="text-[12px] font-semibold text-text-primary">Real-time feed</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button className="h-11 px-6 rounded-lg border border-bg text-[15px] font-medium text-text-primary hover:bg-bg hover:text-white transition-colors">
          Book a live demo →
        </button>
        <button className="h-11 px-6 rounded-lg bg-cta hover:bg-cta/90 text-[15px] font-semibold text-white transition-colors">
          Start Free Trial →
        </button>
      </div>
    </div>
  )
}

const IndustryVerticalsSection = () => {
  return (
    <div className="w-full bg-elevated py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-8 text-center">Built for your industry</h2>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {['Crypto & DeFi', 'Fintech', 'Gaming', 'Healthcare'].map((tab, i) => (
          <button key={i} className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors border ${
            i === 0 ? 'bg-bg text-white border-bg' : 'bg-surface text-text-secondary border-border hover:border-bg'
          }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[1000px] flex flex-col md:flex-row gap-16">
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-[28px] font-bold text-text-primary">MiCA-compliant KYC for DeFi</h2>
          <p className="text-[16px] text-text-secondary leading-[1.7]">
            Verify users without storing passports. FATF Travel Rule via credential attestation. MiCA-compliant from day one.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "DEX access gating (verified country of residence)",
              "Sybil-resistant airdrops (1 human = 1 allocation)",
              "AML compliance via credential flags"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cta mt-0.5 shrink-0" />
                <span className="text-[14px] text-text-primary">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-cta/5 border border-cta/15 rounded-lg p-4 mt-2">
            <p className="text-[14px] text-cta/80">
              At <strong>$0.05/verification</strong>, 10K monthly verifications cost <strong>$500</strong> — vs $1,848 for Auth0.
            </p>
          </div>
        </div>

        <div className="w-full md:w-[440px] shrink-0 bg-surface border border-border rounded-xl p-8 flex flex-col items-center justify-center gap-6 h-[320px]">
          <Globe2 className="w-12 h-12 text-cta" />
          <div className="flex flex-col gap-3 items-center w-full max-w-[240px]">
            <div className="w-full py-3 bg-elevated rounded-full text-center text-[14px] font-semibold text-text-primary">Verified Contributor</div>
            <div className="w-full py-3 bg-elevated rounded-full text-center text-[14px] font-semibold text-text-primary">Non-US Resident</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ComplianceSection = () => {
  return (
    <div className="w-full bg-bg py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-white mb-3 text-center">Built for regulated industries</h2>
      <p className="text-[16px] text-white/60 text-center mb-12">Privacy by architecture, not policy.</p>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-[1200px] mb-10">
        {[
          { icon: ShieldCheck, title: "GDPR Ready", desc: "No personal data stored on-chain" },
          { icon: Award, title: "SOC 2 Type II", desc: "Planned Year 2 — trust center published" },
          { icon: Globe, title: "BIPA Compliant", desc: "Written consent flow included" },
          { icon: Code, title: "Open Source", desc: "Full auditability — protocol on GitHub" }
        ].map((b, i) => (
          <div key={i} className="flex-1 min-w-[200px] max-w-[280px] bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-3">
            <b.icon className="w-8 h-8 text-lime" />
            <div className="flex flex-col gap-1">
              <h3 className="text-[16px] font-semibold text-white">{b.title}</h3>
              <p className="text-[12px] text-white/50">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <span className="text-[12px] text-white/40">Audit reports at verify.solidus.network/security/audits</span>
    </div>
  )
}

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We went from 3 weeks to 2 days for KYC compliance. Solidus is the only API I've integrated where the docs are shorter than the time I've spent on-call with Auth0.",
      metric: "3 weeks → 2 days",
      name: "Tomáš Kovář", role: "Lead Infrastructure Engineer", company: "Generali DeFi", initials: "TK"
    },
    {
      quote: "The 'credentials, not copies' model was the only thing our legal team needed to hear. No BIPA exposure. No GDPR audit liability. Contract signed in 48 hours.",
      metric: "Signed in 48 hours",
      name: "Layla Al-Rashid", role: "Chief Compliance Officer", company: "Sterling Fintech", initials: "LA"
    },
    {
      quote: "We reduced per-user KYC cost from $8.50 to $0.40. That's 95% — and it changed the unit economics of our entire product.",
      metric: "$8.50 → $0.40",
      name: "Brendan Okafor", role: "CEO", company: "TrustLayer Exchange", initials: "BO"
    }
  ]

  return (
    <div className="w-full bg-elevated py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-12 text-center">What compliance and engineering teams say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-8 flex flex-col gap-6">
            <Quote className="w-6 h-6 text-cta/10 fill-[#0066FF]/10" />
            <p className="text-[16px] text-text-primary leading-[1.7] flex-1">{t.quote}</p>

            <div className="self-start px-3 py-1 bg-cta/10 border border-cta/20 rounded-full">
              <span className="text-[11px] font-semibold text-cta uppercase tracking-wide">{t.metric}</span>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-elevated flex items-center justify-center text-[16px] font-bold text-text-primary">
                {t.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-text-primary">{t.name}</span>
                <span className="text-[13px] text-text-secondary">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CaseStudyPreviewSection = () => {
  return (
    <div className="w-full bg-surface py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-12 text-center">Proof, not promises</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1080px]">
        {[
          {
            tag: "CRYPTO EXCHANGE", title: "95% reduction in KYC operational cost",
            val: "95%", label: "cost reduction",
            preview: "TrustLayer moved from Onfido at $8.50/user to Solidus at $0.40. Their compliance team now processes the same volume with no additional headcount.",
            name: "Brendan Okafor", role: "CEO, TrustLayer Exchange", initials: "BO"
          },
          {
            tag: "FINTECH / BANKING", title: "GDPR and BIPA compliance — signed in 48 hours",
            val: "48h", label: "procurement to go-live",
            preview: "Sterling's legal team required zero BIPA exposure and full GDPR right-to-erasure support. Both requirements were met out of the box. No negotiation required.",
            name: "Layla Al-Rashid", role: "Chief Compliance Officer, Sterling Fintech", initials: "LA"
          },
          {
            tag: "DEFI PROTOCOL", title: "From 3-week integration to 2-day deploy",
            val: "3 wks → 2 days", label: "time to production",
            preview: "Tomáš and his team replaced a 14-step Auth0 KYC pipeline with a single Solidus API call. The credential model eliminated their document storage liability entirely.",
            name: "Tomáš Kovář", role: "Lead Infrastructure Engineer, Generali DeFi", initials: "TK"
          }
        ].map((card, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="w-full h-2 bg-cta" />
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="self-start h-6 px-2.5 bg-cta/10 border border-cta/15 rounded-full flex items-center justify-center">
                <span className="text-[11px] font-medium text-cta tracking-[0.06em] uppercase">{card.tag}</span>
              </div>
              <h3 className="text-[18px] font-semibold text-text-primary leading-tight">{card.title}</h3>

              <div className="flex items-baseline gap-2 px-3.5 py-2.5 bg-lime/10 border border-lime/20 rounded-md">
                <span className="text-[28px] font-bold text-success">{card.val}</span>
                <span className="text-[13px] text-text-secondary">{card.label}</span>
              </div>

              <p className="text-[14px] text-text-secondary leading-[1.7] line-clamp-2">{card.preview}</p>

              <div className="mt-auto pt-4 border-t border-border flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-elevated flex items-center justify-center text-[12px] font-semibold text-text-primary shrink-0">
                  {card.initials}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[13px] font-semibold text-text-primary">{card.name}</span>
                  <span className="text-[12px] text-text-secondary">{card.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 text-[14px] font-medium text-cta hover:underline flex items-center gap-1.5 group">
        Read all case studies <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}

const PricingPreviewSection = () => {
  const [isSub, setIsSub] = useState(false)

  return (
    <div className="w-full bg-surface py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-text-primary mb-3 text-center">Simple, usage-based pricing</h2>
      <p className="text-[16px] text-text-secondary mb-8 text-center">Pay per verification. No minimums. Switch plans anytime.</p>

      <div className="flex p-1 bg-elevated rounded-full mb-10">
        <button
          onClick={() => setIsSub(false)}
          className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors ${!isSub ? 'bg-bg text-white' : 'text-text-secondary'}`}
        >
          Pay as you go
        </button>
        <button
          onClick={() => setIsSub(true)}
          className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors ${isSub ? 'bg-bg text-white' : 'text-text-secondary'}`}
        >
          Subscription plans
        </button>
      </div>

      {!isSub ? (
        <div className="w-full max-w-[720px] border border-border rounded-xl overflow-hidden">
          <div className="bg-bg px-6 py-4 flex text-[12px] font-medium text-white/60">
            <div className="w-1/3">Verification Type</div>
            <div className="w-1/2">What's Included</div>
            <div className="w-1/6 text-right">Price</div>
          </div>
          <div className="flex flex-col bg-surface">
            {[
              { type: "Basic attestation", inc: "Identity attribute query", price: "$0.10" },
              { type: "Email verification", inc: "Confirmation link + bounce check", price: "$0.10", bg: "bg-elevated" },
              { type: "Phone verification", inc: "SMS OTP, global carrier", price: "$0.20" },
              { type: "KYC Level 1", inc: "Name, DOB, address — no document", price: "$1.00", bg: "bg-elevated" },
              { type: "KYC Level 2", inc: "Passport/ID + liveness check, credential issued on-chain", price: "$5.00" },
              { type: "KYC Level 3", inc: "Full background check + sanctions + PEP screening", price: "$20.00", bg: "bg-elevated" }
            ].map((row, i) => (
              <div key={i} className={`flex px-6 py-4 items-center hover:bg-cta/5 transition-colors ${row.bg ?? 'bg-surface'}`}>
                <div className="w-1/3 text-[14px] font-semibold text-text-primary">{row.type}</div>
                <div className="w-1/2 text-[14px] text-text-secondary">{row.inc}</div>
                <div className="w-1/6 text-[14px] font-bold text-text-primary text-right">{row.price}</div>
              </div>
            ))}
            <div className="px-6 py-3 bg-elevated border-t border-border">
              <span className="text-[13px] text-text-secondary">Credential issuance included in all KYC tiers — $0.01 standalone</span>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-border bg-surface text-center">
            <span className="text-[14px] text-text-secondary">
              Compare: Auth0 charges <span className="text-error font-medium">$23,000</span> per 1M operations.
              Solidus: <span className="text-success font-medium">$1,000</span> per 1M. 95% cheaper by design.
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-xl p-8 flex flex-col">
            <h3 className="text-[20px] font-bold text-text-primary mb-2">Startup</h3>
            <div className="text-[32px] font-bold text-text-primary mb-6">$99<span className="text-[16px] text-text-secondary font-normal">/mo</span></div>
            <p className="text-[14px] text-text-secondary mb-8">10,000 queries included.</p>
            <button className="mt-auto w-full py-3 rounded-lg border border-border text-[15px] font-medium text-text-primary hover:bg-elevated">Start Free Trial</button>
          </div>
          <div className="border-2 border-cta rounded-xl p-8 flex flex-col relative scale-[1.03] shadow-xl bg-surface">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cta text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">Most Popular</div>
            <h3 className="text-[20px] font-bold text-text-primary mb-2">Growth</h3>
            <div className="text-[32px] font-bold text-text-primary mb-6">$499<span className="text-[16px] text-text-secondary font-normal">/mo</span></div>
            <p className="text-[14px] text-text-secondary mb-8">100,000 queries included. Priority support.</p>
            <button className="mt-auto w-full py-3 rounded-lg bg-cta hover:bg-cta/90 text-[15px] font-bold text-white shadow-md">Start Free Trial</button>
          </div>
          <div className="border border-border rounded-xl p-8 flex flex-col">
            <h3 className="text-[20px] font-bold text-text-primary mb-2">Enterprise</h3>
            <div className="text-[32px] font-bold text-text-primary mb-6">Custom</div>
            <p className="text-[14px] text-text-secondary mb-8">Unlimited volume. Dedicated infra. SLA.</p>
            <button className="mt-auto w-full py-3 rounded-lg border border-bg text-[15px] font-medium text-text-primary hover:bg-bg hover:text-white transition-colors">Contact Sales</button>
          </div>
        </div>
      )}

      <span className="text-[13px] text-text-secondary mt-8 text-center max-w-[400px]">
        All plans include 14-day free trial and first 1,000 verifications free. No credit card required.
      </span>
    </div>
  )
}

const ROICalculatorSection = () => {
  const [vol, setVol] = useState(50000)
  const max = 1000000

  const marketCost = vol * 0.25
  const solidusCost = vol * 0.05
  const savings = marketCost - solidusCost
  const savingsPct = marketCost > 0 ? ((savings / marketCost) * 100).toFixed(1) : 0

  return (
    <div className="w-full bg-elevated py-20 px-8 md:px-[120px] flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-[36px] font-bold text-text-primary mb-3">See how much you'll save</h2>
        <p className="text-[16px] text-text-secondary max-w-[560px]">
          Enter your verification volume and see your cost with Solidus vs. the market average.
        </p>
      </div>

      <div className="w-full max-w-[800px] bg-surface rounded-xl border border-border p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-8 md:gap-12">

        {/* Left Col */}
        <div className="flex-1 md:border-r border-border md:pr-12 flex flex-col">
          <h3 className="text-[18px] font-semibold text-text-primary mb-5">Your monthly KYC volume</h3>

          <input
            type="range"
            min={0} max={max} step={1000}
            value={vol} onChange={(e) => setVol(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-border outline-none mb-4 cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0066FF 0%, #0066FF ${(vol/max)*100}%, #E0E0E5 ${(vol/max)*100}%, #E0E0E5 100%)`
            }}
          />

          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-[40px] font-bold text-cta leading-none">{vol.toLocaleString()}</span>
            <span className="text-[14px] text-text-secondary">/month</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[1000, 10000, 50000, 100000, 500000].map(p => (
              <button
                key={p} onClick={() => setVol(p)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] transition-colors border ${
                  vol === p ? 'bg-cta/10 border-cta/30 text-cta font-semibold' : 'bg-elevated border-border text-text-secondary font-medium hover:border-cta/50'
                }`}
              >
                {p >= 1000 ? `${p/1000}K` : p}
              </button>
            ))}
          </div>
        </div>

        {/* Right Col */}
        <div className="flex-1 flex flex-col gap-5 justify-center">
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-text-disabled tracking-[0.06em] uppercase mb-1">Market Average (Sumsub / Onfido)</span>
            <span className="text-[24px] font-bold text-error line-through decoration-[#FF3B30]/50">${marketCost.toLocaleString()}/mo</span>
            <span className="text-[13px] text-text-secondary mt-1">~$0.25/verification average</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-text-disabled uppercase mb-1">Solidus Verify</span>
            <span className="text-[24px] font-bold text-success">${solidusCost.toLocaleString()}/mo</span>
            <span className="text-[13px] text-text-secondary mt-1">$0.001/query · $5.00 per KYC L2 session</span>
          </div>

          <div className="w-full h-px bg-border my-1" />

          <div className="bg-lime/10 border border-lime/20 rounded-lg p-4 flex flex-col gap-1">
            <span className="text-[32px] font-bold text-success leading-tight">You save ${savings.toLocaleString()}/mo</span>
            <span className="text-[14px] text-text-secondary">That's {savingsPct}% less than the market average.</span>
          </div>

          <span className="text-[11px] text-text-disabled leading-tight">Estimates based on blended usage. Actual savings vary by verification mix and negotiated enterprise rates.</span>
        </div>
      </div>

      <button className="mt-8 h-12 px-8 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[16px] font-semibold text-white flex items-center gap-2">
        Start Free <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

const DeveloperQuickstartSection = () => {
  return (
    <div className="w-full bg-bg py-20 px-8 md:px-[120px] flex flex-col items-center">
      <h2 className="text-[36px] font-bold text-white mb-3 text-center">Integrate in minutes, not weeks</h2>
      <p className="text-[16px] text-white/60 mb-12 text-center max-w-[600px]">
        One npm package. One API call. KYC live in your app the same day.
      </p>

      <div className="w-full max-w-[1000px] flex flex-col md:flex-row gap-16 items-center">

        <div className="flex-1 flex flex-col gap-8">
          {[
            { step: 1, title: "Install", desc: "npm install @solidus/verify. Zero dependencies." },
            { step: 2, title: "Authenticate", desc: "One API key. Sandbox mode for testing." },
            { step: 3, title: "Verify", desc: "One await call returns a W3C VC." },
            { step: 4, title: "Go live", desc: "Change 'testnet' to 'mainnet'. Done." }
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-7 h-7 shrink-0 rounded-full bg-cta flex items-center justify-center text-[14px] font-bold text-white mt-0.5">{item.step}</div>
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold text-white">{item.title}</span>
                <span className="text-[14px] text-white/60">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-[480px]">
          <div className="bg-[#111D2E] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="flex items-center px-4 h-10 border-b border-white/5 bg-[#0D1520]">
              <div className="flex gap-1.5 mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <span className="text-[12px] text-white/40 font-mono">integration.js</span>
            </div>
            <pre className="p-6 text-[14px] leading-[20px] font-mono overflow-x-auto">
              <code className="text-[#E6E6E6]">
                <span className="text-[#FF7B72]">import</span> {'{'} SolidusVerify {'}'} <span className="text-[#FF7B72]">from</span> <span className="text-[#A5D6FF]">'@solidus/verify'</span>;<br/><br/>
                <span className="text-[#FF7B72]">const</span> verify = <span className="text-[#FF7B72]">new</span> <span className="text-[#D2A8FF]">SolidusVerify</span>({'{'}<br/>
                {'  '}apiKey: <span className="text-[#A5D6FF]">'sk_test_your_api_key_here'</span><br/>
                {'}'});<br/><br/>
                <span className="text-[#FF7B72]">const</span> vc = <span className="text-[#FF7B72]">await</span> verify.sessions.<span className="text-[#D2A8FF]">create</span>({'{'}<br/>
                {'  '}did: <span className="text-[#A5D6FF]">'did:solidus:mainnet:7a3b8c9d2e1f4a6b'</span>,<br/>
                {'  '}level: <span className="text-[#79C0FF]">2</span><br/>
                {'}'});
              </code>
            </pre>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-6 pl-2">
            <a href="#" className="text-[12px] font-medium text-cyan hover:underline flex items-center gap-1">View full SDK docs <ArrowRight className="w-3 h-3" /></a>
            <a href="#" className="text-[12px] font-medium text-cyan hover:underline flex items-center gap-1">Python SDK <ArrowRight className="w-3 h-3" /></a>
            <a href="#" className="text-[12px] font-medium text-cyan hover:underline flex items-center gap-1">Go SDK <ArrowRight className="w-3 h-3" /></a>
          </div>
        </div>

      </div>
    </div>
  )
}

const SignUpCTASection = () => {
  const [success, setSuccess] = useState(false)

  return (
    <div className="w-full bg-surface py-24 px-8 flex flex-col items-center">
      <h2 className="text-[40px] font-bold text-text-primary mb-3 text-center">Start verifying in minutes.</h2>
      <p className="text-[18px] text-text-secondary mb-8 text-center">Free for 1,000 verifications/month. No credit card required.</p>

      {!success ? (
        <div className="w-full max-w-[480px] flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Your work email"
              className="flex-1 h-12 rounded-lg border border-border px-4 text-[15px] outline-none focus:border-cta transition-colors"
            />
            <button
              onClick={() => setSuccess(true)}
              className="h-12 px-6 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[15px] font-semibold text-white flex items-center gap-2 whitespace-nowrap"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[12px] text-text-disabled text-center">
            By signing up you agree to our Terms of Service and Privacy Policy.
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <CheckCircle className="w-8 h-8 text-success mb-2" />
          <h3 className="text-[20px] font-semibold text-text-primary">Check your inbox</h3>
          <p className="text-[15px] text-text-secondary">We've sent login instructions to your email.</p>
        </div>
      )}
    </div>
  )
}

export default function MarketingHomePage() {
  return (
    <>
      <HeroSection />
      <DominantStatSection />
      <LiveStatsStrip />
      <PartnerLogosSection />
      <CoverageSection />
      <HowItWorksSection />
      <ReusableCredentialSection />
      <FeatureGridSection />
      <ProductDemoSection />
      <IndustryVerticalsSection />
      <ComplianceSection />
      <TestimonialsSection />
      <CaseStudyPreviewSection />
      <PricingPreviewSection />
      <ROICalculatorSection />
      <DeveloperQuickstartSection />
      <SignUpCTASection />
    </>
  )
}
