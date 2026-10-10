"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Scale,
  Compass,
  ChevronDown,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function KnowledgeBaseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guides = [
    {
      title: "Knowledge base software guide",
      desc: "Learn how to evaluate modern knowledge tools for governance, AI, security, and team collaboration.",
      icon: BookOpen,
      href: "#guide",
    },
    {
      title: "Best knowledge base tools comparison",
      desc: "Compare Nexio with legacy wikis, Notion, Miro, and single-purpose documentation tools.",
      icon: Scale,
      href: "#compare",
    },
    {
      title: "Local-first architecture fundamentals",
      desc: "Understand CRDTs, offline-first reliability, SQLite caching, and peer-to-peer data sovereignty.",
      icon: Compass,
      href: "#fundamentals",
    },
  ];

  const faqs = [
    {
      q: "What is Nexio?",
      a: "Nexio is the local-first, privacy-focused workspace combining docs, whiteboards, databases, and AI in one ultra-fast canvas that serves as an autonomous team knowledge base.",
    },
    {
      q: "Can Nexio be used as a team knowledge base?",
      a: "Yes. Teams use Nexio to build internal engineering wikis, organize product roadmaps, document architectural decisions, map systems visually, and keep related knowledge unified.",
    },
    {
      q: "How is Nexio different from single-purpose wiki or whiteboard tools?",
      a: "Nexio eliminates tool hopping by providing a fused environment where structured documents, infinite visual whiteboards, and relational databases operate on the exact same underlying data blocks without copying or context loss.",
    },
    {
      q: "Does Nexio support local-first offline workflows?",
      a: "Yes. Nexio is architected around local-first storage with automatic CRDT conflict resolution. You can create and edit completely offline with zero latency, and your changes sync peer-to-peer when reconnected.",
    },
    {
      q: "Can I self-host Nexio on our private cloud or servers?",
      a: "Absolutely! Nexio offers an open-core architecture with production-ready Docker containers and Helm charts. You can self-host Nexio freely on your private cloud with zero vendor lock-in.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#f8f8f7]">
      <div className="limit-container">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-white/80 border border-black/[0.08] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Knowledge Base Copy & Guides */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider mb-2 block">
                  Knowledge Base Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight section-grad-title leading-snug">
                  Build an open, connected knowledge base with Nexio
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#424149] leading-relaxed">
                Nexio is modern knowledge base software that unites docs, whiteboards, databases,
                and AI in one local-first workspace. Teams and creators use Nexio to build
                connected knowledge bases, plan roadmaps, visualize systems, and keep full
                control of their data.
              </p>

              {/* Resource Links */}
              <div className="pt-2 space-y-3">
                {guides.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <a
                      key={i}
                      href={g.href}
                      className="group p-4 rounded-xl bg-gray-50/70 border border-gray-200/60 hover:bg-white hover:border-[#0284c7]/40 hover:shadow-sm transition-all duration-200 flex items-start gap-3.5"
                    >
                      <div className="p-2 rounded-lg bg-white border border-gray-200 text-[#0284c7] shrink-0 group-hover:scale-105 transition-transform">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-black flex items-center justify-between group-hover:text-[#0284c7] transition-colors">
                          <span>{g.title}</span>
                          <ArrowRight
                            size={14}
                            className="text-gray-400 group-hover:translate-x-1 group-hover:text-[#0284c7] transition-all"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {g.desc}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive FAQ Accordions */}
            <div className="lg:col-span-6 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                <HelpCircle size={15} />
                <span>Frequently Asked Questions</span>
              </div>

              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-black/[0.08] bg-white overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-black hover:text-[#0284c7] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#0284c7]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#424149] leading-relaxed border-t border-black/[0.04] pt-3 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
