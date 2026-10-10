"use client";

import React, { useState } from "react";
import {
  FileText,
  Layers,
  Database,
  Presentation,
  Zap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import NexioLogo from "./NexioLogo";

export default function ConnectedKnowledgeSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const modules = [
    {
      id: "wikis",
      name: "Wikis & Knowledge Bases",
      description: "Hierarchical workspaces with bidirectional backlinks & instant vector search.",
      icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
      tag: "Knowledge Base",
    },
    {
      id: "docs",
      name: "Documents & Rich-Text",
      description: "Block-based linear editing that seamlessly detaches onto whiteboard surfaces.",
      icon: <FileText className="w-5 h-5 text-cyan-400" />,
      tag: "Writing Engine",
    },
    {
      id: "canvas",
      name: "Whiteboards & Spatial Canvas",
      description: "Infinite 2D plane for brainstorming, spatial clustering, and visual diagrams.",
      icon: <Layers className="w-5 h-5 text-violet-400" />,
      tag: "Spatial Canvas",
    },
    {
      id: "databases",
      name: "Relational Databases",
      description: "Multi-view tables, kanbans, calendars, and galleries with custom schema properties.",
      icon: <Database className="w-5 h-5 text-amber-400" />,
      tag: "Structured Data",
    },
    {
      id: "presentations",
      name: "Presentation Slides",
      description: "Present directly from your working documents without exporting to external slide tools.",
      icon: <Presentation className="w-5 h-5 text-rose-400" />,
      tag: "Pitch Decks",
    },
    {
      id: "workflows",
      name: "Visual AI Workflows",
      description: "Node-based automations that listen to events and directly update your canvas.",
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      tag: "AI Automation",
    },
  ];

  return (
    <section id="connected" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-indigo-500" />
            UNIFIED KNOWLEDGE ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            Everything connected.{" "}
            <span className="text-gradient-violet">Nothing fragmented.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Stop juggling Notion for docs, Miro for whiteboards, Airtable for data, Pitch for slides, and n8n for automations. Nexio replaces disjointed tools with one cohesive architecture.
          </p>
        </div>

        {/* Central Graphic Nexus & Connected Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onMouseEnter={() => setHoveredNode(mod.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                hoveredNode === mod.id
                  ? "bg-[#181614] border-indigo-500/50 shadow-glow"
                  : "bg-[#141210] border-[#292524] hover:border-[#44403c]"
              }`}
            >
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#0c0a09] border border-[#292524] group-hover:border-indigo-500/30 transition-colors">
                  {mod.icon}
                </div>
                <span className="text-[11px] font-mono text-[#a6a09b] px-2.5 py-1 rounded-md bg-[#0c0a09] border border-[#292524]">
                  {mod.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-[#fafaf9] mb-2 group-hover:text-white transition-colors">
                {mod.name}
              </h3>
              <p className="text-sm text-[#a6a09b] leading-relaxed">
                {mod.description}
              </p>

              {/* Connected Line Status */}
              <div className="mt-5 pt-4 border-t border-[#292524] flex items-center justify-between text-xs font-mono text-[#78716c]">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Synced Node
                </span>
                <span className="group-hover:translate-x-1 transition-transform text-[#a6a09b] group-hover:text-white">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Unified Architecture Visual Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141210] via-[#1a1726] to-[#141210] border border-[#292524] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <NexioLogo size="lg" showWordmark={false} />
            <div>
              <h4 className="text-base font-bold text-[#fafaf9]">
                Zero context-switching. Continuous flow.
              </h4>
              <p className="text-xs sm:text-sm text-[#a6a09b] mt-0.5">
                Every document block is accessible by AI workflows; every database entry can be positioned on the infinite canvas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#fafaf9] whitespace-nowrap">
            <div className="px-3 py-1.5 rounded-lg bg-[#0c0a09] border border-[#292524] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Single SQLite Core</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
