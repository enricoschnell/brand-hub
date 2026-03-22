import { streamText, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/agent/system-prompt";
import { agentTools } from "@/lib/agent/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: buildSystemPrompt(),
    messages,
    tools: agentTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
