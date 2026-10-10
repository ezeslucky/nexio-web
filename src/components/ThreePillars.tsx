"use client";

import React, { useState } from "react";
import {
  FileText,
  Layers,
  Database,
  Cpu,
  Shield,
  HardDrive,
  GitBranch,
  Sparkles,
  ArrowRight,
  Workflow,
  Check,
} from "lucide-react";

export default function ThreePillars() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      badge: "Pillar 01",
      title: "Knowledge without boundaries",
      description:
        "Documents, wikis, databases, and whiteboards in one connected space. Never choose between linear writing and spatial thinking again.",
      gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
      accentColor: "indigo",
      preview: (
        <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#292524] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#292524]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-mono text-[#fafaf9]">Unified Document & Canvas</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-400">Bidirectional</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-[#141210] border border-[#292524] flex items-center justify-between text-xs">
              <span className="text-[#a6a09b]">Markdown Doc</span>
              <span className="text-indigo-400">⇄</span>
              <span className="text-[#fafaf9] font-medium">Infinite Whiteboard</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#141210] border border-[#292524] flex items-center justify-between text-xs">
              <span className="text-[#a6a09b]">Relational Table</span>
              <span className="text-indigo-400">⇄</span>
              <span className="text-[#fafaf9] font-medium">Interactive Slides</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      badge: "Pillar 02",
      title: "Automation without complexity",
      description:
        "Visually design AI workflows and connect them directly to your knowledge. Chain triggers, LLMs, and actions with drag-and-drop clarity.",
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      accentColor: "cyan",
      preview: (
        <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#292524] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#292524]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono text-[#fafaf9]">Node-Based Intelligence</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300">Zero Cloud Code</span>
          </div>

          {/* Miniature Node Pipeline */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1 p-2 rounded-lg bg-[#141210] border border-[#292524] text-center">
              <div className="text-[10px] font-mono text-[#78716c]">Trigger</div>
              <div className="text-xs font-semibold text-[#fafaf9] truncate">On Note Save</div>
            </div>
            <span className="text-cyan-400 font-bold">→</span>
            <div className="flex-1 p-2 rounded-lg bg-[#1a1723] border border-cyan-500/30 text-center">
              <div className="text-[10px] font-mono text-cyan-400">AI Model</div>
              <div className="text-xs font-semibold text-white truncate">Claude 3.5</div>
            </div>
            <span className="text-cyan-400 font-bold">→</span>
            <div className="flex-1 p-2 rounded-lg bg-[#141210] border border-[#292524] text-center">
              <div className="text-[10px] font-mono text-[#78716c]">Action</div>
              <div className="text-xs font-semibold text-[#fafaf9] truncate">Canvas Sync</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      badge: "Pillar 03",
      title: "Your data, your rules",
      description:
        "Local-first architecture, self-hosting, and extensibility. Your workspace runs offline on your machine with zero vendor lock-in.",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accentColor: "emerald",
      preview: (
        <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#292524] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#292524]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-[#fafaf9]">Local-First Storage</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">100% Offline</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-[#141210] border border-[#292524]">
              <div className="text-[10px] font-mono text-[#78716c]">Database</div>
              <div className="text-xs font-semibold text-emerald-300 font-mono">SQLite + CRDT</div>
            </div>
            <div className="p-2 rounded-lg bg-[#141210] border border-[#292524]">
              <div className="text-[10px] font-mono text-[#78716c]">Self-Hosting</div>
              <div className="text-xs font-semibold text-[#fafaf9] font-mono">Docker Native</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524]">
      <div className="strand-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-indigo-500" />
            CORE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            Not another tool.{" "}
            <span className="text-gradient-primary">Your entire workspace.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Your ideas, knowledge, and automations shouldn&apos;t live in disconnected applications. Nexio brings everything together in a single, flexible environment.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onMouseEnter={() => setActiveCard(pillar.id)}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#141210] border border-[#292524] hover:border-[#44403c] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-card hover:shadow-cardHover"
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${pillar.gradient} blur-[70px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 space-y-6">
                {/* Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#a6a09b] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1c1917] border border-[#292524]">
                    {pillar.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#292524] group-hover:bg-indigo-500 transition-colors" />
                </div>

                {/* Preview Mockup Box */}
                <div>{pillar.preview}</div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-[#fafaf9] mb-2.5 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#a6a09b] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="relative z-10 pt-6 mt-6 border-t border-[#292524] flex items-center justify-between text-xs font-medium text-[#78716c] group-hover:text-indigo-400 transition-colors">
                <span>Explore capability</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
