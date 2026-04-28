"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadarChart } from "@/components/charts/radar-chart";

const scorecard = {
  overallScore: 68,
  previousScore: 55,
  dimensions: {
    technicalDepth: { score: 75, feedback: "Strong on Java/Spring fundamentals. AWS depth needs work — responses stayed at EC2/S3 level when asked about Lambda, ECS, and CloudFormation trade-offs." },
    communicationClarity: { score: 55, feedback: "Responses tend to be verbose and unstructured. Key improvement: lead with the headline, then provide detail. Several answers exceeded 3 minutes when ideal is under 2." },
    starQuality: { score: 60, feedback: "Microservices migration story was well-structured with good quantification (40% latency reduction). Leadership story lacked specific results — 'the team performed well' needs numbers." },
    jdAlignment: { score: 72, feedback: "Good alignment on core Java skills. Missed opportunity to connect your experience to BFSI-specific requirements like transaction compliance and audit trails." },
    confidence: { score: 65, feedback: "Confident on technical topics but hedged frequently on leadership questions ('I think we...', 'probably around...'). Own your results." },
    problemSolving: { score: 70, feedback: "System design answer showed good fundamentals (caching, async processing). Could improve by discussing trade-offs more explicitly and considering failure modes." },
  },
  topStrengths: [
    "Strong quantified STAR story for microservices migration",
    "Good depth on Java ecosystem and Spring Boot patterns",
    "Solid system design fundamentals with practical experience",
  ],
  criticalImprovements: [
    "Communication: Practice 'headline-detail-example' format to cut response length by 40%",
    "AWS: Prepare specific stories beyond basic EC2/S3 — focus on Lambda, ECS for this JD",
    "Confidence: Replace hedging language ('I think', 'probably') with assertive statements",
  ],
  nextActions: [
    "Re-do Day 1-2 of prep plan focusing specifically on AWS Lambda and ECS use cases",
    "Rework leadership STAR story with quantified team outcomes",
    "Practice 5 answers using headline-detail format, recording and reviewing each",
    "Schedule Mock #4 in simulation mode after completing above actions",
  ],
};

const dimKey = (k: string) => k as keyof typeof scorecard.dimensions;

export default function ScorecardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Mock Interview Scorecard</h1>
          <p className="text-ey-gray text-sm">Mock #3 · Simulation Mode · Apr 27, 2026</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-ey-dark">{scorecard.overallScore}/100</div>
          <div className="text-sm text-green-600 font-medium">↑ {scorecard.overallScore - scorecard.previousScore} from previous mock</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-5 flex justify-center">
          <RadarChart
            dimensions={{
              technicalDepth: scorecard.dimensions.technicalDepth.score,
              communicationClarity: scorecard.dimensions.communicationClarity.score,
              starQuality: scorecard.dimensions.starQuality.score,
              jdAlignment: scorecard.dimensions.jdAlignment.score,
              confidence: scorecard.dimensions.confidence.score,
              problemSolving: scorecard.dimensions.problemSolving.score,
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 text-sm mb-2">Top Strengths</h3>
            <ul className="text-xs text-green-700 space-y-1.5">
              {scorecard.topStrengths.map((s, i) => <li key={i} className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 shrink-0" />{s}</li>)}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 text-sm mb-2">Critical Improvements</h3>
            <ul className="text-xs text-red-700 space-y-1.5">
              {scorecard.criticalImprovements.map((s, i) => <li key={i} className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" />{s}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="font-semibold text-ey-dark mb-4">Dimension-by-Dimension Feedback</h2>
        <div className="space-y-4">
          {Object.entries(scorecard.dimensions).map(([key, val]) => (
            <div key={key} className="flex items-start gap-4 p-3 bg-gray-50 rounded">
              <div className="shrink-0 text-center">
                <div
                  className={`text-lg font-bold ${
                    val.score >= 70 ? "text-green-600" : val.score >= 50 ? "text-yellow-600" : "text-red-600"
                  }`}
                >
                  {val.score}
                </div>
                <div className="text-[10px] text-ey-gray">/100</div>
              </div>
              <div>
                <div className="text-sm font-medium text-ey-dark capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="text-xs text-ey-gray mt-0.5">{val.feedback}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="font-semibold text-ey-dark mb-3">Next Actions</h2>
        <div className="space-y-2">
          {scorecard.nextActions.map((action, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="w-6 h-6 rounded-full bg-ey-yellow flex items-center justify-center text-xs font-bold text-ey-dark shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-ey-dark">{action}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => window.location.href = "/candidate/mock-interview"}>
          Take Another Mock →
        </Button>
        <Button
          className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold"
          onClick={() => window.location.href = "/candidate/prep-plan"}
        >
          Update Prep Plan →
        </Button>
      </div>
    </div>
  );
}
