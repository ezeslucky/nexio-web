"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Github,
  Play,
  Layers,
  FileText,
  Cpu,
  Database,
  Presentation,
  Maximize2,
  ZoomIn,
  ZoomOut,
  MousePointer2,
  CheckCircle2,
  Bot,
  Zap,
  Tag,
  CircleDot,
  Terminal,
} from "lucide-react";
import { useGithubStars } from "@/hooks/useGithubStars";

interface HeroProps {
  onOpenDemo?: () => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  const { formattedStars } = useGithubStars();
  const [activeTab, setActiveTab] = useState<"canvas" | "doc" | "workflow" | "presentation">("canvas");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedNode, setSelectedNode] = useState<string | null>("ai-node");
  const [aiPromptInput, setAiPromptInput] = useState("Synthesize research into slide deck & run triage automation");

  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-[#0c0a09]">
      {/* Background Architectural Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-600/25 via-violet-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-24 left-1/3 -translate-x-1/2 w-[400px] h-[250px] bg-cyan-500/15 blur-[100px] rounded-full" />
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.22] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="strand-container relative z-10">
        {/* Header Eyebrow & Announcement Badge */}
        <div className="flex flex-col items-center text-center">
          {/* Strand-Style Top Announcement Pill */}
          <a
            href="#workflows"
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full bg-[#181614] hover:bg-[#211e1b] border border-[#292524] hover:border-indigo-500/40 text-xs font-medium text-[#fafaf9] transition-all group shadow-sm max-w-[92vw] overflow-hidden"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse flex-shrink-0" />
            <span className="text-indigo-400 font-semibold tracking-wide uppercase text-[10px] bg-indigo-500/10 px-1.5 py-0.5 rounded flex-shrink-0">
              New
            </span>
            <span className="text-[#a6a09b] group-hover:text-[#fafaf9] transition-colors truncate">
              Nexio 2.0 with Visual AI Workflows & Infinite Canvas is live
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#78716c] group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
          </a>

          {/* Eyebrow */}
          <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-indigo-500/50" />
            THE NEXT-GENERATION WORKSPACE
            <span className="w-4 h-px bg-indigo-500/50" />
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#fafaf9] leading-[1.12] mb-6 px-2">
            Your entire world of work.{" "}
            <span className="text-gradient-violet block sm:inline">
              One infinite canvas.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#a6a09b] leading-relaxed mb-8 font-normal">
            Nexio unifies knowledge, creativity, presentations, and AI automation in one powerful workspace. Think freely, connect ideas, and turn complex workflows into intelligent systems.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-6">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all transform active:scale-98"
            >
              <span>Explore Nexio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/ezeslucky/nexio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-[#fafaf9] bg-[#141210] hover:bg-[#1c1917] border border-[#292524] hover:border-[#44403c] transition-all"
            >
              <Github className="w-4 h-4 text-[#a6a09b]" />
              <span>View on GitHub</span>
              <span className="font-mono text-xs text-indigo-400 font-semibold ml-1">★ {formattedStars}</span>
            </a>
          </div>

          {/* Supporting Line */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#78716c]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Open source
            </span>
            <span>·</span>
            <span>Local-first</span>
            <span>·</span>
            <span>AI-powered</span>
          </div>
        </div>

        {/* Master Showcase: The Unified Nexio Interface */}
        <div className="mt-14 relative">
          {/* Subtle Outer Frame Border & Corner Accents */}
          <div className="relative rounded-2xl md:rounded-3xl border border-[#292524] bg-[#12100e] shadow-mockup overflow-hidden">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between h-12 px-4 sm:px-6 bg-[#161412] border-b border-[#292524]">
              {/* Left: macOS dots & Breadcrumbs */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3c3733]" />
                  <span className="w-3 h-3 rounded-full bg-[#3c3733]" />
                  <span className="w-3 h-3 rounded-full bg-[#3c3733]" />
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#a6a09b]">
                  <span className="text-[#78716c]">workspace</span>
                  <span>/</span>
                  <span className="text-[#fafaf9] font-medium">Q4 Growth & AI Pipeline</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold ml-1">
                    Live Sync
                  </span>
                </div>
              </div>

              {/* Center: View Switcher */}
              <div className="flex items-center p-0.5 bg-[#0c0a09] border border-[#292524] rounded-lg">
                <button
                  onClick={() => setActiveTab("canvas")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    activeTab === "canvas"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span className="hidden md:inline">Infinite Canvas</span>
                </button>
                <button
                  onClick={() => setActiveTab("doc")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    activeTab === "doc"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span className="hidden md:inline">Document</span>
                </button>
                <button
                  onClick={() => setActiveTab("workflow")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    activeTab === "workflow"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span className="hidden md:inline">AI Workflows</span>
                </button>
                <button
                  onClick={() => setActiveTab("presentation")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    activeTab === "presentation"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  <Presentation className="w-3 h-3" />
                  <span className="hidden md:inline">Slides</span>
                </button>
              </div>

              {/* Right: Zoom controls & Presence */}
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center -space-x-1.5">
                  <span className="w-6 h-6 rounded-full bg-violet-600 border border-[#161412] text-[10px] font-bold flex items-center justify-center text-white" title="Elena (AI Lead)">
                    EL
                  </span>
                  <span className="w-6 h-6 rounded-full bg-cyan-600 border border-[#161412] text-[10px] font-bold flex items-center justify-center text-white" title="Marcus (Design)">
                    MT
                  </span>
                  <span className="w-6 h-6 rounded-full bg-emerald-600 border border-[#161412] text-[10px] font-bold flex items-center justify-center text-white" title="Kenji (Backend)">
                    KJ
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[#0c0a09] border border-[#292524] rounded-md px-1.5 py-0.5 text-xs text-[#a6a09b] font-mono">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                    className="hover:text-white px-1"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <span>{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                    className="hover:text-white px-1"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Application Body: Canvas Viewport */}
            <div className="relative min-h-[520px] md:min-h-[640px] p-4 sm:p-6 md:p-8 bg-[#0e0c0a] bg-dot-pattern overflow-hidden">
              {/* Dynamic SVG Bezier Interconnection Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {/* Connection from Document to AI Workflow Node */}
                <path
                  d="M 360 220 C 440 220, 440 160, 520 160"
                  stroke="url(#curveGrad1)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animate-flow-line"
                />

                {/* Connection from AI Node to Presentation Frame */}
                <path
                  d="M 780 180 C 860 180, 860 300, 940 300"
                  stroke="url(#curveGrad2)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animate-flow-line"
                />

                {/* Glowing Flow Node Pulses */}
                <circle cx="440" cy="190" r="4" fill="#818cf8" className="animate-ping" />
                <circle cx="860" cy="240" r="4" fill="#38bdf8" className="animate-ping" />
              </svg>

              {/* Floating Canvas Elements Grid / Interconnected Layout */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* 1. Left Block: Rich Document & Wiki Block (Col 1-5) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Rich Text Knowledge Card */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#141210]/95 border border-[#292524] shadow-card backdrop-blur-md hover:border-indigo-500/30 transition-all">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#292524]">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-semibold text-[#fafaf9]">Product Strategy Spec.md</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#78716c]">Doc #842</span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#fafaf9] mb-1.5">
                      Autonomous Intelligence Architecture
                    </h3>
                    <p className="text-xs text-[#a6a09b] mb-3 leading-relaxed">
                      Nexio fuses real-time vector indexing with an edgeless whiteboard canvas. Nodes communicate across local SQLite databases without cloud roundtrips.
                    </p>

                    {/* Interactive Checklist Block */}
                    <div className="space-y-1.5 p-2.5 rounded-lg bg-[#0c0a09] border border-[#292524]/60 text-xs text-[#fafaf9]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs text-[#a6a09b]">CRDT offline state synchronization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs text-[#a6a09b]">Node-based event pipeline engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleDot className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                        <span className="text-xs text-[#fafaf9] font-medium">Multimodal AI canvas generation</span>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Notes & Quick Idea Block */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#1f1a14] border border-amber-500/30 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-[10px] font-mono text-amber-300 font-semibold uppercase">Idea Note</span>
                      </div>
                      <p className="text-xs text-amber-100 font-medium leading-relaxed">
                        &quot;Why should canvas and code be separated? Let users write TS inside node logic.&quot;
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#161c1d] border border-cyan-500/30 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase">Sprint Goal</span>
                      </div>
                      <p className="text-xs text-cyan-100 font-medium leading-relaxed">
                        Zero friction from outline doc to 16:9 interactive slide canvas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Center/Right: Node-Based AI Workflow & Slide Presentation (Col 6-12) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Visual Node-Based Workflow Frame */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#141210]/95 border border-[#292524] shadow-card backdrop-blur-md">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#292524]">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-semibold text-[#fafaf9]">Live Node Pipeline: Document Ingest → AI Triage</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        Active
                      </span>
                    </div>

                    {/* Nodes Visual Array */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Node 1: Webhook Trigger */}
                      <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524] hover:border-[#44403c] transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">Trigger</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <div className="text-xs font-semibold text-[#fafaf9]">Doc Created</div>
                        <div className="text-[11px] text-[#78716c] font-mono mt-1">event.payload.md</div>
                      </div>

                      {/* Node 2: Claude 3.5 Sonnet AI Processor */}
                      <div className="p-3 rounded-lg bg-[#1a1523] border border-violet-500/40 shadow-sm relative">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-violet-300 uppercase font-semibold flex items-center gap-1">
                            <Bot className="w-3 h-3 text-violet-400" />
                            AI Model
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">98ms</span>
                        </div>
                        <div className="text-xs font-semibold text-[#fafaf9]">Claude 3.5 Sonnet</div>
                        <div className="text-[11px] text-violet-300/80 font-mono mt-1">Extract tasks & slide deck</div>
                      </div>

                      {/* Node 3: Action Output */}
                      <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524] hover:border-[#44403c] transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Action</span>
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        </div>
                        <div className="text-xs font-semibold text-[#fafaf9]">Generate Slides</div>
                        <div className="text-[11px] text-[#78716c] font-mono mt-1">canvas.slides.create()</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Assistant Command Bar & Generated Presentation Deck */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Multimodal AI Assistant Card */}
                    <div className="p-4 rounded-xl bg-[#141210]/95 border border-[#292524] shadow-card">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="p-1.5 rounded-md bg-gradient-to-tr from-indigo-600 to-violet-500 text-white">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-[#fafaf9]">Nexio Copilot</span>
                      </div>

                      <div className="text-xs text-[#fafaf9] p-2.5 rounded-lg bg-[#0c0a09] border border-[#292524] mb-2.5 font-mono">
                        <span className="text-indigo-400">&gt; </span>
                        {aiPromptInput}
                      </div>

                      <div className="text-[11px] text-[#a6a09b] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Generated 6 slides, 4 task records & linked knowledge graph</span>
                      </div>
                    </div>

                    {/* Slide Deck Canvas Card Preview */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#181614] to-[#12100e] border border-indigo-500/30 shadow-card relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold">Slide 01 / 06</span>
                        <span className="text-[10px] font-mono text-[#78716c]">16:9 Canvas</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#fafaf9] mb-1">
                        Nexio: The Knowledge OS
                      </h4>
                      <p className="text-[11px] text-[#a6a09b] line-clamp-2">
                        Zero fragmented tabs. One infinite canvas for writing, planning, and AI automation.
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          Export to PDF
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#292524] text-[#fafaf9]">
                          Present ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Canvas Floating Toolbar dock */}
              <div className="mt-6 flex items-center justify-between p-2 rounded-xl bg-[#161412]/90 border border-[#292524] backdrop-blur-xl">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg bg-indigo-600 text-white shadow-sm" title="Select Tool">
                    <MousePointer2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a]" title="Rich Document">
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a]" title="Relational Database">
                    <Database className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a]" title="AI Workflow Pipeline">
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a]" title="Presentation Frame">
                    <Presentation className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#a6a09b]">
                  <span className="hidden sm:inline">Local SQLite: <span className="text-emerald-400">Encrypted</span></span>
                  <span className="w-1 h-1 rounded-full bg-[#78716c]" />
                  <span>Latency: <span className="text-indigo-400">0.4ms</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
