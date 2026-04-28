# Automation Design — Autonomous vs Human-in-the-Loop

## Design Philosophy
> "Automate the repetitive, augment the judgment, require humans for accountability."

Every AI action falls into one of three categories:

---

## Category 1: FULLY AUTONOMOUS (AI acts, human informed)

These are high-frequency, low-risk, reversible actions where AI adds speed without introducing meaningful risk.

| Action | Why Autonomous | Guardrail |
|--------|---------------|-----------|
| Resume parsing & extraction | Factual extraction, candidate verifies output | Candidate reviews/edits enriched profile |
| Profile enrichment conversation | Conversational data gathering, no decisions made | All data confirmed by candidate |
| JD parsing & structuring | Factual extraction from provided text | Manager can edit structured JD |
| Gap analysis generation | Objective comparison of profile vs JD | Scores have confidence levels |
| Readiness score calculation | Algorithmic scoring on rubric | Score ≠ decision; humans decide interview readiness |
| Prep plan generation | Personalized but non-binding recommendation | Candidate can modify plan |
| Learning resource recommendations | Maps gaps to catalog, low-risk suggestion | Candidate chooses what to engage with |
| STAR story drafting | Structures candidate's own words | Candidate confirms accuracy |
| Mock interview questions | Generated from JD, curated bank as base | Candidate can flag irrelevant questions |
| Mock scoring (per-response) | Rubric-based evaluation | Multi-pass scoring for consistency |
| Post-mock feedback | Specific, actionable improvement suggestions | Templates reviewed monthly by L&D |
| Progress tracking & trends | Factual aggregation of session data | Automated, no judgment needed |
| Nudges & reminders | "You haven't practiced in 3 days" | Frequency caps to prevent annoyance |

---

## Category 2: HUMAN-IN-THE-LOOP (AI recommends, human approves/overrides)

These are consequential decisions where AI provides data but a human must own the outcome.

| Action | Why Human Needed | AI's Role | Human's Role |
|--------|-----------------|-----------|-------------|
| Interview readiness declaration | Sending to interview has real cost (client relationship, candidate morale) | Provide readiness score + evidence | Manager approves "ready to interview" |
| Candidate-JD matching for staffing | Wrong match wastes client interview slots | Rank candidates with reasons | Staffing lead makes final selection |
| Manager override of AI score | AI may miss context (candidate recovering from illness, personal situation, etc.) | Provide score + explanation | Manager overrides with documented reason |
| Prep plan for new role categories | AI may not have enough data for unfamiliar roles | Generate best-effort plan | L&D reviews and adjusts |
| New learning path creation | Budget and resource implications | Recommend based on gap data | L&D approves and creates content |
| Post-interview feedback entry | Subjective, needs human nuance | Provide structured template | Manager/recruiter fills in feedback |

### How the Approval Workflow Works
```
AI generates recommendation
    ↓
Recommendation queued in manager's dashboard with:
  - The recommendation itself
  - Evidence/reasoning
  - Confidence level (high/medium/low)
  - Suggested action + alternative actions
    ↓
Manager reviews:
  - Approve (1 click)
  - Modify (adjust and approve)
  - Override (reject with reason — logged for model learning)
  - Defer (needs more information)
    ↓
Action executed + logged in audit trail
```

---

## Category 3: HUMAN-TRIGGERED (Human initiates, AI supports)

These are strategic or sensitive actions that should never be AI-initiated.

| Action | Why Human-Triggered | AI's Support |
|--------|-------------------|-------------|
| Escalation to human coach | Needs empathetic judgment about when a person needs human support | AI flags the trigger (3+ failures, no progress), human decides action |
| Career path recommendation | Life-changing advice beyond interview prep | AI provides data (skill strengths, market demand), human counselor advises |
| Removal from interview pipeline | Sensitive HR action | AI provides performance data, manager/HR makes decision |
| Bias investigation | Sensitive organizational action | AI provides statistical evidence, HR/Ethics team investigates |
| Model retraining decisions | Technical + organizational impact | AI flags performance degradation, platform team decides timing |
| Client feedback escalation | Client relationship management | AI structures feedback, account manager handles client conversation |

---

## Escalation Matrix

### Automatic Escalation Triggers (AI detects → alerts human)

| Trigger | Condition | Escalated To | Expected Response |
|---------|-----------|-------------|-------------------|
| Stalled candidate | No activity for 7+ days during active prep | Manager | Check in with candidate |
| Repeated failure | 3+ interviews failed despite "ready" score | Manager + HR | Human coaching intervention |
| Score plateau | No improvement after 5+ mock sessions | Manager | Reassess JD fit or skill strategy |
| AI confidence drop | System confidence on scoring <60% | Platform team | Review model, possibly retrain |
| Bias alert | Score variance >5% across demographic groups | HR + Ethics | Investigation + model audit |
| Candidate dispute | Candidate flags AI feedback as unfair/inaccurate | Human reviewer | Review within 48 hours |
| Client pattern | Same client rejecting candidates with high readiness | Account manager + Staffing | Investigate client-specific expectations |

### Escalation SLA
| Priority | Response Time | Resolution Time |
|----------|-------------|-----------------|
| Critical (bias, candidate dispute) | 4 hours | 48 hours |
| High (repeated failure, stalled) | 24 hours | 1 week |
| Medium (score plateau, AI confidence) | 48 hours | 2 weeks |
| Low (client pattern, model optimization) | 1 week | 1 month |

---

## Feedback Loops (How the System Learns)

### Loop 1: Interview Outcome → Model Calibration
```
Candidate interviews → Outcome (pass/fail) recorded
    ↓
Compare: AI predicted readiness score vs actual outcome
    ↓
If prediction was wrong: flag for model review
If prediction was right: reinforce scoring patterns
    ↓
Monthly recalibration: adjust scoring weights based on outcome data
```

### Loop 2: Manager Override → Model Improvement
```
Manager overrides AI score (too high or too low)
    ↓
Log: what AI scored, what manager scored, manager's reason
    ↓
Aggregate: are overrides concentrated in specific areas?
    ↓
Pattern detected: adjust scoring model for that dimension
```

### Loop 3: Candidate Feedback → Experience Improvement
```
Candidate rates AI feedback (helpful/not helpful)
    ↓
Track: which feedback types get acted on vs ignored
    ↓
Pattern: candidates who act on story coaching improve 2x vs those who don't
    ↓
Nudge system prioritizes story coaching in prep plans
```

### Loop 4: Org-Wide Learning → L&D Investment
```
Aggregate gap analysis across all candidates
    ↓
Identify: top 10 skill gaps causing interview failure
    ↓
Compare: existing L&D offerings vs actual gaps
    ↓
Recommendation: "Build courses for AWS Lambda, System Design, Stakeholder Communication"
    ↓
L&D invests → candidates fill gaps faster → conversion improves
```
