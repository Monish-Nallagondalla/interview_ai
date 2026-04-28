# InterviewAI — Product Usage Guide

## Overview
InterviewAI is a Bench-to-Billable Acceleration Platform with three portals serving different user types. This guide walks through each portal's features and intended usage.

**Live Prototype:** [URL to be added after deployment]
**Source Code:** [GitHub repo link]

---

## Landing Page (`/`)
Role selector with three entry points. No authentication in the prototype — users select their role to enter the appropriate portal.

Key metrics displayed: 2L+ employees served, 35%→55% conversion target, ₹360Cr+ annual direct savings, 6 readiness dimensions.

---

## 1. Candidate Portal

### Stage 1: Onboarding & Profile Enrichment (`/candidate/onboarding`)
**What it does:** Candidate pastes their resume text. AI initiates a conversation to extract deeper details — quantified achievements, hidden skills, project scale, and impact numbers that are missing from the resume.

**Why it matters:** A weak resume produces weak gap analysis. The enrichment conversation transforms a generic "worked on cloud migration" into "led migration of 200+ servers to AWS, reducing infra costs by 35% and achieving 99.99% uptime."

**How to demo:** Paste any IT professional's resume → AI asks probing questions → answer 3-4 questions → observe how it pushes for quantification.

### Stage 2: Enriched Profile View (`/candidate/profile`)
**What it does:** Displays the candidate's skills (with proficiency bars), work experience (with achievements), and AI-extracted enrichment notes.

**Enterprise context:** In production, this profile becomes the "source of truth" for all downstream matching and coaching — replacing the static resume.

### Stage 3: Gap Analysis (`/candidate/gap-analysis`)
**What it does:** Candidate pastes a target JD. AI generates:
- 6-dimension radar chart (Technical Depth, Communication, STAR Quality, JD Alignment, Confidence, Problem-Solving)
- Skill-by-skill match (strong / partial / missing)
- Prioritized action list ranked by conversion impact

**How to demo:** Paste any JD → click "Run Gap Analysis" → observe the radar chart and specific, actionable gap identification.

### Stage 4: Personalized Prep Plan (`/candidate/prep-plan`)
**What it does:** 10-day preparation plan tailored to the candidate's specific gaps. Each day has:
- Focus area tied to a gap
- 2-3 tasks with time estimates
- Mix of learning, practice, and self-assessment
- Checkable progress tracking

**Design decision:** Plan is 2-3 hours/day — realistic for someone on bench, not a theoretical 8-hour study day.

### Stage 5: STAR Story Builder (`/candidate/story-builder`)
**What it does:** Conversational AI coach that guides candidates through building interview stories using the STAR framework (Situation, Task, Action, Result).
- Maps stories to specific JD requirements
- Pushes for quantified results
- Refines for conciseness (under 2 minutes when spoken)
- Builds a "story bank" of 8-10 interview-ready stories

**How to demo:** Start the conversation → the AI walks through each STAR component → observe how it refines vague answers into structured stories.

### Stage 6: Mock Interview (`/candidate/mock-interview`)
**What it does:** AI conducts a realistic client interview simulation with 3 modes:
- **Practice:** Gentle pace, hints available
- **Simulation:** Realistic, no assistance
- **Stress:** Rapid follow-ups, challenging questions

Questions are tailored to the JD — technical, behavioral, situational, and curveball ("Why are you on bench?").

**How to demo:** Select a mode → start → answer 3-4 questions → observe how the AI adapts (harder follow-ups for strong answers, gentler for weak ones).

### Stage 7: Scorecard & Feedback (`/candidate/scorecard`)
**What it does:** Post-mock scorecard showing:
- Overall score with comparison to previous mock (improvement tracking)
- 6-dimension radar chart
- Top strengths and critical improvements
- Per-dimension detailed feedback with specific references to the candidate's responses
- Prioritized next actions

**Key feature:** Feedback is specific ("your answer about AWS stayed at EC2/S3 level — prepare Lambda and ECS examples") not generic ("improve technical depth").

---

## 2. Manager Dashboard

### Pipeline (`/manager/pipeline`)
**What it does:** All bench candidates in a single view with:
- Filters: department, status, skill search
- Status summary cards (On Bench / In Prep / Ready)
- Per-candidate: readiness score, mock count, trend direction, bench duration

**Risk Alerts section (top of page):**
- 🔴 Stalled candidates (no activity, low enrichment)
- 🟡 Stuck candidates (score plateau after multiple mocks)
- 🟢 Ready candidates (above threshold, pending manager approval)

**Enterprise value:** Managers see their entire bench at a glance and know exactly where to intervene vs. where to leave the AI working.

### JD Matching (`/manager/match`)
**What it does:** Two workflows:
1. **Select existing JD** → instantly ranked candidates by match score
2. **Upload new JD** → paste JD text, AI extracts skills automatically → ranked candidates

Match score = 50% skill match + 20% experience fit + 30% readiness score.

Clicking a candidate expands their radar chart, readiness details, and a "Submit for Interview" action.

**How to demo:** Click "+ Upload New JD" → paste any JD → see candidates ranked instantly with matched/missing skills highlighted.

### Interview Outcomes (`/manager/outcomes`)
**What it does:** Structured form to log interview results:
- Candidate + JD selection
- Pass/Fail toggle
- Client feedback (verbatim or summarized)
- What went well / what needs improvement
- Manager notes (internal only)

Past outcomes displayed with result, candidate, JD, and feedback.

**Why this is critical:** This is the feedback loop that makes the entire system intelligent. Without outcome data, the AI can't calibrate its readiness scores against actual conversion. After 100+ outcomes, the system can predict conversion with >75% accuracy.

### Analytics (`/manager/analytics`)
**What it does:**
- **Live Bench Cost Ticker** — real-time counter showing ₹Cr burned today while candidates sit idle vs. ₹Cr saved by the platform
- Conversion rate trend: with AI vs without AI (6-month chart)
- Org-wide skill gap heatmap (top 10 gaps blocking conversion)
- ROI impact summary: direct savings + revenue recovery + total quarterly impact

**How to demo:** Watch the bench cost ticker increment in real-time — it makes the problem viscerally tangible.

---

## 3. Admin Portal

### System Health (`/admin/system-health`)
**What it does:** AI platform monitoring:
- 10 key metrics (latency, uptime, hallucination rate, bias variance, scoring consistency, user satisfaction)
- Circuit breakers: 5 automatic safeguards with thresholds and current values
- Per-agent performance: 8 AI agents with call volume, latency, and error rates

**Enterprise value:** Demonstrates that AI governance is built-in, not bolted-on. Every metric has a threshold; exceeding it triggers automated safeguards.

### Audit Log (`/admin/audit-log`)
**What it does:** Immutable decision trail showing every AI action:
- Timestamp, agent name, action type, candidate, confidence level
- Full reasoning chain for each decision
- Compliance status indicators

**Enterprise value:** This is what makes the platform audit-ready. Every AI recommendation has a logged explanation — who was scored, how, why, and at what confidence level. Manager overrides are documented with reasons.

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Enrichment BEFORE coaching | Garbage in → garbage out. Fix the profile first. |
| 6 dimensions, not 1 score | A single number doesn't tell you WHAT to improve. |
| 3 mock modes | Candidates need progressive difficulty, not one-size-fits-all. |
| Real-time bench ticker | Makes the cost problem visceral for leadership. |
| Outcome feedback form | The flywheel only works if the loop is closed with real data. |
| Risk alerts on pipeline | Proactive management beats reactive checking. |
| Audit trail with reasoning | EY's DNA is audit and governance — this must be first-class. |
| Two-layer ROI (direct + revenue) | Honest framing: lead with hard savings, show revenue as upside. |

---

## Technical Stack (Prototype)
- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS + shadcn/ui
- **AI:** OpenAI API (gpt-4o-mini) via Next.js API routes
- **Charts:** Custom SVG radar charts
- **State:** React state + localStorage (no database for prototype)
- **Deployment:** Vercel

---

## What's Real AI vs Mock Data

| Real AI (live API calls) | Mock Data (realistic static) |
|---|---|
| Resume enrichment conversation | Candidate pipeline (10 profiles) |
| Gap analysis + radar chart | Conversion analytics |
| STAR story coaching | Audit log entries |
| Mock interview (adaptive) | System health metrics |
| Scorecard generation (fallback) | ROI calculations |
| JD skill extraction | Historical outcomes |
