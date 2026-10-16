# ROADMAP.md — Reliability Review

## Phase 1: Correctness and verification

**Objective:** Fix the confirmed authentication, analytics, and pipeline defects found in the current React + FastAPI app.

### Tasks
- [x] Preserve login errors by excluding credential requests from the global 401 redirect.
- [x] Make auth bootstrap run only for the stored startup session and avoid stale async state writes.
- [x] Compute campaign analytics fields from campaign-related records, including company/contact counts, message states, and reply sentiment.
- [x] Prevent stale analytics responses from replacing results for a newer campaign selection.
- [x] Correct the pipeline qualify loading sentinel and resolve hook dependency warnings.
- [x] Surface failed data loads and user actions; prevent failed requests from appearing as empty results.
- [x] Require an actual company selection in the contact form.
- [x] Include delivered messages in sent totals and the sent-message filter.
- [x] Run frontend lint and production build; inspect the final diff.

**Verification:** `npm run lint` and `npm run build` in `frontend/`.

## Phase 2: Private per-account data

**Objective:** Ensure every authenticated account can access only its own CRM records and derived metrics.

### Tasks
- [x] Add company/contact owners and an idempotent upgrade path for existing SQLite/PostgreSQL databases.
- [x] Preserve existing campaign links; clone companies and contacts when legacy prospects span account owners.
- [x] Scope campaign, company, contact, prospect, outreach, follow-up, conversation, automation, AI, dashboard, and analytics endpoints.
- [x] Verify account isolation through direct IDs and list endpoints; aggregate queries are scoped by campaign owner.
- [x] Run lint, production build, backend syntax checks, and in-memory ownership integration fixtures.
