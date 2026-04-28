import Link from "next/link";
import { Logo } from "@/components/logo";

const narrative = [
  {
    phase: "Problem Discovery",
    thinking: "Started with the caselet's stated problem — low interview conversion — but questioned whether that's the root cause or a symptom. Candidates fail not from lack of capability but from preparation fragmentation. That reframe changes the solution from 'chatbot that asks mock questions' to 'operating model layer that fixes the input before coaching the output.'",
    decision: "Positioned this as a Bench-to-Billable Acceleration Platform, not an interview prep tool. The platform sits between bench allocation and interview scheduling — it's an operating model change, not a feature.",
    doc: { title: "Product Vision & Strategy", href: "/docs/01_PRODUCT_VISION" },
  },
  {
    phase: "User Research & Personas",
    thinking: "The caselet mentions candidates and managers. But in a 2L employee org, the real workflow involves 4 distinct users: bench candidates (need coaching), delivery managers (need visibility), staffing/RMG (need matching), and L&D (need gap data for investment decisions). Each has different interaction patterns and success metrics.",
    decision: "Designed for 4 user types + admin, with 40+ user stories. The candidate journey has 7 stages because that mirrors how preparation actually works — not as a single conversation but as a progressive readiness journey.",
    doc: { title: "Users, Personas & User Stories", href: "/docs/02_USERS_AND_PERSONAS" },
  },
  {
    phase: "Architecture & AI Design",
    thinking: "A single LLM call can't handle profile enrichment, gap analysis, prep planning, story coaching, mock interviewing, AND scoring well. Each requires different system prompts, temperature settings, output formats, and evaluation criteria. Multi-agent architecture gives each task a specialist.",
    decision: "8 specialized AI agents with single responsibilities, orchestrated by a routing layer. This also enables independent scaling, monitoring, and A/B testing per agent. Each agent's decisions are logged with reasoning chains for audit compliance.",
    doc: { title: "System Architecture & Data Model", href: "/docs/03_SYSTEM_ARCHITECTURE" },
  },
  {
    phase: "Automation Boundaries",
    thinking: "The biggest risk in enterprise AI isn't accuracy — it's accountability. If the AI says 'not ready' and the candidate disagrees, who decides? If the AI is biased, who catches it? The human-in-the-loop boundary defines where AI value meets organizational trust.",
    decision: "Three-tier model: fully autonomous (scoring, prep plans, mocks), human-in-the-loop (readiness declarations, interview submissions), and human-triggered (escalations, career path decisions). AI recommends, managers decide.",
    doc: { title: "Automation Design", href: "/docs/04_AUTOMATION_DESIGN" },
  },
  {
    phase: "Product Flow Design",
    thinking: "Most interview prep tools start with 'paste your JD and we'll ask you questions.' That assumes the candidate's profile is already strong. In reality, many bench employees have weak resumes — vague descriptions, no quantified achievements, missing skills. Gap analysis on weak input produces weak coaching.",
    decision: "The first stage is Profile Enrichment — an AI conversation that strengthens the input BEFORE any coaching begins. This is the key architectural insight: fix the data quality first, then everything downstream improves.",
    doc: { title: "7-Stage Product Flow", href: "/docs/PRODUCT_FLOW" },
  },
  {
    phase: "Measurement Framework",
    thinking: "The business case needed to be bulletproof. Started with bench population sizing (cross-referenced TCS, Infosys, Wipro quarterly disclosures), then built per-employee cost from salary bands up (not a single assumed number), separated direct cost from lost revenue, and presented two scenarios.",
    decision: "Lead with direct cost savings (₹90 Cr/quarter conservative — audit-friendly, hits P&L). Show revenue recovery as upside (₹180 Cr/quarter — real but harder to attribute). Two scenarios because ranges signal analytical maturity over false precision.",
    doc: { title: "KPIs & Metrics", href: "/docs/KPIS_AND_METRICS" },
  },
  {
    phase: "Risk & Reliability",
    thinking: "AI in enterprise means stochasticity at scale. The same candidate, same answers, different day — could get different scores. Scoring might be biased by gender, communication style, or alma mater. Stories might be hallucinated. These aren't hypothetical risks; they're engineering requirements.",
    decision: "6 specific risks with named mitigations. Circuit breakers that auto-pause the system if thresholds are breached. Quarterly bias audits with documented actions. Every AI score has a confidence level and a human-readable explanation.",
    doc: { title: "Risks & Reliability", href: "/docs/RISKS_AND_RELIABILITY" },
  },
  {
    phase: "Execution Planning",
    thinking: "A 12-month roadmap for a team of 7. The key constraint is that you can't wait 6 months to validate whether AI coaching actually improves conversion. You need the outcome feedback loop working by Q2 — otherwise you're scaling a system that might not work.",
    decision: "Q1 pilot with 100 candidates to establish baseline. Q2 closes the feedback loop (outcome capture + model calibration). Q3 adds enterprise features (L&D, bias, voice). Q4 unlocks predictive matching — the point where the system recommends WHO to send to WHICH interview.",
    doc: { title: "12-Month Roadmap & Sprints", href: "/docs/ROADMAP_AND_SPRINTS" },
  },
  {
    phase: "AI Evaluation & Edge Cases",
    thinking: "A demo that works on clean inputs proves nothing about production readiness. Enterprise AI fails in predictable ways: inconsistent scoring across runs, sycophantic feedback that inflates scores, hallucinated interview questions outside the JD, biased scores by gender or communication style, and complete breakdowns when candidates submit empty or foreign-language resumes. These aren't hypothetical — they're failure modes observed in every LLM-based product that skips proper evaluation design.",
    decision: "Defined agent-by-agent evaluation criteria with specific test cases, pass/fail thresholds, and automated daily/weekly/quarterly evaluation schedules. 15 edge cases documented across 5 categories (input quality, agent failure, data privacy, scale, human-in-the-loop) — each with a named mitigation. The eval framework is a pre-condition for deployment, not a post-launch audit.",
    doc: { title: "AI Evaluation Framework & Edge Cases", href: "/docs/06_AI_EVALS_AND_EDGE_CASES" },
  },
  {
    phase: "Prototype Decisions",
    thinking: "The prototype needed to prove three things: (1) the AI interactions actually work and feel valuable, (2) the enterprise layer is thought through, and (3) the data story is complete. It doesn't need a database, auth, or file upload — those are infrastructure, not product insight.",
    decision: "AI-powered screens use real API calls (enrichment, gap analysis, mock interview, scoring). Enterprise screens use realistic mock data for a 2L org. The result: a live demo where the evaluator can actually experience the coaching journey, and dashboards that show how the platform operates at scale.",
    doc: { title: "Product Usage Guide", href: "/docs/05_PRODUCT_USAGE_GUIDE" },
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size={28} />
            <span className="text-base font-semibold text-white">InterviewAI</span>
            <div className="h-5 w-px bg-white/20" />
            <span className="text-sm text-white/60">Documentation</span>
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/presentation" className="text-white/60 hover:text-white transition-colors">Presentation</Link>
            <Link href="/candidate/onboarding" className="text-white/60 hover:text-white transition-colors">Demo</Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">Product Thinking & Documentation</h1>
        <p className="text-lg text-gray-500 mb-12 leading-relaxed">
          This document traces the decision-making process behind InterviewAI — from problem discovery through architecture, measurement, risk management, and execution planning. Each section links to the full specification.
        </p>

        <div className="space-y-12">
          {narrative.map((item, i) => (
            <div key={item.phase} className="border-b border-gray-100 pb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a2e] flex items-center justify-center shrink-0">
                  <span className="text-[#FFE600] font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#1a1a2e] mb-4">{item.phase}</h2>

                  <div className="mb-4">
                    <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Thinking</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.thinking}</p>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Decision</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.decision}</p>
                  </div>

                  <Link
                    href={item.doc.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-colors"
                  >
                    Full document: {item.doc.title}
                    <span className="text-gray-400">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype summary */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Prototype Summary</h2>
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div><div className="text-3xl font-bold text-[#1a1a2e]">26</div><div className="text-sm text-gray-500">Pages built</div></div>
            <div><div className="text-3xl font-bold text-[#1a1a2e]">4</div><div className="text-sm text-gray-500">Live AI endpoints</div></div>
            <div><div className="text-3xl font-bold text-[#1a1a2e]">8</div><div className="text-sm text-gray-500">AI agents designed</div></div>
            <div><div className="text-3xl font-bold text-[#1a1a2e]">9</div><div className="text-sm text-gray-500">Specification docs</div></div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold text-[#1a1a2e] mb-2">Candidate Portal (10 screens)</div>
              <div className="text-gray-500 space-y-1 leading-relaxed">
                <div>Onboarding and Profile Enrichment</div>
                <div>Gap Analysis with 6-dimension radar</div>
                <div>Personalized Prep Plan + Learning Resources</div>
                <div>STAR Story Builder + Story Bank</div>
                <div>Adaptive Mock Interview (3 modes)</div>
                <div>Mock History with score trajectory</div>
                <div>Scorecard with per-dimension feedback</div>
                <div>Interview Day preparation</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-[#1a1a2e] mb-2">Manager Dashboard (8 screens)</div>
              <div className="text-gray-500 space-y-1 leading-relaxed">
                <div>Activity Feed (real-time updates)</div>
                <div>Pipeline with risk alerts</div>
                <div>JD Upload + Candidate Matching</div>
                <div>Candidate Comparison (side-by-side)</div>
                <div>Interview Outcome Capture</div>
                <div>Client Intelligence patterns</div>
                <div>Analytics + Live Bench Cost Ticker</div>
                <div>Individual Candidate Drill-down</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-[#1a1a2e] mb-2">Admin Console (3 screens)</div>
              <div className="text-gray-500 space-y-1 leading-relaxed">
                <div>System Health + Circuit Breakers</div>
                <div>Audit Log with reasoning chains</div>
                <div>Bias and Fairness Report</div>
              </div>
            </div>
          </div>
        </div>

        {/* All docs */}
        <div className="mt-12 bg-[#1a1a2e] rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Full Specification Documents</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Product Vision & Strategy", slug: "01_PRODUCT_VISION" },
              { title: "Users, Personas & User Stories", slug: "02_USERS_AND_PERSONAS" },
              { title: "System Architecture & Data Model", slug: "03_SYSTEM_ARCHITECTURE" },
              { title: "Automation Design", slug: "04_AUTOMATION_DESIGN" },
              { title: "Product Usage Guide", slug: "05_PRODUCT_USAGE_GUIDE" },
              { title: "7-Stage Product Flow", slug: "PRODUCT_FLOW" },
              { title: "KPIs, Metrics & ROI Model", slug: "KPIS_AND_METRICS" },
              { title: "Risks & Reliability", slug: "RISKS_AND_RELIABILITY" },
              { title: "12-Month Roadmap & Sprints", slug: "ROADMAP_AND_SPRINTS" },
              { title: "AI Evaluation Framework & Edge Cases", slug: "06_AI_EVALS_AND_EDGE_CASES" },
            ].map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>{doc.title}</span>
                <span className="text-white/30">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
