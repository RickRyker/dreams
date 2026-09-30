// server/src/chatbot/types.ts

export type ChatBotPatternType = 'REGEX' | 'SUBSTRING' | 'EXACT';

export interface CompiledPattern {
  type: ChatBotPatternType;
  raw: string;
  regex?: RegExp;
}

export interface ChatBotReplyCandidate {
  id: string;
  pattern: CompiledPattern;
  replies: string[];
}

export interface ChatBotRuntimeConfig {
  enableRegexSyntax?: boolean;
  defaultPatternType?: ChatBotPatternType;
}

export interface ChatBotEvaluationContext {
  chatBotId: string;
  userInput: string;
}

export interface ChatBotEvaluationResult {
  matched: boolean;
  reply: string;
  responseId?: string;
}
