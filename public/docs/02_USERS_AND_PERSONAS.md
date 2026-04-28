# Users, Personas & User Stories

## User Types (4 Primary + 1 System)

---

## User 1: BENCH CANDIDATE (Primary User)

### Persona: Rajesh — Senior Java Developer, 6 years experience
- **Situation:** Rolled off a banking project 3 weeks ago. Has strong technical skills but struggles to articulate his experience in interviews. His resume lists "Java, Spring Boot, Microservices" but doesn't show the scale or impact of his work.
- **Pain:** Last two interviews failed. Feedback was vague: "didn't demonstrate depth." He doesn't know what to fix.
- **Goal:** Get placed on a client project within 2 weeks. Needs to pass the next interview.
- **Behavior:** Willing to put in effort but doesn't know WHERE to focus. Will use the tool daily if it gives clear direction.

### User Stories — Bench Candidate

#### Onboarding & Profile Enrichment
- As a **candidate**, I want to upload my resume so the system understands my background.
- As a **candidate**, I want the AI to ask me clarifying questions about my experience so my profile captures the full depth of what I've done (not just what my resume says).
- As a **candidate**, I want to see my enriched profile and edit/confirm details so I trust the system's understanding of me.
- As a **candidate**, I want the AI to identify weaknesses in my resume itself so I can strengthen it before it's shared with clients.

#### JD Matching & Gap Analysis
- As a **candidate**, I want to see how my profile matches against a specific JD so I know exactly where I'm strong and where I'm weak.
- As a **candidate**, I want a readiness score across multiple dimensions (not just one number) so I know WHAT to improve, not just that I need to improve.
- As a **candidate**, I want my gaps prioritized by impact on conversion so I focus on what matters most.

#### Preparation
- As a **candidate**, I want a personalized day-by-day prep plan tailored to my specific gaps and the JD so I don't waste time on irrelevant prep.
- As a **candidate**, I want the AI to help me build STAR stories from my real project experience so I can articulate my achievements clearly.
- As a **candidate**, I want learning resources recommended for my specific skill gaps so I can quickly fill technical holes.
- As a **candidate**, I want to track my prep progress so I stay motivated and on schedule.

#### Mock Interviews
- As a **candidate**, I want to practice with AI mock interviews that ask questions relevant to MY JD (not generic) so I'm prepared for the actual interview.
- As a **candidate**, I want the mock to adapt — harder questions if I'm doing well, supportive hints if I'm struggling — so I'm challenged at my level.
- As a **candidate**, I want different mock modes (practice, simulation, stress) so I can build up gradually.
- As a **candidate**, I want my mock responses scored on clear dimensions so I know exactly what was good and what wasn't.

#### Feedback & Improvement
- As a **candidate**, I want detailed feedback after each mock (not just a score) with examples of better answers so I learn concretely.
- As a **candidate**, I want to see my improvement over time (score trends) so I know I'm getting better.
- As a **candidate**, I want to know when I've crossed the "ready" threshold so I feel confident going into the real interview.
- As a **candidate**, I want feedback from my actual interviews (when captured) to flow back into my next prep cycle so I don't repeat mistakes.

---

## User 2: DELIVERY MANAGER / RESOURCE MANAGER

### Persona: Priya — Delivery Manager, manages 80 employees across 4 projects
- **Situation:** 12 of her team members are on bench or rolling off this quarter. She's spending 4-5 hours/week coaching them for interviews with inconsistent results.
- **Pain:** No visibility into who's ready, who's struggling, or where to focus her limited time. Some candidates fail for the same reason 3 times.
- **Goal:** Get her bench team placed quickly. Spend less time on coaching, more time on delivery. Show her leadership that bench costs are coming down.
- **Behavior:** Will check the dashboard 2-3x/week. Will intervene only when system flags issues. Doesn't want to micromanage.

### User Stories — Delivery Manager

#### Visibility & Pipeline
- As a **manager**, I want to see all my bench candidates in one view with their readiness scores so I know who needs attention.
- As a **manager**, I want to filter candidates by skill, experience, department, and readiness level so I can quickly find the right person for a new JD.
- As a **manager**, I want to be notified when a candidate crosses the readiness threshold so I know they're ready to be submitted for interviews.
- As a **manager**, I want to be alerted when a candidate isn't progressing (stuck) so I can intervene early.

#### JD Matching & Staffing
- As a **manager**, I want to upload/paste a client JD and see which of my bench candidates are the best fit so I send the right people to the right interviews.
- As a **manager**, I want the AI to rank candidates against a JD by readiness + skill fit so I make data-driven staffing decisions.
- As a **manager**, I want to see why the AI ranked one candidate higher than another (explainability) so I can validate or override.

#### Coaching & Intervention
- As a **manager**, I want to drill into an individual candidate's preparation journey (what they've done, where they're stuck, mock scores) so I can provide targeted coaching.
- As a **manager**, I want to add notes or context about a candidate (e.g., "this person is nervous but technically strong — focus on confidence") so the AI can adjust.
- As a **manager**, I want to override the AI readiness score when I have context the system doesn't so decisions remain human.

#### Outcomes & Reporting
- As a **manager**, I want to log interview outcomes (pass/fail + feedback) so the system learns and improves.
- As a **manager**, I want to see conversion rate trends for my team over time so I can demonstrate impact to leadership.
- As a **manager**, I want to see which preparation activities correlate with conversion so I can recommend proven paths.

---

## User 3: L&D / TALENT DEVELOPMENT LEAD

### Persona: Arun — Head of Learning & Development
- **Situation:** Manages a catalog of 2,000+ learning programs. Gets budget requests quarterly but has no data on which skill gaps actually block interview conversion.
- **Pain:** Invests in broad training programs that may not address the specific gaps causing interview failures.
- **Goal:** Align L&D investment with actual conversion-blocking gaps. Prove ROI of training spend.
- **Behavior:** Reviews data monthly/quarterly. Wants aggregate insights, not individual candidate details.

### User Stories — L&D Lead

- As an **L&D lead**, I want to see the most common skill gaps across all bench candidates so I can prioritize training program development.
- As an **L&D lead**, I want to know which skill gaps correlate most strongly with interview failure so I invest in what actually matters.
- As an **L&D lead**, I want to map my existing learning catalog to the gaps the AI identifies so candidates get recommended relevant courses.
- As an **L&D lead**, I want to see which learning resources candidates actually complete AND whether completion improves their scores so I can measure L&D effectiveness.
- As an **L&D lead**, I want a quarterly report showing: top gaps, training utilization, and gap-closure rates so I can justify budget.

---

## User 4: STAFFING / RMG (Resource Management Group)

### Persona: Neha — Staffing Lead, handles allocation for 3 business units
- **Situation:** Gets 50+ JD requests per week from clients. Manually matches bench candidates to JDs based on skill tags in HRMS. Often sends under-prepared candidates.
- **Pain:** No readiness signal. Sends people based on skill match alone, but they fail on articulation/depth. Wastes client interview slots.
- **Goal:** Send the RIGHT candidate to the RIGHT interview at the RIGHT time. Maximize conversion per interview slot.

### User Stories — Staffing/RMG

- As a **staffing lead**, I want to input a client JD and get AI-ranked candidate recommendations (skill fit + readiness combined) so I optimize interview slot utilization.
- As a **staffing lead**, I want to see candidate readiness trajectories so I can decide whether to wait 3 more days for someone to be ready vs. sending someone else now.
- As a **staffing lead**, I want historical data on which candidate profiles convert with which clients so I build client-specific matching intelligence.
- As a **staffing lead**, I want to bulk-assign a JD to multiple candidates (triggering their prep journeys simultaneously) so I have options.
- As a **staffing lead**, I want conversion analytics by client, role-type, and business unit so I identify systemic patterns.

---

## User 5: SYSTEM ADMINISTRATOR / PLATFORM OPS

### Persona: DevOps/Platform team member
- **Situation:** Responsible for platform health, data integrity, and compliance.

### User Stories — System Admin

- As an **admin**, I want to monitor AI system health (latency, error rates, hallucination flags) so I ensure platform reliability.
- As an **admin**, I want a full audit trail of every AI recommendation and score so the organization meets compliance requirements.
- As an **admin**, I want to run bias detection reports across scoring data so we catch and correct unfair patterns.
- As an **admin**, I want to manage user roles and access (who sees what data) so we maintain data privacy.
- As an **admin**, I want model versioning and rollback capability so we can revert if a new model performs worse.

---

## User Interaction Summary

| User | Primary Interaction | Frequency | Key Screen |
|------|-------------------|-----------|-----------|
| Candidate | Chat-based coaching + dashboard | Daily during prep | Prep plan + Mock interview |
| Manager | Dashboard + JD matching | 2-3x/week | Pipeline view + Candidate drill-down |
| L&D Lead | Analytics + Reports | Monthly/Quarterly | Skill gap heatmap + Training effectiveness |
| Staffing/RMG | JD upload + Matching | Daily | Candidate ranking + Readiness timelines |
| System Admin | Monitoring + Compliance | Weekly | Health dashboard + Audit logs |

---

## Information Architecture (App Structure)

```
/candidate
  /onboarding          → Resume upload + enrichment chat
  /profile             → Enriched profile view + edit
  /opportunities       → Available JDs matched to them
  /opportunity/:id     → Gap analysis for specific JD
  /prep-plan/:id       → Day-by-day preparation plan
  /story-builder       → STAR story creation (conversational)
  /mock-interview/:id  → Mock interview session
  /scorecard/:id       → Post-mock feedback + scores
  /progress            → Overall readiness trends + history

/manager
  /pipeline            → All bench candidates (filterable)
  /match               → Upload JD → get ranked candidates
  /candidate/:id       → Individual drill-down
  /analytics           → Conversion trends, team performance
  /interventions       → Alerts, stuck candidates, escalations

/admin
  /system-health       → AI performance, latency, errors
  /audit-log           → Complete decision trail
  /bias-reports        → Scoring fairness analytics
  /settings            → Roles, access control, configurations

/lnd (L&D)
  /skill-gaps          → Org-wide gap heatmap
  /training-impact     → Course completion vs score improvement
  /recommendations     → AI-suggested programs to develop
```
