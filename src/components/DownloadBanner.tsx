"use client";

import React, { useState } from "react";
import {
  Monitor,
  Smartphone,
  Apple,
  Download,
  ArrowRight,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export default function DownloadBanner() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (platform: string) => {
    setDownloadSuccess(platform);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="download" className="py-20 md:py-32 bg-white border-t border-black/[0.06]">
      <div className="limit-container">
        {/* Banner Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#1e96eb] uppercase tracking-wider mb-2 block">
            Native Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight section-grad-title mb-3 leading-tight">
            Write Smarter, Work Better with AFFiNE
          </h2>
          <p className="text-base sm:text-lg text-[#424149]">
            Explore the features today, collaborate tomorrow across all your screens.
          </p>
        </div>

        {/* Two Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Desktop App */}
          <div className="p-8 rounded-3xl bg-[#fbfbfc] border border-black/[0.08] shadow-card flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1e96eb] flex items-center justify-center shadow-xs">
                    <Monitor size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">Desktop App</h3>
                    <p className="text-xs text-gray-500">macOS, Windows & Linux</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                  v0.18.2 Stable
                </span>
              </div>

              <p className="text-sm text-[#424149] leading-relaxed mb-6">
                Native desktop performance with full local SQLite engine, offline editing,
                custom shortcuts, and automatic background peer-to-peer sync.
              </p>

              {/* OS Selection Buttons */}
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold mb-6">
                <button
                  onClick={() => handleDownload("macOS")}
                  className="py-2.5 px-3 rounded-xl bg-white border border-gray-200 hover:border-[#1e96eb] hover:text-[#1e96eb] transition-all text-center"
                >
                   macOS
                </button>
                <button
                  onClick={() => handleDownload("Windows")}
                  className="py-2.5 px-3 rounded-xl bg-white border border-gray-200 hover:border-[#1e96eb] hover:text-[#1e96eb] transition-all text-center"
                >
                  ⊞ Windows
                </button>
                <button
                  onClick={() => handleDownload("Linux")}
                  className="py-2.5 px-3 rounded-xl bg-white border border-gray-200 hover:border-[#1e96eb] hover:text-[#1e96eb] transition-all text-center"
                >
                  🐧 Linux
                </button>
              </div>
            </div>

            <div>
              {downloadSuccess ? (
                <div className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2 animate-in fade-in">
                  <CheckCircle size={16} />
                  <span>Downloading for {downloadSuccess}...</span>
                </div>
              ) : (
                <button
                  onClick={() => handleDownload("macOS Universal")}
                  className="w-full py-3.5 rounded-full bg-[#1e96eb] hover:bg-[#1882cd] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Download size={16} />
                  <span>Download Desktop App</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Mobile App */}
          <div className="p-8 rounded-3xl bg-[#fbfbfc] border border-black/[0.08] shadow-card flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5438ff] flex items-center justify-center shadow-xs">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">Mobile App</h3>
                    <p className="text-xs text-gray-500">iOS & Android</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold">
                  Official Release
                </span>
              </div>

              <p className="text-sm text-[#424149] leading-relaxed mb-6">
                Capture quick thoughts on the go, view knowledge wikis, review meeting notes,
                and review whiteboard diagrams with touch and stylus support.
              </p>

              {/* Mobile Store Links */}
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold mb-6">
                <a
                  href="https://apps.apple.com/app/affine"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-3 rounded-xl bg-white border border-gray-200 hover:border-black transition-all flex items-center justify-center gap-2 text-black"
                >
                  <Apple size={16} />
                  <span>iOS App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=pro.affine.app"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-3 rounded-xl bg-white border border-gray-200 hover:border-black transition-all flex items-center justify-center gap-2 text-black"
                >
                  <span>▶ Google Play</span>
                </a>
              </div>
            </div>

            <div>
              <a
                href="https://app.affine.pro"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-white hover:bg-gray-50 border border-black/20 text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Launch Web Browser App</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
