"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Network, Database, Cpu, Globe, ShieldCheck, Server, Zap, MessageSquare, Box } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="h-6 w-6" />,
  cpu: <Cpu className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  network: <Network className="h-6 w-6" />,
  shield: <ShieldCheck className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  message: <MessageSquare className="h-6 w-6" />,
  box: <Box className="h-6 w-6" />,
};

interface NodeProps {
  x: number;
  y: number;
  label: string;
  iconType: string;
  color: string;
}

const Node = ({ x, y, label, iconType, color }: NodeProps) => (
  <motion.foreignObject
    x={x - 40}
    y={y - 40}
    width={80}
    height={100}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", damping: 12, stiffness: 200 }}
  >
    <div className="flex flex-col items-center gap-2">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-500 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md`}>
        {iconMap[iconType] || <Box className="h-6 w-6" />}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tighter text-zinc-500 text-center leading-tight">
        {label}
      </span>
    </div>
  </motion.foreignObject>
);

const Connection = ({ from, to, label, delay = 0 }: { from: [number, number], to: [number, number], label: string, delay?: number }) => {
  const path = `M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`;

  return (
    <g>
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-zinc-200 dark:text-zinc-800"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay }}
      />
      <motion.circle
        r="3"
        fill="#3b82f6"
        className="shadow-[0_0_8px_#3b82f6]"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay: delay + 0.5
        }}
        style={{ offsetPath: `path("${path}")` }}
      />
      <motion.text
        x={(from[0] + to[0]) / 2}
        y={(from[1] + to[1]) / 2 - 10}
        textAnchor="middle"
        className="text-[8px] font-mono fill-zinc-400 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.8 }}
      >
        {label}
      </motion.text>
    </g>
  );
};

export interface BlueprintData {
  nodes: { x: number; y: number; label: string; iconType: string; color: string }[];
  connections: { from: [number, number]; to: [number, number]; label: string; delay: number }[];
  metrics: { latency: string; throughput: string };
  description: string;
}

export const SystemBlueprint = ({ isOpen, onClose, title, data }: { isOpen: boolean; onClose: () => void; title: string, data?: BlueprintData }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 p-6 dark:border-zinc-800/50">
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">{title}</h2>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">Architecture Blueprint v2.0</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:20px_20px] p-8">
              <svg width="100%" height="100%" viewBox="0 0 800 450" className="overflow-visible">
                {data.connections.map((conn, idx) => (
                  <Connection key={idx} from={conn.from} to={conn.to} label={conn.label} delay={conn.delay} />
                ))}
                {data.nodes.map((node, idx) => (
                  <Node key={idx} x={node.x} y={node.y} label={node.label} iconType={node.iconType} color={node.color} />
                ))}
              </svg>

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">Real-time Data Stream</span>
                  </div>
                  <p className="max-w-xs text-[10px] text-zinc-500 leading-relaxed italic">
                    * {data.description}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-black dark:text-white uppercase tracking-widest">Latency</span>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-tighter">{data.metrics.latency}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-black dark:text-white uppercase tracking-widest">Throughput</span>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-tighter">{data.metrics.throughput}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
               <div className="flex gap-2">
                  {['Scalable', 'Optimized', 'Fault-Tolerant', 'Secure'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[9px] font-bold text-zinc-500 uppercase">{tech}</span>
                  ))}
               </div>
               <span className="text-[10px] font-mono text-zinc-400">STATUS: VERIFIED_ARCHITECTURE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
