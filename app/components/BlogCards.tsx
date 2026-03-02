"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, ArrowRight } from "lucide-react";

// Add your real Medium article URLs and titles here
const articles = [
  {
    title: "Building Scalable Microservices with Node.js and Docker",
    summary: "A deep dive into designing microservices that scale horizontally — covering service discovery, inter-service communication, and containerization patterns.",
    readTime: "8 min read",
    tag: "System Design",
    url: "https://medium.com/@dhanushkumaramk",
    date: "2025",
  },
  {
    title: "Redis Pub/Sub: The Secret to Real-Time Apps at Scale",
    summary: "How I used Redis Pub/Sub to handle 5,000+ concurrent WebSocket connections without breaking a sweat. A practical guide with real benchmarks.",
    readTime: "6 min read",
    tag: "Backend",
    url: "https://medium.com/@dhanushkumaramk",
    date: "2025",
  },
  {
    title: "Offline-First Web Apps: Architecture & Trade-offs",
    summary: "Exploring the patterns behind offline-first architecture — local-first storage, sync strategies, and conflict resolution in real-world apps.",
    readTime: "10 min read",
    tag: "Architecture",
    url: "https://medium.com/@dhanushkumaramk",
    date: "2026",
  },
];

const tagColor: Record<string, string> = {
  "System Design": "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  "Backend": "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Architecture": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
};

export function BlogCards() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {articles.map((article, i) => (
          <motion.a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group flex flex-col gap-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-6 backdrop-blur-sm transition-all hover:border-gray-200 dark:hover:border-zinc-700 hover:shadow-sm"
          >
            {/* Tag */}
            <span className={`w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagColor[article.tag] ?? "bg-gray-100 text-gray-500"}`}>
              {article.tag}
            </span>

            {/* Title */}
            <h3 className="text-sm font-bold text-black dark:text-white leading-snug group-hover:underline underline-offset-2">
              {article.title}
            </h3>

            {/* Summary */}
            <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed flex-1">
              {article.summary}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                Read on Medium <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* View all link */}
      <a
        href="https://medium.com/@dhanushkumaramk"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
      >
        View all articles on Medium
        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}
