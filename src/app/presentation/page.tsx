"use client";

import { useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "InterviewAI",
    subtitle: "Bench-to-Billable Acceleration Platform",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="w-16 h-16 bg-[#FFE600] rounded-lg" />
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#1a1a2e] mb-4">InterviewAI</h1>
          <p className="text-xl text-gray-400">Bench-to-Billable Acceleration Platform</p>
        </div>
        <div className="flex gap-12 mt-8 text-center">
          <div><div className="text-3xl font-bold text-[#1a1a2e]">2L+</div><div className="text-sm text-gray-400">Employees</div></div>
          <div><div className="text-3xl font-bold text-[#1a1a2e]">₹240 Cr</div><div className="text-sm text-gray-400">Monthly Bench Cost</div></div>
          <div><div className="text-3xl font-bold text-[#1a1a2e]">35%</div><div className="text-sm text-gray-400">Current Conversion</div></div>
        </div>
      </div>
    ),
  },
  {
    title: "The Problem",
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a1a2e]">The Problem</h2>
        <p className="text-lg text-gray-500">Employees fail client interviews not because of capability gaps, but preparation gaps.</p>
        <div className="grid grid-cols-2 gap-6">
          {[
            { issue: "Inconsistent preparation", detail: "Candidates self-prepare with generic material. No personalization to the specific JD." },
            { issue: "Weak articulation", detail: "Experienced professionals who can't communicate their achievements in structured, compelling ways." },
            { issue: "No feedback loops", detail: "Failed interview feedback is sparse, unstructured, and never feeds into the next preparation cycle." },
            { issue: "Manager time drain", detail: "Delivery managers spend 4–5 hours/week on ad-hoc coaching with no measurable outcomes." },
          ].map((p) => (
            <div key={p.issue} className="bg-red-50 rounded-xl p-5 border border-red-100">
              <div className="font-semibold text-[#1a1a2e] mb-1">{p.issue}</div>
              <div className="text-sm text-gray-500">{p.detail}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-[#FFE600]">₹240 Cr/month</div>
          <div className="text-white/60 mt-1">Direct bench cost — 12,000 employees at ₹2L fully loaded</div>
        </div>
      </div>
    ),
  },
  {
    title: "The Solution",
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a1a2e]">The Solution: A 7-Stage AI Coaching Journey</h2>
        <p className="text-lg text-gray-500">Not a chatbot. An operating model layer between bench allocation and interview scheduling.</p>
        <div className="space-y-3">
          {[
            { n: "01", t: "Profile Enrichment", d: "AI conversation extracts quantified achievements missing from resume" },
            { n: "02", t: "Gap Analysis", d: "6-dimension comparison of enriched profile vs specific JD" },
            { n: "03", t: "Prep Plan", d: "Personalized day-by-day plan with learning resources, prioritized by impact" },
            { n: "04", t: "STAR Stories", d: "Guided story building mapped to JD requirements" },
            { n: "05", t: "Mock Interview", d: "Adaptive AI interview with 3 difficulty modes" },
            { n: "06", t: "Scoring", d: "Multi-dimensional feedback with specific improvement actions" },
            { n: "07", t: "Readiness", d: "Interview-day preparation, manager notification, submission approval" },
          ].map((s) => (
            <div key={s.n} className="flex gap-4 items-center bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0">
                <span className="text-[#FFE600] font-bold text-sm">{s.n}</span>
              </div>
              <div className="font-semibold text-[#1a1a2e] w-40 shrink-0">{s.t}</div>
              <div className="text-sm text-gray-500">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Platform Overview",
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a1a2e]">Three Portals, One Platform</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="text-lg font-bold text-[#1a1a2e] mb-3">Candidate Portal</div>
            <div className="text-sm text-gray-500 space-y-1.5">
              <div>Profile enrichment via AI conversation</div>
              <div>Gap analysis with radar chart</div>
              <div>10-day personalized prep plan</div>
              <div>STAR story builder + story bank</div>
              <div>Adaptive mock interviews (3 modes)</div>
              <div>Score tracking + streaks + milestones</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="text-lg font-bold text-[#1a1a2e] mb-3">Manager Dashboard</div>
            <div className="text-sm text-gray-500 space-y-1.5">
              <div>Bench pipeline with risk alerts</div>
              <div>JD upload + candidate matching</div>
              <div>Side-by-side candidate comparison</div>
              <div>Interview outcome feedback form</div>
              <div>Client intelligence patterns</div>
              <div>Live bench cost ticker + ROI analytics</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="text-lg font-bold text-[#1a1a2e] mb-3">Admin Console</div>
            <div className="text-sm text-gray-500 space-y-1.5">
              <div>AI system health (8 agents monitored)</div>
              <div>Circuit breakers with auto-safeguards</div>
              <div>Decision audit trail with reasoning</div>
              <div>Bias and fairness quarterly reports</div>
              <div>Scoring consistency monitoring</div>
              <div>Model versioning + rollback capability</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Architecture",
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a1a2e]">Multi-Agent AI Architecture</h2>
        <p className="text-lg text-gray-500">8 specialized agents, each with a single responsibility. Orchestration layer manages state, enforces guardrails, and logs every decision.</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: "Profile Enrichment", role: "Conversational resume strengthening" },
            { name: "JD Parser", role: "Structured requirement extraction" },
            { name: "Gap Analyzer", role: "Multi-dimensional scoring" },
            { name: "Prep Plan", role: "Personalized plan generation" },
            { name: "Story Coach", role: "STAR story building" },
            { name: "Mock Interviewer", role: "Adaptive interview simulation" },
            { name: "Feedback Scorer", role: "6-dimension evaluation" },
            { name: "Learning Recommender", role: "Gap-to-resource mapping" },
          ].map((a) => (
            <div key={a.name} className="bg-[#1a1a2e] rounded-xl p-4 text-center">
              <div className="text-sm font-semibold text-white mb-1">{a.name}</div>
              <div className="text-xs text-white/40">{a.role}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="font-semibold text-[#1a1a2e] mb-2">Key Design Decisions</div>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
            <div>AI assists, humans decide — every score is a recommendation, not a verdict</div>
            <div>Full audit trail — every AI decision logged with reasoning chain</div>
            <div>Circuit breakers — automatic safeguards if hallucination or bias exceeds thresholds</div>
            <div>Outcome feedback loop — interview results recalibrate the scoring model</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Business Case",
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a1a2e]">Business Case</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="font-semibold text-[#1a1a2e] mb-4 text-lg">Cost Structure</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-gray-500">Blended salary (bench)</span><span className="font-semibold text-[#1a1a2e]">₹1–1.25L/month</span></div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-gray-500">Fully loaded (salary + overhead)</span><span className="font-semibold text-[#1a1a2e]">₹2L/month</span></div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-gray-500">Lost billing revenue</span><span className="font-semibold text-[#1a1a2e]">₹4L/month</span></div>
              <div className="flex justify-between p-3 bg-[#1a1a2e] rounded-lg"><span className="text-white/60">Total economic impact</span><span className="font-bold text-[#FFE600]">₹6L/month per employee</span></div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-[#1a1a2e] mb-4 text-lg">Impact (Conservative)</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-gray-500">Conversion improvement</span><span className="font-semibold text-[#1a1a2e]">35% → 50%</span></div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-gray-500">Additional conversions/quarter</span><span className="font-semibold text-[#1a1a2e]">9,000</span></div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span className="text-gray-500">Quarterly direct savings</span><span className="font-semibold text-green-600">₹90 Cr</span></div>
              <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-100"><span className="text-gray-600">Annual total impact</span><span className="font-bold text-green-600">₹1,080 Cr</span></div>
            </div>
          </div>
        </div>
        <div className="text-center bg-[#1a1a2e] rounded-xl p-6">
          <div className="text-sm text-white/40 mb-1">Platform Investment: ₹8–12 Cr Year 1</div>
          <div className="text-4xl font-bold text-[#FFE600]">30–90x ROI</div>
          <div className="text-sm text-white/40 mt-1">Break-even at Month 5–6 on direct savings alone</div>
        </div>
      </div>
    ),
  },
  {
    title: "Roadmap",
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a1a2e]">12-Month Roadmap</h2>
        <div className="grid grid-cols-4 gap-5">
          {[
            { q: "Q1", title: "Foundation + Pilot", users: "100", items: ["Core infrastructure + auth", "Resume enrichment + gap analysis", "Mock interview MVP", "Pilot with 3 business units"] },
            { q: "Q2", title: "Feedback Loops", users: "1,000+", items: ["STAR story builder", "Outcome capture + model calibration", "Manager dashboard + drill-down", "Mobile responsive"] },
            { q: "Q3", title: "Enterprise Scale", users: "5,000+", items: ["L&D catalog integration", "Bias detection pipeline", "Voice-based mock interviews", "Full audit compliance"] },
            { q: "Q4", title: "Predictive Intelligence", users: "15,000+", items: ["Client-role affinity model", "Proactive candidate matching", "Executive reporting", "HRMS + staffing integration"] },
          ].map((phase) => (
            <div key={phase.q} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#1a1a2e] text-[#FFE600] px-2.5 py-1 rounded font-bold text-sm">{phase.q}</div>
                <span className="text-xs text-gray-400">{phase.users} users</span>
              </div>
              <div className="font-semibold text-[#1a1a2e] mb-3">{phase.title}</div>
              <div className="space-y-1.5">
                {phase.items.map((item) => (
                  <div key={item} className="text-xs text-gray-500 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Thank You",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="w-12 h-12 bg-[#FFE600] rounded-lg" />
        <h2 className="text-4xl font-bold text-[#1a1a2e]">Thank You</h2>
        <p className="text-lg text-gray-400 text-center max-w-md">
          Built by Monish Nallagondalla — AI Product Manager with hands-on experience in multi-agent systems, interview prep platforms, and enterprise coaching products.
        </p>
        <div className="flex gap-6 mt-4">
          <div className="text-center"><div className="text-xl font-bold text-[#1a1a2e]">24</div><div className="text-xs text-gray-400">Screens</div></div>
          <div className="text-center"><div className="text-xl font-bold text-[#1a1a2e]">8</div><div className="text-xs text-gray-400">AI Agents</div></div>
          <div className="text-center"><div className="text-xl font-bold text-[#1a1a2e]">9</div><div className="text-xs text-gray-400">Docs</div></div>
          <div className="text-center"><div className="text-xl font-bold text-[#1a1a2e]">3</div><div className="text-xs text-gray-400">Portals</div></div>
        </div>
      </div>
    ),
  },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-[#1a1a2e] px-6 py-3 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-[#FFE600] rounded-sm" />
          <span className="text-sm font-semibold text-white">InterviewAI</span>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-sm text-white/50">Presentation</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/40">{current + 1} / {slides.length}</span>
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#FFE600]" : "bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-5xl">
          {slide.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-12 py-4 flex items-center justify-between border-t border-gray-100 shrink-0">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <div className="text-sm text-gray-400 font-medium">{slide.title}</div>
        <button
          onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
          disabled={current === slides.length - 1}
          className="px-5 py-2.5 text-sm font-medium rounded-lg bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
