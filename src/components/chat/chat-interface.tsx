"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/lib/types";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  title?: string;
}

export function ChatInterface({ messages, onSend, isLoading, placeholder = "Type your response...", title }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-[620px] bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
      {title && (
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h3 className="font-medium text-[#1a1a2e] text-sm">{title}</h3>
        </div>
      )}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
              msg.role === "user"
                ? "bg-[#1a1a2e] text-white"
                : "bg-gradient-to-br from-[#FFE600] to-[#e6cf00] text-[#1a1a2e]"
            }`}>
              {msg.role === "user" ? "You" : "AI"}
            </div>
            <div
              className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#1a1a2e] text-white rounded-2xl rounded-tr-md"
                  : "bg-gray-50 text-gray-800 rounded-2xl rounded-tl-md border border-gray-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFE600] to-[#e6cf00] flex items-center justify-center text-[10px] font-bold text-[#1a1a2e] shrink-0">
              AI
            </div>
            <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-md">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex gap-2.5 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="resize-none min-h-[44px] max-h-[120px] rounded-xl text-sm border-gray-200 focus:border-[#1a1a2e] focus:ring-[#1a1a2e]/10 bg-white"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-[44px] px-5 rounded-xl bg-[#1a1a2e] text-white text-sm font-medium hover:bg-[#2a2a3e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
