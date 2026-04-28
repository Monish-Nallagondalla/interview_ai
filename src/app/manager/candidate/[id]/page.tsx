"use client";

import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadarChart } from "@/components/charts/radar-chart";
import { mockCandidates, mockSessions } from "@/lib/mock-data";

export default function CandidateDrillDown({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const candidate = mockCandidates.find((c) => c.id === id) || mockCandidates[0];
  const sessions = mockSessions.filter((s) => s.candidateId === candidate.id);

  const timeline = [
    { date: "2026-03-15", event: "Joined bench", type: "status" as const },
    { date: "2026-03-18", event: "Started profile enrichment", type: "action" as const },
    { date: "2026-03-20", event: "Enrichment complete — 72%", type: "milestone" as const },
    { date: "2026-03-22", event: "Gap analysis for Senior Java Microservices Developer", type: "action" as const },
    { date: "2026-03-24", event: "Prep plan generated — 10-day plan", type: "action" as const },
    { date: "2026-04-01", event: "3 STAR stories built", type: "milestone" as const },
    ...sessions.map((s) => ({
      date: s.date,
      event: `Mock #${sessions.indexOf(s) + 1} (${s.mode}) — Score: ${s.overallScore}/100`,
      type: "mock" as const,
    })),
    { date: "2026-04-28", event: "Current readiness: 68/100", type: "status" as const },
  ].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-ey-dark">{candidate.name}</h1>
            <Badge className={`text-xs ${
              candidate.status === "interview-ready" ? "bg-green-100 text-green-700" :
              candidate.status === "in-prep" ? "bg-blue-100 text-blue-700" :
              "bg-gray-100 text-gray-700"
            }`}>
              {candidate.status.replace("-", " ")}
            </Badge>
          </div>
          <p className="text-sm text-ey-gray">
            {candidate.department} · {candidate.businessUnit} · {candidate.yearsExp} years experience · On bench since {candidate.benchSince}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">Add Note</Button>
          <Button variant="outline" size="sm" className="text-xs">Override Score</Button>
          <Button size="sm" className="bg-ey-dark text-ey-yellow hover:bg-gray-800 text-xs">Submit for Interview</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Radar + Score */}
        <div className="bg-white rounded-lg border p-5">
          <h2 className="text-sm font-semibold text-ey-dark mb-4">Readiness Assessment</h2>
          <div className="flex justify-center">
            <RadarChart dimensions={candidate.dimensions} size={240} />
          </div>
          <div className="text-center mt-3">
            <div className="text-3xl font-bold text-ey-dark">{candidate.readinessScore}</div>
            <div className="text-xs text-ey-gray">Overall Readiness Score</div>
          </div>
        </div>

        {/* Mock History */}
        <div className="bg-white rounded-lg border p-5">
          <h2 className="text-sm font-semibold text-ey-dark mb-4">Mock Interview Trajectory</h2>
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-16 text-xs text-ey-gray">{s.date.slice(5)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-ey-dark font-medium">Mock #{i + 1} ({s.mode})</span>
                      <span className={`text-sm font-bold ${s.overallScore >= 70 ? "text-green-600" : s.overallScore >= 50 ? "text-ey-dark" : "text-red-600"}`}>
                        {s.overallScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-ey-yellow transition-all"
                        style={{ width: `${s.overallScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t text-xs text-ey-gray">
                Improvement: +{sessions[sessions.length - 1].overallScore - sessions[0].overallScore} points across {sessions.length} sessions
              </div>
            </div>
          ) : (
            <div className="text-sm text-ey-gray text-center py-8">No mock interviews completed yet</div>
          )}
        </div>

        {/* Skills + Quick Stats */}
        <div className="bg-white rounded-lg border p-5">
          <h2 className="text-sm font-semibold text-ey-dark mb-4">Profile Summary</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded p-2.5">
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase">Enrichment</div>
              <div className="text-lg font-bold text-ey-dark">{candidate.enrichmentComplete}%</div>
            </div>
            <div className="bg-gray-50 rounded p-2.5">
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase">Mocks Taken</div>
              <div className="text-lg font-bold text-ey-dark">{candidate.mocksTaken}</div>
            </div>
            <div className="bg-gray-50 rounded p-2.5">
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase">Trend</div>
              <div className={`text-lg font-bold ${candidate.trend === "improving" ? "text-green-600" : "text-ey-dark"}`}>
                {candidate.trend === "improving" ? "Improving" : candidate.trend === "stable" ? "Stable" : "Declining"}
              </div>
            </div>
            <div className="bg-gray-50 rounded p-2.5">
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase">Last Active</div>
              <div className="text-lg font-bold text-ey-dark">{candidate.lastActive.slice(5)}</div>
            </div>
          </div>
          <h3 className="text-xs font-semibold text-ey-gray uppercase tracking-widest mb-2">Top Skills</h3>
          <div className="space-y-1.5">
            {candidate.skills.slice(0, 5).map((skill) => (
              <div key={skill.name} className="flex items-center justify-between">
                <span className="text-xs text-ey-dark">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-ey-yellow" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                  <span className="text-[10px] text-ey-gray w-6 text-right">{skill.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border p-5">
        <h2 className="text-sm font-semibold text-ey-dark mb-4">Preparation Timeline</h2>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />
          <div className="space-y-3">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4 pl-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 bg-white z-10 ${
                  t.type === "milestone" ? "border-ey-yellow" :
                  t.type === "mock" ? "border-blue-400" :
                  t.type === "action" ? "border-gray-300" : "border-gray-400"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    t.type === "milestone" ? "bg-ey-yellow" :
                    t.type === "mock" ? "bg-blue-400" : "bg-gray-300"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ey-gray">{t.date}</span>
                    <span className="text-sm text-ey-dark">{t.event}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
