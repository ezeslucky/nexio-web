"use client";

import React, { useState } from "react";
import { DiagramNode, DiagramGroup, DiagramEdge } from "@/types/diagram";
import {
  Layers,
  X,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ChevronRight,
  Folder,
  Box,
  Share2,
} from "lucide-react";

interface DiagramLayersPanelProps {
  nodes: DiagramNode[];
  groups: DiagramGroup[];
  edges: DiagramEdge[];
  selectedNodeIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onToggleLock: (nodeId: string) => void;
  onToggleHide: (nodeId: string) => void;
}

export default function DiagramLayersPanel({
  nodes,
  groups,
  edges,
  selectedNodeIds,
  isOpen,
  onClose,
  onSelectNode,
  onToggleLock,
  onToggleHide,
}: DiagramLayersPanelProps) {
  const [filter, setFilter] = useState("");

  if (!isOpen) return null;

  const filteredNodes = nodes.filter(
    (n) =>
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      n.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="absolute top-20 left-4 bottom-8 w-72 z-30 flex flex-col rounded-2xl bg-[#141210]/95 border border-[#292524] shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-left-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#292524] bg-[#161412]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-[#fafaf9]">Layers &amp; Elements</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter search */}
      <div className="p-2.5 border-b border-[#292524] bg-[#0c0a09]">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter layers..."
          className="w-full bg-[#141210] border border-[#292524] rounded-lg px-2.5 py-1 text-xs text-[#fafaf9] placeholder-[#78716c] focus:outline-none"
        />
      </div>

      {/* Layers Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
        {/* Groups */}
        {groups.map((g) => (
          <div key={g.id} className="mb-2">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#181614] text-[#a6a09b] font-medium text-[11px]">
              <Folder className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate flex-1">{g.title}</span>
              <span className="text-[10px] font-mono text-[#78716c]">
                {g.childrenNodeIds.length}
              </span>
            </div>
          </div>
        ))}

        {/* Nodes */}
        <div className="text-[10px] font-mono uppercase text-[#78716c] px-2 py-1 tracking-wider">
          Components ({filteredNodes.length})
        </div>

        {filteredNodes.map((n) => {
          const isSelected = selectedNodeIds.includes(n.id);
          return (
            <div
              key={n.id}
              onClick={() => onSelectNode(n.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? "bg-indigo-600/20 text-white border border-indigo-500/40"
                  : "text-[#d4d4d8] hover:bg-[#1f1c19]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Box className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">{n.title}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onToggleLock(n.id)}
                  className={`p-1 rounded hover:bg-white/10 ${
                    n.locked ? "text-amber-400" : "text-[#78716c]"
                  }`}
                  title={n.locked ? "Unlock component" : "Lock component"}
                >
                  {n.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => onToggleHide(n.id)}
                  className={`p-1 rounded hover:bg-white/10 ${
                    n.hidden ? "text-rose-400" : "text-[#78716c]"
                  }`}
                  title={n.hidden ? "Show component" : "Hide component"}
                >
                  {n.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}

        {/* Edges Summary */}
        <div className="pt-3 text-[10px] font-mono uppercase text-[#78716c] px-2 py-1 tracking-wider">
          Connections ({edges.length})
        </div>
        {edges.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-2 p-1.5 rounded text-[11px] text-[#a6a09b]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="truncate">{e.label || `${e.source} → ${e.target}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

