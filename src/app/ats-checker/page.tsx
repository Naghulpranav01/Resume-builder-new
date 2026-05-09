"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  Target,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

interface ATSResult {
  overallScore: number;
  scoreBreakdown: {
    keywordsMatch: number;
    experienceMatch: number;
    readability: number;
  };
  missingKeywords: string[];
  improvementSuggestions: string[];
  suggestedSummary: string;
}

function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "stroke-emerald-400"
      : score >= 60
        ? "stroke-amber-400"
        : "stroke-red-400";
  const glowColor =
    score >= 80
      ? "drop-shadow(0 0 12px rgba(52,211,153,0.5))"
      : score >= 60
        ? "drop-shadow(0 0 12px rgba(251,191,36,0.5))"
        : "drop-shadow(0 0 12px rgba(248,113,113,0.5))";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ filter: glowColor }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={8}
          fill="none"
          className="stroke-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={8}
          fill="none"
          className={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-xs text-gray-400 uppercase tracking-wider">ATS Score</span>
      </div>
    </div>
  );
}

function MiniBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 80
      ? "bg-emerald-400"
      : value >= 60
        ? "bg-amber-400"
        : "bg-red-400";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      console.error("Failed to analyze");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="font-bold text-lg text-white">ATS Score Checker</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Your Resume
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-64 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Target className="w-4 h-4" /> Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mx-auto"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Upload className="w-5 h-5" />
          )}
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 space-y-8"
            >
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <ScoreRing score={result.overallScore} />
                </div>
                <div className="md:col-span-2 p-8 rounded-2xl border border-white/10 bg-white/[0.03] space-y-5">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" /> Score Breakdown
                  </h3>
                  <MiniBar label="Keywords Match" value={result.scoreBreakdown.keywordsMatch} />
                  <MiniBar label="Experience Match" value={result.scoreBreakdown.experienceMatch} />
                  <MiniBar label="Readability" value={result.scoreBreakdown.readability} />
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" /> Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-400" /> Improvement Suggestions
                </h3>
                <ul className="space-y-3">
                  {result.improvementSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Suggested Summary */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" /> AI-Optimized Summary
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.03] border border-white/10 rounded-lg p-4 italic">
                  &ldquo;{result.suggestedSummary}&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
