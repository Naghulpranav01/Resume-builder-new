"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FileText, ArrowRight, Sparkles, BarChart3, Briefcase } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="font-bold text-xl tracking-tight text-white">
              Lumina<span className="text-gray-400">CV</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/builder/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Resume
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { label: "Resumes Created", value: "3", icon: FileText },
            { label: "Avg ATS Score", value: "87%", icon: BarChart3 },
            { label: "Jobs Applied", value: "12", icon: Briefcase },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        >
          <Link href="/ats-checker">
            <div className="group p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">ATS Score Checker</h3>
                <p className="text-xs text-gray-500">Analyze your resume against a job description</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link href="/jobs">
            <div className="group p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">Job Tracker</h3>
                <p className="text-xs text-gray-500">Track applications with a Kanban board</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </motion.div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Your Resumes
            </h1>
            <p className="text-gray-400 text-sm">
              Manage and edit your ATS-optimized resumes.
            </p>
          </div>
        </div>

        {/* Resumes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Create New Card */}
          <Link href="/builder/new">
            <div className="group h-72 border-2 border-dashed border-white/10 hover:border-white/30 rounded-xl flex flex-col items-center justify-center gap-4 transition-all hover:bg-white/[0.03] cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </div>
              <span className="text-gray-400 group-hover:text-white font-medium text-sm">
                Start from scratch
              </span>
            </div>
          </Link>

          {/* Example Resume Card 1 */}
          <Link href="/builder/new">
            <div className="group h-72 border border-white/10 bg-white/[0.03] rounded-xl flex flex-col transition-all hover:border-white/30 cursor-pointer overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-semibold text-emerald-400">
                92%
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <FileText className="w-7 h-7 text-gray-500 mb-4" />
                  <h3 className="text-base font-semibold text-white mb-1">
                    Software Engineer
                  </h3>
                  <p className="text-xs text-gray-500">Updated 2 days ago</p>
                </div>
              </div>
              <div className="border-t border-white/10 p-4 bg-black/20 flex justify-between items-center group-hover:bg-white/5 transition-colors">
                <span className="text-sm font-medium text-gray-300">
                  Edit Resume
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>

          {/* Example Resume Card 2 */}
          <Link href="/builder/new">
            <div className="group h-72 border border-white/10 bg-white/[0.03] rounded-xl flex flex-col transition-all hover:border-white/30 cursor-pointer overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-xs font-semibold text-amber-400">
                74%
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <FileText className="w-7 h-7 text-gray-500 mb-4" />
                  <h3 className="text-base font-semibold text-white mb-1">
                    Product Manager
                  </h3>
                  <p className="text-xs text-gray-500">Updated 5 days ago</p>
                </div>
              </div>
              <div className="border-t border-white/10 p-4 bg-black/20 flex justify-between items-center group-hover:bg-white/5 transition-colors">
                <span className="text-sm font-medium text-gray-300">
                  Edit Resume
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
