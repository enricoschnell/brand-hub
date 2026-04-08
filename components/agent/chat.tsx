"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo, type FormEvent } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const clerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
import { Message } from "@/components/agent/message";
import { ChatInput } from "@/components/agent/chat-input";
import { QuickActions } from "@/components/agent/quick-actions";

// Spring config matching ChatGPT/Grok feel — quick settle, no bounce
const MSG_SPRING = { type: "spring", stiffness: 420, damping: 36, mass: 0.8 } as const;

export function BrandChat() {
  const clerkUser = clerkConfigured ? useUser() : null;
  const isSignedIn = clerkConfigured ? clerkUser?.isSignedIn : true;
  const isLoaded = clerkConfigured ? clerkUser?.isLoaded : true;
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/agent" }), []);
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  // Scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !image) || isLoading) return;
    const text = input.trim() || "Bitte überprüfe dieses Design auf Markenkonformität.";
    setInput("");
    if (image) {
      const imageData = image;
      setImage(null);
      sendMessage({ text, files: [new File([dataURLtoBlob(imageData)], "design.png", { type: "image/png" })] } as any);
    } else {
      sendMessage({ text });
    }
  };

  const handleQuickAction = (prompt: string) => sendMessage({ text: prompt });

  const hasMessages = messages.length > 0;

  const getTextContent = (msg: any): string => {
    if (typeof msg.content === "string") return msg.content;
    if (Array.isArray(msg.parts)) {
      return msg.parts.filter((p: any) => p.type === "text").map((p: any) => p.text).join("");
    }
    return "";
  };

  const visibleMessages = messages.filter((m) => {
    const text = getTextContent(m);
    return (m.role === "user" || m.role === "assistant") && text;
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {!hasMessages ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex items-center justify-center min-h-[60vh]"
            >
              <div className="text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...MSG_SPRING, delay: 0.05 }}
                  className="text-[26px] font-normal text-hub-t1 font-brand mb-3 tracking-tight"
                >
                  Wie kann ich Ihnen helfen?
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...MSG_SPRING, delay: 0.1 }}
                  className="text-[14px] text-hub-t3 font-hub mb-8 max-w-[380px] mx-auto leading-relaxed"
                >
                  Ihr Marken-Assistent für Farben, Typografie, Logo-Regeln, Markenprüfung und markenkonforme Texte
                </motion.div>
                <QuickActions onAction={handleQuickAction} visible />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="max-w-[720px] w-full mx-auto px-6 pt-8 pb-4 flex flex-col gap-6"
            >
              {visibleMessages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...MSG_SPRING, delay: i === visibleMessages.length - 1 ? 0 : 0 }}
                >
                  <Message
                    role={m.role as "user" | "assistant"}
                    content={getTextContent(m)}
                    isStreaming={isLoading && i === visibleMessages.length - 1 && m.role === "assistant"}
                  />
                </motion.div>
              ))}

              {/* Loading indicator — shown after user message while waiting */}
              <AnimatePresence>
                {isLoading && visibleMessages[visibleMessages.length - 1]?.role === "user" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={MSG_SPRING}
                    className="flex items-center gap-[6px] pl-1"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-[6px] h-[6px] rounded-full bg-hub-t3 block"
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: i * 0.18,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="px-6 pt-3 pb-6 max-w-[720px] w-full mx-auto">
        {isLoaded && !isSignedIn ? (
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
            <div className="text-center mt-2.5 text-[11px] text-hub-t3/60 font-hub">
              Der Marken-Assistent kann Fehler machen. Angaben immer prüfen.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function dataURLtoBlob(dataURL: string): Blob {
  const parts = dataURL.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
  const raw = atob(parts[1]);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
