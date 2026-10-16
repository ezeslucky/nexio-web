"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import NexioLogo from "./NexioLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  return (
    <footer id="footer" className="bg-[#080706] border-t border-[#292524] pt-16 pb-12 text-xs text-[#a6a09b]">
      <div className="strand-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#292524]">
          {/* Brand Info & Newsletter (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <NexioLogo size="md" />
            </Link>

            <p className="text-xs text-[#a6a09b] max-w-sm leading-relaxed">
              Nexio is the next-generation workspace, knowledge operating system, and AI automation engine. One infinite canvas for writing, planning, and intelligent systems.
            </p>

            {/* System Status Pill from Strand */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141210] border border-[#292524] text-[11px] font-mono text-[#fafaf9]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All systems operational</span>
              <span className="text-[#78716c]">·</span>
              <span className="text-emerald-400 font-semibold">99.98% Uptime</span>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-[#fafaf9] mb-1.5">
                Updates on new releases &amp; AI nodes
              </div>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You are subscribed to Nexio releases.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@company.com"
                    required
                    className="flex-1 px-3 py-2 rounded-xl bg-[#141210] border border-[#292524] text-xs text-[#fafaf9] placeholder-[#78716c] focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fafaf9]">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#canvas" className="hover:text-[#fafaf9] transition-colors">
                  Infinite Canvas
                </Link>
              </li>
              <li>
                <Link href="#workflows" className="hover:text-[#fafaf9] transition-colors">
                  AI Workflow Studio
                </Link>
              </li>
              <li>
                <Link href="#ai" className="hover:text-[#fafaf9] transition-colors">
                  Workspace AI Copilot
                </Link>
              </li>
              <li>
                <Link href="#connected" className="hover:text-[#fafaf9] transition-colors">
                  Relational Databases
                </Link>
              </li>
              <li>
                <Link href="/logging-sentinel" className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 font-medium">
                  <span>AI Logging Sentinel</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="#templates" className="hover:text-[#fafaf9] transition-colors">
                  Slide Canvases
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Developers & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fafaf9]">
              Developers
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#open-source" className="hover:text-[#fafaf9] transition-colors">
                  Documentation &amp; SDK
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ezeslucky/nexio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fafaf9] transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link href="#open-source" className="hover:text-[#fafaf9] transition-colors">
                  Docker Deployment
                </Link>
              </li>
              <li>
                <Link href="#templates" className="hover:text-[#fafaf9] transition-colors">
                  Plugin Architecture
                </Link>
              </li>
              <li>
                <Link href="#local-first" className="hover:text-[#fafaf9] transition-colors">
                  Local CRDT Sync
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fafaf9]">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-[#fafaf9] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#security" className="hover:text-[#fafaf9] transition-colors">
                  Security &amp; Privacy
                </Link>
              </li>
              <li>
                <Link href="#license" className="hover:text-[#fafaf9] transition-colors">
                  Apache 2.0 License
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-[#fafaf9] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-[#fafaf9] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716c]">
          <div>
            © 2026 Nexio Inc. All rights reserved. Open source under Apache 2.0.
          </div>

          <div className="flex items-center gap-4 text-[#a6a09b]">
            <a
              href="https://github.com/ezeslucky/nexio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fafaf9] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/ezeslucky"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fafaf9] transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ezeslucky"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fafaf9] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
