"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Uses mailto as fallback — works without a backend
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );
      window.open(`mailto:dhanushkumaramk@gmail.com?subject=${subject}&body=${body}`);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }

    // Reset status after 4 seconds
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 px-4 py-3 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 outline-none focus:border-gray-300 dark:focus:border-zinc-600 transition-colors backdrop-blur-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-gray-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 px-4 py-3 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 outline-none focus:border-gray-300 dark:focus:border-zinc-600 transition-colors backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What's on your mind?"
          className="w-full resize-none rounded-xl border border-gray-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 px-4 py-3 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 outline-none focus:border-gray-300 dark:focus:border-zinc-600 transition-colors backdrop-blur-sm"
        />
      </div>

      {/* Submit Button + Status */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle className="h-4 w-4" />
              Message opened in your mail client!
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-sm text-red-500"
            >
              <AlertCircle className="h-4 w-4" />
              Something went wrong. Try again.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
