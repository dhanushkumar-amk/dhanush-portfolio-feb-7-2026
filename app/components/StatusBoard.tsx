"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Cpu, Globe, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export const StatusBoard = () => {
  const [uptime, setUptime] = useState("420:12:05:08");
  const [activeWorkflows, setActiveWorkflows] = useState(14);
  const [systemLoad, setSystemLoad] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      // Fake real-time variations
      setSystemLoad(prev => Math.max(5, Math.min(45, prev + (Math.random() * 4 - 2))));

      // Update uptime (simple increment simulation)
      const now = new Date();
      const formatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}:${String(now.getMilliseconds()).substring(0, 2)}`;
      // Not real uptime but looks cool for a dashboard
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      label: "n8n Workflows",
      value: activeWorkflows,
      unit: "ACTIVE",
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      trend: "+2 since last week"
    },
    {
      label: "System Load",
      value: Math.round(systemLoad),
      unit: "%",
      icon: <Cpu className="h-4 w-4 text-blue-500" />,
      trend: "Optimal"
    },
    {
      label: "Global Reach",
      value: "99.9",
      unit: "% UPTIME",
      icon: <Globe className="h-4 w-4 text-emerald-500" />,
      trend: "Across 4 Regions"
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Dhanush OS v1.2.4
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-wider">Systems Nominal</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <Clock className="h-3 w-3" />
            <span>SESSION_UPTIME: 04:12:44:22</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-blue-900/50"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                {metric.icon}
              </div>
              <Activity className="h-3 w-3 text-zinc-200 dark:text-zinc-700 animate-pulse" />
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {metric.value}
                </span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase">
                  {metric.unit}
                </span>
              </div>
              <p className="text-[10px] font-medium text-gray-400 dark:text-zinc-500 mt-1">
                {metric.label}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-zinc-800/50 flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-emerald-500/50" />
              <span className="text-[10px] text-zinc-400">{metric.trend}</span>
            </div>

            {/* Subtle Gradient Decor */}
            <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Services Status */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['API_GATEWAY', 'DB_CLUSTER', 'REDIS_CACHE', 'AUTH_SERVICE'].map((service) => (
          <div key={service} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50/50 dark:bg-zinc-900/30 border border-gray-100/50 dark:border-zinc-800/50">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 tracking-tighter">{service}</span>
            <span className="ml-auto text-[8px] text-emerald-500/70 font-bold">2ms</span>
          </div>
        ))}
      </div>
    </div>
  );
};
