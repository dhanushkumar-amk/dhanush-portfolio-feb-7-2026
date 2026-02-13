"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal as TerminalIcon } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "init",
      output: "Agent Dhanush v1.2.0 initialized. Type 'help' to begin.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    let response: React.ReactNode = "";

    switch (cmd) {
      case "help":
        response = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] opacity-70">
            <div className="flex justify-between"><span>whoami</span><span className="text-zinc-500">About me</span></div>
            <div className="flex justify-between"><span>projects</span><span className="text-zinc-500">Recent work</span></div>
            <div className="flex justify-between"><span>status</span><span className="text-zinc-500">System metrics</span></div>
            <div className="flex justify-between"><span>clear</span><span className="text-zinc-500">Reset view</span></div>
          </div>
        );
        break;
      case "whoami":
        response = "Dhanush Kumar: Full-Stack Dev & System Architect. Building resilient, high-performance systems with AI & Web3.";
        break;
      case "projects":
        response = "Offline Payments (Web3), Cloud IDE (AI), Spotichat (Microservices). View cards for details.";
        break;
      case "status":
        response = "All systems operational. Latency: 14ms. Agent Mood: Optimized.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Unknown command: ${cmd}`;
    }

    setHistory([{ command: input, output: response }, ...history].slice(0, 5));
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-md dark:bg-black/60"
            />

            {/* Centered Command Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed left-1/2 top-[20%] z-[101] w-[95%] max-w-[550px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <Search className="h-4 w-4 text-zinc-400" />
                <form onSubmit={handleCommand} className="flex-grow">
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
                    placeholder="Type a command (help, whoami, projects...)"
                  />
                </form>
                <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-[10px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
                  ESC
                </div>
              </div>

              {/* History/Output Results */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {history.length === 0 && !input && (
                  <div className="py-8 text-center text-xs text-zinc-400">
                    No recent activity. Try typing &apos;help&apos;
                  </div>
                )}
                <div className="space-y-1">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      className="group rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <div className="flex items-start gap-3">
                        <TerminalIcon className="mt-1 h-3 w-3 text-zinc-400" />
                        <div className="space-y-1">
                          <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-tight">
                            {item.command}
                          </div>
                          <div className="text-sm text-zinc-800 dark:text-zinc-200">
                            {item.output}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex gap-4 text-[10px] text-zinc-400">
                  <span className="flex items-center gap-1"><span className="px-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700">↵</span> Enter to execute</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700">Agent-Dhanush v1.2</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
