"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { C, ff, monoF } from "@/lib/tokens";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

export function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "10px 14px",
          borderRadius: 12,
          background: isUser ? C.active : "transparent",
          color: C.t1,
          fontSize: 14,
          fontFamily: ff,
          lineHeight: 1.6,
        }}
      >
        {isUser ? (
          <span>{content}</span>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p style={{ margin: "0 0 8px", lineHeight: 1.6, color: C.t1 }}>{children}</p>,
              strong: ({ children }) => <strong style={{ color: C.t1, fontWeight: 500 }}>{children}</strong>,
              code: ({ children }) => (
                <code
                  style={{
                    background: C.active, padding: "2px 6px", borderRadius: 4,
                    fontFamily: monoF, fontSize: 13,
                  }}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre
                  style={{
                    background: C.bg, padding: 12, borderRadius: 8,
                    border: `1px solid ${C.border}`, overflow: "auto",
                    fontFamily: monoF, fontSize: 12, lineHeight: 1.5,
                    margin: "8px 0",
                  }}
                >
                  {children}
                </pre>
              ),
              ul: ({ children }) => <ul style={{ margin: "4px 0 8px", paddingLeft: 20 }}>{children}</ul>,
              li: ({ children }) => <li style={{ margin: "2px 0", color: C.t2 }}>{children}</li>,
              a: ({ children, href }) => (
                <a href={href} style={{ color: "#59eded", textDecoration: "none" }} target="_blank" rel="noopener">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
