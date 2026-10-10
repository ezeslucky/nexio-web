"use client";

import React, { useState } from "react";
import {
  MousePointer,
  Hand,
  Type,
  Square,
  Sparkles,
  Presentation,
  Database,
  ArrowUpRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Share2,
  CheckCircle2,
  Tag,
  Circle,
  HelpCircle,
} from "lucide-react";

export default function InfiniteCanvasSection() {
  const [selectedBlock, setSelectedBlock] = useState<string>("document");
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<string>("select");

  return (
    <section id="canvas" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="strand-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
              <span className="w-3 h-px bg-indigo-500" />
              EDGELESS CANVAS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
              Think beyond documents.
            </h2>
            <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
              Every idea deserves room to grow. Combine writing, drawing, structured data, embedded pages, and presentations on a single infinite surface.
            </p>
          </div>

          {/* Quick Capability Tags */}
          <div className="flex flex-wrap gap-2 text-xs font-mono text-[#a6a09b]">
            <span className="px-3 py-1.5 rounded-lg bg-[#141210] border border-[#292524] text-[#fafaf9]">
              Infinite Zoom
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#141210] border border-[#292524] text-[#fafaf9]">
              Spatial Mind Maps
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#141210] border border-[#292524] text-[#fafaf9]">
              16:9 Presentation Frames
            </span>
          </div>
        </div>

        {/* Interactive Infinite Canvas Mockup */}
        <div className="relative rounded-2xl md:rounded-3xl border border-[#292524] bg-[#12100e] shadow-mockup overflow-hidden">
          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between h-12 px-4 sm:px-6 bg-[#161412] border-b border-[#292524]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-medium text-[#fafaf9]">Canvas: Strategic Knowledge Map</span>
              <span className="text-xs text-[#78716c] font-mono hidden sm:inline">| 24 Blocks Connected</span>
            </div>

            {/* Canvas Zoom & Tool Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#0c0a09] border border-[#292524] rounded-lg px-2 py-1 text-xs font-mono text-[#a6a09b]">
                <button
                  onClick={() => setZoom((z) => Math.max(50, z - 10))}
                  className="hover:text-white px-1 font-bold"
                >
                  -
                </button>
                <span className="px-1 text-[#fafaf9]">{zoom}%</span>
                <button
                  onClick={() => setZoom((z) => Math.min(150, z + 10))}
                  className="hover:text-white px-1 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => setZoom(100)}
                className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono text-[#a6a09b] hover:text-[#fafaf9] bg-[#0c0a09] border border-[#292524] rounded-lg"
              >
                Reset Zoom
              </button>
            </div>
          </div>

          {/* Interactive Canvas Surface */}
          <div className="relative min-h-[580px] md:min-h-[640px] p-6 sm:p-8 bg-[#0a0908] bg-dot-pattern overflow-hidden">
            {/* SVG Connector Lines connecting canvas blocks */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 380 200 C 480 200, 480 320, 580 320"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d="M 880 260 C 960 260, 960 160, 1040 160"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <circle cx="480" cy="260" r="3" fill="#818cf8" />
              <circle cx="960" cy="210" r="3" fill="#38bdf8" />
            </svg>

            {/* Floating Floating Blocks Layout */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Block 1: Structured Document Block (Col 1-5) */}
              <div
                onClick={() => setSelectedBlock("document")}
                className={`md:col-span-5 p-5 rounded-2xl bg-[#141210]/95 border transition-all cursor-pointer backdrop-blur-md ${
                  selectedBlock === "document"
                    ? "border-indigo-500 shadow-glow ring-1 ring-indigo-500"
                    : "border-[#292524] hover:border-[#44403c]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#292524]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-[#fafaf9]">2026 Core Architecture.doc</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10">
                    Live Markdown
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <h4 className="text-sm font-bold text-[#fafaf9]">
                    1. Zero-Latency Spatial Document
                  </h4>
                  <p className="text-[#a6a09b] leading-relaxed">
                    Unlike standard linear documents, any paragraph in Nexio can be detached onto the canvas, grouped into a diagram, or turned into a slide.
                  </p>

                  <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524] font-mono text-[11px] text-[#fafaf9]">
                    <span className="text-indigo-400">const</span> canvas = <span className="text-cyan-400">new</span> NexioCanvas();
                    <br />
                    canvas.<span className="text-emerald-400">embedDoc</span>(&quot;Architecture.doc&quot;);
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Synchronized with Local SQLite &amp; CRDT engine</span>
                  </div>
                </div>
              </div>

              {/* Block 2: Relational Database & Kanban Board (Col 6-12) */}
              <div
                onClick={() => setSelectedBlock("database")}
                className={`md:col-span-7 p-5 rounded-2xl bg-[#141210]/95 border transition-all cursor-pointer backdrop-blur-md ${
                  selectedBlock === "database"
                    ? "border-indigo-500 shadow-glow ring-1 ring-indigo-500"
                    : "border-[#292524] hover:border-[#44403c]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#292524]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-[#fafaf9]">Sprint Deliverables Board</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#a6a09b]">Multi-View: Kanban</span>
                  </div>
                </div>

                {/* 3 Kanban Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-[#78716c] uppercase font-semibold">To Do (4)</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-[#161412] border border-[#292524] text-xs text-[#fafaf9] mb-2">
                      Offline Vector Cache
                      <div className="text-[10px] text-[#78716c] font-mono mt-1">P1 · High</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#161412] border border-[#292524] text-xs text-[#fafaf9]">
                      Canvas Zoom Engine
                      <div className="text-[10px] text-[#78716c] font-mono mt-1">P2 · Medium</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">In Progress (2)</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                    <div className="p-2 rounded-lg bg-[#181e22] border border-cyan-500/30 text-xs text-[#fafaf9]">
                      AI Workflow Nodes
                      <div className="text-[10px] text-cyan-300 font-mono mt-1">Active Exec</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">Done (12)</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-[#161412] border border-[#292524] text-xs text-[#a6a09b]">
                      CRDT Multi-Cursor
                      <div className="text-[10px] text-emerald-400 font-mono mt-1">Verified ✓</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 3: Presentation Slide Frame Card (Col 1-6) */}
              <div
                onClick={() => setSelectedBlock("slide")}
                className={`md:col-span-6 p-5 rounded-2xl bg-[#141210]/95 border transition-all cursor-pointer backdrop-blur-md ${
                  selectedBlock === "slide"
                    ? "border-indigo-500 shadow-glow ring-1 ring-indigo-500"
                    : "border-[#292524] hover:border-[#44403c]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#292524]">
                  <div className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-semibold text-[#fafaf9]">Slide Frame: Investor &amp; Team Pitch</span>
                  </div>
                  <span className="text-[10px] font-mono text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded">
                    Aspect 16:9
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-[#1c1926] to-[#121018] border border-violet-500/30 text-center space-y-2">
                  <div className="text-[10px] font-mono text-violet-300 uppercase tracking-widest font-semibold">
                    Slide 03 / The Unified Knowledge OS
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    One Surface. Every Workstream.
                  </h3>
                  <p className="text-xs text-[#a6a09b] max-w-sm mx-auto">
                    Replace 5 fragmented subscriptions with one cohesive local-first intelligence operating system.
                  </p>
                </div>
              </div>

              {/* Block 4: Spatial Sticky Notes & Mind Map (Col 7-12) */}
              <div
                onClick={() => setSelectedBlock("notes")}
                className={`md:col-span-6 p-5 rounded-2xl bg-[#141210]/95 border transition-all cursor-pointer backdrop-blur-md ${
                  selectedBlock === "notes"
                    ? "border-indigo-500 shadow-glow ring-1 ring-indigo-500"
                    : "border-[#292524] hover:border-[#44403c]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#292524]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-[#fafaf9]">Spatial Brainstorming &amp; Mind Map</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                    Sticky Cluster
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#231d14] border border-amber-500/30">
                    <div className="text-[10px] font-mono text-amber-400 font-semibold mb-1">
                      USER FEEDBACK
                    </div>
                    <p className="text-xs text-amber-100 leading-snug">
                      &quot;The ability to convert our Notion doc into a Miro board with one hotkey is magical.&quot;
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1a1726] border border-violet-500/30">
                    <div className="text-[10px] font-mono text-violet-400 font-semibold mb-1">
                      AI AUTOMATION
                    </div>
                    <p className="text-xs text-violet-100 leading-snug">
                      &quot;Connect webhooks straight into canvas blocks. No complex glue scripts required.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Floating Contextual Dock */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#181614]/95 border border-[#292524] shadow-2xl backdrop-blur-xl">
                <button
                  onClick={() => setActiveTool("select")}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeTool === "select"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#221f1c]"
                  }`}
                  title="Selection Cursor"
                >
                  <MousePointer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTool("hand")}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeTool === "hand"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#221f1c]"
                  }`}
                  title="Pan Hand"
                >
                  <Hand className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-[#292524]" />
                <button
                  onClick={() => setActiveTool("text")}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeTool === "text"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#221f1c]"
                  }`}
                  title="Text & Document"
                >
                  <Type className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTool("shape")}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeTool === "shape"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#221f1c]"
                  }`}
                  title="Shape & Frame"
                >
                  <Square className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTool("db")}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeTool === "db"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#221f1c]"
                  }`}
                  title="Database Table"
                >
                  <Database className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTool("ai")}
                  className={`p-2.5 rounded-xl transition-all ${
                    activeTool === "ai"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#221f1c]"
                  }`}
                  title="Nexio AI Copilot"
                >
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
