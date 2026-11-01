"use client";

import React, { useState } from "react";
import { DiagramDocument } from "@/types/diagram";
import {
  downloadSvg,
  downloadPng,
  downloadPdf,
  downloadJson,
  downloadMermaid,
  generateShareLink,
} from "@/lib/diagram/exporter";
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  FileCode,
  Image as ImageIcon,
  FileText,
  Lock,
  Globe,
  ExternalLink,
} from "lucide-react";

interface DiagramExportModalProps {
  diagram: DiagramDocument;
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagramExportModal({
  diagram,
  isOpen,
  onClose,
}: DiagramExportModalProps) {
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const shareLink = generateShareLink(diagram.id, permission);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#292524] bg-[#161412]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-[#fafaf9]">
              Export &amp; Share Diagram
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1f1c19] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Shareable Link Section */}
          <div>
            <div className="text-xs font-semibold text-[#fafaf9] mb-1.5 flex items-center justify-between">
              <span>Shareable Cloud Link</span>
              <div className="flex items-center gap-1 text-[11px] font-mono bg-[#0c0a09] border border-[#292524] p-0.5 rounded-lg">
                <button
                  onClick={() => setPermission("view")}
                  className={`px-2 py-0.5 rounded ${
                    permission === "view"
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  View-Only
                </button>
                <button
                  onClick={() => setPermission("edit")}
                  className={`px-2 py-0.5 rounded ${
                    permission === "edit"
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  Can Edit
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-1 bg-[#0c0a09] border border-[#292524] rounded-xl px-3 py-2 text-xs font-mono text-[#fafaf9] select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#78716c] mt-1.5">
              Anyone with this link will have <strong>{permission === "view" ? "read-only access" : "full collaborative edit access"}</strong> to this diagram.
            </p>
          </div>

          {/* Download File Formats */}
          <div>
            <div className="text-xs font-semibold text-[#fafaf9] mb-3">
              Download Production Assets
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* SVG Vector */}
              <button
                onClick={() => downloadSvg(diagram)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#181614] hover:bg-[#1f1c19] border border-[#292524] hover:border-indigo-500/40 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#fafaf9]">SVG Vector</div>
                  <div className="text-[10px] text-[#a6a09b]">Scalable, lossless</div>
                </div>
              </button>

              {/* High-Res PNG */}
              <button
                onClick={() => downloadPng(diagram)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#181614] hover:bg-[#1f1c19] border border-[#292524] hover:border-violet-500/40 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 group-hover:scale-105 transition-transform">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#fafaf9]">High-Res PNG</div>
                  <div className="text-[10px] text-[#a6a09b]">2x Retina raster</div>
                </div>
              </button>

              {/* PDF Architecture Spec */}
              <button
                onClick={() => downloadPdf(diagram)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#181614] hover:bg-[#1f1c19] border border-[#292524] hover:border-cyan-500/40 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#fafaf9]">PDF Architecture Doc</div>
                  <div className="text-[10px] text-[#a6a09b]">Printable audit sheet</div>
                </div>
              </button>

              {/* JSON Definition */}
              <button
                onClick={() => downloadJson(diagram)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#181614] hover:bg-[#1f1c19] border border-[#292524] hover:border-emerald-500/40 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#fafaf9]">JSON Source</div>
                  <div className="text-[10px] text-[#a6a09b]">Full data schema</div>
                </div>
              </button>
            </div>

            {/* Mermaid Source */}
            <div className="pt-2">
              <button
                onClick={() => downloadMermaid(diagram)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#181614] hover:bg-[#1f1c19] border border-[#292524] text-xs text-[#a6a09b] hover:text-[#fafaf9] transition-colors"
              >
                <span>Download Mermaid DSL (.mmd)</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

