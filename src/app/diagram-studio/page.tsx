"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DiagramStudioWorkspace from "@/components/diagram-studio/DiagramStudioWorkspace";
import InteractiveModal from "@/components/InteractiveModal";

export default function DiagramStudioPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#fafaf9] selection:bg-indigo-600/35 selection:text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Main Workspace Body */}
      <main className="flex-1 pt-20">
        <DiagramStudioWorkspace />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quickstart Modal */}
      <InteractiveModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

