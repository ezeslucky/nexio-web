"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Layers,
  BookOpen,
  FileText,
  CheckSquare,
  Sparkles,
  Compass,
  Zap,
} from "lucide-react";

export default function TemplatesSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Productivity", "Planning", "Design", "Engineering"];

  const templates = [
    {
      title: "Digital Planner",
      desc: "Structured daily planner with time-blocking, task lists, and weekly review reflections.",
      category: "Productivity",
      icon: Calendar,
      color: "bg-sky-50 text-[#0284c7]",
      badge: "Popular",
    },
    {
      title: "Story Board",
      desc: "Visual sequence frames for product journeys, video scripts, and pitch presentation slides.",
      category: "Design",
      icon: Layers,
      color: "bg-purple-50 text-purple-600",
      badge: "Canvas",
    },
    {
      title: "Cornell Notes",
      desc: "Proven academic & meeting method separating cues, detailed notes, and executive summaries.",
      category: "Productivity",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-600",
      badge: "Docs",
    },
    {
      title: "One Pager Brief",
      desc: "Clean executive summary layout for project kickoff, technical RFCs, and decision memos.",
      category: "Planning",
      icon: FileText,
      color: "bg-amber-50 text-amber-600",
      badge: "Docs",
    },
    {
      title: "Sprint Retrospective",
      desc: "Interactive whiteboard columns for what went well, what to improve, and action items.",
      category: "Engineering",
      icon: Zap,
      color: "bg-indigo-50 text-indigo-600",
      badge: "Canvas",
    },
    {
      title: "Travel & Offsite Itinerary",
      desc: "Multi-view schedule with embedded maps, hotel confirmations, budget tables, and packing lists.",
      category: "Planning",
      icon: Compass,
      color: "bg-rose-50 text-rose-600",
      badge: "Database",
    },
  ];

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section id="templates" className="py-20 md:py-32 bg-white">
      <div className="limit-container">
        {/* Title Row with Action Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-[#0284c7] uppercase tracking-wider mb-2 block">
              Curated Nexio Library
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight section-grad-title">
              Ready-to-Use Templates for Any Project
            </h2>
          </div>

          <a
            href="#download"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0284c7] to-[#2563eb] text-white text-sm font-semibold hover:opacity-95 transition-all shadow-sm hover:shadow shrink-0 w-fit"
          >
            <span>Find your ideal template now</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-black text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((t, idx) => {
            const IconComponent = t.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#fcfcfc] border border-black/[0.08] hover:border-black/20 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${t.color} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent size={22} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-black mb-2 tracking-tight group-hover:text-[#0284c7] transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#424149] leading-relaxed mb-6">
                    {t.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] text-xs font-semibold text-gray-500 group-hover:text-[#0284c7] transition-colors">
                  <span>Use template</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
