"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const milestones = [
  {
    type: "experience",
    title: "Python AI/ML Intern",
    institution: "Srishti Innovative Computer Systems Pvt Ltd",
    date: "Jan 2026 - May 2026",
    location: "Trivandrum, India",
    description: "Applied Python, scikit-learn, and NLP (NLTK) to student performance models (87% accuracy) and sentiment analysis pipelines, tracked via MLflow.",
    icon: <Briefcase className="h-4 w-4" />,
    color: "blue"
  },
  {
    type: "education",
    title: "M.Sc. Information Technology",
    institution: "Hindusthan College of Arts and Science",
    date: "2025 - Present",
    location: "Coimbatore, India",
    description: "Currently pursuing. Focused on advanced computer science principles, database architectures, and emerging AI systems.",
    icon: <GraduationCap className="h-4 w-4" />,
    color: "emerald"
  },
  {
    type: "experience",
    title: "Web Developer Intern",
    institution: "CodeSoft",
    date: "Dec 2024 - Jan 2025",
    location: "Remote, India",
    description: "Developed scalable backend services, implemented REST APIs, and optimized frontend performance in an agile setting.",
    icon: <Briefcase className="h-4 w-4" />,
    color: "purple"
  },
  {
    type: "experience",
    title: "Web Developer",
    institution: "CodeTech IT Solution",
    date: "Dec 2024 - Jan 2025",
    location: "Remote, India",
    description: "Contributed to scalable web solutions, optimized backend efficiency, and integrated API logic.",
    icon: <Briefcase className="h-4 w-4" />,
    color: "amber"
  },
  {
    type: "education",
    title: "BCA – Bachelor of Computer Applications",
    institution: "Nallamuthu Gounder Mahalingam College",
    date: "2022 - 2025",
    location: "Pollachi, India",
    description: "Graduated with a CGPA of 7.92. Strong foundation in software engineering, Java, and database systems.",
    icon: <GraduationCap className="h-4 w-4" />,
    color: "pink"
  }
];

export const InteractiveResume = () => {
  return (
    <div className="relative w-full py-12">
      {/* Central Circuit Line */}
      <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500/20 via-emerald-500/20 to-purple-500/20 sm:left-1/2 sm:-translate-x-1/2">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500"
        />
      </div>

      <div className="space-y-16">
        {milestones.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex flex-col items-start gap-8 sm:flex-row ${
              i % 2 === 0 ? "sm:flex-row-reverse text-left sm:text-right" : "text-left"
            }`}
          >
            {/* The Hub Node */}
            <div className="absolute left-4 top-2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 transition-colors hover:border-blue-500 group sm:left-1/2">
              <div className={`h-2 w-2 rounded-full bg-${item.color}-500 animate-pulse`} />
            </div>

            {/* Content Card */}
            <div className="w-full sm:w-[45%] pl-12 sm:pl-0 group">
              <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-600 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm">
                <div className={`flex items-center gap-2 mb-3 text-${item.color}-500 sm:justify-${i % 2 === 0 ? 'end' : 'start'}`}>
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.type}</span>
                </div>

                <h3 className="text-lg font-bold text-black dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">{item.institution}</p>

                <div className={`flex flex-wrap gap-4 text-xs text-zinc-400 sm:justify-${i % 2 === 0 ? 'end' : 'start'}`}>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                  {item.description}
                </p>

                {/* Decorative Circuit Branch */}
                <div className={`absolute top-4 hidden sm:block w-8 h-[2px] bg-zinc-200 dark:bg-zinc-800 ${
                    i % 2 === 0 ? "right-full mr-2" : "left-full ml-2"
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
