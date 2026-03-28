'use client';

import React, { useState } from 'react';
import {
  Search, ChevronDown, Copy, Check, ChevronRight
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: 'Authentication',
    items: ['API Keys', 'Environments']
  },
  {
    title: 'Verifications',
    items: ['Create Session', 'Get Session', 'List Sessions', 'Cancel Session']
  },
  {
    title: 'Credentials',
    items: ['Issue Credential', 'Verify Credential', 'Revoke Credential']
  },
  {
    title: 'Webhooks',
    items: ['Events Reference', 'Signature Verification', 'Retry Logic']
  },
  {
    title: 'DIDs',
    items: ['Resolve DID', 'Register DID']
  },
  {
    title: 'SDKs',
    items: ['JavaScript', 'Python', 'Go', 'React Native']
  }
];

const PARAMS = [
  { name: 'did', type: 'string', req: true, desc: "The subject's DID. W3C DID format (did:solidus:, did:ethr:, did:key:)" },
  { name: 'level', type: 'integer', req: true, desc: 'Verification level: 1 (basic), 2 (passport + liveness), 3 (enhanced)' },
  { name: 'redirect_url', type: 'string', req: true, desc: 'URL to redirect user after verification completes' },
  { name: 'metadata', type: 'object', req: false, desc: 'Arbitrary key-value pairs attached to the session' },
  { name: 'webhook_url', type: 'string', req: false, desc: "Override endpoint for this session's webhooks" },
  { name: 'expires_in', type: 'integer', req: false, desc: 'Session TTL in seconds (default: 3600)' },
];

const CODE_EXAMPLE = `POST https://api.verify.solidus.network/v2/sessions
Authorization: Bearer sk_live_••••••••••••••••••••34ab
Content-Type: application/json

{
  "did": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",
  "level": 2,
  "redirect_url": "https://app.acmecorp.com/verify/done",
  "metadata": {
    "userId": "usr_7a3b8c9d",
    "orderId": "ord_5b4a3291"
  }
}`;

const RESPONSE_EXAMPLE = `{
  "id": "vsn_9f8e7d6c5b4a3291",
  "did": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",
  "level": 2,
  "status": "pending",
  "url": "https://verify.solidus.network/s/vsn_9f8e7d6c",
  "expires_at": 1773666000,
  "created_at": 1773662400,
  "webhook_url": null,
  "metadata": { "userId": "usr_7a3b8c9d" }
}`;

const ISSUE_CREDENTIAL_PARAMS = [
  { name: 'session_id', type: 'string', req: true, desc: 'Completed verification session ID (vsn_...)' },
  { name: 'subject_did', type: 'string', req: true, desc: "The subject's DID (must match the verified session)" },
  { name: 'credential_type', type: 'string', req: true, desc: 'Credential type: email_verified, phone_verified, kyc_l1, kyc_l2, kyc_l3' },
  { name: 'expires_in', type: 'integer', req: false, desc: 'Credential validity in days (default: 365)' },
  { name: 'metadata', type: 'object', req: false, desc: 'Custom key-value pairs attached to the credential' },
];

const ISSUE_CODE_EXAMPLE = `POST https://api.verify.solidus.network/v2/credentials/issue
Authorization: Bearer sk_live_••••••••••••••••••••34ab
Content-Type: application/json

{
  "session_id": "vsn_9f8e7d6c5b4a3291",
  "subject_did": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",
  "credential_type": "kyc_l2",
  "expires_in": 365,
  "metadata": {
    "issuerRole": "compliance_officer"
  }
}`;

const ISSUE_RESPONSE_EXAMPLE = `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5",
  "type": [
    "VerifiableCredential",
    "KYCCredentialL2"
  ],
  "issuer": "did:solidus:mainnet:b8a3f6c2e9d1047e",
  "issuanceDate": "2026-03-18T12:00:00Z",
  "expirationDate": "2026-03-18T12:00:00Z",
  "credentialSubject": {
    "id": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",
    "kyc_level": 2,
    "verified_at": "2026-03-18T11:58:32Z"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2026-03-18T12:00:00Z",
    "verificationMethod": "did:solidus:mainnet:b8a3f6c2e9d1047e#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3u7..."
  }
}`;

export default function ApiDocsPage() {
  const [activeItem, setActiveItem] = useState('Create Session');
  const [expandedSection, setExpandedSection] = useState('Verifications');

  const isIssueCredential = activeItem === 'Issue Credential';
  const currentParams = isIssueCredential ? ISSUE_CREDENTIAL_PARAMS : PARAMS;
  const currentCode = isIssueCredential ? ISSUE_CODE_EXAMPLE : CODE_EXAMPLE;
  const currentResponse = isIssueCredential ? ISSUE_RESPONSE_EXAMPLE : RESPONSE_EXAMPLE;
  const currentTabs = isIssueCredential
    ? ['201 Created', '400 Bad Request', '401 Unauthorized', '404 Session Not Found', '422 Session Not Complete']
    : ['200 OK', '400 Bad Request', '401 Unauthorized', '422 Unprocessable', '429 Rate Limited'];

  const [copiedReq, setCopiedReq] = useState(false);
  const [copiedRes, setCopiedRes] = useState(false);
  const [activeResTab, setActiveResTab] = useState('200 OK');

  const handleNavItemClick = (item: string, sectionTitle: string) => {
    setActiveItem(item);
    setExpandedSection(sectionTitle);
    if (item === 'Issue Credential') {
      setActiveResTab('201 Created');
    } else {
      setActiveResTab('200 OK');
    }
  };

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden animate-in fade-in duration-500 text-text-primary font-sans antialiased">

      {/* Left Nav Panel (280px) */}
      <div className="w-[280px] shrink-0 bg-surface border-r border-border flex flex-col h-full z-10 relative">
        <div className="p-6 pb-4 flex flex-col gap-6">

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logos/solidus_dark.png" alt="Solidus Verify" className="h-6 object-contain" />
              <div className="h-4 w-px bg-border" />
              <h3 className="text-[16px] font-semibold text-white">API Reference</h3>
            </div>

            <div className="relative">
              <select className="h-8 w-full bg-elevated border border-border rounded-md px-3 text-[13px] text-white outline-none appearance-none pr-8">
                <option>v2 (Latest)</option>
                <option>v1 (Legacy)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search API..."
              className="h-9 w-full bg-elevated border border-border rounded-md pl-9 pr-3 text-[13px] text-white outline-none placeholder:text-text-secondary focus:border-cta transition-colors"
            />
          </div>

        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 flex flex-col gap-6">
          {NAV_SECTIONS.map((navSection) => (
            <div key={navSection.title} className="flex flex-col gap-2">
              <button
                onClick={() => setExpandedSection(expandedSection === navSection.title ? '' : navSection.title)}
                className={`flex items-center justify-between text-[12px] font-semibold uppercase tracking-wider px-2 hover:text-white transition-colors w-full text-left ${
                  expandedSection === navSection.title ? 'text-white' : 'text-text-secondary'
                }`}
              >
                <span>{navSection.title}</span>
                {expandedSection === navSection.title ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {expandedSection === navSection.title && (
                <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
                  {navSection.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavItemClick(item, navSection.title)}
                      className={`flex items-center px-2 py-1.5 text-[13px] font-medium transition-colors relative rounded-md ${
                        activeItem === item
                          ? 'text-white bg-elevated'
                          : 'text-text-secondary hover:text-white hover:bg-elevated/50'
                      }`}
                    >
                      {activeItem === item && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-cta rounded-r-full" />
                      )}
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center + Right Split */}
      <div className="flex-1 flex overflow-hidden">

        {/* Center Content (flex, max 840px) */}
        <div className="flex-1 max-w-[840px] shrink-0 overflow-y-auto bg-bg">
          <div className="p-10 flex flex-col gap-10">

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-cta px-2.5 py-1 rounded text-[14px] font-bold text-white leading-none">POST</span>
                <span className="text-[16px] font-mono text-cyan">
                  {isIssueCredential ? '/v2/credentials/issue' : '/v2/sessions'}
                </span>
              </div>
              <h1 className="text-[32px] font-bold text-white leading-tight">
                {isIssueCredential ? 'Issue Verifiable Credential' : 'Create Verification Session'}
              </h1>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                {isIssueCredential
                  ? "Issues a W3C Verifiable Credential to a subject's DID. Requires a completed verification session at the required level."
                  : 'Creates a new KYC verification session. Returns a session ID and a URL to redirect the user to complete their verification.'
                }
              </p>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="flex flex-col gap-4">
              <h2 className="text-[20px] font-semibold text-white">Request Parameters</h2>
              <div className="bg-elevated rounded-lg border border-border overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-[13px] font-medium text-text-secondary w-[20%]">Parameter</th>
                      <th className="py-3 px-4 text-[13px] font-medium text-text-secondary w-[15%]">Type</th>
                      <th className="py-3 px-4 text-[13px] font-medium text-text-secondary w-[15%]">Required</th>
                      <th className="py-3 px-4 text-[13px] font-medium text-text-secondary w-[50%]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentParams.map((param) => (
                      <tr key={param.name}>
                        <td className="py-3 px-4 align-top">
                          <span className="font-mono text-[13px] text-cyan">{param.name}</span>
                        </td>
                        <td className="py-3 px-4 align-top">
                          <span className="font-mono text-[13px] text-text-secondary">{param.type}</span>
                        </td>
                        <td className="py-3 px-4 align-top">
                          <span className={`text-[12px] font-medium uppercase tracking-wider ${param.req ? 'text-error' : 'text-text-secondary'}`}>
                            {param.req ? 'Required' : 'Optional'}
                          </span>
                        </td>
                        <td className="py-3 px-4 align-top">
                          <span className="text-[14px] text-white leading-relaxed">{param.desc}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="flex flex-col gap-4">
              <h2 className="text-[20px] font-semibold text-white">Responses</h2>

              <div className="flex flex-col gap-0 border border-border rounded-lg overflow-hidden">
                <div className="flex overflow-x-auto border-b border-border bg-surface">
                  {currentTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveResTab(tab)}
                      className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeResTab === tab
                          ? 'border-cta text-white bg-elevated'
                          : 'border-transparent text-text-secondary hover:text-white hover:bg-elevated/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {(activeResTab === '200 OK' || activeResTab === '201 Created') && (
                  <div className="p-4 bg-elevated">
                    <pre className="font-mono text-[13px] leading-relaxed">
                      <code>
                        {isIssueCredential ? (
                          <>
                            <span className="text-white">{'{'}</span>{'\n'}
                            {'  '}<span className="text-cyan">"@context"</span><span className="text-white">: [</span>{'\n'}
                            {'    '}<span className="text-[#A5D6FF]">"https://www.w3.org/2018/credentials/v1"</span><span className="text-white">,</span>{'\n'}
                            {'    '}<span className="text-[#A5D6FF]">"https://w3id.org/security/suites/ed25519-2020/v1"</span>{'\n'}
                            {'  '}<span className="text-white">],</span>{'\n'}
                            {'  '}<span className="text-cyan">"id"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"type"</span><span className="text-white">: [</span>{'\n'}
                            {'    '}<span className="text-[#A5D6FF]">"VerifiableCredential"</span><span className="text-white">,</span>{'\n'}
                            {'    '}<span className="text-[#A5D6FF]">"KYCCredentialL2"</span>{'\n'}
                            {'  '}<span className="text-white">],</span>{'\n'}
                            {'  '}<span className="text-cyan">"issuer"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"did:solidus:mainnet:b8a3f6c2e9d1047e"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"issuanceDate"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"2026-03-18T12:00:00Z"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"credentialSubject"</span><span className="text-white">: {'{'} </span>{'\n'}
                            {'    '}<span className="text-cyan">"id"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"did:solidus:mainnet:7a3b8c9d2e1f4a6b"</span><span className="text-white">,</span>{'\n'}
                            {'    '}<span className="text-cyan">"kyc_level"</span><span className="text-white">: </span><span className="text-warning">2</span><span className="text-white">,</span>{'\n'}
                            {'    '}<span className="text-cyan">"verified_at"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"2026-03-18T11:58:32Z"</span>{'\n'}
                            {'  '}<span className="text-white">{'}'},</span>{'\n'}
                            {'  '}<span className="text-cyan">"proof"</span><span className="text-white">: {'{'}</span>{'\n'}
                            {'    '}<span className="text-cyan">"type"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"Ed25519Signature2020"</span><span className="text-white">,</span>{'\n'}
                            {'    '}<span className="text-cyan">"created"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"2026-03-18T12:00:00Z"</span><span className="text-white">,</span>{'\n'}
                            {'    '}<span className="text-cyan">"proofPurpose"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"assertionMethod"</span>{'\n'}
                            {'  '}<span className="text-white">{'}'}</span>{'\n'}
                            <span className="text-white">{'}'}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-white">{'{'}</span>{'\n'}
                            {'  '}<span className="text-cyan">"id"</span><span className="text-white">: </span><span className="text-lime">"vsn_9f8e7d6c5b4a3291"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"did"</span><span className="text-white">: </span><span className="text-lime">"did:solidus:mainnet:7a3b8c9d2e1f4a6b"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"level"</span><span className="text-white">: </span><span className="text-warning">2</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"status"</span><span className="text-white">: </span><span className="text-lime">"pending"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"url"</span><span className="text-white">: </span><span className="text-lime">"https://verify.solidus.network/s/vsn_9f8e7d6c"</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"expires_at"</span><span className="text-white">: </span><span className="text-warning">1773666000</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"created_at"</span><span className="text-white">: </span><span className="text-warning">1773662400</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"webhook_url"</span><span className="text-white">: </span><span className="text-text-secondary">null</span><span className="text-white">,</span>{'\n'}
                            {'  '}<span className="text-cyan">"metadata"</span><span className="text-white">: {'{'} </span><span className="text-cyan">"userId"</span><span className="text-white">: </span><span className="text-lime">"usr_7a3b8c9d"</span><span className="text-white"> {'}'}</span>{'\n'}
                            <span className="text-white">{'}'}</span>
                          </>
                        )}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Code Panel (min 360px max 500px) */}
        <div className="flex-1 max-w-[500px] min-w-[360px] bg-[#111D2E] border-l border-border flex flex-col z-10 shrink-0">

          <div className="flex items-center gap-2 px-4 h-12 border-b border-border shrink-0 bg-[#0D1520]">
            {['cURL', 'JavaScript', 'Python', 'Go'].map((lang) => (
              <button
                key={lang}
                className={`px-3 py-1 text-[13px] font-medium rounded-full transition-colors ${
                  lang === 'JavaScript' ? 'bg-elevated text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Request</span>
                <button
                  onClick={() => copyToClipboard(currentCode, setCopiedReq)}
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  {copiedReq ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="bg-[#0A1017] p-4 rounded-lg overflow-x-auto text-[13px] font-mono leading-relaxed border border-white/5">
                <code className="text-[#E6E6E6]">
                  {isIssueCredential ? (
                    <>
                      <span className="text-[#FF7B72]">import</span> {'{'}{'}'} <span className="text-[#FF7B72]">from</span> <span className="text-[#A5D6FF]">&apos;@solidus/verify&apos;</span>;<br /><br />
                      <span className="text-[#FF7B72]">const</span> solidus = <span className="text-[#FF7B72]">new</span> <span className="text-[#D2A8FF]">Solidus</span>(<span className="text-[#A5D6FF]">&apos;sk_live_••••••••••••••••••••34ab&apos;</span>);<br /><br />
                      <span className="text-[#FF7B72]">const</span> credential = <span className="text-[#FF7B72]">await</span> solidus.credentials.<span className="text-[#D2A8FF]">issue</span>({'{'}<br />
                      {'  '}sessionId: <span className="text-[#A5D6FF]">&apos;vsn_9f8e7d6c5b4a3291&apos;</span>,<br />
                      {'  '}subjectDid: <span className="text-[#A5D6FF]">&apos;did:solidus:mainnet:7a3b8c9d2e1f4a6b&apos;</span>,<br />
                      {'  '}credentialType: <span className="text-[#A5D6FF]">&apos;kyc_l2&apos;</span>,<br />
                      {'  '}expiresIn: <span className="text-[#79C0FF]">365</span>,<br />
                      {'  '}metadata: {'{'}<br />
                      {'    '}issuerRole: <span className="text-[#A5D6FF]">&apos;compliance_officer&apos;</span><br />
                      {'  '}{'}'}<br />
                      {'}'});
                    </>
                  ) : (
                    <>
                      <span className="text-[#FF7B72]">import</span> {'{'} Solidus {'}'} <span className="text-[#FF7B72]">from</span> <span className="text-[#A5D6FF]">&apos;@solidus/verify&apos;</span>;<br /><br />
                      <span className="text-[#FF7B72]">const</span> solidus = <span className="text-[#FF7B72]">new</span> <span className="text-[#D2A8FF]">Solidus</span>(<span className="text-[#A5D6FF]">&apos;sk_live_••••••••••••••••••••34ab&apos;</span>);<br /><br />
                      <span className="text-[#FF7B72]">const</span> session = <span className="text-[#FF7B72]">await</span> solidus.sessions.<span className="text-[#D2A8FF]">create</span>({'{'}<br />
                      {'  '}did: <span className="text-[#A5D6FF]">&apos;did:solidus:mainnet:7a3b8c9d2e1f4a6b&apos;</span>,<br />
                      {'  '}level: <span className="text-[#79C0FF]">2</span>,<br />
                      {'  '}redirectUrl: <span className="text-[#A5D6FF]">&apos;https://app.acmecorp.com/verify/done&apos;</span>,<br />
                      {'  '}metadata: {'{'}<br />
                      {'    '}userId: <span className="text-[#A5D6FF]">&apos;usr_7a3b8c9d&apos;</span><br />
                      {'  '}{'}'}<br />
                      {'}'});
                    </>
                  )}
                </code>
              </pre>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Response</span>
                <button
                  onClick={() => copyToClipboard(currentResponse, setCopiedRes)}
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  {copiedRes ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="bg-[#0A1017] p-4 rounded-lg overflow-x-auto text-[13px] font-mono leading-relaxed border border-white/5">
                <code>
                  <span className="text-white">{'{'}</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"id"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"vsn_9f8e7d6c5b4a3291"</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"did"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"did:solidus:mainnet:7a3b8c9d2e1f4a6b"</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"level"</span><span className="text-white">: </span><span className="text-[#FF7B72]">2</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"status"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"pending"</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"url"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"https://verify.solidus.network/s/vsn_9f8e7d6c"</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"expires_at"</span><span className="text-white">: </span><span className="text-[#FF7B72]">1773666000</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"created_at"</span><span className="text-white">: </span><span className="text-[#FF7B72]">1773662400</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"webhook_url"</span><span className="text-white">: </span><span className="text-text-secondary">null</span><span className="text-white">,</span>{'\n'}
                  {'  '}<span className="text-[#79C0FF]">"metadata"</span><span className="text-white">: {'{'} </span><span className="text-[#79C0FF]">"userId"</span><span className="text-white">: </span><span className="text-[#A5D6FF]">"usr_7a3b8c9d"</span><span className="text-white"> {'}'}</span>{'\n'}
                  <span className="text-white">{'}'}</span>
                </code>
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
