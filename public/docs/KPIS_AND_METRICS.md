# KPIs, Metrics & Measurement Framework

## Candidate-Level Metrics (Individual Progress)

### Leading Indicators (predict conversion before interview happens)
| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Profile Completeness Score | How enriched is their profile vs. raw resume | >85% |
| JD Alignment Score | Skill/experience match to target JD | >70% |
| Readiness Score (composite) | Weighted score across 6 dimensions | >75 to be "interview-ready" |
| Prep Plan Completion % | How much of the prep plan they've actually done | >80% |
| Mock Interview Score Trend | Are scores improving across mocks? | Positive slope over 3+ mocks |
| STAR Story Coverage | % of key JD requirements with polished STAR stories | >80% |
| Days Active on Platform | Engagement consistency | >5 days before interview |

### The 6 Readiness Dimensions (Radar Chart)
1. **Technical Depth** — Can they go deep on required skills?
2. **Communication Clarity** — Concise, structured, articulate responses?
3. **STAR Story Quality** — Quantified, relevant, compelling stories?
4. **JD Alignment** — Does their narrative match what the role needs?
5. **Confidence & Presence** — Assertive without arrogance? Handles curveballs?
6. **Problem-Solving** — Can they think through scenarios live?

### Lagging Indicators (post-interview outcomes)
| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Interview Conversion Rate | % of interviews that result in selection | 55-65% (from 30-40% baseline) |
| Time-to-Billability | Days from bench to billed on project | Reduce by 2-3 weeks |
| Repeat Failure Rate | Same candidate failing multiple interviews | <15% |
| Client Satisfaction Score | Client feedback on candidate quality | >4.2/5 |

---

## Organization-Level Metrics (Platform Impact)

### Operational Metrics
| Metric | What It Measures | Baseline → Target |
|--------|-----------------|-------------------|
| Overall Conversion Rate | Org-wide interview success rate | 35% → 50-60% |
| Average Bench Duration | Days on bench before placement | 45 days → 28 days |
| Direct Bench Cost Saved (₹Cr/quarter) | Cash savings (salary + overhead) | — → ₹90-180 Cr/quarter |
| Lost Revenue Recovered (₹Cr/quarter) | Billing revenue from earlier placement | — → ₹180-360 Cr/quarter |
| Total Economic Impact (₹Cr/quarter) | Direct + revenue combined | — → ₹270-540 Cr/quarter |
| Manager Coaching Time Saved | Hours/week managers spend on prep | 6 hrs → 1.5 hrs |
| Candidate NPS | Satisfaction with AI coaching | — → >60 NPS |

### AI System Health Metrics
| Metric | What It Measures | Threshold |
|--------|-----------------|-----------|
| Prediction Accuracy | Does readiness score predict actual conversion? | >75% correlation |
| Hallucination Rate | Factually incorrect AI outputs flagged | <2% |
| Bias Audit Score | Score variance across gender/age/department | <5% variance |
| User Drop-off Rate | Candidates who start but don't complete prep | <30% |
| Feedback Integration Lag | Time to incorporate interview outcomes into model | <24 hours |
| System Uptime | Platform availability | >99.5% |

---

## Audit & Compliance Metrics (EY-Specific)
| Metric | Purpose |
|--------|---------|
| AI Decision Audit Trail Completeness | Every recommendation has logged reasoning |
| Human Override Rate | How often managers override AI (too high = AI inaccurate, too low = rubber stamping) |
| Data Retention Compliance | PII handling per policy |
| Bias Review Cadence | Quarterly bias audits completed on schedule |
| Escalation Response Time | Time from repeated failure flagged → human intervention |

---

## Value Realization Framework

### Phase 1 (Months 1-3): Foundation
- Metric Focus: Adoption rate, profile completion, prep plan engagement
- Success Criteria: 500+ candidates onboarded, >60% complete prep plans

### Phase 2 (Months 4-6): Validation
- Metric Focus: Conversion rate delta, readiness score predictive power
- Success Criteria: 10% improvement in conversion rate, >70% prediction accuracy

### Phase 3 (Months 7-9): Scale
- Metric Focus: Org-wide bench cost reduction, manager time savings
- Success Criteria: ₹90Cr+ quarterly direct savings, 3x reduction in manager coaching time

### Phase 4 (Months 10-12): Optimization
- Metric Focus: Flywheel effect (system getting smarter), predictive matching
- Success Criteria: AI recommending which candidates to send to which interviews (not just coaching)

---

## ROI Calculation Model

*(Full derivation — every number justified so no question is left unanswered.)*

### Step 1: Bench Population Sizing

| Segment | % of 2L Workforce | Headcount | Reasoning |
|---------|-------------------|-----------|-----------|
| Currently on bench | ~6% | ~12,000 | Large Indian IT firms publicly report 4-8% bench. TCS ~5-6% (FY24), Infosys 6-7% during fluctuation quarters. 6% = defensible mid-range. |
| Rolling off this quarter | ~4% | ~8,000 | 15-20% of workforce within 90 days of project end at any time; 25-30% of those lack confirmed next assignment. |
| **Total addressable / quarter** | **~10%** | **~20,000** | Not all simultaneous — 12K idle now, 8K join bench gradually over the quarter. |

### Step 2: Per-Employee Cost Breakdown

| Component | Monthly Amount | How We Got Here |
|-----------|---------------|-----------------|
| Blended base salary | ₹1 - 1.25L | Junior ₹33-67K (35% of bench), Mid ₹67K-1.5L (40%), Senior ₹1.5-3L (20%), Lead ₹3-5L (5%). Weighted avg = ₹1-1.25L. |
| Fully loaded (salary + overhead) | **₹2L** | 1.6-1.8x multiplier on CTC: PF/gratuity/insurance (+20-25%), office/infra (+15-20%), mgmt overhead (+10-15%). |
| Lost billing revenue | **₹4L** | Client billing rate $25-45/hr, midpoint $30/hr × 160 hrs = ~$4,800 = ~₹4L/month not earned. |
| **Total economic impact** | **₹6L** | ₹2L direct cost + ₹4L lost revenue per idle employee per month. |

### Step 3: Monthly Burn (at 12,000 concurrent bench)

| | Per Employee | × 12,000 | Annual |
|---|---|---|---|
| Direct cost (cash out) | ₹2L | **₹240 Cr/month** | **₹2,880 Cr/year** |
| Lost revenue | ₹4L | ₹480 Cr/month | ₹5,760 Cr/year |
| Total impact | ₹6L | ₹720 Cr/month | ₹8,640 Cr/year |

### Step 4: Platform Impact (What InterviewAI Saves)

Each additional conversion = one person moves from bench to billable ~15 days earlier.

| | Conservative | Optimistic |
|---|---|---|
| Addressable pool / quarter | 20,000 | 24,000 |
| Interviews / person / quarter | 3 | 3 |
| Conversion improvement | 35% → 50% (+15 pts) | 35% → 60% (+25 pts) |
| Additional conversions / quarter | 9,000 | 18,000 |
| Bench days saved / conversion | 15 | 15 |
| Direct cost saved / conversion | ₹1L (15 days of ₹2L/month) | ₹1L |
| Revenue recovered / conversion | ₹2L (15 days of ₹4L billing) | ₹2L |
| **Quarterly direct savings** | **₹90 Cr** | **₹180 Cr** |
| **Quarterly revenue recovery** | **₹180 Cr** | **₹360 Cr** |
| **Quarterly total impact** | **₹270 Cr** | **₹540 Cr** |
| **Annual direct savings** | **₹360 Cr** | **₹720 Cr** |
| **Annual total impact** | **₹1,080 Cr** | **₹2,160 Cr** |

### Step 5: ROI

| | Conservative | Optimistic |
|---|---|---|
| Platform investment (Year 1) | ₹8-12 Cr | ₹8-12 Cr |
| ROI on direct savings | **30-45x** | **60-90x** |
| ROI on total economic impact | **90-135x** | **180-270x** |
| Break-even | Month 5-6 | Month 3-4 |

### Why We Frame It This Way
- **Lead with direct cost** — it's cash-out-the-door, shows up in P&L, audit-friendly
- **Show lost revenue as upside** — real but harder to attribute directly to the platform; presented as additional value, not the headline
- **Two scenarios** — direction is high-confidence, magnitude depends on adoption, data quality, and change management
- **Every number is traceable** — no black-box claims; any stakeholder can follow the chain from salary → overhead → impact → savings
