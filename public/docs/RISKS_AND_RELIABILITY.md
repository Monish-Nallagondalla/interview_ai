# Risks, Reliability Systems & AI Guardrails

## AI Stochasticity Risks & Mitigations

### Risk 1: Inconsistent Scoring
**Problem:** Same candidate, same answers → different scores on different days (LLM non-determinism)
**Mitigation:**
- Temperature = 0 for all scoring operations
- Multi-evaluator pattern: 3 parallel scoring runs, take median
- Scoring rubric embedded in system prompt (not free-form judgment)
- Calibration dataset: 200 pre-scored responses used as reference anchors
- Monthly human calibration: 50 random scores reviewed by managers vs AI scores

### Risk 2: Hallucinated Questions in Mock Interviews
**Problem:** AI asks about technologies/frameworks not in the JD, confusing candidates
**Mitigation:**
- Question generation constrained to JD-extracted skill set (hard constraint)
- Questions pulled from curated question bank first, LLM-generated only for gaps
- Candidate can flag irrelevant questions → immediate feedback loop

### Risk 3: Biased Readiness Scoring
**Problem:** AI scores vary by gender, accent indicators in text, alma mater, etc.
**Mitigation:**
- Quarterly bias audit: stratify scores by demographics, flag >5% variance
- Scoring based ONLY on content dimensions (technical accuracy, STAR structure, relevance) — never style preferences
- Anonymized scoring pipeline: PII stripped before evaluation
- Red team exercises: test with synthetic profiles varying only demographic factors

### Risk 4: Over-Confidence in AI Recommendations
**Problem:** System says "ready" but candidate fails; erodes trust
**Mitigation:**
- Confidence intervals on readiness scores (not just a single number)
- "AI Confidence" indicator: high/medium/low based on data completeness
- Manager override always available and ENCOURAGED for edge cases
- Post-interview outcome feedback mandatory → continuous recalibration
- Never block an interview based on AI score alone (human always decides)

### Risk 5: STAR Story Fabrication
**Problem:** AI might embellish or invent details when helping build STAR stories
**Mitigation:**
- All story content sourced from candidate's own inputs (conversational extraction)
- AI can STRUCTURE and REFINE but cannot ADD facts
- Candidate confirmation step: "Is this accurate? Did this actually happen?"
- Stories flagged as "AI-assisted" in audit trail

### Risk 6: Privacy & Data Sensitivity
**Problem:** Resumes, interview performance, readiness scores are sensitive employee data
**Mitigation:**
- Data retention policy: raw transcripts deleted after 90 days, only scores retained
- Access control: candidates see only their data, managers see only their reportees
- No cross-candidate comparison visible to candidates
- GDPR/DPDP compliant: right to deletion, data portability
- Audit log: who accessed what data, when

---

## Reliability Architecture

### Evaluation Framework (AI Evals)
| Eval Type | Frequency | Method |
|-----------|-----------|--------|
| Scoring Consistency | Daily (automated) | Same 50 responses scored, check variance <3% |
| Question Relevance | Per session | JD-skill overlap score for generated questions |
| Story Accuracy | Per story | Candidate confirmation + factual cross-check against resume |
| Feedback Actionability | Weekly sample | Human review: is feedback specific and actionable? |
| Hallucination Detection | Per response | Fact-check claims against candidate profile data |
| Bias Check | Monthly | Stratified score analysis across demographics |

### Observability Stack
| Layer | What We Monitor | Tool |
|-------|----------------|------|
| Application | Latency, errors, session completion rates | Datadog / New Relic |
| AI Model | Token usage, response times, error rates | LangSmith / Helicone |
| Quality | Score distributions, hallucination flags, user flags | Custom dashboard |
| Business | Conversion correlation, prep completion → outcome | Analytics DB |
| User Satisfaction | NPS, CSAT per session, drop-off points | In-app surveys |

### Circuit Breakers
- If hallucination rate exceeds 5% → alert + automatic fallback to template-based responses
- If scoring variance exceeds 10% → pause scoring, alert human evaluators
- If candidate reports 3+ inaccurate questions in a mock → session paused, flagged for review
- If conversion prediction accuracy drops below 60% → model retraining triggered

---

## Human Escalation Triggers
| Trigger | Action |
|---------|--------|
| Candidate fails 3+ interviews despite high readiness score | Escalate to human career coach |
| Candidate readiness score not improving after 2 weeks | Manager notified with specific stuck points |
| AI confidence is "low" on scoring | Human review before score is shown |
| Candidate disputes AI feedback | Routed to human reviewer within 48 hours |
| Bias alert triggered | Immediate pause + senior HR review |

---

## Enterprise Audit Requirements (EY Context)
1. **Immutable Audit Trail** — Every AI decision logged with: timestamp, input data hash, model version, output, confidence score, reasoning chain
2. **Explainability** — Every score has a natural-language explanation ("Scored 6/10 on technical depth because: mentioned AWS Lambda but couldn't articulate cold start trade-offs")
3. **Version Control** — Model updates tracked, A/B tested before rollout, rollback capability
4. **Access Audit** — Who viewed/modified what candidate data, when, from where
5. **Compliance Dashboard** — Real-time view of system compliance status for leadership
