"use client";

import React, { useState } from "react";
import { DiagramNode } from "@/types/diagram";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface DiagramMinimapProps {
  nodes: DiagramNode[];
  pan: { x: number; y: number };
  zoom: number;
}

export default function DiagramMinimap({ nodes, pan, zoom }: DiagramMinimapProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (nodes.length === 0) return null;

  // Compute bounding box
  const minX = Math.min(...nodes.map((n) => n.x), 0);
  const minY = Math.min(...nodes.map((n) => n.y), 0);
  const maxX = Math.max(...nodes.map((n) => n.x + n.width), 1200);
  const maxY = Math.max(...nodes.map((n) => n.y + n.height), 800);

  const worldWidth = maxX - minX + 200;
  const worldHeight = maxY - minY + 200;

  const mapWidth = 160;
  const mapHeight = 110;

  const scaleX = mapWidth / worldWidth;
  const scaleY = mapHeight / worldHeight;
  const scale = Math.min(scaleX, scaleY);

  return (
    <div className="absolute bottom-4 right-4 z-20 rounded-xl bg-[#141210]/90 border border-[#292524] shadow-2xl backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-[#292524] bg-[#161412]">
        <span className="text-[10px] font-mono font-semibold text-[#a6a09b] uppercase tracking-wider">
          Overview
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#a6a09b] hover:text-[#fafaf9] p-0.5"
        >
          {collapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {!collapsed && (
        <div
          style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}
          className="relative bg-[#0c0a09] overflow-hidden"
        >
          {/* Render scaled node boxes */}
          {nodes.map((n) => {
            const nx = (n.x - minX + 50) * scale;
            const ny = (n.y - minY + 50) * scale;
            const nw = Math.max(n.width * scale, 6);
            const nh = Math.max(n.height * scale, 4);

            return (
              <div
                key={n.id}
                style={{
                  left: `${nx}px`,
                  top: `${ny}px`,
                  width: `${nw}px`,
                  height: `${nh}px`,
                }}
                className="absolute rounded-[2px] bg-indigo-500/60 border border-indigo-400/80"
              />
            );
          })}

          {/* Current Viewport box */}
          <div
            style={{
              left: `${Math.max((-pan.x - minX + 50) * scale, 0)}px`,
              top: `${Math.max((-pan.y - minY + 50) * scale, 0)}px`,
              width: `${Math.min((800 / zoom) * scale, mapWidth)}px`,
              height: `${Math.min((600 / zoom) * scale, mapHeight)}px`,
            }}
            className="absolute border border-white/60 bg-white/10 pointer-events-none rounded-[2px]"
          />
        </div>
      )}
    </div>
  );
}

