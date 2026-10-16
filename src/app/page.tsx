"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ThreePillars from "@/components/ThreePillars";
import InfiniteCanvasSection from "@/components/InfiniteCanvasSection";
import WorkflowStudioSection from "@/components/WorkflowStudioSection";
import WorkspaceAISection from "@/components/WorkspaceAISection";
import LoggingAuditSection from "@/components/LoggingAuditSection";
import ConnectedKnowledgeSection from "@/components/ConnectedKnowledgeSection";
import LocalFirstSection from "@/components/LocalFirstSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import WorkflowTemplatesSection from "@/components/WorkflowTemplatesSection";
import MetricsTestimonials from "@/components/MetricsTestimonials";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import InteractiveModal from "@/components/InteractiveModal";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";

interface Template {
  id: string;
  category: "all" | "knowledge" | "automation" | "ai";
  title: string;
  description: string;
  trigger: string;
  aiModel: string;
  result: string;
  popular?: boolean;
}

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Global listener for #demo hash triggers
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#demo") {
        setDemoModalOpen(true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#demo"]');
      if (target) {
        e.preventDefault();
        setDemoModalOpen(true);
      }
    };
    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0c0a09] text-[#fafaf9] selection:bg-indigo-600/35 selection:text-white">
      {/* 1. Strand-Inspired Architectural Navigation */}
      <Navbar onOpenDemo={() => setDemoModalOpen(true)} />

      {/* 2. Hero Section: Eyebrow, Oversized Headline, Master Interconnected Canvas Showcase */}
      <Hero onOpenDemo={() => setDemoModalOpen(true)} />

      {/* 3. Section C — Product Philosophy: "Not another tool. Your entire workspace." */}
      <ThreePillars />

      {/* 4. Section D — Infinite Canvas: "Think beyond documents." */}
      <InfiniteCanvasSection />

      {/* 5. Section E — Visual AI Workflow Studio: "Automate ideas into action." */}
      <WorkflowStudioSection />

      {/* 6. Section F — AI That Understands Your Workspace: "AI that works where your ideas live." */}
      <WorkspaceAISection />

      {/* NEW: AI-Powered Developer Tool — Repository Logging Gap Sentinel */}
      <LoggingAuditSection />

      {/* 7. Section G — One Connected Knowledge System: "Everything connected. Nothing fragmented." */}
      <ConnectedKnowledgeSection />

      {/* 8. Section H — Local-First and Real-Time Collaboration: "Your workspace. Your data." */}
      <LocalFirstSection />

      {/* 9. Section I — Open Source and Self-Hosting: "Open by design. Yours to shape." */}
      <OpenSourceSection />

      {/* 10. Section J — Workflow Templates: "Start with a workflow. Make it yours." */}
      <WorkflowTemplatesSection
        onSelectTemplate={(tpl) => setSelectedTemplate(tpl)}
      />

      {/* 11. Metrics & Social Proof: 16x faster, 6-in-1 consolidated, testimonials */}
      <MetricsTestimonials />

      {/* 12. Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* 13. Section K — Final CTA: "Give your ideas room to become something bigger." */}
      <FinalCTA onOpenDemo={() => setDemoModalOpen(true)} />

      {/* 14. Section L — Complete Footer */}
      <Footer />

      {/* Interactive Quickstart & Sandbox Modal */}
      <InteractiveModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      {/* Interactive Template Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </main>
  );
}
