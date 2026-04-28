"use client";

import { Badge } from "@/components/ui/badge";
import { mockAuditLog } from "@/lib/mock-data";

const confidenceColors = {
  high: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-red-100 text-red-700",
};

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark">AI Decision Audit Trail</h1>
        <p className="text-ey-gray text-sm">
          Every AI recommendation logged with timestamp, agent, reasoning, and confidence level. Immutable and audit-ready.
        </p>
      </div>

      <div className="flex gap-4 text-center">
        {[
          { label: "Total Decisions Logged", value: "48,392" },
          { label: "High Confidence", value: "78%" },
          { label: "Manager Overrides", value: "4.2%" },
          { label: "Candidate Disputes", value: "0.3%" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border px-4 py-3 flex-1">
            <div className="text-xl font-bold text-ey-dark">{s.value}</div>
            <div className="text-xs text-ey-gray">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border">
        <div className="px-4 py-3 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="font-semibold text-ey-dark text-sm">Recent Decisions</h2>
          <div className="text-xs text-ey-gray">Showing latest 8 entries</div>
        </div>
        <div className="divide-y">
          {mockAuditLog.map((entry) => (
            <div key={entry.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge className={`text-xs ${confidenceColors[entry.confidence]}`}>
                    {entry.confidence}
                  </Badge>
                  <span className="font-medium text-sm text-ey-dark">{entry.action}</span>
                </div>
                <span className="text-xs text-ey-gray shrink-0">{entry.timestamp}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="text-ey-gray">Agent:</span>
                <span className="font-medium text-ey-dark">{entry.agent}</span>
                <span className="text-ey-gray">·</span>
                <span className="text-ey-gray">Candidate:</span>
                <span className="font-medium text-ey-dark">{entry.candidateName}</span>
              </div>
              <div className="text-xs text-ey-gray bg-gray-50 rounded p-2 leading-relaxed">
                {entry.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-ey-dark mb-3">Audit Compliance Status</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          {[
            "All decisions have logged reasoning chains",
            "Model versions tracked for all scoring operations",
            "Manager override reasons documented and stored",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 flex items-center justify-center shrink-0 mt-px">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </span>
              <span className="text-ey-gray">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
