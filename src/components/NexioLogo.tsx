import React from "react";
import Image from "next/image";

interface NexioLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
}

export default function NexioLogo({
  className = "",
  size = "md",
  showWordmark = true,
}: NexioLogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 30, text: "text-xl" },
    lg: { icon: 38, text: "text-2xl" },
    xl: { icon: 48, text: "text-3xl" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 font-sans ${className}`}>
      {/* Official Nexio Pinwheel / Aperture Icon from User Logo */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Nexio"
          width={currentSize.icon}
          height={currentSize.icon}
          className="rounded-lg object-contain shadow-sm transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {showWordmark && (
        <span
          className={`font-semibold tracking-[-0.03em] text-[#fafaf9] flex items-center ${currentSize.text}`}
        >
          Nexio
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1 mb-0.5 animate-pulse" />
        </span>
      )}
    </div>
  );
}
