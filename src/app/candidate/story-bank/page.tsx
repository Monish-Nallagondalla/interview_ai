"use client";

import { Badge } from "@/components/ui/badge";

const stories = [
  { requirement: "Microservices architecture at scale", status: "complete" as const, title: "Monolith-to-Microservices Migration", situation: "Banking platform with deployment bottlenecks — 2-week release cycles, cascading failures.", result: "API latency reduced 40%, deployments went from bi-weekly to daily, 50K daily transactions at 99.9% uptime.", quality: 82 },
  { requirement: "Performance optimization", status: "complete" as const, title: "Redis Caching Implementation", situation: "API response times degrading as transaction volume grew 3x over 6 months.", result: "P95 latency reduced from 800ms to 120ms, eliminated 60% of database queries.", quality: 75 },
  { requirement: "Team leadership and mentoring", status: "draft" as const, title: "Leading Migration Team of 4", situation: "Cross-functional team with mixed experience levels during critical migration.", result: "Delivered 3 sprints ahead of schedule — needs stronger quantified team outcome.", quality: 52 },
  { requirement: "Handling production incidents", status: "complete" as const, title: "Payment Gateway Outage Resolution", situation: "Payment processing failed during peak hours affecting ₹2Cr/hour in transactions.", result: "Root cause identified in 18 minutes, service restored in 35 minutes, implemented circuit breaker pattern to prevent recurrence.", quality: 78 },
  { requirement: "Client stakeholder communication", status: "not-started" as const, title: "", situation: "", result: "", quality: 0 },
  { requirement: "AWS cloud architecture decisions", status: "draft" as const, title: "AWS Service Selection for BFSI", situation: "Choosing between ECS and EKS for containerized banking microservices.", result: "Chose ECS for operational simplicity — needs deeper trade-off articulation for interview.", quality: 40 },
  { requirement: "Agile delivery in large teams", status: "not-started" as const, title: "", situation: "", result: "", quality: 0 },
  { requirement: "System design under constraints", status: "complete" as const, title: "High-Throughput Transaction Processor", situation: "Client required 50K TPS with sub-100ms latency on existing AWS infrastructure.", result: "Designed event-driven architecture with Kafka + Lambda, achieved 65K TPS at 80ms P99.", quality: 85 },
];

const statusLabel = { "complete": "Complete", "draft": "In Progress", "not-started": "Not Started" };
const statusColor = { "complete": "bg-green-50 text-green-700 border-green-200", "draft": "bg-yellow-50 text-yellow-700 border-yellow-200", "not-started": "bg-gray-50 text-gray-500 border-gray-200" };

export default function StoryBankPage() {
  const complete = stories.filter((s) => s.status === "complete").length;
  const total = stories.length;
  const avgQuality = Math.round(stories.filter((s) => s.quality > 0).reduce((a, s) => a + s.quality, 0) / stories.filter((s) => s.quality > 0).length);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">STAR Story Bank</h1>
          <p className="text-sm text-ey-gray">Your interview-ready stories mapped to JD requirements</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold text-ey-dark">{complete}/{total}</div>
            <div className="text-[10px] text-ey-gray uppercase tracking-widest">Stories Ready</div>
          </div>
          <div className="bg-white border rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold text-ey-dark">{avgQuality}</div>
            <div className="text-[10px] text-ey-gray uppercase tracking-widest">Avg Quality</div>
          </div>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-ey-dark">JD Requirement Coverage</span>
          <span className="text-xs text-ey-gray">{complete} of {total} requirements covered</span>
        </div>
        <div className="flex gap-1">
          {stories.map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full ${
              s.status === "complete" ? "bg-ey-yellow" : s.status === "draft" ? "bg-yellow-200" : "bg-gray-100"
            }`} />
          ))}
        </div>
      </div>

      {/* Stories */}
      <div className="space-y-3">
        {stories.map((story, i) => (
          <div key={i} className={`bg-white rounded-lg border p-5 ${story.status === "not-started" ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase mb-1">JD Requirement</div>
                <div className="text-sm font-semibold text-ey-dark">{story.requirement}</div>
              </div>
              <div className="flex items-center gap-3">
                {story.quality > 0 && (
                  <div className="text-right">
                    <div className={`text-lg font-bold ${story.quality >= 70 ? "text-green-600" : story.quality >= 50 ? "text-ey-dark" : "text-red-600"}`}>
                      {story.quality}
                    </div>
                    <div className="text-[9px] text-ey-gray">quality</div>
                  </div>
                )}
                <Badge className={`text-[10px] border ${statusColor[story.status]}`}>
                  {statusLabel[story.status]}
                </Badge>
              </div>
            </div>
            {story.title && (
              <div className="bg-gray-50 rounded p-3 space-y-2">
                <div className="text-sm font-medium text-ey-dark">{story.title}</div>
                <div className="text-xs text-ey-gray"><span className="font-semibold text-ey-dark">S/T:</span> {story.situation}</div>
                <div className="text-xs text-ey-gray"><span className="font-semibold text-ey-dark">R:</span> {story.result}</div>
              </div>
            )}
            {story.status === "not-started" && (
              <div className="text-xs text-ey-gray mt-2">No story built yet — start in Story Builder to cover this requirement.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
