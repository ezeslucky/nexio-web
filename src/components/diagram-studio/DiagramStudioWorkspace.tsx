"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DiagramDocument,
  DiagramNode,
  DiagramEdge,
  DiagramType,
  NodeCategory,
} from "@/types/diagram";
import {
  loadAllDiagrams,
  saveDiagram,
  deleteDiagram,
  duplicateDiagram,
  commitDiagramVersion,
} from "@/lib/diagram/storage";
import { applyAutoLayout } from "@/lib/diagram/auto-layout";
import DiagramDashboard from "./DiagramDashboard";
import DiagramCanvas from "./DiagramCanvas";
import DiagramToolbar from "./DiagramToolbar";
import DiagramAIChat from "./DiagramAIChat";
import DiagramCodeEditor from "./DiagramCodeEditor";
import DiagramLayersPanel from "./DiagramLayersPanel";
import DiagramImportModal from "./DiagramImportModal";
import DiagramExportModal from "./DiagramExportModal";
import ArchitectureMapModal from "./ArchitectureMapModal";
import {
  ArrowLeft,
  Sparkles,
  Share2,
  Download,
  Code2,
  Layers,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function DiagramStudioWorkspace() {
  const [diagrams, setDiagrams] = useState<DiagramDocument[]>([]);
  const [activeDiagram, setActiveDiagram] = useState<DiagramDocument | null>(null);
  const [viewMode, setViewMode] = useState<"dashboard" | "editor">("dashboard");

  // Canvas View State
  const [toolMode, setToolMode] = useState<"select" | "pan" | "connect">("select");
  const [zoom, setZoom] = useState(1);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Panels & Modals
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isArchMapOpen, setIsArchMapOpen] = useState(false);

  // Undo / Redo History Stack
  const [historyStack, setHistoryStack] = useState<DiagramDocument[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Blast-Radius simulation highlights on canvas
  const [simulationSourceId, setSimulationSourceId] = useState<string>("");
  const [impactedNodeIds, setImpactedNodeIds] = useState<string[]>([]);

  // Load diagrams on mount
  useEffect(() => {
    const loaded = loadAllDiagrams();
    setDiagrams(loaded);

    // Check URL parameters for id
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get("id");
      if (urlId) {
        const found = loaded.find((d) => d.id === urlId);
        if (found) {
          setActiveDiagram(found);
          setViewMode("editor");
          setHistoryStack([found]);
          setHistoryIndex(0);
        }
      }
    }
  }, []);

  // Open a diagram in editor
  const handleOpenDiagram = (doc: DiagramDocument) => {
    setActiveDiagram(doc);
    setViewMode("editor");
    setHistoryStack([doc]);
    setHistoryIndex(0);
    setZoom(1);
    setSelectedNodeIds([]);
    setSelectedEdgeId(null);
  };

  // Create a blank diagram
  const handleCreateBlank = (type: DiagramType = "system-architecture") => {
    const blank: DiagramDocument = {
      id: `doc-${Date.now()}`,
      title: "Untitled Technical Diagram",
      description: "Blank canvas ready for architecture design",
      diagramType: type,
      theme: "dark",
      nodes: [
        {
          id: "node-root-svc",
          type: "rounded",
          category: "service",
          title: "Core Service",
          subtitle: "REST API Endpoint",
          technology: "Node.js / Express",
          icon: "Cpu",
          x: 200,
          y: 200,
          width: 260,
          height: 90,
          color: "indigo",
        },
      ],
      edges: [],
      groups: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      tags: ["Draft"],
      history: [],
    };
    saveDiagram(blank);
    setDiagrams((prev) => [blank, ...prev]);
    handleOpenDiagram(blank);
  };

  // Update Diagram State & record undo stack
  const handleUpdateDiagram = useCallback(
    (updated: DiagramDocument, recordHistory = true) => {
      setActiveDiagram(updated);
      saveDiagram(updated);
      setDiagrams((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));

      if (recordHistory) {
        setHistoryStack((prev) => {
          const trimmed = prev.slice(0, historyIndex + 1);
          return [...trimmed, updated];
        });
        setHistoryIndex((prev) => prev + 1);
      }
    },
    [historyIndex]
  );

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = historyStack[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setActiveDiagram(prev);
      saveDiagram(prev);
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const next = historyStack[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setActiveDiagram(next);
      saveDiagram(next);
    }
  };

  // Auto Layout
  const handleAutoLayout = (direction: "LR" | "TB") => {
    if (!activeDiagram) return;
    const { nodes: layoutNodes, groups: layoutGroups } = applyAutoLayout(
      activeDiagram.nodes,
      activeDiagram.edges,
      activeDiagram.groups,
      { direction }
    );
    const updated = {
      ...activeDiagram,
      nodes: layoutNodes,
      groups: layoutGroups,
    };
    handleUpdateDiagram(updated);
  };

  // Add new node by category
  const handleAddNode = (category: NodeCategory) => {
    if (!activeDiagram) return;
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type: category === "database" ? "database" : category === "gateway" ? "hexagon" : "rounded",
      category,
      title: `New ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      subtitle: "Configure properties",
      technology: category === "database" ? "PostgreSQL" : category === "service" ? "Microservice" : "Standard",
      icon: category === "database" ? "Database" : category === "gateway" ? "Route" : "Cpu",
      x: 300 + Math.random() * 80,
      y: 200 + Math.random() * 80,
      width: 260,
      height: 90,
      color:
        category === "database"
          ? "emerald"
          : category === "gateway"
          ? "violet"
          : category === "messaging"
          ? "rose"
          : category === "ai"
          ? "cyan"
          : "indigo",
    };

    handleUpdateDiagram({
      ...activeDiagram,
      nodes: [...activeDiagram.nodes, newNode],
    });
    setSelectedNodeIds([newNode.id]);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-64px)] flex flex-col bg-[#0c0a09] text-[#fafaf9]">
      {viewMode === "dashboard" ? (
        <DiagramDashboard
          recentDiagrams={diagrams}
          onOpenDiagram={handleOpenDiagram}
          onCreateBlank={handleCreateBlank}
          onOpenImport={() => setIsImportOpen(true)}
          onDuplicateDiagram={(id) => {
            const dup = duplicateDiagram(id);
            if (dup) setDiagrams((prev) => [dup, ...prev]);
          }}
          onDeleteDiagram={(id) => {
            const filtered = deleteDiagram(id);
            setDiagrams(filtered);
          }}
        />
      ) : (
        /* Visual Diagram Editor Mode */
        activeDiagram && (
          <div className="relative flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Workspace Bar */}
            <div className="h-14 px-4 border-b border-[#292524] bg-[#141210]/95 backdrop-blur-xl flex items-center justify-between z-30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode("dashboard")}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>

                <div className="h-4 w-px bg-[#292524]" />

                {/* Editable Document Title */}
                <input
                  type="text"
                  value={activeDiagram.title}
                  onChange={(e) =>
                    handleUpdateDiagram(
                      { ...activeDiagram, title: e.target.value },
                      false
                    )
                  }
                  className="bg-transparent text-sm font-semibold text-[#fafaf9] hover:bg-white/5 focus:bg-[#0c0a09] border border-transparent focus:border-indigo-500 rounded-lg px-2 py-1 max-w-[280px] sm:max-w-md focus:outline-none"
                />

                <span className="hidden md:inline text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {activeDiagram.diagramType}
                </span>
              </div>

              {/* Status pill & Save confirmation */}
              <div className="flex items-center gap-3 text-xs">
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auto-saved</span>
                </div>

                <button
                  onClick={() => setIsExportOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Floating Toolbar */}
            <DiagramToolbar
              toolMode={toolMode}
              setToolMode={setToolMode}
              zoom={zoom}
              onZoomIn={() => setZoom((z) => Math.min(z + 0.15, 3))}
              onZoomOut={() => setZoom((z) => Math.max(z - 0.15, 0.25))}
              onResetZoom={() => setZoom(1)}
              onFitView={() => {
                setZoom(0.85);
              }}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < historyStack.length - 1}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onAutoLayout={handleAutoLayout}
              isCodeOpen={isCodeOpen}
              onToggleCode={() => setIsCodeOpen(!isCodeOpen)}
              isAIOpen={isAIOpen}
              onToggleAI={() => setIsAIOpen(!isAIOpen)}
              isLayersOpen={isLayersOpen}
              onToggleLayers={() => setIsLayersOpen(!isLayersOpen)}
              onOpenArchMap={() => setIsArchMapOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
              onAddNode={handleAddNode}
              snapToGrid={snapToGrid}
              onToggleSnap={() => setSnapToGrid(!snapToGrid)}
            />

            {/* Main Interactive Canvas */}
            <div className="relative flex-1 w-full h-[calc(100vh-120px)]">
              <DiagramCanvas
                diagram={activeDiagram}
                toolMode={toolMode}
                zoom={zoom}
                setZoom={setZoom}
                snapToGrid={snapToGrid}
                selectedNodeIds={selectedNodeIds}
                setSelectedNodeIds={setSelectedNodeIds}
                selectedEdgeId={selectedEdgeId}
                setSelectedEdgeId={setSelectedEdgeId}
                onUpdateDiagram={handleUpdateDiagram}
                onCommitHistory={(msg) => commitDiagramVersion(activeDiagram, msg)}
                simulationSourceId={simulationSourceId}
                impactedNodeIds={impactedNodeIds}
              />
            </div>

            {/* Side Panels */}
            <DiagramAIChat
              diagram={activeDiagram}
              isOpen={isAIOpen}
              onClose={() => setIsAIOpen(false)}
              onUpdateDiagram={handleUpdateDiagram}
            />

            <DiagramCodeEditor
              diagram={activeDiagram}
              isOpen={isCodeOpen}
              onClose={() => setIsCodeOpen(false)}
              onUpdateDiagram={handleUpdateDiagram}
            />

            <DiagramLayersPanel
              nodes={activeDiagram.nodes}
              groups={activeDiagram.groups}
              edges={activeDiagram.edges}
              selectedNodeIds={selectedNodeIds}
              isOpen={isLayersOpen}
              onClose={() => setIsLayersOpen(false)}
              onSelectNode={(id) => setSelectedNodeIds([id])}
              onToggleLock={(id) => {
                handleUpdateDiagram({
                  ...activeDiagram,
                  nodes: activeDiagram.nodes.map((n) =>
                    n.id === id ? { ...n, locked: !n.locked } : n
                  ),
                });
              }}
              onToggleHide={(id) => {
                handleUpdateDiagram({
                  ...activeDiagram,
                  nodes: activeDiagram.nodes.map((n) =>
                    n.id === id ? { ...n, hidden: !n.hidden } : n
                  ),
                });
              }}
            />

            {/* Architecture Map & Blast Radius Modal */}
            <ArchitectureMapModal
              diagram={activeDiagram}
              isOpen={isArchMapOpen}
              onClose={() => setIsArchMapOpen(false)}
              onSimulateOutageOnCanvas={(srcId, impacted) => {
                setSimulationSourceId(srcId);
                setImpactedNodeIds(impacted);
                if (srcId) setIsArchMapOpen(false);
              }}
            />

            {/* Export Modal */}
            <DiagramExportModal
              diagram={activeDiagram}
              isOpen={isExportOpen}
              onClose={() => setIsExportOpen(false)}
            />
          </div>
        )
      )}

      {/* Import Modal */}
      <DiagramImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportComplete={(imported) => {
          saveDiagram(imported);
          setDiagrams((prev) => [imported, ...prev]);
          handleOpenDiagram(imported);
        }}
      />
    </div>
  );
}

