"use client";

import { systemHealth } from "@/lib/mock-data";

const metrics = [
  { label: "Model Avg Latency", value: systemHealth.modelLatency, status: "healthy" },
  { label: "Platform Uptime", value: systemHealth.uptime, status: "healthy" },
  { label: "Active Sessions", value: systemHealth.activeSessions.toLocaleString(), status: "healthy" },
  { label: "Total Candidates", value: systemHealth.totalCandidates.toLocaleString(), status: "healthy" },
  { label: "Hallucination Rate", value: systemHealth.hallucinationRate, status: systemHealth.hallucinationRate > "2%" ? "warning" : "healthy" },
  { label: "Bias Variance", value: systemHealth.biasVariance, status: systemHealth.biasVariance > "5%" ? "critical" : "healthy" },
  { label: "Feedback Integration Lag", value: systemHealth.feedbackIntegrationLag, status: "healthy" },
  { label: "Scoring Consistency", value: systemHealth.scoringConsistency, status: "healthy" },
  { label: "User Satisfaction", value: `${systemHealth.userSatisfaction}/5.0`, status: systemHealth.userSatisfaction >= 4.0 ? "healthy" : "warning" },
  { label: "API Calls (24h)", value: systemHealth.apiCalls24h.toLocaleString(), status: "healthy" },
];

const statusColors = {
  healthy: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
  critical: "bg-red-100 text-red-700 border-red-200",
};

const circuitBreakers = [
  { name: "Hallucination Detection", threshold: "5%", current: "1.3%", status: "OK" as const },
  { name: "Scoring Variance", threshold: "10%", current: "3.2%", status: "OK" as const },
  { name: "Bias Detection", threshold: "5%", current: "3.2%", status: "OK" as const },
  { name: "Prediction Accuracy", threshold: "<60%", current: "74%", status: "OK" as const },
  { name: "User Report Threshold", threshold: "3+ per session", current: "0.4 avg", status: "OK" as const },
];

const agentStatus = [
  { name: "Profile Enrichment Agent", calls24h: 1240, avgLatency: "1.4s", errorRate: "0.2%", status: "operational" },
  { name: "JD Parser Agent", calls24h: 380, avgLatency: "0.8s", errorRate: "0.1%", status: "operational" },
  { name: "Gap Analyzer Agent", calls24h: 920, avgLatency: "1.6s", errorRate: "0.3%", status: "operational" },
  { name: "Prep Plan Agent", calls24h: 640, avgLatency: "2.1s", errorRate: "0.1%", status: "operational" },
  { name: "Story Coach Agent", calls24h: 1850, avgLatency: "1.3s", errorRate: "0.2%", status: "operational" },
  { name: "Mock Interviewer Agent", calls24h: 3200, avgLatency: "1.5s", errorRate: "0.4%", status: "operational" },
  { name: "Feedback Scorer Agent", calls24h: 2100, avgLatency: "2.3s", errorRate: "0.5%", status: "degraded" },
  { name: "Learning Recommender Agent", calls24h: 510, avgLatency: "0.9s", errorRate: "0.1%", status: "operational" },
];

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark">AI System Health</h1>
        <p className="text-ey-gray text-sm">Real-time monitoring of AI performance, reliability, and fairness</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className={`rounded-lg border p-3 ${statusColors[m.status as keyof typeof statusColors]}`}>
            <div className="text-xs opacity-75 mb-1">{m.label}</div>
            <div className="text-lg font-bold">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Circuit Breakers</h2>
          <p className="text-xs text-ey-gray mb-3">Automatic safeguards that trigger when AI behavior exceeds thresholds</p>
          <div className="space-y-2">
            {circuitBreakers.map((cb) => (
              <div key={cb.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium text-ey-dark">{cb.name}</div>
                  <div className="text-xs text-ey-gray">Threshold: {cb.threshold}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-ey-dark">{cb.current}</div>
                  <div className="text-xs text-green-600 font-medium">{cb.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Agent Performance (8 agents)</h2>
          <div className="space-y-2">
            {agentStatus.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${agent.status === "operational" ? "bg-green-500" : "bg-yellow-500"}`} />
                  <div>
                    <div className="text-xs font-medium text-ey-dark">{agent.name}</div>
                    <div className="text-[10px] text-ey-gray">{agent.calls24h.toLocaleString()} calls/24h</div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-ey-dark">{agent.avgLatency}</div>
                  <div className={agent.errorRate > "0.3%" ? "text-yellow-600" : "text-green-600"}>{agent.errorRate} err</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
