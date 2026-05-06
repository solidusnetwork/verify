'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coins, ShieldCheck, Landmark, UserPlus, Lock, Activity,
  Gamepad2, HeartPulse, ShoppingCart, Briefcase, Building, Shield,
  CheckCircle2, ArrowRight
} from 'lucide-react';

const industriesData = [
  {
    id: "crypto",
    label: "Crypto & DeFi",
    icon: Coins,
    title: "Crypto & DeFi Verification",
    metric: "99.9% reduction in Sybil attacks",
    metricDesc: "Ensure fair token distribution and regulatory compliance without compromising web3 ethos.",
    useCases: [
      {
        icon: Lock,
        title: "DEX access gating",
        desc: "On-chain credential check before swap execution. Enforce geo-fencing or investor accreditation directly at the smart contract level.",
        code: `// Verify credential on-chain\nbool isValid = verifyCredential(\n  msg.sender,\n  KYC_LEVEL_2_SCHEMA\n);\nrequire(isValid, "KYC required");`
      },
      {
        icon: ShieldCheck,
        title: "Sybil-resistant airdrops",
        desc: "1 verified human = 1 allocation, DID proof. Eliminate bot farms while keeping the user's personal data completely off-chain.",
        code: `// Check uniqueness registry\nconst proof = await getPersonhoodProof(user.did);\nif (proof.isUnique) {\n  airdrop.claim(proof);\n}`
      },
      {
        icon: Landmark,
        title: "MiCA VASP compliance",
        desc: "Credential satisfies VASP KYC under MiCA. Seamlessly identify originators and beneficiaries for the FATF Travel Rule.",
        code: `POST /v1/verifications\n{\n  "type": "mica_vasp",\n  "user_id": "usr_7a3b8c9d",\n  "travel_rule_context": true\n}`
      }
    ],
    quote: "Solidus allowed us to launch our token with 100% real users, completely eliminating bot farms without forcing users to dox themselves to our protocol.",
    author: "Elena R., Head of Product at a Top 10 DeFi Protocol"
  },
  {
    id: "fintech",
    label: "Fintech / Banking",
    icon: Landmark,
    title: "Fintech Onboarding & AML",
    metric: "3x faster account opening",
    metricDesc: "Streamline customer acquisition while exceeding regulatory standards.",
    useCases: [
      {
        icon: UserPlus,
        title: "Account opening KYC",
        desc: "L2 KYC on account creation. Convert users faster with high-conversion mobile flows while satisfying strict banking regulations.",
        code: `// Trigger KYC L2 session\nconst session = await solidus.createSession({\n  level: 2,\n  allowedDocs: ['passport', 'id_card']\n});`
      },
      {
        icon: Lock,
        title: "PSD2 strong authentication",
        desc: "Credential for re-auth. Use existing verified biometric credentials to step-up authentication for high-value transactions.",
        code: `// Step-up authentication\nconst auth = await solidus.verifyStrongAuth(\n  user.did,\n  tx.amount\n);`
      },
      {
        icon: Activity,
        title: "AML onboarding",
        desc: "Sanctions + PEP check included in L3. Automated daily continuous monitoring ensures ongoing compliance.",
        code: `const amlCheck = await solidus.checkSanctions({\n  level: 3,\n  entity: user.data,\n  continuous: true\n});`
      }
    ],
    quote: "Integrating Solidus reduced our compliance overhead by 40% while actually improving the user experience for new account openings.",
    author: "Marcus T., Chief Compliance Officer at NeoBank"
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    title: "Gaming & Age Verification",
    metric: "Zero underage access incidents",
    metricDesc: "Protect minors and prevent cheating with frictionless verification.",
    useCases: [
      {
        icon: ShieldCheck,
        title: "Age-gated matchmaking",
        desc: "Zero-knowledge proof of age. Prove a player is over 18 without revealing their exact date of birth or identity.",
        code: `// Verify age without PII\nconst isAdult = await verifyZKP(\n  user.did,\n  { predicate: "age >= 18" }\n);`
      },
      {
        icon: Shield,
        title: "Anti-smurf protection",
        desc: "Ensure one account per real human to maintain competitive integrity in ranked ladders.",
        code: `const isUnique = await verifyPersonhood(\n  user.did,\n  game.seasonId\n);`
      },
      {
        icon: Coins,
        title: "Real-money economy access",
        desc: "Gate real-money auction houses or cash-outs behind standard KYC to prevent money laundering.",
        code: `if (withdrawalAmount > 1000) {\n  await requireKYC(user.id, "Level1");\n}`
      }
    ],
    quote: "We completely solved our smurfing problem in high-elo ranked matches by requiring Solidus Verify credentials.",
    author: "David K., Lead Producer at AAA Studio"
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    title: "Healthcare Provider Verification",
    metric: "100% HIPAA compliant data handling",
    metricDesc: "Secure patient portals and verify medical professionals seamlessly.",
    useCases: [
      {
        icon: Activity,
        title: "Telehealth patient onboarding",
        desc: "Secure remote identity verification matching insurance cards to live patients.",
        code: `const match = await solidus.compareFaceToID(\n  patient.liveImage,\n  patient.insuranceCard\n);`
      },
      {
        icon: Briefcase,
        title: "Practitioner credentialing",
        desc: "Verify medical licenses and NPI numbers against national databases instantly.",
        code: `const isLicensed = await checkRegistry(\n  npiNumber,\n  "medical_board_ca"\n);`
      },
      {
        icon: Lock,
        title: "EHR access gating",
        desc: "Biometric step-up authentication before accessing sensitive electronic health records.",
        code: `await solidus.requireBiometricAuth(\n  physician.did,\n  "high_sensitivity"\n);`
      }
    ],
    quote: "Solidus allows us to verify remote patients confidently without storing copies of their IDs on our own servers, drastically reducing our liability.",
    author: "Dr. Sarah L., CTO of TeleMed Platform"
  },
  {
    id: "marketplaces",
    label: "Marketplaces",
    icon: ShoppingCart,
    title: "Marketplace Trust & Safety",
    metric: "85% drop in fraudulent listings",
    metricDesc: "Build trust between buyers and sellers with verified credentials.",
    useCases: [
      {
        icon: UserPlus,
        title: "Seller verification badges",
        desc: "Display 'Verified' checkmarks for sellers who have completed identity and business checks.",
        code: `const status = await getSellerStatus(seller.id);\nif (status.includes("KYC_L2")) {\n  renderBadge("Verified Seller");\n}`
      },
      {
        icon: ShieldCheck,
        title: "High-value transaction gating",
        desc: "Require identity verification for transactions exceeding a specific threshold.",
        code: `if (cart.total > 5000) {\n  await triggerVerification(buyer.id);\n}`
      },
      {
        icon: Landmark,
        title: "KYB for enterprise sellers",
        desc: "Automated business verification pulling registry data and identifying ultimate beneficial owners (UBOs).",
        code: `const kyBResult = await solidus.runKYB(\n  company.registrationNumber,\n  company.country\n);`
      }
    ],
    quote: "Implementing verified badges increased conversion rates on high-ticket items by 32% because buyers felt significantly safer.",
    author: "James M., VP Trust & Safety at Global Marketplace"
  },
  {
    id: "gig",
    label: "Gig Economy",
    icon: Briefcase,
    title: "Gig Worker Onboarding",
    metric: "Onboard drivers in < 2 minutes",
    metricDesc: "Scale your workforce globally with instant, reliable verification.",
    useCases: [
      {
        icon: UserPlus,
        title: "Driver license scanning",
        desc: "Instantly extract details and verify authenticity of driving licenses globally.",
        code: `const extracted = await solidus.scanDocument(\n  imageBytes,\n  "driving_license"\n);`
      },
      {
        icon: Shield,
        title: "Background check initiation",
        desc: "Seamlessly pass verified identity data to background check partners.",
        code: `await initiateBackgroundCheck(\n  worker.verifiedIdentity,\n  "comprehensive"\n);`
      },
      {
        icon: Activity,
        title: "Continuous liveness checks",
        desc: "Random biometric prompts to ensure the verified worker is the one actually performing the gig.",
        code: `// Prompt driver for selfie\nconst isMatch = await solidus.verifyLiveness(\n  worker.referenceImage\n);`
      }
    ],
    quote: "We cut our driver onboarding time from days to minutes, allowing us to capture supply faster than our competitors.",
    author: "Anita C., Head of Operations at RideShare Co."
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Building,
    title: "PropTech & Real Estate",
    metric: "Zero wire fraud incidents",
    metricDesc: "Secure high-value property transactions and verify tenant identities.",
    useCases: [
      {
        icon: Lock,
        title: "Wire instruction verification",
        desc: "Require strong biometric authentication before a buyer can view escrow wire instructions.",
        code: `await solidus.verifyStrongAuth(\n  buyer.did,\n  "view_wire_instructions"\n);`
      },
      {
        icon: UserPlus,
        title: "Tenant screening",
        desc: "Verify prospective tenants' identities before running credit or eviction reports.",
        code: `const tenantIdentity = await solidus.verifyKYC(\n  applicant.id,\n  "Level1"\n);`
      },
      {
        icon: ShieldCheck,
        title: "Remote digital notarization",
        desc: "Cryptographically bind a verified identity to digital property signatures.",
        code: `const signature = await bindIdentityToSignature(\n  document.hash,\n  signer.did\n);`
      }
    ],
    quote: "Our title company hasn't had a single instance of wire fraud since gating escrow instructions behind Solidus Verify.",
    author: "Robert P., Managing Broker"
  },
  {
    id: "government",
    label: "Government",
    icon: Shield,
    title: "Public Sector & GovTech",
    metric: "FIPS 140-2 Validated Infrastructure",
    metricDesc: "Deliver citizen services securely with enterprise-grade compliance.",
    useCases: [
      {
        icon: Landmark,
        title: "Benefit distribution",
        desc: "Ensure social benefits reach unique, eligible citizens without fraud.",
        code: `const isEligible = await verifyCitizenClaims(\n  citizen.did,\n  ["unemployment_status"]\n);`
      },
      {
        icon: Lock,
        title: "Tax portal access",
        desc: "Secure login for sensitive tax and revenue portals replacing insecure SMS 2FA.",
        code: `const session = await solidus.loginWithDID(\n  "tax_portal_prod"\n);`
      },
      {
        icon: ShieldCheck,
        title: "Digital ID issuance",
        desc: "Issue verifiable credentials representing state or national IDs into citizen wallets.",
        code: `await solidus.issueCredential(\n  citizen.did,\n  "StateID",\n  stateData\n);`
      }
    ],
    quote: "Solidus provided the exact blend of zero-trust architecture and strict compliance we needed for our municipal services portal.",
    author: "Sarah W., Director of Digital Services"
  }
];

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = useState(industriesData[0]?.id ?? 'crypto');

  const activeData = industriesData.find(d => d.id === activeTab) ?? industriesData[0];

  if (!activeData) return null;

  return (
    <div className="w-full min-h-screen bg-surface font-sans text-text-primary flex flex-col">
      <main className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col lg:flex-row gap-12 px-6 md:px-[120px] py-16">

        {/* Left Sidebar (Tabs) */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="sticky top-[104px] flex flex-col gap-1">
            <h3 className="text-[12px] font-bold text-text-secondary tracking-wider uppercase mb-3 px-4">Industries</h3>
            {industriesData.map((ind) => {
              const isActive = activeTab === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
                    ${isActive ? 'bg-elevated text-text-primary' : 'text-text-secondary hover:bg-elevated hover:text-text-primary'}`}
                >
                  <ind.icon className={`w-[18px] h-[18px] ${isActive ? 'text-cta' : 'text-text-secondary'}`} />
                  <span className={`text-[15px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{ind.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 flex flex-col max-w-[900px] pb-24">

          <div className="mb-12">
            <h1 className="text-[48px] font-bold text-text-primary leading-tight mb-6">{activeData.title}</h1>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="inline-flex items-center gap-2 bg-cta/10 border border-cta/20 px-4 py-2.5 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-cta" />
                <span className="text-[16px] font-semibold text-cta">{activeData.metric}</span>
              </div>
              <p className="text-[16px] text-text-secondary max-w-[400px] leading-relaxed">
                {activeData.metricDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 mb-16">
            {activeData.useCases.map((uc, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">

                {/* Left Text */}
                <div className="p-8 flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
                  <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center mb-5">
                    <uc.icon className="w-5 h-5 text-cta" />
                  </div>
                  <h3 className="text-[20px] font-bold text-text-primary mb-3">{uc.title}</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    {uc.desc}
                  </p>
                </div>

                {/* Right Code */}
                <div className="p-6 md:w-[450px] bg-bg flex items-center">
                  <pre className="text-[13px] text-cyan font-mono leading-[1.6] whitespace-pre-wrap w-full overflow-x-auto">
                    <code>{uc.code}</code>
                  </pre>
                </div>

              </div>
            ))}
          </div>

          <div className="bg-elevated rounded-xl p-8 border-l-4 border-cta mb-12">
            <p className="text-[18px] text-text-primary font-medium italic leading-relaxed mb-4">
              &ldquo;{activeData.quote}&rdquo;
            </p>
            <span className="text-[14px] text-text-secondary font-medium">— {activeData.author}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="h-[48px] px-8 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[15px] font-semibold text-white flex items-center gap-2">
              Start building for {activeData.label} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="h-[48px] px-6 rounded-lg text-[15px] font-medium text-text-primary bg-surface border border-border hover:bg-elevated transition-colors">
              Talk to an expert
            </button>
          </div>

        </section>

      </main>
    </div>
  );
}
