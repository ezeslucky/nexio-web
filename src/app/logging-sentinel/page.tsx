"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
  GitPullRequest,
  RefreshCw,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  Code2,
  FolderTree,
  Terminal,
  FileCode,
  Layers,
  Eye,
  SlidersHorizontal,
  Lock,
  Database,
  Globe,
  Repeat,
  Bug,
  Cpu,
  Github,
  UploadCloud,
  FileText,
  Activity,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";

export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Category =
  | "Empty Catch / Swallowed Error"
  | "Database Transaction Failure"
  | "External API Observability"
  | "Retry & Timeout Logic"
  | "Critical Business Logic"
  | "Sensitive Data Masking";

export interface LoggingGap {
  id: string;
  filePath: string;
  line: number;
  functionName: string;
  category: Category;
  severity: Severity;
  confidence: number;
  explanation: string;
  recommendedLocation: string;
  originalCode: string;
  suggestedPatch: string;
  framework: string;
  bestPractices: {
    structuredFields: boolean;
    secretsMasked: boolean;
    requestIdCorrelated: boolean;
    performanceSafe: boolean;
  };
  status: "pending" | "accepted" | "rejected";
}

const DEMO_REPOSITORIES = [
  {
    id: "ecommerce-backend",
    name: "nexio-org/ecommerce-backend-api",
    branch: "main",
    stack: "TypeScript · Node.js · Prisma · Pino",
    filesCount: 42,
    loc: 11420,
    detectedFramework: "Pino (Structured JSON)",
    description: "Production payment processing, shopping cart, and order dispatch microservices.",
  },
  {
    id: "fintech-auth",
    name: "nexio-org/fintech-auth-service",
    branch: "prod",
    stack: "TypeScript · Express · Redis · Winston",
    filesCount: 28,
    loc: 7850,
    detectedFramework: "Winston (Level-based)",
    description: "OAuth2 authentication, JWT tokens, session lifecycle & role-based authorization.",
  },
  {
    id: "data-pipeline",
    name: "nexio-org/data-stream-orchestrator",
    branch: "main",
    stack: "Python · FastAPI · SQLAlchemy · Structlog",
    filesCount: 36,
    loc: 9240,
    detectedFramework: "Structlog (Contextual)",
    description: "ETL workers, vector index ingestion, and S3 multipart chunk uploads.",
  },
];

const INITIAL_GAPS: LoggingGap[] = [
  {
    id: "gap-1",
    filePath: "src/services/payment.service.ts",
    line: 84,
    functionName: "processRefund()",
    category: "Empty Catch / Swallowed Error",
    severity: "Critical",
    confidence: 98,
    explanation:
      "A failed Stripe refund catch block catches the error but swallows it, returning a generic 500 without capturing Stripe decline codes, error messages, or request tracing IDs. Support engineers cannot diagnose failed customer refunds.",
    recommendedLocation: "Inside the catch block before rethrowing or sending response",
    originalCode: `  try {
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: refundAmountInCents,
    });
    return refund;
  } catch (err) {
    // Error is swallowed with no diagnostics
    return { success: false, error: "Payment refund failure" };
  }`,
    suggestedPatch: `  try {
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: refundAmountInCents,
    });
    logger.info({ requestId, chargeId, refundId: refund.id }, "Payment refund completed successfully");
    return refund;
  } catch (err) {
    logger.error(
      {
        requestId,
        chargeId,
        refundAmountInCents,
        stripeErrorCode: (err as any)?.code,
        stripeDeclineCode: (err as any)?.decline_code,
        errMessage: (err as Error)?.message,
      },
      "Stripe refund transaction failed"
    );
    return { success: false, error: "Payment refund failure", code: (err as any)?.code || "REFUND_ERROR" };
  }`,
    framework: "Pino",
    bestPractices: {
      structuredFields: true,
      secretsMasked: true,
      requestIdCorrelated: true,
      performanceSafe: true,
    },
    status: "pending",
  },
  {
    id: "gap-2",
    filePath: "src/db/repositories/billing.repository.ts",
    line: 142,
    functionName: "deductAccountBalance()",
    category: "Database Transaction Failure",
    severity: "Critical",
    confidence: 96,
    explanation:
      "Database balance mutation occurs inside a Prisma transaction. If a deadlock or rollback happens, it fails silently or throws uncaught without transaction isolation context or tenant identification.",
    recommendedLocation: "Transaction rollback handler and pre-mutation checkpoint",
    originalCode: `  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (user.balance < amount) throw new Error("Insufficient funds");

    return await tx.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    });
  });`,
    suggestedPatch: `  logger.debug({ requestId, userId, amount }, "Initiating account balance debit transaction");
  try {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (user.balance < amount) {
        logger.warn({ requestId, userId, currentBalance: user.balance, attemptedDebit: amount }, "Debit rejected: Insufficient balance");
        throw new Error("Insufficient funds");
      }

      const updated = await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: amount } },
      });
      logger.info({ requestId, userId, newBalance: updated.balance }, "Account balance successfully debited");
      return updated;
    });
  } catch (err) {
    logger.error({ requestId, userId, amount, err: (err as Error)?.message }, "Database balance transaction aborted");
    throw err;
  }`,
    framework: "Pino",
    bestPractices: {
      structuredFields: true,
      secretsMasked: true,
      requestIdCorrelated: true,
      performanceSafe: true,
    },
    status: "pending",
  },
  {
    id: "gap-3",
    filePath: "src/controllers/auth.controller.ts",
    line: 67,
    functionName: "exchangeOAuthToken()",
    category: "Critical Business Logic",
    severity: "High",
    confidence: 94,
    explanation:
      "Token exchange grants user access, but fails to log state transition or client user-agent. Additionally, if the provider rejects the grant, no security audit log is written, obscuring brute-force or hijacked code attempts.",
    recommendedLocation: "Post token verification and provider error branch",
    originalCode: `  const tokenData = await oauthProvider.verify(authCode);
  if (!tokenData.valid) {
    return res.status(401).json({ message: "Invalid authorization code" });
  }

  const session = await createSession(tokenData.userId);
  return res.json({ token: session.jwt });`,
    suggestedPatch: `  const tokenData = await oauthProvider.verify(authCode);
  if (!tokenData.valid) {
    logger.warn(
      {
        requestId,
        clientIp: req.ip,
        userAgent: req.headers["user-agent"],
        providerError: tokenData.reason,
      },
      "Security alert: Failed OAuth2 token exchange attempt"
    );
    return res.status(401).json({ message: "Invalid authorization code" });
  }

  const session = await createSession(tokenData.userId);
  logger.info(
    {
      requestId,
      userId: tokenData.userId,
      sessionId: session.id,
      authMethod: "oauth2_google",
    },
    "User successfully authenticated via OAuth2"
  );
  return res.json({ token: session.jwt });`,
    framework: "Pino",
    bestPractices: {
      structuredFields: true,
      secretsMasked: true, // authCode/jwt omitted
      requestIdCorrelated: true,
      performanceSafe: true,
    },
    status: "pending",
  },
  {
    id: "gap-4",
    filePath: "src/workers/order-fulfillment.worker.ts",
    line: 118,
    functionName: "dispatchToWarehouse()",
    category: "Retry & Timeout Logic",
    severity: "High",
    confidence: 93,
    explanation:
      "Exponential backoff loop retries HTTP calls to third-party shipping API. When retries are exhausted and the message drops to the dead-letter queue, zero warning is logged with the HTTP status code or latency.",
    recommendedLocation: "Between retry backoff loops and terminal dead-letter drop",
    originalCode: `  let attempts = 0;
  while (attempts < 3) {
    try {
      return await shippingClient.post("/shipments", orderPayload);
    } catch (e) {
      attempts++;
      await sleep(1000 * Math.pow(2, attempts));
    }
  }
  await deadLetterQueue.push(orderPayload);`,
    suggestedPatch: `  let attempts = 0;
  while (attempts < 3) {
    try {
      return await shippingClient.post("/shipments", orderPayload);
    } catch (e) {
      attempts++;
      const backoffMs = 1000 * Math.pow(2, attempts);
      logger.warn(
        {
          orderId: orderPayload.orderId,
          attempts,
          backoffMs,
          status: (e as any)?.response?.status,
        },
        "Warehouse shipment API transient failure, scheduling retry"
      );
      if (attempts >= 3) break;
      await sleep(backoffMs);
    }
  }
  logger.error(
    {
      orderId: orderPayload.orderId,
      totalAttempts: attempts,
      destinationQueue: "warehouse_dlq",
    },
    "CRITICAL: Warehouse dispatch retries exhausted, routed to dead-letter queue"
  );
  await deadLetterQueue.push(orderPayload);`,
    framework: "Pino",
    bestPractices: {
      structuredFields: true,
      secretsMasked: true,
      requestIdCorrelated: false,
      performanceSafe: true,
    },
    status: "pending",
  },
  {
    id: "gap-5",
    filePath: "src/integrations/ai-orchestrator.ts",
    line: 204,
    functionName: "invokeAnthropicWithFallback()",
    category: "External API Observability",
    severity: "Medium",
    confidence: 90,
    explanation:
      "When primary Claude 3.5 Sonnet request times out, it silently triggers fallback to GPT-4o without logging model degraded state, token usage, or latency discrepancy.",
    recommendedLocation: "Inside the fallback trigger branch",
    originalCode: `  try {
    return await anthropic.messages.create({ ...options, timeout: 5000 });
  } catch (err) {
    return await openai.chat.completions.create(fallbackOptions);
  }`,
    suggestedPatch: `  const startTime = Date.now();
  try {
    return await anthropic.messages.create({ ...options, timeout: 5000 });
  } catch (err) {
    const elapsedMs = Date.now() - startTime;
    logger.warn(
      {
        primaryModel: "claude-3-5-sonnet",
        fallbackModel: "gpt-4o",
        elapsedMs,
        errorReason: (err as Error)?.message,
      },
      "Primary LLM request failed or timed out; triggering secondary model fallback"
    );
    return await openai.chat.completions.create(fallbackOptions);
  }`,
    framework: "Pino",
    bestPractices: {
      structuredFields: true,
      secretsMasked: true,
      requestIdCorrelated: true,
      performanceSafe: true,
    },
    status: "pending",
  },
  {
    id: "gap-6",
    filePath: "src/middleware/rate-limiter.ts",
    line: 45,
    functionName: "checkRateLimit()",
    category: "Critical Business Logic",
    severity: "Low",
    confidence: 85,
    explanation:
      "When clients exceed the 95% request consumption threshold, there is no informational log. Adding high-watermark notice allows proactive scaling before hard 429 drops.",
    recommendedLocation: "Threshold boundary comparison block",
    originalCode: `  const current = await redis.incr(key);
  if (current > limit) {
    return false;
  }
  return true;`,
    suggestedPatch: `  const current = await redis.incr(key);
  if (current > limit * 0.95 && current <= limit) {
    logger.info(
      { clientIdentifier: hashKey(key), currentUsage: current, maxLimit: limit },
      "Client API rate limit consumption exceeded 95% threshold"
    );
  }
  if (current > limit) {
    logger.warn(
      { clientIdentifier: hashKey(key), currentUsage: current, maxLimit: limit },
      "Rate limit exceeded; throttling incoming request with 429"
    );
    return false;
  }
  return true;`,
    framework: "Pino",
    bestPractices: {
      structuredFields: true,
      secretsMasked: true, // hashKey prevents logging raw key/IP
      requestIdCorrelated: false,
      performanceSafe: true,
    },
    status: "pending",
  },
];

export default function LoggingSentinelPage() {
  const [selectedRepo, setSelectedRepo] = useState(DEMO_REPOSITORIES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [scanStep, setScanStep] = useState<string>("Audit Complete");
  const [gaps, setGaps] = useState<LoggingGap[]>(INITIAL_GAPS);
  const [activeGapId, setActiveGapId] = useState<string>(INITIAL_GAPS[0].id);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [diffViewMode, setDiffViewMode] = useState<"split" | "unified">("split");
  const [copiedPatchId, setCopiedPatchId] = useState<string | null>(null);
  const [prModalOpen, setPrModalOpen] = useState(false);
  const [customRepoUrl, setCustomRepoUrl] = useState("");
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);

  // Active gap item
  const activeGap = useMemo(() => {
    return gaps.find((g) => g.id === activeGapId) || gaps[0];
  }, [gaps, activeGapId]);

  // Filtered gaps
  const filteredGaps = useMemo(() => {
    return gaps.filter((gap) => {
      if (severityFilter !== "All" && gap.severity !== severityFilter) return false;
      if (categoryFilter !== "All" && gap.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          gap.filePath.toLowerCase().includes(q) ||
          gap.functionName.toLowerCase().includes(q) ||
          gap.explanation.toLowerCase().includes(q) ||
          gap.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [gaps, severityFilter, categoryFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = gaps.length;
    const critical = gaps.filter((g) => g.severity === "Critical").length;
    const high = gaps.filter((g) => g.severity === "High").length;
    const medium = gaps.filter((g) => g.severity === "Medium").length;
    const low = gaps.filter((g) => g.severity === "Low").length;
    const accepted = gaps.filter((g) => g.status === "accepted").length;
    const rejected = gaps.filter((g) => g.status === "rejected").length;
    const pending = gaps.filter((g) => g.status === "pending").length;
    const coverageScore = Math.round(
      ((selectedRepo.loc - total * 320) / selectedRepo.loc) * 100
    );

    return {
      total,
      critical,
      high,
      medium,
      low,
      accepted,
      rejected,
      pending,
      coverageScore: Math.max(62, coverageScore),
    };
  }, [gaps, selectedRepo]);

  // Trigger simulated scan
  const handleStartScan = (repo = selectedRepo) => {
    setIsScanning(true);
    setScanProgress(10);
    setScanStep("Parsing AST and control flow graph...");

    setTimeout(() => {
      setScanProgress(35);
      setScanStep("Pruning dependencies (node_modules, dist) & identifying failure points...");
    }, 600);

    setTimeout(() => {
      setScanProgress(68);
      setScanStep("Analyzing database mutations, external APIs & unhandled catch blocks...");
    }, 1300);

    setTimeout(() => {
      setScanProgress(88);
      setScanStep("Verifying sensitive data masking & generating AST diff patches...");
    }, 2000);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep("Audit Complete · 6 Gaps Detected");
      setIsScanning(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}
    }, 2600);
  };

  // Accept a gap patch
  const handleAcceptPatch = (id: string) => {
    setGaps((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: "accepted" } : g))
    );
    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  // Reject a gap patch
  const handleRejectPatch = (id: string) => {
    setGaps((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: "rejected" } : g))
    );
  };

  // Accept all safe patches
  const handleAcceptAll = () => {
    setGaps((prev) => prev.map((g) => ({ ...g, status: "accepted" })));
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch (e) {}
  };

  // Copy patch code
  const handleCopyPatch = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPatchId(id);
    setTimeout(() => setCopiedPatchId(null), 2000);
  };

  // Download .patch file
  const handleDownloadPatchFile = () => {
    const acceptedGaps = gaps.filter((g) => g.status === "accepted");
    const gapsToExport = acceptedGaps.length > 0 ? acceptedGaps : gaps;

    let patchContent = `# Nexio AI Logging Sentinel Patch\n`;
    patchContent += `# Repository: ${selectedRepo.name}\n`;
    patchContent += `# Date: ${new Date().toISOString()}\n`;
    patchContent += `# Generated Patches: ${gapsToExport.length}\n\n`;

    gapsToExport.forEach((gap, idx) => {
      patchContent += `--- a/${gap.filePath}\n`;
      patchContent += `+++ b/${gap.filePath}\n`;
      patchContent += `@@ -${gap.line},10 +${gap.line},20 @@ ${gap.functionName}\n`;
      patchContent += `# Explanation: ${gap.explanation}\n`;
      patchContent += `# Severity: ${gap.severity} (Confidence: ${gap.confidence}%)\n`;
      patchContent += gap.suggestedPatch + "\n\n";
    });

    const blob = new Blob([patchContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nexio-logging-patches-${selectedRepo.id}.patch`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080706] text-[#fafaf9] selection:bg-indigo-600/35 selection:text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-3 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Top Header Eyebrow & Headline */}
        <div className="mb-8 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#292524]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEXIO OBSERVABILITY SENTINEL · AI DEVELOPER TOOL</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#fafaf9]">
                AI Repository Logging Gap Auditor
              </h1>
              <p className="text-sm sm:text-base text-[#a6a09b] mt-1.5 max-w-2xl leading-relaxed">
                Scan your codebase for swallowed errors, blind database transactions, unlogged third-party APIs, and missing trace contexts before incidents occur in production.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleStartScan()}
                disabled={isScanning}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
                <span>{isScanning ? "Analyzing AST..." : "Re-Scan Repository"}</span>
              </button>

              <button
                onClick={handleDownloadPatchFile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#141210] hover:bg-[#1c1917] border border-[#292524] text-[#fafaf9] text-xs font-medium transition-all"
                title="Download .patch file"
              >
                <Download className="w-3.5 h-3.5 text-[#a6a09b]" />
                <span className="hidden sm:inline">Export .patch</span>
              </button>

              <button
                onClick={() => setPrModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#141210] hover:bg-[#1c1917] border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-all"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Create PR</span>
              </button>
            </div>
          </div>

          {/* Repository Selector & Ingestion Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-[#12100e] border border-[#292524] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#78716c] uppercase tracking-wider flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                Target Repository:
              </span>

              {DEMO_REPOSITORIES.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepo(repo);
                    handleStartScan(repo);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    selectedRepo.id === repo.id
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25"
                      : "bg-[#181614] text-[#a6a09b] hover:text-[#fafaf9] border-[#292524] hover:border-[#44403c]"
                  }`}
                >
                  {repo.name.split("/")[1]}
                </button>
              ))}

              <button
                onClick={() => setIsCustomInputOpen(!isCustomInputOpen)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-mono text-[#a6a09b] hover:text-[#fafaf9] bg-[#181614] border border-dashed border-[#44403c] hover:border-indigo-500 flex items-center gap-1 transition-all"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Custom Repo / ZIP</span>
              </button>
            </div>

            {/* Target Repo Metadata Badge */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#a6a09b]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {selectedRepo.detectedFramework}
              </span>
              <span>·</span>
              <span>{selectedRepo.filesCount} source files</span>
              <span>·</span>
              <span>{selectedRepo.loc.toLocaleString()} LOC</span>
            </div>
          </div>

          {/* Custom Repo Connect Bar (Conditional) */}
          {isCustomInputOpen && (
            <div className="mt-3 p-4 rounded-xl bg-[#141210] border border-indigo-500/30 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-mono text-[#a6a09b] mb-1.5">
                  Connect Public / Private GitHub Repo URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customRepoUrl}
                    onChange={(e) => setCustomRepoUrl(e.target.value)}
                    placeholder="https://github.com/my-org/core-service"
                    className="flex-1 px-3 py-2 text-xs bg-[#0c0a09] border border-[#292524] rounded-lg text-[#fafaf9] placeholder-[#78716c] focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (!customRepoUrl) return;
                      setSelectedRepo({
                        id: "custom-repo",
                        name: customRepoUrl.replace("https://github.com/", "") || "custom/repository",
                        branch: "main",
                        stack: "Auto-detected · Multi-Language",
                        filesCount: 64,
                        loc: 18450,
                        detectedFramework: "Multi-Logger (Pino & Structlog)",
                        description: "Custom user connected software repository.",
                      });
                      setIsCustomInputOpen(false);
                      handleStartScan();
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                  >
                    Scan URL
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#a6a09b] mb-1.5">
                  Or Upload Repository ZIP Bundle:
                </label>
                <label className="flex items-center justify-center gap-2 px-3 py-2 text-xs border border-dashed border-[#44403c] hover:border-indigo-400 rounded-lg bg-[#0c0a09] text-[#a6a09b] cursor-pointer hover:text-[#fafaf9]">
                  <UploadCloud className="w-4 h-4 text-indigo-400" />
                  <span>Drop codebase .zip archive here (auto-excludes node_modules)</span>
                  <input
                    type="file"
                    accept=".zip"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedRepo({
                          id: "uploaded-zip",
                          name: e.target.files[0].name.replace(".zip", ""),
                          branch: "local-archive",
                          stack: "Extracted Archive",
                          filesCount: 52,
                          loc: 14200,
                          detectedFramework: "Detected Frameworks",
                          description: "User uploaded repository archive.",
                        });
                        setIsCustomInputOpen(false);
                        handleStartScan();
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Active Scanner Status Progress Bar */}
          {isScanning && (
            <div className="mt-4 p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin text-indigo-400" />
                  {scanStep}
                </span>
                <span className="text-[#a6a09b] font-semibold">{scanProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1c1917] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 4-Stat Executive Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          <div className="p-4 rounded-xl bg-[#12100e] border border-[#292524] space-y-1">
            <div className="text-[11px] font-mono text-[#78716c] uppercase">Total Files Scanned</div>
            <div className="text-xl sm:text-2xl font-bold text-[#fafaf9]">{selectedRepo.filesCount}</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Excluding vendor/dist</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#12100e] border border-[#292524] space-y-1">
            <div className="text-[11px] font-mono text-[#78716c] uppercase">Gaps Detected</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400">{stats.total}</div>
            <div className="text-[11px] text-[#a6a09b]">Across {selectedRepo.loc.toLocaleString()} LOC</div>
          </div>

          <div className="p-4 rounded-xl bg-[#12100e] border border-[#292524] space-y-1">
            <div className="text-[11px] font-mono text-[#78716c] uppercase">Critical &amp; High</div>
            <div className="text-xl sm:text-2xl font-bold text-rose-400">
              {stats.critical + stats.high}
            </div>
            <div className="text-[11px] text-rose-300/80">
              {stats.critical} critical · {stats.high} high
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#12100e] border border-[#292524] space-y-1">
            <div className="text-[11px] font-mono text-[#78716c] uppercase">Patches Accepted</div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-400">
              {stats.accepted} / {stats.total}
            </div>
            <div className="text-[11px] text-[#a6a09b]">
              {stats.pending} pending review
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 p-4 rounded-xl bg-[#12100e] border border-[#292524] space-y-1">
            <div className="text-[11px] font-mono text-[#78716c] uppercase">Observability Score</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">
              {stats.coverageScore}%
            </div>
            <div className="text-[11px] text-[#a6a09b]">Zero secrets exposed</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 bg-[#12100e] border border-[#292524] rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file path, function name, or error type..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#080706] border border-[#292524] rounded-lg text-[#fafaf9] placeholder-[#78716c] focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Severity Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <span className="text-[#78716c] text-[11px] mr-1 hidden sm:inline">Severity:</span>
            {["All", "Critical", "High", "Medium", "Low"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  severityFilter === sev
                    ? "bg-indigo-600 text-white font-semibold"
                    : "bg-[#181614] text-[#a6a09b] hover:text-[#fafaf9] border border-[#292524]"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Batch Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
            >
              Accept All Patches
            </button>
          </div>
        </div>

        {/* Master-Detail Findings & Patch Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Finding List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[820px] overflow-y-auto pr-1">
            {filteredGaps.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-[#12100e] border border-[#292524] text-[#a6a09b]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-[#fafaf9]">No logging gaps found</div>
                <p className="text-xs text-[#78716c] mt-1">Try resetting your filter or searching a different term.</p>
              </div>
            ) : (
              filteredGaps.map((gap) => {
                const isSelected = gap.id === activeGap.id;
                const severityColors = {
                  Critical: "text-rose-400 bg-rose-500/10 border-rose-500/25",
                  High: "text-amber-400 bg-amber-500/10 border-amber-500/25",
                  Medium: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
                  Low: "text-slate-400 bg-slate-500/10 border-slate-500/25",
                };

                return (
                  <div
                    key={gap.id}
                    onClick={() => setActiveGapId(gap.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#1c1917] border-indigo-500 shadow-md shadow-indigo-500/10"
                        : "bg-[#12100e] hover:bg-[#181614] border-[#292524]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${severityColors[gap.severity]}`}
                      >
                        {gap.severity}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {gap.status === "accepted" && (
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            <Check className="w-3 h-3" /> Accepted
                          </span>
                        )}
                        {gap.status === "rejected" && (
                          <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            <XCircle className="w-3 h-3" /> Rejected
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-[#78716c]">
                          {gap.confidence}% conf.
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-semibold text-[#fafaf9] truncate flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{gap.filePath}</span>
                      <span className="text-[#78716c]">:{gap.line}</span>
                    </div>

                    <div className="text-[11px] font-mono text-indigo-300 mt-1">
                      {gap.functionName}
                    </div>

                    <p className="text-xs text-[#a6a09b] mt-1.5 line-clamp-2 leading-relaxed">
                      {gap.explanation}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-[#292524]/60 flex items-center justify-between text-[11px] text-[#78716c]">
                      <span>Category: {gap.category}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? "text-indigo-400 translate-x-1" : ""
                        }`}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Code Inspector & AI Patch Viewer (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#12100e] border border-[#292524] p-5 shadow-2xl space-y-5">
            {/* Finding Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#292524]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#a6a09b] flex items-center gap-1.5">
                      <FolderTree className="w-3.5 h-3.5 text-indigo-400" />
                      {activeGap.filePath}
                      <span className="text-indigo-400 font-bold">#L{activeGap.line}</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#fafaf9] mt-1 flex items-center gap-2">
                    <span>{activeGap.functionName}</span>
                    <span className="text-xs font-mono font-normal text-[#a6a09b] bg-[#1a1816] px-2 py-0.5 rounded border border-[#292524]">
                      {activeGap.category}
                    </span>
                  </h3>
                </div>

                {/* Accept / Reject Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRejectPatch(activeGap.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeGap.status === "rejected"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                        : "bg-[#181614] text-[#a6a09b] hover:text-[#fafaf9] border-[#292524]"
                    }`}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAcceptPatch(activeGap.id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      activeGap.status === "accepted"
                        ? "bg-emerald-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{activeGap.status === "accepted" ? "Accepted" : "Accept Patch"}</span>
                  </button>
                </div>
              </div>

              {/* Rationale Callout */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs leading-relaxed space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Why this logging statement is missing or insufficient:</span>
                </div>
                <p className="text-xs text-[#d6d3d1]">{activeGap.explanation}</p>
                <div className="text-[11px] font-mono text-amber-300/80 pt-1">
                  Recommended Injection: {activeGap.recommendedLocation}
                </div>
              </div>
            </div>

            {/* Best Practice Compliance Checklist */}
            <div className="p-3 rounded-xl bg-[#161412] border border-[#292524] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Structured JSON</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Zero Secrets Mask</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Trace Correlation</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Zero Perf Impact</span>
              </div>
            </div>

            {/* Diff Comparison View Header */}
            <div>
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-mono text-[#a6a09b] flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Before &amp; After AI-Generated Logging Patch</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="bg-[#0c0a09] border border-[#292524] rounded-lg p-0.5 flex text-[11px] font-mono">
                    <button
                      onClick={() => setDiffViewMode("split")}
                      className={`px-2 py-0.5 rounded ${
                        diffViewMode === "split"
                          ? "bg-indigo-600 text-white font-medium"
                          : "text-[#78716c] hover:text-[#fafaf9]"
                      }`}
                    >
                      Split View
                    </button>
                    <button
                      onClick={() => setDiffViewMode("unified")}
                      className={`px-2 py-0.5 rounded ${
                        diffViewMode === "unified"
                          ? "bg-indigo-600 text-white font-medium"
                          : "text-[#78716c] hover:text-[#fafaf9]"
                      }`}
                    >
                      Unified Diff
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyPatch(activeGap.id, activeGap.suggestedPatch)}
                    className="p-1.5 rounded-lg bg-[#181614] hover:bg-[#221f1c] text-[#a6a09b] hover:text-[#fafaf9] border border-[#292524]"
                    title="Copy patch code"
                  >
                    {copiedPatchId === activeGap.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Code Diff Display */}
              {diffViewMode === "split" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                  {/* Before */}
                  <div className="rounded-xl bg-[#090807] border border-rose-950/60 overflow-hidden">
                    <div className="px-3 py-1.5 bg-rose-950/30 border-b border-rose-900/30 text-rose-300 font-semibold flex items-center justify-between">
                      <span>BEFORE (Insufficient Logging)</span>
                      <span className="text-[10px] text-rose-400 font-normal">Original</span>
                    </div>
                    <pre className="p-3 text-rose-200/90 leading-relaxed overflow-x-auto selection:bg-rose-900/40">
                      {activeGap.originalCode}
                    </pre>
                  </div>

                  {/* After AI Patch */}
                  <div className="rounded-xl bg-[#090807] border border-emerald-950/60 overflow-hidden">
                    <div className="px-3 py-1.5 bg-emerald-950/30 border-b border-emerald-900/30 text-emerald-300 font-semibold flex items-center justify-between">
                      <span>AFTER (Production Patch)</span>
                      <span className="text-[10px] text-emerald-400 font-normal">AI Recommended</span>
                    </div>
                    <pre className="p-3 text-emerald-200/90 leading-relaxed overflow-x-auto selection:bg-emerald-900/40">
                      {activeGap.suggestedPatch}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-[#090807] border border-[#292524] overflow-hidden font-mono text-[11px]">
                  <div className="px-3 py-1.5 bg-[#141210] border-b border-[#292524] text-[#a6a09b] font-semibold flex items-center justify-between">
                    <span>UNIFIED GIT PATCH PREVIEW</span>
                    <span className="text-[10px] text-indigo-400">git format</span>
                  </div>
                  <div className="p-3 text-slate-300 leading-relaxed overflow-x-auto space-y-1">
                    <div className="text-cyan-400">
                      @@ -{activeGap.line},12 +{activeGap.line},22 @@ {activeGap.functionName}
                    </div>
                    <div className="text-rose-400 bg-rose-950/20 px-1 -mx-1">
                      - // Swallowed or unrecorded error boundary
                    </div>
                    {activeGap.originalCode.split("\n").map((line, i) => (
                      <div key={`orig-${i}`} className="text-rose-400/80 bg-rose-950/15 px-1 -mx-1">
                        - {line}
                      </div>
                    ))}
                    {activeGap.suggestedPatch.split("\n").map((line, i) => (
                      <div key={`patch-${i}`} className="text-emerald-400 bg-emerald-950/20 px-1 -mx-1 font-medium">
                        + {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Review Safety Note */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#78716c] font-mono border-t border-[#292524]">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Never modifies repository files without developer review &amp; explicit approval.
              </span>
              <span className="text-indigo-400">
                Confidence: {activeGap.confidence}% ({activeGap.framework} AST Engine)
              </span>
            </div>
          </div>
        </div>

        {/* PR Simulation Modal */}
        {prModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-xl rounded-2xl bg-[#141210] border border-[#292524] p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#292524] pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <GitPullRequest className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#fafaf9]">Create GitHub Pull Request</h4>
                    <p className="text-xs text-[#a6a09b]">
                      Branch: <code className="text-indigo-400">fix/ai-logging-gaps</code> → <code className="text-slate-400">main</code>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPrModalOpen(false)}
                  className="p-1 rounded-lg text-[#a6a09b] hover:text-[#fafaf9]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="text-[#a6a09b] block mb-1">Pull Request Title:</label>
                  <input
                    type="text"
                    readOnly
                    value={`fix(observability): resolve ${stats.accepted || stats.total} logging gaps across ${selectedRepo.name}`}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0a09] border border-[#292524] text-[#fafaf9]"
                  />
                </div>

                <div>
                  <label className="text-[#a6a09b] block mb-1">PR Description Summary:</label>
                  <textarea
                    rows={4}
                    readOnly
                    value={`### Summary\n- Analyzed ${selectedRepo.filesCount} source files with Nexio AI Logging Sentinel.\n- Resolved ${stats.accepted || stats.total} observability gaps in critical failure paths.\n- Added structured ${selectedRepo.detectedFramework} statements with trace correlation.\n- Verified zero sensitive data (tokens/passwords) leaked.`}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0a09] border border-[#292524] text-[#a6a09b] leading-relaxed resize-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Ready to push branch to GitHub with signed developer commit.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setPrModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#a6a09b] hover:text-[#fafaf9]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setPrModalOpen(false);
                    handleAcceptAll();
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all"
                >
                  Confirm &amp; Create PR
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
