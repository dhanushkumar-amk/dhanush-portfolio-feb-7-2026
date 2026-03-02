"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// All slugs verified from simpleicons.org
const categories = [
    {
        name: "Front-End Development",
        skills: [
            { name: "HTML", slug: "html5" },
            { name: "CSS", slug: "css3" },
            { name: "JavaScript", slug: "javascript" },
            { name: "React.js", slug: "react" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "TailwindCSS", slug: "tailwindcss" },
        ]
    },
    {
        name: "Back-End Development",
        skills: [
            { name: "Node.js", slug: "nodedotjs" },
            { name: "Express.js", slug: "express" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Socket.IO", slug: "socketdotio" },
            { name: "REST APIs", slug: "postman" },
        ]
    },
    {
        name: "Database & ORM",
        skills: [
            { name: "MongoDB", slug: "mongodb" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
            { name: "Prisma", slug: "prisma" },         // replaced mongoose (no icon)
            { name: "Supabase", slug: "supabase" },
        ]
    },
    {
        name: "DevOps & Tools",
        skills: [
            { name: "Git", slug: "git" },
            { name: "GitHub", slug: "github" },
            { name: "Docker", slug: "docker" },
            { name: "AWS", slug: "amazonaws" },
            { name: "Postman", slug: "postman" },
        ]
    },
    {
        name: "AI & Automation",
        skills: [
            { name: "n8n", slug: "n8n" },
            { name: "Make.com", slug: "make" },         // valid on simpleicons
            { name: "OpenAI", slug: "openai" },
            { name: "Pinecone", slug: "pinecone" },
            { name: "LangChain", slug: "langchain" },   // replaced weaviate (no icon)
            { name: "Google Cloud", slug: "googlecloud" },
            { name: "Anthropic", slug: "anthropic" },
        ]
    },
    {
        name: "Other Skills",
        skills: [
            { name: "Java", slug: "java" },
            { name: "Kubernetes", slug: "kubernetes" },
            { name: "Linux", slug: "linux" },
        ]
    }
];

const marqueeSkills = categories.flatMap(c => c.skills);

// Fallback icon — shows first letter if image fails to load
function SkillIcon({ slug, name, className }: { slug: string; name: string; className?: string }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className={`flex items-center justify-center rounded font-bold text-gray-400 bg-gray-100 dark:bg-zinc-800 ${className ?? "h-10 w-10 text-sm"}`}>
                {name.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <Image
            src={`https://cdn.simpleicons.org/${slug}`}
            alt={name}
            fill
            className="object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 dark:invert dark:hover:invert-0"
            loading="lazy"
            unoptimized
            onError={() => setFailed(true)}
        />
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
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                            {categories.map((category) => (
                                <div key={category.name} className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-2">
                                        {category.name}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {category.skills.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                                            >
                                                <div className="h-5 w-5 shrink-0 relative">
                                                    <Image
                                                        src={`https://cdn.simpleicons.org/${skill.slug}`}
                                                        alt={skill.name}
                                                        fill
                                                        className="object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 dark:invert group-hover:dark:invert-0"
                                                        loading="lazy"
                                                        unoptimized
                                                        onError={(e) => {
                                                            // Hide broken image, parent div already shows skill name
                                                            (e.target as HTMLImageElement).style.display = "none";
                                                        }}
                                                    />
                                                </div>
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
