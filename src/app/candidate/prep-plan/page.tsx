"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const prepPlan = [
  { day: 1, focus: "Critical Skill Gaps", tasks: [
    { task: "Deep-dive on AWS Lambda, ECS, CloudFormation — understand trade-offs", time: "90 min", type: "learning" },
    { task: "Build a mental model: 'When I used AWS at [project], the scale was...'", time: "30 min", type: "practice" },
    { task: "Self-check: Can you explain 3 AWS architectural decisions you've made?", time: "15 min", type: "checkpoint" },
  ]},
  { day: 2, focus: "Kubernetes & Container Orchestration", tasks: [
    { task: "Review Kubernetes concepts: pods, services, deployments, scaling", time: "60 min", type: "learning" },
    { task: "Connect to your Docker experience — what's the bridge narrative?", time: "30 min", type: "practice" },
    { task: "Prepare 1 STAR story about containerization from your microservices project", time: "30 min", type: "practice" },
  ]},
  { day: 3, focus: "STAR Story Building — Technical", tasks: [
    { task: "Build STAR story: Monolith → Microservices migration (scale, decisions, outcome)", time: "45 min", type: "practice" },
    { task: "Build STAR story: Performance optimization (the 40% latency reduction)", time: "45 min", type: "practice" },
    { task: "Rehearse both stories aloud — under 2 minutes each", time: "30 min", type: "practice" },
  ]},
  { day: 4, focus: "STAR Story Building — Behavioral", tasks: [
    { task: "Build STAR story: Team leadership / mentoring example", time: "45 min", type: "practice" },
    { task: "Build STAR story: Handling a production incident or critical bug", time: "45 min", type: "practice" },
    { task: "Prepare answer: 'Why are you currently available / on bench?'", time: "20 min", type: "practice" },
  ]},
  { day: 5, focus: "System Design Practice", tasks: [
    { task: "Practice designing a high-throughput transaction system (maps to JD requirement)", time: "60 min", type: "learning" },
    { task: "Review: CAP theorem, database choices, caching strategies, API design", time: "45 min", type: "learning" },
    { task: "Self-check: Can you whiteboard a system for 50K TPS in 15 minutes?", time: "15 min", type: "checkpoint" },
  ]},
  { day: 6, focus: "Mock Interview #1 (Practice Mode)", tasks: [
    { task: "Complete AI mock interview — practice mode with hints enabled", time: "40 min", type: "mock" },
    { task: "Review scorecard — identify 2 weakest areas", time: "20 min", type: "review" },
    { task: "Revise STAR stories based on feedback", time: "30 min", type: "practice" },
  ]},
  { day: 7, focus: "Communication & Articulation", tasks: [
    { task: "Practice concise responses — 'headline, detail, example' framework", time: "30 min", type: "practice" },
    { task: "Record yourself answering 3 questions — listen back for rambling", time: "30 min", type: "practice" },
    { task: "Refine: Can you explain each project in 60 seconds or less?", time: "20 min", type: "checkpoint" },
  ]},
  { day: 8, focus: "Mock Interview #2 (Simulation Mode)", tasks: [
    { task: "Complete AI mock interview — simulation mode, no hints", time: "45 min", type: "mock" },
    { task: "Compare scorecard with Mock #1 — track improvement", time: "15 min", type: "review" },
    { task: "Focus drill on any dimension still below 65", time: "30 min", type: "practice" },
  ]},
  { day: 9, focus: "Final Polish", tasks: [
    { task: "Review all STAR stories — final refinement pass", time: "30 min", type: "practice" },
    { task: "Prepare 3 smart questions to ask the interviewer", time: "15 min", type: "practice" },
    { task: "Quick refresher on JD-specific technical topics", time: "30 min", type: "learning" },
  ]},
  { day: 10, focus: "Interview Day Prep", tasks: [
    { task: "Light review of key stories and technical talking points", time: "20 min", type: "review" },
    { task: "Mindset prep: confidence visualization, deep breathing", time: "10 min", type: "practice" },
    { task: "Logistics check: setup, connectivity, documents ready", time: "10 min", type: "checkpoint" },
  ]},
];

export default function PrepPlanPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Personalized Preparation Plan</h1>
          <p className="text-ey-gray text-sm">10-day plan tailored to your gap analysis · ~2-3 hours/day</p>
        </div>
        <Button className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold">
          Download Plan
        </Button>
      </div>

      <div className="space-y-4">
        {prepPlan.map((day) => (
          <div key={day.day} className="bg-white rounded-lg border overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-3 bg-gray-50 border-b">
              <div className="w-10 h-10 rounded-full bg-ey-dark text-ey-yellow flex items-center justify-center font-bold text-sm">
                D{day.day}
              </div>
              <div>
                <div className="font-semibold text-ey-dark text-sm">{day.focus}</div>
                <div className="text-xs text-ey-gray">
                  {day.tasks.reduce((acc, t) => acc + parseInt(t.time), 0)} min total
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {day.tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="mt-1 accent-ey-yellow" />
                  <div className="flex-1">
                    <span className="text-sm text-ey-dark">{task.task}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {task.type}
                    </Badge>
                    <span className="text-xs text-ey-gray">{task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Resources */}
      <div className="bg-white rounded-lg border p-5">
        <h2 className="text-sm font-semibold text-ey-dark mb-4">Recommended Learning Resources</h2>
        <p className="text-xs text-ey-gray mb-4">Curated based on your specific gap analysis. In production, these integrate with your organization&apos;s L&D catalog.</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "AWS Architecture: Lambda, ECS, and CloudFormation", provider: "Internal L&D", duration: "4 hrs", priority: "High", gap: "AWS depth" },
            { title: "Kubernetes for Java Developers", provider: "Internal L&D", duration: "6 hrs", priority: "High", gap: "Container orchestration" },
            { title: "System Design Interview Preparation", provider: "Internal L&D", duration: "8 hrs", priority: "Medium", gap: "System design" },
            { title: "STAR Method: Structuring Behavioral Answers", provider: "L&D Quick Module", duration: "1 hr", priority: "High", gap: "Communication clarity" },
            { title: "Microservices Patterns and Trade-offs", provider: "External — O&apos;Reilly", duration: "3 hrs", priority: "Medium", gap: "Technical articulation" },
            { title: "Concise Communication for Technical Professionals", provider: "L&D Quick Module", duration: "2 hrs", priority: "High", gap: "Response structure" },
          ].map((r) => (
            <div key={r.title} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-1 h-full rounded-full shrink-0 ${r.priority === "High" ? "bg-ey-yellow" : "bg-gray-300"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ey-dark">{r.title}</div>
                <div className="text-xs text-ey-gray mt-0.5">{r.provider} · {r.duration}</div>
                <div className="text-[10px] text-ey-gray mt-1">Addresses gap: <span className="font-medium text-ey-dark">{r.gap}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
