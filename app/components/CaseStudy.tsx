"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle2, Layout, Cpu } from "lucide-react";

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    caseStudy?: {
      problem: string;
      solution: string;
      architecture: string[];
      impact: string;
    };
  };
}

export const CaseStudy = ({ isOpen, onClose, project }: CaseStudyProps) => {
  if (!project.caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 p-6 sm:p-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">Technical Case Study</span>
                <h2 className="text-3xl font-bold text-black dark:text-white mt-1">{project.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Problem Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">The Problem</h3>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.problem}
                </p>
              </section>

              {/* Solution Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">The Solution</h3>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.caseStudy.solution}
                </p>
              </section>

              {/* Architecture Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Layout className="h-5 w-5 text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">System Architecture</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.caseStudy.architecture.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Stack_{index + 1}</span>
                       <span className="text-sm font-bold text-black dark:text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Impact Section */}
              <section className="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Outcome & Impact</h3>
                </div>
                <p className="text-base font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {project.caseStudy.impact}
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
               <span>Agent ID: Dhanush_DX_01</span>
               <span>Status: Verified_System</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
