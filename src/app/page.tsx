"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, BarChart3, FileText, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const ThreeDScene = dynamic(() => import("@/components/ThreeDScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
});

export default function LandingPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern -z-20" />

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-8 py-6 max-w-7xl mx-auto z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-white" />
          <span className="font-bold text-xl tracking-tight text-white">
            Lumina<span className="text-gray-400">CV</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="#features"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors font-semibold"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* 3D Scene Background for Hero */}
      <ThreeDScene />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 z-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">
              Powered by Gemini AI
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Build the resume that <br className="hidden md:block" /> beats the
            ATS.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            AI-powered resume building, rewriting, and ATS scoring. Designed to
            get you hired faster. Stop guessing, start interviewing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
            >
              Get Started for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/builder/new"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 backdrop-blur-md transition-all text-center"
            >
              View Demo
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
        >
          {[
            {
              icon: BarChart3,
              title: "Real-time ATS Scoring",
              desc: "Instantly see how your resume performs against job descriptions with a detailed breakdown.",
            },
            {
              icon: Zap,
              title: "AI Bullet Rewriting",
              desc: "Transform weak sentences into impact-driven STAR format achievements in one click.",
            },
            {
              icon: FileText,
              title: "Premium Templates",
              desc: "Stand out with minimal, highly readable, recruiter-approved ATS-safe designs.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-colors"
            >
              <feature.icon className="w-8 h-8 text-white mb-4 opacity-80" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 text-sm mt-20 border-t border-white/10 z-10">
        <p>&copy; 2026 LuminaCV. All rights reserved.</p>
      </footer>
    </div>
  );
}
