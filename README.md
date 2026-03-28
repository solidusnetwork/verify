<p align="center">
  <img src="brand/logos/solidus_icon.png" alt="Solidus Verify" height="80" />
</p>

<h3 align="center">Solidus Verify</h3>

<p align="center">
  KYC-as-a-Service with native document verification and liveness detection.<br/>
  <strong>No third-party KYC providers. Solidus IS the verification engine.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/backend-Fastify-black?style=flat-square" />
  <img src="https://img.shields.io/badge/frontend-Next.js_15-black?style=flat-square" />
  <img src="https://img.shields.io/badge/tests-33_passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/pages-34-blue?style=flat-square" />
</p>

---

## Overview

Solidus Verify is the first revenue product of the [Solidus Network](https://github.com/solidusnetwork). It provides KYC verification as a service — merchants integrate via API, end-users complete verification through a hosted flow, and verified credentials are issued as W3C Verifiable Credentials on the Solidus blockchain.

**Competitors replaced, not integrated:** Onfido, Sumsub, Jumio, and Persona are competitors. Solidus builds its own native verification engine.

## Features

- **Native document verification** — OCR extraction, MRZ parsing, document authenticity checks
- **Liveness detection** — Face matching against document photos
- **W3C Verifiable Credentials** — KYC results issued as portable, cryptographically signed credentials
- **Sandbox mode** — Test the full KYC flow without real documents
- **Webhook delivery** — Real-time notifications for verification status changes
- **Multi-level KYC** — L1 (automated), L2 (document + liveness), L3 (enhanced due diligence)
- **34-page dashboard** — Merchant dashboard for managing verifications, API keys, billing

## Architecture

```
verify/
├── apps/
│   ├── backend/          Fastify API server
│   │   ├── src/routes/   REST endpoints (20+)
│   │   ├── src/workers/  Background jobs (OCR, face detection)
│   │   └── src/lib/      Document processing, storage
│   └── frontend/         Next.js 15 dashboard
│       └── src/app/      34 pages, dark/light mode
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js, Fastify, PostgreSQL |
| Frontend | Next.js 15, React, Tailwind CSS |
| Document Processing | Tesseract OCR, MRZ parsing |
| Face Detection | TensorFlow.js |
| Storage | Cloudflare R2 (pluggable) |
| Credentials | @solidus/sdk, Ed25519 signatures |
| Queue | BullMQ for async verification jobs |

## License

Proprietary. All rights reserved. See [Solidus Network](https://github.com/solidusnetwork) for more information.
