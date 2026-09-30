// server/src/chatbot/patternCompiler.ts

import {
  ChatBotPatternType,
  CompiledPattern,
  ChatBotRuntimeConfig,
} from './types';

const DEFAULT_CONFIG: Required<ChatBotRuntimeConfig> = {
  enableRegexSyntax: true,
  defaultPatternType: 'SUBSTRING',
};

export function compilePattern(
  rawPattern: string,
  config?: ChatBotRuntimeConfig
): CompiledPattern {
  const cfg = { ...DEFAULT_CONFIG, ...(config || {}) };
  const trimmed = rawPattern.trim();

  // Regex syntax: /.../i or /.../
  if (cfg.enableRegexSyntax && trimmed.startsWith('/') && trimmed.lastIndexOf('/') > 0) {
    const lastSlash = trimmed.lastIndexOf('/');
    const body = trimmed.slice(1, lastSlash);
    const flags = trimmed.slice(lastSlash + 1) || 'i';

    return {
      type: 'REGEX',
      raw: rawPattern,
      regex: new RegExp(body, flags),
    };
  }

  // EXACT syntax: =hello
  if (trimmed.startsWith('=')) {
    return {
      type: 'EXACT',
      raw: rawPattern,
    };
  }

  // Default: substring match
  return {
    type: cfg.defaultPatternType,
    raw: rawPattern,
  };
}

export function matchesPattern(
  compiled: CompiledPattern,
  userInput: string
): boolean {
  const input = userInput.trim();

  switch (compiled.type) {
    case 'REGEX':
      return !!compiled.regex?.test(input);

    case 'EXACT':
      return input.toLowerCase() === compiled.raw.slice(1).trim().toLowerCase();

    case 'SUBSTRING':
    default:
      return input.toLowerCase().includes(compiled.raw.toLowerCase());
  }
}
