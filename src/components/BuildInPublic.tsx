"use client";

import React from "react";
import {
  Github,
  GitPullRequest,
  CheckCircle2,
  Users,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Code2,
} from "lucide-react";

export default function BuildInPublic() {
  return (
    <section id="build-in-public" className="py-20 md:py-32 bg-white">
      <div className="limit-container flex flex-col items-center text-center">
        {/* Eyebrow & Titles */}
        <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider mb-2">
          Transparency & Open Source
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight section-grad-title mb-3">
          Nexio builds transparently in public
        </h2>
        <h3 className="text-xl sm:text-2xl text-gray-700 font-medium mb-14 tracking-tight">
          Open-Source Core for Trust, Extensibility, and Collaboration
        </h3>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full text-left">
          {/* Card 1: GitHub Issues & Repos (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#fcfcfc] border border-black/[0.08] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Github size={20} className="text-black" />
                <span className="font-bold text-base text-black">nexio-labs/nexio</span>
              </div>
              <p className="text-sm text-[#424149] leading-relaxed mb-6">
                We foster developer trust and enable engineering teams worldwide to contribute
                and extend Nexio. 100% visible roadmap, public RFCs, and open issue tracking.
              </p>
            </div>

            {/* GitHub Issues Browser Mockup */}
            <div className="rounded-xl bg-white border border-black/[0.08] shadow-sm overflow-hidden text-xs">
              {/* Browser Address Header */}
              <div className="px-4 py-2.5 bg-gray-50 border-b border-black/[0.06] flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 text-center font-mono text-[11px] text-gray-500 bg-white px-3 py-0.5 rounded border border-gray-200">
                  github.com/nexio-labs/nexio/issues
                </div>
              </div>

              {/* Sample Open Issues List */}
              <div className="p-3 divide-y divide-gray-100">
                <div className="py-2 flex items-start gap-2">
                  <GitPullRequest size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-medium text-black">
                      feat(core): SQLite vector search embeddings for local neural copilot
                    </span>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      #3412 opened by core maintainer · 38 comments
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                    merged
                  </span>
                </div>

                <div className="py-2 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-medium text-black">
                      perf(canvas): 120 FPS hardware accelerated rendering on infinite canvas
                    </span>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      #3428 closed · 19 comments
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold">
                    resolved
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-black">★ 52,000+ GitHub Stars</span>
              <a
                href="https://github.com/nexio-labs/nexio"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0284c7] flex items-center gap-1 hover:underline"
              >
                <span>View Repository</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Card 2 & 3 (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Card 2: Dual License / Fair Model */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#fcfcfc] border border-black/[0.08] shadow-card flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-lg font-bold text-black mb-1.5">
                  Free for Individuals & Self-Hosters
                </h4>
                <p className="text-xs sm:text-sm text-[#424149] leading-relaxed">
                  MIT-licensed editor core. Self-host free on your own infrastructure without any
                  artificial feature paywalls or cloud lock-in.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>Zero Vendor Lock-in</span>
                <span>Self-Host Ready</span>
              </div>
            </div>

            {/* Card 3: Community Engagement */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#fcfcfc] border border-black/[0.08] shadow-card flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Users size={20} />
                </div>
                <h4 className="text-lg font-bold text-black mb-1.5">
                  Vibrant Global Developer Community
                </h4>
                <p className="text-xs sm:text-sm text-[#424149] leading-relaxed">
                  Join thousands of software engineers, researchers, and creators sharing
                  plugins, templates, and architectural insights.
                </p>
              </div>

              <a
                href="https://discord.gg/nexio"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:underline"
              >
                <span>Join our Discord (12k+ members)</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
