import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={30} />
            <span className="text-base font-bold text-white tracking-tight">InterviewAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#process" className="text-white/50 hover:text-white transition-colors">Process</Link>
            <Link href="#portals" className="text-white/50 hover:text-white transition-colors">Portals</Link>
            <Link href="#business-case" className="text-white/50 hover:text-white transition-colors">Business Case</Link>
            <Link href="/docs" className="text-white/50 hover:text-white transition-colors">Docs</Link>
            <Link href="/presentation" className="text-white/50 hover:text-white transition-colors">Slides</Link>
          </nav>
          <Link
            href="/candidate/onboarding"
            className="bg-[#FFE600] text-[#1a1a2e] px-5 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors"
          >
            Launch Demo
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-[#1a1a2e] pt-24 pb-32 relative overflow-hidden">
        {/* subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative max-w-5xl mx-auto px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FFE600]/10 border border-[#FFE600]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
              <span className="text-[#FFE600] text-xs font-semibold tracking-wider uppercase">Bench-to-Billable Acceleration</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Turn bench time into<br />
              <span className="text-[#FFE600]">interview-ready talent</span>
            </h1>

            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl">
              An AI coaching platform that fixes preparation fragmentation — the real reason capable employees fail client interviews — and turns it into a measurable conversion advantage.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/candidate/onboarding"
                className="bg-[#FFE600] text-[#1a1a2e] px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors"
              >
                Try Candidate Portal →
              </Link>
              <Link
                href="/manager/pipeline"
                className="bg-white/8 border border-white/15 text-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-white/15 transition-colors"
              >
                View Manager Dashboard
              </Link>
              <Link
                href="/presentation"
                className="bg-white/8 border border-white/15 text-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-white/15 transition-colors"
              >
                View Presentation
              </Link>
            </div>
          </div>
        </div>

        {/* floating stat cards */}
        <div className="relative max-w-5xl mx-auto px-8 mt-20">
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: "2,00,000+", label: "Employee scale" },
              { value: "35% → 55%", label: "Conversion target" },
              { value: "₹90 Cr", label: "Quarterly savings" },
              { value: "30–90×", label: "Platform ROI" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTALS ── */}
      <section id="portals" className="py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-[#FFE600] text-xs font-bold tracking-widest uppercase mb-3">Three portals, one platform</p>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">Built for every user in the workflow</h2>
            <p className="text-gray-500 max-w-xl">From the bench candidate who needs coaching to the manager who needs visibility — each user gets a purpose-built experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Candidate Portal",
                desc: "7-stage AI coaching journey — profile enrichment, gap analysis, prep planning, STAR stories, adaptive mock interviews, and readiness tracking.",
                href: "/candidate/onboarding",
                screens: "10 screens",
                features: ["Profile Enrichment", "Gap Analysis", "Mock Interview", "Story Bank"],
              },
              {
                num: "02",
                title: "Manager Dashboard",
                desc: "Real-time bench visibility, JD-to-candidate matching, outcome tracking, client intelligence, and conversion analytics with live cost metrics.",
                href: "/manager/pipeline",
                screens: "8 screens",
                features: ["Pipeline + Alerts", "JD Matching", "Client Intel", "Analytics"],
              },
              {
                num: "03",
                title: "Admin Console",
                desc: "AI system health monitoring, circuit breakers, immutable audit trails with reasoning chains, and scoring bias reporting.",
                href: "/admin/system-health",
                screens: "3 screens",
                features: ["System Health", "Audit Log", "Bias Report"],
              },
            ].map((portal) => (
              <Link
                key={portal.title}
                href={portal.href}
                className="group flex flex-col bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#FFE600] hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">{portal.num}</span>
                  <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-[#FFE600]/10 group-hover:text-[#1a1a2e] transition-colors">
                    {portal.screens}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-3">{portal.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{portal.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {portal.features.map((f) => (
                    <span key={f} className="text-[11px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-md group-hover:border-[#FFE600]/30 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-sm font-semibold text-[#1a1a2e] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity -mb-1">
                  Open portal <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 bg-gray-50/80">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-[#FFE600] text-xs font-bold tracking-widest uppercase mb-3">The coaching journey</p>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">7 stages. Each one builds on the last.</h2>
            <p className="text-gray-500 max-w-lg">Most prep tools start with mock interviews. We start with the profile — because weak input produces weak coaching.</p>
          </div>

          <div className="grid grid-cols-7 gap-3 mb-16">
            {["Enrich", "Analyze", "Plan", "Stories", "Mock", "Score", "Ready"].map((s, i) => (
              <div key={s} className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#1a1a2e] flex items-center justify-center mb-2">
                  <span className="text-[#FFE600] text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-xs font-medium text-gray-600">{s}</div>
                {i < 6 && <div className="hidden" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "01", title: "Profile Enrichment", desc: "AI conversation extracts quantified achievements, hidden skills, and project depth missing from the resume. Fixes weak input before any coaching begins — because gap analysis on a weak profile produces weak coaching." },
              { n: "02", title: "Gap Analysis", desc: "Enriched profile vs the specific JD across 6 dimensions: technical depth, communication clarity, STAR quality, JD alignment, confidence, and problem-solving. Prioritized by conversion impact, not alphabetically." },
              { n: "03", title: "Preparation Plan", desc: "Day-by-day plan with tasks, time estimates, learning resources, and self-assessment checkpoints. Prioritizes the gaps that most affect conversion for this specific role and candidate combination." },
              { n: "04", title: "STAR Story Building", desc: "Guided coaching to build interview stories from real project experience using the STAR framework. Each story is mapped to a specific JD requirement and scored for quality and completeness." },
              { n: "05", title: "Adaptive Mock Interviews", desc: "3 difficulty modes. Questions tailored to the JD. Harder follow-ups for strong answers, supportive redirection for weak ones. Practice, Simulation, and Stress modes for progressive preparation." },
              { n: "06", title: "Scoring & Feedback", desc: "Per-answer feedback across all 6 dimensions with specific improvement actions. Score is compared to previous sessions to show trajectory. Manager is notified when readiness threshold is crossed." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 bg-white rounded-xl p-5 border border-gray-100">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#FFE600] font-bold text-[11px]">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] text-sm mb-1.5">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLYWHEEL ── */}
      <section className="py-24 bg-[#1a1a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-5xl mx-auto px-8">
          <div className="mb-14 text-center">
            <p className="text-[#FFE600] text-xs font-bold tracking-widest uppercase mb-3">Self-improving system</p>
            <h2 className="text-3xl font-bold text-white mb-3">The Intelligence Flywheel</h2>
            <p className="text-white/40 max-w-md mx-auto">Every interview outcome feeds back into the model. After 100+ logged outcomes, prediction accuracy exceeds 75%.</p>
          </div>

          <div className="relative">
            {/* connecting line */}
            <div className="absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#FFE600]/30 to-transparent" />

            <div className="grid grid-cols-5 gap-4">
              {[
                { n: "1", title: "Candidate Prepares", desc: "AI-coached plan based on specific profile gaps and target JD" },
                { n: "2", title: "Interview Happens", desc: "Client evaluates the coached and prepared candidate" },
                { n: "3", title: "Outcome Captured", desc: "Pass/fail + structured client feedback logged by manager" },
                { n: "4", title: "Model Recalibrates", desc: "Scoring weights updated against real interview outcomes" },
                { n: "5", title: "Plans Get Smarter", desc: "Next candidate benefits from what worked for previous ones" },
              ].map((node, i) => (
                <div key={node.n} className="text-center relative">
                  <div className={`w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center mb-5 relative z-10 ${
                    i === 2 ? "border-[#FFE600] bg-[#FFE600]/10" : "border-[#FFE600]/40 bg-[#1a1a2e]"
                  }`}>
                    <span className="text-[#FFE600] font-bold text-base">{node.n}</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-2 leading-tight">{node.title}</h4>
                  <p className="text-white/35 text-xs leading-relaxed">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS CASE ── */}
      <section id="business-case" className="py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-[#FFE600] text-xs font-bold tracking-widest uppercase mb-3">Fully derived numbers</p>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">Business Case</h2>
            <p className="text-gray-500 max-w-lg">Every figure is built from salary-band-up assumptions, cross-referenced against public earnings disclosures from TCS, Infosys, and Wipro.</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="rounded-2xl p-7 border border-red-100 bg-red-50">
              <div className="text-[10px] font-bold tracking-widest text-red-400 uppercase mb-5">The Problem</div>
              <div className="text-5xl font-bold text-red-600 mb-1">₹240<span className="text-2xl font-normal"> Cr</span></div>
              <div className="text-sm text-gray-500 mb-1">Monthly direct bench cost</div>
              <div className="text-xs text-gray-400">12,000 employees × ₹2L/mo fully loaded</div>
              <div className="mt-5 pt-5 border-t border-red-100 space-y-1">
                <div className="text-lg font-bold text-red-500">₹720 Cr/month</div>
                <div className="text-xs text-gray-400">Including ₹480 Cr lost billing revenue</div>
              </div>
            </div>

            <div className="rounded-2xl p-7 border border-green-100 bg-green-50">
              <div className="text-[10px] font-bold tracking-widest text-green-500 uppercase mb-5">The Impact</div>
              <div className="text-5xl font-bold text-green-600 mb-1">₹270<span className="text-2xl font-normal"> Cr</span></div>
              <div className="text-sm text-gray-500 mb-1">Quarterly total impact (conservative)</div>
              <div className="text-xs text-gray-400">₹90 Cr direct + ₹180 Cr revenue recovery</div>
              <div className="mt-5 pt-5 border-t border-green-100 space-y-1">
                <div className="text-lg font-bold text-green-600">₹1,080 Cr/year</div>
                <div className="text-xs text-gray-400">Annual total economic impact</div>
              </div>
            </div>

            <div className="rounded-2xl p-7 bg-[#1a1a2e]">
              <div className="text-[10px] font-bold tracking-widest text-[#FFE600]/50 uppercase mb-5">The ROI</div>
              <div className="text-5xl font-bold text-[#FFE600] mb-1">30–90<span className="text-2xl font-normal">×</span></div>
              <div className="text-sm text-white/50 mb-1">Return on ₹8–12 Cr investment</div>
              <div className="text-xs text-white/25">Direct cost savings basis only</div>
              <div className="mt-5 pt-5 border-t border-white/10 space-y-1">
                <div className="text-lg font-bold text-[#FFE600]">Month 5–6</div>
                <div className="text-xs text-white/30">Break-even on direct savings</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <div className="text-sm font-semibold text-[#1a1a2e] mb-4">How the numbers are derived</div>
            <div className="grid grid-cols-3 gap-6 text-sm text-gray-500 leading-relaxed">
              <div>
                <span className="font-medium text-[#1a1a2e]">Bench population:</span> ~6% currently idle (TCS FY24: 5–6%, Infosys: 6–7%) + ~4% rolling off (15–20% within 90 days of project end, 25–30% unconfirmed) = 20,000/quarter addressable.
              </div>
              <div>
                <span className="font-medium text-[#1a1a2e]">Cost per employee:</span> Blended salary ₹1–1.25L (35% junior, 40% mid, 20% senior, 5% lead) × 1.6–1.8× overhead multiplier = ₹2L/month fully loaded. Lost billing at $30/hr × 160 hrs = ₹4L.
              </div>
              <div>
                <span className="font-medium text-[#1a1a2e]">Conversion math:</span> 35% → 50% (+15 pts) × 20,000 candidates × 3 interviews/quarter = 9,000 additional conversions. Each saves ~15 bench days = ₹1L direct. Conservative scenario only.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">See it in action</h2>
          <p className="text-white/40 mb-10">Walk through the full coaching journey as a candidate, or explore the enterprise dashboard as a manager.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/candidate/onboarding" className="bg-[#FFE600] text-[#1a1a2e] px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors">
              Candidate Portal →
            </Link>
            <Link href="/manager/pipeline" className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-white/5 transition-colors">
              Manager Dashboard
            </Link>
            <Link href="/docs" className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-white/5 transition-colors">
              Documentation
            </Link>
            <Link href="/presentation" className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-white/5 transition-colors">
              Presentation
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f0f1a] py-10">
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <span className="font-bold text-white text-sm">InterviewAI</span>
            <span className="text-white/20 mx-1">·</span>
            <span className="text-white/30 text-xs">Bench-to-Billable Acceleration Platform</span>
          </div>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/presentation" className="hover:text-white transition-colors">Presentation</Link>
            <Link href="/admin/system-health" className="hover:text-white transition-colors">Admin Console</Link>
            <a href="https://github.com/Monish-Nallagondalla/interview_ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
