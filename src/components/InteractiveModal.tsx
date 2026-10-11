"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Terminal,
  Cloud,
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import NexioLogo from "./NexioLogo";

interface InteractiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveModal({
  isOpen,
  onClose,
}: InteractiveModalProps) {
  const [activeTab, setActiveTab] = useState<"docker" | "cloud" | "demo">("cloud");
  const [copied, setCopied] = useState(false);
  const [sandboxLaunched, setSandboxLaunched] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teamSize: "10-50",
  });

  if (!isOpen) return null;

  const dockerPullCommand = "docker pull ezeslucky441/nexio";
  const dockerRunCommand = "docker run -d -p 8080:8080 -v ~/.nexio:/data ezeslucky441/nexio:latest";
  const [copiedType, setCopiedType] = useState<"pull" | "run" | null>(null);

  const handleCopy = (text: string, type: "pull" | "run") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleLaunchSandbox = () => {
    setSandboxLaunched(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#141210] border border-[#292524] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#292524] bg-[#161412]">
          <div className="flex items-center gap-2">
            <NexioLogo size="sm" />
            <span className="text-xs font-mono text-[#a6a09b]">/ Quickstart</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#201d1a] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Option Tabs */}
        <div className="grid grid-cols-3 border-b border-[#292524] bg-[#0c0a09] text-xs font-medium">
          <button
            onClick={() => setActiveTab("cloud")}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === "cloud"
                ? "border-indigo-500 text-indigo-400 bg-[#141210]"
                : "border-transparent text-[#a6a09b] hover:text-[#fafaf9]"
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Try Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab("docker")}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === "docker"
                ? "border-indigo-500 text-indigo-400 bg-[#141210]"
                : "border-transparent text-[#a6a09b] hover:text-[#fafaf9]"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Self-Host</span>
          </button>

          <button
            onClick={() => setActiveTab("demo")}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === "demo"
                ? "border-indigo-500 text-indigo-400 bg-[#141210]"
                : "border-transparent text-[#a6a09b] hover:text-[#fafaf9]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Demo</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === "cloud" && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-1">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#fafaf9]">
                  Instant Interactive Sandbox
                </h3>
                <p className="text-xs text-[#a6a09b] max-w-sm mx-auto leading-relaxed">
                  Experience Nexio&apos;s infinite canvas, AI partner, and visual workflow studio with pre-loaded sample templates. Zero signup required.
                </p>
              </div>

              {sandboxLaunched ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sandbox Session Ready</span>
                  </div>
                  <p className="text-xs text-[#a6a09b]">
                    Your local-first session is running on this page! Feel free to interact with any canvas block or test the workflow execution in Section E.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    Start Exploring Now
                  </button>
                </div>
              ) : (
                <div className="pt-2 space-y-2.5">
                  <a
                    href="https://app.technexio.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <span>Launch Web App (app.technexio.me)</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleLaunchSandbox}
                    className="w-full py-2.5 rounded-xl text-xs font-medium text-[#a6a09b] hover:text-[#fafaf9] bg-[#141210] hover:bg-[#1a1816] border border-[#292524] flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Or Explore In-Page Sandbox</span>
                  </button>
                  <p className="text-[11px] font-mono text-center text-[#78716c] mt-2">
                    Live production app · Instant access · Local-first &amp; Cloud Sync
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "docker" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#fafaf9] mb-1">
                  Run Nexio on your machine
                </h3>
                <p className="text-xs text-[#a6a09b]">
                  Pull the official Docker image and launch a private instance with local SQLite storage.
                </p>
              </div>

              {/* 1. Docker Pull Command */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#a6a09b]">1. Pull Docker image:</div>
                <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524] flex items-center justify-between gap-3 font-mono text-xs text-cyan-300">
                  <span className="truncate">{dockerPullCommand}</span>
                  <button
                    onClick={() => handleCopy(dockerPullCommand, "pull")}
                    className="p-1.5 rounded-lg bg-[#1a1715] hover:bg-[#25221f] text-[#a6a09b] hover:text-[#fafaf9] transition-colors flex-shrink-0"
                    title="Copy pull command"
                  >
                    {copiedType === "pull" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2. Docker Run Command */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#a6a09b]">2. Run local container:</div>
                <div className="p-3 rounded-xl bg-[#0c0a09] border border-[#292524] flex items-center justify-between gap-3 font-mono text-xs text-indigo-300">
                  <span className="truncate">{dockerRunCommand}</span>
                  <button
                    onClick={() => handleCopy(dockerRunCommand, "run")}
                    className="p-1.5 rounded-lg bg-[#1a1715] hover:bg-[#25221f] text-[#a6a09b] hover:text-[#fafaf9] transition-colors flex-shrink-0"
                    title="Copy run command"
                  >
                    {copiedType === "run" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#181614] border border-[#292524] space-y-1.5 text-xs text-[#a6a09b]">
                <div className="font-semibold text-[#fafaf9]">Prerequisites:</div>
                <div>• Docker 20.10+ or Podman installed</div>
                <div>• Port 8080 open locally</div>
                <div>• Data persists automatically in <code className="text-indigo-400">~/.nexio</code></div>
              </div>
            </div>
          )}

          {activeTab === "demo" && (
            <div>
              {demoSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-[#fafaf9]">Request Received</h4>
                  <p className="text-xs text-[#a6a09b]">
                    Our solutions engineering team will reach out to schedule your 15-minute deployment briefing.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#a6a09b] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Miller"
                      className="w-full px-3 py-2 rounded-xl bg-[#0c0a09] border border-[#292524] text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#a6a09b] mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#0c0a09] border border-[#292524] text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#a6a09b] mb-1">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0c0a09] border border-[#292524] text-xs text-[#fafaf9] focus:outline-none focus:border-indigo-500"
                    >
                      <option value="1-10">1 - 10 people</option>
                      <option value="10-50">10 - 50 people</option>
                      <option value="50-200">50 - 200 people</option>
                      <option value="200+">200+ people</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Technical Walkthrough</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
