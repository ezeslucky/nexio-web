"use client";

import React, { useState } from "react";
import {
  FileText,
  Shapes,
  Kanban,
  Table as TableIcon,
  Calendar,
  Sparkles,
  CheckCircle,
  Plus,
  Play,
  Presentation,
  Pencil,
  ArrowRight,
  GripVertical,
} from "lucide-react";

export default function Features() {
  const [activePlanView, setActivePlanView] = useState<"board" | "table">("board");

  const kanbanColumns = [
    {
      title: "To Do",
      color: "bg-gray-100 text-gray-700",
      items: [
        { title: "Define Nexio peer-to-peer sync protocol", tag: "Engineering", priority: "High" },
        { title: "User testing session for Canvas gestures", tag: "UX Research", priority: "Med" },
      ],
    },
    {
      title: "In Progress",
      color: "bg-sky-100 text-sky-800",
      items: [
        { title: "Self-host Docker 1-click deployment", tag: "DevOps", priority: "High" },
        { title: "Neural Mind Map automatic clustering", tag: "AI Feature", priority: "High" },
      ],
    },
    {
      title: "Done",
      color: "bg-emerald-100 text-emerald-800",
      items: [
        { title: "Multi-cursor collaborative drawing", tag: "Canvas", priority: "Done" },
        { title: "Database Kanban & Table view live sync", tag: "Core", priority: "Done" },
      ],
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="limit-container space-y-28 md:space-y-40">
        {/* ================= 1. WRITE FEATURE ================= */}
        <div id="write" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center text-3xl sm:text-4xl font-bold italic tracking-tight text-black">
              <span>Write</span>
              <span className="w-1.5 h-8 bg-[#0284c7] ml-1.5 rounded-full cursor-blink inline-block" />
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-black leading-snug">
              at the speed of thought
            </h3>

            <p className="text-base sm:text-lg text-[#424149] leading-relaxed">
              Build up your content like blocks and let your ideas flow naturally.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed pt-2">
              Start with an empty space and watch your blocks stack up seamlessly. Type{" "}
              <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[#0284c7] font-mono text-xs">
                /
              </code>{" "}
              for instant headers, tables, callouts, diagrams, and AI prompts.
            </p>

            <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-[#0284c7] cursor-pointer hover:gap-3 transition-all">
              <span>Explore block editing</span>
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Realistic Block Editor Mockup */}
            <div className="bg-[#fcfcfc] rounded-2xl border border-black/[0.1] shadow-card p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06] text-xs text-gray-400">
                <span className="font-medium text-gray-700">Page: Nexio Architecture Spec</span>
                <span>Last updated 1m ago</span>
              </div>

              <div className="space-y-4 text-left">
                {/* Heading Block */}
                <div className="flex items-start gap-2 group">
                  <GripVertical
                    size={16}
                    className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity mt-1 cursor-grab"
                  />
                  <h4 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                    Unified Knowledge Base Specification
                  </h4>
                </div>

                {/* Paragraph Block */}
                <div className="flex items-start gap-2 group">
                  <GripVertical
                    size={16}
                    className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity mt-1 cursor-grab"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Unlike traditional documentation tools that silo text and diagrams, Nexio
                    stores document nodes as dynamic visual entities capable of multi-dimensional
                    representation across docs and infinite canvases.
                  </p>
                </div>

                {/* Slash Menu Simulation */}
                <div className="p-3 bg-white rounded-xl shadow-dropdown border border-black/[0.08] max-w-sm space-y-1">
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2">
                    Block Types
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-sky-50 text-[#0284c7] text-xs font-medium">
                    <FileText size={15} />
                    <span>Heading 2</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium">
                    <Shapes size={15} />
                    <span>Embed Infinite Canvas</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium">
                    <Sparkles size={15} />
                    <span>Nexio AI Copilot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. DRAW FEATURE ================= */}
        <div id="draw" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Visual Whiteboard / Diagramming Canvas Mockup */}
            <div
              className="bg-[#fbfbfb] rounded-2xl border border-black/[0.1] shadow-card p-6 sm:p-8 min-h-[380px] relative overflow-hidden flex flex-col justify-between"
              style={{
                backgroundImage: "radial-gradient(#e5e7eb 1.5px, transparent 1.5px)",
                backgroundSize: "18px 18px",
              }}
            >
              {/* Presentation Frame Indicator */}
              <div className="flex items-center justify-between text-xs z-10">
                <span className="px-3 py-1 rounded-md bg-white border border-gray-200 shadow-2xs font-medium text-gray-700 flex items-center gap-1.5">
                  <Presentation size={14} className="text-[#0284c7]" />
                  <span>Frame 01: Core Architecture</span>
                </span>
                <span className="text-xs text-gray-400">Slide Mode Enabled</span>
              </div>

              {/* Diagramming Nodes */}
              <div className="relative py-8 flex items-center justify-around">
                {/* Node 1 */}
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-md text-center max-w-[150px] rotate-[-2deg]">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                    01
                  </div>
                  <div className="font-bold text-xs text-black">Doc Input</div>
                  <div className="text-[10px] text-gray-500">Structured Notes</div>
                </div>

                {/* Connector Arrow */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-semibold text-[#0284c7] bg-white px-2 py-0.5 rounded border border-sky-100 shadow-2xs mb-1">
                    Auto-Convert
                  </span>
                  <div className="w-16 h-0.5 bg-[#0284c7] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#0284c7] rotate-45" />
                  </div>
                </div>

                {/* Node 2 */}
                <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-md text-center max-w-[150px] rotate-[2deg]">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4f46e5] flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                    02
                  </div>
                  <div className="font-bold text-xs text-black">Visual Canvas</div>
                  <div className="text-[10px] text-gray-500">Infinite Board</div>
                </div>
              </div>

              {/* Bottom Canvas Tools */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-black/[0.06] pt-3 z-10">
                <span>Freehand Pen, Connectors, Sticky Notes</span>
                <span className="text-[#0284c7] font-semibold">1-Click Presentation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 text-left">
            <div className="inline-flex items-center text-3xl sm:text-4xl font-bold tracking-tight text-black">
              <span className="font-kalam text-[#2563eb]">Draw</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-black leading-snug">
              and visualise with ease and creativity
            </h3>

            <p className="text-base sm:text-lg text-[#424149] leading-relaxed">
              Visualise your creativity with others. No constraints, limited only by your
              imagination. Frame your ideas into slides for an engaging Presentation.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed pt-2">
              Transform messy brainstorming sessions into structured slide decks. Export to SVG,
              PDF, or present directly with zero third-party software.
            </p>

            <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-[#2563eb] cursor-pointer hover:gap-3 transition-all">
              <span>Try Infinite Canvas</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* ================= 3. PLAN FEATURE ================= */}
        <div id="plan" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center text-3xl sm:text-4xl font-bold tracking-tight text-black">
              <span>Plan</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-black leading-snug">
              track, and collaborate efficiently
            </h3>

            <p className="text-base sm:text-lg text-[#424149] leading-relaxed">
              Stay on top of your workload and achieve more in less time.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed pt-2">
              Connect documents directly into relational database properties. Filter by tags,
              assignees, due dates, and switch between Kanban board and multi-column table views
              instantly.
            </p>

            <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-[#0284c7] cursor-pointer hover:gap-3 transition-all">
              <span>Explore relational databases</span>
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Database Kanban & Table Preview */}
            <div className="bg-[#fcfcfc] rounded-2xl border border-black/[0.1] shadow-card p-6 sm:p-8">
              {/* View Switcher Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePlanView("board")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activePlanView === "board"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:text-black"
                    }`}
                  >
                    <Kanban size={13} />
                    <span>Board View</span>
                  </button>
                  <button
                    onClick={() => setActivePlanView("table")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activePlanView === "table"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:text-black"
                    }`}
                  >
                    <TableIcon size={13} />
                    <span>Table View</span>
                  </button>
                </div>

                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Live Synced
                </span>
              </div>

              {/* Kanban Columns */}
              {activePlanView === "board" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {kanbanColumns.map((col, idx) => (
                    <div key={idx} className="bg-gray-50/80 rounded-xl p-3 border border-gray-200/60">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-800">{col.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500 font-semibold">
                          {col.items.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {col.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="bg-white p-2.5 rounded-lg border border-black/[0.06] shadow-2xs text-left hover:shadow-sm transition-shadow cursor-pointer"
                          >
                            <div className="text-xs font-medium text-black mb-1.5 leading-snug">
                              {item.title}
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                                {item.tag}
                              </span>
                              <span className="font-semibold text-[#0284c7]">
                                {item.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Table View Simulation */
                <div className="overflow-x-auto text-left text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 font-medium">
                        <th className="py-2 font-normal">Task Name</th>
                        <th className="py-2 font-normal">Status</th>
                        <th className="py-2 font-normal">Category</th>
                        <th className="py-2 font-normal">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2.5 font-medium text-black">
                          Define Nexio peer-to-peer sync protocol
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            To Do
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-500">Engineering</td>
                        <td className="py-2.5 text-red-500 font-medium">High</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-black">
                          Self-host Docker 1-click deployment
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-700">
                            In Progress
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-500">DevOps</td>
                        <td className="py-2.5 text-amber-500 font-medium">High</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-black">
                          Database Kanban & Table view live sync
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                            Done
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-500">Core</td>
                        <td className="py-2.5 text-emerald-600 font-medium">Done</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
