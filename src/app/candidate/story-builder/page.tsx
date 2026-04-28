"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatMessage } from "@/lib/types";

export default function StoryBuilderPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `I'm your STAR Story Coach. I'll help you build compelling interview stories from your real experience, mapped to the JD requirements.

Let's start with the most critical requirement from your target JD. Based on your gap analysis, the top requirement is: **leading microservices architecture at scale**.

You mentioned a monolith-to-microservices migration project. Let's build a powerful STAR story around it.

**SITUATION:** Tell me — what was the business context? Why was the migration necessary? What was the state of the system before you started?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (input: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/story-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      const responseCount = messages.filter((m) => m.role === "user").length;
      const fallbacks = [
        `Good start on the situation. Now let's get specific.\n\n**TASK:** What was YOUR specific responsibility in this migration? Were you the architect? The lead developer? What decisions were on YOUR shoulders vs the team's?\n\nBe precise — interviewers want to know what YOU did, not what the team did.`,
        `That clarifies your ownership nicely.\n\n**ACTION:** Walk me through the key technical decisions you made. For example:\n- How did you decompose the monolith? Domain-driven design?\n- How did you handle data migration between services?\n- What about the deployment strategy — big bang or strangler pattern?\n\nGive me 2-3 specific actions that show your technical judgment.`,
        `Strong actions. Now the most important part:\n\n**RESULT:** What was the measurable outcome? Think about:\n- Performance metrics (latency, throughput)\n- Business impact (cost savings, revenue impact)\n- Team/process impact (deployment frequency, incident reduction)\n\nNumbers are what separate a good story from a great one.`,
        `Excellent. Here's your polished STAR story:\n\n---\n**Story: Monolith-to-Microservices Migration**\n*Mapped to: "Experience with microservices architecture at scale"*\n\n**S:** Our banking platform's monolithic architecture was creating deployment bottlenecks — 2-week release cycles and cascading failures from tightly coupled modules.\n\n**T:** I was tasked with leading the architectural redesign and migration to microservices, with the constraint of zero downtime during transition.\n\n**A:** I used domain-driven design to decompose into 12 bounded contexts, implemented the strangler pattern for gradual migration, introduced Redis caching for cross-service communication, and set up a CI/CD pipeline for independent deployments.\n\n**R:** API latency reduced by 40%, deployment frequency went from bi-weekly to daily, and the system handled 50K daily transactions with 99.9% uptime.\n\n---\n*Duration when spoken: ~1.5 minutes*\n\nDoes this accurately capture your experience? Any corrections? Then we'll move to the next JD requirement.`,
      ];
      const fallbackIndex = Math.min(responseCount, fallbacks.length - 1);
      setMessages([...newMessages, { role: "assistant", content: fallbacks[fallbackIndex] }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ey-dark mb-2">STAR Story Builder</h1>
        <p className="text-ey-gray text-sm">
          Build interview-ready stories from your real experience. Each story maps to a specific JD requirement.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["Microservices Leadership", "Performance Optimization", "Team Leadership", "Production Incident", "Client Communication"].map((story, i) => (
          <div
            key={story}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border ${
              i === 0 ? "bg-ey-yellow/10 border-ey-yellow text-ey-dark" : "bg-gray-50 border-gray-200 text-ey-gray"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-ey-yellow" : "bg-gray-300"}`} />
            {story}
          </div>
        ))}
      </div>

      <ChatInterface
        messages={messages}
        onSend={handleSend}
        isLoading={isLoading}
        title="STAR Story Coach — Building: Microservices Leadership"
        placeholder="Share the details of your experience..."
      />
    </div>
  );
}
