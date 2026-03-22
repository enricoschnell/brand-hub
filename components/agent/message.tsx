"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

export function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-3.5 py-2.5 rounded-card text-hub-t1 text-sm font-hub leading-relaxed",
          isUser ? "bg-hub-active" : "bg-transparent"
        )}
      >
        {isUser ? (
          <span>{content}</span>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-2 leading-relaxed text-hub-t1">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="text-hub-t1 font-medium">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="bg-hub-active px-1.5 py-0.5 rounded font-mono text-[13px]">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-hub-bg p-3 rounded-swatch border border-hub-border overflow-auto font-mono text-xs leading-normal my-2">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="my-1 mb-2 pl-5">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="my-0.5 text-hub-t2">{children}</li>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-brand-cyan no-underline"
                  target="_blank"
                  rel="noopener"
                >
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
