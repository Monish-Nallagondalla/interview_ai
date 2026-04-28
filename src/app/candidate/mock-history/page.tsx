"use client";

import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/components/charts/radar-chart";

const sessions = [
  { id: 1, date: "Apr 20", mode: "Practice", score: 55, dims: { technicalDepth: 60, communicationClarity: 45, starQuality: 48, jdAlignment: 58, confidence: 52, problemSolving: 55 }, questions: 8, duration: "25 min", topFeedback: "Technical fundamentals solid. Communication needs structure — responses averaged 3+ minutes." },
  { id: 2, date: "Apr 24", mode: "Practice", score: 62, dims: { technicalDepth: 68, communicationClarity: 52, starQuality: 55, jdAlignment: 65, confidence: 60, problemSolving: 62 }, questions: 10, duration: "30 min", topFeedback: "Improved on STAR structure. AWS depth still at EC2/S3 level — prepare Lambda and ECS narratives." },
  { id: 3, date: "Apr 27", mode: "Simulation", score: 68, dims: { technicalDepth: 75, communicationClarity: 55, starQuality: 60, jdAlignment: 72, confidence: 65, problemSolving: 70 }, questions: 12, duration: "35 min", topFeedback: "Strong technical improvement. Communication still verbose but trending better. Ready for stress test." },
];

export default function MockHistoryPage() {
  const improvement = sessions[sessions.length - 1].score - sessions[0].score;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Mock Interview History</h1>
          <p className="text-sm text-ey-gray">Track your improvement across sessions</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-2 text-right">
          <div className="text-2xl font-bold text-green-600">+{improvement} pts</div>
          <div className="text-[10px] text-ey-gray uppercase tracking-widest">Total improvement</div>
        </div>
      </div>

      {/* Score trajectory */}
      <div className="bg-white rounded-lg border p-5">
        <h2 className="text-sm font-semibold text-ey-dark mb-4">Score Trajectory</h2>
        <div className="flex items-end gap-4 h-40">
          {sessions.map((s) => (
            <div key={s.id} className="flex-1 flex flex-col items-center gap-2">
              <span className={`text-sm font-bold ${s.score >= 70 ? "text-green-600" : s.score >= 50 ? "text-ey-dark" : "text-red-600"}`}>
                {s.score}
              </span>
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: "120px" }}>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-ey-yellow rounded-t-lg transition-all"
                  style={{ height: `${(s.score / 100) * 120}px` }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-ey-dark">Mock #{s.id}</div>
                <div className="text-[10px] text-ey-gray">{s.date} · {s.mode}</div>
              </div>
            </div>
          ))}
          {/* Projected next */}
          <div className="flex-1 flex flex-col items-center gap-2 opacity-40">
            <span className="text-sm font-bold text-ey-gray">74?</span>
            <div className="w-full bg-gray-100 rounded-t-lg relative border-2 border-dashed border-gray-300" style={{ height: "120px" }}>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-t-lg" style={{ height: `${(74 / 100) * 120}px` }} />
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-ey-gray">Next Mock</div>
              <div className="text-[10px] text-ey-gray">Projected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Session details */}
      <div className="space-y-4">
        {[...sessions].reverse().map((s) => (
          <div key={s.id} className="bg-white rounded-lg border p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-ey-dark flex items-center justify-center">
                  <span className="text-ey-yellow font-bold text-sm">#{s.id}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-ey-dark">{s.mode} Mode</div>
                  <div className="text-xs text-ey-gray">{s.date} · {s.questions} questions · {s.duration}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${s.score >= 70 ? "text-green-600" : "text-ey-dark"}`}>{s.score}/100</div>
                {s.id > 1 && (
                  <div className="text-xs text-green-600 font-medium">
                    +{s.score - sessions[s.id - 2].score} from previous
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-6">
              <RadarChart dimensions={s.dims} size={180} />
              <div className="flex-1">
                <div className="text-xs font-semibold text-ey-gray uppercase tracking-widest mb-2">Key Feedback</div>
                <p className="text-sm text-ey-dark leading-relaxed">{s.topFeedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
