"use client";

import React, { useState } from "react";
import {
  Github,
  Terminal,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Code2,
  Box,
  Layers,
  Puzzle,
} from "lucide-react";
import { useGithubStars } from "@/hooks/useGithubStars";

export default function OpenSourceSection() {
  const { formattedStars } = useGithubStars();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"docker" | "compose" | "plugin">("docker");

  const dockerPull = "docker pull ezeslucky441/nexio";
  const dockerRun = "docker run -d -p 8080:8080 -v ~/.nexio:/data ezeslucky441/nexio:latest";
  const dockerSnippet = `${dockerPull} && ${dockerRun}`;
  const composeYaml = `version: "3.8"
services:
  nexio:
    image: ezeslucky441/nexio:latest
    ports:
      - "8080:8080"
    volumes:
      - nexio_data:/var/lib/nexio
    environment:
      - NEXIO_LOCAL_AI_URL=http://ollama:11434
      - NEXIO_ENCRYPTION_KEY=\${NEXIO_SECRET}
volumes:
  nexio_data:`;

  const pluginCode = `import { defineNexioNode } from "@nexio/sdk";

export default defineNexioNode({
  id: "slack-incident-notifier",
  category: "actions",
  inputs: ["incident_report", "severity"],
  async execute({ inputs, client }) {
    await client.slack.postMessage({
      channel: "#incident-command",
      text: \`🚨 Severity \${inputs.severity}: \${inputs.incident_report.title}\`
    });
  }
});`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="open-source" className="py-20 md:py-28 bg-[#0c0a09] relative border-t border-[#292524] overflow-hidden">
      <div className="strand-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-px bg-indigo-500" />
            OPEN BY DESIGN
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] mb-4">
            Open by design.{" "}
            <span className="text-gradient-primary">Yours to shape.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Self-host Nexio, extend its capabilities, and build the workflows your team needs. Licensed under Apache 2.0 with a thriving developer community.
          </p>
        </div>

        {/* Developer Visual: Terminal & Configuration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Feature Highlights (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#141210] border border-[#292524] text-indigo-400 mt-1">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#fafaf9]">Single-Binary Self-Hosting</h4>
                  <p className="text-xs sm:text-sm text-[#a6a09b] mt-1 leading-relaxed">
                    Deploy anywhere in 30 seconds with Docker, Podman, or standalone binary. Zero external database dependencies required.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#141210] border border-[#292524] text-cyan-400 mt-1">
                  <Puzzle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#fafaf9]">Extensible Plugin Architecture</h4>
                  <p className="text-xs sm:text-sm text-[#a6a09b] mt-1 leading-relaxed">
                    Author custom canvas blocks, workflow nodes, and AI providers using the lightweight TypeScript SDK.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#141210] border border-[#292524] text-emerald-400 mt-1">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#fafaf9]">Local AI Integration</h4>
                  <p className="text-xs sm:text-sm text-[#a6a09b] mt-1 leading-relaxed">
                    Connect local Ollama, vLLM, or LM Studio instances for 100% air-gapped private intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/ezeslucky/nexio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Explore on GitHub</span>
                <span className="font-mono text-xs text-indigo-200 bg-indigo-700/80 px-2 py-0.5 rounded-md ml-0.5">★ {formattedStars}</span>
              </a>

              <a
                href="#docs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#fafaf9] bg-[#141210] hover:bg-[#1c1917] border border-[#292524] transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#a6a09b]" />
                <span>Read the Documentation</span>
              </a>
            </div>
          </div>

          {/* Right Column: Code & Terminal Preview (Col 6-12) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#141210] border border-[#292524] shadow-mockup overflow-hidden">
            {/* Window Tabs Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-12 bg-[#161412] border-b border-[#292524]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("docker")}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                    activeTab === "docker"
                      ? "bg-[#0c0a09] text-indigo-400 border border-[#292524]"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  docker run
                </button>
                <button
                  onClick={() => setActiveTab("compose")}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                    activeTab === "compose"
                      ? "bg-[#0c0a09] text-indigo-400 border border-[#292524]"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  docker-compose.yml
                </button>
                <button
                  onClick={() => setActiveTab("plugin")}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                    activeTab === "plugin"
                      ? "bg-[#0c0a09] text-indigo-400 border border-[#292524]"
                      : "text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  custom-node.ts
                </button>
              </div>

              {/* Copy Button */}
              <button
                onClick={() =>
                  handleCopy(
                    activeTab === "docker"
                      ? dockerSnippet
                      : activeTab === "compose"
                      ? composeYaml
                      : pluginCode
                  )
                }
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#a6a09b] hover:text-[#fafaf9] bg-[#0c0a09] border border-[#292524] rounded-md transition-colors"
                title="Copy snippet"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-5 sm:p-6 bg-[#0c0a09] font-mono text-xs overflow-x-auto min-h-[220px]">
              {activeTab === "docker" && (
                <div className="space-y-2 text-[#fafaf9]">
                  <div className="text-[#78716c]"># 1. Pull the official Nexio Docker image:</div>
                  <div className="text-cyan-300">
                    <span className="text-[#78716c]">$ </span>
                    {dockerPull}
                  </div>
                  <div className="text-[#78716c] pt-2"># 2. Run local container with persistent storage:</div>
                  <div className="text-indigo-300">
                    <span className="text-[#78716c]">$ </span>
                    {dockerRun}
                  </div>
                  <div className="text-emerald-400 pt-2 text-[11px]">
                    ✔ Container running on http://localhost:8080 (0.4s)
                  </div>
                </div>
              )}

              {activeTab === "compose" && (
                <pre className="text-cyan-300/90 leading-relaxed font-mono text-[11px]">
                  {composeYaml}
                </pre>
              )}

              {activeTab === "plugin" && (
                <pre className="text-violet-300/90 leading-relaxed font-mono text-[11px]">
                  {pluginCode}
                </pre>
              )}
            </div>

            {/* Bottom Terminal Status */}
            <div className="px-5 py-3 bg-[#12100e] border-t border-[#292524] flex items-center justify-between text-xs font-mono text-[#78716c]">
              <span>License: Apache-2.0</span>
              <span className="text-indigo-400">github.com/ezeslucky/nexio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
