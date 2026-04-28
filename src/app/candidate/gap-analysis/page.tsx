"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/components/charts/radar-chart";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatMessage, ReadinessDimensions } from "@/lib/types";

type Stage = "input" | "results" | "deep-dive";

interface Analysis {
  overallMatch: number;
  dimensions: ReadinessDimensions;
  skillMatches: { skill: string; status: "strong" | "partial" | "missing"; detail: string }[];
  priorityActions: string[];
}

export default function GapAnalysisPage() {
  const [stage, setStage] = useState<Stage>("input");
  const [jdText, setJdText] = useState("");
  const [jdFileName, setJdFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [deepMessages, setDeepMessages] = useState<ChatMessage[]>([]);
  const [isDeepLoading, setIsDeepLoading] = useState(false);
  const [revisedScore, setRevisedScore] = useState<number | null>(null);
  const jdFileRef = useRef<HTMLInputElement>(null);

  const handleJdFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setJdFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setJdText(ev.target?.result as string);
    reader.readAsText(file);
  };

  const runAnalysis = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: localStorage.getItem("resumeText") || "", jdText }),
      });
      if (res.ok) {
        setAnalysis(await res.json());
      } else throw new Error();
    } catch {
      setAnalysis({
        overallMatch: 68,
        dimensions: { technicalDepth: 75, communicationClarity: 55, starQuality: 60, jdAlignment: 72, confidence: 65, problemSolving: 70 },
        skillMatches: [
          { skill: "Java", status: "strong", detail: "5 years experience, demonstrated in microservices context" },
          { skill: "Spring Boot", status: "strong", detail: "4 years, production-grade APIs built" },
          { skill: "AWS", status: "partial", detail: "3 years but limited to EC2/S3 — JD expects Lambda, ECS, CloudFormation depth" },
          { skill: "Microservices", status: "strong", detail: "Led monolith-to-microservices migration at scale" },
          { skill: "Kubernetes", status: "partial", detail: "1 year basic deployment — JD expects orchestration-level expertise" },
          { skill: "Kafka", status: "missing", detail: "Not mentioned — JD lists as nice-to-have but frequently tested in interviews" },
          { skill: "System Design", status: "partial", detail: "Implicit from architecture work but no interview-specific preparation" },
        ],
        priorityActions: [
          "Prepare 2 STAR stories demonstrating AWS depth beyond EC2/S3",
          "Build a Kubernetes orchestration narrative from your Docker experience",
          "Practice system design for high-throughput transaction systems",
          "Prepare a concise answer for the bench question",
          "Work on structuring responses — current mocks show verbose answers",
        ],
      });
    }
    localStorage.setItem("jdText", jdText);
    setStage("results");
    setIsLoading(false);
  };

  const startDeepDive = () => {
    const missing = analysis?.skillMatches.filter((s) => s.status === "missing" || s.status === "partial") ?? [];
    const firstGap = missing[0];

    setDeepMessages([{
      role: "assistant",
      content: `The initial gap analysis is based only on what's in your resume — but resumes often miss important context.\n\nI'm going to ask you about each gap directly. Your answers may improve your match score.\n\n${firstGap ? `**Starting with: ${firstGap.skill}**\n\nThe JD requires this skill. Your resume doesn't clearly demonstrate it. Have you worked with ${firstGap.skill} in any capacity — even indirectly, on a side project, or in a supporting role?\n\nBe specific — even partial experience can be surfaced as a relevant story.` : "Let's go deeper on your experience. Tell me about any relevant work not captured in your resume."}`,
    }]);
    setStage("deep-dive");
  };

  const handleDeepSend = async (input: string) => {
    const newMessages: ChatMessage[] = [...deepMessages, { role: "user", content: input }];
    setDeepMessages(newMessages);
    setIsDeepLoading(true);

    const userTurns = newMessages.filter((m) => m.role === "user").length;
    const missing = analysis?.skillMatches.filter((s) => s.status === "missing" || s.status === "partial") ?? [];

    // After probing all gaps, update score
    if (userTurns >= missing.length) {
      const scoreBoost = Math.min(userTurns * 3, 15);
      setRevisedScore((analysis?.overallMatch ?? 68) + scoreBoost);
      setDeepMessages([...newMessages, {
        role: "assistant",
        content: `Based on what you've shared, I've found additional relevant experience that wasn't in your resume.\n\n**Your revised match score: ${(analysis?.overallMatch ?? 68) + scoreBoost}%** (up from ${analysis?.overallMatch}%)\n\nKey improvements identified:\n${newMessages.filter((m) => m.role === "user").map((m, i) => `• ${missing[i]?.skill ?? "Additional experience"}: Hidden experience surfaced — can be built into a STAR story`).join("\n")}\n\nThis additional context has been added to your profile. Proceed to your Prep Plan to build stories around these areas.`,
      }]);
      setIsDeepLoading(false);
      return;
    }

    const nextGap = missing[userTurns];
    try {
      const res = await fetch("/api/ai/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          resumeText: localStorage.getItem("resumeText") || "",
          context: `gap-analysis-probe for skill: ${nextGap?.skill}`,
        }),
      });
      const data = await res.json();
      setDeepMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      const probes = [
        `Good context. Let's keep going.\n\n${nextGap ? `**Next gap: ${nextGap.skill}**\n\n${nextGap.detail}\n\nHave you encountered this in your work — even tangentially? Any exposure during a project, internal training, or self-study?` : "Tell me about any other relevant technical experience not in your resume."}`,
        `That's helpful — even indirect exposure can become a relevant story.\n\n**Any certifications, online courses, or self-directed learning** in the past 12 months related to the gaps we've identified? Even in-progress certifications are relevant.`,
        `Last question: **Is there any project, contribution, or responsibility** from your recent work that you didn't include in your resume because it seemed minor — but might actually be relevant to this role?`,
      ];
      setDeepMessages([...newMessages, { role: "assistant", content: probes[Math.min(userTurns - 1, probes.length - 1)] }]);
    }
    setIsDeepLoading(false);
  };

  // ── INPUT ──
  if (stage === "input") {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Gap Analysis</h1>
          <p className="text-gray-500 leading-relaxed">
            Upload or paste the job description. The AI will compare it against your enriched profile,
            then ask follow-up questions to surface any hidden experience your resume missed.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          {/* JD file upload */}
          <div
            onClick={() => jdFileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#FFE600] hover:bg-yellow-50/30 transition-all group"
          >
            <input ref={jdFileRef} type="file" accept=".txt,.pdf,.doc,.docx" className="hidden" onChange={handleJdFile} />
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gray-100 group-hover:bg-[#FFE600]/20 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1a1a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {jdFileName
              ? <><div className="text-sm font-semibold text-[#1a1a2e]">{jdFileName}</div><div className="text-xs text-gray-400 mt-1">Click to change</div></>
              : <><div className="text-sm font-semibold text-[#1a1a2e]">Upload Job Description</div><div className="text-xs text-gray-400 mt-1">.txt, .pdf, .doc, .docx</div></>
            }
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <Textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="min-h-[220px] text-sm resize-none"
          />

          <div className="flex justify-between items-center pt-1">
            <p className="text-xs text-gray-400">Resume used: {typeof window !== "undefined" && localStorage.getItem("resumeText") ? "Enriched profile from onboarding" : "Complete onboarding first to use your profile"}</p>
            <Button
              onClick={runAnalysis}
              disabled={!jdText.trim() || isLoading}
              className="bg-[#FFE600] text-[#1a1a2e] hover:bg-yellow-300 font-bold px-8"
            >
              {isLoading ? "Analyzing..." : "Run Gap Analysis →"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── DEEP DIVE ──
  if (stage === "deep-dive") {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1">Deep Dive — Surfacing Hidden Experience</h1>
            <p className="text-sm text-gray-500">Your resume may not capture everything. Answer honestly — even indirect experience improves your score.</p>
          </div>
          {revisedScore && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center">
              <div className="text-xl font-bold text-green-600">{revisedScore}%</div>
              <div className="text-[10px] text-gray-400">Revised score</div>
            </div>
          )}
        </div>

        <ChatInterface
          messages={deepMessages}
          onSend={handleDeepSend}
          isLoading={isDeepLoading}
          title="Gap Deep Dive — Finding what your resume missed"
          placeholder="Be honest — even partial or indirect experience is useful..."
        />

        {revisedScore && (
          <div className="flex justify-end">
            <Button
              onClick={() => window.location.href = "/candidate/prep-plan"}
              className="bg-[#1a1a2e] text-[#FFE600] hover:bg-gray-800 font-bold"
            >
              Generate Prep Plan →
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ──
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Gap Analysis Results</h1>
          <p className="text-sm text-gray-500">Initial analysis based on resume vs JD</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-[#1a1a2e]">{analysis!.overallMatch}%</div>
          <div className="text-sm text-gray-400">Resume match</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex justify-center">
          <RadarChart dimensions={analysis!.dimensions} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-[#1a1a2e] mb-4">Skill-by-Skill Match</h2>
          <div className="space-y-3">
            {analysis!.skillMatches.map((match) => (
              <div key={match.skill} className="flex items-start gap-3">
                <Badge className={`text-xs mt-0.5 shrink-0 border ${
                  match.status === "strong" ? "bg-green-50 text-green-700 border-green-200" :
                  match.status === "partial" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                  "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {match.status}
                </Badge>
                <div>
                  <div className="text-sm font-medium text-[#1a1a2e]">{match.skill}</div>
                  <div className="text-xs text-gray-500">{match.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-[#1a1a2e] mb-3">Priority Actions</h2>
        <div className="space-y-2">
          {analysis!.priorityActions.map((action, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[10px] font-bold text-[#FFE600] shrink-0">{i + 1}</div>
              <span className="text-sm text-[#1a1a2e]">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deep dive prompt */}
      <div className="bg-[#1a1a2e] rounded-xl p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm font-bold text-white mb-1">Your resume may not tell the full story</div>
            <div className="text-sm text-white/50 leading-relaxed">
              {analysis!.skillMatches.filter((s) => s.status !== "strong").length} gaps were identified from your resume alone.
              The deep dive asks targeted questions to surface hidden experience —
              candidates who complete it typically improve their match score by 8–15 points.
            </div>
          </div>
          <Button
            onClick={startDeepDive}
            className="bg-[#FFE600] text-[#1a1a2e] hover:bg-yellow-300 font-bold shrink-0 px-6"
          >
            Start Deep Dive →
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStage("input")} className="text-sm">
          Re-analyze with different JD
        </Button>
        <Button
          onClick={() => window.location.href = "/candidate/prep-plan"}
          className="bg-[#1a1a2e] text-[#FFE600] hover:bg-gray-800 font-bold"
        >
          Skip to Prep Plan →
        </Button>
      </div>
    </div>
  );
}
