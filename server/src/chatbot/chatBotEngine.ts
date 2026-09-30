// server/src/chatbot/chatBotEngine.ts

import {prisma} from '@prisma';
import { ChatBot, ChatBotResponse } from '@prisma/client';
import {
  ChatBotEvaluationContext,
  ChatBotEvaluationResult,
  ChatBotReplyCandidate,
  ChatBotRuntimeConfig,
} from './types';
import { compilePattern, matchesPattern } from './patternCompiler';

export class ChatBotEngine {
  private readonly config: ChatBotRuntimeConfig;

  constructor(config?: ChatBotRuntimeConfig) {
    this.config = config || {};
  }

  async evaluate(
    ctx: ChatBotEvaluationContext
  ): Promise<ChatBotEvaluationResult> {
    const chatBot = await prisma.chatBot.findUnique({
      where: { id: ctx.chatBotId },
      include: { responses: true },
    });

    if (!chatBot || !chatBot.isActive) {
      return {
        matched: false,
        reply: '…',
      };
    }

    // chatBot.responses is now ChatBotResponse[]
    const candidates: ChatBotReplyCandidate[] = chatBot.responses.map(
      (r: ChatBotResponse) => ({
        id: r.id,
        pattern: compilePattern(r.pattern, this.config),
        replies: Array.isArray(r.replies) ? (r.replies as string[]) : [],
      })
    );

    const match = this.findBestMatch(candidates, ctx.userInput);

    if (!match) {
      const fallback = this.pickFallbackReply(chatBot);
      return {
        matched: false,
        reply: fallback ?? "I’m not sure how to respond to that.",
      };
    }

    const reply = this.pickRandomReply(match.replies);

    return {
      matched: true,
      reply,
      responseId: match.id,
    };
  }

  private findBestMatch(
    candidates: ChatBotReplyCandidate[],
    userInput: string
  ): ChatBotReplyCandidate | null {
    for (const c of candidates) {
      if (matchesPattern(c.pattern, userInput)) {
        if (c.replies.length > 0) return c;
      }
    }
    return null;
  }

  private pickRandomReply(replies: string[]): string {
    if (!replies.length) return '…';
    const idx = Math.floor(Math.random() * replies.length);
    return replies[idx];
  }

  private pickFallbackReply(chatBot: ChatBot): string | null {
    // With the JSON field removed, fallback is now triggerName only
    if (chatBot.triggerName) return chatBot.triggerName;
    return null;
  }
}
