"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatMessage } from "@/lib/types";

export default function MockInterviewPage() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<"practice" | "simulation" | "stress">("practice");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const startInterview = () => {
    setStarted(true);
    setMessages([
      {
        role: "assistant",
        content: `Good morning. Thank you for joining us today. I'm the hiring manager for the Senior Java Microservices Developer role at Global Bank Corp.

I've had a chance to review your profile. Before we dive into the technical discussion, I'd like to start with something simple.

Can you walk me through your career journey and what brings you to this opportunity today?`,
      },
    ]);
  };

  const handleSend = async (input: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          mode,
          jdText: localStorage.getItem("jdText") || "Senior Java Microservices Developer role requiring Spring Boot, AWS, Kubernetes expertise in BFSI domain",
        }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      const questionNum = messages.filter((m) => m.role === "assistant").length;
      const followUps = [
        `Thank you for that overview. Let me dig into your technical experience.\n\nYou mentioned working on a microservices migration. Can you walk me through the architecture? Specifically:\n- How did you decide on service boundaries?\n- What communication patterns did you use between services?\n- How did you handle data consistency across services?`,
        `Interesting approach. Let me push on this a bit — what would you do differently if you had to design this system from scratch today, knowing what you know now?\n\nAlso, how did you handle failure scenarios? What happens when one of your microservices goes down?`,
        `Good. Let's shift to a behavioral question.\n\nTell me about a time when you had a significant disagreement with a team member or stakeholder about a technical approach. How did you handle it, and what was the outcome?`,
        `I'd like to understand your AWS experience better. We rely heavily on AWS here.\n\nIf I asked you to design a system that processes 50,000 banking transactions per second with sub-100ms latency, which AWS services would you choose and why? Walk me through your architecture.`,
        `Fair enough. One more question — and I'll be direct.\n\nI can see from your profile that you've been on the bench for about 6 weeks. Can you help me understand why, and what gives you confidence you're the right fit for this role?`,
        `Thank you. Let me ask one final question.\n\nWhat questions do you have for me about the role, the team, or the technical challenges we're working on?`,
        `Thank you for your time today. I appreciate the depth of your responses. We'll be in touch through your staffing team about next steps.\n\nThis concludes the mock interview. You can now view your scorecard for detailed feedback on your performance.`,
      ];
      const idx = Math.min(questionNum, followUps.length - 1);
      setMessages([...newMessages, { role: "assistant", content: followUps[idx] }]);
    }
    setIsLoading(false);
  };

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ey-dark mb-2">Mock Interview</h1>
          <p className="text-ey-gray">
            Practice with an AI interviewer that adapts to your responses.
            Questions are tailored to your target JD.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { id: "practice" as const, title: "Practice", desc: "Guided pace with hints and coaching mid-interview. Recommended for first attempts.", level: "Level 1" },
            { id: "simulation" as const, title: "Simulation", desc: "Realistic client interview — no assistance, natural pacing and follow-ups.", level: "Level 2" },
            { id: "stress" as const, title: "Stress Test", desc: "Rapid follow-ups, challenging questions, and pressure testing under time constraints.", level: "Level 3" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-5 rounded-lg border-2 text-left transition-all ${
                mode === m.id ? "border-ey-yellow bg-yellow-50" : "border-gray-100 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-[10px] font-bold tracking-widest text-ey-gray uppercase mb-2">{m.level}</div>
              <div className="font-semibold text-ey-dark text-sm">{m.title}</div>
              <div className="text-xs text-ey-gray mt-1 leading-relaxed">{m.desc}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border p-5 mb-6">
          <h3 className="font-semibold text-ey-dark text-sm mb-2">Interview Context</h3>
          <div className="text-sm text-ey-gray space-y-1">
            <p><strong>Role:</strong> Senior Java Microservices Developer</p>
            <p><strong>Client:</strong> Global Bank Corp</p>
            <p><strong>Key skills tested:</strong> Java, Spring Boot, AWS, Microservices, System Design</p>
            <p><strong>Expected duration:</strong> 8-10 questions (~30-40 minutes)</p>
          </div>
        </div>

        <Button
          onClick={startInterview}
          className="bg-ey-dark text-ey-yellow hover:bg-gray-800 font-semibold px-8 w-full py-6 text-base"
        >
          Start Mock Interview →
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Mock Interview</h1>
          <p className="text-ey-gray text-sm">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} mode · Global Bank Corp · Senior Java Developer
          </p>
        </div>
        <Button
          onClick={() => window.location.href = "/candidate/scorecard"}
          variant="outline"
          className="border-ey-dark text-ey-dark"
        >
          End & View Scorecard →
        </Button>
      </div>

      <ChatInterface
        messages={messages}
        onSend={handleSend}
        isLoading={isLoading}
        title="Mock Interview — Client Interviewer"
        placeholder="Respond to the interviewer..."
      />
    </div>
  );
}
