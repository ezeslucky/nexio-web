"use client";

import React, { useState } from "react";
import {
  Play,
  Zap,
  Bot,
  GitBranch,
  Send,
  CheckCircle2,
  Clock,
  Terminal,
  RefreshCw,
  Code,
  Slack,
  Mail,
  FilePlus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function WorkflowStudioSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeWorkflow, setActiveWorkflow] = useState<"pr-review" | "ticket-triage" | "cron-digest">("pr-review");

  const [logs, setLogs] = useState<Array<{ time: string; text: string; type: "info" | "success" | "warn" }>>([
    { time: "23:08:12", text: "Pipeline initialized. Ready for trigger events.", type: "info" },
    { time: "23:08:14", text: "Webhook endpoint listening on /v1/hooks/nexio-inbound", type: "info" },
  ]);

  const handleRunWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);

    const newLogs: Array<{ time: string; text: string; type: "info" | "success" | "warn" }> = [
      { time: "23:08:20", text: "▶ Manual execution started by user.", type: "info" },
      { time: "23:08:21", text: "Trigger [GitHub Webhook]: Payload ingested: PR #418 'Add local vector cache'.", type: "success" },
    ];
    setLogs((prev) => [...prev, ...newLogs]);

    setTimeout(() => {
      setActiveStep(2);
      setLogs((prev) => [
        ...prev,
        { time: "23:08:22", text: "AI Model [Claude 3.5 Sonnet]: Processing code diff & test coverage (2,410 tokens)...", type: "info" },
        { time: "23:08:23", text: "AI Model [Claude 3.5 Sonnet]: Summary & technical tasks generated in 240ms.", type: "success" },
      ]);
    }, 1200);

    setTimeout(() => {
      setActiveStep(3);
      setLogs((prev) => [
        ...prev,
        { time: "23:08:24", text: "Logic [If / Else Condition]: Evaluated has_breaking_changes == false → True branch.", type: "info" },
      ]);
    }, 2400);

    setTimeout(() => {
      setActiveStep(4);
      setLogs((prev) => [
        ...prev,
        { time: "23:08:25", text: "Action [Create Canvas Document]: New spec block created at (x: 540, y: 320).", type: "success" },
        { time: "23:08:26", text: "Action [Slack Notification]: Sent summary to #eng-reviews.", type: "success" },
        { time: "23:08:27", text: "✓ Workflow finished successfully in 2.68s. 0 errors.", type: "success" },
      ]);
      setIsRunning(false);
    }, 3600);
  };

  return (
    <section id="workflows" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="strand-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-3 flex items-center gap-2">
              <span className="w-3 h-px bg-cyan-400" />
              VISUAL WORKFLOW STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
              Automate ideas into action.
            </h2>
            <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
              Design intelligent workflows visually. Connect triggers, AI models, conditions, code, and actions without leaving your workspace.
            </p>
          </div>

          {/* Workflow Preset Switcher */}
          <div className="flex items-center gap-2 bg-[#141210] p-1 rounded-xl border border-[#292524]">
            <button
              onClick={() => setActiveWorkflow("pr-review")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeWorkflow === "pr-review"
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              PR Review Pipeline
            </button>
            <button
              onClick={() => setActiveWorkflow("ticket-triage")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeWorkflow === "ticket-triage"
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              Ticket Triage
            </button>
            <button
              onClick={() => setActiveWorkflow("cron-digest")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeWorkflow === "cron-digest"
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                  : "text-[#a6a09b] hover:text-[#fafaf9]"
              }`}
            >
              Scheduled Digest
            </button>
          </div>
        </div>

        {/* Master Workflow Studio Mockup */}
        <div className="relative rounded-2xl md:rounded-3xl border border-[#292524] bg-[#12100e] shadow-mockup overflow-hidden">
          {/* Studio Top Action Bar */}
          <div className="flex items-center justify-between h-14 px-4 sm:px-6 bg-[#161412] border-b border-[#292524]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#fafaf9]">
                  {activeWorkflow === "pr-review" && "Pipeline: GitHub Webhook → Claude 3.5 → Canvas Spec"}
                  {activeWorkflow === "ticket-triage" && "Pipeline: Customer Email → GPT-4o Triage → Slack & Task Board"}
                  {activeWorkflow === "cron-digest" && "Pipeline: Daily 9AM Cron → Vector Search → Slide Summary"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready
                </span>
              </div>
            </div>

            {/* Run Trigger Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunWorkflow}
                disabled={isRunning}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white shadow-md transition-all active:scale-95 ${
                  isRunning
                    ? "bg-cyan-700 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-cyan-600/20"
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Test Run Workflow</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Node Editor Canvas Grid */}
          <div className="relative min-h-[500px] p-6 sm:p-10 bg-[#0a0908] bg-grid-pattern overflow-x-auto">
            {/* SVG Connecting Bezier Paths */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="flowGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Path 1: Trigger -> AI */}
              <path
                d="M 280 180 C 340 180, 360 180, 420 180"
                stroke={activeStep >= 1 ? "url(#flowGradActive)" : "#292524"}
                strokeWidth={activeStep >= 1 ? "2.5" : "1.5"}
                strokeDasharray={activeStep >= 1 ? "6 4" : "none"}
                className={activeStep >= 1 ? "animate-flow-line" : ""}
                fill="none"
              />

              {/* Path 2: AI -> Logic */}
              <path
                d="M 680 180 C 740 180, 750 180, 810 180"
                stroke={activeStep >= 2 ? "url(#flowGradActive)" : "#292524"}
                strokeWidth={activeStep >= 2 ? "2.5" : "1.5"}
                strokeDasharray={activeStep >= 2 ? "6 4" : "none"}
                className={activeStep >= 2 ? "animate-flow-line" : ""}
                fill="none"
              />

              {/* Path 3: Logic -> Actions (Branch A) */}
              <path
                d="M 1060 150 C 1110 150, 1110 120, 1170 120"
                stroke={activeStep >= 3 ? "url(#flowGradActive)" : "#292524"}
                strokeWidth={activeStep >= 3 ? "2.5" : "1.5"}
                strokeDasharray={activeStep >= 3 ? "6 4" : "none"}
                className={activeStep >= 3 ? "animate-flow-line" : ""}
                fill="none"
              />

              {/* Path 4: Logic -> Actions (Branch B) */}
              <path
                d="M 1060 210 C 1110 210, 1110 260, 1170 260"
                stroke={activeStep >= 3 ? "url(#flowGradActive)" : "#292524"}
                strokeWidth={activeStep >= 3 ? "2.5" : "1.5"}
                strokeDasharray={activeStep >= 3 ? "6 4" : "none"}
                className={activeStep >= 3 ? "animate-flow-line" : ""}
                fill="none"
              />
            </svg>

            {/* Nodes Layout Container */}
            <div className="relative z-10 flex flex-nowrap items-center gap-12 sm:gap-14 min-w-[1240px] py-6">
              {/* Node 1: Inbound Trigger Node */}
              <div
                className={`w-64 p-4 rounded-xl bg-[#141210] border transition-all shadow-card ${
                  activeStep === 1
                    ? "border-cyan-400 ring-2 ring-cyan-400/30 scale-105"
                    : "border-[#292524]"
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#292524]">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">Trigger</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <div className="text-sm font-bold text-[#fafaf9] mb-1">Webhook Ingest</div>
                <div className="text-xs text-[#a6a09b] mb-3">Listening to repository PR push events</div>

                <div className="p-2 rounded-lg bg-[#0c0a09] border border-[#292524] text-[11px] font-mono text-[#78716c]">
                  source: &quot;github.pull_request&quot;
                </div>
              </div>

              {/* Node 2: AI Processor Node */}
              <div
                className={`w-72 p-4 rounded-xl bg-[#141210] border transition-all shadow-card ${
                  activeStep === 2
                    ? "border-violet-400 ring-2 ring-violet-400/30 scale-105"
                    : "border-[#292524]"
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#292524]">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-violet-500/10 text-violet-400">
                      <Bot className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-violet-400 uppercase">AI Model</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">240ms</span>
                </div>

                <div className="text-sm font-bold text-[#fafaf9] mb-1">Claude 3.5 Sonnet</div>
                <div className="text-xs text-[#a6a09b] mb-3">Extract key architectural changes & test tasks</div>

                <div className="p-2 rounded-lg bg-[#0c0a09] border border-[#292524] text-[11px] font-mono text-[#a6a09b]">
                  temperature: 0.2 · max_tokens: 1024
                </div>
              </div>

              {/* Node 3: Logic Branching Condition */}
              <div
                className={`w-64 p-4 rounded-xl bg-[#141210] border transition-all shadow-card ${
                  activeStep === 3
                    ? "border-amber-400 ring-2 ring-amber-400/30 scale-105"
                    : "border-[#292524]"
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#292524]">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-amber-500/10 text-amber-400">
                      <GitBranch className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase">Branching</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#78716c]">if / else</span>
                </div>

                <div className="text-sm font-bold text-[#fafaf9] mb-1">Evaluate Risk Score</div>
                <div className="text-xs text-[#a6a09b] mb-3">Route based on architectural complexity</div>

                <div className="p-2 rounded-lg bg-[#0c0a09] border border-[#292524] text-[11px] font-mono text-emerald-400">
                  risk_score &lt; 0.6 → Pass
                </div>
              </div>

              {/* Node 4: Action Outputs Stack */}
              <div className="space-y-3 w-64">
                {/* Action A: Create Canvas Document */}
                <div
                  className={`p-3.5 rounded-xl bg-[#141210] border transition-all shadow-card ${
                    activeStep === 4
                      ? "border-emerald-400 ring-2 ring-emerald-400/30"
                      : "border-[#292524]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <FilePlus className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Action</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-[#fafaf9]">Create Canvas Doc</div>
                  <div className="text-[11px] text-[#a6a09b]">Injects spec card to whiteboard</div>
                </div>

                {/* Action B: Slack Notification */}
                <div
                  className={`p-3.5 rounded-xl bg-[#141210] border transition-all shadow-card ${
                    activeStep === 4
                      ? "border-emerald-400 ring-2 ring-emerald-400/30"
                      : "border-[#292524]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Slack className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Action</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-[#fafaf9]">Slack Alert #eng</div>
                  <div className="text-[11px] text-[#a6a09b]">Pings reviewers with task list</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Debug Console Drawer */}
          <div className="border-t border-[#292524] bg-[#0c0a09] p-4 sm:p-5">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#292524]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a6a09b]">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Execution Terminal</span>
                <span className="text-[#78716c]">(Local Node Engine)</span>
              </div>
              <button
                onClick={() => setLogs([{ time: "23:08:12", text: "Console logs cleared.", type: "info" }])}
                className="text-[11px] font-mono text-[#78716c] hover:text-[#a6a09b]"
              >
                Clear
              </button>
            </div>

            <div className="space-y-1.5 font-mono text-xs max-h-36 overflow-y-auto no-scrollbar">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[#78716c] text-[11px] select-none">{log.time}</span>
                  <span
                    className={`leading-relaxed ${
                      log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "warn"
                        ? "text-amber-400"
                        : "text-[#a6a09b]"
                    }`}
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-[#141210] border border-[#292524] gap-4">
          <div>
            <h4 className="text-base font-bold text-[#fafaf9]">
              Connect 120+ pre-built nodes or write TypeScript blocks
            </h4>
            <p className="text-xs text-[#a6a09b] mt-0.5">
              Support for Webhooks, Cron, OpenAI, Anthropic, Fal AI, Ollama, Slack, GitHub, Postgres &amp; Linear.
            </p>
          </div>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all whitespace-nowrap"
          >
            <span>Explore AI Workflows</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
