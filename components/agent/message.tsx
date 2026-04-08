"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-md bg-hub-active text-hub-t3 hover:text-hub-t1 text-[11px] font-mono transition-colors cursor-pointer border-none"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Kopiert" : "Kopieren"}
    </button>
  );
}

export function Message({ role, content, isStreaming = false }: MessageProps) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] px-4 py-3 rounded-[18px] rounded-br-[6px] bg-hub-surface border border-hub-border text-[15px] text-hub-t1 font-hub leading-[1.6] whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  }

  // Assistant — full-width prose, no bubble
  return (
    <div className="flex justify-start w-full">
      <div className="w-full text-[15px] leading-[1.75] text-hub-t1 font-hub">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Paragraphs
            p: ({ children }) => (
              <p className="mb-4 last:mb-0 text-[15px] text-hub-t1 leading-[1.75]">{children}</p>
            ),
            // Headings — rare in chat but styled when present
            h1: ({ children }) => (
              <h1 className="text-[20px] font-medium text-hub-t1 mb-3 mt-6 first:mt-0 tracking-tight">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-[17px] font-medium text-hub-t1 mb-2 mt-5 first:mt-0">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-[15px] font-medium text-hub-t1 mb-2 mt-4 first:mt-0">{children}</h3>
            ),
            // Bold — slightly brighter, not heavy
            strong: ({ children }) => (
              <strong className="font-medium text-hub-t1 not-italic">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-hub-t2">{children}</em>
            ),
            // Unordered list — clean, spaced
            ul: ({ children }) => (
              <ul className="mb-4 last:mb-0 pl-0 space-y-1.5 list-none">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 last:mb-0 pl-0 space-y-1.5 list-none counter-reset-[item]">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="flex gap-3 text-[15px] text-hub-t1 leading-[1.65]">
                <span className="text-hub-t3 shrink-0 mt-[3px] select-none">—</span>
                <span>{children}</span>
              </li>
            ),
            // Inline code
            code: ({ children, className }) => {
              const isBlock = !!className;
              if (isBlock) return <code className={className}>{children}</code>;
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-hub-active font-mono text-[13px] text-hub-t1 border border-hub-border">
                  {children}
                </code>
              );
            },
            // Code block
            pre: ({ children }) => {
              const codeEl = (children as any)?.props;
              const codeText = typeof codeEl?.children === "string" ? codeEl.children : "";
              return (
                <div className="relative group mb-4 last:mb-0">
                  <pre className="bg-hub-bg border border-hub-border rounded-xl p-4 overflow-x-auto font-mono text-[13px] text-hub-t2 leading-[1.7] whitespace-pre">
                    {children}
                  </pre>
                  {codeText && <CopyButton text={codeText.trimEnd()} />}
                </div>
              );
            },
            // Blockquote
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-brand-cyan pl-4 mb-4 text-hub-t2 italic">
                {children}
              </blockquote>
            ),
            // Horizontal rule
            hr: () => <hr className="border-hub-border my-6" />,
            // Links
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-brand-cyan underline underline-offset-2 decoration-brand-cyan/40 hover:decoration-brand-cyan transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            // Table
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4 last:mb-0">
                <table className="w-full text-[14px] border-collapse">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="text-left py-2 px-3 text-[12px] font-semibold text-hub-t3 uppercase tracking-[0.05em] border-b border-hub-border">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="py-2.5 px-3 text-hub-t1 border-b border-hub-border/50">{children}</td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        {/* Blinking cursor during streaming */}
        {isStreaming && (
          <span className="inline-block w-[2px] h-[1em] bg-hub-t2 ml-0.5 align-middle animate-[cursorBlink_1s_ease-in-out_infinite]" />
        )}
      </div>
    </div>
  );
}
