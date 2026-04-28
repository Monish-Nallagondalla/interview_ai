# InterviewAI — Submission Documents

## Caselet Requirements Mapping

| Required Area | Document(s) | Prototype Screen(s) |
|---|---|---|
| 1. Coaching & Monitoring Signals | KPIs & Metrics, Product Flow | Gap Analysis (radar + deep dive), Scorecard (6 dims), Pipeline (risk alerts) |
| 2. Data Inputs | System Architecture (§Data Model, §Integration Points) | Onboarding (file upload + enrichment), Gap Analysis (JD upload), Outcomes (feedback) |
| 3. Agent Actions | System Architecture (§8 Agents), Product Flow (7 stages) | Enrichment chat, Story builder, Mock interview, Scoring, Deep Dive |
| 4. User Interaction | Users & Personas, Product Usage Guide | All 3 portals: Candidate (10 screens), Manager (8), Admin (3) |
| 5. Automation Design | Automation Design (autonomous vs HITL matrix) | Pipeline (risk alerts + approval), Outcomes (feedback loop), Audit log |

## Product Documentation

| # | Document | Description |
|---|----------|-------------|
| 01 | [Product Vision & Strategy](01_PRODUCT_VISION.md) | Vision, strategic reframe, principles, cost model, ROI scenarios |
| 02 | [Users, Personas & User Stories](02_USERS_AND_PERSONAS.md) | 4 user types, detailed personas, 40+ user stories, information architecture |
| 03 | [System Architecture & Data Model](03_SYSTEM_ARCHITECTURE.md) | Multi-agent architecture, 8 AI agents, data model, integrations, security |
| 04 | [Automation Design](04_AUTOMATION_DESIGN.md) | Autonomous vs human-in-the-loop matrix, escalation framework, 4 feedback loops |
| 05 | [Product Usage Guide](05_PRODUCT_USAGE_GUIDE.md) | How to use the prototype, every screen explained, design decisions |
| 06 | [Product Flow (7-Stage Journey)](PRODUCT_FLOW.md) | Complete candidate journey from resume upload to interview-ready |
| 07 | [KPIs & Metrics](KPIS_AND_METRICS.md) | Leading/lagging indicators, 6 readiness dimensions, ROI model, audit metrics |
| 08 | [Risks & Reliability](RISKS_AND_RELIABILITY.md) | AI risks, mitigations, observability, circuit breakers, enterprise audit |
| 09 | [12-Month Roadmap & Sprints](ROADMAP_AND_SPRINTS.md) | Quarterly goals, 24 sprints detailed, team assumptions, risk register |
| 10 | [AI Evaluation Framework & Edge Cases](06_AI_EVALS_AND_EDGE_CASES.md) | Agent eval criteria, test batteries, 15 edge cases with handling, production readiness |

## Live Prototype
- **URL:** https://interviewai-orpin.vercel.app
- **Source:** https://github.com/Monish-Nallagondalla/interview_ai
- Tech: Next.js 16 + Tailwind CSS v4 + OpenAI API + Vercel

## Prototype Screens (26 total)

| Portal | Screen | Key Feature |
|---|---|---|
| Landing | `/` | Hero, 7-stage process, flywheel, business case |
| Candidate | `/candidate/onboarding` | File upload + 6-question enrichment + strengthened resume output |
| Candidate | `/candidate/profile` | Enriched skills, experience, AI-extracted notes |
| Candidate | `/candidate/gap-analysis` | JD file upload → radar chart + skill gaps + deep dive conversation |
| Candidate | `/candidate/prep-plan` | 10-day plan + learning resources |
| Candidate | `/candidate/story-builder` | STAR coaching conversation |
| Candidate | `/candidate/story-bank` | All stories mapped to JD requirements with quality scores |
| Candidate | `/candidate/mock-interview` | 3-mode adaptive mock interview |
| Candidate | `/candidate/mock-history` | Score trajectory + per-session radar |
| Candidate | `/candidate/scorecard` | 6-dimension feedback + improvement actions |
| Candidate | `/candidate/interview-day` | Pre-interview checklist + reminders |
| Manager | `/manager/activity` | Real-time activity feed |
| Manager | `/manager/pipeline` | Filterable pipeline + risk alerts |
| Manager | `/manager/match` | JD file upload → ranked candidates |
| Manager | `/manager/compare` | Side-by-side candidate comparison |
| Manager | `/manager/outcomes` | Interview feedback form (flywheel) |
| Manager | `/manager/client-intelligence` | Learned patterns per client |
| Manager | `/manager/analytics` | Live bench cost ticker + conversion trends + ROI |
| Manager | `/manager/candidate/[id]` | Individual drill-down + timeline |
| Admin | `/admin/system-health` | AI metrics + circuit breakers + 8-agent monitoring |
| Admin | `/admin/audit-log` | Decision trail with reasoning chains |
| Admin | `/admin/bias-report` | Gender/department/experience-band bias analysis |
| Docs | `/docs` | PM narrative + thinking + decisions |
| Docs | `/docs/[slug]` | Rendered specification documents |
| Presentation | `/presentation` | 8-slide interactive deck |
