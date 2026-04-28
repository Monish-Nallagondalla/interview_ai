"use client";

import { Badge } from "@/components/ui/badge";

const clients = [
  {
    name: "Global Bank Corp",
    interviews: 47,
    conversion: 52,
    avgDuration: "38 min",
    patterns: [
      { signal: "System design depth", weight: "High", evidence: "Asked in 92% of interviews, strongest predictor of pass" },
      { signal: "Concise answers", weight: "High", evidence: "Successful candidates avg 1.8 min/answer vs 3.2 min for failures" },
      { signal: "BFSI domain knowledge", weight: "Medium", evidence: "Domain questions in 60% of interviews but not a dealbreaker" },
      { signal: "Kubernetes depth", weight: "Low", evidence: "Asked rarely despite being in JD — focus on architecture over tooling" },
    ],
    topSkills: ["System Design", "Java", "AWS", "Microservices"],
    recentTrend: "improving",
  },
  {
    name: "RetailTech Inc",
    interviews: 32,
    conversion: 44,
    avgDuration: "42 min",
    patterns: [
      { signal: "Product thinking", weight: "High", evidence: "Values candidates who connect technical choices to business impact" },
      { signal: "Team leadership stories", weight: "High", evidence: "Behavioral questions focused on team dynamics in 85% of interviews" },
      { signal: "React/TypeScript depth", weight: "Medium", evidence: "Technical bar is moderate — architecture > syntax" },
      { signal: "Fast problem solving", weight: "Medium", evidence: "Includes live coding-lite questions, values speed of approach" },
    ],
    topSkills: ["React", "System Design", "Leadership", "TypeScript"],
    recentTrend: "stable",
  },
  {
    name: "CloudScale Solutions",
    interviews: 28,
    conversion: 61,
    avgDuration: "35 min",
    patterns: [
      { signal: "Kubernetes production experience", weight: "High", evidence: "Deep K8s questions in every interview — must demonstrate hands-on" },
      { signal: "Cost optimization stories", weight: "High", evidence: "Specifically asks about infrastructure cost reduction achievements" },
      { signal: "CI/CD pipeline design", weight: "Medium", evidence: "Values end-to-end delivery pipeline ownership" },
      { signal: "Incident management", weight: "Medium", evidence: "Production incident stories highly valued — shows operational maturity" },
    ],
    topSkills: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
    recentTrend: "improving",
  },
];

export default function ClientIntelligencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark">Client Intelligence</h1>
        <p className="text-sm text-ey-gray">
          Patterns learned from interview outcomes — what each client actually values vs. what their JD says
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-ey-gray">
        This intelligence improves as more interview outcomes are logged. Current data from 107 total interviews across 3 clients.
        Patterns are auto-detected by correlating candidate preparation activities with pass/fail outcomes.
      </div>

      <div className="space-y-6">
        {clients.map((client) => (
          <div key={client.name} className="bg-white rounded-lg border overflow-hidden">
            <div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-ey-dark">{client.name}</div>
                <div className="text-xs text-ey-gray">{client.interviews} interviews analyzed</div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-lg font-bold text-ey-dark">{client.conversion}%</div>
                  <div className="text-[10px] text-ey-gray">Conversion</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-ey-dark">{client.avgDuration}</div>
                  <div className="text-[10px] text-ey-gray">Avg Duration</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${client.recentTrend === "improving" ? "text-green-600" : "text-ey-dark"}`}>
                    {client.recentTrend === "improving" ? "Rising" : "Stable"}
                  </div>
                  <div className="text-[10px] text-ey-gray">Trend</div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase mb-3">Learned Interview Patterns</div>
              <div className="space-y-2.5">
                {client.patterns.map((p) => (
                  <div key={p.signal} className="flex items-start gap-3">
                    <Badge className={`text-[10px] shrink-0 mt-0.5 border ${
                      p.weight === "High" ? "bg-ey-yellow/10 text-ey-dark border-ey-yellow/30" :
                      p.weight === "Medium" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-gray-50 text-gray-600 border-gray-200"
                    }`}>
                      {p.weight}
                    </Badge>
                    <div>
                      <div className="text-sm font-medium text-ey-dark">{p.signal}</div>
                      <div className="text-xs text-ey-gray mt-0.5">{p.evidence}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-ey-gray uppercase">Prioritize in prep:</span>
                {client.topSkills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
