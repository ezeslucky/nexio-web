"use client";

import React, { useState } from "react";
import {
  FileText,
  Shapes,
  Database,
  Lock,
  HardDrive,
  RefreshCw,
  Workflow,
  Sparkles,
  Layers,
  CheckCircle2,
  Share2,
} from "lucide-react";

export default function HyperfusedPlatform() {
  const [activeIcon, setActiveIcon] = useState(3);

  const icons = [
    { label: "Docs", icon: "📄" },
    { label: "Canvas", icon: "🎨" },
    { label: "Database", icon: "📊" },
    { label: "Unified", icon: "⚡" },
    { label: "AI", icon: "✨" },
    { label: "Local", icon: "🔒" },
    { label: "Sync", icon: "🔄" },
  ];

  const toolsToReplace = [
    { name: "Notion", tag: "Docs & Wikis", color: "#000000" },
    { name: "Miro", tag: "Infinite Whiteboard", color: "#ffd02f" },
    { name: "Obsidian", tag: "Local Markdown", color: "#7c3aed" },
    { name: "Figma Jam", tag: "Brainstorming", color: "#f24e1e" },
    { name: "Airtable", tag: "Relational Database", color: "#2563eb" },
    { name: "Trello", tag: "Kanban Planning", color: "#0079bf" },
    { name: "Confluence", tag: "Team Wiki", color: "#0052cc" },
    { name: "Linear", tag: "Issue Tracking", color: "#5e6ad2" },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#f8f8f7]">
      <div className="limit-container flex flex-col items-center">
        {/* Top Icon List with Gradient Opacities */}
        <div className="flex items-center gap-2 sm:gap-4 mb-8">
          {icons.map((item, idx) => {
            const opacity =
              idx === 0 || idx === 6
                ? "opacity-30"
                : idx === 1 || idx === 5
                ? "opacity-50"
                : idx === 2 || idx === 4
                ? "opacity-75"
                : "opacity-100 ring-2 ring-[#0284c7]/40 shadow-md";

            return (
              <button
                key={idx}
                onClick={() => setActiveIcon(idx)}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-white border border-black/10 shadow-sm flex items-center justify-center text-lg sm:text-xl transition-all duration-200 hover:scale-110 hover:opacity-100 ${opacity}`}
                title={item.label}
              >
                {item.icon}
              </button>
            );
          })}
        </div>

        {/* Section Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-center max-w-3xl mb-14 text-black leading-tight">
          Consolidate Your Digital Workflow on Nexio's{" "}
          <span className="text-[#0284c7]">Unified Engine</span>
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          {/* Card 1: Say goodbye to tool sprawl (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-card flex flex-col justify-between overflow-hidden group">
            <div>
              <h3 className="text-2xl font-semibold text-black mb-2 tracking-tight">
                Say goodbye to tool fragmentation
              </h3>
              <p className="text-sm sm:text-base text-[#424149] leading-relaxed">
                Tired of toggling between disconnected apps to write, plan, and sketch?
              </p>
            </div>

            {/* Collage of Fragmented Apps */}
            <div className="relative mt-8 pt-6 pb-4 flex flex-wrap gap-2.5 justify-center items-center min-h-[220px]">
              {toolsToReplace.map((tool, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 shadow-sm text-xs font-medium text-gray-800 flex items-center gap-2 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer ${
                    i % 2 === 0 ? "-rotate-2" : "rotate-2"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tool.color }}
                  />
                  <span>{tool.name}</span>
                  <span className="text-[10px] text-gray-400">({tool.tag})</span>
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium text-red-500">❌ Tool Sprawl & Broken Links</span>
              <span className="font-semibold text-emerald-600">✓ Unified in Nexio</span>
            </div>
          </div>

          {/* Right Column: Card 2 & Card 3 (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Card 2: Stay focused and unleash creativity */}
            <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284c7] text-xs font-semibold mb-3">
                  <Workflow size={13} />
                  <span>Nexio KnowledgeOS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-2 tracking-tight">
                  Stay in deep flow with connected context
                </h3>
                <p className="text-sm sm:text-base text-[#424149] leading-relaxed">
                  Your all-in-one workspace solution for effortlessly drafting documents,
                  diagramming architectures, and scheduling project milestones on one screen.
                </p>
              </div>

              {/* Fused Flow Stream Visualization */}
              <div className="mt-6 p-4 rounded-xl bg-[#f8f8f7] border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black">Doc Blocks</div>
                    <div className="text-[11px] text-gray-500">Structured markdown</div>
                  </div>
                </div>

                <div className="text-[#0284c7] font-bold text-sm flex items-center gap-1">
                  <span>⇄</span>
                  <span className="text-[11px] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-sky-200">
                    Live Conversion
                  </span>
                  <span>⇄</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-[#4f46e5] flex items-center justify-center font-bold">
                    <Shapes size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black">Canvas Nodes</div>
                    <div className="text-[11px] text-gray-500">Infinite whiteboard</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Privacy-focused, local-first */}
            <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                  <Lock size={13} />
                  <span>Local-First & Encrypted</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-2 tracking-tight">
                  Privacy-first, zero-latency local storage
                </h3>
                <p className="text-sm sm:text-base text-[#424149] leading-relaxed">
                  You are in charge of your own data. Fully functional offline, with optional
                  end-to-end encrypted cloud sync and self-hosting capabilities.
                </p>
              </div>

              {/* Data sovereignty badges */}
              <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800">
                  <HardDrive size={14} className="text-emerald-600" />
                  <span>Local SQLite / IndexedDB</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800">
                  <Lock size={14} className="text-[#0284c7]" />
                  <span>End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800">
                  <CheckCircle2 size={14} className="text-indigo-600" />
                  <span>MIT Open-Source Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
