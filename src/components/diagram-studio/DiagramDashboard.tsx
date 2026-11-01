"use client";

import React, { useState } from "react";
import { DiagramDocument, DiagramTemplate, DiagramType } from "@/types/diagram";
import { DIAGRAM_TEMPLATES } from "@/lib/diagram/templates";
import { generateDiagramFromPrompt } from "@/lib/diagram/ai-engine";
import {
  Sparkles,
  Plus,
  GitBranch,
  Upload,
  Image as ImageIcon,
  FileCode,
  Search,
  Clock,
  Trash2,
  Copy,
  ArrowRight,
  Database,
  Layers,
  Cpu,
  Route,
  Server,
  Zap,
  CheckCircle2,
  BookOpen,
  Filter,
  FolderTree,
} from "lucide-react";

interface DiagramDashboardProps {
  recentDiagrams: DiagramDocument[];
  onOpenDiagram: (diagram: DiagramDocument) => void;
  onCreateBlank: (type?: DiagramType) => void;
  onOpenImport: (defaultTab?: string) => void;
  onDuplicateDiagram: (id: string) => void;
  onDeleteDiagram: (id: string) => void;
}

export default function DiagramDashboard({
  recentDiagrams,
  onOpenDiagram,
  onCreateBlank,
  onOpenImport,
  onDuplicateDiagram,
  onDeleteDiagram,
}: DiagramDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<DiagramType | "all">("all");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter diagrams
  const filteredRecent = recentDiagrams.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedFilter === "all" || d.diagramType === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredTemplates = DIAGRAM_TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedFilter === "all" || tpl.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateDiagramFromPrompt({
        prompt: aiPrompt,
        diagramType: "system-architecture",
      });
      setIsGenerating(false);
      onOpenDiagram(generated);
    }, 600);
  };

  const handleUseTemplate = (tpl: DiagramTemplate) => {
    const newDoc: DiagramDocument = {
      ...tpl.data,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      history: [
        {
          id: `rev-${Date.now()}`,
          timestamp: new Date().toISOString(),
          message: `Created from template: ${tpl.title}`,
          nodesSnapshot: tpl.data.nodes,
          edgesSnapshot: tpl.data.edges,
          groupsSnapshot: tpl.data.groups,
        },
      ],
    };
    onOpenDiagram(newDoc);
  };

  const diagramTypes: Array<{ type: DiagramType | "all"; label: string }> = [
    { type: "all", label: "All Formats" },
    { type: "system-architecture", label: "System Architecture" },
    { type: "cloud-architecture", label: "Cloud Architecture" },
    { type: "flowchart", label: "Flowchart" },
    { type: "sequence", label: "Sequence Diagram" },
    { type: "erd", label: "Entity Relationship (ERD)" },
    { type: "uml-class", label: "UML Class" },
    { type: "bpmn", label: "BPMN Diagram" },
    { type: "network", label: "Network Topology" },
    { type: "data-flow", label: "Data Flow (DFD)" },
    { type: "infrastructure", label: "Infrastructure (K8s)" },
    { type: "mind-map", label: "Mind Map" },
    { type: "user-journey", label: "User Journey" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#292524]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#fafaf9] tracking-tight">
                AI Diagram Studio
              </h1>
              <p className="text-xs text-[#a6a09b]">
                Eraser-inspired technical diagramming, visual architecture, diagram-as-code &amp; AI synthesis
              </p>
            </div>
          </div>
        </div>

        {/* Global Search & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#78716c] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diagrams & templates..."
              className="pl-9 pr-4 py-2 bg-[#141210] border border-[#292524] rounded-xl text-xs text-[#fafaf9] placeholder-[#78716c] focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>

          <button
            onClick={() => onCreateBlank("system-architecture")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Diagram</span>
          </button>
        </div>
      </div>

      {/* Hero AI Generator Box */}
      <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#141210] to-violet-950/40 border border-indigo-500/30 p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate with AI</span>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-[#fafaf9]">
            Describe any technical system in plain English
          </h2>

          <form onSubmit={handleGenerateAI} className="flex gap-2 pt-1">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="E.g., Create a microservices architecture with API Gateway, auth service, PostgreSQL, Redis cache, and Kafka queue"
              className="flex-1 bg-[#0c0a09]/90 border border-[#292524] focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-[#fafaf9] placeholder-[#78716c] focus:outline-none shadow-inner"
            />
            <button
              type="submit"
              disabled={!aiPrompt.trim() || isGenerating}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all whitespace-nowrap"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Generate Diagram</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick preset pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#a6a09b]">
            <span className="text-[#78716c]">Try:</span>
            <button
              onClick={() =>
                setAiPrompt(
                  "High-throughput microservices architecture with API Gateway, auth service, user service, PostgreSQL, Redis cache, and message queue"
                )
              }
              className="hover:text-indigo-300 underline"
            >
              Microservices Stack
            </button>
            <span>·</span>
            <button
              onClick={() =>
                setAiPrompt(
                  "Enterprise AI RAG pipeline with document parser, vector database, semantic caching, and LLM reasoning engine"
                )
              }
              className="hover:text-indigo-300 underline"
            >
              AI RAG Pipeline
            </button>
            <span>·</span>
            <button
              onClick={() =>
                setAiPrompt(
                  "AWS Multi-AZ Cloud Architecture with Route 53, ALB, Auto-scaling ECS containers, and Aurora PostgreSQL"
                )
              }
              className="hover:text-indigo-300 underline"
            >
              AWS Multi-AZ Cloud
            </button>
          </div>
        </div>
      </div>

      {/* Quick Launch & Import Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => onOpenImport("git")}
          className="p-4 rounded-xl bg-[#141210] hover:bg-[#181614] border border-[#292524] hover:border-indigo-500/40 text-left transition-all group"
        >
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 w-fit mb-3 group-hover:scale-105 transition-transform">
            <GitBranch className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#fafaf9]">Connect Git Repo</div>
          <p className="text-[11px] text-[#a6a09b] mt-0.5">
            Auto-map codebase modules &amp; endpoints
          </p>
        </button>

        <button
          onClick={() => onOpenImport("sql")}
          className="p-4 rounded-xl bg-[#141210] hover:bg-[#181614] border border-[#292524] hover:border-emerald-500/40 text-left transition-all group"
        >
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 group-hover:scale-105 transition-transform">
            <Database className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#fafaf9]">SQL Schema to ERD</div>
          <p className="text-[11px] text-[#a6a09b] mt-0.5">
            Parse CREATE TABLE DDL into diagrams
          </p>
        </button>

        <button
          onClick={() => onOpenImport("image")}
          className="p-4 rounded-xl bg-[#141210] hover:bg-[#181614] border border-[#292524] hover:border-cyan-500/40 text-left transition-all group"
        >
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit mb-3 group-hover:scale-105 transition-transform">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#fafaf9]">Import Image / Sketch</div>
          <p className="text-[11px] text-[#a6a09b] mt-0.5">
            Vectorize screenshot using AI vision
          </p>
        </button>

        <button
          onClick={() => onOpenImport("terraform")}
          className="p-4 rounded-xl bg-[#141210] hover:bg-[#181614] border border-[#292524] hover:border-violet-500/40 text-left transition-all group"
        >
          <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 w-fit mb-3 group-hover:scale-105 transition-transform">
            <FileCode className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#fafaf9]">Terraform / YAML</div>
          <p className="text-[11px] text-[#a6a09b] mt-0.5">
            Import HCL, K8s manifests &amp; Docker
          </p>
        </button>
      </div>

      {/* Filter Tabs for Diagram Types */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-[#292524] text-xs">
        {diagramTypes.map((t) => (
          <button
            key={t.type}
            onClick={() => setSelectedFilter(t.type)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedFilter === t.type
                ? "bg-indigo-600 text-white font-semibold"
                : "text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#141210]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Recent Diagrams Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-[#fafaf9]">Recent Diagrams</h2>
            <span className="text-xs font-mono text-[#78716c]">
              ({filteredRecent.length})
            </span>
          </div>
        </div>

        {filteredRecent.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#141210]/50 border border-[#292524] text-xs text-[#78716c]">
            No diagrams found matching your criteria. Create a new diagram above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecent.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onOpenDiagram(doc)}
                className="group relative p-4 rounded-xl bg-[#141210] hover:bg-[#181614] border border-[#292524] hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg space-y-3"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 pr-2">
                    <div className="font-semibold text-xs text-[#fafaf9] group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {doc.title}
                    </div>
                    <div className="text-[11px] text-[#a6a09b] line-clamp-1">
                      {doc.description || "System architecture diagram"}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#1f1c19] text-indigo-300 border border-[#292524] shrink-0">
                    {doc.diagramType}
                  </span>
                </div>

                {/* Mini Canvas Wireframe Graphic Preview */}
                <div className="w-full h-24 rounded-lg bg-[#0c0a09] border border-[#292524] p-2 relative overflow-hidden flex items-center justify-center">
                  <div className="flex items-center gap-3 opacity-75 group-hover:opacity-100 transition-opacity">
                    {doc.nodes.slice(0, 3).map((n) => (
                      <div
                        key={n.id}
                        className="px-2 py-1.5 rounded bg-[#181614] border border-[#292524] text-[9px] text-center font-mono text-[#d4d4d8] min-w-[65px]"
                      >
                        <div className="font-bold truncate">{n.title}</div>
                        <div className="text-[8px] text-[#78716c] truncate">
                          {n.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer meta & actions */}
                <div className="flex items-center justify-between text-[10px] text-[#78716c] font-mono pt-1">
                  <span>{doc.nodes.length} Components</span>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onDuplicateDiagram(doc.id)}
                      className="p-1 rounded hover:text-white hover:bg-[#201d1a] transition-colors"
                      title="Duplicate diagram"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteDiagram(doc.id)}
                      className="p-1 rounded hover:text-rose-400 hover:bg-[#201d1a] transition-colors"
                      title="Delete diagram"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Templates Gallery Section */}
      <div className="space-y-4 pt-6 border-t border-[#292524]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-semibold text-[#fafaf9]">
              Production Architecture Templates
            </h2>
            <span className="text-xs font-mono text-[#78716c]">
              ({filteredTemplates.length})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-4 rounded-xl bg-[#141210] border border-[#292524] hover:border-violet-500/40 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                    {tpl.complexity}
                  </span>
                  <span className="text-[10px] font-mono text-[#78716c]">
                    {tpl.nodeCount} nodes
                  </span>
                </div>

                <div className="font-semibold text-xs text-[#fafaf9] leading-snug">
                  {tpl.title}
                </div>

                <p className="text-[11px] text-[#a6a09b] line-clamp-2">
                  {tpl.description}
                </p>
              </div>

              <button
                onClick={() => handleUseTemplate(tpl)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#181614] hover:bg-violet-600/20 border border-[#292524] hover:border-violet-500/50 text-xs font-medium text-[#fafaf9] hover:text-violet-300 transition-colors"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

