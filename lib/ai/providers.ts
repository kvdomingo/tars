import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const myProvider = customProvider({
  languageModels: {
    'chat-model': openai('gpt-4.1-2025-04-14'),
    'chat-model-reasoning': wrapLanguageModel({
      model: anthropic('claude-3-7-sonnet-20250219', {
        sendReasoning: false,
      }),
      middleware: extractReasoningMiddleware({
        tagName: 'reasoning',
        separator: '\n',
      }),
    }),
    'title-model': anthropic('claude-3-5-haiku-20241022'),
    'artifact-model': anthropic('claude-3-7-sonnet-20250219'),
  },
});
