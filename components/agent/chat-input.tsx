"use client";

import { type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center gap-2.5 py-3 pl-4 pr-3 rounded-card bg-hub-surface border border-hub-border">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nachricht an Brand Agent..."
          rows={1}
          className="flex-1 bg-transparent border-none outline-none text-hub-t1 text-[15px] font-hub resize-none leading-[22px] h-[22px] max-h-[150px] p-0 m-0 block align-middle placeholder:text-hub-t3"
        />
        <button
          type="submit"
          disabled={!canSend}
          className={cn(
            "flex items-center justify-center w-[30px] h-[30px] rounded-swatch border-none shrink-0 p-0 transition-all duration-150",
            canSend
              ? "bg-hub-t1 text-hub-bg cursor-pointer"
              : "bg-hub-active text-hub-t3 cursor-default"
          )}
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
