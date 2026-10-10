"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Presentation,
  Network,
  ListTodo,
  Kanban,
  FileCode,
  ArrowRight,
  Bot,
  CheckCircle2,
  Copy,
  Zap,
} from "lucide-react";

export default function WorkspaceAISection() {
  const [selectedTask, setSelectedTask] = useState<number>(0);

  const tasks = [
    {
      id: 0,
      title: "Outline → Presentation",
      icon: <Presentation className="w-4 h-4 text-violet-400" />,
      prompt: "Convert my Q4 product strategy bullet points into a 6-slide executive deck with visual layout framing.",
      outputTitle: "Generated 6-Slide Canvas Deck",
      outputBadge: "16:9 Presentation Format",
      preview: (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1c1926] to-[#121018] border border-violet-500/30 text-center">
            <span className="text-[10px] font-mono text-violet-300 uppercase">Slide 1 / 6</span>
            <h4 className="text-sm font-bold text-white mt-1">Nexio Q4 Product Vision</h4>
            <p className="text-xs text-[#a6a09b] mt-1">From fragmented documents to unified spatial canvas</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0c0a09] border border-[#292524]">
              <span className="text-[10px] font-mono text-[#78716c]">Slide 2</span>
              <div className="text-xs font-medium text-[#fafaf9] mt-0.5">Vector Knowledge Graph</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0c0a09] border border-[#292524]">
              <span className="text-[10px] font-mono text-[#78716c]">Slide 3</span>
              <div className="text-xs font-medium text-[#fafaf9] mt-0.5">Autonomous Workflows</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Doc → Mind Map",
      icon: <Network className="w-4 h-4 text-cyan-400" />,
      prompt: "Synthesize this 12-page systems architecture RFC into an edgeless visual mind map with connecting nodes.",
      outputTitle: "Spatial Architecture Graph",
      outputBadge: "Connected Tree: 18 Nodes",
      preview: (
        <div className="p-4 rounded-xl bg-[#0c0a09] border border-[#292524] relative overflow-hidden">
          <div className="flex items-center justify-center mb-3">
            <div className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-xs font-bold text-indigo-300">
              Core Workspace Engine
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 rounded-lg bg-[#161412] border border-cyan-500/30 text-cyan-300">
              SQLite + CRDT
            </div>
            <div className="p-2 rounded-lg bg-[#161412] border border-violet-500/30 text-violet-300">
              Vector Pipeline
            </div>
            <div className="p-2 rounded-lg bg-[#161412] border border-emerald-500/30 text-emerald-300">
              Node Bus
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Notes → Action Tasks",
      icon: <ListTodo className="w-4 h-4 text-emerald-400" />,
      prompt: "Analyze raw transcript from today's engineering sprint planning, extract action items, assignees, and deadlines.",
      outputTitle: "Structured Kanban Tasks",
      outputBadge: "5 Items Created & Synced",
      preview: (
        <div className="space-y-2">
          <div className="p-2.5 rounded-lg bg-[#0c0a09] border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[#fafaf9]">Ship local-first vector index cache</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
              @elena · Friday
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0c0a09] border border-[#292524] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#78716c]" />
              <span className="text-[#a6a09b]">Refactor presentation canvas frame scaling</span>
            </div>
            <span className="text-[10px] font-mono text-[#a6a09b] bg-[#1a1816] px-2 py-0.5 rounded">
              @marcus · Monday
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Backlog → Project Board",
      icon: <Kanban className="w-4 h-4 text-amber-400" />,
      prompt: "Group these 40 unorganized bug reports and feature requests into sprint milestones with impact scoring.",
      outputTitle: "Grouped Roadmap Milestones",
      outputBadge: "Sprint 42 Milestones",
      preview: (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-[#1a1712] border border-amber-500/30">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Milestone 1</span>
            <div className="text-xs font-semibold text-[#fafaf9] mt-1">Zero-Latency Sync</div>
            <div className="text-[10px] text-amber-200/70 font-mono mt-1">Impact: Critical</div>
          </div>
          <div className="p-3 rounded-lg bg-[#141210] border border-[#292524]">
            <span className="text-[10px] font-mono text-[#78716c] font-bold uppercase">Milestone 2</span>
            <div className="text-xs font-semibold text-[#fafaf9] mt-1">Visual AI Workflows</div>
            <div className="text-[10px] text-[#78716c] font-mono mt-1">Impact: High</div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Brainstorm → Engineering Spec",
      icon: <FileCode className="w-4 h-4 text-blue-400" />,
      prompt: "Draft a complete technical specification RFC with API endpoints, schema definitions, and error handling.",
      outputTitle: "Technical Specification Document",
      outputBadge: "RFC #104 Ready",
      preview: (
        <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524] font-mono text-xs text-[#a6a09b] space-y-1.5">
          <div className="text-indigo-400 font-bold">## RFC-104: Node Pipeline RPC Protocol</div>
          <div className="text-emerald-400 text-[11px]">&gt; Status: Approved · Author: AI Architect</div>
          <div className="text-[#fafaf9] text-[11px]">POST /api/v1/canvas/nodes/evaluate</div>
        </div>
      ),
    },
  ];

  const currentTask = tasks[selectedTask];

  return (
    <section id="ai" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs font-mono tracking-widest text-violet-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-violet-400" />
            INTELLIGENT WORKSPACE PARTNER
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            AI that works where your ideas live.
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Nexio&apos;s multimodal AI partner transforms the way you create, organize, and understand information. Not a detached sidebar chat—an intelligent collaborator that directly edits your canvas.
          </p>
        </div>

        {/* Interactive Showcase: Selector + Dynamic Canvas Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Interactive Task Selectors (Col 1-5) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono text-[#78716c] uppercase tracking-wider mb-2">
              Select Transformation Task:
            </div>
            {tasks.map((task, idx) => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  selectedTask === idx
                    ? "bg-[#181614] border-violet-500/50 shadow-md ring-1 ring-violet-500/30"
                    : "bg-[#141210] border-[#292524] hover:border-[#44403c] text-[#a6a09b]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0c0a09] border border-[#292524]">
                    {task.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#fafaf9]">{task.title}</div>
                    <div className="text-[11px] text-[#78716c] line-clamp-1">{task.outputBadge}</div>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    selectedTask === idx ? "text-violet-400 translate-x-1" : "text-[#78716c]"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic AI Canvas Transformation Studio (Col 6-12) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#141210] border border-[#292524] p-5 sm:p-7 shadow-mockup flex flex-col justify-between">
            {/* Command Prompt Box */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#292524]">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-gradient-to-tr from-violet-600 to-indigo-600 text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#fafaf9]">Nexio Multimodal Copilot</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Model: Claude 3.5 Sonnet
                </span>
              </div>

              {/* Natural Language Prompt Input Simulation */}
              <div className="p-3.5 rounded-xl bg-[#0c0a09] border border-[#292524]">
                <div className="text-[10px] font-mono text-[#78716c] uppercase mb-1">
                  User Canvas Command:
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#fafaf9] leading-relaxed">
                  &quot;{currentTask.prompt}&quot;
                </p>
              </div>

              {/* Live Canvas Generation Output */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#fafaf9] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    {currentTask.outputTitle}
                  </span>
                  <span className="font-mono text-[10px] text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded">
                    {currentTask.outputBadge}
                  </span>
                </div>

                {/* Preview Content */}
                <div className="p-4 rounded-xl bg-[#12100e] border border-[#292524]">
                  {currentTask.preview}
                </div>
              </div>
            </div>

            {/* Bottom Generation Metrics */}
            <div className="pt-4 mt-4 border-t border-[#292524] flex items-center justify-between text-xs font-mono text-[#78716c]">
              <span>Context: 12.4k tokens</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Rendered directly to canvas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
