'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Webhook, Code, Package, ArrowRight } from 'lucide-react'

export default function IntegrationsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [requestTool, setRequestTool] = useState('')
  const [isRequested, setIsRequested] = useState(false)

  const categories = ['All', 'CRM', 'Analytics', 'SIEM & Security', 'Collaboration', 'Payments', 'Developer Tools']

  const integrations = [
    {
      name: 'Salesforce',
      category: 'CRM',
      desc: 'Automatically sync verified contacts and KYC status to Salesforce CRM objects.',
      bullets: ['KYC level synced to contact record', 'Verification events trigger Salesforce flows', 'Bi-directional — update verification scope from SF'],
    },
    {
      name: 'HubSpot',
      category: 'CRM',
      desc: 'Push KYC events to HubSpot contact timelines and trigger workflows.',
      bullets: ['Contact property: solidus_kyc_level', 'Deal stage automation on verification', 'Works with HubSpot Workflows'],
    },
    {
      name: 'Zapier',
      category: 'Developer Tools',
      desc: 'Connect Solidus events to 5,000+ apps without code.',
      bullets: ['Trigger: verification.completed, credential.issued', 'Action: create verification session', 'No-code setup in Zapier dashboard'],
    },
    {
      name: 'Slack',
      category: 'Collaboration',
      desc: 'Receive real-time compliance alerts and verification summaries in Slack.',
      bullets: ['Configurable channels per alert type', 'Daily digest or real-time mode', 'Alert: failure rate exceeded, webhook down'],
    },
    {
      name: 'PagerDuty',
      category: 'SIEM & Security',
      desc: 'Page on-call engineers when critical compliance thresholds are breached.',
      bullets: ['Incident creation on webhook failure', 'P1/P2 routing based on severity', 'Auto-resolve on recovery'],
    },
    {
      name: 'Datadog',
      category: 'Analytics',
      desc: 'Ship webhook delivery metrics, verification volume, and API latency to Datadog.',
      bullets: ['Custom dashboard template included', 'APM traces for verification sessions', 'Alert on success rate degradation'],
    },
    {
      name: 'Segment',
      category: 'Analytics',
      desc: 'Route KYC events to any analytics destination via Segment.',
      bullets: ['Identity.identify() on verification complete', 'Track() events for each verification step', 'Compatible with Mixpanel, Amplitude, BigQuery'],
    },
    {
      name: 'Stripe',
      category: 'Payments',
      desc: 'Link Solidus KYC status to Stripe customer objects for compliant payment flows.',
      bullets: ['Customer metadata: solidus_kyc_verified', 'Block payments on KYC expiry', 'Webhook-synced status updates'],
    },
    {
      name: 'GitHub Actions',
      category: 'Developer Tools',
      desc: 'Integration testing and CI/CD workflows for your KYC implementation.',
      bullets: ['Sandbox environment for test runs', 'Pre-built workflow YAML templates', 'Assert credential issuance in CI'],
    },
    {
      name: 'Notion',
      category: 'Collaboration',
      desc: 'Sync compliance documentation and audit log summaries to Notion databases.',
      bullets: ['Auto-update compliance runbook', 'Weekly verification summary page', 'Regulation change notes sync'],
    },
    {
      name: 'Twilio',
      category: 'Collaboration',
      desc: 'Send SMS verification links and KYC status notifications via Twilio Messaging.',
      bullets: ['Templated SMS for verification redirects', 'Status updates to verified users', 'Supports WhatsApp Business'],
    },
    {
      name: 'AWS S3',
      category: 'Developer Tools',
      desc: 'Automatically back up audit logs and compliance reports to your S3 bucket.',
      bullets: ['Encrypted export: AES-256 at rest', 'Daily/weekly schedule or on-demand', 'WORM-compatible for audit requirements'],
    },
  ]

  const filteredIntegrations = activeFilter === 'All'
    ? integrations
    : integrations.filter(int => int.category === activeFilter)

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'CRM': return 'bg-[rgba(0,102,255,0.10)] text-cta'
      case 'Analytics': return 'bg-[rgba(168,230,0,0.10)] text-[#8BB000]'
      case 'SIEM & Security': return 'bg-[rgba(255,59,48,0.10)] text-error'
      case 'Collaboration': return 'bg-[rgba(52,199,89,0.10)] text-success'
      case 'Payments': return 'bg-[rgba(0,212,255,0.10)] text-[#007A99]'
      case 'Developer Tools': return 'bg-[rgba(142,142,147,0.10)] text-text-secondary'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (requestTool.trim()) {
      setIsRequested(true)
      setRequestTool('')
      setTimeout(() => setIsRequested(false), 3000)
    }
  }

  return (
    <div className="min-h-screen font-sans flex flex-col bg-surface">

      {/* Section 1: Header */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[80px] pb-[64px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="text-cta text-[12px] font-medium tracking-[0.08em] uppercase">
            INTEGRATIONS
          </div>
          <h1 className="text-text-primary text-[48px] font-bold mt-[12px] leading-[1.1] whitespace-pre-line">
            {"Connect Solidus Verify\nto your existing stack."}
          </h1>
          <p className="text-text-secondary text-[18px] mt-[16px] max-w-[600px] leading-relaxed">
            Native integrations with the tools your compliance, operations, and engineering teams already use. Set up in minutes, not days.
          </p>

          <div className="flex flex-wrap gap-[16px] mt-[32px]">
            {[
              '50+ integrations available',
              'No-code setup for most tools',
              'Webhook-compatible with any service',
            ].map((stat, i) => (
              <div key={i} className="bg-elevated border border-border rounded-[10px] px-[16px] py-[8px] flex items-center gap-[8px]">
                <Check className="w-[14px] h-[14px] text-success" />
                <span className="text-text-primary text-[13px]">{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Category Filter Tabs */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[32px] w-full flex justify-center sticky top-[72px] z-40">
        <div className="max-w-[1200px] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
          <div className="flex flex-wrap gap-[8px]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`h-[36px] px-[16px] rounded-[8px] text-[14px] font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-cta text-white border border-cta'
                    : 'bg-surface text-text-secondary border border-border hover:bg-elevated'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-text-secondary text-[13px]">
            Showing {filteredIntegrations.length} integrations
          </div>
        </div>
      </section>

      {/* Section 3: Integrations Grid */}
      <section className="bg-surface px-8 sm:px-[120px] pb-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
            {filteredIntegrations.map((int, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-[12px] p-[24px] hover:border-cta hover:shadow-[0_4px_16px_rgba(0,102,255,0.08)] transition-all duration-150 flex flex-col group cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="w-[48px] h-[48px] bg-elevated border border-border rounded-[10px] flex items-center justify-center text-text-primary font-bold text-[20px]">
                    {int.name.charAt(0)}
                  </div>
                  <div className={`text-[11px] font-medium px-[8px] py-[3px] rounded-full ${getCategoryStyles(int.category)}`}>
                    {int.category}
                  </div>
                </div>

                <h3 className="text-text-primary text-[16px] font-semibold mt-[12px]">{int.name}</h3>
                <p className="text-text-secondary text-[14px] mt-[6px] line-clamp-2 min-h-[42px] leading-relaxed">
                  {int.desc}
                </p>

                <div className="flex flex-col gap-[6px] mt-[12px] flex-grow">
                  {int.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-[6px]">
                      <Check className="w-[12px] h-[12px] text-success mt-[3px] flex-shrink-0" />
                      <span className="text-text-secondary text-[13px] leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="text-cta text-[13px] font-medium mt-[16px] flex items-center gap-[4px] group-hover:underline">
                  Learn More <ArrowRight className="w-[12px] h-[12px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Build an Integration */}
      <section className="bg-elevated px-8 sm:px-[120px] py-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <h2 className="text-text-primary text-[32px] font-bold">Build with the Verify API</h2>
          <p className="text-text-secondary text-[16px] mt-[12px] max-w-[560px] leading-relaxed">
            Any service that can receive an HTTP webhook or call a REST endpoint can integrate with Solidus Verify in hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mt-[40px]">
            {/* Card: Webhooks */}
            <div className="bg-surface border border-border rounded-[12px] p-[28px] flex flex-col items-start">
              <div className="bg-[rgba(0,102,255,0.08)] rounded-[10px] p-[8px]">
                <Webhook className="w-[32px] h-[32px] text-cta" />
              </div>
              <h3 className="text-text-primary text-[18px] font-semibold mt-[16px]">Webhooks</h3>
              <p className="text-text-secondary text-[14px] mt-[8px] leading-relaxed flex-grow">
                Any service that accepts HTTP POST requests can receive Solidus verification events. 20+ event types, HMAC-signed, with automatic retry.
              </p>
              <Link href="/docs/webhooks" className="text-cta text-[14px] font-medium mt-[16px] flex items-center gap-[4px] hover:underline">
                Webhook docs <ArrowRight className="w-[14px] h-[14px]" />
              </Link>
            </div>

            {/* Card: REST API */}
            <div className="bg-surface border border-border rounded-[12px] p-[28px] flex flex-col items-start">
              <div className="bg-[rgba(0,102,255,0.08)] rounded-[10px] p-[8px]">
                <Code className="w-[32px] h-[32px] text-cta" />
              </div>
              <h3 className="text-text-primary text-[18px] font-semibold mt-[16px]">REST API</h3>
              <p className="text-text-secondary text-[14px] mt-[8px] leading-relaxed flex-grow">
                Full programmatic access to every Solidus resource — verifications, credentials, webhooks, team, billing. OpenAPI 3.1 spec available.
              </p>
              <Link href="/docs/api" className="text-cta text-[14px] font-medium mt-[16px] flex items-center gap-[4px] hover:underline">
                API Reference <ArrowRight className="w-[14px] h-[14px]" />
              </Link>
            </div>

            {/* Card: SDKs */}
            <div className="bg-surface border border-border rounded-[12px] p-[28px] flex flex-col items-start">
              <div className="bg-[rgba(0,102,255,0.08)] rounded-[10px] p-[8px]">
                <Package className="w-[32px] h-[32px] text-cta" />
              </div>
              <h3 className="text-text-primary text-[18px] font-semibold mt-[16px]">Official SDKs</h3>
              <p className="text-text-secondary text-[14px] mt-[8px] leading-relaxed flex-grow">
                First-party SDKs with TypeScript types, async/await, and full error handling.
              </p>
              <div className="flex flex-wrap gap-[6px] mt-[12px] mb-[16px]">
                {['JavaScript', 'Python', 'Go', 'React Native'].map(lang => (
                  <div key={lang} className="bg-elevated text-text-primary text-[12px] font-medium px-[8px] py-[3px] rounded-[6px]">
                    {lang}
                  </div>
                ))}
              </div>
              <Link href="/docs/sdks" className="text-cta text-[14px] font-medium mt-auto flex items-center gap-[4px] hover:underline">
                SDK docs <ArrowRight className="w-[14px] h-[14px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Missing Integration CTA */}
      <section className="bg-surface px-8 sm:px-[120px] pt-[64px] pb-[80px] w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="bg-elevated border border-border rounded-[12px] p-[40px] max-w-[640px] mx-auto text-center">
            <h2 className="text-text-primary text-[26px] font-bold">Don't see your tool?</h2>
            <p className="text-text-secondary text-[15px] mt-[8px]">
              Submit an integration request. We review requests weekly and prioritize by demand.
            </p>

            <form onSubmit={handleRequestSubmit} className="flex flex-col sm:flex-row gap-[8px] max-w-[480px] mx-auto mt-[24px]">
              <input
                type="text"
                value={requestTool}
                onChange={(e) => setRequestTool(e.target.value)}
                placeholder="Tool or platform name"
                required
                className="flex-grow h-[48px] bg-surface border border-border rounded-[8px] px-[16px] text-[14px] focus:outline-none focus:border-cta"
              />
              <button
                type="submit"
                className="h-[48px] bg-cta hover:bg-cta/90 text-white font-semibold text-[14px] rounded-[8px] px-[20px] transition-colors whitespace-nowrap"
              >
                {isRequested ? 'Requested!' : 'Request Integration'}
              </button>
            </form>

            <div className="text-text-disabled text-[12px] mt-[12px]">
              Top requests: Salesforce Einstein, Okta, Auth0, Notion AI, Linear
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
