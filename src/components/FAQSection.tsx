"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes Nexio different from fragmented tools like Notion, Miro, or n8n?",
      a: "Instead of forcing you to jump between separate apps for writing docs, drawing whiteboards, organizing databases, and building automations, Nexio combines them on a single infinite canvas. A paragraph in a document can be detached onto the whiteboard, grouped into a slide, or fed directly into an AI workflow without exporting or context switching.",
    },
    {
      q: "How does the local-first architecture work when offline?",
      a: "All documents, databases, and canvases are stored locally in an embedded SQLite database on your machine. Reads and writes take less than 1 millisecond. When you collaborate with others or connect to the network, Yjs Conflict-Free Replicated Data Types (CRDTs) automatically reconcile changes in the background without sync conflicts.",
    },
    {
      q: "Can I run private local AI models like Ollama or vLLM?",
      a: "Yes. Nexio supports both hosted providers (OpenAI, Anthropic Claude 3.5, Fal AI) and 100% private local LLM endpoints via Ollama, LM Studio, or vLLM. Your sensitive documents and proprietary codebase never need to leave your local network.",
    },
    {
      q: "Is Nexio truly open source and self-hostable?",
      a: "Yes. Nexio is licensed under the Apache 2.0 open source license. You can spin up a self-hosted instance using a single Docker command with zero cloud dependencies or vendor telemetry.",
    },
    {
      q: "How do node-based automations interact with my canvas?",
      a: "Nexio workflows have direct programmatic access to the canvas DOM. A node can ingest an incoming webhook, summarize the payload with an LLM, and directly spawn a visual sticky note, append a row to a database, or render a presentation slide in real time.",
    },
    {
      q: "Can I import existing notes from Notion, Obsidian, or Markdown?",
      a: "Yes. Nexio provides 1-click importers for Notion ZIP exports, Markdown folders, and CSV files, preserving nested hierarchies, links, and relational properties.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-indigo-500" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            Everything you need to know.
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Have questions about data ownership, offline performance, or workflow limits? Find answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#141210] border border-[#292524] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#fafaf9]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#a6a09b] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#a6a09b] leading-relaxed border-t border-[#292524]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
