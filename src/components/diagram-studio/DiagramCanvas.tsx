"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  DiagramDocument,
  DiagramNode,
  DiagramEdge,
  DiagramGroup,
  PortPosition,
  NodeCategory,
} from "@/types/diagram";
import DiagramNodeView from "./DiagramNodeView";
import DiagramEdgeView from "./DiagramEdgeView";
import DiagramMinimap from "./DiagramMinimap";
import { X, Check, Trash2, Edit3, Palette, Shield } from "lucide-react";

interface DiagramCanvasProps {
  diagram: DiagramDocument;
  toolMode: "select" | "pan" | "connect";
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  snapToGrid: boolean;
  selectedNodeIds: string[];
  setSelectedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedEdgeId: string | null;
  setSelectedEdgeId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdateDiagram: (updated: DiagramDocument, recordHistory?: boolean) => void;
  onCommitHistory: (message: string) => void;
  simulationSourceId?: string;
  impactedNodeIds?: string[];
}

export default function DiagramCanvas({
  diagram,
  toolMode,
  zoom,
  setZoom,
  snapToGrid,
  selectedNodeIds,
  setSelectedNodeIds,
  selectedEdgeId,
  setSelectedEdgeId,
  onUpdateDiagram,
  onCommitHistory,
  simulationSourceId,
  impactedNodeIds = [],
}: DiagramCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Node Dragging State
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState(false);

  // Connection Creation State
  const [connectingSource, setConnectingSource] = useState<{
    nodeId: string;
    handle: PortPosition;
  } | null>(null);
  const [connectingCursor, setConnectingCursor] = useState<{ x: number; y: number } | null>(null);

  // Marquee Selection Box State
  const [marquee, setMarquee] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  // Node Editing Popover State
  const [editingNode, setEditingNode] = useState<DiagramNode | null>(null);

  // Copy / Clipboard State
  const [clipboardNodes, setClipboardNodes] = useState<DiagramNode[]>([]);

  // Wheel Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.25), 3));
    } else {
      setPan((prev) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  };

  // Convert Screen Coordinates to Canvas World Coordinates
  const getCanvasCoords = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left - pan.x) / zoom;
      const y = (clientY - rect.top - pan.y) / zoom;
      return { x, y };
    },
    [pan, zoom]
  );

  // Start Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // If middle click or spacebar or toolMode === 'pan'
    if (e.button === 1 || toolMode === "pan" || e.altKey) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    if (e.button === 0 && !connectingSource) {
      // Start marquee selection on canvas background click
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setMarquee({ startX: coords.x, startY: coords.y, currentX: coords.x, currentY: coords.y });
      if (!e.shiftKey && !e.metaKey) {
        setSelectedNodeIds([]);
        setSelectedEdgeId(null);
      }
    }
  };

  // Mouse Move
  const handleMouseMove = (e: React.MouseEvent) => {
    // Panning canvas
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
      return;
    }

    // Creating new connection line
    if (connectingSource) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setConnectingCursor(coords);
      return;
    }

    // Dragging nodes
    if (draggingNodeId) {
      setHasMovedDuringDrag(true);
      const coords = getCanvasCoords(e.clientX, e.clientY);
      let targetX = coords.x - dragOffset.x;
      let targetY = coords.y - dragOffset.y;

      if (snapToGrid) {
        const gridSize = 20;
        targetX = Math.round(targetX / gridSize) * gridSize;
        targetY = Math.round(targetY / gridSize) * gridSize;
      }

      const activeNode = diagram.nodes.find((n) => n.id === draggingNodeId);
      if (!activeNode) return;

      const deltaX = targetX - activeNode.x;
      const deltaY = targetY - activeNode.y;

      const affectedIds = selectedNodeIds.includes(draggingNodeId)
        ? selectedNodeIds
        : [draggingNodeId];

      const updatedNodes = diagram.nodes.map((n) => {
        if (affectedIds.includes(n.id) && !n.locked) {
          return {
            ...n,
            x: Math.round(n.x + deltaX),
            y: Math.round(n.y + deltaY),
          };
        }
        return n;
      });

      onUpdateDiagram(
        {
          ...diagram,
          nodes: updatedNodes,
        },
        false
      );
      return;
    }

    // Updating Marquee box
    if (marquee) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setMarquee((prev) => (prev ? { ...prev, currentX: coords.x, currentY: coords.y } : null));

      // Calculate enclosed nodes
      const left = Math.min(marquee.startX, coords.x);
      const right = Math.max(marquee.startX, coords.x);
      const top = Math.min(marquee.startY, coords.y);
      const bottom = Math.max(marquee.startY, coords.y);

      const enclosedIds = diagram.nodes
        .filter((n) => n.x >= left && n.x + n.width <= right && n.y >= top && n.y + n.height <= bottom)
        .map((n) => n.id);

      setSelectedNodeIds(enclosedIds);
    }
  };

  // Mouse Up
  const handleMouseUp = (e: React.MouseEvent) => {
    if (isPanning) {
      setIsPanning(false);
    }

    if (hasMovedDuringDrag) {
      setHasMovedDuringDrag(false);
      onCommitHistory("Moved nodes");
    }
    setDraggingNodeId(null);

    // If connecting and dropped on a node
    if (connectingSource) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      const targetNode = diagram.nodes.find(
        (n) =>
          coords.x >= n.x &&
          coords.x <= n.x + n.width &&
          coords.y >= n.y &&
          coords.y <= n.y + n.height &&
          n.id !== connectingSource.nodeId
      );

      if (targetNode) {
        // Create new edge
        const newEdge: DiagramEdge = {
          id: `e-${connectingSource.nodeId}-${targetNode.id}-${Date.now()}`,
          source: connectingSource.nodeId,
          target: targetNode.id,
          sourceHandle: connectingSource.handle,
          label: "Connected Link",
          style: "solid",
          curve: "bezier",
          color: "#818cf8",
          animated: true,
        };

        onUpdateDiagram({
          ...diagram,
          edges: [...diagram.edges, newEdge],
        });
        onCommitHistory(`Connected ${connectingSource.nodeId} to ${targetNode.id}`);
      }

      setConnectingSource(null);
      setConnectingCursor(null);
    }

    if (marquee) {
      setMarquee(null);
    }
  };

  // Node selection handler
  const handleSelectNode = (nodeId: string, multiSelect = false) => {
    if (multiSelect) {
      setSelectedNodeIds((prev) =>
        prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
      );
    } else {
      setSelectedNodeIds([nodeId]);
      setSelectedEdgeId(null);
    }
  };

  // Start Node Drag
  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    if (toolMode === "pan" || e.button !== 0) return;
    const node = diagram.nodes.find((n) => n.id === nodeId);
    if (!node || node.locked) return;

    const coords = getCanvasCoords(e.clientX, e.clientY);
    setDraggingNodeId(nodeId);
    setDragOffset({
      x: coords.x - node.x,
      y: coords.y - node.y,
    });
  };

  // Keyboard Shortcuts (Delete, Undo, Copy, Paste)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Delete selected nodes / edge
      if (e.key === "Backspace" || e.key === "Delete") {
        if (selectedNodeIds.length > 0) {
          const remainingNodes = diagram.nodes.filter((n) => !selectedNodeIds.includes(n.id));
          const remainingEdges = diagram.edges.filter(
            (edge) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)
          );
          onUpdateDiagram({
            ...diagram,
            nodes: remainingNodes,
            edges: remainingEdges,
          });
          onCommitHistory(`Deleted ${selectedNodeIds.length} component(s)`);
          setSelectedNodeIds([]);
        } else if (selectedEdgeId) {
          const remainingEdges = diagram.edges.filter((edge) => edge.id !== selectedEdgeId);
          onUpdateDiagram({
            ...diagram,
            edges: remainingEdges,
          });
          onCommitHistory("Deleted connection");
          setSelectedEdgeId(null);
        }
      }

      // Copy (Cmd/Ctrl + C)
      if ((e.metaKey || e.ctrlKey) && e.key === "c" && selectedNodeIds.length > 0) {
        const toCopy = diagram.nodes.filter((n) => selectedNodeIds.includes(n.id));
        setClipboardNodes(toCopy);
      }

      // Paste (Cmd/Ctrl + V)
      if ((e.metaKey || e.ctrlKey) && e.key === "v" && clipboardNodes.length > 0) {
        const pasted = clipboardNodes.map((n) => ({
          ...n,
          id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          x: n.x + 40,
          y: n.y + 40,
          title: `${n.title} (Copy)`,
        }));

        onUpdateDiagram({
          ...diagram,
          nodes: [...diagram.nodes, ...pasted],
        });
        onCommitHistory(`Pasted ${pasted.length} component(s)`);
        setSelectedNodeIds(pasted.map((p) => p.id));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [diagram, selectedNodeIds, selectedEdgeId, clipboardNodes, onUpdateDiagram, onCommitHistory]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-full h-full bg-[#0c0a09] overflow-hidden select-none ${
        toolMode === "pan" || isPanning ? "cursor-grab active:cursor-grabbing" : "cursor-default"
      }`}
    >
      {/* Canvas Grid Background */}
      <div
        style={{
          backgroundPosition: `${pan.x}px ${pan.y}px`,
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        }}
        className="absolute inset-0 bg-[radial-gradient(#292524_1px,transparent_1px)] pointer-events-none opacity-65"
      />

      {/* World Canvas Container (Scaled & Translated) */}
      <div
        id="diagram-world"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* SVG Edges Layer */}
        <svg className="absolute inset-0 w-[8000px] h-[8000px] overflow-visible pointer-events-none z-10">
          <defs>
            <marker id="arrowhead" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <polygon points="0 0, 9 4.5, 0 9" fill="#818cf8" />
            </marker>
          </defs>

          {/* Group Boundaries */}
          {diagram.groups.map((g) => (
            <g key={g.id} className="pointer-events-none">
              <rect
                x={g.x}
                y={g.y}
                width={g.width}
                height={g.height}
                rx={18}
                fill="rgba(255,255,255,0.015)"
                stroke="#292524"
                strokeWidth={1.5}
                strokeDasharray="4,4"
              />
              <text
                x={g.x + 18}
                y={g.y + 24}
                fill="#78716c"
                fontSize={12}
                fontWeight={600}
                className="font-mono uppercase tracking-wider"
              >
                {g.title}
              </text>
            </g>
          ))}

          {/* Edges */}
          {diagram.edges.map((edge) => (
            <DiagramEdgeView
              key={edge.id}
              edge={edge}
              sourceNode={diagram.nodes.find((n) => n.id === edge.source)}
              targetNode={diagram.nodes.find((n) => n.id === edge.target)}
              isSelected={selectedEdgeId === edge.id}
              onSelect={(id) => {
                setSelectedEdgeId(id);
                setSelectedNodeIds([]);
              }}
              onDelete={(id) => {
                onUpdateDiagram({
                  ...diagram,
                  edges: diagram.edges.filter((e) => e.id !== id),
                });
                onCommitHistory("Deleted edge");
                setSelectedEdgeId(null);
              }}
            />
          ))}

          {/* Active Connection Line while dragging handle */}
          {connectingSource && connectingCursor && (
            <path
              d={`M ${
                (diagram.nodes.find((n) => n.id === connectingSource.nodeId)?.x || 0) + 120
              } ${
                (diagram.nodes.find((n) => n.id === connectingSource.nodeId)?.y || 0) + 40
              } L ${connectingCursor.x} ${connectingCursor.y}`}
              fill="none"
              stroke="#818cf8"
              strokeWidth={2}
              strokeDasharray="4,4"
              markerEnd="url(#arrowhead)"
            />
          )}
        </svg>

        {/* HTML Nodes Layer */}
        <div className="absolute inset-0 pointer-events-auto z-20">
          {diagram.nodes
            .filter((n) => !n.hidden)
            .map((node) => (
              <div
                key={node.id}
                onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
              >
                <DiagramNodeView
                  node={node}
                  isSelected={selectedNodeIds.includes(node.id)}
                  isFailureSource={simulationSourceId === node.id}
                  isImpactedByBlastRadius={impactedNodeIds.includes(node.id)}
                  onSelect={handleSelectNode}
                  onStartConnect={(nodeId, handle, e) => {
                    setConnectingSource({ nodeId, handle });
                    const coords = getCanvasCoords(e.clientX, e.clientY);
                    setConnectingCursor(coords);
                  }}
                  onDoubleClick={(n) => setEditingNode(n)}
                />
              </div>
            ))}
        </div>

        {/* Marquee Drag Box */}
        {marquee && (
          <div
            style={{
              left: `${Math.min(marquee.startX, marquee.currentX)}px`,
              top: `${Math.min(marquee.startY, marquee.currentY)}px`,
              width: `${Math.abs(marquee.currentX - marquee.startX)}px`,
              height: `${Math.abs(marquee.currentY - marquee.startY)}px`,
            }}
            className="absolute border border-indigo-500/80 bg-indigo-500/10 pointer-events-none rounded"
          />
        )}
      </div>

      {/* Corner Minimap */}
      <DiagramMinimap nodes={diagram.nodes} pan={pan} zoom={zoom} />

      {/* Node Editing Modal */}
      {editingNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setEditingNode(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl p-5 space-y-4 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#292524]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-sm text-[#fafaf9]">
                  Edit Component Properties
                </span>
              </div>
              <button
                onClick={() => setEditingNode(null)}
                className="p-1 rounded text-[#a6a09b] hover:text-[#fafaf9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[#a6a09b] mb-1 block">Title</label>
                <input
                  type="text"
                  value={editingNode.title}
                  onChange={(e) =>
                    setEditingNode({ ...editingNode, title: e.target.value })
                  }
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3 py-2 text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[#a6a09b] mb-1 block">Subtitle / Description</label>
                <input
                  type="text"
                  value={editingNode.subtitle || ""}
                  onChange={(e) =>
                    setEditingNode({ ...editingNode, subtitle: e.target.value })
                  }
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3 py-2 text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[#a6a09b] mb-1 block">Technology / Runtime</label>
                <input
                  type="text"
                  value={editingNode.technology || ""}
                  onChange={(e) =>
                    setEditingNode({ ...editingNode, technology: e.target.value })
                  }
                  placeholder="e.g. PostgreSQL 16, Redis 7, Go, Next.js"
                  className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3 py-2 text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Color Selector */}
              <div>
                <label className="text-[#a6a09b] mb-1.5 block">Theme Color</label>
                <div className="flex gap-2">
                  {["indigo", "violet", "emerald", "cyan", "rose", "amber", "blue", "slate"].map(
                    (c) => (
                      <button
                        key={c}
                        onClick={() => setEditingNode({ ...editingNode, color: c })}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          editingNode.color === c ? "scale-110 border-white" : "border-transparent"
                        } ${
                          c === "indigo"
                            ? "bg-indigo-600"
                            : c === "violet"
                            ? "bg-violet-600"
                            : c === "emerald"
                            ? "bg-emerald-600"
                            : c === "cyan"
                            ? "bg-cyan-500"
                            : c === "rose"
                            ? "bg-rose-600"
                            : c === "amber"
                            ? "bg-amber-500"
                            : c === "blue"
                            ? "bg-blue-600"
                            : "bg-zinc-600"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#292524]">
              <button
                onClick={() => {
                  onUpdateDiagram({
                    ...diagram,
                    nodes: diagram.nodes.filter((n) => n.id !== editingNode.id),
                    edges: diagram.edges.filter(
                      (e) => e.source !== editingNode.id && e.target !== editingNode.id
                    ),
                  });
                  onCommitHistory("Deleted " + editingNode.title);
                  setEditingNode(null);
                }}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Node</span>
              </button>

              <button
                onClick={() => {
                  onUpdateDiagram({
                    ...diagram,
                    nodes: diagram.nodes.map((n) =>
                      n.id === editingNode.id ? editingNode : n
                    ),
                  });
                  onCommitHistory("Updated " + editingNode.title);
                  setEditingNode(null);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-md shadow-indigo-600/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

