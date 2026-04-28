# InterviewAI — Product Vision & Strategy

## Product Vision Statement
**"Every bench employee enters their next client interview as the best-prepared version of themselves — and the organization knows it."**

## The Problem We're Solving
Interview conversion in large IT/ITeS organizations is broken not because of talent scarcity, but because of **preparation fragmentation**. With ~12,000 employees on bench at any given time and another ~8,000 rolling off projects each quarter, the organization faces a dual cost burden: **₹240 Cr/month in direct bench costs** (salary + benefits + overhead) and an additional **₹480 Cr/month in lost billing revenue** — totalling ~₹720 Cr/month in economic impact. At a conversion rate of just ~35%, the gap between capability and articulation is the single largest addressable lever for margin improvement.

## Strategic Reframe
This is NOT an interview prep chatbot. This is a **Bench-to-Billable Acceleration Platform** — an AI-powered operating model layer that:
1. Strengthens candidate profiles BEFORE coaching begins (fix the input)
2. Delivers hyper-personalized preparation against specific JDs
3. Validates readiness through adaptive mock interviews
4. Gives managers real-time visibility into bench readiness
5. Gets smarter with every interview outcome (flywheel)

## Product Principles (how we make decisions)
1. **Fix the input before optimizing the output** — A weak resume means weak gap analysis, weak stories, weak coaching. Start by enriching the profile.
2. **Personalization over templates** — Every prep plan, mock, and story is generated against a SPECIFIC JD + candidate combination. Never generic.
3. **Measure what matters** — Every feature maps to a KPI. If we can't measure its impact on conversion, we don't build it.
4. **AI assists, humans decide** — AI recommends readiness, managers decide who interviews. Full audit trail, always.
5. **The system gets smarter with scale** — Every interview outcome (pass/fail + feedback) improves recommendations for the next candidate. Network effects, not one-off value.

## Value Proposition by Stakeholder

| Stakeholder | Current Pain | What InterviewAI Delivers |
|-------------|-------------|---------------------------|
| **Bench Candidate** | Ad-hoc prep, no feedback, repeated mistakes | Structured, personalized coaching that improves with each session |
| **Delivery Manager** | Hours spent on 1:1 coaching, no visibility into readiness | Dashboard showing who's ready, who's stuck, where to intervene |
| **L&D Team** | No data on what gaps actually block conversions | Real skill gap data that drives targeted training investment |
| **Staffing/RMG** | Send candidates to interviews blind | AI-ranked candidate-JD match scores, send highest-readiness first |
| **Leadership** | Bench cost growing, no lever to pull | Measurable conversion improvement, quantified cost savings |

## Competitive Landscape
| Solution | Limitation |
|----------|-----------|
| Generic ChatGPT/AI prep | No personalization to JD, no enterprise data, no outcome tracking |
| Mock interview platforms (Pramp, Interviewing.io) | Peer-based, not AI-adaptive, no enterprise integration |
| Internal L&D courses | Not personalized to specific JD, no real-time readiness scoring |
| Manager 1:1 coaching | Doesn't scale, inconsistent quality, no measurement |
| **InterviewAI** | Personalized + scalable + measurable + integrated + improving |

## Success Metrics (North Star)
- **Primary:** Interview conversion rate (35% → 50-60%)
- **Secondary:** Time-to-billability reduction (45 days → 28 days)
- **Tertiary:** Bench cost reduction (₹108-270 Cr/year in direct costs; ₹324-810 Cr/year including lost revenue recovery)

---

## Bench Population Sizing (Assumptions & Rationale)

### Who is on bench?

| Segment | % of 2L Workforce | Headcount | Reasoning |
|---------|-------------------|-----------|-----------|
| Currently on bench (unallocated) | ~6% | ~12,000 | Large Indian IT firms (TCS, Infosys, Wipro) report 4-8% bench in quarterly earnings. TCS ~5-6% in FY24; Infosys 6-7% during demand fluctuation. 6% is a defensible mid-range. |
| Rolling off this quarter | ~4% | ~8,000 | ~15-20% of workforce is within 90 days of project end; ~25-30% lack confirmed next assignment (ramp-downs, client budget freezes). |
| **Total addressable pool / quarter** | **~10%** | **~20,000** | Combined population needing interview preparation immediately or proactively. |

**Important nuance:** These 20,000 are not all on bench simultaneously. ~12,000 are idle today; the remaining ~8,000 join bench gradually over the quarter as projects end. Peak concurrent bench at end-of-quarter: ~18,000-20,000.

### Cost Per Bench Employee — The Full Picture

| Cost Component | Monthly per Employee | Derivation |
|----------------|---------------------|------------|
| **Base salary (blended)** | ₹1 - 1.25L | Junior 0-3yrs: ₹33-67K (CTC ₹4-8L), Mid 3-7yrs: ₹67K-1.5L (CTC ₹8-18L), Senior 7-12yrs: ₹1.5-3L (CTC ₹18-35L), Lead 12+: ₹3-5L (CTC ₹35-60L). Weighted by typical bench composition (~35% junior, ~40% mid, ~20% senior, ~5% lead) → blended ₹1-1.25L. |
| **Fully loaded overhead** | ₹1.5 - 2L | Add ~60-75% on top of salary: PF + gratuity + insurance (20-25%), office/infra/admin (15-20%), management overhead (10-15%), training/upskilling allocation (5-10%). Industry standard multiplier: 1.6-1.8x of CTC. |
| **→ Direct cost (what the org pays)** | **₹2L/month** | This is the cash burn — salary + overhead for an employee producing zero revenue. |
| **Lost billing revenue** | ₹4L/month | Average client billing rate for Indian IT: $25-45/hour. At $30/hr midpoint × 160 hrs/month = ~$4,800 = ~₹4L. This is revenue the org could earn but doesn't. |
| **→ Total economic impact** | **₹6L/month** | Direct cost + lost revenue opportunity. This is how CFOs think about bench. |

### Monthly Bench Burn (at ~12,000 concurrent bench)

| Metric | Calculation | Amount |
|--------|-------------|--------|
| Direct cost burn | 12,000 × ₹2L | **₹240 Cr/month** |
| Lost revenue | 12,000 × ₹4L | **₹480 Cr/month** |
| Total economic impact | 12,000 × ₹6L | **₹720 Cr/month** |
| Annual direct cost | ₹240 Cr × 12 | **₹2,880 Cr/year** |
| Annual total impact | ₹720 Cr × 12 | **₹8,640 Cr/year** |

### ROI Estimate (Two Scenarios)

We calculate ROI on **direct cost savings only** (conservative) and show **total economic impact** as upside. The platform doesn't eliminate bench — it accelerates transition. Each additional conversion saves ~15 days of bench time per candidate.

| | Conservative | Optimistic |
|---|---|---|
| Addressable pool / quarter | 20,000 (10%) | 24,000 (12%) |
| Interviews / candidate / quarter | 3 | 3 |
| Conversion improvement | 35% → 50% (+15 pts) | 35% → 60% (+25 pts) |
| Additional conversions / quarter | 9,000 | 18,000 |
| Bench days saved / conversion | 15 days | 15 days |
| **Direct cost saved / conversion** | **₹1L** (15 days × ₹2L/30) | **₹1L** |
| **Quarterly direct savings** | **₹90 Cr** | **₹180 Cr** |
| **Annual direct savings** | **₹360 Cr** | **₹720 Cr** |
| Revenue recovered / conversion | ₹2L (15 days of ₹4L billing) | ₹2L |
| Quarterly revenue recovery | ₹180 Cr | ₹360 Cr |
| **Total quarterly impact (direct + revenue)** | **₹270 Cr** | **₹540 Cr** |
| **Total annual impact** | **₹1,080 Cr** | **₹2,160 Cr** |
| Platform investment (Year 1) | ₹8-12 Cr | ₹8-12 Cr |
| **ROI on direct savings** | **30-45x** | **60-90x** |
| **ROI on total economic impact** | **90-135x** | **180-270x** |

*Why we lead with direct cost: It's cash-out-the-door that shows up in P&L. Lost revenue recovery is real but harder to attribute — we present it as upside, not the headline. This is how auditors would want it framed.*

*Why two scenarios: The direction is high-confidence. The magnitude depends on adoption velocity, data quality, and change management. Ranges signal analytical rigor over false precision.*
