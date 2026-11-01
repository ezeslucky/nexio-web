"use client";

import React from "react";
import {
  DiagramNode,
  PortPosition,
} from "@/types/diagram";
import {
  Smartphone,
  ShieldCheck,
  Route,
  Lock,
  Users,
  CreditCard,
  ShoppingCart,
  Sparkles,
  Database,
  Layers,
  Zap,
  Cpu,
  Globe,
  Package,
  Server,
  Key,
  HardDrive,
  Laptop,
  Box,
  AlertTriangle,
  Search,
  Send,
  GitCommit,
  CheckCircle2,
  Activity,
} from "lucide-react";

interface DiagramNodeViewProps {
  node: DiagramNode;
  isSelected: boolean;
  isConnectingSource?: boolean;
  isImpactedByBlastRadius?: boolean;
  isFailureSource?: boolean;
  onSelect: (nodeId: string, multiSelect?: boolean) => void;
  onStartConnect: (nodeId: string, handle: PortPosition, e: React.MouseEvent) => void;
  onDoubleClick: (node: DiagramNode) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Smartphone,
  ShieldCheck,
  Route,
  Lock,
  Users,
  CreditCard,
  ShoppingCart,
  Sparkles,
  Database,
  Layers,
  Zap,
  Cpu,
  Globe,
  Package,
  Server,
  Key,
  HardDrive,
  Laptop,
  Box,
  AlertTriangle,
  Search,
  Send,
  GitCommit,
  CheckCircle2,
};

const COLOR_CLASSES: Record<
  string,
  { bg: string; border: string; glow: string; text: string; badge: string }
> = {
  indigo: {
    bg: "bg-[#141424]",
    border: "border-indigo-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)]",
    text: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  },
  violet: {
    bg: "bg-[#181226]",
    border: "border-violet-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]",
    text: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  emerald: {
    bg: "bg-[#0d1f19]",
    border: "border-emerald-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  cyan: {
    bg: "bg-[#0b1c24]",
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  rose: {
    bg: "bg-[#220d15]",
    border: "border-rose-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(244,63,94,0.25)]",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  amber: {
    bg: "bg-[#22170b]",
    border: "border-amber-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  blue: {
    bg: "bg-[#0e172a]",
    border: "border-blue-500/40",
    glow: "shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)]",
    text: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  slate: {
    bg: "bg-[#18181b]",
    border: "border-zinc-700",
    glow: "shadow-none",
    text: "text-zinc-400",
    badge: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
};

export default function DiagramNodeView({
  node,
  isSelected,
  isConnectingSource,
  isImpactedByBlastRadius,
  isFailureSource,
  onSelect,
  onStartConnect,
  onDoubleClick,
}: DiagramNodeViewProps) {
  const colorScheme = COLOR_CLASSES[node.color] || COLOR_CLASSES.indigo;
  const IconComponent = (node.icon && ICON_MAP[node.icon]) || Box;

  // Handles
  const handles: PortPosition[] = ["top", "right", "bottom", "left"];

  const handlePositions: Record<PortPosition, string> = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    left: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      id={`node-view-${node.id}`}
      style={{
        transform: `translate(${node.x}px, ${node.y}px)`,
        width: `${node.width}px`,
        minHeight: `${node.height}px`,
      }}
      className={`absolute group select-none cursor-move transition-shadow duration-150 rounded-xl border backdrop-blur-md ${
        colorScheme.bg
      } ${
        isFailureSource
          ? "border-rose-500 ring-4 ring-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.6)] animate-pulse"
          : isImpactedByBlastRadius
          ? "border-amber-500 ring-2 ring-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
          : isSelected
          ? "border-white ring-2 ring-indigo-500 shadow-2xl scale-[1.01]"
          : `${colorScheme.border} hover:border-[#fafaf9]/60 ${colorScheme.glow}`
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id, e.shiftKey || e.metaKey);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(node);
      }}
    >
      {/* Interactive connection handles (hover to reveal) */}
      {handles.map((h) => (
        <div
          key={h}
          className={`absolute ${handlePositions[h]} w-3.5 h-3.5 rounded-full bg-[#181614] border-2 border-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-crosshair z-30 hover:scale-125 hover:bg-indigo-500 hover:border-white`}
          title={`Connect from ${h}`}
          onMouseDown={(e) => {
            e.stopPropagation();
            onStartConnect(node.id, h, e);
          }}
        />
      ))}

      {/* Main Node Content */}
      <div className="p-3.5">
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg border bg-[#141210] ${colorScheme.badge}`}
            >
              <IconComponent className={`w-4 h-4 ${colorScheme.text}`} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#fafaf9] tracking-tight line-clamp-1">
                {node.title}
              </div>
              {node.subtitle && (
                <div className="text-[11px] text-[#a6a09b] line-clamp-1 leading-tight">
                  {node.subtitle}
                </div>
              )}
            </div>
          </div>

          {/* Category Badge */}
          <span
            className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded border ${colorScheme.badge}`}
          >
            {node.category}
          </span>
        </div>

        {/* Technology Tag or Metrics Row */}
        {(node.technology || node.metrics) && (
          <div className="pt-2 mt-2 border-t border-[#292524]/60 flex items-center justify-between text-[10px] font-mono text-[#a6a09b]">
            <span className="truncate">{node.technology || "Generic"}</span>
            {node.metrics?.latency && (
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {node.metrics.latency}
              </span>
            )}
          </div>
        )}

        {/* ERD Attributes View (if ERD node) */}
        {node.erdAttributes && node.erdAttributes.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-[#292524] space-y-1">
            {node.erdAttributes.map((attr, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] font-mono py-0.5 px-1 rounded hover:bg-white/5"
              >
                <div className="flex items-center gap-1.5">
                  {attr.isPk && (
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1 rounded border border-amber-500/20">
                      PK
                    </span>
                  )}
                  {attr.isFk && (
                    <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-1 rounded border border-cyan-500/20">
                      FK
                    </span>
                  )}
                  <span
                    className={
                      attr.isPk
                        ? "text-amber-200 font-semibold"
                        : "text-[#fafaf9]"
                    }
                  >
                    {attr.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#78716c]">{attr.type}</span>
              </div>
            ))}
          </div>
        )}

        {/* UML Members View (if UML node) */}
        {node.umlMembers && node.umlMembers.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-[#292524] space-y-1">
            {node.umlMembers.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-[11px] font-mono py-0.5 px-1 rounded hover:bg-white/5 text-[#d4d4d8]"
              >
                <span
                  className={
                    m.visibility === "+"
                      ? "text-emerald-400 font-bold"
                      : "text-rose-400 font-bold"
                  }
                >
                  {m.visibility}
                </span>
                <span className={m.isMethod ? "italic text-cyan-300" : ""}>
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blast Radius Warning Pill */}
      {isFailureSource && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold tracking-wider uppercase shadow-lg">
          Simulation Source
        </div>
      )}
      {isImpactedByBlastRadius && !isFailureSource && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-black font-mono text-[9px] font-bold tracking-wider uppercase shadow-lg">
          Cascaded Outage
        </div>
      )}
    </div>
  );
}

