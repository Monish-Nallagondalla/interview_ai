# System Architecture & Data Model

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│  Candidate   │   Manager    │    L&D       │   Staffing/RMG     │
│   Portal     │  Dashboard   │  Analytics   │   Matching Tool    │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────────┘
       │              │              │                │
┌──────┴──────────────┴──────────────┴────────────────┴───────────┐
│                      ORCHESTRATION LAYER                          │
│  (Routes requests to appropriate AI agents, manages state,       │
│   enforces guardrails, logs decisions)                            │
└──────┬──────────────┬──────────────┬────────────────┬───────────┘
       │              │              │                │
┌──────┴──────┐ ┌─────┴─────┐ ┌─────┴─────┐ ┌───────┴──────────┐
│  Profile    │ │    Gap     │ │  Coaching  │ │   Evaluation     │
│  Agents     │ │  Agents    │ │  Agents    │ │   Agents         │
├─────────────┤ ├───────────-┤ ├───────────-┤ ├──────────────────┤
│• Resume     │ │• JD Parser │ │• Prep Plan │ │• Mock Scorer     │
│  Parser     │ │• Skill     │ │• Story     │ │• Readiness       │
│• Enrichment │ │  Matcher   │ │  Coach     │ │  Calculator      │
│  Chatbot    │ │• Gap       │ │• Mock      │ │• Bias Detector   │
│• Profile    │ │  Ranker    │ │  Interview │ │• Outcome         │
│  Builder    │ │            │ │• Learning  │ │  Correlator      │
│             │ │            │ │  Recommndr │ │                  │
└──────┬──────┘ └─────┬─────┘ └─────┬─────┘ └───────┬──────────┘
       │              │              │                │
┌──────┴──────────────┴──────────────┴────────────────┴───────────┐
│                         DATA LAYER                                │
├─────────────┬───────────────┬───────────────┬───────────────────┤
│  Candidate  │  Enterprise   │  AI/ML        │  Analytics        │
│  Profiles   │  Data         │  Models       │  & Audit          │
│             │               │               │                   │
│• Rich       │• Skill        │• Scoring      │• Decision logs    │
│  profiles   │  taxonomy     │  models       │• Outcome data     │
│• Stories    │• JD library   │• Question     │• Conversion       │
│• Sessions   │• L&D catalog  │  banks        │  analytics        │
│• Scores     │• Project      │• Embedding    │• Bias reports     │
│             │  history      │  store        │• User analytics   │
└─────────────┴───────────────┴───────────────┴───────────────────┘
       │              │              │                │
┌──────┴──────────────┴──────────────┴────────────────┴───────────┐
│                    INTEGRATION LAYER                              │
├─────────────┬───────────────┬───────────────┬───────────────────┤
│   HRMS      │  Staffing     │    LMS        │  Communication    │
│  (SAP/WD)   │  System       │  (Internal)   │  (Email/Teams)    │
└─────────────┴───────────────┴───────────────┴───────────────────┘
```

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
