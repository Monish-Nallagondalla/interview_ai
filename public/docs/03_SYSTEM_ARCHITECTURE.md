# System Architecture & Data Model

## High-Level Architecture

> **The architecture diagram is available as a visual, interactive page.**
> View it here: [/docs/architecture](/docs/architecture)
>
> The diagram below is the text specification for reference.

### Layer 1 — Presentation
Four user-facing portals: Candidate Portal, Manager Dashboard, L&D Analytics, Staffing/RMG Matching Tool.

### Layer 2 — Orchestration
Routes requests to appropriate AI agents, manages session state, enforces guardrails, logs every decision with reasoning chain.

### Layer 3 — AI Agents (8 specialists)
| Group | Agents |
|-------|--------|
| Profile Agents | Resume Parser, Enrichment Chatbot, Profile Builder, Evidence Analyzer |
| Gap Agents | JD Parser, Skill Matcher, Gap Ranker, Deep Dive Prober |
| Coaching Agents | Prep Plan Generator, Story Coach, Mock Interviewer, Learning Recommender |
| Evaluation Agents | Mock Scorer, Readiness Calculator, Bias Detector, Outcome Correlator |

### Layer 4 — Data
| Store | Contents |
|-------|----------|
| Candidate Profiles | Rich profiles, STAR stories, mock sessions, readiness scores, evidence vault |
| Enterprise Data | Skill taxonomy, JD library, L&D catalog, project history |
| AI/ML Models | Scoring models, question banks, embedding store, calibration datasets |
| Analytics & Audit | Decision logs, outcome data, conversion analytics, bias reports |

### Integration Layer
HRMS (SAP/Workday) · Staffing System · LMS (Internal) · Communication (Email/Teams)

---

## Multi-Agent Architecture (Detailed)

### Agent 1: Resume Parser & Profile Builder
- **Input:** Resume PDF/DOCX or pasted text
- **Action:** Extract structured data (skills, companies, roles, durations, technologies, certifications)
- **Output:** Structured profile JSON with confidence scores per extracted field
- **Tech:** Document parsing (PyPDF/Docling) + LLM extraction with structured output

### Agent 2: Profile Enrichment Chatbot
- **Input:** Parsed profile (with gaps/weak areas flagged)
- **Action:** Conversational interview to fill gaps:
  - Quantify vague achievements ("How many users? What was the $$ impact?")
  - Extract hidden skills ("You did microservices — did you handle the CI/CD too?")
  - Build missing context ("What was the business problem you were solving?")
- **Output:** Enriched profile with detailed project stories, quantified achievements, full skill inventory
- **Tech:** Conversational LLM with context of parsed profile + gap indicators

### Agent 3: JD Parser & Requirement Extractor
- **Input:** Raw JD text
- **Action:** Structure into:
  - Must-have vs nice-to-have skills (weighted)
  - Experience requirements (years, domain, scale)
  - Soft skill signals (extracted from language patterns)
  - Hidden requirements (industry conventions)
  - Interview likely-topics (predicted from JD language)
- **Output:** Structured JD profile with weighted requirement list
- **Tech:** LLM with few-shot prompting + JD domain knowledge

### Agent 4: Gap Analyzer & Readiness Scorer
- **Input:** Enriched candidate profile + Structured JD
- **Action:** Multi-dimensional comparison:
  - Skill-by-skill match (present/absent/partial + proficiency level)
  - Experience gap (years, scale, domain relevance)
  - Story coverage (which JD requirements have STAR stories ready)
  - Articulation quality (from enrichment conversation quality signals)
- **Output:** 6-dimension radar score + prioritized gap list + readiness percentage
- **Tech:** LLM evaluation + rule-based scoring rubric

### Agent 5: Prep Plan Generator
- **Input:** Gap analysis output + candidate availability + interview date
- **Action:** Generate day-by-day preparation plan:
  - Priority gaps first (highest impact on conversion)
  - Mix of learning (fill knowledge gaps) + practice (improve articulation)
  - Checkpoints and self-assessment moments
  - Realistic time estimates per activity
- **Output:** Structured daily plan with tasks, resources, and milestones
- **Tech:** LLM generation constrained by gap priorities + time available

### Agent 6: STAR Story Coach
- **Input:** Candidate's project history + JD requirements to cover
- **Action:** Conversational story building:
  - Map relevant experiences to JD requirements
  - Guide through S-T-A-R structure with probing questions
  - Refine for clarity, quantification, and relevance
  - Ensure stories are under 2 minutes when spoken
- **Output:** Story bank (8-10 polished STAR stories mapped to JD requirements)
- **Tech:** Conversational LLM with STAR framework + refinement loops

### Agent 7: Mock Interviewer
- **Input:** Structured JD + candidate profile + difficulty mode + past mock scores
- **Action:** Conduct adaptive interview:
  - Questions tailored to JD (technical + behavioral + situational)
  - Follow-up probing based on response quality
  - Difficulty adjustment (easier if struggling, harder if excelling)
  - Curveball questions (bench explanation, salary expectations, etc.)
- **Output:** Full mock transcript with per-response quality signals
- **Tech:** LLM with JD context + adaptive prompt chaining + question bank

### Agent 8: Feedback Scorer & Recommender
- **Input:** Mock transcript + scoring rubric + JD context
- **Action:** Score across 6 dimensions:
  - Technical Depth (accuracy, specificity, trade-off awareness)
  - Communication Clarity (structure, conciseness, jargon appropriateness)
  - STAR Quality (complete stories, quantified results, relevance)
  - JD Alignment (answers map to what this role needs)
  - Confidence & Presence (assertive language, no excessive hedging)
  - Problem-Solving (structured thinking, edge case awareness)
- **Output:** Scorecard + per-answer feedback + improvement suggestions + updated readiness score
- **Tech:** LLM-as-judge with rubric + multi-pass evaluation for consistency

---

## RAG Architecture (Retrieval-Augmented Generation)

Pure LLM generation is insufficient for a production interview coaching system. Without retrieval, agents hallucinate question banks, invent learning resources, and score without calibration anchors. RAG grounds every agent output in real organizational data.

### Where RAG Is Used

| Agent | What It Retrieves | Vector Store | Embedding Strategy |
|-------|------------------|-------------|-------------------|
| **Mock Interviewer** | Relevant interview questions for the JD's skill set | Question Bank Store | JD skills + difficulty level embedded per question |
| **Learning Recommender** | Courses and resources matching the candidate's specific gaps | L&D Catalog Store | Gap description + skill name embedded per resource |
| **Story Coach** | Example STAR stories for similar roles and requirements | Story Example Store | JD requirement + domain embedded per example story |
| **Gap Analyzer** | Past candidate profiles with similar backgrounds and their outcomes | Outcome History Store | Skill vector + domain + experience band embedded per profile |
| **Evidence Vault Analyzer** | Candidate's existing profile entries to cross-reference uploaded docs | Candidate Profile Store | Achievement + skill descriptions embedded per profile entry |
| **Feedback Scorer** | Calibration examples — scored responses with known quality levels | Calibration Store | Response text + dimension scores embedded per calibration sample |

### RAG Pipeline (Per Agent)

```
User input / agent trigger
        ↓
Query formulation — convert input to retrieval query
  (e.g., "Java, Spring Boot, BFSI domain, senior level" for mock questions)
        ↓
Embedding — encode query using same model as document corpus
        ↓
Vector similarity search — retrieve top-K most relevant chunks
  (cosine similarity, typically K=5-10)
        ↓
Context injection — retrieved chunks prepended to LLM system prompt
        ↓
LLM generation — grounded in retrieved context, not free generation
        ↓
Output + source logging — every output logs which chunks were retrieved
```

### Vector Stores

| Store | Contents | Size Estimate | Update Frequency |
|-------|----------|--------------|-----------------|
| Question Bank | 10,000+ interview questions tagged by skill, domain, difficulty | ~50MB | Monthly (curated + generated) |
| L&D Catalog | All internal courses + curated external resources, chunked by topic | ~30MB | Weekly sync from LMS |
| STAR Story Examples | 500+ anonymized high-quality STAR stories by role type | ~20MB | Quarterly (human-curated) |
| Outcome History | Anonymized past candidate profiles + interview outcomes | Grows with usage | Real-time as outcomes are logged |
| Calibration Samples | 200+ scored mock responses per dimension | ~10MB | Monthly (human calibration) |

### Embedding Model
- **Model:** `text-embedding-3-small` (OpenAI) or equivalent — 1536 dimensions
- **Chunking:** 512 tokens with 50-token overlap for document stores
- **Re-embedding trigger:** Any document update causes affected chunks to be re-embedded

### Why RAG Over Fine-Tuning

| Approach | Pros | Cons | Our Choice |
|----------|------|------|-----------|
| Fine-tuning | Fast inference, no retrieval latency | Expensive to update, knowledge frozen at training | ✗ |
| RAG | Always current, auditable sources, org-specific | Retrieval latency (~200ms) | ✓ |
| Prompt engineering alone | Simple | Hallucination risk, no org data grounding | ✗ |

RAG is preferred because the question bank, L&D catalog, and outcome history change frequently. A fine-tuned model would be stale within weeks. RAG keeps the system grounded in live organizational data without retraining.

---

## Personalization Engine

Generic coaching fails because it treats all candidates as identical. A 10-year cloud architect preparing for an Azure role needs different coaching than a 3-year Java developer preparing for the same role. The personalization engine ensures every coaching touchpoint is adapted to the individual.

### Personalization Dimensions

| Dimension | Data Signal | How It Personalizes |
|-----------|------------|-------------------|
| **Experience Band** | Years of experience, seniority level | Readiness score threshold adjusted (senior = higher bar), mock difficulty baseline calibrated |
| **Domain History** | Past project domains (BFSI, Retail, Healthcare) | Domain-specific examples used in story coaching; domain-relevant mock questions prioritized |
| **Skill Proficiency** | Self-reported + demonstrated in enrichment + verified in mocks | Prep plan time allocation weighted by gap severity; low-proficiency skills get more practice time |
| **Learning Velocity** | Rate of score improvement across mock sessions | Slow improvers get more foundational resources; fast improvers get harder drills faster |
| **Prep Engagement** | Completion rate, days active, streak length | Nudge timing and frequency adapted (disengaged candidates get more check-ins) |
| **Articulation Style** | Verbose vs concise response patterns detected in enrichment | Story coach adapts guidance: verbose candidates coached on brevity, terse candidates coached on depth |
| **Interview Timeline** | Days until actual interview | Prep plan compressed or expanded; near-interview candidates skip learning phases, go straight to mocks |
| **Client Intelligence** | What specific clients look for (from outcome history) | Mock interviewer adjusts question style to match client's known preferences |

### Personalization Signals — Where They Come From

```
Resume upload
  → Skills, experience band, domain history extracted at parse time
  → Stored in candidate profile as baseline signals

Enrichment conversation
  → Articulation style detected (response length, structure quality)
  → Technical depth demonstrated (specificity of answers)
  → Confidence signals (hedging language, directness)

Gap analysis
  → Skill-level proficiency scores established per dimension
  → JD-specific gaps prioritized into prep plan weighting

Mock interview sessions
  → Learning velocity calculated (score delta per session)
  → Specific weak dimensions identified
  → Response patterns (verbose/terse, structured/unstructured)

Outcome data (from manager feedback loop)
  → Calibrates which preparation activities actually correlate with conversion
  → Client-specific patterns inform mock question selection
```

### Personalization in Practice

**Example 1 — Same JD, different candidates:**

> Candidate A: 8 years Java, BFSI domain, verbose responder
> Candidate B: 3 years Java, Retail domain, terse responder
>
> Candidate A's prep plan: Focuses on conciseness drills, system design depth, leadership STAR stories. Mock mode starts at Simulation.
>
> Candidate B's prep plan: Focuses on technical depth building, domain knowledge for BFSI, expanding answers with quantification. Mock mode starts at Practice.

**Example 2 — Same candidate, different timeline:**

> Interview in 10 days: Full 7-stage journey activated.
> Interview in 3 days: Stages 1-3 skipped (or fast-tracked). Focus immediately on mock interviews and story polish.
> Interview tomorrow: Only interview day checklist and story review activated.

**Example 3 — Client-specific personalization:**

> Candidate preparing for Global Bank Corp.
> System knows from 47 past interviews: Global Bank Corp asks system design in 92% of interviews and values concise answers (avg successful interview: 28 min).
> Mock interviewer automatically includes a system design question and flags any response over 2.5 minutes as "needs to be shorter."

### Personalization vs Privacy

All personalization signals are:
- Derived from the candidate's own inputs and session data — no external profiling
- Visible to the candidate on request ("why is my prep plan structured this way?")
- Not shared cross-candidate — insights are statistical (Client X patterns) not individual comparisons
- Deletable on request (DPDP / GDPR right to erasure)

---

## Data Model (Core Entities)

### Candidate Profile
```
{
  id, name, email, department, business_unit, bench_since,
  skills: [{ name, proficiency_level, years, last_used, evidence }],
  experiences: [{ company, role, duration, domain, technologies, achievements[] }],
  projects: [{ name, description, scale, impact, role_played, tech_stack }],
  certifications: [{ name, provider, date, relevance_score }],
  star_stories: [{ requirement_mapped_to, situation, task, action, result, quality_score }],
  enrichment_completeness: 0-100,
  resume_raw, resume_parsed, profile_enriched
}
```

### Job Description (Structured)
```
{
  id, client_name, role_title, raw_text,
  requirements: [{ skill, importance: must/nice, proficiency_needed, evidence_type }],
  experience_needed: { years, domain, scale },
  soft_skills: [{ signal, importance }],
  hidden_requirements: [],
  interview_topics_predicted: [],
  created_by, created_at
}
```

### Readiness Assessment
```
{
  candidate_id, jd_id, assessed_at,
  overall_score: 0-100,
  dimensions: {
    technical_depth: { score, gaps[], strengths[] },
    communication_clarity: { score, feedback },
    star_quality: { score, coverage_pct, weak_stories[] },
    jd_alignment: { score, matched[], unmatched[] },
    confidence: { score, indicators[] },
    problem_solving: { score, feedback }
  },
  priority_actions: [{ action, impact, effort }],
  ready_for_interview: boolean,
  ai_confidence: high/medium/low
}
```

### Mock Interview Session
```
{
  id, candidate_id, jd_id, mode: practice/simulation/stress,
  started_at, completed_at, duration_minutes,
  questions: [{
    question, category, difficulty,
    response, response_length, response_time_seconds,
    score_per_dimension: {},
    feedback, better_answer_example
  }],
  overall_scores: {},
  improvement_vs_previous: {},
  next_actions: []
}
```

### Interview Outcome (Feedback Loop)
```
{
  candidate_id, jd_id, interview_date,
  result: pass/fail,
  client_feedback: { structured: {}, freetext: "" },
  manager_notes: "",
  ai_readiness_score_at_time: number,
  prediction_accurate: boolean,
  learnings_for_model: []
}
```

---

## Integration Points

| System | Data Flow | Direction |
|--------|-----------|-----------|
| HRMS (SAP SuccessFactors / Workday) | Employee profiles, bench status, department data | Inbound |
| Staffing System | JDs, allocation status, interview schedules | Bidirectional |
| LMS (Internal) | Course catalog, completion records, certifications | Bidirectional |
| Communication (Teams/Email) | Notifications, nudges, alerts | Outbound |
| Analytics Platform | Usage data, conversion data, business metrics | Outbound |
| Identity Provider (SSO) | Authentication, role assignment | Inbound |

---

## Security & Compliance Architecture

### Data Classification
- **Confidential:** Interview scores, feedback, readiness assessments (restricted to candidate + their manager)
- **Internal:** Aggregate analytics, skill gap heatmaps (leadership access)
- **Restricted:** AI model weights, scoring algorithms, audit logs (platform team only)

### Access Control Matrix
| Role | Own Data | Team Data | Org Data | System Data |
|------|----------|-----------|----------|-------------|
| Candidate | Full | None | None | None |
| Manager | None | Full (reportees) | None | None |
| Staffing | None | Read (readiness scores) | Read (analytics) | None |
| L&D | None | None | Read (aggregate gaps) | None |
| Admin | None | None | Read | Full |
| Leadership | None | None | Full | Read |
