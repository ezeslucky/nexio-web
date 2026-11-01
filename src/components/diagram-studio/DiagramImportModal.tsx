"use client";

import React, { useState } from "react";
import { DiagramDocument } from "@/types/diagram";
import {
  convertSqlToErd,
  convertTerraformToDiagram,
  convertYamlToDiagram,
  convertMarkdownToDiagram,
  convertImageToDiagram,
  convertGitRepoToDiagram,
} from "@/lib/diagram/converters";
import {
  X,
  Upload,
  GitBranch,
  Database,
  Cloud,
  FileCode,
  FileText,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";

interface DiagramImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (diagram: DiagramDocument) => void;
}

type ImportTab =
  | "git"
  | "sql"
  | "terraform"
  | "yaml"
  | "image"
  | "pdf"
  | "markdown"
  | "json";

export default function DiagramImportModal({
  isOpen,
  onClose,
  onImportComplete,
}: DiagramImportModalProps) {
  const [activeTab, setActiveTab] = useState<ImportTab>("git");

  // Inputs
  const [repoUrl, setRepoUrl] = useState("https://github.com/fastapi/full-stack-fastapi-template");
  const [sqlText, setSqlText] = useState(`CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  plan VARCHAR(32) DEFAULT 'free'
);

CREATE TABLE memberships (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  org_id UUID REFERENCES organizations(id),
  role VARCHAR(32) DEFAULT 'member'
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(64) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);`);

  const [tfText, setTfText] = useState(`resource "aws_vpc" "production_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_lb" "external_alb" {
  name = "prod-public-alb"
  load_balancer_type = "application"
}

resource "aws_ecs_cluster" "app_cluster" {
  name = "production-ecs-cluster"
}

resource "aws_db_instance" "postgres_primary" {
  engine = "postgres"
  instance_class = "db.r6g.xlarge"
}

resource "aws_s3_bucket" "asset_storage" {
  bucket = "company-prod-assets-vault"
}`);

  const [yamlText, setYamlText] = useState(`version: '3.8'
services:
  web:
    image: node:20-alpine
    ports:
      - "3000:3000"
    depends_on:
      - api
  api:
    image: python:3.11-slim
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"`);

  const [markdownText, setMarkdownText] = useState(`graph LR
  Client[Web Client Browser] -->|REST / HTTPS| Gateway[Envoy API Gateway]
  Gateway -->|gRPC| AuthSvc[Authentication Service]
  Gateway -->|gRPC| OrderSvc[Order Processing Service]
  OrderSvc -->|Publish Event| Kafka[Apache Kafka Stream]
  OrderSvc -->|SQL Mutation| Postgres[(Primary PostgreSQL)]
  Kafka -->|Consume| NotifSvc[Notification Dispatcher]`);

  const [jsonText, setJsonText] = useState("");
  const [imageFileName, setImageFileName] = useState("system-architecture-sketch.png");
  const [pdfFileName, setPdfFileName] = useState("enterprise-architecture-spec.pdf");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConvert = () => {
    setIsProcessing(true);

    setTimeout(() => {
      let result: DiagramDocument | null = null;

      try {
        if (activeTab === "git") {
          result = convertGitRepoToDiagram(repoUrl);
        } else if (activeTab === "sql") {
          result = convertSqlToErd(sqlText);
        } else if (activeTab === "terraform") {
          result = convertTerraformToDiagram(tfText);
        } else if (activeTab === "yaml") {
          result = convertYamlToDiagram(yamlText);
        } else if (activeTab === "markdown") {
          result = convertMarkdownToDiagram(markdownText);
        } else if (activeTab === "image") {
          result = convertImageToDiagram(imageFileName);
        } else if (activeTab === "pdf") {
          result = convertMarkdownToDiagram(`graph LR
            DocSpec[Architectural Specification Document] -->|Requirement Parsing| CoreSvc[Core Service Mesh]
            CoreSvc -->|Database Schema| EnterpriseDB[(Enterprise Database Cluster)]
            CoreSvc -->|Secure Ingress| EdgeFirewall[Edge TLS Gateway]`);
        } else if (activeTab === "json") {
          const parsed = JSON.parse(jsonText);
          result = {
            ...parsed,
            id: `doc-${Date.now()}`,
            updatedAt: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.error("Conversion failed:", err);
      }

      setIsProcessing(false);
      if (result) {
        onImportComplete(result);
        onClose();
      }
    }, 500);
  };

  const tabs: Array<{ id: ImportTab; label: string; icon: React.ElementType }> = [
    { id: "git", label: "Git Repository", icon: GitBranch },
    { id: "sql", label: "SQL to ERD", icon: Database },
    { id: "terraform", label: "Terraform", icon: Cloud },
    { id: "yaml", label: "YAML / Docker", icon: FileCode },
    { id: "image", label: "Image to Diagram", icon: ImageIcon },
    { id: "pdf", label: "PDF Document", icon: FileText },
    { id: "markdown", label: "Mermaid / MD", icon: Code2 },
    { id: "json", label: "JSON Source", icon: Upload },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#292524] bg-[#161412]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#fafaf9]">
                Import &amp; Convert to Diagram
              </h2>
              <p className="text-xs text-[#a6a09b]">
                Auto-convert codebases, schemas, Terraform, images &amp; specs into editable diagrams
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-[#292524] bg-[#0c0a09] overflow-x-auto no-scrollbar text-xs">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                    : "border-transparent text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#141210]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-[#d4d4d8] space-y-4">
          {activeTab === "git" && (
            <div className="space-y-3">
              <div className="text-xs text-[#a6a09b]">
                Enter any public GitHub repository URL or choose a pre-configured architecture:
              </div>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repository"
                className="w-full bg-[#0c0a09] border border-[#292524] rounded-xl px-3.5 py-2.5 text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#78716c]">
                <span>Sample Repos:</span>
                <button
                  onClick={() => setRepoUrl("https://github.com/expressjs/express")}
                  className="hover:text-indigo-400 underline"
                >
                  expressjs/express
                </button>
                <span>·</span>
                <button
                  onClick={() => setRepoUrl("https://github.com/vercel/next.js")}
                  className="hover:text-indigo-400 underline"
                >
                  vercel/next.js
                </button>
                <span>·</span>
                <button
                  onClick={() => setRepoUrl("https://github.com/langchain-ai/langchain")}
                  className="hover:text-indigo-400 underline"
                >
                  langchain
                </button>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
                AI will inspect folder hierarchy, controller endpoints, Prisma/TypeORM data models, and dependencies to synthesize an interactive topology diagram.
              </div>
            </div>
          )}

          {activeTab === "sql" && (
            <div className="space-y-2">
              <label className="text-xs text-[#a6a09b]">
                Paste PostgreSQL / MySQL / SQLite DDL CREATE TABLE statements:
              </label>
              <textarea
                value={sqlText}
                onChange={(e) => setSqlText(e.target.value)}
                rows={10}
                className="w-full p-3 bg-[#0c0a09] border border-[#292524] rounded-xl font-mono text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === "terraform" && (
            <div className="space-y-2">
              <label className="text-xs text-[#a6a09b]">
                Paste Terraform / OpenTofu HCL resource blocks:
              </label>
              <textarea
                value={tfText}
                onChange={(e) => setTfText(e.target.value)}
                rows={10}
                className="w-full p-3 bg-[#0c0a09] border border-[#292524] rounded-xl font-mono text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === "yaml" && (
            <div className="space-y-2">
              <label className="text-xs text-[#a6a09b]">
                Paste Docker Compose or Kubernetes Manifest YAML:
              </label>
              <textarea
                value={yamlText}
                onChange={(e) => setYamlText(e.target.value)}
                rows={10}
                className="w-full p-3 bg-[#0c0a09] border border-[#292524] rounded-xl font-mono text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === "image" && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-[#292524] hover:border-indigo-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors bg-[#0c0a09]/50">
                <ImageIcon className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <div className="font-semibold text-xs text-[#fafaf9]">
                  Upload Architecture Screenshot / Whiteboard Image
                </div>
                <div className="text-[11px] text-[#78716c] mt-1">
                  Supports PNG, JPG, WebP. AI vision converts boxes and arrows into interactive vector nodes.
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181614] border border-[#292524] text-[11px] font-mono">
                <span className="text-[#a6a09b]">Selected image:</span>
                <span className="text-indigo-400">{imageFileName}</span>
              </div>
            </div>
          )}

          {activeTab === "pdf" && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-[#292524] hover:border-indigo-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors bg-[#0c0a09]/50">
                <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="font-semibold text-xs text-[#fafaf9]">
                  Upload PDF System Architecture Document
                </div>
                <div className="text-[11px] text-[#78716c] mt-1">
                  Extracts architectural requirements and topologies into editable diagrams.
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181614] border border-[#292524] text-[11px] font-mono">
                <span className="text-[#a6a09b]">Document:</span>
                <span className="text-cyan-400">{pdfFileName}</span>
              </div>
            </div>
          )}

          {activeTab === "markdown" && (
            <div className="space-y-2">
              <label className="text-xs text-[#a6a09b]">
                Paste Mermaid DSL syntax or Markdown bullet diagrams:
              </label>
              <textarea
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
                rows={10}
                className="w-full p-3 bg-[#0c0a09] border border-[#292524] rounded-xl font-mono text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === "json" && (
            <div className="space-y-2">
              <label className="text-xs text-[#a6a09b]">
                Paste Diagram JSON Schema definition:
              </label>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='{ "title": "Custom Diagram", "nodes": [], "edges": [] }'
                rows={10}
                className="w-full p-3 bg-[#0c0a09] border border-[#292524] rounded-xl font-mono text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[#292524] bg-[#161412]">
          <span className="text-[11px] text-[#a6a09b]">
            All imported diagrams remain 100% visually editable.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <span>Convert &amp; Open Canvas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

