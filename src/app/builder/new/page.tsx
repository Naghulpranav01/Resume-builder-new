"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewResumePage() {
  const router = useRouter();

  useEffect(() => {
    // In the future, this will create a new resume in the DB and redirect.
    // For now, redirect to a demo builder page.
    router.replace("/builder/demo");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Creating your resume...</p>
      </div>
    </div>
  );
}
