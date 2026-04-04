'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Link as LinkIcon, Award, BarChart2, CreditCard, Gamepad2,
  ScanFace, Clock, ShieldCheck, Zap, Repeat, Layers,
  EyeOff, Shuffle, Link2, CheckCircle2, XCircle, AlertTriangle, Code, ChevronRight
} from 'lucide-react';

export default function ReusableCredentialPage() {
  const [volume, setVolume] = useState<number>(50000);

  const calculateSavings = () => {
    const solidusCost = volume * 0.05;
    const traditionalCost = volume * 12.50;
    const savings = traditionalCost - solidusCost;
    return { solidusCost, traditionalCost, savings };
  };

  const { solidusCost, traditionalCost, savings } = calculateSavings();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const destinations = [
    { name: 'DEX Protocol', desc: 'Credential check', icon: BarChart2 },
    { name: 'Fintech App', desc: 'Account opening', icon: CreditCard },
    { name: 'Gaming Platform', desc: 'Age verification', icon: Gamepad2 },
  ] as const;

  return (
    <div className="min-h-screen font-sans flex flex-col">
      {/* Section 1: Hero */}
      <section className="bg-bg w-full pt-[120px] pb-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-[80px] items-center">
          <div className="max-w-[600px]">
            <div className="text-lime text-[12px] font-medium tracking-[0.08em] uppercase">
              Core Differentiator
            </div>
            <h1 className="text-white text-[56px] font-bold leading-[1.1] mt-[12px] tracking-tight">
              One verification.<br />A lifetime of trust.
            </h1>
            <p className="text-text-secondary text-[18px] leading-relaxed mt-[20px] max-w-[520px]">
              Verify once with Solidus — your credential travels with you across every integrated service. No re-uploads. No waiting. No paying $15 again.
            </p>

            <div className="flex flex-wrap gap-[40px] mt-[32px] items-baseline">
              <div>
                <div className="text-lime text-[36px] font-bold leading-tight">$0.05</div>
                <div className="text-text-secondary text-[12px] mt-1">per credential reuse</div>
              </div>
              <div>
                <div className="text-white text-[36px] font-bold leading-tight">$5.00</div>
                <div className="text-text-secondary text-[12px] mt-1">one-time verification</div>
              </div>
              <div>
                <div className="text-text-secondary text-[14px]">vs. $5–20</div>
                <div className="text-text-secondary text-[12px] mt-1">traditional re-KYC cost</div>
              </div>
            </div>

            <div className="flex gap-[12px] mt-[40px]">
              <Link href="/signup" className="bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold h-[48px] px-[24px] rounded-[8px] flex items-center justify-center transition-colors">
                Start Issuing Credentials
              </Link>
              <Link href="/docs" className="bg-transparent border border-white/20 hover:bg-white/5 text-white text-[14px] font-medium h-[48px] px-[24px] rounded-[8px] flex items-center justify-center transition-colors">
                View Technical Docs
              </Link>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-[16px] p-[32px] flex flex-col items-center relative">
            {/* Top Node */}
            <div className="flex flex-col items-center">
              <div className="w-[48px] h-[48px] bg-elevated rounded-full flex items-center justify-center border border-border">
                <ScanFace className="text-white w-6 h-6" />
              </div>
              <div className="text-white text-[13px] font-medium mt-[12px]">User verified once</div>
              <div className="text-text-secondary text-[11px] mt-1">Government ID + Liveness · $5.00</div>

              <div className="mt-[12px] bg-[rgba(168,230,0,0.15)] text-lime text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                W3C Verifiable Credential · BBS+ Signed
              </div>
            </div>

            {/* Arrow down */}
            <div className="h-[40px] w-[2px] bg-elevated my-[16px] flex items-center justify-center relative">
              <div className="bg-surface p-1 absolute">
                <LinkIcon className="text-cyan w-4 h-4" />
              </div>
            </div>

            {/* DID Wallet Node */}
            <div className="bg-elevated rounded-[12px] px-[24px] py-[16px] flex items-center gap-4 border border-border shadow-[0_0_24px_rgba(0,212,255,0.15)] z-10">
              <Award className="text-cyan w-[24px] h-[24px]" />
              <div>
                <div className="text-white text-[14px] font-semibold">DID Wallet</div>
                <div className="text-text-secondary text-[12px]">On-chain · Permanent · Yours</div>
              </div>
            </div>

            {/* Forks */}
            <div className="relative w-[320px] h-[40px] mt-[8px]">
              <div className="absolute top-0 left-1/2 w-[2px] h-[20px] bg-elevated -translate-x-1/2" />
              <div className="absolute top-[20px] left-[20px] right-[20px] h-[1px] bg-elevated" />
              <div className="absolute top-[20px] left-[20px] w-[1px] h-[20px] bg-elevated" />
              <div className="absolute top-[20px] left-1/2 w-[1px] h-[20px] bg-elevated -translate-x-1/2" />
              <div className="absolute top-[20px] right-[20px] w-[1px] h-[20px] bg-elevated" />
            </div>

            {/* Destinations */}
            <div className="flex gap-[12px] w-full justify-center">
              {destinations.map((dest, i) => (
                <div key={i} className="bg-elevated border border-border rounded-[8px] p-[12px] w-[140px] flex flex-col items-center text-center relative">
                  <dest.icon className="text-cta w-[20px] h-[20px] mb-2" />
                  <div className="text-white text-[13px] font-semibold">{dest.name}</div>
                  <div className="text-text-secondary text-[11px] mt-0.5">{dest.desc}</div>

                  <div className="mt-2 w-full flex flex-col items-center gap-1">
                    <div className="bg-[rgba(52,199,89,0.15)] text-success text-[11px] font-medium px-2 py-0.5 rounded-full w-full">
                      $0.05 / reuse
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-error text-[11px] line-through decoration-[#FF3B30]/50">$5.00</span>
                      <span className="text-text-secondary text-[11px]">vs. $5–15</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How Credential Portability Works */}
      <section className="bg-elevated w-full py-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            How it works
          </div>
          <h2 className="text-text-primary text-[36px] font-bold mt-[12px]">
            Three steps. One credential.
          </h2>
          <p className="text-text-secondary text-[18px] mt-[12px] max-w-[560px]">
            Solidus replaces the repeat-KYC cycle with a portable, cryptographically-verified credential you control.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] mt-[56px]">
            {/* Step 1 */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[rgba(168,230,0,0.12)] border border-[rgba(168,230,0,0.25)] text-lime text-[14px] font-bold w-[32px] h-[32px] flex items-center justify-center rounded-full mb-6">
                01
              </div>
              <ScanFace className="text-cta w-[40px] h-[40px]" />
              <h3 className="text-text-primary text-[22px] font-semibold mt-[16px]">Verify with Solidus</h3>
              <p className="text-text-secondary text-[16px] mt-[8px] flex-grow">
                Submit your government-issued ID and complete a 5-second liveness check. One-time process. $5.00 for KYC L2. The system never stores your face scan after processing.
              </p>
              <div className="bg-[rgba(0,102,255,0.06)] border border-[rgba(0,102,255,0.15)] rounded-[8px] px-[12px] py-[8px] mt-[20px] flex items-center gap-2 w-full">
                <Clock className="text-cta w-[14px] h-[14px]" />
                <span className="text-text-primary text-[13px] font-medium">~90 seconds to complete</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] text-cyan text-[14px] font-bold w-[32px] h-[32px] flex items-center justify-center rounded-full mb-6">
                02
              </div>
              <Award className="text-cyan w-[40px] h-[40px]" />
              <h3 className="text-text-primary text-[22px] font-semibold mt-[16px]">Credential issued to wallet</h3>
              <p className="text-text-secondary text-[16px] mt-[8px] flex-grow">
                Your identity is cryptographically signed and issued as a W3C Verifiable Credential. It&apos;s written to your DID wallet on the Solidus blockchain — permanent, tamper-proof, and yours.
              </p>
              <div className="bg-[rgba(52,199,89,0.06)] border border-[rgba(52,199,89,0.15)] rounded-[8px] px-[12px] py-[8px] mt-[20px] flex items-center gap-2 w-full">
                <ShieldCheck className="text-success w-[14px] h-[14px]" />
                <span className="text-text-primary text-[13px] font-medium">BBS+ signed · on-chain anchor</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[rgba(168,230,0,0.12)] border border-[rgba(168,230,0,0.25)] text-lime text-[14px] font-bold w-[32px] h-[32px] flex items-center justify-center rounded-full mb-6">
                03
              </div>
              <Zap className="text-lime w-[40px] h-[40px]" />
              <h3 className="text-text-primary text-[22px] font-semibold mt-[16px]">Present instantly, anywhere</h3>
              <p className="text-text-secondary text-[16px] mt-[8px] flex-grow">
                When any Solidus-integrated service needs to verify you, you present your credential — no re-upload, no waiting, no new forms. The verifying service pays $0.05. You pay nothing.
              </p>
              <div className="bg-[rgba(168,230,0,0.12)] border border-[rgba(168,230,0,0.25)] rounded-[8px] px-[12px] py-[8px] mt-[20px] flex items-center gap-2 w-full">
                <Repeat className="text-lime w-[14px] h-[14px]" />
                <span className="text-text-primary text-[13px] font-medium">1-click re-use · $0.05 per presentation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cost Savings Calculator */}
      <section className="bg-surface w-full py-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase text-center w-full">
            Cost Calculator
          </div>
          <h2 className="text-text-primary text-[36px] font-bold mt-[12px] text-center w-full">
            See how much you save
          </h2>
          <p className="text-text-secondary text-[18px] mt-[12px] text-center max-w-[600px] w-full">
            Drag the slider to your monthly re-verification volume and see your projected savings.
          </p>

          <div className="bg-elevated border border-border rounded-[12px] p-[40px] mt-[48px] max-w-[800px] w-full shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div className="text-text-primary text-[14px] font-medium">Monthly re-verifications</div>
              <div className="text-cta text-[28px] font-bold leading-none">
                {new Intl.NumberFormat('en-US').format(volume)}
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="1000000"
              step="5000"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-[6px] bg-border rounded-full appearance-none cursor-pointer outline-none accent-[#0066FF]"
            />
            <div className="flex justify-between text-text-disabled text-[12px] mt-2 font-medium">
              <span>0</span>
              <span>250K</span>
              <span>500K</span>
              <span>750K</span>
              <span>1M</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[32px]">
              {/* With Solidus */}
              <div className="bg-surface border border-[rgba(52,199,89,0.30)] rounded-[12px] p-[24px] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>
                <h3 className="text-success text-[16px] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> With Solidus
                </h3>

                <div className="flex justify-between mt-6 items-center">
                  <span className="text-text-secondary text-sm">Initial verifications</span>
                  <span className="text-text-primary text-sm font-medium">By user</span>
                </div>

                <div className="flex justify-between mt-3 items-center">
                  <span className="text-text-secondary text-sm">Re-verifications @ $0.05</span>
                  <span className="text-success text-[16px] font-bold">{formatCurrency(solidusCost)}</span>
                </div>

                <div className="w-full h-[1px] bg-border my-4"></div>

                <div className="flex justify-between items-end">
                  <span className="text-text-secondary text-sm font-medium mb-1">Monthly total</span>
                  <span className="text-text-primary text-[28px] font-bold leading-none">{formatCurrency(solidusCost)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-text-secondary text-sm">Annual total</span>
                  <span className="text-text-secondary text-[16px]">{formatCurrency(solidusCost * 12)}</span>
                </div>
              </div>

              {/* Without Solidus */}
              <div className="bg-surface border border-[rgba(255,59,48,0.20)] rounded-[12px] p-[24px] shadow-sm relative overflow-hidden opacity-90">
                <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
                <h3 className="text-error text-[16px] font-semibold flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Traditional KYC
                </h3>

                <div className="flex justify-between mt-6 items-center">
                  <span className="text-text-secondary text-sm">Initial verifications</span>
                  <span className="text-text-primary text-sm font-medium">By user / platform</span>
                </div>

                <div className="flex justify-between mt-3 items-center">
                  <span className="text-text-secondary text-sm">Re-verifications @ $12.50</span>
                  <span className="text-error text-[16px] font-bold">{formatCurrency(traditionalCost)}</span>
                </div>

                <div className="w-full h-[1px] bg-border my-4"></div>

                <div className="flex justify-between items-end">
                  <span className="text-text-secondary text-sm font-medium mb-1">Monthly total</span>
                  <span className="text-text-primary text-[28px] font-bold leading-none">{formatCurrency(traditionalCost)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-text-secondary text-sm">Annual total</span>
                  <span className="text-text-secondary text-[16px]">{formatCurrency(traditionalCost * 12)}</span>
                </div>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="bg-bg rounded-[12px] p-[24px] mt-[24px] text-center w-full">
              <div className="text-text-secondary text-[12px] font-medium tracking-wide uppercase mb-2">You Save</div>
              <div className="flex flex-col sm:flex-row items-baseline justify-center gap-3">
                <div className="text-lime text-[48px] font-bold leading-none">{formatCurrency(savings)}</div>
                <div className="text-white text-[16px]">per month</div>
              </div>
              <p className="text-text-secondary text-[14px] mt-3">
                compared to traditional re-KYC at an average of $12.50 per re-verification.
              </p>
            </div>

            <p className="text-text-disabled text-[12px] mt-[16px] text-center">
              Estimates based on industry average re-verification cost of $12.50. Actual savings vary by provider and volume.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Technical Architecture */}
      <section className="bg-elevated w-full py-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            Under the hood
          </div>
          <h2 className="text-text-primary text-[36px] font-bold mt-[12px]">
            W3C Verifiable Credentials + BBS+ Signatures
          </h2>
          <p className="text-text-secondary text-[18px] mt-[12px] max-w-[600px]">
            Solidus credentials follow the W3C VC Data Model 2.0. BBS+ signatures enable selective disclosure — users can prove attributes without revealing everything.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[580px_1fr] gap-[64px] mt-[56px]">
            {/* Left: Code Block */}
            <div className="bg-bg border border-border rounded-[12px] overflow-hidden shadow-lg">
              <div className="bg-surface border-b border-border px-[20px] py-[12px] flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#FF5F57]"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-[#28C840]"></div>
                </div>
                <div className="text-text-secondary text-[12px] font-mono">credential.json</div>
              </div>
              <div className="p-[24px] overflow-x-auto">
                <pre className="font-mono text-[13px] leading-[1.6]">
                  <span className="text-text-secondary">{'{'}</span>{'\n'}
                  {'  '}<span className="text-cyan">&quot;@context&quot;</span><span className="text-text-secondary">: [</span>{'\n'}
                  {'    '}<span className="text-lime">&quot;https://www.w3.org/ns/credentials/v2&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-lime">&quot;https://solidus.network/vc/identity/v1&quot;</span>{'\n'}
                  {'  '}<span className="text-text-secondary">],</span>{'\n'}
                  {'  '}<span className="text-cyan">&quot;type&quot;</span><span className="text-text-secondary">: [</span><span className="text-lime">&quot;VerifiableCredential&quot;</span><span className="text-text-secondary">, </span><span className="text-lime">&quot;KYCCredential&quot;</span><span className="text-text-secondary">],</span>{'\n'}
                  {'  '}<span className="text-cyan">&quot;issuer&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;did:solidus:mainnet:b8a3f6c2e9d1047e&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'  '}<span className="text-cyan">&quot;issuanceDate&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;2026-03-17T14:22:00Z&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'  '}<span className="text-cyan">&quot;credentialSubject&quot;</span><span className="text-text-secondary">: {'{'}</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;id&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;did:solidus:mainnet:7a3b8c9d2e1f4a6b&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;kycLevel&quot;</span><span className="text-text-secondary">: </span><span className="text-warning">2</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;nationality&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;DE&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;ageVerified&quot;</span><span className="text-text-secondary">: </span><span className="text-warning">true</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;pepScreened&quot;</span><span className="text-text-secondary">: </span><span className="text-warning">true</span>{'\n'}
                  {'  '}<span className="text-text-secondary">{'}'},</span>{'\n'}
                  {'  '}<span className="text-cyan">&quot;proof&quot;</span><span className="text-text-secondary">: {'{'}</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;type&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;BbsBlsSignature2020&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;verificationMethod&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;did:solidus:mainnet:b8a3f6c2e9d1047e#key-1&quot;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'    '}<span className="text-cyan">&quot;proofValue&quot;</span><span className="text-text-secondary">: </span><span className="text-lime">&quot;z5...Kw==&quot;</span>{'\n'}
                  {'  '}<span className="text-text-secondary">{'}'}</span>{'\n'}
                  <span className="text-text-secondary">{'}'}</span>
                </pre>
              </div>
            </div>

            {/* Right: Architecture Explanation Cards */}
            <div className="flex flex-col gap-[16px]">
              <div className="bg-surface border border-border rounded-[12px] py-[20px] px-[24px] shadow-sm">
                <Layers className="text-cta w-[20px] h-[20px]" />
                <h3 className="text-text-primary text-[16px] font-semibold mt-[8px]">W3C VC Data Model 2.0</h3>
                <p className="text-text-secondary text-[14px] mt-1">
                  Credentials follow the open W3C standard — compatible with any conformant verifier worldwide. Not a proprietary format.
                </p>
              </div>
              <div className="bg-surface border border-border rounded-[12px] py-[20px] px-[24px] shadow-sm">
                <EyeOff className="text-cta w-[20px] h-[20px]" />
                <h3 className="text-text-primary text-[16px] font-semibold mt-[8px]">Selective Disclosure via BBS+</h3>
                <p className="text-text-secondary text-[14px] mt-1">
                  Using BBS+ signatures, users can prove they are over 18 without revealing date of birth — or prove nationality without sharing address. The credential holder chooses what to share.
                </p>
              </div>
              <div className="bg-surface border border-border rounded-[12px] py-[20px] px-[24px] shadow-sm">
                <LinkIcon className="text-cyan w-[20px] h-[20px]" />
                <h3 className="text-text-primary text-[16px] font-semibold mt-[8px]">On-Chain Anchor</h3>
                <p className="text-text-secondary text-[14px] mt-1">
                  Every credential issuance event is anchored to the Solidus blockchain with a transaction hash. Verifiers can independently confirm issuance without contacting Solidus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Use Cases */}
      <section className="bg-surface w-full py-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            Use Cases
          </div>
          <h2 className="text-text-primary text-[36px] font-bold mt-[12px]">
            Where portable credentials change everything
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[48px]">
            {/* Card 1 */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
              <div className="bg-[rgba(0,102,255,0.08)] p-[10px] rounded-[12px] mb-[20px]">
                <Shuffle className="text-cta w-[40px] h-[40px]" />
              </div>
              <h3 className="text-text-primary text-[20px] font-semibold">DeFi Re-authentication</h3>
              <p className="text-text-secondary text-[15px] mt-[8px] flex-grow">
                DEX protocols require MiCA-compliant KYC before swaps above €1,000. With Solidus credentials, users who already verified with any partner service pass instantly — no wallet friction, no new KYC forms.
              </p>
              <div className="bg-[rgba(168,230,0,0.08)] border border-[rgba(168,230,0,0.20)] rounded-[8px] px-[12px] py-[6px] mt-[20px] text-lime text-[13px] font-semibold">
                100ms credential check
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
              <div className="bg-[rgba(0,102,255,0.08)] p-[10px] rounded-[12px] mb-[20px]">
                <Repeat className="text-cta w-[40px] h-[40px]" />
              </div>
              <h3 className="text-text-primary text-[20px] font-semibold">Cross-Exchange KYC Sharing</h3>
              <p className="text-text-secondary text-[15px] mt-[8px] flex-grow">
                A user verified on Exchange A can onboard to Exchange B with a single credential presentation. Exchange B saves $12–18 per user in KYC costs. Both exchanges share FATF Travel Rule compliance data without sharing PII.
              </p>
              <div className="bg-[rgba(168,230,0,0.08)] border border-[rgba(168,230,0,0.20)] rounded-[8px] px-[12px] py-[6px] mt-[20px] text-lime text-[13px] font-semibold">
                96% cost reduction per shared user
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface border border-border rounded-[12px] p-[32px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
              <div className="bg-[rgba(0,102,255,0.08)] p-[10px] rounded-[12px] mb-[20px]">
                <Link2 className="text-cta w-[40px] h-[40px]" />
              </div>
              <h3 className="text-text-primary text-[20px] font-semibold">Fintech Account Linking</h3>
              <p className="text-text-secondary text-[15px] mt-[8px] flex-grow">
                Open banking and PSD2 account aggregation require identity verification at every new service. Portable Solidus credentials satisfy PSD2 SCA requirements while eliminating per-app re-KYC — users link five accounts, verify once.
              </p>
              <div className="bg-[rgba(168,230,0,0.08)] border border-[rgba(168,230,0,0.20)] rounded-[8px] px-[12px] py-[6px] mt-[20px] text-lime text-[13px] font-semibold">
                2–3 day onboarding → 90 seconds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Comparison Table */}
      <section className="bg-elevated w-full py-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            Comparison
          </div>
          <h2 className="text-text-primary text-[36px] font-bold mt-[12px]">
            Reusable credentials vs. traditional repeated KYC
          </h2>

          <div className="bg-surface border border-border rounded-[12px] overflow-hidden mt-[48px] shadow-sm overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="bg-elevated border-b border-border h-[48px] flex">
                <div className="w-[35%] px-6 flex items-center text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Feature</div>
                <div className="w-[32.5%] px-6 flex items-center justify-center text-text-secondary text-[12px] font-medium uppercase tracking-[0.04em]">Traditional KYC</div>
                <div className="w-[32.5%] px-6 flex items-center justify-center text-cta text-[12px] font-bold uppercase tracking-[0.04em] bg-[rgba(0,102,255,0.04)] border-l border-border/50">Solidus Reusable</div>
              </div>

              {[
                {
                  feature: "Cost per re-verification",
                  trad: { text: "~$5–20 per user", icon: XCircle, color: "#FF3B30" },
                  sol: { text: "$0.05 per presentation", icon: CheckCircle2, color: "#34C759", bold: true }
                },
                {
                  feature: "User data stored",
                  trad: { text: "Full PII on vendor servers", icon: XCircle, color: "#FF3B30" },
                  sol: { text: "Zero biometric data stored", icon: CheckCircle2, color: "#34C759", bold: false }
                },
                {
                  feature: "Re-verification time",
                  trad: { text: "2–5 business days", icon: AlertTriangle, color: "#FF9500" },
                  sol: { text: "< 100ms credential check", icon: CheckCircle2, color: "#34C759", bold: false }
                },
                {
                  feature: "GDPR exposure",
                  trad: { text: "High — multiple data processors", icon: XCircle, color: "#FF3B30" },
                  sol: { text: "Minimal — user holds credential", icon: CheckCircle2, color: "#34C759", bold: false }
                },
                {
                  feature: "Cross-platform",
                  trad: { text: "Not supported — silo per vendor", icon: XCircle, color: "#FF3B30" },
                  sol: { text: "Native — any Solidus integrator", icon: CheckCircle2, color: "#34C759", bold: false }
                },
                {
                  feature: "Standard",
                  trad: { text: "Proprietary, vendor lock-in", icon: AlertTriangle, color: "#8E8E93" },
                  sol: { text: "W3C VC Data Model 2.0", icon: CheckCircle2, color: "#34C759", bold: false }
                },
                {
                  feature: "Audit trail",
                  trad: { text: "Vendor-held, opaque", icon: AlertTriangle, color: "#8E8E93" },
                  sol: { text: "Blockchain-anchored, independent", icon: CheckCircle2, color: "#34C759", bold: false }
                }
              ].map((row, i) => (
                <div key={i} className={`h-[52px] flex border-b border-border text-[14px] ${i % 2 === 0 ? 'bg-surface' : 'bg-elevated'}`}>
                  <div className="w-[35%] px-6 flex items-center text-text-primary font-medium">
                    {row.feature}
                  </div>
                  <div className="w-[32.5%] px-6 flex items-center justify-center text-text-secondary">
                    <div className="flex items-center gap-2">
                      <row.trad.icon style={{ color: row.trad.color }} className="w-[14px] h-[14px]" />
                      <span style={{ color: row.trad.color === '#8E8E93' ? '#666666' : row.trad.color }}>{row.trad.text}</span>
                    </div>
                  </div>
                  <div className="w-[32.5%] px-6 flex items-center justify-center text-text-secondary bg-[rgba(0,102,255,0.04)] border-l border-border/50">
                    <div className="flex items-center gap-2">
                      <row.sol.icon style={{ color: row.sol.color }} className="w-[14px] h-[14px]" />
                      <span style={{ color: row.sol.color }} className={row.sol.bold ? 'font-bold' : ''}>{row.sol.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Developer Integration */}
      <section className="bg-surface w-full py-[100px] px-8 sm:px-[120px] flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            For Developers
          </div>
          <h2 className="text-text-primary text-[36px] font-bold mt-[12px]">
            Two lines to request a credential presentation
          </h2>
          <p className="text-text-secondary text-[18px] mt-[12px] max-w-[560px]">
            The Verify SDK handles all credential negotiation, cryptographic verification, and on-chain confirmation. You write the business logic.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[560px_1fr] gap-[64px] mt-[48px]">
            {/* Left: Code Block */}
            <div className="bg-bg border border-border rounded-[12px] overflow-hidden shadow-lg">
              <div className="bg-surface border-b border-border px-[20px] py-[12px] flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#FF5F57]"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-[#28C840]"></div>
                </div>
                <div className="text-text-secondary text-[12px] font-mono">verify-credential.js</div>
              </div>
              <div className="p-[24px] overflow-x-auto">
                <pre className="font-mono text-[13px] leading-[1.6]">
                  <span className="text-cyan">import</span> <span className="text-text-secondary">{'{ VerifyClient }'}</span> <span className="text-cyan">from</span> <span className="text-lime">&apos;@solidus/verify-sdk&apos;</span><span className="text-text-secondary">;</span>{'\n\n'}
                  <span className="text-cyan">const</span> <span className="text-white">client</span> <span className="text-cyan">= new</span> <span className="text-cta">VerifyClient</span><span className="text-text-secondary">({'{'} apiKey: process.env.SOLIDUS_API_KEY {'}'});</span>{'\n\n'}
                  <span className="text-text-disabled">// Request credential presentation from a DID</span>{'\n'}
                  <span className="text-cyan">const</span> <span className="text-white">result</span> <span className="text-cyan">= await</span> <span className="text-white">client.credentials.</span><span className="text-cta">present</span><span className="text-text-secondary">({'{'}</span>{'\n'}
                  {'  '}<span className="text-white">did:</span> <span className="text-lime">&apos;did:solidus:mainnet:7a3b8c9d2e1f4a6b&apos;</span><span className="text-text-secondary">,</span>{'\n'}
                  {'  '}<span className="text-white">scope:</span> <span className="text-text-secondary">[</span><span className="text-lime">&apos;kycLevel&apos;</span><span className="text-text-secondary">, </span><span className="text-lime">&apos;nationality&apos;</span><span className="text-text-secondary">, </span><span className="text-lime">&apos;ageVerified&apos;</span><span className="text-text-secondary">],</span>{'\n'}
                  {'  '}<span className="text-white">minimumLevel:</span> <span className="text-warning">2</span>{'\n'}
                  <span className="text-text-secondary">{'}'});</span>{'\n\n'}
                  <span className="text-cyan">if</span> <span className="text-text-secondary">(result.verified) {'{'}</span>{'\n'}
                  {'  '}<span className="text-text-disabled">// User is verified — proceed with onboarding</span>{'\n'}
                  {'  '}<span className="text-white">console.</span><span className="text-cta">log</span><span className="text-text-secondary">(</span><span className="text-lime">{"`KYC Level: ${result.claims.kycLevel}`"}</span><span className="text-text-secondary">);</span>{'\n'}
                  {'  '}<span className="text-white">console.</span><span className="text-cta">log</span><span className="text-text-secondary">(</span><span className="text-lime">{"`Cost: ${result.cost}`"}</span><span className="text-text-secondary">); </span><span className="text-text-disabled">// → &quot;$0.05&quot;</span>{'\n'}
                  <span className="text-text-secondary">{'}'}</span>
                </pre>
              </div>
            </div>

            {/* Right: Feature Rows */}
            <div className="flex flex-col justify-center gap-[24px]">
              <div className="flex gap-4">
                <div className="mt-1"><Zap className="text-cta w-[20px] h-[20px]" /></div>
                <div>
                  <h3 className="text-text-primary text-[16px] font-semibold">{'< 100ms response time'}</h3>
                  <p className="text-text-secondary text-[14px] mt-1">Credential verification resolves in under 100ms — synchronous, in the request lifecycle.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><ShieldCheck className="text-success w-[20px] h-[20px]" /></div>
                <div>
                  <h3 className="text-text-primary text-[16px] font-semibold">Cryptographic proof, not a database lookup</h3>
                  <p className="text-text-secondary text-[14px] mt-1">Every verification call validates the BBS+ signature and on-chain anchor. No central authority required.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Code className="text-cta w-[20px] h-[20px]" /></div>
                <div>
                  <h3 className="text-text-primary text-[16px] font-semibold">SDKs: JavaScript · Python · Go</h3>
                  <p className="text-text-secondary text-[14px] mt-1">OpenAPI spec available. REST API for any language. Webhooks for async events.</p>
                </div>
              </div>

              <div className="flex items-center gap-[12px] mt-[16px]">
                <Link href="/docs" className="text-cta text-[14px] font-medium hover:underline flex items-center">
                  View SDK docs <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
                <span className="text-text-secondary">·</span>
                <Link href="/docs/api" className="text-cta text-[14px] font-medium hover:underline flex items-center">
                  API Reference <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="bg-bg w-full py-[100px] px-8 sm:px-[120px] flex justify-center text-center">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          <h2 className="text-white text-[40px] font-bold">Start issuing portable credentials today.</h2>
          <p className="text-text-secondary text-[18px] mt-[16px] max-w-[520px]">
            Join the identity layer of the internet. Verify users once. Let them reuse their credentials everywhere.
          </p>

          <div className="flex gap-[12px] mt-[40px]">
            <Link href="/signup" className="bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold h-[48px] px-[24px] rounded-[8px] flex items-center justify-center transition-colors">
              Start Free Trial
            </Link>
            <Link href="/sales" className="bg-transparent border border-white/20 hover:bg-white/5 text-white text-[14px] font-medium h-[48px] px-[24px] rounded-[8px] flex items-center justify-center transition-colors">
              Talk to Sales
            </Link>
          </div>

          <div className="flex items-center gap-[32px] mt-[40px]">
            <span className="text-text-secondary text-[13px]">No credit card required</span>
            <span className="text-text-secondary text-[13px]">·</span>
            <span className="text-text-secondary text-[13px]">99.4% success rate</span>
            <span className="text-text-secondary text-[13px]">·</span>
            <span className="text-text-secondary text-[13px]">180+ countries</span>
          </div>
        </div>
      </section>
    </div>
  );
}
