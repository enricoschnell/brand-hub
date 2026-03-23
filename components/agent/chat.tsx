"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo, type FormEvent } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

const clerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
import { Message } from "@/components/agent/message";
import { ChatInput } from "@/components/agent/chat-input";
import { QuickActions } from "@/components/agent/quick-actions";

export function BrandChat() {
  const clerkUser = clerkConfigured ? useUser() : null;
  const isSignedIn = clerkConfigured ? clerkUser?.isSignedIn : true;
  const isLoaded = clerkConfigured ? clerkUser?.isLoaded : true;
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/agent" }), []);
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !image) || isLoading) return;

    const text = input.trim() || (image ? "Bitte überprüfe dieses Design auf Markenkonformität." : "");
    setInput("");

    if (image) {
      const imageData = image;
      setImage(null);
      sendMessage({
        text,
        files: [new File([dataURLtoBlob(imageData)], "design.png", { type: "image/png" })],
      } as any);
    } else {
      sendMessage({ text });
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const hasMessages = messages.length > 0;

  const getTextContent = (msg: any): string => {
    if (typeof msg.content === "string") return msg.content;
    if (Array.isArray(msg.parts)) {
      return msg.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("");
    }
    return "";
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div
        ref={hasMessages ? scrollRef : undefined}
        className="flex-1 overflow-y-auto flex flex-col"
      >
        {!hasMessages ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[28px] font-medium text-hub-t1 font-hub mb-2">
                Wie kann ich helfen?
              </div>
              <div className="text-sm text-hub-t3 font-hub mb-6">
                Farben, Typografie, Logo-Regeln, Markenprüfung oder markenkonforme Texte
              </div>
              <QuickActions onAction={handleQuickAction} visible />
            </div>
          </div>
        ) : (
          <div className="max-w-[720px] w-full mx-auto px-6 pt-6 pb-4 flex flex-col gap-5">
            {messages
              .filter((m) => {
                const text = getTextContent(m);
                return (m.role === "user" || m.role === "assistant") && text;
              })
              .map((m) => (
                <div key={m.id} className="animate-[fadeInUp_0.25s_ease-out_both]">
                  <Message role={m.role as "user" | "assistant"} content={getTextContent(m)} />
                </div>
              ))}
            {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
              <div className="text-hub-t3 text-sm font-hub">
                <span className="inline-flex gap-[3px]">
                  <span className="animate-[pulse_1.4s_infinite]">.</span>
                  <span className="animate-[pulse_1.4s_infinite_0.2s]">.</span>
                  <span className="animate-[pulse_1.4s_infinite_0.4s]">.</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-6 pt-3 pb-6 max-w-[720px] w-full mx-auto">
        {isLoaded && !isSignedIn ? (
          /* Auth gate — show sign-in prompt */
          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-card bg-hub-surface border border-hub-border">
            <span className="text-sm text-hub-t2 font-hub">Anmelden, um den Marken-Assistenten zu nutzen</span>
            <SignInButton mode="modal">
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-swatch bg-hub-t1 text-hub-bg text-xs font-medium font-hub cursor-pointer border-none transition-opacity hover:opacity-90">
                <LogIn size={13} />
                Anmelden
              </button>
            </SignInButton>
          </div>
        ) : (
          <>
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              image={image}
              onImageSelect={setImage}
              onImageClear={() => setImage(null)}
            />
            <div className="text-center mt-2 text-[11px] text-hub-t3 font-hub">
              Der Marken-Assistent kann Fehler machen. Angaben immer prüfen.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Convert data URL to Blob for file upload */
function dataURLtoBlob(dataURL: string): Blob {
  const parts = dataURL.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
  const raw = atob(parts[1]);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
