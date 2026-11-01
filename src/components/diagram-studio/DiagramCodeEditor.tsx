"use client";

import React, { useState, useEffect } from "react";
import { DiagramDocument } from "@/types/diagram";
import { exportToJson, exportToMermaid } from "@/lib/diagram/exporter";
import { convertMarkdownToDiagram } from "@/lib/diagram/converters";
import {
  Code2,
  Copy,
  Check,
  Download,
  X,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface DiagramCodeEditorProps {
  diagram: DiagramDocument;
  isOpen: boolean;
  onClose: () => void;
  onUpdateDiagram: (updated: DiagramDocument) => void;
}

export default function DiagramCodeEditor({
  diagram,
  isOpen,
  onClose,
  onUpdateDiagram,
}: DiagramCodeEditorProps) {
  const [format, setFormat] = useState<"json" | "mermaid">("json");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync from visual diagram to code editor when diagram changes
  useEffect(() => {
    if (!isSyncing) {
      if (format === "json") {
        setCode(exportToJson(diagram));
      } else {
        setCode(exportToMermaid(diagram));
      }
      setError(null);
    }
  }, [diagram, format, isSyncing]);

  if (!isOpen) return null;

  // Handle user typing in code editor
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setIsSyncing(true);

    try {
      if (format === "json") {
        const parsed = JSON.parse(newCode);
        if (parsed && Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
          setError(null);
          onUpdateDiagram({
            ...diagram,
            title: parsed.title || diagram.title,
            nodes: parsed.nodes,
            edges: parsed.edges,
            groups: parsed.groups || diagram.groups,
            updatedAt: new Date().toISOString(),
          });
        } else {
          setError("Invalid schema: 'nodes' and 'edges' arrays required.");
        }
      } else {
        // Mermaid DSL parsing
        const converted = convertMarkdownToDiagram(newCode);
        setError(null);
        onUpdateDiagram({
          ...diagram,
          nodes: converted.nodes,
          edges: converted.edges,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (e: any) {
      setError(e.message || "Syntax error");
    } finally {
      setTimeout(() => setIsSyncing(false), 300);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    if (format === "json") {
      try {
        const parsed = JSON.parse(code);
        setCode(JSON.stringify(parsed, null, 2));
        setError(null);
      } catch (e: any) {
        setError("Cannot format invalid JSON: " + e.message);
      }
    }
  };

  return (
    <div className="absolute top-20 right-4 bottom-8 w-96 md:w-[480px] z-30 flex flex-col rounded-2xl bg-[#141210]/95 border border-[#292524] shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#292524] bg-[#161412]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-[#fafaf9]">Diagram as Code</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            2-Way Sync
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Format Selector */}
          <div className="flex items-center bg-[#0c0a09] border border-[#292524] rounded-lg p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setFormat("json")}
              className={`px-2 py-0.5 rounded ${
                format === "json"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              JSON
            </button>
            <button
              onClick={() => setFormat("mermaid")}
              className={`px-2 py-0.5 rounded ${
                format === "mermaid"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              Mermaid
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-[#a6a09b] hover:text-white hover:bg-[#1f1c19] transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a6a09b] hover:text-white hover:bg-[#1f1c19] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Error alert if syntax error */}
      {error && (
        <div className="px-3.5 py-2 bg-rose-500/10 border-b border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span className="line-clamp-1 font-mono text-[11px]">{error}</span>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex-1 relative bg-[#0c0a09]">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-transparent text-[#fafaf9] font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-indigo-600/40"
          placeholder={format === "json" ? "Paste Diagram JSON..." : "Paste Mermaid DSL..."}
        />
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between p-2.5 border-t border-[#292524] bg-[#161412] text-[11px] text-[#a6a09b] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Live Sync Active</span>
        </div>
        {format === "json" && (
          <button
            onClick={handleFormat}
            className="px-2 py-1 rounded bg-[#201d1a] hover:bg-[#2b2723] text-xs text-[#fafaf9] transition-colors"
          >
            Format JSON
          </button>
        )}
      </div>
    </div>
  );
}

