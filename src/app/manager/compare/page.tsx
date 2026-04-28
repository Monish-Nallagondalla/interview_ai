"use client";

import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/components/charts/radar-chart";
import { mockCandidates } from "@/lib/mock-data";

const compared = [mockCandidates[0], mockCandidates[2], mockCandidates[4]];
const jdTitle = "Senior Java Microservices Developer — Global Bank Corp";

export default function ComparePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark">Candidate Comparison</h1>
        <p className="text-sm text-ey-gray">Side-by-side evaluation for: <span className="font-medium text-ey-dark">{jdTitle}</span></p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {compared.map((c, rank) => (
          <div key={c.id} className={`bg-white rounded-lg border p-5 ${rank === 0 ? "ring-2 ring-ey-yellow" : ""}`}>
            {rank === 0 && <div className="text-[10px] font-bold tracking-widest text-ey-yellow uppercase mb-2">Recommended</div>}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-bold text-ey-dark">{c.name}</div>
                <div className="text-xs text-ey-gray">{c.yearsExp}y · {c.department}</div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${c.readinessScore >= 75 ? "text-green-600" : "text-ey-dark"}`}>{c.readinessScore}</div>
                <div className="text-[9px] text-ey-gray">readiness</div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <RadarChart dimensions={c.dimensions} size={180} />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-ey-gray">Mocks completed</span>
                <span className="font-medium text-ey-dark">{c.mocksTaken}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ey-gray">Enrichment</span>
                <span className="font-medium text-ey-dark">{c.enrichmentComplete}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ey-gray">Trend</span>
                <span className={`font-medium ${c.trend === "improving" ? "text-green-600" : "text-ey-dark"}`}>{c.trend}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ey-gray">Bench since</span>
                <span className="font-medium text-ey-dark">{c.benchSince}</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase mb-2">Top Skills</div>
              <div className="flex flex-wrap gap-1">
                {c.skills.slice(0, 4).map((s) => (
                  <Badge key={s.name} variant="secondary" className="text-[10px]">{s.name} ({s.proficiency})</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="text-sm font-semibold text-ey-dark mb-4">Dimension-by-Dimension Comparison</h2>
        <div className="space-y-3">
          {(["technicalDepth", "communicationClarity", "starQuality", "jdAlignment", "confidence", "problemSolving"] as const).map((dim) => (
            <div key={dim} className="flex items-center gap-4">
              <div className="w-36 text-xs text-ey-dark capitalize shrink-0">{dim.replace(/([A-Z])/g, " $1").trim()}</div>
              <div className="flex-1 flex items-center gap-2">
                {compared.map((c) => (
                  <div key={c.id} className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-ey-yellow" style={{ width: `${c.dimensions[dim]}%` }} />
                      </div>
                      <span className="text-xs font-medium text-ey-dark w-6 text-right">{c.dimensions[dim]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-ey-gray">
          {compared.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded bg-ey-yellow" />
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
