"use client";

import Image from "next/image";
import { Github, Linkedin, Bot, User, QrCode, X, Music, Pause, Command, Code } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { ProjectCard } from "./components/ProjectCard";
import { Terminal } from "./components/Terminal";
import { StatusBoard } from "./components/StatusBoard";
import { InteractiveResume } from "./components/InteractiveResume";

import { getMarkdownContent } from "./data/content";

const projects = [
  {
    title: "Offline-first Payment System (Web3)",
    description: "Designed a secure offline transaction flow with deferred blockchain synchronization and AI real-time fraud detection. Built for eventual consistency and privacy.",
    tags: ["Web3", "Blockchain", "AI", "Mobile"],
    type: "system" as const,
    caseStudy: {
      problem: "Traditional Web3 payments require constant internet connectivity, making them unusable in low-signal areas or for instant retail transactions where network latency is high.",
      solution: "Implemented an offline-first architecture using local SQLite storage and a deferred synchronization engine that batches transactions for blockchain commitment once 'online' status is confirmed.",
      architecture: ["SQLite", "Solidity", "Node.js", "Redis"],
      impact: "Achieved zero-latency 'tap and go' checkout experience with 99.9% consistency between offline state and on-chain records."
    },
    blueprint: {
      nodes: [
        { x: 150, y: 225, label: "Client App", iconType: "globe", color: "blue" },
        { x: 300, y: 150, label: "AI Engine", iconType: "cpu", color: "purple" },
        { x: 300, y: 300, label: "Edge DB", iconType: "database", color: "emerald" },
        { x: 500, y: 225, label: "Orchestrator", iconType: "network", color: "amber" },
        { x: 700, y: 225, label: "Blockchain", iconType: "shield", color: "rose" }
      ],
      connections: [
        { from: [150, 225], to: [300, 150], label: "ASYNC_REQ", delay: 0.2 },
        { from: [150, 225], to: [300, 300], label: "LOCAL_SYNC", delay: 0.4 },
        { from: [300, 150], to: [500, 225], label: "FRAUD_VAL", delay: 0.6 },
        { from: [300, 300], to: [500, 225], label: "POST_TX", delay: 0.8 },
        { from: [500, 225], to: [700, 225], label: "L1_COMMIT", delay: 1.0 }
      ],
      metrics: { latency: "14.2ms", throughput: "84.2 TPS" },
      description: "Illustrates the eventual consistency model with offline-first capabilities and AI-driven fraud mitigation."
    }
  },
  {
    title: "AI-Powered Cloud IDE",
    description: "A Cursor-inspired IDE with real-time code completion, collaborative multi-language support, and containerized backend services using Docker.",
    tags: ["Next.js", "Docker", "LLM", "Socket.IO"],
    type: "fullstack" as const,
    caseStudy: {
      problem: "Cloud-based IDEs often suffer from input lag and difficult-to-manage development environments when working across multiple projects.",
      solution: "Built a containerized service discovery layer that spins up isolated Docker environments for each session, integrated with Gemini AI for low-latency code reasoning.",
      architecture: ["Next.js", "Docker", "Go", "Gemini AI"],
      impact: "Reduced local machine CPU overhead by 40% while providing professional-grade AI pairs directly in the browser."
    },
    blueprint: {
      nodes: [
        { x: 150, y: 225, label: "Editor UI", iconType: "globe", color: "blue" },
        { x: 350, y: 225, label: "API Gateway", iconType: "network", color: "zinc" },
        { x: 550, y: 150, label: "AI Backend", iconType: "cpu", color: "purple" },
        { x: 550, y: 300, label: "Docker Swarm", iconType: "box", color: "emerald" },
        { x: 750, y: 225, label: "Env Storage", iconType: "database", color: "blue" }
      ],
      connections: [
        { from: [150, 225], to: [350, 225], label: "WEBSOCKET", delay: 0.2 },
        { from: [350, 225], to: [550, 150], label: "inference_v1", delay: 0.4 },
        { from: [350, 225], to: [550, 300], label: "provision", delay: 0.6 },
        { from: [550, 300], to: [750, 225], label: "PERSIST", delay: 0.8 }
      ],
      metrics: { latency: "28.5ms", throughput: "120 REQ/S" },
      description: "Architecture for real-time collaborative editing with automated environment provisioning."
    }
  },
  {
    title: "Spotichat",
    description: "Architected a microservices-based music streaming platform with real-time chat via WebSockets. Improved performance by 60% through Redis caching.",
    tags: ["Microservices", "Redis", "Socket.IO", "React"],
    type: "backend" as const,
    caseStudy: {
      problem: "High-traffic music platforms face huge latency spikes when simultaneous users query live track lists and real-time chat messages.",
      solution: "Implemented a Pub/Sub model using Redis for chat distribution and an aggressive caching strategy for non-volatile metadata, offloading 70% of database pressure.",
      architecture: ["Node.js", "Redis", "PostgreSQL", "React"],
      impact: "Handled 5,000+ concurrent connections per instance with sub-50ms response times for all real-time events."
    },
    blueprint: {
      nodes: [
        { x: 100, y: 225, label: "Subscribers", iconType: "globe", color: "emerald" },
        { x: 300, y: 225, label: "Load Balancer", iconType: "network", color: "zinc" },
        { x: 500, y: 120, label: "Chat Service", iconType: "message", color: "blue" },
        { x: 500, y: 330, label: "Music Service", iconType: "zap", color: "amber" },
        { x: 700, y: 225, label: "Redis Cluster", iconType: "database", color: "rose" }
      ],
      connections: [
        { from: [100, 225], to: [300, 225], label: "TLS_REQ", delay: 0.1 },
        { from: [300, 225], to: [500, 120], label: "PUSH", delay: 0.3 },
        { from: [300, 225], to: [500, 330], label: "STREAM", delay: 0.5 },
        { from: [500, 120], to: [700, 225], label: "PUB_SUB", delay: 0.7 },
        { from: [500, 330], to: [700, 225], label: "CACHE", delay: 0.9 }
      ],
      metrics: { latency: "12ms", throughput: "5.2k CONN" },
      description: "Microservices design for high-scale real-time audio and message distribution."
    }
  },
  {
    title: "AI Financial Intelligence",
    description: "Integrated Gemini AI for automatic receipt scanning and expense categorization. Developed automated reminder and notification system.",
    tags: ["Gemini AI", "Node.js", "Automation", "Finance"],
    type: "fullstack" as const,
    caseStudy: {
      problem: "User spending data is often scattered across physical receipts and multiple bank emails, making manual budgeting painful and error-prone.",
      solution: "Developed an OCR pipeline backed by Gemini AI to extract entities from multi-format inputs and a graph-based categorization engine for spent-analysis.",
      architecture: ["Node.js", "Gemini AI", "Puppeteer", "Express"],
      impact: "Automated 95% of budgeting tasks for pilot users, identifying an average of 12% in 'hidden' subscription waste."
    },
    blueprint: {
      nodes: [
        { x: 150, y: 225, label: "Receipt Ingest", iconType: "globe", color: "zinc" },
        { x: 350, y: 225, label: "OCR Engine", iconType: "cpu", color: "blue" },
        { x: 550, y: 225, label: "Gemini AI", iconType: "zap", color: "purple" },
        { x: 750, y: 150, label: "Auth DB", iconType: "shield", color: "emerald" },
        { x: 750, y: 300, label: "Fin Analytics", iconType: "database", color: "blue" }
      ],
      connections: [
        { from: [150, 225], to: [350, 225], label: "PDF_BUFFER", delay: 0.2 },
        { from: [350, 225], to: [550, 225], label: "ENTITY_EXT", delay: 0.4 },
        { from: [550, 225], to: [750, 150], label: "VERIFY", delay: 0.6 },
        { from: [550, 225], to: [750, 300], label: "MAP_STATE", delay: 0.8 }
      ],
      metrics: { latency: "1.2s", throughput: "45 SCAN/M" },
      description: "AI-driven entity extraction pipeline for automated financial reconciliation."
    }
  }
];



export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");



  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const lofiVolume = 1;
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }

    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current.play().catch(e => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const [starPositions] = useState(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  });

  return (
    <div className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}>
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>

          </>
        )}
      </AnimatePresence>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image - Easter Egg Trigger */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative mb-8 h-40 w-40 sm:h-56 sm:w-56 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.05] active:scale-95 rounded-full"
              aria-label="Toggle Aura Mode"
            >
              {/* Circular Scanlines Overlay */}
              <div className="absolute inset-0 z-10 opacity-20 pointer-events-none rounded-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

              <Image
                src="/MY IMAGE.JPG"
                alt="Dhanush Kumar"
                fill
                className={`object-cover object-[center_20%] rounded-full transition-all duration-1000 grayscale ${
                  showEasterEgg
                    ? 'scale-110 brightness-125 contrast-150'
                    : 'brightness-100 contrast-110'
                }`}
                priority
              />

              {/* Technical Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent z-20" />

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500/50 z-30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500/50 z-30 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Holographic Aura on Click */}
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-30"
                />
              )}
            </button>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
              Dhanush Kumar
            </h1>

            {/* Phonetic Pronunciation */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>/ðʌnʊʃ kʊmɑːr/</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>noun</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">IST</span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                a full-stack developer and <a href="https://en.wikipedia.org/wiki/System_design" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">system design enthusiast</a> passionate about building scalable, production-ready applications.
              </p>
              <p>
                specializing in <span className="text-black dark:text-white font-medium">Backend Architecture</span>, AI Agents, and Web3, bridging the gap between complex logic and user-centric design.
              </p>
            </div>


            {/* The Chronicle - Interactive Resume Section */}
            <div className="mb-24 w-full text-left">
              <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 text-center">
                The Chronicle
              </h2>
              <InteractiveResume />
            </div>

            {/* Product Building Journey Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                The Product Building Journey
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {projects.map((project, idx) => (
                  <ProjectCard key={idx} {...project} />
                ))}
              </div>
              <p className="mt-8 text-center font-medium italic text-gray-400 dark:text-zinc-600">
                &quot;Consistent building is the only way to master the machine.&quot;
              </p>
            </div>

            {/* Contributions Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div>

            {/* Achievements Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Achievements & Stats
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-100 dark:border-zinc-800 p-6">
                  <p className="text-3xl font-bold">400+</p>
                  <p className="text-sm text-gray-500">LeetCode Problems Solved</p>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-zinc-800 p-6">
                  <p className="text-3xl font-bold">Rank #1</p>
                  <p className="text-sm text-gray-500">GFG College Coding Score</p>
                </div>
              </div>
            </div>

            {/* Status Board Section */}
            <div className="mb-16 w-full text-left">
              <StatusBoard />
            </div>

            {/* Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                I specialize in heavy-duty backend systems and automation:
              </p>
              <TechStack />
            </div>

            {/* Writings & Blogs Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Writings & Blogs
              </h2>
              <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                I regularly publish articles on{" "}
                <a
                  href="https://medium.com/@dhanushkumaramk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white underline underline-offset-4 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Medium
                </a>{" "}
                focusing on system design patterns, microservices, and technical integrations.
              </p>
            </div>

            {/* Developer Values Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Core Philosophy
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 dark:border-zinc-800 p-6 transition-all hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                  <h3 className="font-bold text-black dark:text-white mb-2">Pragmatism</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Choosing the right tool for the job, over the trendiest one. Focus on shipping value.</p>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-zinc-800 p-6 transition-all hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                  <h3 className="font-bold text-black dark:text-white mb-2">Scalability</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Designing systems that don&apos;t just work today, but grow with the user base effortlessly.</p>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-zinc-800 p-6 transition-all hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                  <h3 className="font-bold text-black dark:text-white mb-2">Resilience</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Building with failure in mind. Graceful degradation and robust error handling as standards.</p>
                </div>
              </div>
            </div>

            {/* Thing about me Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                The Human Perspective
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  Beyond the terminals and cloud instances, I find balance in understanding the core of how technologies interact. My approach is driven by a desire to build systems that aren&apos;t just functional, but resilient.
                </p>

                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  I believe that the best systems are built by people who understand both the low-level constraints and the high-level business goals.
                </p>
              </div>
            </div>

            {/* Get in Touch Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/dhanushkumar-amk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "} shoot an {" "}
                  <a
                    href="mailto:dhanushkumaramk@gmail.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    email
                  </a>
                </p>
              </div>
            </div>

            {/* Pomodoro Timer Section */}
            <PomodoroTimer />

          </motion.main>
        )}
      </AnimatePresence>


      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <button
          onClick={toggleLofi}
          className={`transition-all duration-300 hover:scale-110 ${isLofiPlaying ? 'text-blue-500 animate-pulse' : 'text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
          aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
          title={isLofiPlaying ? "Pause Lofi Music" : "Play Lofi Music"}
        >
          {isLofiPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
        </button>
        <button
          onClick={() => {
            const event = new KeyboardEvent('keydown', {
              key: 'k',
              ctrlKey: true,
              bubbles: true,
              cancelable: true
            });
            window.dispatchEvent(event);
          }}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Open Command Palette"
          title="Command Palette (Ctrl+K)"
        >
          <Command className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="https://github.com/dhanushkumar-amk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/dhanushkumar-amk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/dhanushkumar_amk" // Assuming this is your handle
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a
          href="https://leetcode.com/dhanushkumar-amk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <div className="relative h-5 w-5 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src="https://cdn.simpleicons.org/leetcode"
              alt="LeetCode"
              fill
              className="object-contain dark:invert"
              unoptimized
            />
          </div>
        </a>
        <a
          href="https://codolio.com/profile/Dhanushkumaramk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Code className="h-5 w-5" />
        </a>
      </nav>

      {/* QR Code Modal Content Updated */}
      {
        showQR && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <div
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="rounded-lg bg-white p-2">
                <QRCodeSVG
                  value="https://dhanushkumaramkdev-portfolio.vercel.app/"
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        )
      }
      <Terminal />
    </div >
  );
}
