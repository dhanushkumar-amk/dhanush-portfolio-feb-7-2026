"use client";

import Image from "next/image";
import { Github, Linkedin, Bot, User, QrCode, X, Music, Pause, Command, Code, FileDown, ArrowRight } from "lucide-react";
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
import { CodingStats } from "./components/CodingStats";
import { ContactForm } from "./components/ContactForm";
import { BlogCards } from "./components/BlogCards";
import { ScrollReveal } from "./components/ScrollReveal";

import { getMarkdownContent } from "./data/content";

const projects = [
  {
    title: "ResearchMind — Agentic RAG Research & Document Intelligence",
    description: "Agentic research assistant with a 5-agent LangGraph workflow, multi-source retrieval, and secure document intelligence pipelines.",
    tags: ["LangGraph", "LangChain", "Qdrant", "LiteLLM", "Groq", "Gemini", "React.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    type: "system" as const,
    status: "Completed",
    githubUrl: "https://github.com/dhanushkumar-amk/ResearchMind",
    caseStudy: {
      problem: "Researchers and developers spend hours manually querying and cross-referencing papers, documentation, and web sources, leading to fragmented information retrieval and slow knowledge synthesis.",
      solution: "Architected a 5-agent LangGraph system with a parallel Search Swarm (arXiv, PubMed, GitHub, Tavily) and Critic-reviewed RAG Vault, guaranteeing structured and evaluated research reports.",
      architecture: ["LangGraph", "LangChain", "Qdrant", "LiteLLM", "Groq", "Gemini", "React.js", "PostgreSQL", "Redis", "Docker", "AWS"],
      impact: "Delivers sub-80ms semantic retrieval with Gemini failovers, ensuring research summaries maintain high accuracy (scored ≥7/10 by Critic Agent) under 3.5s first-token latency."
    },
    blueprint: {
      nodes: [
        { x: 100, y: 225, label: "Input Query", iconType: "globe", color: "blue" },
        { x: 280, y: 120, label: "Search Swarm", iconType: "cpu", color: "emerald" },
        { x: 280, y: 330, label: "RAG Vault", iconType: "database", color: "purple" },
        { x: 480, y: 225, label: "Critic Agent", iconType: "shield", color: "amber" },
        { x: 680, y: 225, label: "SSE Streaming", iconType: "network", color: "blue" }
      ],
      connections: [
        { from: [100, 225] as [number, number], to: [280, 120] as [number, number], label: "ROUTE_QUERY", delay: 0.2 },
        { from: [100, 225] as [number, number], to: [280, 330] as [number, number], label: "SEMANTIC_SRCH", delay: 0.4 },
        { from: [280, 120] as [number, number], to: [480, 225] as [number, number], label: "EVALUATE", delay: 0.6 },
        { from: [280, 330] as [number, number], to: [480, 225] as [number, number], label: "RETRIEVE", delay: 0.8 },
        { from: [480, 225] as [number, number], to: [680, 225] as [number, number], label: "STREAM_RESP", delay: 1.0 }
      ],
      metrics: { latency: "<3.5s", throughput: "Sub-80ms search" },
      description: "Multi-agent LangGraph orchestration with parallel Search Swarm, Critic-based validation, and PostgreSQL telemetry."
    }
  },
  {
    title: "GuardLayer — Open Source Self-Hostable LLM Security Gateway",
    description: "Self-hostable LLM security gateway with prompt-injection defense, PII scrubbing, output moderation, and API-key level auditing.",
    tags: ["Node.js", "TypeScript", "Python", "FastAPI", "Guardrails AI", "Presidio", "Hugging Face", "Redis", "PostgreSQL", "Docker", "AWS"],
    type: "system" as const,
    status: "Completed",
    githubUrl: "https://github.com/dhanushkumar-amk/GuardLayer",
    caseStudy: {
      problem: "Enterprise LLM applications are highly vulnerable to prompt injections, jailbreaks, and sensitive data leakage (PII), but inline validation often introduces severe latency overhead.",
      solution: "Designed a microservices-based security gateway consisting of Input/Output guards and API Gateway layers built with FastAPI and Presidio, caching threat patterns for fast lookups.",
      architecture: ["FastAPI", "Guardrails AI", "Microsoft Presidio", "Hugging Face", "Redis", "PostgreSQL", "Docker", "AWS"],
      impact: "Achieved reliable prompt injection defense with under 50ms processing overhead, enforcing data scrubbing and real-time threat auditing at the API key level."
    },
    blueprint: {
      nodes: [
        { x: 120, y: 225, label: "Client Request", iconType: "globe", color: "blue" },
        { x: 300, y: 150, label: "Input Guard", iconType: "shield", color: "rose" },
        { x: 300, y: 300, label: "Output Guard", iconType: "cpu", color: "emerald" },
        { x: 500, y: 225, label: "LLM Gateway", iconType: "network", color: "purple" },
        { x: 700, y: 225, label: "Telemetry DB", iconType: "database", color: "blue" }
      ],
      connections: [
        { from: [120, 225] as [number, number], to: [300, 150] as [number, number], label: "SCRUB_PII", delay: 0.2 },
        { from: [300, 150] as [number, number], to: [500, 225] as [number, number], label: "SAFE_PROMPT", delay: 0.4 },
        { from: [500, 225] as [number, number], to: [300, 300] as [number, number], label: "MODERATE", delay: 0.6 },
        { from: [300, 300] as [number, number], to: [700, 225] as [number, number], label: "AUDIT_LOGS", delay: 0.8 }
      ],
      metrics: { latency: "<50ms", throughput: "100% Scrubbing" },
      description: "Self-hostable LLM security gateway enforcing real-time prompt validation and output moderation."
    }
  },
  {
    title: "Distributed Queue Engine — Production Job Queue System",
    description: "Production-ready job queue with atomic Redis operations, priority scheduling, retry strategies, and real-time monitoring.",
    tags: ["Node.js", "TypeScript", "Redis", "React.js", "Socket.IO", "Docker", "AWS"],
    type: "backend" as const,
    status: "Completed",
    githubUrl: "https://github.com/dhanushkumar-amk/Distributed-Queue-Engine",
    caseStudy: {
      problem: "High-volume distributed worker environments struggle with race conditions during state transitions and job duplication, resulting in slow background tasks and poor scaling.",
      solution: "Implemented atomic Lua scripts inside a Redis cluster to enforce race-free state transitions, featuring multi-level priority queues, sliding-window rate limiters, and worker heartbeat checks.",
      architecture: ["Node.js", "TypeScript", "Redis", "Socket.IO", "React.js", "Docker"],
      impact: "Enables horizontally scalable workers with sub-12ms event loop latency and real-time Socket.IO dashboard monitoring."
    },
    blueprint: {
      nodes: [
        { x: 120, y: 225, label: "Job Publisher", iconType: "globe", color: "blue" },
        { x: 320, y: 225, label: "Redis Lua", iconType: "database", color: "rose" },
        { x: 520, y: 150, label: "Worker Swarm", iconType: "cpu", color: "emerald" },
        { x: 520, y: 300, label: "Socket.IO", iconType: "network", color: "purple" },
        { x: 720, y: 225, label: "React Dashboard", iconType: "globe", color: "blue" }
      ],
      connections: [
        { from: [120, 225] as [number, number], to: [320, 225] as [number, number], label: "ENQUEUE", delay: 0.2 },
        { from: [320, 225] as [number, number], to: [520, 150] as [number, number], label: "DEQUEUE", delay: 0.4 },
        { from: [320, 225] as [number, number], to: [520, 300] as [number, number], label: "PUSH_STATS", delay: 0.6 },
        { from: [520, 300] as [number, number], to: [720, 225] as [number, number], label: "RENDER", delay: 0.8 }
      ],
      metrics: { latency: "12ms", throughput: "5,000+ jobs/s" },
      description: "Distributed task orchestrator with atomicity guarantees via Redis Lua, Socket.IO monitoring, and worker heartbeat management."
    }
  },
  {
    title: "Spotify Clone (Microservices)",
    description: "A real-time music streaming application built with MERN and microservices architecture. Demonstrates distributed systems design, real-time communication, and load balancing.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "WebSockets", "Redis", "Docker", "CI/CD"],
    type: "backend" as const,
    status: "Completed",
    githubUrl: "https://github.com/dhanushkumar-amk",
    caseStudy: {
      problem: "Monolithic media applications suffer from scaling issues, where high-traffic real-time chat and music streaming disrupt core browsing services.",
      solution: "Refactored the application into isolated microservices (Chat, Streaming, Catalog) utilizing Redis caching for non-volatile metadata and WebSockets for active chat synchronization.",
      architecture: ["Node.js", "Express.js", "MongoDB", "Redis", "Socket.IO", "React.js", "Docker", "CI/CD"],
      impact: "Achieved ~60% latency reduction under heavy concurrent loads, handling over 5,000 active WebSocket connections."
    },
    blueprint: {
      nodes: [
        { x: 100, y: 225, label: "Users", iconType: "globe", color: "blue" },
        { x: 300, y: 225, label: "Load Balancer", iconType: "network", color: "zinc" },
        { x: 500, y: 120, label: "Chat Service", iconType: "message", color: "blue" },
        { x: 500, y: 330, label: "Music Service", iconType: "zap", color: "amber" },
        { x: 700, y: 225, label: "Redis Cache", iconType: "database", color: "rose" }
      ],
      connections: [
        { from: [100, 225] as [number, number], to: [300, 225] as [number, number], label: "REQUESTS", delay: 0.1 },
        { from: [300, 225] as [number, number], to: [500, 120] as [number, number], label: "CHAT_CONN", delay: 0.3 },
        { from: [300, 225] as [number, number], to: [500, 330] as [number, number], label: "STREAM_REQ", delay: 0.5 },
        { from: [500, 120] as [number, number], to: [700, 225] as [number, number], label: "PUB_SUB", delay: 0.7 },
        { from: [500, 330] as [number, number], to: [700, 225] as [number, number], label: "CACHE_READ", delay: 0.9 }
      ],
      metrics: { latency: "<50ms", throughput: "5.2k Active Conn" },
      description: "Microservices audio delivery system with WebSocket-based chat channels and Redis memory caching."
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

            {/* Hero Intro */}
            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl mb-12">
              <p>
                an <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">AI Engineer</a> and full-stack developer passionate about building intelligent, production-grade applications.
              </p>
              <p>
                specializing in <span className="text-black dark:text-white font-medium">RAG, Multi-Agent Systems</span>, FastAPI, MERN, and AWS, bridging the gap between advanced models and scalable backend engineering.
              </p>

              <div className="flex flex-wrap items-center justify-start gap-4 pt-4">
                <a
                  href="/Dhanushkumar_Resume.pdf"
                  download="Dhanush_Kumar_Resume"
                  className="flex items-center gap-2 rounded-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 px-6 py-3 text-sm font-semibold !text-white dark:!text-black transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm"
                >
                  <FileDown className="h-4 w-4" />
                  Download CV
                </a>
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-900 shadow-sm"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* About Me Section (Professional Summary) */}
            <ScrollReveal>
              <div className="mb-24 w-full text-left">
                <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 text-center">
                  About Me
                </h2>
                <div className="mx-auto max-w-2xl rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 sm:p-12 text-center bg-gray-50/50 dark:bg-zinc-900/30 backdrop-blur-sm">
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl mb-6">
                    Results-driven AI Engineer and Full Stack Developer with hands-on experience building production-grade LLM applications, multi-agent systems, and distributed backend architectures. I enjoy turning complex ideas into practical, measurable products.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl italic font-medium">
                    &quot;Building the next generation of intelligent systems, one agent at a time.&quot;
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Technical Expertise (Skills) */}
            <ScrollReveal>
              <div className="mb-24 w-full text-left">
                <h2 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 text-center">
                  Technical Expertise
                </h2>
                <TechStack />
              </div>
            </ScrollReveal>

            {/* The Chronicle (Education & Experience) */}
            <ScrollReveal>
              <div className="mb-24 w-full text-left">
                <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 text-center">
                  The Chronicle
                </h2>
                <InteractiveResume />
              </div>
            </ScrollReveal>

            {/* Product Building Journey (Projects) */}
            <ScrollReveal>
              <div className="mb-24 w-full text-left">
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
            </ScrollReveal>

            {/* Achievements Section */}
            <ScrollReveal>
              <div className="mb-16 w-full text-left">
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Achievements & Stats
                </h2>
                <CodingStats />
              </div>
            </ScrollReveal>

            {/* Status Board Section */}
            <ScrollReveal>
              <div className="mb-16 w-full text-left">
                <StatusBoard />
              </div>
            </ScrollReveal>

            {/* Writings & Blogs Section */}
            <ScrollReveal>
              <div className="mb-16 w-full text-left">
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Writings & Blogs
                </h2>
                <BlogCards />
              </div>
            </ScrollReveal>

            {/* Developer Values Section */}
            <ScrollReveal>
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
            </ScrollReveal>

            {/* Contributions Section */}
            <ScrollReveal>
              <div className="mb-16 w-full text-left">
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  GitHub Contributions
                </h2>
                <GithubGraph />
              </div>
            </ScrollReveal>

            {/* Hobbies / Human Perspective Section */}
            <ScrollReveal>
              <div className="mb-16 w-full text-left">
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  The Human Perspective
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-2 rounded-xl border border-gray-100 dark:border-zinc-800 p-6 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-zinc-900/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">♟️</span>
                      <div className="grid grid-cols-2 gap-0.5 opacity-40">
                        <div className="w-1.5 h-1.5 bg-black dark:bg-white"></div>
                        <div className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-700"></div>
                        <div className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-700"></div>
                        <div className="w-1.5 h-1.5 bg-black dark:bg-white"></div>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm">Chess</h3>
                    <p className="text-xs text-gray-500">Strategy & logic.</p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-gray-100 dark:border-zinc-800 p-6 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm">
                    <span className="text-2xl">📈</span>
                    <h3 className="font-bold text-sm">Trading</h3>
                    <p className="text-xs text-gray-500">Market analysis.</p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-gray-100 dark:border-zinc-800 p-6 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm">
                    <span className="text-2xl">🎬</span>
                    <h3 className="font-bold text-sm">Cinema</h3>
                    <p className="text-xs text-gray-500">Visual storytelling.</p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-gray-100 dark:border-zinc-800 p-6 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm">
                    <span className="text-2xl">🎵</span>
                    <h3 className="font-bold text-sm">Music</h3>
                    <p className="text-xs text-gray-500">Focus & flow.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Get in Touch Section */}
            <ScrollReveal>
              <div id="contact" className="mb-16 w-full text-left">
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Get in Touch
                </h2>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Have a project in mind or just want to say hi? Send me a message — I reply within 24 hours.
                </p>
                <ContactForm />
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
                  <a href="https://www.linkedin.com/in/dhanushkumar-amk/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors underline underline-offset-4">LinkedIn</a>
                  <a href="mailto:dhanushkumaramk@gmail.com" className="hover:text-black dark:hover:text-white transition-colors underline underline-offset-4">dhanushkumaramk@gmail.com</a>
                  <a href="https://github.com/dhanushkumar-amk" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors underline underline-offset-4">GitHub</a>
                </div>
              </div>
            </ScrollReveal>

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
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
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
