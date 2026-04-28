"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockCandidates } from "@/lib/mock-data";

const statusColors = {
  "on-bench": "bg-gray-100 text-gray-700",
  "in-prep": "bg-blue-100 text-blue-700",
  "interview-ready": "bg-green-100 text-green-700",
  "interviewing": "bg-purple-100 text-purple-700",
  "placed": "bg-emerald-100 text-emerald-700",
};

const trendIcons = { improving: "↑", stable: "→", declining: "↓" };
const trendColors = { improving: "text-green-600", stable: "text-gray-500", declining: "text-red-600" };

export default function PipelinePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const departments = [...new Set(mockCandidates.map((c) => c.department))];
  const statuses = [...new Set(mockCandidates.map((c) => c.status))];

  const filtered = mockCandidates.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.skills.some((s) => s.name.toLowerCase().includes(search.toLowerCase()))) return false;
    if (filterDept !== "all" && c.department !== filterDept) return false;
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Bench Candidate Pipeline</h1>
          <p className="text-ey-gray text-sm">{mockCandidates.length} candidates · {mockCandidates.filter((c) => c.status === "interview-ready").length} interview-ready</p>
        </div>
        <div className="flex gap-4 text-center">
          {[
            { label: "On Bench", value: mockCandidates.filter((c) => c.status === "on-bench").length, color: "text-gray-600" },
            { label: "In Prep", value: mockCandidates.filter((c) => c.status === "in-prep").length, color: "text-blue-600" },
            { label: "Ready", value: mockCandidates.filter((c) => c.status === "interview-ready").length, color: "text-green-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border px-4 py-2">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-ey-gray">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Search by name or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="all">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="all">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s.replace("-", " ")}</option>)}
        </select>
      </div>

      {(() => {
        const stalled = mockCandidates.filter((c) => c.status === "on-bench" && c.mocksTaken === 0);
        const stuck = mockCandidates.filter((c) => c.trend === "stable" && c.readinessScore < 60 && c.mocksTaken >= 2);
        const alerts = [
          ...stalled.map((c) => ({ type: "stalled" as const, name: c.name, msg: `No activity — ${c.enrichmentComplete}% enrichment, 0 mocks. Needs manager check-in.` })),
          ...stuck.map((c) => ({ type: "stuck" as const, name: c.name, msg: `Score plateaued at ${c.readinessScore} after ${c.mocksTaken} mocks. Consider 1:1 coaching.` })),
          ...mockCandidates.filter((c) => c.readinessScore >= 80).map((c) => ({ type: "ready" as const, name: c.name, msg: `Readiness ${c.readinessScore}/100 — ready for interview submission. Approve?` })),
        ];
        return alerts.length > 0 ? (
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold text-ey-dark text-sm mb-3">Risk Alerts & Actions</h2>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <div key={i} className={`flex items-start gap-3 p-2.5 rounded text-sm ${
                  a.type === "stalled" ? "bg-red-50 border border-red-200" :
                  a.type === "stuck" ? "bg-yellow-50 border border-yellow-200" :
                  "bg-green-50 border border-green-200"
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full shrink-0 mt-1 ${a.type === "stalled" ? "bg-red-500" : a.type === "stuck" ? "bg-yellow-500" : "bg-green-500"}`} />
                  <div>
                    <span className="font-medium text-ey-dark">{a.name}</span>
                    <span className="text-ey-gray ml-2">{a.msg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      })()}

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b text-xs text-ey-gray uppercase tracking-wider">
              <th className="text-left px-4 py-3">Candidate</th>
              <th className="text-left px-4 py-3">Department</th>
              <th className="text-left px-4 py-3">Skills</th>
              <th className="text-center px-4 py-3">Readiness</th>
              <th className="text-center px-4 py-3">Mocks</th>
              <th className="text-center px-4 py-3">Trend</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Bench Since</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push(`/manager/candidate/${c.id}`)}>
                <td className="px-4 py-3">
                  <div className="font-medium text-sm text-ey-dark">{c.name}</div>
                  <div className="text-xs text-ey-gray">{c.yearsExp}y exp · {c.businessUnit}</div>
                </td>
                <td className="px-4 py-3 text-sm text-ey-gray">{c.department}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {c.skills.slice(0, 3).map((s) => (
                      <Badge key={s.name} variant="secondary" className="text-xs">{s.name}</Badge>
                    ))}
                    {c.skills.length > 3 && <Badge variant="secondary" className="text-xs">+{c.skills.length - 3}</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-sm font-bold ${
                    c.readinessScore >= 75 ? "text-green-600" : c.readinessScore >= 50 ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {c.readinessScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm text-ey-gray">{c.mocksTaken}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${trendColors[c.trend]}`}>{trendIcons[c.trend]}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge className={`text-xs ${statusColors[c.status]}`}>
                    {c.status.replace("-", " ")}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-ey-gray">{c.benchSince}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
