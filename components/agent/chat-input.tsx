"use client";

import { type FormEvent, type KeyboardEvent, useRef } from "react";
import { ArrowUp, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  image?: string | null;
  onImageSelect?: (base64: string) => void;
  onImageClear?: () => void;
}

export function ChatInput({ value, onChange, onSubmit, isLoading, image, onImageSelect, onImageClear }: ChatInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((value.trim() || image) && !isLoading) {
        onSubmit(e as unknown as FormEvent);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageSelect) return;
    const reader = new FileReader();
    reader.onload = () => {
      onImageSelect(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const canSend = (value.trim() || image) && !isLoading;

  return (
    <form onSubmit={onSubmit} className="w-full">
      {/* Image preview */}
      {image && (
        <div className="mb-2 relative inline-block">
          <img
            src={image}
            alt="Upload"
            className="h-16 rounded-lg border border-hub-border object-cover"
          />
          <button
            type="button"
            onClick={onImageClear}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-hub-t3 text-hub-bg flex items-center justify-center cursor-pointer border-none"
          >
            <X size={10} />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2 py-3 pl-3 pr-3 rounded-card bg-hub-surface border border-hub-border">
        {/* Upload button */}
        {onImageSelect && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center w-[30px] h-[30px] rounded-swatch border-none shrink-0 p-0 bg-transparent text-hub-t3 hover:text-hub-t1 cursor-pointer transition-colors"
              title="Bild hochladen für Design-Review"
            >
              <Paperclip size={16} />
            </button>
          </>
        )}
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
