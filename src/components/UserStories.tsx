"use client";

import React from "react";
import { Star, Quote, ArrowRight } from "lucide-react";

export default function UserStories() {
  const stories = [
    {
      name: "Dan Charles",
      role: "CTO - Keyman Technology",
      initials: "DC",
      color: "bg-sky-600",
      quote:
        "Nexio replaced both Notion and Miro for our engineering teams. Being able to write technical specs and seamlessly expand them into an infinite system diagram on one screen is a game changer.",
    },
    {
      name: "Sophia Cheng",
      role: "Lead Product Manager",
      initials: "SC",
      color: "bg-blue-600",
      quote:
        "The zero-latency local-first speed is unmatched. No laggy web spinners during sprint kickoffs or customer demos. Everything feels instantaneous.",
    },
    {
      name: "Marcus Vance",
      role: "Principal Systems Architect",
      initials: "MV",
      color: "bg-indigo-600",
      quote:
        "The combination of structured Markdown and spatial canvas gave us the exact tooling we needed for complex RFC reviews. Framing canvas sections into presentation slides saves us days.",
    },
    {
      name: "Elena Rostova",
      role: "Staff DevOps Engineer",
      initials: "ER",
      color: "bg-emerald-600",
      quote:
        "Nexio's open-core architecture and clean Docker self-hosting solved our strict data governance requirements. Setting up the on-premise cluster took 10 minutes.",
    },
    {
      name: "Liam Sterling",
      role: "Senior Tech Lead",
      initials: "LS",
      color: "bg-amber-600",
      quote:
        "The AI Copilot synthesizes dense meeting notes and complex requirements into structured mind maps and relational task tables without any hallucinations.",
    },
    {
      name: "Maya Patel",
      role: "Director of Product Design",
      initials: "MP",
      color: "bg-rose-600",
      quote:
        "We draft design guidelines in docs, visually map user flows on canvas, and track component sprints in relational tables. Nexio unified our entire design workflow.",
    },
    {
      name: "Jonathan Ross",
      role: "Founding Engineer",
      initials: "JR",
      color: "bg-cyan-600",
      quote:
        "Having true local-first SQLite persistence on my MacBook means I can code and architect uninterrupted during cross-country flights with zero degradation.",
    },
    {
      name: "Sarah Lin",
      role: "VP of Engineering",
      initials: "SL",
      color: "bg-purple-600",
      quote:
        "Our engineering organization eliminated 4 fragmented single-purpose subscriptions and consolidated everything into Nexio. Our developer velocity skyrocketed.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#f8f8f7]">
      <div className="limit-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider mb-2 block">
            Community Love
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight section-grad-title leading-tight">
            Loved by teams building the future with{" "}
            <span className="text-[#0284c7]">Nexio</span>
          </h2>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* User Meta Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full ${story.color} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}
                  >
                    {story.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-black truncate group-hover:text-[#0284c7] transition-colors">
                      {story.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate">{story.role}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#424149] leading-relaxed font-normal">
                  "{story.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/[0.04] text-[11px] text-gray-400 flex items-center justify-between">
                <span>Verified User</span>
                <span className="text-emerald-600 font-medium">✓ Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
