"use client";

import React, { useState } from "react";
import {
  FileText,
  ListTodo,
  LifeBuoy,
  BookOpen,
  Presentation,
  FileCheck2,
  ArrowRight,
  Zap,
  Bot,
  Layers,
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

interface WorkflowTemplatesSectionProps {
  onSelectTemplate?: (template: Template) => void;
}

export default function WorkflowTemplatesSection({
  onSelectTemplate,
}: WorkflowTemplatesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "knowledge" | "automation" | "ai">("all");

  const templates: Template[] = [
    {
      id: "ai-summarization",
      category: "ai",
      title: "AI Content Summarization",
      description: "Ingests long-form articles, PDFs, or research transcripts and extracts structured bullet points onto the canvas.",
      trigger: "Webhook / Web Clipper",
      aiModel: "Claude 3.5 Sonnet",
      result: "Structured Canvas Doc",
      popular: true,
    },
    {
      id: "meeting-to-tasks",
      category: "automation",
      title: "Meeting Notes to Tasks",
      description: "Parses call transcripts, detects commitments and action items, and populates a relational Kanban task board.",
      trigger: "Document Created",
      aiModel: "GPT-4o",
      result: "Relational Task Board",
      popular: true,
    },
    {
      id: "support-triage",
      category: "automation",
      title: "Support Ticket Triage",
      description: "Analyzes incoming customer messages, performs sentiment scoring, and routes high-priority alerts to Slack.",
      trigger: "Zendesk / Inbound Mail",
      aiModel: "Nexio Copilot",
      result: "Slack Alert & CRM Sync",
    },
    {
      id: "research-kb",
      category: "knowledge",
      title: "Research Knowledge Base",
      description: "Automatically indexes technical documentation, generates bidirectional links, and builds visual topic mind maps.",
      trigger: "RSS / Git Push",
      aiModel: "Vector Embeddings",
      result: "Connected Knowledge Map",
    },
    {
      id: "presentation-generator",
      category: "ai",
      title: "AI Presentation Generator",
      description: "Turns an outline document or meeting summary into a polished 6-to-10 slide presentation canvas deck.",
      trigger: "Manual Run",
      aiModel: "Claude 3.5 Sonnet",
      result: "16:9 Presentation Canvas",
      popular: true,
    },
    {
      id: "doc-processing",
      category: "knowledge",
      title: "Automated Document Processing",
      description: "Extracts key invoice, contract, or RFC schemas and writes normalized attributes into a multi-view relational database.",
      trigger: "File Upload",
      aiModel: "Multimodal OCR",
      result: "Relational Database Row",
    },
  ];

  const filtered = templates.filter(
    (t) => activeFilter === "all" || t.category === activeFilter
  );

  return (
    <section id="templates" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
              <span className="w-3 h-px bg-indigo-500" />
              TEMPLATE ECOSYSTEM
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
              Start with a workflow.{" "}
              <span className="text-gradient-primary">Make it yours.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
              Accelerate your setup with battle-tested templates designed for technical teams, knowledge workers, and automation builders.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-[#141210] border border-[#292524]">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              All Templates
            </button>
            <button
              onClick={() => setActiveFilter("ai")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "ai"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              AI Pipelines
            </button>
            <button
              onClick={() => setActiveFilter("automation")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "automation"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              Team Automation
            </button>
            <button
              onClick={() => setActiveFilter("knowledge")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "knowledge"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              Knowledge Bases
            </button>
          </div>
        </div>

        {/* 6 Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="p-6 rounded-2xl bg-[#141210] border border-[#292524] hover:border-[#44403c] transition-all flex flex-col justify-between group shadow-card hover:shadow-cardHover"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-indigo-400 font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {tpl.category.toUpperCase()}
                  </span>
                  {tpl.popular && (
                    <span className="text-[10px] font-mono text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#fafaf9] mb-2 group-hover:text-white transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a6a09b] leading-relaxed mb-6">
                  {tpl.description}
                </p>

                {/* Pipeline Flow Visualization Miniature */}
                <div className="p-3.5 rounded-xl bg-[#0c0a09] border border-[#292524] space-y-2 mb-6 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#a6a09b]">
                    <span className="text-[#78716c]">Trigger:</span>
                    <span className="text-[#fafaf9] font-medium">{tpl.trigger}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#a6a09b]">
                    <span className="text-[#78716c]">Engine:</span>
                    <span className="text-violet-400 font-medium">{tpl.aiModel}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#a6a09b]">
                    <span className="text-[#78716c]">Output:</span>
                    <span className="text-emerald-400 font-medium">{tpl.result}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectTemplate?.(tpl)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#fafaf9] bg-[#1c1917] hover:bg-[#25221f] border border-[#292524] flex items-center justify-center gap-2 group-hover:border-indigo-500/40 transition-colors"
              >
                <span>Preview Template</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#78716c] group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
