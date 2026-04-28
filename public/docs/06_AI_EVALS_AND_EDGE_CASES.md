# AI Evaluation Framework & Edge Cases

## Why This Document Exists

A demo that works on a clean input proves nothing about production readiness. This document covers:
1. How every AI agent in InterviewAI is evaluated before and after deployment
2. The edge cases that will break a naive implementation — and how we handle them
3. The observability infrastructure that catches failures before users do

The underlying philosophy: **AI stochasticity is an engineering requirement, not a disclaimer.**

---

## Part 1: Evaluation Framework

### What We're Evaluating

LLM outputs in InterviewAI fall into three categories, each requiring different evaluation strategies:

| Output Type | Examples | Evaluation Method |
|-------------|---------|------------------|
| **Structured JSON** | Gap analysis scores, skill matches, readiness dimensions | Schema validation + range checks + cross-agent consistency |
| **Conversational text** | Enrichment chat, story coaching, mock questions | LLM-as-judge + human rubric sampling |
| **Generated documents** | Prep plans, STAR stories, strengthened resumes | Factuality check + coherence score + candidate confirmation |

---

### Agent-by-Agent Evaluation Criteria

#### Agent 1: Profile Enrichment

**What good looks like:**
- Questions probe for quantification (numbers, scale, timelines)
- Each question is contextually relevant to what the resume already contains
- Does not fabricate or assume details the candidate hasn't provided
- Covers all major gaps in the resume before concluding

**Evaluation tests:**
```
Test 1 — Specificity probe:
Input: Resume with "improved system performance"
Expected: AI asks for % improvement, baseline metric, timeframe
Fail condition: AI accepts vague answer and moves on

Test 2 — Fabrication check:
Input: Resume mentioning "cloud projects" with no specifics
Expected: AI asks which cloud provider, what services, what scale
Fail condition: AI assumes AWS or invents a specific technology

Test 3 — Completeness:
Input: Resume with 3 jobs and 6 skills
Expected: AI surfaces questions about all significant roles and key skills
Fail condition: AI only asks about the most recent role
```

**Automated eval:** Run 50 synthetic resumes with known gaps through the enrichment agent. Score whether the agent asks about the planted gap within 3 turns. Target: >85% detection rate.

---

#### Agent 2: JD Parser

**What good looks like:**
- Must-have vs nice-to-have correctly distinguished
- Experience years extracted accurately
- Hidden requirements inferred from language signals ("fast-paced" → adaptability, "client-facing" → communication)
- Output schema is always valid JSON

**Evaluation tests:**
```
Test 1 — Classification accuracy:
Input: 20 JDs with manually labelled must-have/nice-to-have skills
Expected: >90% classification accuracy vs human labels
Fail condition: Nice-to-have skills treated as blockers in gap analysis

Test 2 — Schema validation:
Input: 100 diverse JDs
Expected: 100% valid JSON output, 0 missing required fields
Fail condition: Any malformed output that breaks downstream agents

Test 3 — Hidden requirement extraction:
Input: JD with "works well under pressure" and "client stakeholder management"
Expected: Soft skill signals extracted: stress tolerance, executive communication
Fail condition: Only hard skills extracted
```

---

#### Agent 3: Gap Analyzer

**What good looks like:**
- Scores are consistent across 3 parallel runs (variance < 5 points)
- Skill match status (strong/partial/missing) aligns with what a human expert would say
- Priority actions are genuinely actionable, not generic advice
- Overall score correlates with actual interview outcomes (validated retrospectively)

**Evaluation tests:**
```
Test 1 — Consistency (anti-hallucination):
Input: Same profile + JD, run 3x with temperature=0
Expected: Scores within ±3 points across all runs
Fail condition: Any dimension varies by more than 5 points

Test 2 — Calibration against outcomes:
Input: 100 past candidates with known interview results (pass/fail)
Expected: Readiness score >70 correlates with >65% conversion rate
Fail condition: Score has <50% predictive accuracy (worse than random)

Test 3 — Actionability of recommendations:
Input: Gap analysis output
Judge prompt: "Are these priority actions specific and directly tied to the gaps identified?"
Expected: >80% rated as specific and actionable by LLM judge
Fail condition: Generic advice like "improve communication skills" without specifics
```

---

#### Agent 4: Mock Interviewer

**What good looks like:**
- All questions are directly relevant to the JD (no hallucinated requirements)
- Adaptive difficulty actually changes based on response quality
- Behavioral and technical questions are balanced per JD requirements
- The "why are you on bench" question is asked in stress/simulation modes

**Evaluation tests:**
```
Test 1 — JD relevance:
Input: JD requiring Java, Spring Boot, AWS
Expected: >90% of technical questions reference these specific skills
Fail condition: Questions about unrelated technologies (e.g., React for a Java JD)

Test 2 — Adaptive difficulty:
Input: Strong answer to a technical question
Expected: Next question is a harder follow-up or deeper probe
Input: Weak/incomplete answer
Expected: Supportive redirect or hint, then follow-up
Fail condition: Difficulty stays constant regardless of response quality

Test 3 — Question variety:
Input: Run 5 separate mock sessions with same JD
Expected: <40% question overlap across sessions
Fail condition: Same questions repeated across sessions (memorization risk)
```

---

#### Agent 5: Feedback Scorer

**What good looks like:**
- Scores reference specific things the candidate said (not generic feedback)
- "Better answer example" is actually better than the candidate's response
- Scores across 6 dimensions are internally consistent (high technical depth shouldn't coexist with very low JD alignment)
- No score inflation — average score for a mediocre response should be 45-55, not 70+

**Evaluation tests:**
```
Test 1 — Specificity:
Input: Transcript where candidate said "I used AWS Lambda for event processing"
Expected: Technical depth feedback specifically references Lambda, not generic cloud
Fail condition: Feedback says "good technical knowledge" with no specifics

Test 2 — Score calibration:
Input: 50 mock transcripts labelled by human experts (1-100)
Expected: AI scores within ±10 points of human scores for 80%+ of cases
Fail condition: Systematic inflation (AI always 15+ points higher than human)

Test 3 — Internal consistency:
Input: Transcript where candidate gave strong technical answers but answered unrelated topics
Expected: Technical depth high, JD alignment low
Fail condition: Both dimensions scored equally high despite the inconsistency
```

---

### Evaluation Infrastructure

#### Continuous Evals (runs daily)
```
1. Scoring consistency check
   — Take 50 reference transcripts, run through scorer
   — Compare against baseline scores from model deployment day
   — Alert if drift > 5 points on any dimension

2. JD parser schema validation
   — Run 20 synthetic JDs through parser
   — Assert all required fields present, types correct
   — Alert on any validation failure

3. Enrichment completion rate
   — Sample 100 live sessions from past 24 hours
   — Check if AI covered all major resume gaps in the session
   — Alert if coverage drops below 70%
```

#### Weekly Evals (human + automated)
```
1. Human calibration — 50 random scored sessions reviewed by L&D team
   — Compare AI scores vs human scores
   — Log overrides with reasons → feed back into prompt improvement

2. Prediction accuracy check
   — Match readiness scores from 2 weeks ago against interview outcomes
   — Calculate correlation coefficient
   — Target: r > 0.6. Below 0.5 triggers prompt review

3. Hallucination review
   — Sample 20 enrichment conversations
   — Check if AI fabricated or assumed any facts not provided by candidate
   — Target: 0 fabrications. Any found → immediate prompt patch
```

#### Quarterly Evals (strategic)
```
1. Bias audit — stratify all scores by gender, age band, department, alma mater
   — Run statistical test for variance > 5%
   — Documented report with actions

2. Model drift check — compare current scores vs scores from 3 months ago
   — If model was updated by provider, re-calibrate scoring rubric

3. Full A/B test of prompt variants
   — Test 2-3 alternative prompts for lowest-performing agents
   — Deploy winner to production
```

---

## Part 2: Edge Cases

These are the cases that will break a naive implementation. Each one was specifically designed for in the system architecture.

### Category 1: Candidate Input Quality

**Edge Case 1.1 — The completely empty resume**
```
Input: Candidate submits a 2-line resume ("5 years experience in IT. Skills: Java")
Risk: Gap analysis produces meaningless results; mock questions are too generic
Handling:
- Enrichment agent detects thin resume and switches to structured interview mode
- Asks explicit questions about company, role, tech stack, team size, outcomes
- Refuses to proceed to gap analysis until enrichment completeness > 60%
- UI shows warning: "Your profile needs more detail before gap analysis will be accurate"
```

**Edge Case 1.2 — The inflated resume (lying about skills)**
```
Input: Candidate claims 5 years Kubernetes experience but has never used it
Risk: Gap analysis shows "strong" match; mock interview exposes the gap embarrassingly
Handling:
- Mock interviewer probes depth on claimed skills: "Walk me through a Kubernetes incident you've resolved"
- Scoring flags when claims don't match demonstrated knowledge
- Pattern detected: "declared strong" but "performed weak" → updates profile automatically
- This is actually desirable: better to expose this in mock than in real interview
```

**Edge Case 1.3 — Resume in a foreign language or non-standard format**
```
Input: Resume in Hindi, or formatted as a table, or as a PDF with garbled text extraction
Risk: Profile enrichment extracts garbage; all downstream steps fail
Handling:
- Text quality check before enrichment begins (minimum coherent sentence count)
- If quality is below threshold, ask candidate to paste plain text
- Language detection: if non-English, prompt candidate to provide English version
- Garbled PDF fallback: show extraction result and ask candidate to correct
```

**Edge Case 1.4 — Candidate provides JD for a completely unrelated role**
```
Input: Java developer uploads JD for a Marketing Manager role
Risk: Gap analysis produces absurd results; system tries to coach for irrelevant skills
Handling:
- Domain mismatch detection: compare top skills in JD vs profile
- If overlap < 10%, surface warning: "This JD appears to be outside your domain. Are you sure this is the right role?"
- Don't block — candidate may be making a deliberate career pivot
- Flag for manager review in dashboard
```

---

### Category 2: AI Agent Failures

**Edge Case 2.1 — Model returns malformed JSON**
```
Scenario: Gap analyzer returns a response with valid text but broken JSON structure
Risk: Frontend crashes; candidate sees blank screen
Handling:
- JSON parsing wrapped in try/catch at API route level
- Fallback: attempt to extract JSON from response using regex
- If extraction fails: log the raw response, return pre-defined fallback scores
- Alert engineering team; raw response logged for debugging
- Candidate experience: sees fallback scores with note "Analysis completed with reduced confidence"
```

**Edge Case 2.2 — Model timeout on long responses**
```
Scenario: Prep plan generation times out for a candidate with 10+ years experience and a complex JD
Risk: Candidate sees error after 30-second wait
Handling:
- Streaming enabled for all long-form generations (prep plan, story output, resume)
- Progressive rendering: first paragraph appears in 2s, rest streams in
- If stream fails mid-way: save partial content, offer "Resume generation" button
- Timeout threshold: 45 seconds before automatic fallback to template-based plan
```

**Edge Case 2.3 — Mock interviewer goes off-topic**
```
Scenario: Candidate's response about a personal project leads AI to ask questions about 
that project rather than the JD requirements
Risk: Entire mock session covers irrelevant ground; candidate wastes time
Handling:
- Mock interviewer system prompt includes: "Always steer back to JD requirements within 2 turns"
- Topic relevance check: before sending each question, verify it maps to a JD skill
- If drift detected: "That's an interesting area. Let me bring us back to the core requirements for this role..."
- Session summary flags topic drift for candidate awareness
```

**Edge Case 2.4 — Scoring agent gives maximum scores to all answers**
```
Scenario: LLM is sycophantic — rates even weak answers highly to seem encouraging
Risk: Candidate believes they're ready when they're not; fails real interview
Handling:
- Calibration dataset includes known-weak responses with correct low scores
- Scoring prompt explicitly instructs: "Do not inflate scores. A mediocre answer should score 40-55."
- Score distribution check: if session average > 78 for a first-time mock, flag for human review
- Compare against mock history: if score jumps > 20 points in one session, trigger review
```

---

### Category 3: Data & Privacy Edge Cases

**Edge Case 3.1 — Candidate submits someone else's resume**
```
Scenario: Candidate copies a colleague's or a publicly available resume
Risk: All coaching is tailored to wrong experience; real gaps are never addressed
Handling:
- This is hard to detect automatically and not worth over-engineering
- Human-in-the-loop: manager can flag profile inconsistency if mock scores don't match expected level
- Interview outcome loop: if scored "ready" but fails, system flags mismatch for review
- Ultimate check: real interviewer probes experience — fabrication is self-defeating
```

**Edge Case 3.2 — Candidate inputs sensitive client information in resume/JD**
```
Scenario: Resume mentions confidential client project names, unreleased product data, 
or proprietary financial figures. JD contains client-confidential role requirements.
Risk: Sensitive data sent to third-party LLM API (OpenAI/Anthropic)
Handling:
- PII detection before API submission: flag names, account numbers, project codes
- Data masking: replace detected sensitive tokens with [REDACTED] before sending to LLM
- Candidate warning: "We detected potentially confidential information. Please review before proceeding."
- Organisational policy: data handling agreement with LLM provider (DPA) required before enterprise deployment
```

**Edge Case 3.3 — Candidate disputes AI score aggressively**
```
Scenario: Candidate scored 45/100 and files a formal complaint that the AI is biased against them
Risk: Employee relations incident; trust in platform collapses
Handling:
- Every score has a reasoning chain stored (not just the number)
- Candidate can view "Why this score" — specific references to their answers
- Formal dispute route: routed to human reviewer within 48 hours
- Human reviewer sees: AI score, reasoning, candidate's actual transcript
- Override mechanism: human can adjust score with documented reason
- If pattern found (same demographic repeatedly disputing): bias audit triggered immediately
```

---

### Category 4: Scale & Concurrency Edge Cases

**Edge Case 4.1 — 500 candidates start mock interviews simultaneously**
```
Scenario: End of quarter — batch of 500 bench candidates all start mock sessions at once
Risk: API rate limits hit; all sessions fail or return degraded responses
Handling:
- Session queuing with estimated wait time shown to candidate
- Graceful degradation: if rate limit hit, switch to template-based questions for that session
- Retry logic with exponential backoff on API calls
- Separate rate limit pools for different agent types (mock vs enrichment vs scoring)
- Alert: notify platform team when queue depth > 100
```

**Edge Case 4.2 — Same candidate runs gap analysis against 20 different JDs**
```
Scenario: Candidate or manager runs bulk matching across many JDs simultaneously
Risk: Runaway API costs; slow response for other users
Handling:
- Rate limit per candidate: max 5 gap analyses per hour
- Cache results: same profile + same JD = return cached result for 24 hours
- Bulk matching (manager feature): async processing with results available in 5-10 minutes
- Cost cap per organisation per day: configurable threshold with alert
```

---

### Category 5: Human-in-the-Loop Edge Cases

**Edge Case 5.1 — Manager always overrides AI scores (rubber-stamping down)**
```
Scenario: One manager consistently reduces all AI scores by 20 points regardless of candidate
Risk: Model calibration degrades; candidates in that manager's team have systematically lower scores
Handling:
- Override pattern detection: flag if a manager overrides >40% of scores in a 30-day period
- Escalate to HR: "Manager X has overridden 47 of 50 AI scores this month. Review recommended."
- Override audit: document reasons; look for patterns (all women, all junior, specific department)
```

**Edge Case 5.2 — Candidate completes all 7 stages but still fails interviews repeatedly**
```
Scenario: Candidate scores 82/100 readiness, completes all prep, then fails 4 consecutive interviews
Risk: Platform credibility destroyed; candidate demoralized; manager loses trust in scores
Handling:
- Automatic escalation after 3 failures with readiness > 75: "High readiness, repeated failure — human coaching required"
- Deep analysis: compare candidate's mock transcripts vs actual interview feedback
- Hypothesis testing: is the JD domain mismatch? Client-specific preference mismatch? Confidence collapse under pressure?
- Outcome: adjust scoring rubric if systemic, or assign human coach if individual
- This case is actually valuable data — it calibrates where AI readiness doesn't predict actual conversion
```

---

## Part 3: Eval Metrics Summary

| Metric | Target | Alert Threshold | Frequency |
|--------|--------|----------------|-----------|
| Scoring consistency (variance) | < 3 points | > 5 points | Daily |
| JD parser schema validity | 100% | Any failure | Per request |
| Hallucination rate | 0% | Any detection | Daily sample |
| Score calibration vs humans | ±10 points, 80% of cases | > ±15 points | Weekly |
| Prediction accuracy (score vs outcome) | r > 0.6 | r < 0.5 | Weekly |
| Enrichment gap coverage | > 85% | < 70% | Daily sample |
| Bias variance across demographics | < 5% | > 7% | Quarterly |
| Mock question JD relevance | > 90% | < 80% | Weekly sample |
| Sycophancy detection (score inflation) | Avg mock 1 score < 65 | Avg > 75 | Per session |
| Edge case fallback success rate | > 95% | < 90% | Weekly |

---

## Why This Matters for Enterprise Deployment

Most AI demos work on clean inputs, cooperative users, and ideal conditions. Production means:
- Employees who are nervous, rushing, or disengaged
- Resumes that are outdated, vague, or intentionally padded
- JDs that are poorly written, generic, or missing key requirements
- Managers who trust the system too much or too little
- Scale that breaks assumptions made during development

The evaluation framework above is not a post-launch audit plan — it is a **pre-condition for deployment**. No agent goes to production without passing its test battery. No model update ships without re-running calibration.

This is what separates an AI coaching tool from an AI coaching **system**.
