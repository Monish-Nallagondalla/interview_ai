"use client";

import { useState, useEffect } from "react";
import { conversionData, skillGapHeatmap } from "@/lib/mock-data";

function BenchCostTicker() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  const costPerSecond = (240_00_00_000) / (30 * 24 * 3600);
  const burnedToday = Math.floor(costPerSecond * ((new Date().getHours() * 3600) + (new Date().getMinutes() * 60) + new Date().getSeconds() + elapsed));
  const savedThisQuarter = 90_00_00_000;
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-xs text-red-600 font-medium mb-1">Bench Cost Burning Today (12K employees × ₹2L/mo)</div>
        <div className="text-3xl font-bold text-red-700 font-mono">
          ₹{(burnedToday / 10000000).toFixed(2)} Cr
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-red-500">Live — direct cost only</span>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="text-xs text-green-600 font-medium mb-1">Saved by InterviewAI This Quarter</div>
        <div className="text-3xl font-bold text-green-700 font-mono">
          ₹{(savedThisQuarter / 10000000).toFixed(0)} Cr
        </div>
        <div className="text-xs text-green-500 mt-1">Conservative estimate · 9,000 additional conversions</div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const maxConversion = 60;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark">Conversion Analytics</h1>
        <p className="text-ey-gray text-sm">Interview conversion trends, bench cost impact, and skill gap insights</p>
      </div>

      <BenchCostTicker />

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Conversion Rate (with AI)", value: "53%", change: "+18pts", positive: true },
          { label: "Avg Bench Duration", value: "32 days", change: "-13 days", positive: true },
          { label: "Monthly Direct Savings", value: "₹68 Cr", change: "est.", positive: true },
          { label: "Candidates Active", value: "3,420", change: "+240 this week", positive: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border p-4">
            <div className="text-xs text-ey-gray mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-ey-dark">{stat.value}</div>
            <div className={`text-xs font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Conversion Rate Trend: With AI vs Without</h2>
          <div className="space-y-2">
            {conversionData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <div className="w-14 text-xs text-ey-gray shrink-0">{d.month}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-5 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gray-300 rounded-full"
                      style={{ width: `${(d.withoutAI / maxConversion) * 100}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 bg-ey-yellow rounded-full"
                      style={{ width: `${(d.withAI / maxConversion) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs shrink-0 w-16 text-right">
                    <span className="text-ey-gray">{d.withoutAI}%</span>
                    {d.withAI !== d.withoutAI && (
                      <span className="text-ey-dark font-semibold ml-1">{d.withAI}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-gray-300 rounded" /> Without AI</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-ey-yellow rounded" /> With AI coaching</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Org-Wide Skill Gap Heatmap</h2>
          <p className="text-xs text-ey-gray mb-3">Most common gaps blocking interview conversion across all bench candidates</p>
          <div className="space-y-2">
            {skillGapHeatmap.map((gap) => (
              <div key={gap.skill} className="flex items-center gap-3">
                <div className="w-48 text-sm text-ey-dark shrink-0">{gap.skill}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      gap.severity === "critical" ? "bg-red-400" :
                      gap.severity === "high" ? "bg-orange-400" :
                      gap.severity === "medium" ? "bg-yellow-400" : "bg-green-400"
                    }`}
                    style={{ width: `${(gap.gapCount / 3000) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-ey-gray w-16 text-right">{gap.gapCount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="font-semibold text-ey-dark mb-4">ROI Impact Summary</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-ey-gray mb-1">Direct Cost Savings (quarterly)</div>
            <div className="text-3xl font-bold text-ey-dark">₹90 Cr</div>
            <div className="text-xs text-ey-gray mt-1">9,000 additional conversions × ₹1L saved each</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-ey-gray mb-1">Revenue Recovered (quarterly)</div>
            <div className="text-3xl font-bold text-ey-dark">₹180 Cr</div>
            <div className="text-xs text-ey-gray mt-1">9,000 conversions × ₹2L billing recovered</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-ey-yellow">
            <div className="text-xs text-ey-gray mb-1">Total Quarterly Impact</div>
            <div className="text-3xl font-bold text-ey-dark">₹270 Cr</div>
            <div className="text-xs text-ey-gray mt-1">Conservative scenario · ₹8-12 Cr platform cost → 30-45x ROI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
