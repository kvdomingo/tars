import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { customProvider } from 'ai';

export const myProvider = customProvider({
  languageModels: {
    'chat-model': openai('gpt-4.1-2025-04-14'),
    'chat-model-reasoning': anthropic('claude-3-7-sonnet-20250219'),
    'title-model': anthropic('claude-3-5-haiku-20241022'),
    'artifact-model': anthropic('claude-3-7-sonnet-20250219'),
  },
});
