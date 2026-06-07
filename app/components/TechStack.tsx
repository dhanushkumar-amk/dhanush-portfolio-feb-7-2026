"use client";

import { useState } from "react";
import {
    ChevronDown, ChevronUp,
    Brain, ShieldCheck, Blocks, Code2, Server, Database, Layers, GitBranch, Cpu, Zap, Cloud, Terminal,
    Network, FileSearch, Bot, Plug, Sliders, Sparkles, Activity, ClipboardCheck, Radio, Infinity, Boxes, Binary, ListTodo
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// All slugs verified from simpleicons.org
const categories = [
    {
        name: "AI & Generative AI",
        skills: [
            { name: "LangChain", slug: "langchain" },
            { name: "LangGraph", slug: "langgraph" },
            { name: "RAG", slug: "rag" },
            { name: "Multi-Agent Systems", slug: "multiagentsystems" },
            { name: "MCP", slug: "mcp" },
            { name: "Fine-tuning (LoRA/QLoRA)", slug: "huggingface" },
            { name: "Prompt Engineering", slug: "openai" },
            { name: "Guardrails AI", slug: "guardrails" },
            { name: "LangSmith", slug: "langsmith" },
            { name: "MLflow", slug: "mlflow" },
            { name: "RAGAS", slug: "ragas" },
            { name: "Hugging Face", slug: "huggingface" },
        ]
    },
    {
        name: "Front-End Development",
        skills: [
            { name: "HTML", slug: "html5" },
            { name: "CSS", slug: "css3" },
            { name: "JavaScript", slug: "javascript" },
            { name: "React.js", slug: "react" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "TailwindCSS", slug: "tailwindcss" },
            { name: "TypeScript", slug: "typescript" },
        ]
    },
    {
        name: "Back-End Development",
        skills: [
            { name: "Node.js", slug: "nodedotjs" },
            { name: "Express.js", slug: "express" },
            { name: "FastAPI", slug: "fastapi" },
            { name: "Python", slug: "python" },
            { name: "REST APIs", slug: "postman" },
            { name: "WebSockets", slug: "socketdotio" },
            { name: "SSE", slug: "sse" },
        ]
    },
    {
        name: "Database & Vector Stores",
        skills: [
            { name: "MongoDB", slug: "mongodb" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
            { name: "Qdrant", slug: "qdrant" },
            { name: "SQL", slug: "postgresql" },
            { name: "pgvector", slug: "postgresql" },
        ]
    },
    {
        name: "DevOps & Cloud",
        skills: [
            { name: "Docker", slug: "docker" },
            { name: "AWS", slug: "amazonaws" },
            { name: "GitHub Actions", slug: "githubactions" },
            { name: "Nginx", slug: "nginx" },
            { name: "CI/CD Pipelines", slug: "git" },
        ]
    },
    {
        name: "Other Skills",
        skills: [
            { name: "System Design", slug: "systemdesign" },
            { name: "Microservices", slug: "kubernetes" },
            { name: "DSA (Java)", slug: "java" },
            { name: "Agile Development", slug: "agile" },
        ]
    }
];

const marqueeSkills = categories.flatMap(c => c.skills);

function getLucideIcon(name: string) {
    const n = name.toLowerCase();
    
    // AI / Generative AI
    if (n === "langgraph") return <Network className="h-full w-full text-indigo-500 dark:text-indigo-400" />;
    if (n === "rag") return <FileSearch className="h-full w-full text-teal-500 dark:text-teal-400" />;
    if (n.includes("multi-agent")) return <Bot className="h-full w-full text-purple-500 dark:text-purple-400" />;
    if (n === "mcp") return <Plug className="h-full w-full text-amber-500 dark:text-amber-400" />;
    if (n.includes("fine-tuning") || n.includes("lora")) return <Sliders className="h-full w-full text-rose-500 dark:text-rose-400" />;
    if (n.includes("prompt")) return <Sparkles className="h-full w-full text-yellow-500 dark:text-yellow-400" />;
    if (n.includes("guardrails")) return <ShieldCheck className="h-full w-full text-emerald-500 dark:text-emerald-400" />;
    if (n === "langsmith") return <Activity className="h-full w-full" />;
    if (n === "ragas") return <ClipboardCheck className="h-full w-full text-cyan-500 dark:text-cyan-400" />;
    
    // Backend & Network
    if (n.includes("sse")) return <Radio className="h-full w-full text-orange-500" />;
    if (n.includes("websocket")) return <Zap className="h-full w-full text-blue-500" />;
    
    // DevOps / CI/CD
    if (n.includes("ci/cd") || n.includes("pipeline")) return <Infinity className="h-full w-full text-emerald-500" />;
    
    // Engineering Foundations
    if (n.includes("system design")) return <Layers className="h-full w-full text-cyan-500" />;
    if (n.includes("microservices")) return <Boxes className="h-full w-full text-rose-500" />;
    if (n.includes("dsa")) return <Binary className="h-full w-full text-blue-500" />;
    if (n.includes("agile")) return <ListTodo className="h-full w-full text-amber-500" />;
    
    // General Fallbacks
    if (n.includes("langchain")) return <Brain className="h-full w-full text-emerald-500" />;
    if (n.includes("html") || n.includes("css") || n.includes("javascript") || n.includes("react") || n.includes("next") || n.includes("tailwind") || n.includes("typescript")) {
        return <Code2 className="h-full w-full text-blue-500" />;
    }
    if (n.includes("node") || n.includes("express") || n.includes("fastapi") || n.includes("api")) {
        return <Server className="h-full w-full text-green-500" />;
    }
    if (n.includes("mongo") || n.includes("postgres") || n.includes("redis") || n.includes("qdrant") || n.includes("sql") || n.includes("vector")) {
        return <Database className="h-full w-full text-violet-500" />;
    }
    if (n.includes("docker") || n.includes("aws") || n.includes("amazon") || n.includes("cloud")) {
        return <Cloud className="h-full w-full text-sky-500" />;
    }
    if (n.includes("git") || n.includes("github")) {
        return <GitBranch className="h-full w-full text-orange-600" />;
    }
    if (n.includes("python") || n.includes("java")) {
        return <Cpu className="h-full w-full text-yellow-600" />;
    }
    return <Terminal className="h-full w-full text-zinc-500" />;
}

// Fallback icon — shows a beautiful, relevant Lucide icon if image fails to load
function SkillIcon({ slug, name, className }: { slug: string; name: string; className?: string }) {
    const [failed, setFailed] = useState(false);

    const isInvertedInDark = slug === "nextdotjs" || slug === "express" || slug === "github";

    if (failed) {
        return (
            <div className={`flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${className ?? "h-10 w-10"}`}>
                {getLucideIcon(name)}
            </div>
        );
    }

    return (
        <div className={`relative transition-all duration-300 group-hover:scale-110 ${className ?? "h-10 w-10"}`}>
            <Image
                src={`https://cdn.simpleicons.org/${slug}`}
                alt={name}
                fill
                className={`object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 ${isInvertedInDark ? "dark:invert" : ""}`}
                loading="lazy"
                unoptimized
                onError={() => setFailed(true)}
            />
        </div>
    );
}

export function TechStack() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
                >
                    {isExpanded ? "Show Less" : "View Full Stack"}
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.div
                        key="marquee"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    >
                        <div className="flex w-max animate-infinite-scroll">
                            {/* First copy */}
                            <div className="flex gap-12 py-4 pr-12">
                                {marqueeSkills.map((tech, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-10 w-10 transition-all duration-300 relative group/icon">
                                            <SkillIcon slug={tech.slug} name={tech.name} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Duplicate for seamless scroll */}
                            <div className="flex gap-12 py-4 pr-12">
                                {marqueeSkills.map((tech, index) => (
                                    <div key={index + marqueeSkills.length} className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-10 w-10 transition-all duration-300 relative group/icon">
                                            <SkillIcon slug={tech.slug} name={tech.name} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                    >
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 [column-fill:_balance] w-full pt-4">
                            {categories.map((category) => (
                                <div key={category.name} className="break-inside-avoid mb-8 space-y-4 bg-gray-50/50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800/50 backdrop-blur-xs">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-2">
                                        {category.name}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-1">
                                        {category.skills.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                                            >
                                                <SkillIcon slug={skill.slug} name={skill.name} className="h-5 w-5 shrink-0" />
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
