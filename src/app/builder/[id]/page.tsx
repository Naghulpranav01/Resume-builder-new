"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Download, Sparkles } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import ResumeEditor from "@/components/builder/ResumeEditor";
import ResumePreview from "@/components/builder/ResumePreview";

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState("editor");
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "ATS_Optimized_Resume",
  });

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <input 
            type="text" 
            defaultValue="Untitled Resume" 
            className="bg-transparent border-none outline-none text-lg font-semibold text-white placeholder-gray-600 focus:ring-0" 
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Auto-Tailor
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors border border-white/10">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 px-4 py-1.5 rounded bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors shadow-[0_0_10px_var(--accent-glow)]"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar (Left) */}
        <aside className="w-full lg:w-[45%] xl:w-[40%] flex flex-col border-r border-white/10 bg-[#0a0a0a] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Resume Details</h2>
            <ResumeEditor />
          </div>
        </aside>

        {/* Live Preview Pane (Right) */}
        <main className="hidden lg:flex flex-1 bg-[#111111] items-center justify-center p-8 overflow-y-auto">
          <div className="scale-[0.8] xl:scale-90 origin-top">
            <ResumePreview ref={componentRef} />
          </div>
        </main>
      </div>
    </div>
  );
}
