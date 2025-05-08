import { createAISDKTools } from '@agentic/ai-sdk';
import { tavilyClient } from './tavily-web-search';

export const TOOLS = createAISDKTools(tavilyClient);

export const getToolKeys = async (): Promise<string[]> => {
  return Object.keys(TOOLS);
};
