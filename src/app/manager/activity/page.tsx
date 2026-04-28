"use client";

import { Badge } from "@/components/ui/badge";

const activities = [
  { time: "2 min ago", type: "ready" as const, text: "Amit Patel crossed 80-point readiness threshold for Full Stack Lead role", action: "Approve for interview" },
  { time: "18 min ago", type: "mock" as const, text: "Rajesh Kumar completed Mock #3 (simulation mode) — scored 68/100, up from 62", action: "View scorecard" },
  { time: "45 min ago", type: "outcome" as const, text: "Vikram Singh passed CloudScale Solutions interview — client feedback: 'Excellent K8s depth'", action: "View details" },
  { time: "1 hr ago", type: "alert" as const, text: "Ananya Iyer: No activity for 8 days. Enrichment at 35%, zero mocks completed", action: "Schedule check-in" },
  { time: "2 hrs ago", type: "enrichment" as const, text: "Mohammed Farhan completed profile enrichment — 8 new quantified achievements extracted", action: "View profile" },
  { time: "3 hrs ago", type: "alert" as const, text: "Kavitha Nair: Communication clarity score plateaued at 52 after 3 mocks", action: "Assign coaching" },
  { time: "4 hrs ago", type: "match" as const, text: "New JD uploaded: 'Data Scientist - ML Platform' at HealthFirst Digital. 4 bench candidates match >60%", action: "View matches" },
  { time: "6 hrs ago", type: "mock" as const, text: "Arjun Menon completed Mock #3 — technical depth improved significantly (82/100)", action: "View trajectory" },
  { time: "Yesterday", type: "outcome" as const, text: "Priya Sharma did not convert at HealthFirst. Feedback: 'No production ML deployment experience'", action: "Update prep plan" },
  { time: "Yesterday", type: "system" as const, text: "Quarterly bias audit completed. 2 dimensions flagged for review (Communication, Confidence)", action: "View bias report" },
];

const typeColors = {
  ready: "bg-green-50 border-green-200",
  mock: "bg-blue-50 border-blue-200",
  outcome: "bg-purple-50 border-purple-200",
  alert: "bg-red-50 border-red-200",
  enrichment: "bg-yellow-50 border-yellow-200",
  match: "bg-indigo-50 border-indigo-200",
  system: "bg-gray-50 border-gray-200",
};

const typeLabels = {
  ready: "Ready",
  mock: "Mock",
  outcome: "Outcome",
  alert: "Alert",
  enrichment: "Enrichment",
  match: "New JD",
  system: "System",
};

const typeDotColors = {
  ready: "bg-green-500",
  mock: "bg-blue-500",
  outcome: "bg-purple-500",
  alert: "bg-red-500",
  enrichment: "bg-yellow-500",
  match: "bg-indigo-500",
  system: "bg-gray-500",
};

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark">Activity Feed</h1>
        <p className="text-sm text-ey-gray">Real-time updates across your bench candidates</p>
      </div>

      <div className="flex gap-2">
        {Object.entries(typeLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-200 text-[10px] text-ey-gray bg-white">
            <span className={`w-1.5 h-1.5 rounded-full ${typeDotColors[key as keyof typeof typeDotColors]}`} />
            {label}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border divide-y">
        {activities.map((a, i) => (
          <div key={i} className={`px-5 py-4 flex items-start gap-4 ${typeColors[a.type]} border-l-2`} style={{ borderLeftColor: `var(--tw-${a.type})` }}>
            <span className={`w-2 h-2 rounded-full ${typeDotColors[a.type]} mt-1.5 shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-ey-dark leading-relaxed">{a.text}</div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] text-ey-gray">{a.time}</span>
                <button className="text-[10px] font-semibold text-ey-dark hover:underline">{a.action}</button>
              </div>
            </div>
            <Badge className={`text-[10px] shrink-0 border ${typeColors[a.type]}`}>{typeLabels[a.type]}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
