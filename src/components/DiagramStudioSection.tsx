"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Layers,
  Activity,
  GitBranch,
  ShieldCheck,
  Zap,
  Route,
  CheckCircle2,
} from "lucide-react";

export default function DiagramStudioSection() {
  const [activeTab, setActiveTab] = useState<"saas" | "rag" | "erd" | "k8s">("saas");

  const previews = {
    saas: {
      title: "Microservices Architecture",
      subtitle: "Cloudflare Edge → Envoy Gateway → Go Microservices → PostgreSQL & Redis",
      badge: "System Architecture",
      nodes: [
        { title: "Cloudflare Edge", tech: "WAF & CDN", color: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
        { title: "Envoy Gateway", tech: "mTLS Routing", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
        { title: "Auth & Billing", tech: "Go / gRPC", color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300" },
        { title: "Redis Cache", tech: "Sub-ms Cache", color: "border-rose-500/40 bg-rose-500/10 text-rose-300" },
        { title: "Postgres Primary", tech: "ACID DB", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
      ],
    },
    rag: {
      title: "Enterprise AI & RAG Pipeline",
      subtitle: "Unstructured Docs → Semantic Vector Store → LangChain Agents → Claude 3.5 Sonnet",
      badge: "AI Pipeline",
      nodes: [
        { title: "Document Lake", tech: "S3 PDF Blobs", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
        { title: "Chunking Worker", tech: "Token Splitter", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
        { title: "Vector Database", tech: "Pinecone / Qdrant", color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
        { title: "RAG Agent", tech: "Query Rewriting", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
        { title: "LLM Reasoning", tech: "Claude / Gemini", color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300" },
      ],
    },
    erd: {
      title: "Relational Database Schema (ERD)",
      subtitle: "Normalized 3NF Entities with Primary & Foreign Key Cardinalities",
      badge: "Database ERD",
      nodes: [
        { title: "users (PK id)", tech: "email, pass, role", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
        { title: "orders (FK user_id)", tech: "total, status, curr", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
        { title: "order_items", tech: "product_id, qty", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
        { title: "products (PK id)", tech: "sku, stock, price", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
        { title: "payments", tech: "stripe_charge_id", color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
      ],
    },
    k8s: {
      title: "Kubernetes Delivery Topology",
      subtitle: "Git Push → SonarQube Security → Multi-arch Docker → ArgoCD Canary Rollout",
      badge: "CI/CD Pipeline",
      nodes: [
        { title: "Git Push", tech: "GitHub Webhook", color: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
        { title: "Unit Tests", tech: "Jest / Vitest", color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300" },
        { title: "Trivy CVE Gate", tech: "Zero Vulns", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
        { title: "Docker Build", tech: "ECR Push", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
        { title: "Canary 10%", tech: "Argo Rollouts", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
      ],
    },
  };

  const currentPreview = previews[activeTab];

  return (
    <section id="diagram-studio" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="strand-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEW WORKSPACE</span>
              <span className="text-[#78716c]">·</span>
              <span className="text-[#fafaf9]">Eraser.io Inspired</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#fafaf9]">
              AI Diagram Studio
            </h2>

            <p className="text-sm md:text-base text-[#a6a09b] leading-relaxed">
              Describe systems in plain English, connect GitHub repos, or paste SQL schemas.
              AI generates fully interactive architectural topologies with visual editing,
              two-way Diagram-as-Code sync, and blast-radius failure simulations.
            </p>
          </div>

          <Link
            href="/diagram-studio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold shadow-xl shadow-indigo-600/25 transition-all group whitespace-nowrap self-start md:self-auto"
          >
            <span>Launch AI Diagram Studio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">12 Diagram Types</span>
            </div>
            <div className="text-xs text-[#a6a09b]">
              Microservices, Cloud AWS, ERD, Sequence, UML, BPMN, DFD, Mind Maps
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-1.5">
            <div className="flex items-center gap-2 text-violet-400">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">Diagram as Code</span>
            </div>
            <div className="text-xs text-[#a6a09b]">
              JSON schema &amp; Mermaid DSL with real-time 2-way synchronized editing
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400">
              <GitBranch className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">Git Auto-Mapping</span>
            </div>
            <div className="text-xs text-[#a6a09b]">
              Analyze repositories, detect models, Prisma schemas &amp; API routes
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">Blast Radius Simulator</span>
            </div>
            <div className="text-xs text-[#a6a09b]">
              Simulate service outages to model downstream cascading degradations
            </div>
          </div>
        </div>

        {/* Interactive Workspace Showcase Box */}
        <div className="rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Top Tab Bar */}
          <div className="flex items-center justify-between border-b border-[#292524] bg-[#161412] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[#a6a09b]">Preset Architecture:</span>
              <div className="flex items-center gap-1 bg-[#0c0a09] border border-[#292524] p-1 rounded-lg text-xs">
                <button
                  onClick={() => setActiveTab("saas")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "saas"
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  Microservices
                </button>
                <button
                  onClick={() => setActiveTab("rag")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "rag"
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  AI RAG Pipeline
                </button>
                <button
                  onClick={() => setActiveTab("erd")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "erd"
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  Database ERD
                </button>
                <button
                  onClick={() => setActiveTab("k8s")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "k8s"
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  CI/CD Delivery
                </button>
              </div>
            </div>

            <Link
              href="/diagram-studio"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>Open in Full Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Topology Display */}
          <div className="p-8 bg-[#0c0a09] relative overflow-hidden">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-[#fafaf9]">{currentPreview.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {currentPreview.badge}
                </span>
              </div>
              <p className="text-xs text-[#a6a09b]">{currentPreview.subtitle}</p>
            </div>

            {/* Simulated Live Connected Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative">
              {currentPreview.nodes.map((n, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border backdrop-blur-md space-y-2 relative shadow-lg ${n.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono opacity-60">Tier 0{idx + 1}</span>
                  </div>
                  <div className="font-semibold text-xs text-[#fafaf9] truncate">{n.title}</div>
                  <div className="text-[10px] font-mono opacity-80 truncate">{n.tech}</div>
                </div>
              ))}
            </div>

            {/* Bottom Controls Bar */}
            <div className="mt-8 pt-4 border-t border-[#292524] flex flex-wrap items-center justify-between gap-4 text-xs text-[#a6a09b]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real-time Layout Engine</span>
                </span>
                <span className="text-[#78716c]">·</span>
                <span>Zoom &amp; Pan Active</span>
                <span className="text-[#78716c]">·</span>
                <span>Export SVG / PNG / PDF / JSON</span>
              </div>

              <Link
                href="/diagram-studio"
                className="px-4 py-2 rounded-xl bg-[#181614] hover:bg-[#201d1a] border border-[#292524] text-xs font-semibold text-[#fafaf9] transition-colors"
              >
                Customize this diagram &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

