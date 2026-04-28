"use client";

import { ReadinessDimensions } from "@/lib/types";

interface RadarChartProps {
  dimensions: ReadinessDimensions;
  size?: number;
  showLabels?: boolean;
}

const LABELS: { key: keyof ReadinessDimensions; label: string }[] = [
  { key: "technicalDepth", label: "Technical" },
  { key: "communicationClarity", label: "Communication" },
  { key: "starQuality", label: "STAR Quality" },
  { key: "jdAlignment", label: "JD Fit" },
  { key: "confidence", label: "Confidence" },
  { key: "problemSolving", label: "Problem Solving" },
];

export function RadarChart({ dimensions, size = 280, showLabels = true }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 44;
  const levels = [25, 50, 75, 100];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
    const dist = (value / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const dataPoints = LABELS.map((l, i) => getPoint(i, dimensions[l.key]));
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {levels.map((level) => {
          const pts = LABELS.map((_, i) => getPoint(i, level));
          return (
            <polygon
              key={level}
              points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              strokeDasharray={level === 75 ? "3,3" : "none"}
            />
          );
        })}
        {/* Axes */}
        {LABELS.map((_, i) => {
          const p = getPoint(i, 100);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#f0f0f0" strokeWidth="0.75" />;
        })}
        {/* Data fill */}
        <polygon points={polygon} fill="rgba(255, 230, 0, 0.12)" stroke="#FFE600" strokeWidth="2" />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#1a1a2e" />
            <circle cx={p.x} cy={p.y} r="2" fill="#FFE600" />
          </g>
        ))}
        {/* Labels */}
        {showLabels && LABELS.map((l, i) => {
          const p = getPoint(i, 120);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] font-medium"
              fill="#6b7280"
            >
              {l.label}
            </text>
          );
        })}
      </svg>
      {showLabels && (
        <div className="grid grid-cols-3 gap-x-6 gap-y-1.5 mt-2">
          {LABELS.map((l) => {
            const val = dimensions[l.key];
            return (
              <div key={l.key} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: val >= 70 ? "#22c55e" : val >= 50 ? "#eab308" : "#ef4444" }}
                />
                <span className="text-gray-400">{l.label}</span>
                <span className="font-semibold text-[#1a1a2e] ml-auto">{val}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
