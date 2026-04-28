"use client";

import { usePathname } from "next/navigation";

const stages = [
  { path: "/candidate/onboarding", label: "Onboard" },
  { path: "/candidate/profile", label: "Profile" },
  { path: "/candidate/gap-analysis", label: "Gaps" },
  { path: "/candidate/prep-plan", label: "Prep" },
  { path: "/candidate/story-builder", label: "Stories" },
  { path: "/candidate/mock-interview", label: "Mock" },
  { path: "/candidate/scorecard", label: "Score" },
];

const milestones = [
  { label: "Profile enriched", done: true },
  { label: "Gap analysis", done: true },
  { label: "5+ stories", done: false },
  { label: "First mock", done: true },
  { label: "Score 70+", done: false },
  { label: "Interview ready", done: false },
];

export function CandidateStatusBar() {
  const pathname = usePathname();
  const allCandidatePaths = [
    "/candidate/onboarding", "/candidate/profile", "/candidate/gap-analysis",
    "/candidate/prep-plan", "/candidate/story-builder", "/candidate/story-bank",
    "/candidate/mock-interview", "/candidate/mock-history", "/candidate/scorecard",
    "/candidate/interview-day",
  ];
  const stageIdx = stages.findIndex((s) => s.path === pathname);
  const currentIdx = stageIdx >= 0 ? stageIdx : allCandidatePaths.indexOf(pathname);
  const readiness = 68;
  const streak = 5;
  const prepCompletion = 62;
  const milestonesHit = milestones.filter((m) => m.done).length;

  return (
    <div className="mb-8">
      {/* Stats row */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 mb-3">
        <div className="flex items-center justify-between">
          {/* Readiness */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-[3px] border-[#FFE600] flex items-center justify-center">
                <span className="text-2xl font-bold text-[#1a1a2e]">{readiness}</span>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Readiness</div>
                <div className="text-sm text-gray-600">Target: 75+</div>
              </div>
            </div>

            <div className="h-12 w-px bg-gray-100" />

            {/* Streak */}
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1.5">Streak</div>
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5,6,7].map((d) => (
                  <div key={d} className={`w-3.5 h-7 rounded-sm transition-colors ${d <= streak ? "bg-[#FFE600]" : "bg-gray-100"}`} />
                ))}
                <span className="text-sm font-semibold text-[#1a1a2e] ml-2">{streak}d</span>
              </div>
            </div>

            <div className="h-12 w-px bg-gray-100" />

            {/* Prep */}
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1.5">Prep completion</div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-100 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-[#FFE600] transition-all" style={{ width: `${prepCompletion}%` }} />
                </div>
                <span className="text-sm font-semibold text-[#1a1a2e]">{prepCompletion}%</span>
              </div>
            </div>
          </div>

          {/* Milestones count */}
          <div className="text-right">
            <div className="text-xs text-gray-400 font-medium">Milestones</div>
            <div className="text-xl font-bold text-[#1a1a2e]">{milestonesHit}<span className="text-gray-300 font-normal">/{milestones.length}</span></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-0.5">
          {stages.map((stage, i) => {
            const isComplete = currentIdx >= 0 && i < currentIdx;
            const isCurrent = i === stageIdx;
            return (
              <div key={stage.path} className="flex-1 group">
                <div className={`h-1.5 rounded-full transition-colors ${
                  isComplete ? "bg-[#FFE600]" : isCurrent ? "bg-[#FFE600]/40" : "bg-gray-100"
                }`} />
                <div className={`text-xs text-center mt-2 transition-colors ${
                  isCurrent ? "font-semibold text-[#1a1a2e]" : isComplete ? "text-gray-500" : "text-gray-300"
                }`}>
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones */}
      <div className="flex gap-2 flex-wrap">
        {milestones.map((m) => (
          <div key={m.label} className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs transition-colors ${
            m.done
              ? "bg-[#1a1a2e] text-white font-medium"
              : "bg-white border border-gray-200 text-gray-400"
          }`}>
            {m.done && <span className="w-2 h-2 rounded-full bg-[#FFE600]" />}
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}
