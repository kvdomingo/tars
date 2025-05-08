import { TavilyClient } from '@agentic/stdlib';

export const tavilyClient = new TavilyClient({
  apiKey: process.env.TAVILY_API_KEY,
});
