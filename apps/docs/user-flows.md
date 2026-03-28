# Verify — User Flows

---

## Flow 1: Developer First Integration

**Actor:** Backend developer at a crypto exchange or fintech
**Trigger:** Signed up for a Solidus Verify account and wants to integrate KYC into their product for the first time
**Steps:**
1. `/login` → Sign in with work email + password → Dashboard Overview
2. Dashboard sidebar → click "API Keys" → `/api-keys`
3. Click "Create New Key" → modal opens → enter key name ("Production API Key"), select environment "Test", check "Read verifications" + "Create verifications" → click "Create Key"
4. Modal shows one-time key reveal → copy full key → click "Done"
5. Click "Docs" in sidebar → `/docs` → API Reference loads
6. Click "Quickstart" in nav → `/docs/quickstart`
7. Follow steps 1–6: install npm package, initialize with API key, create session, redirect user, handle webhook, verify credential
8. Test session appears in `/verifications` list with status "Processing" → transitions to "Verified"
9. Switch environment toggle from Sandbox → Production
10. Rotate API key or create a new Production key

**Success:** Developer has a working KYC integration in production; first real verification appears in the dashboard
**Error paths:**
- API key already copied elsewhere and lost → must revoke + create new key (one-time reveal is strict; no second chance)
- Test session shows "Failed" → open Verification Detail to see which step failed and why
- Webhook not receiving events → check Webhooks page for delivery log; endpoint may be returning 5xx
- DID not found → "A new DID record will be created" — expected behavior for new users

---

## Flow 2: Launch a KYC L2 Verification

**Actor:** Compliance officer or operations team member
**Trigger:** A customer support ticket indicates a user needs to be re-verified, or an automated system triggers a manual KYC initiation
**Steps:**
1. Any app screen → click "New Verification" in top bar → `NewVerificationModal` opens
2. Step 1: Select "KYC Level 2" TypeCard (Passport + liveness, ~5 min, $5.00) — already default selected → click "Continue →"
3. Step 2: Paste or type the subject's DID (`did:solidus:mainnet:7a3b8c9d...`) in DIDInput → wait 400ms for DID validation debounce → see "DID resolved · 2 existing credentials" confirmation → optionally add User ID and Reference metadata → click "Start Verification →"
4. Step 3: Review ConfirmCard (type, DID, estimated time, cost $5.00 in Lime) → note the RedirectNote: "The subject will be redirected to complete their document upload and liveness check" → click "Launch Verification →"
5. Button shows spinner (800ms) → success state: check-circle spring animation + "Verification launched" + session ID (`vsn_9f8e7d6c5b4a3291`)
6. Click "View in Dashboard" → navigates to `/verifications/vsn_9f8e7d6c5b4a3291`
7. Send the redirect URL (`verify.solidus.network/s/vsn_9f8e7d6c`) to the user via email/SMS (outside Verify UI)
8. Subject completes document upload + liveness check at `/s/vsn_9f8e7d6c`
9. Verification detail screen updates in real-time: steps tick green as processing progresses → status badge transitions Processing → Verified
10. Webhook `kyc.completed` fires to configured endpoint(s)

**Success:** Status badge shows "Verified"; CredentialCard appears in the right column with W3C VC details and blockchain anchor
**Error paths:**
- Insufficient balance → Step 3 shows cost in red, "0 queries · $0.00" warning, Launch button disabled → operator must click "Upgrade →" to add queries first
- DID already at KYC L2 → warning "Re-verification will issue a fresh credential and invalidate the existing one" → operator proceeds knowingly
- Subject fails liveness check → status transitions to "Failed"; FailureAnalysisCard shows face similarity score and possible causes; operator can "Flag for Review" or advise user to retry
- Session expires (TTL default 3600s) before subject completes → status shows "Expired"; launch a new session

---

## Flow 3: User Completes Identity Verification (End-User)

**Actor:** End user being verified (not the operator)
**Trigger:** Operator sends a redirect URL (`verify.solidus.network/s/{session_id}`) to the user via email or in-product prompt
**Steps:**
1. User opens `/s/vsn_9f8e7d6c` on mobile or desktop → sees centered verification flow, progress bar at step 1 of 3
2. Step 1 — Document Upload: select document type (Passport / Driver's License / National ID) → drag-and-drop or click to upload government-issued ID image → see thumbnail preview with filename and filesize → click "Continue"
3. If image quality too low → red border on thumbnail, quality rejection message, 3 improvement hints → click "Try Again" → re-upload
4. Step 2 — Liveness Check: browser prompts for camera permission → grant permission → see face guide circle; follow on-screen instructions → camera captures liveness frames → "Uploading..." indicator
5. If camera permission denied → error state: explains how to grant camera access in browser settings; "Try Again" button; verification cannot proceed without liveness
6. Step 3 — Processing: spinning brand gradient circle; live checklist ticks: "Document received ✓" → "Liveness check passed ✓" → "Validator consensus confirmed ✓" → "Credential issued ✓"
7. Success screen: large green check-circle (spring animation) + "Verification Complete" + credential summary card (type, issuer, expiry) + "You can now close this window. Your verified credential has been issued."

**Success:** User's DID wallet contains a new W3C Verifiable Credential; operator's webhook fires `kyc.completed`; user can close the window and return to the originating product
**Error paths:**
- Failure screen: red x-circle, failure reason (e.g., "Liveness check failed: face similarity score 34%"), "Try Again" button (launches new attempt) + "Contact Support" ghost button
- Mobile browser limitation (no camera API) → drop-off shown in analytics; user needs to use desktop or native app (when available)
- Session already used or expired → informational screen: "This verification link has expired. Contact [company] for a new link."

---

## Flow 4: Investigate a Failed Verification

**Actor:** Compliance officer
**Trigger:** Webhook event `kyc.failed` received, or the failure rate alert threshold exceeded, or a user reports they "got stuck"
**Steps:**
1. Dashboard Overview → Recent Verifications table → locate row with "Failed" status badge → click eye icon → OR navigate directly via `vsn_` session ID
2. `/verifications/{session_id}` loads with red "Failed" status badge in page header
3. Review left column VerificationStepsCard: steps 1–3 show green checkmarks; step 3 (Liveness Check) shows red x-circle icon + failure reason: "Face similarity: 34% (threshold: 75%)"
4. Review right column: FailureAnalysisCard (red theme) shows full failure reason + "Possible causes: low-quality selfie, lighting conditions, or fraudulent attempt." + "Flag for Review" button
5. Review right column EventLogCard: timestamps confirm which step failed and at what time
6. Options:
   - (Likely user error) Communicate to user and offer retry → launch a new verification session via "New Verification" modal with the same DID
   - (Suspicious pattern) Click "Flag for Review" → sets a flag on the session for manual analyst review (P2 feature — Case Management)
   - Export or copy Event Log for regulatory records

**Success:** Operator understands why the verification failed and has taken appropriate action (retry for legitimate user, escalate for suspicious case)
**Error paths:**
- EventLogCard shows "Validator consensus timeout" → network issue; may resolve on retry
- Multiple consecutive failures for the same DID with high similarity scores → possible fraud signal; flag for review

---

## Flow 5: Monitor Webhook Delivery Health

**Actor:** Backend developer or operations team member
**Trigger:** `kyc.completed` webhooks are not arriving at the application's endpoint, causing downstream order processing to stall
**Steps:**
1. Dashboard Overview → WebhookDeliveryPanel → see `HealthBadge` showing "1 Endpoint Failing" (amber) → note the degraded alert strip: "webhook-prod.example.com returning 500 · last success 14 min ago"
2. Click "View All →" link → navigates to `/webhooks`
3. Webhooks page → Configured Endpoints section: identify the failing EndpointCard — red border, alert strip showing "4 failed deliveries in the last hour · last error: 503 Service Unavailable"
4. Scroll to Delivery Log → filter by failing endpoint → see recent rows with "500 Error" status and "Retrying" state
5. Click a failing row → expand accordion: view full request payload (JSON) and response body (server error)
6. Diagnose: response body reveals the server is in maintenance mode (503)
7. Fix the endpoint server (outside Verify) → return to Webhooks page
8. Click "Retry All Failed" in the dashboard panel, or click "Retry" on individual failed rows in the Delivery Log
9. Monitor: failed rows transition to "Retrying" (800ms spinner) → resolve to "Delivered" (200) or re-queue as "Failed"
10. HealthBadge returns to "All Healthy" (green)

**Success:** All failed webhook events are successfully delivered; downstream application processing resumes
**Error paths:**
- Endpoint continues failing after retry → escalate to endpoint server team; events are queued and can be retried indefinitely
- HMAC signature mismatch → receiver code is rejecting the signature; verify the secret matches between Verify settings and the endpoint handler
- Endpoint URL changed → edit EndpointCard URL to point to new URL; old URL can be deleted

---

## Flow 6: Manage Expiring Credentials

**Actor:** Compliance officer running a monthly compliance audit
**Trigger:** Monthly review task; or notification email triggered by "Credentials Expiring in 30 days" alert
**Steps:**
1. Sidebar → "Credentials" → `/credentials`
2. Credential Stats row: see "Expiring in 30 days: 1,204" amber stat card
3. Scroll to Expiry Warnings card (amber theme): "1,204 Credentials Expiring Soon" — review the affected credential count and recommended action
4. Click "Send Re-verification Nudge" → triggers email notifications to affected users (or queues webhooks to the operator's CRM system, per notification settings)
5. Filter credential table: Status dropdown → select "Expiring" → see all 1,204 rows highlighted with amber expiry dates
6. For specific high-value users: click credential row → Credential Detail slide-in panel opens
7. Review panel: Presentations section shows how many times credential was presented and to which services — assess whether re-verification is truly critical for this user
8. If immediate revocation needed (credential compromised): click "Revoke" button at bottom of panel → confirmation dialog: "Revoke Credential? The user will need to re-verify." → click "Revoke" → panel closes, row updates to "Revoked" badge
9. Export credential list: CSV export of all expiring credentials for regulatory records

**Success:** All credentials expiring within 30 days have either been flagged for re-verification or revoked as appropriate; compliance officer has documented evidence of the review
**Error paths:**
- Re-verification nudge email undeliverable (user changed email) → identify via Audit Log; contact user through alternative channel
- User does not re-verify before expiry → credential status transitions to "Expired" automatically at expiry date; any service presenting the expired credential will be rejected; operator must decide whether to gate access

---

## Flow 7: Onboard a New Team Member

**Actor:** Organization Admin
**Trigger:** A new compliance analyst joins the team and needs read access to verification records
**Steps:**
1. Sidebar → "Team" → `/team`
2. Review current team: 2 Admins, 5 Operators, 3 Viewers
3. Click "Invite Member" → Invite Member modal opens
4. Enter new colleague's work email → select "Viewer" role (radio card: "Read-only access to verifications and analytics")
5. Optionally expand "View permissions matrix" to confirm Viewer access scope → confirm they cannot manage billing, team, or API keys
6. Click "Send Invite"
7. Team table shows new row in "Invited" state: greyed out, italic email, no Last Active, resend invite link instead of edit
8. New member receives email → clicks invitation link → sets password → logs in
9. Row in team table updates from "Invited" to "Active" with a Last Active timestamp

**Success:** New team member can view verifications and analytics; cannot modify API keys, billing, team, or compliance settings
**Error paths:**
- Invitation email not received → Admin clicks "Resend invite" link in the team table row
- Wrong role assigned → Admin clicks edit icon on the member row → updates role → member's session immediately reflects new permissions
- Member needs to be removed → Admin clicks "Revoke access" → member's active sessions are terminated; row removed from table

---

## Flow 8: View and Export Analytics for a Regulatory Audit

**Actor:** Chief Compliance Officer (CCO) preparing a quarterly KYC audit submission
**Trigger:** Quarterly regulatory audit requirement; regulator requests evidence of KYC program effectiveness
**Steps:**
1. Sidebar → "Analytics" → `/analytics`
2. DateRangePicker → select custom range matching the audit period (e.g., Q1 2026: Jan 1 – Mar 31)
3. Review KPI cards: Total Verifications (48,241), Success Rate (97.4%), Avg. Completion Time (1.8s), Cost per Verification ($0.42)
4. Review Verification Funnel: confirm 89.0% completion rate; identify drop-off at Liveness (step 3); note top drop-off reasons (document quality 38%, camera permission denied 27%)
5. Review Cohort Quality table: confirm re-verification rates are below 1.5% threshold for all cohorts; note any amber-highlighted rows that need attention
6. Scroll to Compliance Audit Log: review 10 most recent events; click "All Events ▾" dropdown to filter to "Credential Issued" only; verify that every issued credential has a corresponding blockchain block number
7. Click "Export Report" (top bar) → PDF download generates (button shows spinner) → toast: "PDF report ready. Check your downloads."
8. Navigate to `/audit-log` → filter by date range → click "Export as CSV" → full tamper-evident event log downloaded
9. Submit both the PDF analytics report and the CSV audit log to the regulator

**Success:** Regulator receives a complete, formatted KYC program report with blockchain-attested event records; all events have validator signatures and block numbers as per the Compliance Audit Log note: "All events are immutably recorded on the Solidus blockchain. Audit logs are tamper-evident and cryptographically signed."
**Error paths:**
- PDF export fails → retry; check status page; contact support
- Audit log does not contain expected events → verify date range filter; check if sandbox mode was active (sandbox events are not in production audit log)
- Regulator requests raw VC JSON → go to Verification Detail for individual sessions → "View Raw JSON" button on CredentialCard → copy/download W3C VC JSON
