"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatMessage } from "@/lib/types";

type Step = "upload" | "chat" | "resume-output";

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("upload");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [strengthenedResume, setStrengthenedResume] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const startEnrichment = () => {
    if (!resumeText.trim()) return;
    localStorage.setItem("resumeText", resumeText);
    setStep("chat");

    // Parse visible gaps from the resume to ask targeted questions
    const hasNumbers = /\d+%|\d+ (users|clients|servers|requests|transactions|million|crore)/i.test(resumeText);
    const hasTechDepth = /kubernetes|kafka|lambda|terraform|mlflow|kubeflow/i.test(resumeText);

    const openingLine = !hasNumbers
      ? "I notice your resume has several achievements without specific numbers — we'll fix that."
      : !hasTechDepth
      ? "Your technical experience looks solid. Let's make sure the depth of your work is fully captured."
      : "Good start. Let's go deeper to make sure every important detail is surfaced.";

    setMessages([{
      role: "assistant",
      content: `I've reviewed your resume. ${openingLine}\n\nI'll ask you a series of targeted questions — your answers will be used to strengthen your profile and generate an improved resume at the end.\n\nLet's start with your most recent or most impactful role:\n\n**What was the business problem your team was solving, and what was the measurable outcome you personally contributed to?**\n\nBe as specific as possible — scale, numbers, and timelines matter here.`,
    }]);
  };

  const handleSend = async (input: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setIsLoading(true);

    const userTurns = newMessages.filter((m) => m.role === "user").length;

    // After 6 user turns, generate the strengthened resume
    if (userTurns >= 6) {
      try {
        const res = await fetch("/api/ai/enrich", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages,
            resumeText,
            generateResume: true,
          }),
        });
        const data = await res.json();
        const aiReply = data.message;

        if (aiReply.includes("STRENGTHENED RESUME") || userTurns >= 7) {
          setMessages([...newMessages, { role: "assistant", content: aiReply }]);
          setStrengthenedResume(aiReply);
          setIsLoading(false);
          return;
        }
        setMessages([...newMessages, { role: "assistant", content: aiReply }]);
      } catch {
        const resume = buildFallbackResume(resumeText, newMessages);
        setStrengthenedResume(resume);
        setMessages([...newMessages, {
          role: "assistant",
          content: `Excellent — I now have enough context to strengthen your profile.\n\nClick **"View Strengthened Resume"** below to see your updated resume with quantified achievements, expanded skill context, and improved impact language.`,
        }]);
      }
      setIsLoading(false);
      return;
    }

    const questions = [
      `Good. Now let's talk about the technical decisions you made.\n\n**What was the most complex technical problem you solved in this role?** Walk me through your approach — what options did you consider, what did you choose, and why?`,
      `That's useful context. Let's quantify your skills more precisely.\n\n**For your top 3 technical skills, can you describe a specific production use case for each?** Include the scale — team size, data volume, user count, or transaction volume where relevant.`,
      `Helpful. Let's surface any leadership or cross-functional work.\n\n**Did you mentor junior team members, lead sprints, or work directly with business stakeholders?** If yes, describe the scope and what you owned vs what the team owned.`,
      `Good. Now let's look for any missing certifications, side projects, or contributions.\n\n**Are there any relevant projects, open-source contributions, certifications, or upskilling activities from the past 2 years that aren't in your resume?**`,
      `Almost there. One last area — articulating impact.\n\n**Looking back at your last role, what's the single achievement you're most proud of that isn't well-represented in your current resume?** This is often the most important piece we're missing.`,
    ];

    try {
      const res = await fetch("/api/ai/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, resumeText }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      const fallback = questions[Math.min(userTurns - 1, questions.length - 1)];
      setMessages([...newMessages, { role: "assistant", content: fallback }]);
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(strengthenedResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([strengthenedResume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Strengthened_Resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── UPLOAD STEP ──
  if (step === "upload") {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Resume Upload & Profile Enrichment</h1>
          <p className="text-gray-500 leading-relaxed">
            Upload or paste your resume. The AI will ask you targeted questions to extract quantified
            achievements and hidden skills — then generate a stronger version you can use going forward.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          {/* File upload zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#FFE600] hover:bg-yellow-50/30 transition-all group"
          >
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 group-hover:bg-[#FFE600]/20 flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#1a1a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            {fileName ? (
              <div>
                <div className="text-sm font-semibold text-[#1a1a2e]">{fileName}</div>
                <div className="text-xs text-gray-400 mt-1">Click to change file</div>
              </div>
            ) : (
              <div>
                <div className="text-sm font-semibold text-[#1a1a2e]">Upload your resume</div>
                <div className="text-xs text-gray-400 mt-1">.txt, .pdf, .doc, .docx — or paste below</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Paste zone */}
          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-2">Paste resume text</label>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="min-h-[200px] text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-gray-400">Processed securely — used only for interview preparation.</p>
            <Button
              onClick={startEnrichment}
              disabled={!resumeText.trim()}
              className="bg-[#FFE600] text-[#1a1a2e] hover:bg-yellow-300 font-bold px-8"
            >
              Start Enrichment →
            </Button>
          </div>
        </div>

        <div className="mt-5 bg-gray-50 border border-gray-100 rounded-xl p-5">
          <div className="text-sm font-semibold text-[#1a1a2e] mb-3">What happens next</div>
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
            <div className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">1</span><span>AI asks 6 targeted questions to extract quantified achievements, technical depth, and hidden skills</span></div>
            <div className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">2</span><span>Your answers are used to build a rich internal profile used throughout the coaching journey</span></div>
            <div className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">3</span><span>A strengthened resume is generated — with proper quantification, impact language, and complete skills</span></div>
          </div>
        </div>
      </div>
    );
  }

  // ── CHAT STEP ──
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1">Profile Enrichment</h1>
          <p className="text-sm text-gray-500">Answer each question specifically — numbers, scale, and outcomes matter.</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-center">
          <div className="text-lg font-bold text-[#1a1a2e]">
            {Math.min(messages.filter((m) => m.role === "user").length, 6)}/6
          </div>
          <div className="text-[10px] text-gray-400">questions</div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-[#FFE600] transition-all"
          style={{ width: `${Math.min((messages.filter((m) => m.role === "user").length / 6) * 100, 100)}%` }}
        />
      </div>

      <ChatInterface
        messages={messages}
        onSend={handleSend}
        isLoading={isLoading}
        title="Profile Enrichment — Building your strengthened resume"
        placeholder="Be specific — numbers, scale, and impact..."
      />

      {strengthenedResume && (
        <div className="bg-[#1a1a2e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold text-white">Strengthened Resume Ready</div>
              <div className="text-xs text-white/40">Based on your enrichment answers</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors"
              >
                Download .txt
              </button>
              <button
                onClick={handleCopy}
                className="bg-[#FFE600] text-[#1a1a2e] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-300 transition-colors"
              >
                {copied ? "Copied!" : "Copy Resume"}
              </button>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-48 overflow-y-auto">
            <pre className="text-xs text-white/70 whitespace-pre-wrap font-mono leading-relaxed">{strengthenedResume}</pre>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        {strengthenedResume && (
          <Button
            onClick={() => window.location.href = "/candidate/profile"}
            className="bg-[#1a1a2e] text-[#FFE600] hover:bg-gray-800 font-bold"
          >
            Continue to Profile →
          </Button>
        )}
      </div>
    </div>
  );
}

function buildFallbackResume(original: string, messages: ChatMessage[]): string {
  const userAnswers = messages.filter((m) => m.role === "user").map((m) => m.content);
  return `STRENGTHENED RESUME
Generated from enrichment conversation
─────────────────────────────────────────

[Original resume content preserved below, enhanced with enrichment insights]

${original}

─────────────────────────────────────────
ENRICHMENT ADDITIONS (from conversation):

${userAnswers.map((a, i) => `• Enhancement ${i + 1}: ${a.slice(0, 200)}${a.length > 200 ? "..." : ""}`).join("\n\n")}

─────────────────────────────────────────
Note: Review and personalise before sharing with clients.`;
}
