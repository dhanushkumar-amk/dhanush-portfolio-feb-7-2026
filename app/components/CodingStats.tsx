"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Trophy, Code2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Stats {
  leetcode: {
    totalSolved: number;
    ranking: number;
    totalQuestions: number;
  } | null;
}

export const CodingStats = () => {
  const [stats, setStats] = useState<Stats>({ leetcode: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://leetcode-stats-api.herokuapp.com/dhanushkumar-amk");
        const data = await response.json();
        if (data.status === "success") {
          setStats({
            leetcode: {
              totalSolved: data.totalSolved,
              ranking: data.ranking,
              totalQuestions: data.totalQuestions,
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch coding stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* LeetCode Card */}
      <motion.a
        href="https://leetcode.com/dhanushkumar-amk"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/50 p-6 transition-all hover:border-orange-500/50 dark:border-zinc-800 dark:bg-zinc-900/30 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">LeetCode</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            VERIFIED
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold text-black dark:text-white">
              {loading ? "..." : stats.leetcode?.totalSolved || "400+"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Problems Solved</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-black dark:text-white"> Top {loading ? "..." : stats.leetcode?.ranking.toLocaleString() || "Ranked"}</p>
            <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 justify-end">
              Profile <ExternalLink className="h-3 w-3" />
            </p>
          </div>
        </div>
      </motion.a>

      {/* GFG Card */}
      <motion.a
        href="https://www.geeksforgeeks.org/user/dhanushkumaramk/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/50 p-6 transition-all hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-900/30 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">GeeksforGeeks</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
            <Trophy className="h-3 w-3" />
            RANK #1
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold text-black dark:text-white">
              600+
            </p>
            <p className="text-xs text-gray-500 mt-1">Coding Score</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-black dark:text-white">College Leaderboard</p>
            <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 justify-end">
              View Rank <ExternalLink className="h-3 w-3" />
            </p>
          </div>
        </div>
      </motion.a>
    </div>
  );
};
