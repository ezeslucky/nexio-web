"use client";

import React from "react";
import { ArrowRight, Github, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onOpenDemo?: () => void;
}

export default function FinalCTA({ onOpenDemo }: FinalCTAProps) {
  return (
    <section className="py-24 md:py-36 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      {/* Radiant Atmospheric Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-indigo-600/20 via-violet-600/10 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-fine-dots opacity-30 pointer-events-none" />

      <div className="strand-container relative z-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-[#181614] border border-[#292524] text-xs font-mono text-[#a6a09b]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Open Source &amp; Self-Hostable · Apache 2.0</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#fafaf9] leading-[1.12] mb-6">
            Give your ideas room to become{" "}
            <span className="text-gradient-violet">something bigger.</span>
          </h2>

          {/* Supporting Text */}
          <p className="max-w-xl text-base sm:text-lg md:text-xl text-[#a6a09b] leading-relaxed mb-10">
            Bring your knowledge, creative thinking, and AI workflows into one connected workspace.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform active:scale-98"
            >
              <span>Get Started with Nexio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/ezeslucky/nexio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-[#fafaf9] bg-[#141210] hover:bg-[#1c1917] border border-[#292524] hover:border-[#44403c] transition-all"
            >
              <Github className="w-4 h-4 text-[#a6a09b]" />
              <span>Explore the Source</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
