"use client";

import { Badge } from "@/components/ui/badge";

const biasData = [
  { dimension: "Technical Depth", male: 71, female: 69, variance: 2.8, status: "pass" as const },
  { dimension: "Communication Clarity", male: 58, female: 62, variance: 6.4, status: "warning" as const },
  { dimension: "STAR Quality", male: 61, female: 60, variance: 1.6, status: "pass" as const },
  { dimension: "JD Alignment", male: 66, female: 65, variance: 1.5, status: "pass" as const },
  { dimension: "Confidence", male: 68, female: 63, variance: 7.3, status: "warning" as const },
  { dimension: "Problem Solving", male: 70, female: 69, variance: 1.4, status: "pass" as const },
];

const departmentBias = [
  { dept: "Cloud & Infrastructure", avgScore: 72, candidates: 3400, variance: 2.1 },
  { dept: "Data & Analytics", avgScore: 65, candidates: 2800, variance: 3.4 },
  { dept: "Full Stack", avgScore: 68, candidates: 4200, variance: 1.8 },
  { dept: "QA & Testing", avgScore: 58, candidates: 1600, variance: 4.2 },
  { dept: "SAP & ERP", avgScore: 63, candidates: 1200, variance: 2.9 },
  { dept: "DevOps", avgScore: 74, candidates: 2100, variance: 1.5 },
];

const experienceBias = [
  { band: "0-3 years", avgScore: 52, candidates: 5600, overrideRate: "6.2%" },
  { band: "3-7 years", avgScore: 64, candidates: 6400, overrideRate: "3.8%" },
  { band: "7-12 years", avgScore: 71, candidates: 3200, overrideRate: "2.1%" },
  { band: "12+ years", avgScore: 68, candidates: 1200, overrideRate: "5.4%" },
];

export default function BiasReportPage() {
  const overallVariance = 3.2;
  const threshold = 5.0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Bias & Fairness Report</h1>
          <p className="text-sm text-ey-gray">Quarterly automated analysis — last run: April 15, 2026</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-2 text-center">
          <div className={`text-2xl font-bold ${overallVariance <= threshold ? "text-green-600" : "text-red-600"}`}>
            {overallVariance}%
          </div>
          <div className="text-[10px] text-ey-gray uppercase tracking-widest">Overall Variance</div>
          <div className="text-[10px] text-ey-gray">Threshold: {threshold}%</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="text-sm font-semibold text-ey-dark mb-4">Gender Variance by Scoring Dimension</h2>
        <p className="text-xs text-ey-gray mb-4">Variance above 5% triggers investigation. Two dimensions flagged for review this quarter.</p>
        <div className="space-y-3">
          {biasData.map((d) => (
            <div key={d.dimension} className="flex items-center gap-4">
              <div className="w-40 text-sm text-ey-dark shrink-0">{d.dimension}</div>
              <div className="flex-1 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-ey-gray w-8 text-right">{d.male}</span>
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-400" style={{ width: `${d.male}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-purple-400" style={{ width: `${d.female}%` }} />
                  </div>
                  <span className="text-xs text-ey-gray w-8">{d.female}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-sm font-bold ${d.variance > 5 ? "text-red-600" : "text-green-600"}`}>
                  {d.variance}%
                </span>
                <Badge className={`text-[10px] ${d.status === "pass" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"} border`}>
                  {d.status === "pass" ? "Within threshold" : "Under review"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-4 text-xs text-ey-gray">
          <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-blue-400" /> Male avg</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-purple-400" /> Female avg</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-5">
          <h2 className="text-sm font-semibold text-ey-dark mb-4">Scoring by Department</h2>
          <div className="space-y-3">
            {departmentBias.map((d) => (
              <div key={d.dept} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-ey-dark">{d.dept}</div>
                  <div className="text-[10px] text-ey-gray">{d.candidates.toLocaleString()} candidates</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-ey-yellow" style={{ width: `${d.avgScore}%` }} />
                  </div>
                  <span className="text-sm font-medium text-ey-dark w-6 text-right">{d.avgScore}</span>
                  <span className={`text-[10px] w-10 text-right ${d.variance > 3 ? "text-yellow-600" : "text-green-600"}`}>
                    ±{d.variance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5">
          <h2 className="text-sm font-semibold text-ey-dark mb-4">Scoring by Experience Band</h2>
          <p className="text-xs text-ey-gray mb-3">High override rates may indicate AI scoring misalignment for specific bands.</p>
          <div className="space-y-3">
            {experienceBias.map((d) => (
              <div key={d.band} className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium text-ey-dark">{d.band}</div>
                  <div className="text-[10px] text-ey-gray">{d.candidates.toLocaleString()} candidates</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-ey-dark">{d.avgScore} avg</div>
                  <div className="text-[10px] text-ey-gray">Override rate: {d.overrideRate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-ey-dark mb-2">Actions from This Quarter&apos;s Review</h3>
        <div className="space-y-2 text-xs text-ey-gray">
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center shrink-0 mt-px"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /></span>
            <span><strong className="text-ey-dark">Communication Clarity</strong> — 6.4% gender variance. Investigating whether scoring rubric language disproportionately penalizes certain communication styles. Rubric revision scheduled for May 2026.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center shrink-0 mt-px"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /></span>
            <span><strong className="text-ey-dark">Confidence scoring</strong> — 7.3% variance. Reviewing whether hedging-language detection has cultural or gender bias embedded. Adding diverse calibration samples.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 flex items-center justify-center shrink-0 mt-px"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /></span>
            <span><strong className="text-ey-dark">12+ years band</strong> — 5.4% override rate is highest. Likely because AI underweights leadership experience vs technical depth for senior profiles. Scoring weight adjustment in progress.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
