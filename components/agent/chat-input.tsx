"use client";

import { type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { C, ff } from "@/lib/tokens";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(e as unknown as FormEvent);
      }
    }
  };

  const canSend = value.trim() && !isLoading;

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 12px 12px 16px", borderRadius: 12,
          background: C.surface, border: `1px solid ${C.border}`,
        }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nachricht an Brand Agent..."
          rows={1}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: C.t1,
            fontSize: 15,
            fontFamily: ff,
            resize: "none",
            lineHeight: "22px",
            height: 22,
            maxHeight: 150,
            padding: 0,
            margin: 0,
            display: "block",
            verticalAlign: "middle",
          }}
        />
        <button
          type="submit"
          disabled={!canSend}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 30, height: 30, borderRadius: 8,
            background: canSend ? C.t1 : C.active,
            color: canSend ? C.bg : C.t3,
            border: "none",
            cursor: canSend ? "pointer" : "default",
            flexShrink: 0,
            padding: 0,
            transition: "all 0.15s",
          }}
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
