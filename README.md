# InterviewAI — Bench-to-Billable Acceleration Platform

> An AI-powered coaching platform that transforms bench time into interview readiness — reducing bench costs by improving client interview conversion for large IT/ITeS organizations.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat-square&logo=openai)](https://openai.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## Overview

In a 2,00,000+ employee IT/ITeS organization, ~10% of the workforce cycles through bench status every quarter. Employees fail client interviews not because of capability gaps, but because of **preparation fragmentation** — no structured coaching, no feedback loops, no personalization to the specific JD.

InterviewAI treats this as an **operating model problem**, not a chatbot problem. It sits as an AI layer between bench allocation and interview scheduling — strengthening candidate profiles, delivering JD-specific coaching, and giving managers real-time visibility into bench readiness.

**The business case:**
- 12,000 employees on bench at any time × ₹2L/month fully loaded = **₹240 Cr/month** direct burn
- Conservative: +15 percentage point conversion improvement → **₹90 Cr/quarter** in direct savings
- Platform investment: ₹8–12 Cr Year 1 → **30–90x ROI**

---

## Live Demo

**[→ View Live App](https://interview-ai-navy.vercel.app)**

| Portal | Path | Description |
|--------|------|-------------|
| Candidate Portal | `/candidate/onboarding` | Full 10-screen AI coaching journey |
| Manager Dashboard | `/manager/pipeline` | Bench pipeline, JD matching, analytics |
| Admin Console | `/admin/system-health` | AI monitoring, audit logs, bias reports |
| Documentation | `/docs` | PM narrative + full specification docs |
| Presentation | `/presentation` | 8-slide interactive deck |

---

## Screenshots

### Landing Page
Dark hero section with product overview, 7-stage coaching process, intelligence flywheel diagram, and fully derived business case.

### Candidate Portal
Profile enrichment chat → gap analysis radar → personalized prep plan → STAR story builder → adaptive mock interview → scorecard with improvement tracking.

### Manager Dashboard
Live bench cost ticker, risk-flagged pipeline, JD-to-candidate matching with radar chart drill-down, client intelligence patterns from historical outcomes.

### Admin Console
8-agent health monitoring, immutable audit trail with AI reasoning chains, gender and department bias reporting with quarterly action tracking.

---

## Features

### Candidate Portal (10 screens)

| Screen | Feature |
|--------|---------|
| Onboarding | Resume paste + AI enrichment conversation |
| Profile | Enriched skills, experience, AI-extracted achievements |
| Gap Analysis | JD paste → 6-dimension radar + skill-by-skill breakdown |
| Prep Plan | 10-day personalized plan + curated learning resources |
| Story Builder | STAR coaching — builds stories from real project experience |
| Story Bank | All stories mapped to JD requirements with quality scores |
| Mock Interview | 3 modes: Practice / Simulation / Stress — JD-tailored questions |
| Mock History | Score trajectory chart + per-session radar comparison |
| Scorecard | 6-dimension feedback with specific improvement actions |
| Interview Day | Pre-interview checklist + reminders + confidence message |

### Manager Dashboard (8 screens)

| Screen | Feature |
|--------|---------|
| Activity Feed | Real-time updates: readiness alerts, mock completions, outcomes |
| Pipeline | Filterable table with risk alerts — stalled / stuck / ready |
| JD Matching | Upload JD → AI-ranked candidates by skill fit + readiness |
| Compare | Side-by-side radar charts for up to 3 candidates |
| Outcomes | Interview feedback form — closes the model calibration loop |
| Client Intelligence | Learned interview patterns per client from historical outcomes |
| Analytics | Live bench cost ticker, conversion trends, ROI summary |
| Candidate Drill-down | Full profile, mock trajectory, readiness timeline |

### Admin Console (3 screens)

| Screen | Feature |
|--------|---------|
| System Health | 10 metrics, 5 circuit breakers, 8-agent performance |
| Audit Log | Every AI decision logged with reasoning chain |
| Bias Report | Gender/department variance analysis, quarterly actions |

---

## Architecture

### Multi-Agent AI Design

8 specialized agents, each with a single responsibility:

| Agent | Responsibility |
|-------|---------------|
| Profile Enrichment | Conversational resume strengthening |
| JD Parser | Structured requirement extraction |
| Gap Analyzer | 6-dimension scoring against JD |
| Prep Plan Generator | Personalized plan from gap priorities |
| Story Coach | STAR story building and refinement |
| Mock Interviewer | Adaptive interview simulation |
| Feedback Scorer | Multi-dimension post-mock evaluation |
| Learning Recommender | Gap-to-resource mapping |

### Automation Framework

| Category | Activities | Owner |
|----------|-----------|-------|
| Fully Autonomous | Scoring, gap analysis, prep plans, mocks, story drafts | AI |
| Human-in-the-Loop | Readiness declaration, interview submission, score override | Manager |
| Human-Triggered | Escalations, career path guidance, bias investigations | HR / Leadership |

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| AI | OpenAI GPT-4o-mini via Next.js API routes |
| Charts | Custom SVG (radar charts) |
| State | React state + localStorage |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Landing page
│   ├── candidate/                   # 10-screen candidate portal
│   │   ├── onboarding/
│   │   ├── profile/
│   │   ├── gap-analysis/
│   │   ├── prep-plan/
│   │   ├── story-builder/
│   │   ├── story-bank/
│   │   ├── mock-interview/
│   │   ├── mock-history/
│   │   ├── scorecard/
│   │   └── interview-day/
│   ├── manager/                     # 8-screen manager dashboard
│   │   ├── activity/
│   │   ├── pipeline/
│   │   ├── match/
│   │   ├── compare/
│   │   ├── outcomes/
│   │   ├── client-intelligence/
│   │   ├── analytics/
│   │   └── candidate/[id]/
│   ├── admin/                       # 3-screen admin console
│   │   ├── system-health/
│   │   ├── audit-log/
│   │   └── bias-report/
│   ├── docs/                        # PM narrative + rendered specs
│   │   └── [slug]/
│   ├── presentation/                # 8-slide interactive deck
│   └── api/ai/                      # Serverless AI endpoints
│       ├── enrich/
│       ├── gap-analysis/
│       ├── story-coach/
│       └── mock/
├── components/
│   ├── layout/portal-layout.tsx     # Shared portal shell (header + sidebar)
│   ├── chat/chat-interface.tsx      # Reusable chat (enrichment / story / mock)
│   ├── charts/radar-chart.tsx       # 6-dimension SVG radar chart
│   └── candidate-status-bar.tsx    # Persistent readiness + streak tracker
└── lib/
    ├── types.ts                     # TypeScript interfaces
    ├── mock-data.ts                 # Enterprise mock data (10 candidates, 4 JDs)
    └── prompts.ts                   # All AI system prompts (6 agents)
public/
└── docs/                            # 9 product specification markdown files
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key (optional — graceful fallbacks exist without one)

### Installation

```bash
git clone https://github.com/Monish-Nallagondalla/interview_ai.git
cd interview_ai
npm install
```

### Environment

Create `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

> Without a key, all AI screens use realistic pre-built fallback responses. The full demo experience works without credentials.

### Run

```bash
npm run dev      # localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

---

## Product Documentation

All specs are rendered and accessible at `/docs` in the live app:

| Document | Description |
|----------|-------------|
| [Product Vision](public/docs/01_PRODUCT_VISION.md) | Strategic reframe, principles, ROI model with full derivation |
| [Users & Personas](public/docs/02_USERS_AND_PERSONAS.md) | 4 user types, 40+ user stories, information architecture |
| [System Architecture](public/docs/03_SYSTEM_ARCHITECTURE.md) | 8 AI agents, data model schemas, integration points |
| [Automation Design](public/docs/04_AUTOMATION_DESIGN.md) | Autonomous vs HITL matrix, escalation SLAs, 4 feedback loops |
| [KPIs & Metrics](public/docs/KPIS_AND_METRICS.md) | Leading/lagging indicators, full ROI derivation |
| [Product Flow](public/docs/PRODUCT_FLOW.md) | 7-stage candidate journey with agent mapping |
| [Risks & Reliability](public/docs/RISKS_AND_RELIABILITY.md) | 6 AI risks, circuit breakers, observability stack |
| [Roadmap & Sprints](public/docs/ROADMAP_AND_SPRINTS.md) | 12-month plan, 24 sprints, team assumptions |
| [Usage Guide](public/docs/05_PRODUCT_USAGE_GUIDE.md) | Screen-by-screen walkthrough, real vs mock data |

---

## Business Case

### Bench Population (2,00,000-employee org)

| Segment | Headcount | Basis |
|---------|-----------|-------|
| Currently on bench | ~12,000 (6%) | TCS FY24: 5–6%, Infosys: 6–7% during demand fluctuation |
| Rolling off this quarter | ~8,000 (4%) | 15–20% of workforce within 90 days of project end; 25–30% unconfirmed |
| **Total addressable / quarter** | **~20,000** | Combined bench + proactive preparation pool |

### Per-Employee Cost

| Component | Monthly | Derivation |
|-----------|---------|-----------|
| Blended salary | ₹1–1.25L | Junior (35%) + Mid (40%) + Senior (20%) + Lead (5%) |
| Fully loaded | ₹2L | 1.6–1.8× multiplier: PF, insurance, infra, mgmt overhead |
| Lost billing | ₹4L | $30/hr × 160 hrs/month |
| **Total impact** | **₹6L** | Per idle employee per month |

### Conservative Scenario

| Metric | Value |
|--------|-------|
| Conversion: 35% → 50% | +15 percentage points |
| Additional conversions/quarter | 9,000 |
| Direct savings/conversion | ₹1L |
| **Quarterly direct savings** | **₹90 Cr** |
| Including revenue recovery | ₹270 Cr/quarter |
| **Annual total impact** | **₹1,080 Cr** |
| Platform cost Year 1 | ₹8–12 Cr |
| **ROI** | **30–90x** |

---

## Commit History

| # | Commit | Description |
|---|--------|-------------|
| 1 | `chore: initialise` | Next.js scaffold, Tailwind v4, shadcn/ui |
| 2 | `feat: design system` | Color tokens, Inter font, UI primitives |
| 3 | `feat: data layer` | TypeScript types, mock data, AI prompts |
| 4 | `feat: shared components` | Portal layout, chat, radar chart, status bar |
| 5 | `feat: landing page` | Hero, how-it-works, flywheel, business case |
| 6 | `feat: candidate portal` | 10-screen coaching journey |
| 7 | `feat: AI API routes` | 4 serverless endpoints with fallbacks |
| 8 | `feat: manager dashboard` | 8-screen pipeline and analytics |
| 9 | `feat: admin console` | Health, audit trail, bias reporting |
| 10 | `feat: docs + presentation` | PM narrative, rendered specs, 8-slide deck |

---

## About

Built by **Monish Nallagondalla** — AI Product Manager with hands-on experience in multi-agent LLM systems, RAG pipelines, and enterprise AI product delivery.

- Previously built an AI interview prep platform at Syncner (shipped to active users)
- Designed a 37-edge-case AI agent for healthtech with human-in-the-loop approval workflows
- Architected RAG curriculum assistant and personalized learning engine for edtech (Nirmaan)
- Built a 12-agent AI orchestration system for Pingmedia (CrewAI + LangChain)
- 4+ years of cross-domain experience across India and the UK

**Contact:** nsmonish@gmail.com · [LinkedIn](https://linkedin.com/in/monish-nallagondalla) · [GitHub](https://github.com/Monish-Nallagondalla)

---

*Built as a product design assessment for the EY Digital & Emerging Technology practice — AI/Tech Strategy Consultant role.*
