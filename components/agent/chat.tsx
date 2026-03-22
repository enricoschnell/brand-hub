"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo, type FormEvent } from "react";
import { Message } from "@/components/agent/message";
import { ChatInput } from "@/components/agent/chat-input";
import { QuickActions } from "@/components/agent/quick-actions";
import { C, ff } from "@/lib/tokens";

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
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", width: "100%",
    }}>
      {/* ── Scrollable area (messages or empty state) ── */}
      <div
        ref={hasMessages ? scrollRef : undefined}
        style={{
          flex: 1, overflowY: "auto",
          display: "flex", flexDirection: "column",
        }}
      >
        {!hasMessages ? (
          /* Empty state — push content to vertical center */
          <div style={{
            flex: 1, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 28, fontWeight: 500, color: C.t1,
                fontFamily: ff, marginBottom: 8,
              }}>
                Wie kann ich helfen?
              </div>
              <div style={{
                fontSize: 14, color: C.t3, fontFamily: ff,
                marginBottom: 24,
              }}>
                Frag mich zu Farben, Typografie, Logo-Regeln oder Assets
              </div>
              <QuickActions onAction={handleQuickAction} visible />
            </div>
          </div>
        ) : (
          /* Messages */
          <div style={{
            maxWidth: 720, width: "100%",
            margin: "0 auto",
            padding: "24px 24px 16px",
            display: "flex", flexDirection: "column", gap: 20,
          }}>
            {messages
              .filter((m) => {
                const text = getTextContent(m);
                return (m.role === "user" || m.role === "assistant") && text;
              })
              .map((m) => (
                <div key={m.id} style={{ animation: "fadeInUp 0.25s ease-out both" }}>
                  <Message role={m.role as "user" | "assistant"} content={getTextContent(m)} />
                </div>
              ))}
            {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
              <div style={{ color: C.t3, fontSize: 14, fontFamily: ff }}>
                <span style={{ display: "inline-flex", gap: 3 }}>
                  <span style={{ animation: "pulse 1.4s infinite" }}>.</span>
                  <span style={{ animation: "pulse 1.4s infinite 0.2s" }}>.</span>
                  <span style={{ animation: "pulse 1.4s infinite 0.4s" }}>.</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Input bar — always at bottom ── */}
      <div style={{
        padding: "12px 24px 24px",
        maxWidth: 720, width: "100%",
        margin: "0 auto",
      }}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <div style={{
          textAlign: "center", marginTop: 8,
          fontSize: 11, color: C.t3, fontFamily: ff,
        }}>
          Brand Agent kann Fehler machen. Angaben immer prüfen.
        </div>
      </div>
    </div>
  );
}
