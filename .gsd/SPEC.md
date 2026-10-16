# SPEC.md — AI Connect X Reliability and Account Isolation Review

> **Status**: `FINALIZED`

## Vision
Correct confirmed sign-in, campaign analytics, and pipeline reliability defects in the existing AI Connect X React and FastAPI application, and make CRM data private to the authenticated account while preserving current product flows.

## Goals
1. Keep authentication failures visible to the user and make session initialization predictable.
2. Ensure campaign analytics reflect stored campaign data and cannot display a response for a previously selected campaign.
3. Remove incorrect TypeScript state workarounds and clear frontend lint warnings found during this review.
4. Surface API load and action failures, and validate required form choices correctly.
5. Scope CRM reads and writes to the authenticated account across API routes, AI helpers, analytics, and dashboards.

## Non-Goals (Out of Scope)
- Creating or migrating to a Flutter application; this workspace contains a React + TypeScript frontend.
- Redesigning the application or changing the authentication/storage architecture.
- Adding team sharing, invitations, or organization-level access.

## Constraints
- Preserve existing routes and API response fields; additive analytics fields are acceptable.
- Preserve legacy campaign relationships during ownership migration; duplicate company/contact records when legacy prospects reference them from multiple accounts.
- Assign legacy campaigns with no creator and orphaned company/contact records to the oldest active account; fail startup if legacy data needs an owner but no account exists.
- Do not read or modify secret values in environment files.
- Avoid unrelated feature changes.

## Success Criteria
- [x] Invalid credentials do not trigger a page reload or clear the login form error.
- [x] Selecting campaigns rapidly cannot display stale analytics.
- [x] Campaign analytics counts are computed from the matching campaign's records.
- [x] Pipeline loading state uses its declared nullable type.
- [x] Failed API requests are visible instead of masquerading as empty data.
- [x] A valid contact company selection is required before submission.
- [x] Sent metrics and filters include delivered messages.
- [x] Frontend lint and production build complete successfully.
- [x] API records are private per account, including related records and computed metrics.
- [x] Existing SQLite data is migrated without cross-account links or lost relationships.

## Technical Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Exclude sign-in failures from expired-session redirect handling | Must-have | Keep the API error available to the login page |
| Compute campaign metrics from prospects, messages, and conversations | Must-have | Use existing model fields and classifications |
| Guard campaign analytics requests against out-of-order responses | Must-have | Keep the selected campaign and displayed data in sync |
| Remove stale hook dependency warnings | Should-have | Use callbacks with explicit dependencies |
| Store company/contact ownership and scope dependent data through campaign ownership | Must-have | Reuse `Campaign.created_by` and `Automation.created_by` |
| Migrate legacy records to private ownership | Must-have | Preserve prospect links; clone company/contact records for distinct owners |

---

*Last updated: 2026-10-01*
