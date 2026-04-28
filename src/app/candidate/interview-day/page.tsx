"use client";

export default function InterviewDayPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-ey-dark mb-2">Interview Day</h1>
        <p className="text-sm text-ey-gray">Your interview is today. Here is your final preparation checklist.</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-ey-dark">68/100</div>
          <div className="text-sm text-ey-gray mt-1">Your readiness score</div>
          <div className="flex justify-center gap-1 mt-3">
            {[1,2,3,4,5].map((d) => (
              <div key={d} className={`w-8 h-1.5 rounded-full ${d <= 3 ? "bg-ey-yellow" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase">Pre-Interview Checklist</div>
          {[
            { item: "Review your top 3 STAR stories — read them aloud once", done: true },
            { item: "Recall the JD's must-have skills: Java, Spring Boot, AWS, Microservices", done: true },
            { item: "Prepare your 60-second career overview", done: true },
            { item: "Have 2-3 questions ready for the interviewer", done: false },
            { item: "Test your setup: camera, audio, internet, quiet space", done: false },
            { item: "Keep water and notepad nearby", done: false },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" defaultChecked={c.done} className="accent-ey-yellow" />
              <span className={`text-sm ${c.done ? "text-ey-dark" : "text-ey-gray"}`}>{c.item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase mb-4">Quick Reminders</div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Answer structure", desc: "Lead with the headline, then provide detail. Keep answers under 2 minutes." },
            { title: "When you don't know", desc: "Say 'I haven't worked directly with that, but here's how I'd approach it...' — show problem-solving." },
            { title: "Bench question", desc: "Frame it positively: project concluded, you've been upskilling and preparing for exactly this type of role." },
            { title: "Questions for them", desc: "Ask about team structure, current technical challenges, or what success looks like in 90 days." },
          ].map((r) => (
            <div key={r.title} className="p-3 bg-gray-50 rounded">
              <div className="text-sm font-medium text-ey-dark mb-1">{r.title}</div>
              <div className="text-xs text-ey-gray leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ey-dark rounded-lg p-6 text-center">
        <div className="text-lg font-bold text-white mb-2">You have prepared for this.</div>
        <div className="text-sm text-gray-400">5 days active, 3 mock interviews completed, 4 STAR stories ready. You are more prepared than 80% of candidates who walk into this interview.</div>
      </div>
    </div>
  );
}
