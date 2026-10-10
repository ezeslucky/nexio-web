"use client";

import React from "react";

export default function TrustedBy() {
  const companiesRow1 = [
    { name: "Vercel", symbol: "▲" },
    { name: "Supabase", symbol: "⚡" },
    { name: "Cloudflare", symbol: "☁" },
    { name: "Linear", symbol: "◈" },
    { name: "Stripe", symbol: "///" },
    { name: "Figma", symbol: "❖" },
  ];

  const companiesRow2 = [
    { name: "GitHub", symbol: "⬡" },
    { name: "Docker", symbol: "🐳" },
    { name: "Postman", symbol: "🚀" },
    { name: "Raycast", symbol: "⌘" },
    { name: "Retool", symbol: "⚙" },
    { name: "HashiCorp", symbol: "◆" },
  ];

  return (
    <section className="py-16 md:py-24 border-y border-black/[0.06] bg-white/40 overflow-hidden">
      <div className="limit-container text-center mb-10 md:mb-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight section-grad-title max-w-xl mx-auto leading-snug">
          Trusted by ambitious startups and world-class engineering teams.
        </h2>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full overflow-hidden mb-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex gap-12 w-max animate-marquee-fast hover:[animation-play-state:paused]">
          {[...companiesRow1, ...companiesRow1, ...companiesRow1].map((comp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-black/[0.06] shadow-xs text-gray-700 hover:text-black hover:border-black/20 hover:shadow-sm transition-all duration-200 cursor-pointer select-none group"
            >
              <span className="text-base font-bold text-[#0284c7] group-hover:scale-110 transition-transform">
                {comp.symbol}
              </span>
              <span className="font-semibold text-sm tracking-tight text-gray-800">
                {comp.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex gap-12 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...companiesRow2, ...companiesRow2, ...companiesRow2].map((comp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-black/[0.06] shadow-xs text-gray-700 hover:text-black hover:border-black/20 hover:shadow-sm transition-all duration-200 cursor-pointer select-none group"
            >
              <span className="text-base font-bold text-[#2563eb] group-hover:scale-110 transition-transform">
                {comp.symbol}
              </span>
              <span className="font-semibold text-sm tracking-tight text-gray-800">
                {comp.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
