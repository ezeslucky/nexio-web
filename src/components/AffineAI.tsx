"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Send,
  Bot,
  User,
  Wand2,
  Check,
  Copy,
  Layers,
  FileCode,
} from "lucide-react";

export default function AffineAI() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const prompts = [
    {
      title: "Mind Map from Notes",
      prompt: "Synthesize these 5 pages of project notes into a structured Edgeless mind map.",
      response:
        "💡 Generated 4 core branches: (1) Local-first storage engine, (2) BlockSuite CRDT protocol, (3) AI Copilot hooks, (4) Self-host container specs. Placed directly onto current canvas frame.",
      type: "Canvas Node Layout",
    },
    {
      title: "Write PRD from Ideas",
      prompt: "Turn my brainstormed bullet points into an executive Product Requirement Document.",
      response:
        "📄 Created PRD: 'Autonomous Offline Sync Engine'. Includes User Stories, Technical Constraints (Zero-Latency, End-to-End Encryption), and Release Milestones.",
      type: "Document Block",
    },
    {
      title: "Translate & Polish Code",
      prompt: "Optimize this SQLite schema migration script for mobile local database.",
      response:
        "⚡ Generated optimized TypeScript schema with indexed foreign keys and automatic retro-compatibility hooks for IndexedDB fallback.",
      type: "Code Block",
    },
  ];

  return (
    <section id="ai" className="py-20 md:py-32 bg-[#f8f8f7] relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10 blur-3xl pointer-events-none" />

      <div className="limit-container flex flex-col items-center text-center">
        {/* Star Icon + Section Title */}
        <div className="relative inline-block mb-4">
          <Sparkles className="w-6 h-6 text-[#1e96eb] mx-auto mb-2 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-black max-w-2xl leading-tight">
            <span className="text-[#1e96eb] font-semibold">AI partner</span> helps you better write, draw and plan
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#424149] max-w-xl leading-relaxed mb-8">
          Let you think bigger, create faster, work smarter anytime, anywhere with local & cloud AI models.
        </p>

        {/* CTA Button */}
        <div className="mb-14">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1e96eb] text-white text-sm font-semibold hover:bg-[#1882cd] transition-all shadow-md hover:shadow-lg"
          >
            <span>Learn more about AFFiNE AI</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Interactive AI Showcase Widget */}
        <div className="w-full max-w-3xl bg-white rounded-2xl border border-black/[0.08] shadow-card p-6 sm:p-8 text-left">
          {/* Prompt Selector Pills */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-black/[0.06] pb-4">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPrompt(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedPrompt === idx
                    ? "bg-[#1e96eb] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Chat Simulation Box */}
          <div className="space-y-4">
            {/* User Message */}
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                You
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                {prompts[selectedPrompt].prompt}
              </p>
            </div>

            {/* AI Response */}
            <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100/80">
              <div className="w-7 h-7 rounded-full bg-[#1e96eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#1e96eb] flex items-center gap-1.5">
                    AFFiNE AI Copilot
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-blue-100 text-[#1e96eb]">
                      {prompts[selectedPrompt].type}
                    </span>
                  </span>
                  <button
                    onClick={() => {
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="text-gray-400 hover:text-gray-700 text-xs flex items-center gap-1"
                  >
                    {isCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{isCopied ? "Inserted" : "Insert to doc"}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                  {prompts[selectedPrompt].response}
                </p>
              </div>
            </div>

            {/* Bottom Input Simulation */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-400">
                <Bot size={15} className="text-gray-400" />
                <span>Ask AFFiNE AI to summarize, translate, or draw...</span>
              </div>
              <button className="p-2.5 rounded-xl bg-[#1e96eb] text-white hover:bg-[#1882cd] transition-colors">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
