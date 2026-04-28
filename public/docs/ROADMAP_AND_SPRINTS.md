# 12-Month Roadmap & Sprint Plan

## Team Assumption
- 1 Product Manager
- 2 Senior Full-Stack Engineers
- 1 ML/AI Engineer
- 1 UX Designer (part-time)
- 1 Data Engineer (from Month 3)
- 1 QA Engineer
- Sprints: 2-week cycles

---

## Quarter 1 (Months 1-3): Foundation + Pilot

### Goal: Working platform with core loop, piloted with 100 bench candidates

**Sprint 1-2 (Weeks 1-4): Core Infrastructure**
- User authentication & role-based access (Candidate, Manager, Admin)
- Resume upload + AI parsing pipeline
- JD upload + structured extraction
- Database schema for profiles, JDs, scores, sessions
- Basic UI shell (candidate portal + admin portal)

**Sprint 3-4 (Weeks 5-8): Profile Enrichment + Gap Analysis**
- Conversational resume enrichment chatbot
- Rich profile data model (skills, projects, achievements with proficiency levels)
- Gap analysis engine (profile vs JD comparison)
- Readiness radar chart (6 dimensions)
- Prep plan generation (day-by-day)

**Sprint 5-6 (Weeks 9-12): Mock Interview MVP + Scoring**
- Mock interview engine (chat-based, JD-tailored questions)
- Scoring rubric system (6 dimensions)
- Post-mock scorecard generation
- Basic manager dashboard (candidate list + readiness scores)
- Pilot launch: 100 bench candidates across 3 business units

### Q1 Exit Criteria:
- 100 candidates onboarded
- >70% complete at least 1 mock interview
- Baseline readiness scores established
- Initial correlation: readiness score vs actual interview outcomes (early signal)

---

## Quarter 2 (Months 4-6): Feedback Loops + Scale

### Goal: Close the loop (interview outcomes → model improvement), scale to 1000+

**Sprint 7-8 (Weeks 13-16): STAR Story Builder + Learning Recommendations**
- STAR story conversational builder
- Story bank per candidate (mapped to JD requirements)
- Learning resource recommendation engine (internal L&D catalog integration)
- Difficulty adaptation in mock interviews (easy → medium → hard)

**Sprint 9-10 (Weeks 17-20): Outcome Tracking + Feedback Integration**
- Interview outcome capture (pass/fail + structured feedback from managers)
- Feedback-to-model pipeline: outcomes improve scoring calibration
- Candidate improvement trajectory visualization
- Manager notification system (candidate ready, candidate stuck, candidate failed)

**Sprint 11-12 (Weeks 21-24): Scale + Manager Tools**
- Scale to 1,000+ candidates
- Manager drill-down dashboard (individual candidate deep-dive)
- Bulk operations (assign prep plans to cohorts)
- Performance reporting (conversion rate trends, bench cost impact)
- Mobile-responsive candidate experience

### Q2 Exit Criteria:
- 1,000+ active candidates
- Conversion rate improvement measurable (+8-10% vs control group)
- Prediction accuracy: readiness score predicts conversion at >70%
- Manager adoption: >60% actively reviewing candidate readiness

---

## Quarter 3 (Months 7-9): Enterprise Features + Intelligence

### Goal: Full enterprise deployment readiness, advanced AI capabilities

**Sprint 13-14 (Weeks 25-28): Advanced Analytics + L&D Integration**
- Readiness heatmap (org-wide skill gaps visualization)
- L&D integration: auto-assign courses based on gap analysis
- Cohort analysis: which preparation paths work best for which roles
- Audit trail dashboard (compliance reporting)

**Sprint 15-16 (Weeks 29-32): AI Reliability + Bias Systems**
- Multi-evaluator scoring (3x parallel eval, median selection)
- Bias detection pipeline (quarterly automated + dashboard)
- Confidence intervals on all AI outputs
- Explainability layer: every score has human-readable reasoning
- Circuit breaker implementation

**Sprint 17-18 (Weeks 33-36): Voice + Advanced Mock**
- Voice-based mock interviews (STT + TTS)
- Non-verbal cues analysis (pace, filler words, pause patterns)
- Stress mode interviews (rapid follow-ups, challenging scenarios)
- Panel interview simulation (multiple AI interviewers with different styles)

### Q3 Exit Criteria:
- Platform handles 5,000+ candidates
- Full audit compliance achieved
- Voice interviews functional
- Bias audit: <5% variance across demographics
- L&D integration live with measurable course completion uplift

---

## Quarter 4 (Months 10-12): Predictive Intelligence + Org-Wide Rollout

### Goal: From coaching to MATCHING — AI recommends who to send to which interview

**Sprint 19-20 (Weeks 37-40): Predictive Matching Engine**
- Client-role affinity model: which candidate profiles convert with which clients
- Proactive recommendation: "These 5 candidates are best fit for this JD"
- Interview scheduling optimization (send highest-readiness first)
- Client preference learning (what does this specific client value?)

**Sprint 21-22 (Weeks 41-44): Org-Wide Rollout + Executive Reporting**
- Full rollout to all business units (target: 15,000+ bench candidates)
- Executive dashboard: bench cost impact, conversion trends, ROI tracking
- Integration with HRMS/staffing systems (auto-ingest JDs, auto-assign candidates)
- API layer for third-party LMS/talent platform integration

**Sprint 23-24 (Weeks 45-48): Optimization + Flywheel**
- A/B testing framework for preparation strategies
- Cross-pollination: insights from one BU improve recommendations in others
- Candidate success stories surfaced (social proof for adoption)
- Platform self-improvement metrics: is the system getting smarter each month?

### Q4 Exit Criteria:
- 15,000+ candidates using platform
- Conversion rate: 55-65% (from 35% baseline)
- Direct bench cost reduction: ₹90-180 Cr/quarter demonstrable (₹360-720 Cr/year)
- Predictive matching accuracy: >65%
- Platform classified as "enterprise-grade" by internal audit

---

## Key Dependencies & Risks to Timeline
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Poor data quality in existing resumes | Delays profile enrichment accuracy | Conversational enrichment compensates |
| Manager adoption resistance | Feedback loop incomplete | Early wins showcased, minimal manager effort required |
| Interview outcome data not captured | Model can't calibrate | Make outcome capture mandatory for bench allocation |
| Integration delays with HRMS | Can't auto-ingest data | Manual upload as fallback, API later |
| AI accuracy below threshold at scale | Trust erosion | Conservative rollout, human-in-loop heavy initially |
