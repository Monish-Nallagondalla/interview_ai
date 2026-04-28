# InterviewAI — Submission Documents

## Caselet Requirements Mapping

| Required Area | Document(s) | Prototype Screen(s) |
|---|---|---|
| 1. Coaching & Monitoring Signals | KPIs & Metrics, Product Flow | Gap Analysis (radar), Scorecard (6 dims), Pipeline (risk alerts) |
| 2. Data Inputs | System Architecture (§Data Model, §Integration Points) | Onboarding (resume), Gap Analysis (JD), Outcomes (feedback) |
| 3. Agent Actions | System Architecture (§8 Agents), Product Flow (7 stages) | Enrichment chat, Story builder, Mock interview, Scoring |
| 4. User Interaction | Users & Personas, Product Usage Guide | All 3 portals: Candidate (7 screens), Manager (4), Admin (2) |
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

## Live Prototype
- URL: [To be added after deployment]
- Tech: Next.js 16 + Tailwind + OpenAI API + Vercel
- Source: [To be added — GitHub repo link]

## Prototype Screens (16 total)

| Portal | Screen | Key Feature |
|---|---|---|
| Landing | `/` | Role selector + key metrics |
| Candidate | `/candidate/onboarding` | Resume paste + AI enrichment chat |
| Candidate | `/candidate/profile` | Enriched profile with skills + experience |
| Candidate | `/candidate/gap-analysis` | JD paste → radar chart + skill gaps |
| Candidate | `/candidate/prep-plan` | 10-day personalized prep with checkboxes |
| Candidate | `/candidate/story-builder` | STAR story coach (conversational AI) |
| Candidate | `/candidate/mock-interview` | 3-mode adaptive mock interview |
| Candidate | `/candidate/scorecard` | 6-dimension feedback + next actions |
| Manager | `/manager/pipeline` | Filterable pipeline + risk alerts |
| Manager | `/manager/match` | Upload JD → ranked candidates |
| Manager | `/manager/outcomes` | Interview outcome feedback form (the flywheel) |
| Manager | `/manager/analytics` | Live bench cost ticker + conversion trends + ROI |
| Admin | `/admin/system-health` | AI metrics + circuit breakers + agent performance |
| Admin | `/admin/audit-log` | Decision trail with reasoning chains |
