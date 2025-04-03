// Consolidated model information lookup
export type ModelInfos = {
  creditCost: number;
  tokenLimit: number;
  cost?: { prompt_token: number; completion_token: number };
  provider: string;
};

export type ProviderType =
  | 'groq'
  | 'google'
  | 'openai'
  | 'huggingFace'
  | 'replicate'
  | 'openrouter'
  | 'anthropic'
  | 'deepseek'
  | 'mistralai'
  | 'sambaNova';

export const Providers: ProviderType[] = [
  'groq',
  'google',
  'openai',
  'huggingFace',
  'replicate',
  'anthropic',
  'sambaNova',
  'deepseek',
  'mistralai',
];

export const MODEL_INFO: Record<string, ModelInfos> = {
  'gpt-4o': {
    provider: 'openai',
    creditCost: 15,
    tokenLimit: 128000,
    cost: {
      prompt_token: 2.5,
      completion_token: 10,
    },
  },
  'gpt-4o-mini': {
    provider: 'openai',
    creditCost: 1,
    tokenLimit: 128000,
    cost: {
      prompt_token: 0.15,
      completion_token: 0.6,
    },
  },
  'gemini-1.5-pro': {
    provider: 'google',
    creditCost: 10,
    tokenLimit: 1048576,
    cost: {
      prompt_token: 1.25,
      completion_token: 5,
    },
  },
  'gemini-1.5-flash': {
    provider: 'google',
    creditCost: 1,
    tokenLimit: 1048576,
    cost: {
      prompt_token: 0.075,
      completion_token: 0.3,
    },
  },

  'gemini-2.0-flash-lite': {
    provider: 'google',
    creditCost: 1,
    tokenLimit: 1048576,
    cost: {
      prompt_token: 0.075,
      completion_token: 0.3,
    },
  },

  'gemini-2.0-flash': {
    provider: 'google',
    creditCost: 1, // Minimum cost
    tokenLimit: 1048576,
    cost: {
      prompt_token: 0.1,
      completion_token: 0.4,
    },
  },
  'gemini-2.0-pro-exp': {
    provider: 'google',
    creditCost: 15,
    tokenLimit: 1048576,
    cost: {
      prompt_token: 3.5,
      completion_token: 10.5,
    },
  },
  'gemini-2.0-flash-thinking-exp': {
    provider: 'google',
    creditCost: 15, // Minimum cost
    tokenLimit: 40000,
    cost: {
      prompt_token: 3.5,
      completion_token: 10.5,
    },
  },
  'claude-3-5-sonnet-latest': {
    provider: 'anthropic',
    creditCost: 20,
    tokenLimit: 200000,
    cost: {
      prompt_token: 3,
      completion_token: 15,
    },
  },
  'claude-3-5-haiku-latest': {
    provider: 'anthropic',
    creditCost: 5,
    tokenLimit: 200000,
    cost: {
      prompt_token: 0.8,
      completion_token: 4,
    },
  },
  'Meta-Llama-3.1-8B-Instruct': {
    provider: 'sambaNova',
    creditCost: 1,
    tokenLimit: 128000,
    cost: {
      prompt_token: 0.02,
      completion_token: 0.05,
    },
  },
  'Meta-Llama-3.1-405B-Instruct': {
    provider: 'sambaNova',
    creditCost: 2,
    tokenLimit: 128000,
    cost: {
      prompt_token: 0.9,
      completion_token: 0.9,
    },
  },
  'Meta-Llama-3.3-70B-Instruct': {
    provider: 'sambaNova',
    creditCost: 1,
    tokenLimit: 128000,
    cost: {
      prompt_token: 0.12,
      completion_token: 0.3,
    },
  },
  'deepseek-chat': {
    provider: 'deepseek',
    creditCost: 1,
    tokenLimit: 64000,
    cost: {
      prompt_token: 0.14,
      completion_token: 0.28,
    },
  },
  'deepseek-r1:free': {
    provider: 'deepseek',
    creditCost: 1,
    tokenLimit: 128000,
    cost: {
      prompt_token: 0,
      completion_token: 0,
    },
  },
  'deepseek-r1': {
    provider: 'deepseek',
    creditCost: 15,
    tokenLimit: 128000,
    cost: {
      prompt_token: 8,
      completion_token: 8,
    },
  },
  'mistral-small-24b-instruct-2501': {
    provider: 'mistralai',
    creditCost: 1,
    tokenLimit: 32000,
    cost: {
      prompt_token: 0.1,
      completion_token: 0.3,
    },
  },
  // videoModel       String @default("wavespeedai/wan-2.1-t2v-480p") @db.VarChar(50)
  'black-forest-labs/flux-schnell': {
    provider: 'replicate',
    creditCost: 2,
    tokenLimit: 32000,
    cost: {
      prompt_token: 0.3,
      completion_token: 0.3,
    },
  },
  'wavespeedai/wan-2.1-t2v-480p': {
    provider: 'replicate',
    creditCost: 2,
    tokenLimit: 32000,
    cost: {
      prompt_token: 0.15,
      completion_token: 0.15,
    },
  },
};
