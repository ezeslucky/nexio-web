"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export default function MetricsTestimonials() {
  const stats = [
    {
      value: "16x",
      label: "Faster time-to-insight",
      description: "From raw meeting notes to connected canvas deliverables.",
    },
    {
      value: "6-in-1",
      label: "Consolidated tools",
      description: "Replaces disjointed Notion, Miro, Airtable, Pitch & n8n subscriptions.",
    },
    {
      value: "80%",
      label: "Less time switching tabs",
      description: "Keep all context in one spatial whiteboard & document space.",
    },
    {
      value: "4.8 hrs",
      label: "Saved per builder / week",
      description: "Through automated node workflows and multimodal AI canvas tasks.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Nexio replaced three separate subscriptions for our product team within 48 hours. The ability to write a spec doc, drag parts of it into a spatial architecture diagram, and trigger AI workflows is something no other tool can do.",
      name: "Marcus Vance",
      title: "VP of Product @ HyperScale AI",
      avatar: "MV",
      avatarBg: "bg-indigo-600",
    },
    {
      quote:
        "Our engineers were skeptical of another workspace until they realized it runs on local SQLite with zero latency and full offline support. Plus, writing custom TypeScript nodes for our internal pipelines took 15 minutes.",
      name: "Sophia Zhang",
      title: "Staff Infrastructure Engineer @ CloudCore",
      avatar: "SZ",
      avatarBg: "bg-cyan-600",
    },
    {
      quote:
        "Turning meeting transcripts directly into actionable Kanban boards and presentation decks on one infinite canvas has completely transformed our Monday sprint rituals.",
      name: "Julian Rivera",
      title: "Co-Founder & CTO @ VectorWorks",
      avatar: "JR",
      avatarBg: "bg-violet-600",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Metric Stats Banner */}
        <div className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-[#141210] border border-[#292524]">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1 sm:space-y-2 border-r border-[#292524] last:border-r-0 pr-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#fafaf9] font-mono tracking-tight text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#fafaf9]">{stat.label}</div>
                <p className="text-xs text-[#a6a09b] line-clamp-2 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-indigo-500" />
            TESTIMONIALS &amp; IMPACT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            Loved by technical builders &amp; fast-moving teams.
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            See how forward-thinking engineering organizations and product leaders build their knowledge operating systems on Nexio.
          </p>
        </div>

        {/* Testimonials 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-2xl bg-[#141210] border border-[#292524] hover:border-[#44403c] transition-all flex flex-col justify-between shadow-card hover:shadow-cardHover"
            >
              <div>
                <Quote className="w-6 h-6 text-indigo-500/40 mb-4" />
                <p className="text-sm text-[#fafaf9] leading-relaxed mb-6 font-normal">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#292524] flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${item.avatarBg} text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm`}
                >
                  {item.avatar}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#fafaf9]">{item.name}</div>
                  <div className="text-[11px] text-[#78716c]">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
