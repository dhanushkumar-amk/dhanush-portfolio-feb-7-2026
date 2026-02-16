"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Server, Database, Zap, Network, BookOpen } from "lucide-react";
import { useState } from "react";
import { SystemBlueprint, BlueprintData } from "./SystemBlueprint";
import { CaseStudy } from "./CaseStudy";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  type: "frontend" | "backend" | "fullstack" | "system";
  caseStudy?: {
    problem: string;
    solution: string;
    architecture: string[];
    impact: string;
  };
  blueprint?: BlueprintData;
  status?: string;
}

const typeIcons = {
  frontend: <Code2 className="h-4 w-4" />,
  backend: <Server className="h-4 w-4" />,
  fullstack: <Zap className="h-4 w-4" />,
  system: <Database className="h-4 w-4" />,
};

const typeColors = {
  frontend: "bg-blue-500",
  backend: "bg-emerald-500",
  fullstack: "bg-purple-500",
  system: "bg-amber-500",
};

export const ProjectCard = ({ title, description, tags, githubUrl, liveUrl, type, caseStudy, blueprint, status }: ProjectCardProps) => {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-blue-900/50"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${typeColors[type]} bg-opacity-10 text-brand-primary`}>
            <span className={`text-${typeColors[type].split('-')[1]}-600 dark:text-${typeColors[type].split('-')[1]}-400`}>
              {typeIcons[type]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {status}
              </span>
            )}
            <div className="flex gap-3">
              {blueprint && (
                <button
                  onClick={() => setIsBlueprintOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-all hover:bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  <Network className="h-3 w-3" />
                  Blueprint
                </button>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-400 transition-colors hover:text-black dark:hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-400 transition-colors hover:text-black dark:hover:text-white"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="mb-6 grow text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-50 px-3 py-1 text-[10px] font-medium text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800/50 dark:text-zinc-500 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {caseStudy && (
            <button
              onClick={() => setIsCaseStudyOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 transition-all hover:bg-blue-500 hover:text-white dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              <BookOpen className="h-3 w-3" />
              Case Study
            </button>
          )}
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-white via-white/95 to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900/98 dark:to-blue-900/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.div>

      <SystemBlueprint
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
        title={title}
        data={blueprint}
      />

      <CaseStudy
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        project={{ title, caseStudy }}
      />
    </>
  );
};
