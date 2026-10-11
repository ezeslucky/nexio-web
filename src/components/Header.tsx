"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  FileText,
  Shapes,
  Users,
  Globe,
  Mail,
  BookOpen,
  LayoutTemplate,
  Info,
  Newspaper,
  ChevronDown,
  Star,
  Github,
  Menu,
  X,
  Check,
  ArrowRight,
  MessageSquare,
  Twitter,
  Code2,
  Layers,
  Laptop,
} from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [showPhonetic, setShowPhonetic] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { name: "English", code: "en" },
    { name: "日本語", code: "ja" },
    { name: "한국어", code: "ko" },
    { name: "繁體中文", code: "zh-tw" },
    { name: "Deutsch", code: "de" },
    { name: "Español", code: "es" },
    { name: "Français", code: "fr" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#f8f8f7]/90 backdrop-blur-md border-b border-black/[0.08] shadow-sm py-3"
            : "bg-[#f8f8f7] py-4"
        }`}
      >
        <div className="limit-container flex items-center justify-between" ref={navRef}>
          {/* Logo & Phonetic Hint */}
          <div className="flex items-center gap-8">
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowPhonetic(true)}
              onMouseLeave={() => setShowPhonetic(false)}
            >
              <a href="#" className="flex items-center gap-2.5 group" aria-label="Nexio Home">
                {/* Nexio Monogram Icon */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#2563eb] to-[#4f46e5] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 18V6L12 14V6L20 14V18"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="20" cy="6" r="2" fill="white" />
                  </svg>
                </div>
                <span className="font-extrabold text-xl tracking-tight text-[#141414]">
                  Nexio
                </span>
              </a>

              {/* Phonetic Pronunciation Tooltip */}
              {showPhonetic && (
                <div className="absolute top-full left-0 mt-2 px-3 py-1 bg-black/85 backdrop-blur-sm text-white text-xs font-medium rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50 animate-in fade-in slide-in-from-top-1">
                  ˈnɛk.si.oʊ | nex-ee-oh
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-medium text-[#141414]">
              {/* Product Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "product" ? null : "product")
                  }
                  onMouseEnter={() => setActiveDropdown("product")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-black/[0.04] ${
                    activeDropdown === "product" ? "bg-black/[0.04] text-black" : ""
                  }`}
                >
                  <span>Product</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 text-gray-500 ${
                      activeDropdown === "product" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "product" && (
                  <div
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-[320px] bg-white rounded-xl shadow-dropdown border border-black/[0.08] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <a
                      href="#ai"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.04] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-[14px] text-black flex items-center gap-1.5">
                          Nexio AI
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-[#0284c7] font-semibold">
                            NEW
                          </span>
                        </div>
                        <p className="text-xs text-[#8e8d91] mt-0.5">
                          Neural Copilot that thinks & creates with you
                        </p>
                      </div>
                    </a>

                    <a
                      href="#write"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.04] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-[14px] text-black">Structured Docs</div>
                        <p className="text-xs text-[#8e8d91] mt-0.5">
                          Block-based Markdown editor with zero lag
                        </p>
                      </div>
                    </a>

                    <a
                      href="#draw"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.04] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Shapes size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-[14px] text-black">Infinite Canvas</div>
                        <p className="text-xs text-[#8e8d91] mt-0.5">
                          Collaborate freeform on whiteboard & slides
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")
                  }
                  onMouseEnter={() => setActiveDropdown("solutions")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-black/[0.04] ${
                    activeDropdown === "solutions" ? "bg-black/[0.04] text-black" : ""
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 text-gray-500 ${
                      activeDropdown === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "solutions" && (
                  <div
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-[330px] bg-white rounded-xl shadow-dropdown border border-black/[0.08] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <a
                      href="#plan"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.04] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Code2 size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-[14px] text-black">Engineering Teams</div>
                        <p className="text-xs text-[#8e8d91] mt-0.5">
                          RFCs, architecture specs, and bug trackers
                        </p>
                      </div>
                    </a>

                    <a
                      href="#enterprise"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.04] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Globe size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-[14px] text-black">Enterprise Cloud</div>
                        <p className="text-xs text-[#8e8d91] mt-0.5">
                          Private VPC, SSO/SAML & self-hosted nodes
                        </p>
                      </div>
                    </a>

                    <a
                      href="#demo"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.04] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-[14px] text-black">Schedule a Demo</div>
                        <p className="text-xs text-[#8e8d91] mt-0.5">
                          Tailored walkthroughs & pilot licensing
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <a
                href="#download"
                className="px-3 py-2 rounded-md hover:bg-black/[0.04] transition-colors"
              >
                Download
              </a>

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "resources" ? null : "resources")
                  }
                  onMouseEnter={() => setActiveDropdown("resources")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-black/[0.04] ${
                    activeDropdown === "resources" ? "bg-black/[0.04] text-black" : ""
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 text-gray-500 ${
                      activeDropdown === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "resources" && (
                  <div
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-[460px] bg-white rounded-xl shadow-dropdown border border-black/[0.08] p-4 z-50 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase px-2 mb-2">
                        Resources
                      </div>
                      <a
                        href="#faq"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-black/[0.04] text-[14px] text-black"
                      >
                        <BookOpen size={16} className="text-gray-500" />
                        <span>Docs & Guides</span>
                      </a>
                      <a
                        href="#templates"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-black/[0.04] text-[14px] text-black"
                      >
                        <LayoutTemplate size={16} className="text-gray-500" />
                        <span>Templates</span>
                      </a>
                      <a
                        href="#build-in-public"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-black/[0.04] text-[14px] text-black"
                      >
                        <Info size={16} className="text-gray-500" />
                        <span>Open Source</span>
                      </a>
                      <a
                        href="#changelog"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-black/[0.04] text-[14px] text-black"
                      >
                        <Newspaper size={16} className="text-gray-500" />
                        <span>Changelog</span>
                      </a>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase px-2 mb-2">
                        Community
                      </div>
                      <a
                        href="https://discord.gg/nexio"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-2.5 px-2.5 py-2 rounded-md hover:bg-black/[0.04]"
                      >
                        <MessageSquare size={16} className="text-[#5865f2] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-[14px] text-black">Discord</div>
                          <p className="text-xs text-[#8e8d91]">12k+ developer community</p>
                        </div>
                      </a>
                      <a
                        href="https://x.com/ezeslucky"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-2.5 px-2.5 py-2 rounded-md hover:bg-black/[0.04]"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-black shrink-0 mt-0.5">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <div>
                          <div className="font-medium text-[14px] text-black">X</div>
                          <p className="text-xs text-[#8e8d91]">Follow @ezeslucky updates</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#pricing"
                className="px-3 py-2 rounded-md hover:bg-black/[0.04] transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Right Part Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "lang" ? null : "lang")
                }
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 rounded-md hover:bg-black/[0.04] transition-colors"
              >
                <Globe size={14} className="text-gray-500" />
                <span>{selectedLang}</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {activeDropdown === "lang" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-dropdown border border-black/[0.08] p-1.5 z-50 animate-in fade-in zoom-in-95"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLang(l.name);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-left rounded-md hover:bg-black/[0.04] text-gray-800"
                    >
                      <span>{l.name}</span>
                      {selectedLang === l.name && (
                        <Check size={14} className="text-[#0284c7]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stars on GitHub */}
            <a
              href="https://github.com/nexio-labs/nexio"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-white rounded-full border border-black/[0.12] hover:bg-black/[0.03] transition-all duration-150 shadow-sm group"
            >
              <Github size={15} className="text-black group-hover:scale-110 transition-transform" />
              <span>52K+</span>
              <Star size={13} className="text-amber-500 fill-amber-500" />
            </a>

            {/* Book a Demo Trigger */}
            <a
              href="#demo"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#141414] border border-black/[0.16] rounded-full hover:border-[#0284c7] hover:text-[#0284c7] transition-colors"
            >
              Book a Demo
            </a>

            {/* Primary CTA */}
            <a
              href="https://app.technexio.me"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#0284c7] to-[#2563eb] hover:opacity-95 rounded-full transition-all duration-150 shadow-sm hover:shadow"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-lg focus:outline-none hover:bg-black/[0.04] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#f8f8f7] border-b border-black/[0.08] p-5 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Products
              </div>
              <a
                href="#ai"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium text-black"
              >
                <span>Nexio AI</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-[#0284c7]">
                  NEW
                </span>
              </a>
              <a
                href="#write"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-black"
              >
                Structured Docs
              </a>
              <a
                href="#draw"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-black"
              >
                Infinite Canvas
              </a>
            </div>

            <div className="h-px bg-black/[0.06]" />

            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Solutions
              </div>
              <a
                href="#plan"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-black"
              >
                Engineering Spaces
              </a>
              <a
                href="#enterprise"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-black"
              >
                Enterprise Cloud & Self-Host
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-black"
              >
                Pricing Plans
              </a>
            </div>

            <div className="h-px bg-black/[0.06]" />

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="https://github.com/nexio-labs/nexio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-white rounded-full border border-black/10"
              >
                <Github size={16} />
                <span>Star on GitHub (52k+)</span>
              </a>

              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 text-sm font-medium text-black border border-black/20 rounded-full"
              >
                Schedule Demo
              </a>

              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#0284c7] to-[#2563eb] rounded-full"
              >
                Download Nexio
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
