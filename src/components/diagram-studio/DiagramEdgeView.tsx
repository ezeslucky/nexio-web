"use client";

import React from "react";
import { DiagramEdge, DiagramNode, PortPosition } from "@/types/diagram";
import { X } from "lucide-react";

interface DiagramEdgeViewProps {
  edge: DiagramEdge;
  sourceNode?: DiagramNode;
  targetNode?: DiagramNode;
  isSelected?: boolean;
  onSelect?: (edgeId: string) => void;
  onDelete?: (edgeId: string) => void;
}

function getPortCoordinate(node: DiagramNode, handle?: PortPosition): { x: number; y: number } {
  const h = handle || (node.x < 500 ? "right" : "left");
  switch (h) {
    case "top":
      return { x: node.x + node.width / 2, y: node.y };
    case "right":
      return { x: node.x + node.width, y: node.y + node.height / 2 };
    case "bottom":
      return { x: node.x + node.width / 2, y: node.y + node.height };
    case "left":
      return { x: node.x, y: node.y + node.height / 2 };
  }
}

export default function DiagramEdgeView({
  edge,
  sourceNode,
  targetNode,
  isSelected,
  onSelect,
  onDelete,
}: DiagramEdgeViewProps) {
  if (!sourceNode || !targetNode) return null;

  // Determine handle positions
  const isTargetToTheRight = targetNode.x > sourceNode.x + sourceNode.width;
  const defaultSourceHandle: PortPosition = isTargetToTheRight ? "right" : "bottom";
  const defaultTargetHandle: PortPosition = isTargetToTheRight ? "left" : "top";

  const start = getPortCoordinate(sourceNode, edge.sourceHandle || defaultSourceHandle);
  const end = getPortCoordinate(targetNode, edge.targetHandle || defaultTargetHandle);

  // Path computation
  let pathD = "";
  const curve = edge.curve || "bezier";

  if (curve === "straight") {
    pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  } else if (curve === "orthogonal") {
    const midX = (start.x + end.x) / 2;
    pathD = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
  } else {
    // Smooth Bezier
    const dx = Math.abs(end.x - start.x) * 0.55;
    pathD = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;
  }

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const strokeColor = edge.color || (isSelected ? "#ffffff" : "#818cf8");

  return (
    <g
      id={`edge-view-${edge.id}`}
      className="group cursor-pointer select-none"
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(edge.id);
      }}
    >
      {/* Invisible wider path for easy hover and click */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth="16"
        className="pointer-events-stroke"
      />

      {/* Main Visible Path */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isSelected ? 2.5 : 1.75}
        strokeDasharray={edge.style === "dashed" ? "5,5" : edge.style === "dotted" ? "2,4" : undefined}
        markerEnd={edge.markerEnd === "none" ? undefined : "url(#arrowhead)"}
        className={`transition-all duration-150 ${
          edge.animated ? "stroke-dasharray-[8,4] animate-[flowLine_2s_linear_infinite]" : ""
        } ${isSelected ? "stroke-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "group-hover:stroke-indigo-300"}`}
      />

      {/* Edge Midpoint Label Pill */}
      {edge.label && (
        <foreignObject
          x={midX - 75}
          y={midY - 14}
          width="150"
          height="28"
          className="overflow-visible pointer-events-auto"
        >
          <div className="flex items-center justify-center">
            <div
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tight border backdrop-blur-md transition-all shadow-md flex items-center gap-1 ${
                isSelected
                  ? "bg-indigo-950/90 border-white text-white"
                  : "bg-[#141210]/90 border-[#292524] text-[#a6a09b] group-hover:text-white group-hover:border-indigo-500/50"
              }`}
            >
              <span>{edge.label}</span>
              {isSelected && onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(edge.id);
                  }}
                  className="hover:text-rose-400 p-0.5"
                  title="Delete Edge"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

