import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFE600] rounded-sm" />
            <span className="text-lg font-semibold text-white tracking-tight">InterviewAI</span>
          </div>
          <nav className="flex items-center gap-8 text-sm">
            <Link href="#how-it-works" className="text-white/60 hover:text-white transition-colors">Process</Link>
            <Link href="#business-case" className="text-white/60 hover:text-white transition-colors">Business Case</Link>
            <Link href="/docs" className="text-white/60 hover:text-white transition-colors">Documentation</Link>
            <Link href="/presentation" className="text-white/60 hover:text-white transition-colors">Presentation</Link>
            <Link href="/candidate/onboarding" className="bg-[#FFE600] text-[#1a1a2e] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors">
              Launch Demo
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#1a1a2e] pb-24 pt-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-[#FFE600] text-sm font-semibold tracking-widest uppercase mb-6">
            Bench-to-Billable Acceleration Platform
          </p>
          <h1 className="text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
            Transform idle bench time<br />into interview-ready talent
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI coaching platform that strengthens candidate profiles, delivers personalized preparation, and tracks readiness — reducing bench costs by improving interview conversion.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/candidate/onboarding" className="bg-[#FFE600] text-[#1a1a2e] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Try Candidate Portal
            </Link>
            <Link href="/manager/pipeline" className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors">
              View Manager Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-4 gap-8 text-center">
          {[
            { value: "2,00,000+", label: "Employee Scale" },
            { value: "35% → 55%", label: "Conversion Improvement" },
            { value: "₹360 Cr", label: "Annual Direct Savings" },
            { value: "30–90x", label: "Platform ROI" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[#1a1a2e]">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three portals */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Candidate Portal",
                desc: "Profile enrichment, gap analysis, personalized prep plans, STAR story coaching, adaptive mock interviews, and readiness scoring.",
                href: "/candidate/onboarding",
                tag: "10 screens",
              },
              {
                title: "Manager Dashboard",
                desc: "Bench pipeline with risk alerts, JD-to-candidate matching, candidate comparison, outcome tracking, client intelligence, and conversion analytics.",
                href: "/manager/pipeline",
                tag: "8 screens",
              },
              {
                title: "Admin Console",
                desc: "AI system health monitoring, circuit breakers, decision audit trails with reasoning chains, and scoring bias reports.",
                href: "/admin/system-health",
                tag: "3 screens",
              },
            ].map((portal) => (
              <Link
                key={portal.title}
                href={portal.href}
                className="group bg-gray-50 rounded-xl p-7 hover:bg-white hover:shadow-lg hover:border-[#FFE600] border border-transparent transition-all duration-200"
              >
                <div className="w-10 h-1 bg-[#FFE600] rounded-full mb-5 group-hover:w-14 transition-all" />
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-3">{portal.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{portal.desc}</p>
                <span className="text-xs font-semibold text-[#1a1a2e] bg-white border border-gray-200 px-3 py-1.5 rounded-md group-hover:bg-[#FFE600] group-hover:border-[#FFE600] transition-colors">
                  {portal.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-4">The 7-Stage Coaching Journey</h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">Each stage builds on the previous. The system strengthens the input before coaching the output.</p>
          <div className="space-y-4">
            {[
              { n: "01", title: "Profile Enrichment", desc: "AI converses with the candidate to extract quantified achievements, hidden skills, and project depth missing from their resume. Fixes weak input before any coaching begins." },
              { n: "02", title: "Gap Analysis", desc: "Compares the enriched profile against a specific JD across 6 dimensions — technical depth, communication, STAR quality, JD alignment, confidence, and problem-solving." },
              { n: "03", title: "Preparation Plan", desc: "Generates a day-by-day plan prioritized by conversion impact. Each day includes learning resources, practice tasks, and self-assessment checkpoints." },
              { n: "04", title: "STAR Story Building", desc: "Guides candidates through building interview stories from their real experience using the STAR framework. Maps each story to a specific JD requirement." },
              { n: "05", title: "Mock Interviews", desc: "Adaptive AI interviewer with 3 difficulty modes. Questions tailored to the JD. Harder follow-ups for strong answers, supportive redirection for weak ones." },
              { n: "06", title: "Scoring & Feedback", desc: "Per-answer feedback across 6 dimensions with specific improvement actions. Score compared to previous mocks to show trajectory." },
              { n: "07", title: "Interview Readiness", desc: "Pre-interview checklist, story review, and confidence preparation. Manager notified when candidate crosses the readiness threshold." },
            ].map((step) => (
              <div key={step.n} className="flex gap-6 items-start bg-white rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a2e] flex items-center justify-center shrink-0">
                  <span className="text-[#FFE600] font-bold text-sm">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flywheel */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">The Intelligence Flywheel</h2>
          <p className="text-center text-white/40 mb-14 max-w-xl mx-auto">Every interview outcome feeds back into the system. The more it&apos;s used, the smarter it gets.</p>
          <div className="grid grid-cols-5 gap-6">
            {[
              { n: "1", title: "Candidate Prepares", desc: "AI-coached plan based on specific gaps" },
              { n: "2", title: "Interview Happens", desc: "Client evaluates the prepared candidate" },
              { n: "3", title: "Outcome Captured", desc: "Pass/fail + structured feedback logged" },
              { n: "4", title: "Model Recalibrates", desc: "Scoring weights adjust to real outcomes" },
              { n: "5", title: "System Gets Smarter", desc: "Next candidate gets better prep paths" },
            ].map((node) => (
              <div key={node.n} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full border-2 border-[#FFE600] flex items-center justify-center mb-4">
                  <span className="text-[#FFE600] font-bold">{node.n}</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{node.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <span className="inline-block bg-[#FFE600]/10 border border-[#FFE600]/20 rounded-lg px-5 py-2.5 text-sm text-[#FFE600] font-medium">
              After 100+ logged outcomes, prediction accuracy exceeds 75%
            </span>
          </div>
        </div>
      </section>

      {/* Business Case */}
      <section id="business-case" className="py-20">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-4">Business Case</h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">Every number is derived from stated assumptions and fully auditable.</p>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-xl p-7 border border-red-100">
              <div className="text-xs font-bold tracking-widest text-red-400 uppercase mb-4">The Problem</div>
              <div className="text-4xl font-bold text-red-600 mb-2">₹240 Cr</div>
              <div className="text-sm text-gray-600 mb-1">Monthly direct bench cost</div>
              <div className="text-xs text-gray-400">12,000 employees at ₹2L/month fully loaded</div>
              <div className="mt-4 pt-4 border-t border-red-100">
                <div className="text-xl font-bold text-red-600">₹720 Cr/month</div>
                <div className="text-xs text-gray-400">Including ₹480 Cr lost billing revenue</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-7 border border-green-100">
              <div className="text-xs font-bold tracking-widest text-green-500 uppercase mb-4">The Impact</div>
              <div className="text-4xl font-bold text-green-600 mb-2">₹270 Cr</div>
              <div className="text-sm text-gray-600 mb-1">Quarterly total impact (conservative)</div>
              <div className="text-xs text-gray-400">₹90 Cr direct + ₹180 Cr revenue recovery</div>
              <div className="mt-4 pt-4 border-t border-green-100">
                <div className="text-xl font-bold text-green-600">₹1,080 Cr/year</div>
                <div className="text-xs text-gray-400">Annual total economic impact</div>
              </div>
            </div>
            <div className="bg-[#1a1a2e] rounded-xl p-7">
              <div className="text-xs font-bold tracking-widest text-[#FFE600]/60 uppercase mb-4">The ROI</div>
              <div className="text-4xl font-bold text-[#FFE600] mb-2">30–90x</div>
              <div className="text-sm text-white/60 mb-1">Return on ₹8–12 Cr platform investment</div>
              <div className="text-xs text-white/30">Direct cost savings only</div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xl font-bold text-[#FFE600]">Month 5–6</div>
                <div className="text-xs text-white/30">Break-even point</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#FFE600] rounded-sm" />
            <span className="font-semibold text-[#1a1a2e]">InterviewAI</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-sm text-gray-400">Bench-to-Billable Acceleration Platform</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/docs" className="text-gray-500 hover:text-[#1a1a2e] transition-colors">Documentation</Link>
            <Link href="/presentation" className="text-gray-500 hover:text-[#1a1a2e] transition-colors">Presentation</Link>
            <Link href="/admin/system-health" className="text-gray-500 hover:text-[#1a1a2e] transition-colors">Admin Console</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
