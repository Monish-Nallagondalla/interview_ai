# InterviewAI — Complete Product Flow

## Core Insight
The system can't just coach on interviews. If the INPUT (resume/profile) is weak, every
downstream step is built on a shaky foundation. The system must FIX THE INPUT FIRST.

## The 7-Stage Candidate Journey

### Stage 1: Smart Onboarding & Profile Intelligence
**Problem:** Many candidates have outdated, generic, or poorly articulated resumes.
The system can't do a meaningful gap analysis on garbage input.

**Flow:**
1. Candidate uploads existing resume (PDF/DOCX)
2. AI parses and extracts: skills, experience, projects, education, certifications
3. AI identifies GAPS in the resume itself:
   - Missing quantified achievements ("managed team" vs "managed team of 12, delivering 3 sprints ahead of schedule")
   - Vague descriptions that won't survive JD matching
   - Missing keywords for their domain
   - Weak or missing STAR-format accomplishments
4. **Conversational Resume Enrichment Bot** activates:
   - "I see you worked at TCS on a cloud migration project. Can you tell me more about the scale? How many servers? What was the business impact?"
   - "You mention Python — what specific libraries? Any production ML models?"
   - "What's a challenge you faced in this role that you're proud of solving?"
5. AI rebuilds a STRENGTHENED profile (not just resume — an internal rich profile)
6. Candidate reviews, edits, confirms

**Output:** Rich candidate profile with quantified achievements, detailed project history,
skill inventory with proficiency levels, and STAR-ready stories extracted from their own experience.

---

### Stage 2: JD Intake & Intelligent Matching
**Flow:**
1. JD is uploaded (by candidate, manager, or auto-ingested from staffing system)
2. AI parses JD into structured requirements:
   - Must-have skills vs nice-to-have
   - Experience level expected
   - Domain/industry context
   - Soft skill signals (e.g., "client-facing" = communication critical)
   - Hidden requirements (e.g., "fast-paced" = needs to show adaptability examples)
3. Smart matching against enriched candidate profile

**Output:** Structured JD profile with weighted requirements

---

### Stage 3: Gap Analysis & Readiness Scoring
**Flow:**
1. AI compares enriched profile against structured JD
2. Generates multi-dimensional gap analysis:
   - **Technical Skill Gaps** — missing skills, underweight skills, skill adjacencies
   - **Experience Gaps** — years, domain, scale of projects
   - **Articulation Gaps** — has the skill but can't demonstrate it with examples
   - **Story Gaps** — no STAR stories mapped to key JD requirements
   - **Soft Skill Gaps** — communication, leadership, client-facing signals
3. Readiness Score (0-100) across 6 dimensions displayed as radar chart
4. Priority matrix: what to fix first for maximum conversion impact

**Output:** Visual gap analysis dashboard + prioritized improvement plan

---

### Stage 4: Personalized Preparation Plan
**Flow:**
1. Based on gaps, AI generates a day-by-day prep plan:
   - Day 1-2: Fill critical skill gaps (learning resources, quick tutorials)
   - Day 3-4: Build STAR stories for top 5 JD requirements
   - Day 5: Technical depth drills on expected topics
   - Day 6: Mock interview #1
   - Day 7: Review feedback, refine weak areas
   - Day 8: Mock interview #2 (harder)
   - Day 9: Final polish + confidence building
   - Day 10: Interview day prep (logistics, mindset, last-minute tips)
2. Each day has:
   - Specific tasks with estimated time
   - Learning resources (internal L&D assets + curated external)
   - Practice exercises
   - Self-assessment checkpoints

**Output:** Structured prep plan with progress tracking

---

### Stage 5: STAR Story Builder
**Problem:** Candidates know what they did but can't ARTICULATE it in interview format.

**Flow:**
1. For each key JD requirement, AI maps the candidate's relevant experience
2. Conversational builder:
   - "For the requirement 'led cross-functional teams', let's use your TCS cloud migration project."
   - **Situation:** "What was the business context? Why was this project happening?"
   - **Task:** "What specifically were YOU responsible for?"
   - **Action:** "Walk me through the key decisions you made and actions you took."
   - **Result:** "What was the measurable outcome? Numbers matter."
3. AI refines each story for:
   - Clarity and conciseness (under 2 minutes when spoken)
   - Quantified impact
   - Relevance to the specific JD requirement
   - Natural conversational flow (not robotic)
4. Candidate gets a "Story Bank" — 8-10 polished STAR stories ready to deploy

**Output:** Story bank mapped to JD requirements, rehearsal-ready

---

### Stage 6: Mock Interviews & Adaptive Drilling
**Flow:**
1. AI conducts mock interview tailored to JD:
   - Technical questions based on required skills
   - Behavioral questions targeting JD soft skills
   - Situational/case questions relevant to domain
   - Curveball questions (why are you on bench? why should we pick you?)
2. ADAPTIVE difficulty:
   - If candidate answers well → harder follow-ups, deeper probing
   - If candidate struggles → supportive redirect, hints, then explanation
3. Real-time signals tracked:
   - Response length (too short = lacks depth, too long = rambling)
   - STAR structure adherence
   - Technical accuracy
   - Confidence indicators (hedging language, filler words in voice mode)
   - Relevance to question asked
4. Multiple mock modes:
   - **Practice mode** — gentle, with hints and coaching mid-interview
   - **Simulation mode** — realistic, no hints, timed responses
   - **Stress mode** — rapid-fire, challenging follow-ups, interruptions

**Output:** Completed mock interview with full transcript

---

### Stage 7: Scorecard, Feedback & Improvement Loop
**Flow:**
1. Post-mock comprehensive scorecard:
   - Overall readiness score (updated)
   - Score per dimension (technical, communication, STAR quality, JD alignment, confidence, problem-solving)
   - Specific feedback per answer: what was good, what to improve, example of a better answer
   - Comparison to previous mock (improvement trajectory)
2. Actionable next steps:
   - "Your technical depth on cloud architecture improved from 4/10 to 7/10. Focus next on specific AWS service trade-offs."
   - "Your STAR story for leadership is still vague on results. Let's rework it."
3. Manager notification if candidate crosses readiness threshold
4. All data feeds back into Stage 3 (gap analysis updates dynamically)

**THE FLYWHEEL:** Every mock interview generates data. Over time, the system learns which
preparation paths lead to actual interview conversions. The prep plans get smarter.
Failed interviews (with feedback captured) train the system on what actually matters
for specific clients/roles.

---

## Manager/Admin Dashboard

### Views:
1. **Candidate Pipeline** — all bench candidates, filterable by skill/experience/department/readiness
2. **Readiness Heatmap** — org-wide skill readiness across roles/domains
3. **Conversion Analytics** — before/after AI coaching, conversion rates, bench cost impact
4. **Individual Drill-Down** — per candidate prep progress, mock scores, improvement trajectory
5. **Risk & Audit Log** — every AI recommendation logged with reasoning chain
6. **AI System Health** — model performance, hallucination monitoring, user satisfaction, feedback loop quality
7. **L&D Insights** — which skill gaps are most common → inform training investment decisions

### Manager Actions:
- Override AI readiness score
- Add notes/context about candidate
- Approve/modify prep plans
- Flag candidates for 1:1 coaching
- Mark interview outcomes (pass/fail + feedback)
- Escalation triggers for repeated non-conversion

---

## Enterprise Data Inputs Required
1. **From Candidate:** Resume, self-assessment, conversational enrichment responses
2. **From HR/Staffing:** JDs, bench roster, project allocation data, skill taxonomy
3. **From L&D:** Learning catalog, certification data, training completion records
4. **From Past Interviews:** Feedback (structured + unstructured), outcomes, client preferences
5. **From Projects:** Past project details, roles played, tech stack used, duration, outcomes
6. **From Managers:** Candidate assessments, override inputs, contextual notes

---

## Multi-Agent Architecture
- **Profile Enrichment Agent** — Conversational resume strengthening
- **JD Parser Agent** — Structured JD analysis + requirement extraction
- **Gap Analyzer Agent** — Multi-dimensional gap analysis + scoring
- **Prep Plan Agent** — Personalized study plan generation
- **Story Coach Agent** — STAR story building + refinement
- **Mock Interviewer Agent** — Adaptive interview simulation
- **Feedback Scorer Agent** — Multi-dimensional evaluation + improvement recommendations
- **Learning Recommender Agent** — Maps gaps to internal/external learning resources

---

## Autonomous vs Human-in-the-Loop

### Fully Autonomous:
- Resume parsing and enrichment conversation
- JD parsing and structuring
- Gap analysis and readiness scoring
- Prep plan generation
- STAR story drafting
- Mock interviews and scoring
- Learning resource recommendations

### Human-in-the-Loop:
- Manager reviews readiness score before interview scheduling
- Manager can override AI recommendations
- L&D team approves new learning paths
- HR validates interview outcome data
- Escalation to human coach after 3+ failed conversions
- Audit review of AI scoring patterns (bias checks quarterly)

### Human-Triggered:
- Manager initiates prep for specific candidate-JD pair
- Candidate requests additional mock sessions
- Manager adds contextual notes about client preferences
