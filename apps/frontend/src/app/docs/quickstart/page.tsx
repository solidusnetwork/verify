'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search, ChevronDown, Check, Copy, AlertTriangle,
  Terminal, Code2, Server, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_SECTIONS = [
  {
    title: 'Guides',
    items: [{ name: 'Quickstart', path: '/docs/quickstart' }]
  },
  {
    title: 'Authentication',
    items: [{ name: 'API Keys', path: '/docs' }, { name: 'Environments', path: '/docs' }]
  },
  {
    title: 'Verifications',
    items: [{ name: 'Create Session', path: '/docs' }, { name: 'Get Session', path: '/docs' }]
  },
  {
    title: 'Credentials',
    items: [{ name: 'Issue Credential', path: '/docs' }]
  },
  {
    title: 'Webhooks',
    items: [{ name: 'Events Reference', path: '/docs' }]
  }
];

const STEPS = [
  { id: 1, title: 'Install' },
  { id: 2, title: 'Initialize' },
  { id: 3, title: 'Create Session' },
  { id: 4, title: 'Redirect User' },
  { id: 5, title: 'Handle Webhook' },
  { id: 6, title: 'Verify Credential' }
];

const SIDE_PANEL_CONTENT: Record<number, { title: string; content: string }> = {
  0: { title: 'Console', content: '// Install dependencies to begin...' },
  1: { title: 'Terminal Output', content: "added 1 package, and audited 2 packages in 1s\n\n1 package is looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities" },
  2: { title: 'Console Output', content: '// SDK initialized successfully.\n// Ready to make API calls.' },
  3: { title: 'Response: Session Created', content: `{\n  "id": "vsn_9f8e7d6c5b4a3291",\n  "url": "https://verify.solidus.network/s/vsn_9f8e7d6c",\n  "status": "pending"\n}` },
  4: { title: 'Browser Navigation', content: 'HTTP 302 Found\nLocation: https://verify.solidus.network/s/vsn_9f8e7d6c\n\n// User is interacting with the verification UI...' },
  5: { title: 'Incoming Webhook Payload', content: `{\n  "id": "evt_9f8e7d6c5b4a3291",\n  "type": "kyc.completed",\n  "created_at": 1773662400,\n  "data": {\n    "session_id": "vsn_9f8e7d6c5b4a3291",\n    "did": "did:solidus:mainnet:7a3b8c9d2e1f4a6b"\n  }\n}` },
  6: { title: 'Response: Verified Credential', content: `{\n  "@context": ["https://www.w3.org/2018/credentials/v1"],\n  "type": ["VerifiableCredential", "KycCredential"],\n  "issuer": "did:solidus:mainnet:b8a3f6c2e9d1047e",\n  "credentialSubject": {\n    "id": "did:solidus:mainnet:7a3b8c9d2e1f4a6b",\n    "kycLevel": 2,\n    "status": "verified"\n  },\n  "proof": {\n    "type": "Ed25519Signature2018",\n    "proofValue": "z49..."\n  }\n}` }
};

const FALLBACK_PANEL = SIDE_PANEL_CONTENT[0] ?? { title: 'Console', content: '// Install dependencies to begin...' };

const CodeBlock = ({ code, language, isTerminal = false }: { code: string; language: string; isTerminal?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-[#0A1017]">
      <div className="flex items-center justify-between px-4 h-10 border-b border-border bg-[#0D1520]">
        <div className="flex items-center gap-2 text-[12px] font-medium text-text-secondary">
          {isTerminal ? <Terminal className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
          {language}
        </div>
        <button
          onClick={handleCopy}
          className="text-text-secondary hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-[13px] font-mono leading-relaxed text-[#E6E6E6]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function ApiQuickstartPage() {
  const pathname = usePathname();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStepId, setActiveStepId] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('solidus_quickstart_progress');
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved) as number[]);
      } catch (_e) {
        // ignore malformed storage
      }
    }
  }, []);

  const toggleStep = (id: number) => {
    setCompletedSteps(prev => {
      const next = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      localStorage.setItem('solidus_quickstart_progress', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idPart = entry.target.id.split('-')[1];
          if (idPart !== undefined) {
            setActiveStepId(Number(idPart));
          }
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const activePanelContent = SIDE_PANEL_CONTENT[activeStepId] ?? FALLBACK_PANEL;

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
              <span className="text-[12px] font-semibold text-white uppercase tracking-wider px-2">
                {navSection.title}
              </span>
              <div className="flex flex-col">
                {navSection.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`flex items-center px-2 py-1.5 text-[13px] font-medium transition-colors relative rounded-md ${
                        isActive
                          ? 'text-white bg-elevated'
                          : 'text-text-secondary hover:text-white hover:bg-elevated/50'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-cta rounded-r-full" />
                      )}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Content (flex, max 840px) */}
      <div className="flex-1 max-w-[840px] shrink-0 overflow-y-auto bg-bg scroll-smooth">

        {/* Sticky Progress Header */}
        <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur border-b border-border px-10 py-5 flex items-center gap-2">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                  completedSteps.includes(step.id)
                    ? 'bg-success text-bg'
                    : activeStepId === step.id
                      ? 'bg-cta text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]'
                      : 'bg-elevated text-text-secondary border border-border'
                }`}>
                  {completedSteps.includes(step.id) ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className={`text-[10px] whitespace-nowrap absolute mt-10 transition-opacity ${activeStepId === step.id ? 'opacity-100 text-white' : 'opacity-0'}`}>
                  {step.title}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`h-px flex-1 mx-2 transition-colors ${
                  completedSteps.includes(step.id) ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="p-10 flex flex-col gap-16 pb-32">

          <div className="flex flex-col gap-4" id="step-0" ref={el => { stepRefs.current[0] = el; }}>
            <h1 className="text-[36px] font-bold text-white leading-tight">Quickstart Guide</h1>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              Integrate Solidus Verify into your application in under 15 minutes. This guide walks you through creating a verification session, handling the user redirect, and verifying the resulting credential.
            </p>

            <div className="mt-4 bg-warning/10 border border-warning/20 rounded-lg p-5 flex gap-4">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
              <div className="flex flex-col gap-3">
                <h3 className="text-[14px] font-bold text-warning">Prerequisites</h3>
                <ul className="text-[14px] text-warning/90 flex flex-col gap-2 list-disc pl-4">
                  <li>Node.js 18.0 or later installed</li>
                  <li>A Solidus Verify account (Sign up for a Sandbox account)</li>
                  <li>A Sandbox API Key from your dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col gap-4 relative" id="step-1" ref={el => { stepRefs.current[1] = el; }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-white">1. Install the SDK</h2>
              <button
                onClick={() => toggleStep(1)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                  completedSteps.includes(1) ? 'bg-success/15 border-success/30 text-success' : 'border-white/15 text-text-secondary hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedSteps.includes(1) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
            <p className="text-[14px] text-text-secondary">Install the official Solidus Verify package via npm, yarn, or pnpm.</p>
            <CodeBlock
              isTerminal
              language="bash"
              code={`$ npm install @solidus/verify\n$ yarn add @solidus/verify`}
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-4 relative" id="step-2" ref={el => { stepRefs.current[2] = el; }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-white">2. Initialize the Client</h2>
              <button
                onClick={() => toggleStep(2)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                  completedSteps.includes(2) ? 'bg-success/15 border-success/30 text-success' : 'border-white/15 text-text-secondary hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedSteps.includes(2) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
            <p className="text-[14px] text-text-secondary">Initialize the Solidus SDK using your secret API key. Never expose your secret key in client-side code.</p>
            <CodeBlock
              language="TypeScript"
              code={`import { SolidusVerify } from '@solidus/verify';\n\nconst verify = new SolidusVerify({\n  apiKey: process.env.SOLIDUS_SECRET_KEY,\n  environment: 'sandbox' // or 'production'\n});`}
            />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-4 relative" id="step-3" ref={el => { stepRefs.current[3] = el; }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-white">3. Create a Verification Session</h2>
              <button
                onClick={() => toggleStep(3)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                  completedSteps.includes(3) ? 'bg-success/15 border-success/30 text-success' : 'border-white/15 text-text-secondary hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedSteps.includes(3) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
            <p className="text-[14px] text-text-secondary">Create a session when your user needs to be verified. You&apos;ll receive a URL to redirect them to.</p>
            <CodeBlock
              language="TypeScript"
              code={`const session = await verify.sessions.create({\n  did: "did:solidus:mainnet:7a3b8c9d2e1f4a6b",\n  level: 2, // 1 = Basic, 2 = Passport + Liveness\n  redirectUrl: "https://yourapp.com/onboarding/complete",\n  metadata: {\n    internalUserId: "usr_7a3b8c9d"\n  }\n});\n\nconsole.log(session.url); // https://verify.solidus.network/s/...`}
            />
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-4 relative" id="step-4" ref={el => { stepRefs.current[4] = el; }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-white">4. Redirect the User</h2>
              <button
                onClick={() => toggleStep(4)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                  completedSteps.includes(4) ? 'bg-success/15 border-success/30 text-success' : 'border-white/15 text-text-secondary hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedSteps.includes(4) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
            <p className="text-[14px] text-text-secondary">Redirect your user to the generated URL. They will complete the fully hosted, white-labeled verification flow seamlessly on mobile or desktop.</p>

            <div className="flex gap-6 mt-2 mb-4">
              <div className="w-[240px] flex flex-col gap-3">
                <div className="h-[480px] rounded-xl overflow-hidden border-4 border-elevated bg-surface shadow-2xl relative flex items-end p-4">
                  <span className="text-[13px] font-semibold text-white">1. ID Document Upload</span>
                </div>
              </div>

              <div className="w-[240px] flex flex-col gap-3">
                <div className="h-[480px] rounded-xl overflow-hidden border-4 border-elevated bg-surface shadow-2xl relative flex items-end p-4">
                  <span className="text-[13px] font-semibold text-white">2. Biometric Liveness Check</span>
                </div>
              </div>
            </div>

            <CodeBlock
              language="TypeScript"
              code={`// Example in an Express.js route handler\napp.post('/api/verify', async (req, res) => {\n  const session = await verify.sessions.create({ /*...*/ });\n  res.redirect(302, session.url);\n});`}
            />
          </div>

          {/* Step 5 */}
          <div className="flex flex-col gap-4 relative" id="step-5" ref={el => { stepRefs.current[5] = el; }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-white">5. Handle the Webhook</h2>
              <button
                onClick={() => toggleStep(5)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                  completedSteps.includes(5) ? 'bg-success/15 border-success/30 text-success' : 'border-white/15 text-text-secondary hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedSteps.includes(5) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
            <p className="text-[14px] text-text-secondary">
              Listen for the <code className="text-cyan bg-cyan/10 px-1 py-0.5 rounded">kyc.completed</code> webhook event to securely confirm when a user finishes the flow.
            </p>
            <CodeBlock
              language="TypeScript"
              code={`app.post('/webhooks/solidus', express.raw({type: 'application/json'}), (req, res) => {\n  const signature = req.headers['solidus-signature'];\n  \n  try {\n    const event = verify.webhooks.constructEvent(\n      req.body,\n      signature,\n      process.env.SOLIDUS_WEBHOOK_SECRET\n    );\n\n    if (event.type === 'kyc.completed') {\n      const sessionId = event.data.session_id;\n      // Update user status in your database\n    }\n    res.status(200).send();\n  } catch (err) {\n    res.status(400).send(\`Webhook Error: \${err.message}\`);\n  }\n});`}
            />
          </div>

          {/* Step 6 */}
          <div className="flex flex-col gap-4 relative" id="step-6" ref={el => { stepRefs.current[6] = el; }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-white">6. Verify the Credential</h2>
              <button
                onClick={() => toggleStep(6)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                  completedSteps.includes(6) ? 'bg-success/15 border-success/30 text-success' : 'border-white/15 text-text-secondary hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedSteps.includes(6) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
            <p className="text-[14px] text-text-secondary">Once verified, fetch the W3C Verifiable Credential. This payload contains cryptographic proof of the user&apos;s KYC status.</p>
            <CodeBlock
              language="TypeScript"
              code={`// Retrieve the verified credential using the session ID\nconst credential = await verify.credentials.retrieve({ \n  sessionId: "vsn_9f8e7d6c5b4a3291" \n});\n\n// Optionally, verify its cryptographic signature locally\nconst isValid = await verify.credentials.verify(credential);\nif (isValid) {\n  console.log("Credential signature is valid and trusted.");\n}`}
            />
          </div>

        </div>
      </div>

      {/* Right Live Preview Panel (min 360px max 500px) */}
      <div className="flex-1 max-w-[500px] min-w-[360px] bg-[#111D2E] border-l border-border flex flex-col z-10 shrink-0">

        <div className="flex items-center gap-2 px-4 h-12 border-b border-border shrink-0 bg-[#0D1520]">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary uppercase tracking-wider">
            <Server className="w-4 h-4" />
            Live Preview Monitor
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-cta uppercase tracking-wider">
                {activePanelContent.title}
              </span>
            </div>
            <pre className="bg-[#0A1017] p-4 rounded-lg overflow-x-auto text-[13px] font-mono leading-relaxed border border-white/5 shadow-inner">
              <code className={activeStepId === 1 || activeStepId === 4 ? 'text-text-secondary' : 'text-[#E6E6E6]'}>
                {activePanelContent.content}
              </code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
