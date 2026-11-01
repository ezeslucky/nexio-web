"use client";

import React, { useState } from "react";
import { DiagramDocument, DiagramNode } from "@/types/diagram";
import { calculateBlastRadius } from "@/lib/diagram/ai-engine";
import {
  X,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Route,
  ShieldAlert,
  Radio,
} from "lucide-react";

interface ArchitectureMapModalProps {
  diagram: DiagramDocument;
  isOpen: boolean;
  onClose: () => void;
  onSimulateOutageOnCanvas: (sourceNodeId: string, impactedIds: string[]) => void;
}

export default function ArchitectureMapModal({
  diagram,
  isOpen,
  onClose,
  onSimulateOutageOnCanvas,
}: ArchitectureMapModalProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    diagram.nodes[0]?.id || ""
  );
  const [simulationActive, setSimulationActive] = useState(false);

  if (!isOpen) return null;

  const selectedNode = diagram.nodes.find((n) => n.id === selectedNodeId) || diagram.nodes[0];

  // Upstream callers (nodes that point to selectedNode)
  const upstreamEdges = diagram.edges.filter((e) => e.target === selectedNode?.id);
  const upstreamNodes = diagram.nodes.filter((n) =>
    upstreamEdges.some((e) => e.source === n.id)
  );

  // Downstream dependencies (nodes that selectedNode points to)
  const downstreamEdges = diagram.edges.filter((e) => e.source === selectedNode?.id);
  const downstreamNodes = diagram.nodes.filter((n) =>
    downstreamEdges.some((e) => e.target === n.id)
  );

  // Blast radius calculation
  const blastRadius = selectedNode
    ? calculateBlastRadius(diagram, selectedNode.id)
    : { impactedNodeIds: [], severelyDegradedNodeIds: [], operationalNodeIds: [], explanation: "" };

  const handleTriggerSimulation = () => {
    if (!selectedNode) return;
    setSimulationActive(true);
    onSimulateOutageOnCanvas(selectedNode.id, blastRadius.impactedNodeIds);
  };

  const handleClearSimulation = () => {
    setSimulationActive(false);
    onSimulateOutageOnCanvas("", []);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#292524] bg-[#161412]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#fafaf9]">
                Interactive Architecture Map &amp; Dependency Graph
              </h2>
              <p className="text-xs text-[#a6a09b]">
                Deep component dependency tracing, protocol matrix &amp; blast-radius outage simulator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main 2-column layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden text-xs">
          {/* Left Column: Component List */}
          <div className="border-r border-[#292524] bg-[#0c0a09]/50 overflow-y-auto p-3 space-y-1">
            <div className="text-[10px] font-mono text-[#78716c] uppercase px-2 py-1 tracking-wider">
              System Components ({diagram.nodes.length})
            </div>
            {diagram.nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedNodeId(n.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                  n.id === selectedNode?.id
                    ? "bg-amber-500/15 border border-amber-500/40 text-[#fafaf9]"
                    : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#181614] border border-transparent"
                }`}
              >
                <div className="truncate pr-2">
                  <div className="font-medium text-xs truncate">{n.title}</div>
                  <div className="text-[10px] text-[#78716c] truncate">
                    {n.technology || n.category}
                  </div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#181614] border border-[#292524] text-[#a6a09b]">
                  {n.category}
                </span>
              </button>
            ))}
          </div>

          {/* Right 2 Columns: Detailed Inspection & Blast Radius */}
          <div className="md:col-span-2 overflow-y-auto p-5 space-y-6">
            {selectedNode && (
              <>
                {/* Component Overview Banner */}
                <div className="p-4 rounded-xl bg-[#181614] border border-[#292524] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-base font-semibold text-[#fafaf9]">
                        {selectedNode.title}
                      </div>
                      <div className="text-xs text-[#a6a09b]">
                        {selectedNode.subtitle || "System node"}
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {selectedNode.technology || "Standard Component"}
                    </span>
                  </div>

                  {selectedNode.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#292524] text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-[#78716c]">LATENCY</div>
                        <div className="text-emerald-400 font-semibold">
                          {selectedNode.metrics.latency || "2.1ms"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#78716c]">THROUGHPUT</div>
                        <div className="text-indigo-400 font-semibold">
                          {selectedNode.metrics.throughput || "1.4k req/s"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#78716c]">PORT</div>
                        <div className="text-[#fafaf9]">
                          {selectedNode.metrics.port || "443"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Blast-Radius Outage Simulation Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/20 to-amber-950/20 border border-rose-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span className="font-semibold text-xs text-rose-300">
                        Blast Radius Outage Simulator
                      </span>
                    </div>

                    {simulationActive ? (
                      <button
                        onClick={handleClearSimulation}
                        className="px-2.5 py-1 rounded-lg bg-[#201d1a] hover:bg-[#2b2723] text-xs text-[#fafaf9] transition-colors"
                      >
                        Reset Canvas
                      </button>
                    ) : (
                      <button
                        onClick={handleTriggerSimulation}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all shadow-md shadow-rose-600/30 flex items-center gap-1.5"
                      >
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span>Simulate Service Outage</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[#d4d4d8] leading-relaxed">
                    {blastRadius.explanation}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-black/40 border border-rose-500/20">
                      <div className="text-[10px] text-rose-400 font-mono">
                        DEGRADED UPSTREAM CALLERS
                      </div>
                      <div className="font-bold text-sm text-[#fafaf9]">
                        {blastRadius.severelyDegradedNodeIds.length} Nodes
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-emerald-500/20">
                      <div className="text-[10px] text-emerald-400 font-mono">
                        UNAFFECTED SERVICES
                      </div>
                      <div className="font-bold text-sm text-[#fafaf9]">
                        {blastRadius.operationalNodeIds.length} Nodes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upstream Callers & Downstream Dependencies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Upstream Callers */}
                  <div className="p-3.5 rounded-xl bg-[#181614] border border-[#292524]">
                    <div className="text-xs font-semibold text-[#fafaf9] mb-2 flex items-center justify-between">
                      <span>Upstream Callers (Inbound)</span>
                      <span className="text-[10px] font-mono text-indigo-400">
                        {upstreamNodes.length}
                      </span>
                    </div>
                    {upstreamNodes.length === 0 ? (
                      <div className="text-xs text-[#78716c] italic">
                        No inbound callers (Perimeter / Client)
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {upstreamNodes.map((un) => (
                          <div
                            key={un.id}
                            className="p-2 rounded-lg bg-[#141210] border border-[#292524] flex items-center justify-between"
                          >
                            <span className="text-[#fafaf9] font-medium">{un.title}</span>
                            <span className="text-[10px] text-[#78716c] font-mono">
                              {un.technology || "Service"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Downstream Dependencies */}
                  <div className="p-3.5 rounded-xl bg-[#181614] border border-[#292524]">
                    <div className="text-xs font-semibold text-[#fafaf9] mb-2 flex items-center justify-between">
                      <span>Downstream Dependencies (Outbound)</span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {downstreamNodes.length}
                      </span>
                    </div>
                    {downstreamNodes.length === 0 ? (
                      <div className="text-xs text-[#78716c] italic">
                        Terminal data store (No outbound calls)
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {downstreamNodes.map((dn) => (
                          <div
                            key={dn.id}
                            className="p-2 rounded-lg bg-[#141210] border border-[#292524] flex items-center justify-between"
                          >
                            <span className="text-[#fafaf9] font-medium">{dn.title}</span>
                            <span className="text-[10px] text-[#78716c] font-mono">
                              {dn.technology || "DB/Cache"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

