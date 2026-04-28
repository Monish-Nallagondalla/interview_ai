"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/components/charts/radar-chart";
import { ReadinessDimensions } from "@/lib/types";

export default function GapAnalysisPage() {
  const [jdText, setJdText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    overallMatch: number;
    dimensions: ReadinessDimensions;
    skillMatches: { skill: string; status: "strong" | "partial" | "missing"; detail: string }[];
    priorityActions: string[];
  } | null>(null);

  const runAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: localStorage.getItem("resumeText") || "", jdText }),
      });
      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      } else {
        throw new Error("API error");
      }
    } catch {
      setAnalysis({
        overallMatch: 68,
        dimensions: { technicalDepth: 75, communicationClarity: 55, starQuality: 60, jdAlignment: 72, confidence: 65, problemSolving: 70 },
        skillMatches: [
          { skill: "Java", status: "strong", detail: "5 years experience, demonstrated in microservices context" },
          { skill: "Spring Boot", status: "strong", detail: "4 years, production-grade APIs built" },
          { skill: "AWS", status: "partial", detail: "3 years but limited to EC2/S3 — JD expects broader services (Lambda, ECS, CloudFormation)" },
          { skill: "Microservices", status: "strong", detail: "Led monolith-to-microservices migration" },
          { skill: "Kubernetes", status: "partial", detail: "1 year, basic deployment — JD expects orchestration-level expertise" },
          { skill: "Kafka", status: "missing", detail: "Not mentioned in profile — JD lists it as nice-to-have but frequently tested" },
          { skill: "System Design", status: "partial", detail: "Implicit from architecture work but no explicit system design interview preparation" },
        ],
        priorityActions: [
          "Prepare 2 STAR stories demonstrating AWS depth beyond basic EC2/S3",
          "Build Kubernetes orchestration narrative from existing Docker experience",
          "Practice system design for high-throughput transaction systems (directly from JD)",
          "Prepare concise answer for 'why are you on bench' question",
          "Rehearse articulation — current mock scores show verbose, unstructured responses",
        ],
      });
    }
    localStorage.setItem("jdText", jdText);
    setAnalyzed(true);
    setIsLoading(false);
  };

  if (!analyzed) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ey-dark mb-2">Gap Analysis</h1>
          <p className="text-ey-gray">
            Paste the job description you&apos;re preparing for. The AI will compare it against your enriched profile
            and identify exactly where you&apos;re strong, where you have gaps, and what to prioritize.
          </p>
        </div>
        <div className="bg-white rounded-lg border p-6 space-y-4">
          <Textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="min-h-[250px] text-sm"
          />
          <div className="flex justify-end">
            <Button
              onClick={runAnalysis}
              disabled={!jdText.trim() || isLoading}
              className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold px-8"
            >
              {isLoading ? "Analyzing..." : "Run Gap Analysis →"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Gap Analysis Results</h1>
          <p className="text-ey-gray text-sm">Profile vs Job Description comparison</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-ey-dark">{analysis!.overallMatch}%</div>
          <div className="text-sm text-ey-gray">Overall Match</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-5 flex justify-center">
          <RadarChart dimensions={analysis!.dimensions} />
        </div>

        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Skill-by-Skill Match</h2>
          <div className="space-y-3">
            {analysis!.skillMatches.map((match) => (
              <div key={match.skill} className="flex items-start gap-3">
                <Badge
                  className={`text-xs mt-0.5 shrink-0 ${
                    match.status === "strong" ? "bg-green-100 text-green-800" :
                    match.status === "partial" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}
                >
                  {match.status}
                </Badge>
                <div>
                  <div className="text-sm font-medium text-ey-dark">{match.skill}</div>
                  <div className="text-xs text-ey-gray">{match.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="font-semibold text-ey-dark mb-3">Priority Actions (highest conversion impact first)</h2>
        <div className="space-y-2">
          {analysis!.priorityActions.map((action, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <div className="w-6 h-6 rounded-full bg-ey-yellow flex items-center justify-center text-xs font-bold text-ey-dark shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-ey-dark">{action}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setAnalyzed(false)}>Re-analyze with different JD</Button>
        <Button
          onClick={() => window.location.href = "/candidate/prep-plan"}
          className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold"
        >
          Generate Prep Plan →
        </Button>
      </div>
    </div>
  );
}
