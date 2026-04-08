import { streamText, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { auth } from "@clerk/nextjs/server";
import { buildSystemPrompt } from "@/lib/agent/system-prompt";
import { agentTools } from "@/lib/agent/tools";

export const maxDuration = 30;

// In-memory rate limiter — resets on cold start, acceptable for internal tooling.
// Primary cost controls: maxTokens + Clerk auth wall.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, limit = 30): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  // Auth — Clerk middleware already enforces sign-in, but we grab userId for rate limiting.
  let rateLimitKey = "anon";
  const clerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (clerkConfigured) {
    try {
      const session = await auth();
      if (!session?.userId) {
        return new Response(JSON.stringify({ error: "Nicht autorisiert" }), { status: 401 });
      }
      rateLimitKey = session.userId;
    } catch {
      // Clerk not available — fall through (dev mode)
    }
  }

  if (!checkRateLimit(rateLimitKey)) {
    return new Response(
      JSON.stringify({ error: "Stundenlimit erreicht. Bitte später erneut versuchen." }),
      { status: 429 }
    );
  }

  const { messages } = await req.json();

  // Validate input
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Ungültige Anfrage" }), { status: 400 });
  }

  // Cap conversation history (keeps context window and costs in check)
  const trimmedMessages = messages.slice(-20);

  // Validate last message length
  const lastMessage = trimmedMessages[trimmedMessages.length - 1];
  const lastContent = typeof lastMessage?.content === "string"
    ? lastMessage.content
    : Array.isArray(lastMessage?.content)
      ? lastMessage.content.map((p: any) => p.text ?? "").join("")
      : "";

  if (lastContent.length > 4000) {
    return new Response(
      JSON.stringify({ error: "Nachricht zu lang (max. 4000 Zeichen)" }),
      { status: 400 }
    );
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: buildSystemPrompt(),
    messages: trimmedMessages,
    tools: agentTools,
    stopWhen: stepCountIs(5),
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
