"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Fingerprint, Lock, Cpu, Globe, Database } from "lucide-react";

export const HolographicBadge = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-64 w-48 cursor-pointer perspective-1000 group mb-12 sm:h-80 sm:w-64"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
      >
        {/* Front of Badge */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-blue-500/30 bg-white/10 p-4 shadow-[0_0_25px_rgba(59,130,246,0.2)] dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden">
          {/* Holographic Scan Line */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-blue-400/50 shadow-[0_0_10px_#60a5fa] z-10"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="relative mt-2 h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-xl border-2 border-blue-500/20 grayscale group-hover:grayscale-0 transition-all duration-700">
               <Image
                src="/me.png"
                alt="Agent ID"
                fill
                className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-black dark:text-white">Dhanush Kumar</h3>
              <p className="text-[10px] font-mono font-bold text-blue-500 mt-1 tracking-widest uppercase">AGNT-0530-DX</p>
            </div>

            <div className="mt-2 flex items-center justify-between w-full border-t border-blue-500/20 pt-4">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">Access Granted</span>
              </div>
              <div className="flex items-center gap-1.5 grayscale opacity-50">
                 <Fingerprint className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
             {[...Array(5)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-blue-500/20" />
             ))}
          </div>
        </div>

        {/* Back of Badge */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 shadow-[0_0_25px_rgba(59,130,246,0.2)] dark:bg-zinc-950/80 backdrop-blur-xl rotateY-180 flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-5 w-5 text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Metadata Decrypted</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-3 w-3 text-zinc-400" />
                    <span className="text-[9px] font-mono text-zinc-500">SYSTEM</span>
                  </div>
                  <span className="text-[9px] font-mono text-blue-500">Dhanush OS v2.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-zinc-400" />
                    <span className="text-[9px] font-mono text-zinc-500">REGION</span>
                  </div>
                  <span className="text-[9px] font-mono text-blue-500">ASIA-SOUTH-1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-3 w-3 text-zinc-400" />
                    <span className="text-[9px] font-mono text-zinc-500">CACHE</span>
                  </div>
                  <span className="text-[9px] font-mono text-blue-500">REDIS_ACTIVE</span>
                </div>
              </div>
           </div>

           <div className="space-y-2">
              <div className="h-1 w-full bg-blue-500/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  animate={{ width: ["20%", "80%", "20%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="text-[8px] font-mono text-zinc-500 flex justify-between">
                <span>INTEL_PROC</span>
                <span>SECURE</span>
              </div>
           </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
