"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormatChipProps {
  label: string;
  sublabel?: string;
  filename: string;
  href?: string;
}

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.7 };

export function FormatChip({ label, sublabel, filename, href }: FormatChipProps) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const base = "inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border min-h-[44px] no-underline text-xs font-hub select-none";

  if (href) {
    const handleClick = () => {
      if (state !== "idle") return;
      setState("loading");
      setTimeout(() => {
        setState("done");
        setTimeout(() => setState("idle"), 1500);
      }, 450);
    };

    return (
      <motion.a
        href={href}
        download={filename}
        title={filename}
        aria-label={`${label} herunterladen`}
        onClick={handleClick}
        whileTap={{ scale: 0.96 }}
        whileHover={{ borderColor: "rgba(255,255,255,0.18)" }}
        transition={SPRING}
        className={cn(
          base,
          "border-border bg-transparent cursor-pointer",
          state === "done" ? "text-brand-cyan border-brand-cyan/30" : "text-hub-t2 hover:text-hub-t1"
        )}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SPRING}
              className="flex items-center gap-1.5"
            >
              <Download size={11} aria-hidden="true" />
              <span className="font-medium text-foreground">{label}</span>
              {sublabel && <span className="text-[11px] font-mono text-muted-foreground">{sublabel}</span>}
            </motion.span>
          )}

          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SPRING}
              className="flex items-center gap-[5px]"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[5px] h-[5px] rounded-full bg-hub-t3 block"
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </motion.span>
          )}

          {state === "done" && (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SPRING}
              className="flex items-center gap-1.5 text-brand-cyan"
            >
              <Check size={11} aria-hidden="true" />
              <span className="font-medium">Fertig</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    );
  }

  return (
    <button
      disabled
      title="Bald verfügbar"
      aria-label={`${label} — bald verfügbar`}
      className={cn(base, "border-border bg-transparent text-hub-t3 cursor-not-allowed opacity-40")}
    >
      <Download size={11} aria-hidden="true" />
      <span className="font-medium">{label}</span>
      {sublabel && <span className="text-[11px] font-mono">{sublabel}</span>}
    </button>
  );
}
