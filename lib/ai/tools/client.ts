'use server';

import { getToolKeys } from './index';

// Export the async function directly instead of awaiting it
export const getToolKeysAction = async (): Promise<string[]> => {
  return getToolKeys();
};
