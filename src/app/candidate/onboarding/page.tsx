"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatMessage } from "@/lib/types";

export default function OnboardingPage() {
  const [step, setStep] = useState<"upload" | "chat">("upload");
  const [resumeText, setResumeText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const startEnrichment = async () => {
    if (!resumeText.trim()) return;
    setStep("chat");
    localStorage.setItem("resumeText", resumeText);

    const initialMessage: ChatMessage = {
      role: "assistant",
      content: `I've reviewed your resume. Let me help strengthen your profile by extracting deeper details about your experience.\n\nI can see your background — let's make sure every achievement is quantified and every skill is properly captured.\n\nLet's start: What was the most impactful project you've worked on in your career? Tell me about the business problem, your specific role, and the outcome.`,
    };
    setMessages([initialMessage]);
  };

  const handleSend = async (input: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, resumeText }),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "That's great context. Let me ask a follow-up — can you quantify the impact? For example, how many users were affected, what percentage improvement did you achieve, or what was the business value in numbers?\n\nSpecific numbers make your profile stand out in JD matching and help build stronger STAR stories for interviews.",
        },
      ]);
    }
    setIsLoading(false);
  };

  if (step === "upload") {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ey-dark mb-2">Profile Onboarding</h1>
          <p className="text-ey-gray">
            Start by sharing your resume. Our AI will then have a conversation with you to enrich
            your profile — extracting quantified achievements, hidden skills, and detailed project
            stories that your resume might not capture.
          </p>
        </div>

        <div className="bg-white rounded-lg border p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ey-dark mb-2">
              Paste your resume text
            </label>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here... Include your work experience, projects, skills, education, and any achievements."
              className="min-h-[300px] text-sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-ey-gray">
              Your data is processed securely and used only for interview preparation.
            </p>
            <Button
              onClick={startEnrichment}
              disabled={!resumeText.trim()}
              className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold px-8"
            >
              Start AI Enrichment →
            </Button>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-ey-dark mb-2">Why profile enrichment is required</h3>
          <ul className="text-xs text-ey-gray space-y-1.5 leading-relaxed">
            <li>Resumes typically omit quantified achievements — the AI extracts them through structured conversation.</li>
            <li>Depth of expertise and adjacent skills are often absent from standard resume formats.</li>
            <li>A comprehensive profile produces more accurate gap analysis, stronger STAR stories, and higher interview conversion.</li>
            <li>All downstream coaching depends on the quality of your profile data.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ey-dark mb-2">Profile Enrichment</h1>
        <p className="text-ey-gray text-sm">
          Answer the AI&apos;s questions to strengthen your profile. Be specific — numbers, scale, and impact matter.
        </p>
      </div>
      <ChatInterface
        messages={messages}
        onSend={handleSend}
        isLoading={isLoading}
        title="AI Profile Enrichment Specialist"
        placeholder="Share details about your experience..."
      />
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => window.location.href = "/candidate/profile"}
          variant="outline"
          className="border-ey-dark text-ey-dark hover:bg-ey-dark hover:text-white"
        >
          Continue to Profile →
        </Button>
      </div>
    </div>
  );
}
