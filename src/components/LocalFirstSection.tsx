"use client";

import React, { useState } from "react";
import {
  HardDrive,
  Users,
  WifiOff,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  MousePointer2,
} from "lucide-react";

export default function LocalFirstSection() {
  const [offlineSimulated, setOfflineSimulated] = useState(false);

  return (
    <section id="local-first" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-emerald-400" />
            DATA SOVEREIGNTY &amp; COLLABORATION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            Your workspace.{" "}
            <span className="text-gradient-primary">Your data.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Work locally, stay productive offline, and collaborate when you choose. Nexio is designed to give you control over your information without sacrificing a modern workspace experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Local-First Architecture & Offline Demo (Col 1-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#141210] border border-[#292524] flex flex-col justify-between shadow-card">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#292524]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#fafaf9]">Local-First Storage Engine</h3>
                    <p className="text-xs text-[#a6a09b]">Powered by embedded SQLite &amp; Yjs CRDTs</p>
                  </div>
                </div>

                {/* Offline Simulation Toggle */}
                <button
                  onClick={() => setOfflineSimulated(!offlineSimulated)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                    offlineSimulated
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-[#1c1917] text-[#a6a09b] border border-[#292524] hover:text-[#fafaf9]"
                  }`}
                >
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>{offlineSimulated ? "Simulating Airplane Mode" : "Go Offline (Test)"}</span>
                </button>
              </div>

              {/* Architecture Graphic */}
              <div className="p-5 rounded-xl bg-[#0c0a09] border border-[#292524] mb-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#a6a09b]">Local Database State:</span>
                  <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {offlineSimulated ? "Offline (Zero Disruption)" : "Local SSD Active"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#141210] border border-[#292524] text-center">
                    <div className="text-[10px] font-mono text-[#78716c]">Read / Write Latency</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">0.2 ms</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141210] border border-[#292524] text-center">
                    <div className="text-[10px] font-mono text-[#78716c]">Sync Conflict Risk</div>
                    <div className="text-sm font-bold text-[#fafaf9] font-mono mt-0.5">0% (CRDT)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141210] border border-[#292524] text-center">
                    <div className="text-[10px] font-mono text-[#78716c]">Data Location</div>
                    <div className="text-sm font-bold text-indigo-400 font-mono mt-0.5">Your Disk</div>
                  </div>
                </div>

                {offlineSimulated && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>You are offline. Editing, creating documents, and executing local AI models continue with zero latency.</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-[#a6a09b]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No SaaS vendor holds your private notes hostage behind a paywall</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Export anytime to pure Markdown, SQLite, or raw JSON</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Real-Time Multiplayer Collaboration (Col 8-12) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#141210] border border-[#292524] flex flex-col justify-between shadow-card">
            <div>
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#292524]">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#fafaf9]">Real-Time Team Sync</h3>
                  <p className="text-xs text-[#a6a09b]">Peer-to-peer or self-hosted relay</p>
                </div>
              </div>

              {/* Multiplayer Canvas Cursors Simulation */}
              <div className="p-5 rounded-xl bg-[#0c0a09] border border-[#292524] relative min-h-[190px] overflow-hidden mb-6">
                <div className="text-xs font-mono text-[#78716c] mb-2">Live Canvas Session:</div>

                {/* Simulated Paragraph */}
                <p className="text-xs text-[#fafaf9] leading-relaxed">
                  &quot;The distributed node system allows team members to co-author workflows and spatial maps simultaneously with conflict-free merges.&quot;
                </p>

                {/* Cursor 1: Elena */}
                <div className="absolute top-12 left-10 flex items-center gap-1 animate-pulse">
                  <MousePointer2 className="w-3.5 h-3.5 text-violet-400 fill-violet-400" />
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-violet-600 text-white shadow-sm">
                    Elena (AI Lead)
                  </span>
                </div>

                {/* Cursor 2: Marcus */}
                <div className="absolute bottom-8 right-12 flex items-center gap-1">
                  <MousePointer2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-600 text-white shadow-sm">
                    Marcus (Design)
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#a6a09b]">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>End-to-end encrypted synchronization keys</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-400" />
                  <span>Automatic background reconciliation upon reconnecting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
