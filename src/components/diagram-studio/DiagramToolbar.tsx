"use client";

import React, { useState } from "react";
import {
  MousePointer,
  Hand,
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Undo2,
  Redo2,
  LayoutGrid,
  Code2,
  Sparkles,
  Layers,
  Share2,
  Download,
  Activity,
  ArrowRight,
  Database,
  Cpu,
  Route,
  Zap,
  Lock,
  GitBranch,
} from "lucide-react";
import { NodeCategory } from "@/types/diagram";

interface DiagramToolbarProps {
  toolMode: "select" | "pan" | "connect";
  setToolMode: (mode: "select" | "pan" | "connect") => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onResetZoom: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onAutoLayout: (direction: "LR" | "TB") => void;
  isCodeOpen: boolean;
  onToggleCode: () => void;
  isAIOpen: boolean;
  onToggleAI: () => void;
  isLayersOpen: boolean;
  onToggleLayers: () => void;
  onOpenArchMap: () => void;
  onOpenExport: () => void;
  onAddNode: (category: NodeCategory) => void;
  snapToGrid: boolean;
  onToggleSnap: () => void;
}

export default function DiagramToolbar({
  toolMode,
  setToolMode,
  zoom,
  onZoomIn,
  onZoomOut,
  onFitView,
  onResetZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onAutoLayout,
  isCodeOpen,
  onToggleCode,
  isAIOpen,
  onToggleAI,
  isLayersOpen,
  onToggleLayers,
  onOpenArchMap,
  onOpenExport,
  onAddNode,
  snapToGrid,
  onToggleSnap,
}: DiagramToolbarProps) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  const nodeTypes: Array<{ category: NodeCategory; label: string; icon: React.ElementType; color: string }> = [
    { category: "service", label: "Microservice", icon: Cpu, color: "text-indigo-400" },
    { category: "database", label: "Database", icon: Database, color: "text-emerald-400" },
    { category: "gateway", label: "API Gateway", icon: Route, color: "text-violet-400" },
    { category: "messaging", label: "Message Queue", icon: Layers, color: "text-rose-400" },
    { category: "ai", label: "AI Model", icon: Sparkles, color: "text-cyan-400" },
    { category: "client", label: "Client App", icon: Zap, color: "text-amber-400" },
    { category: "security", label: "Auth / Firewall", icon: Lock, color: "text-blue-400" },
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#141210]/95 border border-[#292524] shadow-2xl backdrop-blur-xl">
      {/* Mode Selectors */}
      <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#292524]">
        <button
          onClick={() => setToolMode("select")}
          className={`p-2 rounded-xl transition-all ${
            toolMode === "select"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19]"
          }`}
          title="Select / Move tool (V)"
        >
          <MousePointer className="w-4 h-4" />
        </button>
        <button
          onClick={() => setToolMode("pan")}
          className={`p-2 rounded-xl transition-all ${
            toolMode === "pan"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19]"
          }`}
          title="Pan / Hand tool (H)"
        >
          <Hand className="w-4 h-4" />
        </button>
      </div>

      {/* Add Component Menu */}
      <div className="relative">
        <button
          onClick={() => setAddMenuOpen(!addMenuOpen)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Node</span>
        </button>

        {addMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 p-1.5 bg-[#141210] border border-[#292524] rounded-xl shadow-2xl backdrop-blur-xl grid gap-0.5 z-50">
            {nodeTypes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.category}
                  onClick={() => {
                    onAddNode(item.category);
                    setAddMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full p-2 rounded-lg text-left text-xs text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Auto-Layout */}
      <div className="flex items-center gap-0.5 pl-1 pr-1.5 border-r border-[#292524]">
        <button
          onClick={() => onAutoLayout("LR")}
          className="flex items-center gap-1 px-2 py-1.5 text-xs text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] rounded-xl transition-colors"
          title="Auto-Layout Hierarchical (Left to Right)"
        >
          <GitBranch className="w-3.5 h-3.5 rotate-90" />
          <span className="hidden sm:inline">Auto Layout</span>
        </button>
        <button
          onClick={onToggleSnap}
          className={`p-2 rounded-xl transition-colors ${
            snapToGrid
              ? "text-indigo-400 bg-indigo-500/10"
              : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19]"
          }`}
          title={snapToGrid ? "Snap to Grid: ON" : "Snap to Grid: OFF"}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>

      {/* History (Undo / Redo) */}
      <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#292524]">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-xl transition-colors ${
            canUndo
              ? "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19]"
              : "text-[#44403c] cursor-not-allowed"
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded-xl transition-colors ${
            canRedo
              ? "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19]"
              : "text-[#44403c] cursor-not-allowed"
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-1 pr-1.5 border-r border-[#292524]">
        <button
          onClick={onZoomOut}
          className="p-2 rounded-xl text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={onResetZoom}
          className="text-[11px] font-mono px-1.5 py-1 text-[#fafaf9] hover:bg-[#1f1c19] rounded-lg min-w-[42px] text-center"
          title="Reset Zoom to 100%"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={onZoomIn}
          className="p-2 rounded-xl text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={onFitView}
          className="p-2 rounded-xl text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
          title="Fit to Screen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Modals & Toggles */}
      <div className="flex items-center gap-1">
        {/* Architecture Map & Blast Radius */}
        <button
          onClick={onOpenArchMap}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors"
          title="Open Architecture Map & Blast Radius Simulator"
        >
          <Activity className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Arch Map</span>
        </button>

        {/* Diagram as Code */}
        <button
          onClick={onToggleCode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            isCodeOpen
              ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
              : "bg-[#161412] border-[#292524] text-[#a6a09b] hover:text-[#fafaf9]"
          }`}
          title="Toggle Code View (Diagram-as-Code)"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Code</span>
        </button>

        {/* AI Assistant */}
        <button
          onClick={onToggleAI}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            isAIOpen
              ? "bg-violet-600/20 border-violet-500/50 text-violet-300"
              : "bg-[#161412] border-[#292524] text-[#a6a09b] hover:text-[#fafaf9]"
          }`}
          title="Toggle AI Architecture Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="hidden sm:inline">AI Studio</span>
        </button>

        {/* Layers */}
        <button
          onClick={onToggleLayers}
          className={`p-2 rounded-xl border transition-colors ${
            isLayersOpen
              ? "bg-cyan-600/20 border-cyan-500/50 text-cyan-300"
              : "bg-[#161412] border-[#292524] text-[#a6a09b] hover:text-[#fafaf9]"
          }`}
          title="Toggle Layers Panel"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Export & Share */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-medium shadow-lg shadow-indigo-600/30 transition-all ml-1"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}

