"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Plus,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

type JobStatus = "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

interface JobEntry {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  appliedAt: string;
  notes?: string;
}

const COLUMNS: { key: JobStatus; label: string; color: string; icon: React.ElementType }[] = [
  { key: "APPLIED", label: "Applied", color: "border-blue-500/30 bg-blue-500/5", icon: Clock },
  { key: "SCREENING", label: "Screening", color: "border-purple-500/30 bg-purple-500/5", icon: MessageSquare },
  { key: "INTERVIEW", label: "Interview", color: "border-amber-500/30 bg-amber-500/5", icon: Briefcase },
  { key: "OFFER", label: "Offer", color: "border-emerald-500/30 bg-emerald-500/5", icon: CheckCircle2 },
  { key: "REJECTED", label: "Rejected", color: "border-red-500/30 bg-red-500/5", icon: XCircle },
];

const SAMPLE_JOBS: JobEntry[] = [
  { id: "1", company: "Google", position: "Senior Frontend Engineer", status: "INTERVIEW", appliedAt: "2026-05-01" },
  { id: "2", company: "Stripe", position: "Full-Stack Developer", status: "APPLIED", appliedAt: "2026-05-05" },
  { id: "3", company: "Vercel", position: "Software Engineer", status: "SCREENING", appliedAt: "2026-05-03" },
  { id: "4", company: "Linear", position: "Product Engineer", status: "APPLIED", appliedAt: "2026-05-07" },
  { id: "5", company: "Notion", position: "Backend Engineer", status: "OFFER", appliedAt: "2026-04-20" },
  { id: "6", company: "Meta", position: "ML Engineer", status: "REJECTED", appliedAt: "2026-04-15" },
];

function JobCard({ job }: { job: JobEntry }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-semibold text-white">{job.position}</h4>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-3">{job.company}</p>
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {new Date(job.appliedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </div>
    </motion.div>
  );
}

export default function JobTrackerPage() {
  const [jobs] = useState<JobEntry[]>(SAMPLE_JOBS);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="font-bold text-lg text-white">Job Tracker</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
            <Plus className="w-4 h-4" />
            Add Job
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {COLUMNS.map((col) => {
            const colJobs = jobs.filter((j) => j.status === col.key);
            return (
              <div key={col.key} className="w-72 shrink-0">
                {/* Column Header */}
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${col.color} mb-4`}>
                  <col.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-white">{col.label}</span>
                  <span className="ml-auto text-xs text-gray-500 bg-white/10 px-2 py-0.5 rounded-full">
                    {colJobs.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {colJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                  {colJobs.length === 0 && (
                    <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
                      <p className="text-xs text-gray-500">No jobs here yet</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
