"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Github,
  Menu,
  X,
  Layout,
  FileText,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Users,
  HardDrive,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";
import NexioLogo from "./NexioLogo";
import { useGithubStars } from "@/hooks/useGithubStars";

interface NavbarProps {
  onOpenDemo?: () => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const { formattedStars } = useGithubStars();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-2.5 sm:px-6 md:px-8 pt-2.5 sm:pt-3">
      <div
        className={`w-full max-w-[1360px] rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-[#0e0d0c]/90 border-[#292524] shadow-2xl backdrop-blur-xl"
            : "bg-[#0e0d0c]/70 border-[#292524]/80 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-3 sm:px-6">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none"
            aria-label="Nexio Home"
          >
            <NexioLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("product")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#a6a09b] hover:text-[#fafaf9] rounded-lg transition-colors"
                aria-expanded={activeDropdown === "product"}
              >
                Product
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "product" ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              {activeDropdown === "product" && (
                <div className="absolute top-full left-0 w-80 pt-2 -translate-x-10">
                  <div className="p-3 bg-[#141210] border border-[#292524] rounded-xl shadow-2xl backdrop-blur-xl grid gap-1">
                    <Link
                      href="#canvas"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20">
                        <Layout className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-indigo-300 flex items-center gap-1.5">
                          Infinite Canvas
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Edgeless spatial workspace for notes, sketches & diagrams
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#ai"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-violet-300">
                          AI Workspace Partner
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Multimodal intelligence directly connected to ideas
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#workflows"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-cyan-300">
                          Visual AI Workflows
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Node-based automation pipelines with live execution
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#connected"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-amber-300">
                          Connected Knowledge Base
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Multi-view relational tables, wikis & documents
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("features")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#a6a09b] hover:text-[#fafaf9] rounded-lg transition-colors"
                aria-expanded={activeDropdown === "features"}
              >
                Features
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "features" ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              {activeDropdown === "features" && (
                <div className="absolute top-full left-0 w-80 pt-2 -translate-x-14">
                  <div className="p-3 bg-[#141210] border border-[#292524] rounded-xl shadow-2xl backdrop-blur-xl grid gap-1">
                    <Link
                      href="#local-first"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20">
                        <HardDrive className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-emerald-300">
                          Local-First & Offline
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Zero-latency SQLite engine with complete privacy
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#local-first"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-blue-300">
                          Multiplayer CRDT Sync
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Conflict-free real-time team collaboration
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#open-source"
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1f1c19] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="p-2 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafaf9] group-hover:text-rose-300">
                          Self-Hosting & Plugins
                        </div>
                        <p className="text-xs text-[#a6a09b] line-clamp-1">
                          Run on Docker with custom blocks and extensions
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="#workflows"
              className="px-3 py-1.5 text-sm font-medium text-[#a6a09b] hover:text-[#fafaf9] rounded-lg transition-colors"
            >
              Workflows
            </Link>

            <Link
              href="#templates"
              className="px-3 py-1.5 text-sm font-medium text-[#a6a09b] hover:text-[#fafaf9] rounded-lg transition-colors"
            >
              Templates
            </Link>

            <Link
              href="#open-source"
              className="px-3 py-1.5 text-sm font-medium text-[#a6a09b] hover:text-[#fafaf9] rounded-lg transition-colors"
            >
              Open Source
            </Link>

            <Link
              href="#docs"
              className="px-3 py-1.5 text-sm font-medium text-[#a6a09b] hover:text-[#fafaf9] rounded-lg transition-colors"
            >
              Documentation
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* GitHub Star Pill */}
            <a
              href="https://github.com/ezeslucky/nexio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181614] hover:bg-[#221f1c] border border-[#292524] text-xs font-medium text-[#fafaf9] transition-all group"
            >
              <Github className="w-3.5 h-3.5 text-[#a6a09b] group-hover:text-[#fafaf9]" />
              <span className="text-[#a6a09b]">Star</span>
              <span className="w-px h-3 bg-[#292524]" />
              <span className="font-mono text-indigo-400 font-semibold">{formattedStars}</span>
            </a>

            {/* Primary CTA */}
            <a
              href="https://app.technexio.me"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/20 transition-all transform active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="https://app.technexio.me"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-md"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#a6a09b] hover:text-[#fafaf9] hover:bg-[#1a1816] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#292524] px-4 py-4 space-y-2 bg-[#0e0d0c] rounded-b-2xl">
            <Link
              href="#canvas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#fafaf9] rounded-lg hover:bg-[#1c1917]"
            >
              Infinite Canvas
            </Link>
            <Link
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#fafaf9] rounded-lg hover:bg-[#1c1917]"
            >
              AI Workflow Studio
            </Link>
            <Link
              href="#ai"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#fafaf9] rounded-lg hover:bg-[#1c1917]"
            >
              Workspace AI
            </Link>
            <Link
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#fafaf9] rounded-lg hover:bg-[#1c1917]"
            >
              Templates
            </Link>
            <Link
              href="#local-first"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#fafaf9] rounded-lg hover:bg-[#1c1917]"
            >
              Local-First Data
            </Link>
            <Link
              href="#open-source"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-[#fafaf9] rounded-lg hover:bg-[#1c1917]"
            >
              Open Source & GitHub
            </Link>

            <div className="pt-3 border-t border-[#292524] flex flex-col gap-2">
              <a
                href="https://github.com/ezeslucky/nexio"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 px-3 rounded-lg bg-[#181614] border border-[#292524] text-xs font-medium text-[#fafaf9] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-[#a6a09b]" />
                  <span>Star on GitHub</span>
                </div>
                <span className="font-mono text-indigo-400 font-semibold">★ {formattedStars}</span>
              </a>

              <a
                href="https://app.technexio.me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-indigo-600 rounded-lg flex items-center justify-center gap-1.5"
              >
                <span>Get Started with Nexio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
