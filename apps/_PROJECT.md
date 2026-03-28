# _PROJECT.md — Solidus Verify

Project-specific configuration, credentials, and architecture decisions for verify.solidus.network.


---

## Server

| Item | Value |
|------|-------|
| Server IP | `` |
| SSH alias | `ssh verify` |
| VPS provider | Hetzner Ubuntu 24 |
| Domain | `verify.solidus.network` |
| Backend path | `/var/www/verify.solidus.network/backend/` |
| Frontend path | `/var/www/verify.solidus.network/frontend/` |
| Systemd services | `solidus-verify`, `solidus-verify-worker`, `solidus-verify-scheduler` |
| Unix socket | `/run/solidus-verify/solidus-verify.sock` |
| PM2 process | `solidus-verify` (cluster mode x 2, port 3000) |
| Nginx config | `/etc/nginx/sites-available/verify.solidus.network` |

---

## Deploy Scripts

```
apps/backend/deploy/deploy-backend.sh   <- git pull -> npm ci -> migrate -> restart services
apps/backend/deploy/deploy-frontend.sh  <- git pull -> npm ci -> build -> pm2 reload
apps/backend/deploy/nginx.conf          <- canonical nginx config
apps/backend/deploy/health-check.sh     <- verifies backend, frontend, DB, Redis, services
```

After replacing nginx.conf on server:
```bash
sudo certbot --nginx -d verify.solidus.network && sudo systemctl reload nginx
```

---

## Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js (TypeScript) + Fastify |
| Frontend | Next.js (React) |
| Database | PostgreSQL |
| Cache | Redis |
| Job queue | BullMQ (Redis-backed) |

---

## Languages

| Code | Name |
|------|------|
| `en` | English |

---

## Database

| Item | Value |
|------|-------|
| DB name | `` |
| DB user | `` |
| DB password | `` |
| DB host | `localhost` |
| DB port | `5432` |

---

## Analytics & Monitoring

| Item | Value |
|------|-------|
| GA4 Measurement ID | `` |
| Sentry backend DSN | `` |
| Sentry frontend DSN | `` |
| Sentry auth token | `` |

---

## External Services

| Item | Value |
|------|-------|
| Email provider | <!-- e.g. Resend SMTP, Amazon SES --> |

---

## Keys & Credentials

| File | Location | Purpose |
|------|----------|---------|
| Protocol signing key | `apps/backend/keys/` | DID/VC issuance signing |

---

## Figma

| Item | Value |
|------|-------|
| Design file | `` |
| Make file | https://github.com/fatih-koc/Solidusverifyprototypeweb.git |

---

## Backend Services

```
apps/backend/src/
  modules/
    kyc/           # KYC orchestration, verification flow
    documents/     # Document upload, verification, storage
    liveness/      # Biometric liveness detection
    credentials/   # Verifiable Credential issuance (integrates with Protocol)
    webhooks/      # Outgoing webhooks to merchants
    users/         # User management, JWT auth
```

---

## Job Schedule

| Task | Schedule | Module |
|------|----------|--------|
| `poll-verification-status` | Every 2 min | `kyc` |
| `issue-credentials` | On verification complete (event-driven) | `credentials` |
| `check-credential-expiry` | Daily 02:00 | `credentials` |
| `cleanup-expired-sessions` | Daily 03:00 | `users` |
| `retry-failed-verifications` | Every 15 min | `kyc` |

---

## Git Repos

| Repo | Location | Server path |
|------|----------|-------------|
| `solidus/verify-frontend` | `apps/frontend/` | `/var/www/verify.solidus.network/frontend/` |

The `apps/` folder itself is NOT a git repo — it's a local workspace containing separate repos.

---

## Project-Specific Notes

- **First revenue product.** Highest priority across all Solidus products.
- Integrates with the Protocol layer for DID/VC issuance — depends on `@solidus/auth` and `@solidus/sdk` from `projects/protocol/apps/sdk/`.
- Must be compliance-ready for crypto exchanges and fintech (SOC 2, GDPR data handling).
- Document uploads must be encrypted at rest and purged after verification per data retention policy.
- Liveness detection is a separate service call — not bundled with document verification.
- All PII is encrypted in the database; decryption keys are separate from DB credentials.
