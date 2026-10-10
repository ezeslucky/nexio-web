"use client";

import React, { useState } from "react";
import {
  X,
  Zap,
  Bot,
  Layers,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

interface Template {
  id: string;
  category: "all" | "knowledge" | "automation" | "ai";
  title: string;
  description: string;
  trigger: string;
  aiModel: string;
  result: string;
  popular?: boolean;
}

interface TemplatePreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

export default function TemplatePreviewModal({
  template,
  onClose,
}: TemplatePreviewModalProps) {
  const [cloned, setCloned] = useState(false);

  if (!template) return null;

  const handleClone = () => {
    setCloned(true);
    setTimeout(() => {
      setCloned(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#292524] bg-[#161412]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#fafaf9]">{template.title}</h3>
              <p className="text-[11px] font-mono text-[#a6a09b]">Template Schema v2.4 · Ready to Clone</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a]"
            aria-label="Close template preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-[#a6a09b] leading-relaxed">
            {template.description}
          </p>

          {/* Node Pipeline Steps */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#78716c] uppercase tracking-wider">
              Node Pipeline Architecture:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524]">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">1. Trigger</div>
                <div className="text-xs font-bold text-[#fafaf9] mt-0.5">{template.trigger}</div>
                <div className="text-[11px] text-[#78716c] font-mono mt-1">inbound_event.json</div>
              </div>

              <div className="p-3 rounded-xl bg-[#1a1726] border border-violet-500/30">
                <div className="text-[10px] font-mono text-violet-400 uppercase font-semibold">2. Processing</div>
                <div className="text-xs font-bold text-[#fafaf9] mt-0.5">{template.aiModel}</div>
                <div className="text-[11px] text-violet-300/80 font-mono mt-1">Prompt chaining + Vector</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524]">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">3. Destination</div>
                <div className="text-xs font-bold text-[#fafaf9] mt-0.5">{template.result}</div>
                <div className="text-[11px] text-[#78716c] font-mono mt-1">canvas.renderNode()</div>
              </div>
            </div>
          </div>

          {/* Configuration Parameters */}
          <div className="p-3.5 rounded-xl bg-[#0c0a09] border border-[#292524] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-[#a6a09b]">
              <span>Execution Environment:</span>
              <span className="text-emerald-400">Local SQLite / Worker (0 cloud roundtrips)</span>
            </div>
            <div className="flex items-center justify-between text-[#a6a09b]">
              <span>Retry Policy:</span>
              <span className="text-[#fafaf9]">Exponential backoff (3 attempts)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-5 border-t border-[#292524] bg-[#161412]">
          <span className="text-xs font-mono text-[#78716c]">
            License: MIT Open Template
          </span>

          <button
            onClick={handleClone}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all active:scale-95"
          >
            {cloned ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Cloned to Workspace!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Clone Template to Workspace</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
