import Link from "next/link";
import { Logo } from "@/components/logo";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1a1a2e] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size={24} />
            <span className="text-sm font-semibold text-white">InterviewAI</span>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-sm text-white/60">Documentation</span>
          </Link>
          <Link href="/docs" className="text-sm text-white/50 hover:text-white transition-colors">
            All documents
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-3">System Architecture</h1>
          <p className="text-gray-500">Four-layer architecture with 8 specialized AI agents, orchestration routing, enterprise data integrations, and full audit infrastructure.</p>
        </div>

        {/* Architecture diagram */}
        <div className="space-y-3">

          {/* Presentation Layer */}
          <div className="rounded-xl border-2 border-[#1a1a2e] overflow-hidden">
            <div className="bg-[#1a1a2e] px-5 py-2.5 text-center">
              <span className="text-xs font-bold tracking-widest text-[#FFE600] uppercase">Presentation Layer</span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-gray-100 bg-white">
              {["Candidate Portal", "Manager Dashboard", "L&D Analytics", "Staffing / RMG"].map((item) => (
                <div key={item} className="px-4 py-4 text-center">
                  <div className="text-sm font-semibold text-[#1a1a2e]">{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-4 bg-gray-300" />
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-300 rotate-45 -mt-1.5" />
            </div>
          </div>

          {/* Orchestration Layer */}
          <div className="rounded-xl border-2 border-blue-200 overflow-hidden">
            <div className="bg-blue-50 px-5 py-2.5 text-center border-b border-blue-100">
              <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">Orchestration Layer</span>
            </div>
            <div className="bg-white px-6 py-4 text-center">
              <p className="text-sm text-gray-600">Routes requests to appropriate AI agents · Manages session state · Enforces guardrails · Logs every decision with reasoning chain</p>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-4 bg-gray-300" />
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-300 rotate-45 -mt-1.5" />
            </div>
          </div>

          {/* Agent Layer */}
          <div className="rounded-xl border-2 border-[#FFE600] overflow-hidden">
            <div className="bg-[#FFE600]/10 px-5 py-2.5 text-center border-b border-[#FFE600]/30">
              <span className="text-xs font-bold tracking-widest text-[#1a1a2e] uppercase">AI Agent Layer — 8 Specialized Agents</span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-gray-100 bg-white">
              {[
                { group: "Profile Agents", agents: ["Resume Parser", "Enrichment Chatbot", "Profile Builder", "Evidence Analyzer"] },
                { group: "Gap Agents", agents: ["JD Parser", "Skill Matcher", "Gap Ranker", "Deep Dive Prober"] },
                { group: "Coaching Agents", agents: ["Prep Plan", "Story Coach", "Mock Interviewer", "Learning Recommender"] },
                { group: "Evaluation Agents", agents: ["Mock Scorer", "Readiness Calculator", "Bias Detector", "Outcome Correlator"] },
              ].map((col) => (
                <div key={col.group} className="px-4 py-4">
                  <div className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wider mb-3">{col.group}</div>
                  <ul className="space-y-1.5">
                    {col.agents.map((agent) => (
                      <li key={agent} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] shrink-0" />
                        {agent}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-4 bg-gray-300" />
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-300 rotate-45 -mt-1.5" />
            </div>
          </div>

          {/* Data Layer */}
          <div className="rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-5 py-2.5 text-center border-b border-gray-200">
              <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">Data Layer</span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-gray-100 bg-white">
              {[
                { title: "Candidate Profiles", items: ["Rich profiles", "STAR stories", "Mock sessions", "Readiness scores", "Evidence vault"] },
                { title: "Enterprise Data", items: ["Skill taxonomy", "JD library", "L&D catalog", "Project history", "Org hierarchy"] },
                { title: "AI / ML Models", items: ["Scoring models", "Question banks", "Embedding store", "Calibration sets", "Prompt registry"] },
                { title: "Analytics & Audit", items: ["Decision logs", "Outcome data", "Conversion analytics", "Bias reports", "User analytics"] },
              ].map((col) => (
                <div key={col.title} className="px-4 py-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{col.title}</div>
                  <ul className="space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-4 bg-gray-300" />
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-300 rotate-45 -mt-1.5" />
            </div>
          </div>

          {/* Integration Layer */}
          <div className="rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-5 py-2.5 text-center border-b border-gray-200">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Integration Layer</span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-gray-100 bg-white">
              {["HRMS (SAP / Workday)", "Staffing System", "LMS (Internal)", "Communication (Teams / Email)"].map((item) => (
                <div key={item} className="px-4 py-3 text-center">
                  <div className="text-xs text-gray-500 font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent detail cards */}
        <div>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">8 AI Agents — Detailed</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "01", name: "Resume Parser & Profile Builder", input: "Resume file or pasted text", action: "Extracts structured data: skills, companies, roles, durations, technologies, certifications", output: "Structured profile JSON with confidence scores per field" },
              { n: "02", name: "Profile Enrichment Chatbot", input: "Parsed profile with gaps flagged", action: "6-question structured conversation to extract quantified achievements, hidden skills, and project depth", output: "Enriched profile + strengthened resume text" },
              { n: "03", name: "JD Parser & Requirement Extractor", input: "Raw JD text or file", action: "Structures must-have vs nice-to-have skills, extracts experience requirements and hidden soft skill signals", output: "Structured JD profile with weighted requirements" },
              { n: "04", name: "Gap Analyzer & Readiness Scorer", input: "Enriched profile + structured JD", action: "Multi-dimensional comparison across 6 dimensions with priority ranking by conversion impact", output: "Radar chart scores + skill matches + priority actions" },
              { n: "05", name: "Prep Plan Generator", input: "Gap analysis + interview timeline", action: "Day-by-day plan with tasks, time estimates, learning resources, and checkpoints prioritized by impact", output: "10-day structured preparation plan" },
              { n: "06", name: "STAR Story Coach", input: "Project history + JD requirements", action: "Conversational guidance through S-T-A-R structure, pushing for quantification and conciseness", output: "Story bank of 8-10 polished stories mapped to JD requirements" },
              { n: "07", name: "Mock Interviewer", input: "Structured JD + candidate profile + mode", action: "Adaptive interview simulation — harder follow-ups for strong answers, supportive redirects for weak ones", output: "Full mock transcript with per-response quality signals" },
              { n: "08", name: "Feedback Scorer", input: "Mock transcript + scoring rubric", action: "Multi-pass evaluation across 6 dimensions with specific references to candidate responses", output: "Scorecard + per-answer feedback + improvement actions + updated readiness score" },
            ].map((agent) => (
              <div key={agent.n} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0">
                    <span className="text-[#FFE600] font-bold text-[11px]">{agent.n}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a2e] leading-snug">{agent.name}</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-400 w-12 shrink-0">Input</span>
                    <span className="text-gray-600">{agent.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-400 w-12 shrink-0">Action</span>
                    <span className="text-gray-600">{agent.action}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-400 w-12 shrink-0">Output</span>
                    <span className="text-gray-600">{agent.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Link href="/docs" className="text-sm text-gray-500 hover:text-[#1a1a2e] transition-colors">← Back to all docs</Link>
          <Link href="/docs/03_SYSTEM_ARCHITECTURE" className="text-sm font-medium text-[#1a1a2e] hover:underline">View full specification →</Link>
        </div>
      </div>
    </div>
  );
}
