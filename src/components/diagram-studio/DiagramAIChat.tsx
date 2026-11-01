"use client";

import React, { useState } from "react";
import { DiagramDocument, AIChatMessage } from "@/types/diagram";
import { handleAIModification } from "@/lib/diagram/ai-engine";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ShieldAlert,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

interface DiagramAIChatProps {
  diagram: DiagramDocument;
  isOpen: boolean;
  onClose: () => void;
  onUpdateDiagram: (updated: DiagramDocument) => void;
}

export default function DiagramAIChat({
  diagram,
  isOpen,
  onClose,
  onUpdateDiagram,
}: DiagramAIChatProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: `👋 Hello! I am your **AI Architecture Copilot**. I can inspect, optimize, audit, and modify your system diagram directly. 

Ask me anything or click one of the quick actions below to update this architecture live!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Add a Redis cache",
    "Connect the API Gateway to authentication",
    "Change the database to MongoDB",
    "Make the architecture more scalable",
    "Explain this diagram",
    "Find potential architectural problems",
  ];

  const handleSend = (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || isLoading) return;

    setInput("");
    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const { updatedDiagram, replyMessage, changesApplied, issuesDetected } = handleAIModification(
        diagram,
        prompt
      );

      const assistantMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: replyMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        changesApplied,
        architecturalIssues: issuesDetected,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);

      if (changesApplied && changesApplied.length > 0) {
        onUpdateDiagram(updatedDiagram);
      }
    }, 600);
  };

  return (
    <div className="absolute top-20 right-4 bottom-8 w-96 md:w-[420px] z-30 flex flex-col rounded-2xl bg-[#141210]/95 border border-[#292524] shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#292524] bg-[#161412]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#fafaf9] flex items-center gap-1.5">
              <span>AI Diagram Copilot</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300">
                Active
              </span>
            </div>
            <div className="text-[11px] text-[#a6a09b]">
              Conversational Architecture Refinement
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#a6a09b] hover:text-white hover:bg-[#1f1c19] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Chips */}
      <div className="p-3 border-b border-[#292524] bg-[#0c0a09]/50 overflow-x-auto no-scrollbar">
        <div className="text-[10px] font-mono text-[#78716c] uppercase mb-1.5 tracking-wider">
          Suggested Actions
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="text-[11px] px-2 py-1 rounded-lg bg-[#181614] hover:bg-violet-950/40 border border-[#292524] hover:border-violet-500/40 text-[#d4d4d8] hover:text-violet-300 transition-all text-left"
            >
              + {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-violet-500/20 text-violet-400 border border-violet-500/30"
              }`}
            >
              {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-[#181614] border border-[#292524] text-[#fafaf9]"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Changes applied checklist */}
              {msg.changesApplied && msg.changesApplied.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#292524] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Applied to Canvas</span>
                  </div>
                  {msg.changesApplied.map((ch, idx) => (
                    <div key={idx} className="text-[11px] text-[#a6a09b] flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architectural issues detected */}
              {msg.architecturalIssues && msg.architecturalIssues.length > 0 && (
                <div className="mt-3 space-y-2">
                  {msg.architecturalIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-2.5 rounded-lg bg-black/40 border border-amber-500/30 text-amber-200"
                    >
                      <div className="font-semibold text-xs flex items-center gap-1.5 text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>{issue.title}</span>
                      </div>
                      <div className="text-[11px] text-[#a6a09b] mt-1 leading-normal">
                        {issue.description}
                      </div>
                      <div className="mt-1.5 text-[10px] font-mono text-emerald-400">
                        Fix: {issue.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-[9px] text-[#78716c] text-right mt-1.5 font-mono">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-[#181614] rounded-xl border border-[#292524] text-[#a6a09b] text-xs">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" />
            <span>AI Copilot is modifying diagram topology...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#292524] bg-[#161412]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., Add Redis cache or load balancer..."
            className="flex-1 bg-[#0c0a09] border border-[#292524] focus:border-violet-500/50 rounded-xl px-3 py-2 text-xs text-[#fafaf9] placeholder-[#78716c] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white transition-all shadow-md shadow-violet-600/30"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

