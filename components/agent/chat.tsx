"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo, type FormEvent } from "react";
import { Message } from "@/components/agent/message";
import { ChatInput } from "@/components/agent/chat-input";
import { QuickActions } from "@/components/agent/quick-actions";

export function BrandChat() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/agent" }), []);
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    sendMessage({ text });
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
      {/* ── Scrollable area (messages or empty state) ── */}
      <div
        ref={hasMessages ? scrollRef : undefined}
        className="flex-1 overflow-y-auto flex flex-col"
      >
        {!hasMessages ? (
          /* Empty state — push content to vertical center */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[28px] font-medium text-hub-t1 font-hub mb-2">
                Wie kann ich helfen?
              </div>
              <div className="text-sm text-hub-t3 font-hub mb-6">
                Frag mich zu Farben, Typografie, Logo-Regeln oder Assets
              </div>
              <QuickActions onAction={handleQuickAction} visible />
            </div>
          </div>
        ) : (
          /* Messages */
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

      {/* ── Input bar — always at bottom ── */}
      <div className="px-6 pt-3 pb-6 max-w-[720px] w-full mx-auto">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <div className="text-center mt-2 text-[11px] text-hub-t3 font-hub">
          Brand Agent kann Fehler machen. Angaben immer prüfen.
        </div>
      </div>
    </div>
  );
}
