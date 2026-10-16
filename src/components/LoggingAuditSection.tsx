"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Code2,
  Terminal,
  FileCode,
  Lock,
  Database,
  Repeat,
  Cpu,
  Eye,
  Check,
  FolderTree,
} from "lucide-react";

export default function LoggingAuditSection() {
  const [activeTab, setActiveTab] = useState<"swallowed" | "db" | "api" | "retry">("swallowed");

  const tabs = [
    {
      id: "swallowed" as const,
      label: "Swallowed Errors",
      tag: "Critical",
      file: "services/payment.service.ts:84",
      func: "processRefund()",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      description:
        "Catches failed third-party payment refunds but swallows errors into generic 500 responses without Stripe decline codes or request tracing IDs.",
      before: `  try {
    const refund = await stripe.refunds.create({ charge, amount });
    return refund;
  } catch (err) {
    // ⚠️ Swallowed error: Zero diagnostics in logs
    return { success: false, error: "Payment failed" };
  }`,
      after: `  try {
    const refund = await stripe.refunds.create({ charge, amount });
    logger.info({ requestId, charge, refundId: refund.id }, "Refund processed");
    return refund;
  } catch (err) {
    // ✅ Structured failure log with decline code & trace
    logger.error(
      { requestId, charge, amount, declineCode: err?.decline_code, message: err?.message },
      "Stripe refund transaction failed"
    );
    return { success: false, error: "Payment failed", code: err?.code };
  }`,
    },
    {
      id: "db" as const,
      label: "Database Transactions",
      tag: "Critical",
      file: "db/billing.repository.ts:142",
      func: "deductBalance()",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      description:
        "Atomic financial mutations execute without transaction isolation rollback logs or tenant correlation, making deadlock diagnosis impossible.",
      before: `  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (user.balance < amount) throw new Error("Insufficient funds");
    return await tx.user.update({ where: { id: userId }, data: { balance: { decrement: amount } } });
  });`,
      after: `  logger.debug({ requestId, userId, amount }, "Initiating account balance debit");
  try {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (user.balance < amount) {
        logger.warn({ requestId, userId, currentBalance: user.balance, amount }, "Debit rejected: Insufficient funds");
        throw new Error("Insufficient funds");
      }
      return await tx.user.update({ where: { id: userId }, data: { balance: { decrement: amount } } });
    });
  } catch (err) {
    logger.error({ requestId, userId, amount, err: err?.message }, "Database balance transaction aborted");
    throw err;
  }`,
    },
    {
      id: "api" as const,
      label: "External API Timeouts",
      tag: "High",
      file: "integrations/ai-orchestrator.ts:204",
      func: "invokeWithFallback()",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description:
        "Primary AI model request times out and silently triggers secondary fallback model with zero telemetry on latency or degraded inference state.",
      before: `  try {
    return await anthropic.messages.create({ ...options, timeout: 5000 });
  } catch (err) {
    // ⚠️ Silent fallback leaves ops blind to model outages
    return await openai.chat.completions.create(fallbackOptions);
  }`,
      after: `  const start = Date.now();
  try {
    return await anthropic.messages.create({ ...options, timeout: 5000 });
  } catch (err) {
    logger.warn(
      { primary: "claude-3-5-sonnet", fallback: "gpt-4o", elapsedMs: Date.now() - start, err: err?.message },
      "Primary LLM timed out; activating secondary fallback"
    );
    return await openai.chat.completions.create(fallbackOptions);
  }`,
    },
    {
      id: "retry" as const,
      label: "Retry Exhaustion",
      tag: "High",
      file: "workers/order.worker.ts:118",
      func: "dispatchShipment()",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description:
        "Queue consumer exhausts retry backoff loop and drops order to dead-letter queue without recording status code or backoff history.",
      before: `  let attempts = 0;
  while (attempts < 3) {
    try { return await shippingClient.post("/shipments", order); }
    catch (e) { attempts++; await sleep(1000 * Math.pow(2, attempts)); }
  }
  await dlq.push(order);`,
      after: `  let attempts = 0;
  while (attempts < 3) {
    try { return await shippingClient.post("/shipments", order); }
    catch (e) {
      attempts++;
      logger.warn({ orderId: order.id, attempts, status: e?.response?.status }, "Shipment retry triggered");
      if (attempts >= 3) break;
      await sleep(1000 * Math.pow(2, attempts));
    }
  }
  logger.error({ orderId: order.id, attempts, destinationQueue: "warehouse_dlq" }, "Shipment retries exhausted");
  await dlq.push(order);`,
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="logging-sentinel" className="py-24 md:py-32 bg-[#0a0807] relative border-t border-[#292524] overflow-hidden">
      {/* Architectural Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-amber-600/10 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="strand-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEW DEVELOPER CAPABILITY · REPO LOGGING SENTINEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fafaf9] leading-[1.12]">
            Detect logging blindspots before production strikes.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#a6a09b] leading-relaxed">
            Developers don&apos;t always add logs at every critical failure point. Nexio analyzes your entire repository&apos;s control flow, identifies swallowed errors, unmonitored database transactions, and blind APIs, then generates reviewable code patches.
          </p>
        </div>

        {/* 4 Pillars Grid: How Sentinel Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-2xl bg-[#12100e] border border-[#292524] space-y-2.5 hover:border-[#44403c] transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#fafaf9]">Repository Analysis</h3>
            <p className="text-xs text-[#a6a09b] leading-relaxed">
              Connect a Git repo or upload a ZIP. Scans source files while safely excluding vendor dependencies, build outputs, and generated code.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#12100e] border border-[#292524] space-y-2.5 hover:border-[#44403c] transition-all">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#fafaf9]">Failure-Point Detection</h3>
            <p className="text-xs text-[#a6a09b] leading-relaxed">
              Does not spam logs everywhere. Pinpoints high-risk failure paths: swallowed catch blocks, DB rollbacks, retries, and unmonitored APIs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#12100e] border border-[#292524] space-y-2.5 hover:border-[#44403c] transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#fafaf9]">AI-Generated Patches</h3>
            <p className="text-xs text-[#a6a09b] leading-relaxed">
              Generates clean, idiomatic patches conforming to your project&apos;s logger (Pino, Winston, Structlog, Zap). Review in split diff before applying.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#12100e] border border-[#292524] space-y-2.5 hover:border-[#44403c] transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#fafaf9]">Security Best Practices</h3>
            <p className="text-xs text-[#a6a09b] leading-relaxed">
              Automatically masks passwords, API tokens, credit cards, and PII. Promotes structured JSON logs with correlated request IDs.
            </p>
          </div>
        </div>

        {/* Interactive Master Showcase Card */}
        <div className="rounded-2xl bg-[#12100e] border border-[#292524] shadow-2xl overflow-hidden">
          {/* Header Bar with Tabs */}
          <div className="px-5 py-4 bg-[#161412] border-b border-[#292524] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-semibold text-[#fafaf9]">
                Live Detection Scenarios
              </span>
            </div>

            {/* Scenario Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20"
                      : "bg-[#1f1c19] text-[#a6a09b] hover:text-[#fafaf9]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border ${tab.badgeColor}`}>
                    {tab.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Body: Inspector Details */}
          <div className="p-6 space-y-6">
            {/* Scenario Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#292524]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#a6a09b]">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[#fafaf9] font-semibold">{currentTab.file}</span>
                  <span>·</span>
                  <span className="text-indigo-400">{currentTab.func}</span>
                </div>
                <p className="text-xs text-[#a6a09b] mt-1 max-w-2xl leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Zero secrets leaked
                </span>
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  96% Confidence
                </span>
              </div>
            </div>

            {/* Split Comparison Code Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
              {/* Before */}
              <div className="rounded-xl bg-[#090807] border border-rose-950/70 overflow-hidden flex flex-col">
                <div className="px-3.5 py-2 bg-rose-950/30 border-b border-rose-900/30 text-rose-300 font-semibold text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    BEFORE: Insufficient Observability
                  </span>
                  <span className="text-[10px] text-rose-400/80 font-normal">Blind failure path</span>
                </div>
                <pre className="p-4 text-rose-200/90 leading-relaxed overflow-x-auto flex-1 text-[11px]">
                  {currentTab.before}
                </pre>
              </div>

              {/* After */}
              <div className="rounded-xl bg-[#090807] border border-emerald-950/70 overflow-hidden flex flex-col">
                <div className="px-3.5 py-2 bg-emerald-950/30 border-b border-emerald-900/30 text-emerald-300 font-semibold text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    AFTER: AI Production Patch
                  </span>
                  <span className="text-[10px] text-emerald-400/80 font-normal">Context-correlated</span>
                </div>
                <pre className="p-4 text-emerald-200/90 leading-relaxed overflow-x-auto flex-1 text-[11px]">
                  {currentTab.after}
                </pre>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#78716c]">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Non-destructive AST edits · Requires developer sign-off · Compatible with Pino, Winston, Structlog &amp; Zap</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/logging-sentinel"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 transition-all transform active:scale-95"
                >
                  <span>Launch Interactive Sentinel Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
