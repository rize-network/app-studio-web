// src/shared/ai/ai.service.ts

import { ProviderType } from './ai.config';

import { GeminiConnector } from './GeminiConnector';
import { GroqConnector } from './GroqConnector';
import { OpenAIConnector } from './OpenAIConnector';
import { ReplicateConnector } from './ReplicateConnector';
import { HuggingFaceConnector } from './HuggingFaceConnector';
import { AnthropicConnector } from './AnthropicConnector';
import { SambaNovaConnector } from './SambaNovaConnector';
import 'dotenv/config';

export const DEFAULT_IMAGE_MODEL = 'black-forest-labs/flux-schnell';

const ConfigService = {
  get: (key: string) => {
    return process.env[key];
  },
};

// If you have image models with a fixed credit cost, consider handling them separately
export const MODEL_IMAGE_CREDIT_COST = 2;

export class AiService {
  private models: any[] = [];
  private config: any;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 3000; // 1 second
  openRouter: OpenAIConnector;

  constructor() {
    this.config = ConfigService;
    this.openRouter = new OpenAIConnector({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env['OPENROUTER_API_KEY'] as string,
      // defaultHeaders: {
      //   "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
      //   "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
      // }
    });
  }

  // Helper function to add language instruction to messages
  private addLanguageInstruction(messages: any[], language: string): any[] {
    const languageInstruction = {
      role: 'user',
      content: `You are an assistant. Ensure all outputs are in the specified language: ${language}.`,
    };
    return [languageInstruction, ...messages];
  }

  getProvider(provider: ProviderType, useOpenRouter = false) {
    if (useOpenRouter) {
      return this.openRouter;
    } else if (this.models[provider]) {
      return this.models[provider];
    } else {
      switch (provider) {
        case 'groq':
          this.models['groq'] = new GroqConnector(
            this.config.get('GROQ_API_KEY')
          );
          break;
        case 'google':
          this.models['google'] = new GeminiConnector(
            this.config.get('GEMINI_API_KEY')
          );
          break;
        case 'openai':
          this.models['openai'] = new OpenAIConnector({
            apiKey: this.config.get('OPENAI_API_KEY'),
            organization: this.config.get('OPENAI_ORGANIZATION'),
          });
          break;
        case 'huggingFace':
          this.models['huggingFace'] = new HuggingFaceConnector(
            this.config.get('HUGGING_FACE_API_KEY')
          );
          break;
        case 'replicate':
          this.models['replicate'] = new ReplicateConnector(
            this.config.get('REPLICATE_API_KEY')
          );
          break;
        case 'sambaNova':
          this.models['sambaNova'] = new SambaNovaConnector(
            this.config.get('SAMBANOVA_API_KEY')
          );
          break;
        case 'anthropic':
          this.models['anthropic'] = new AnthropicConnector(
            this.config.get('ANTHROPIC_API_KEY')
          );
          break;
        case 'openrouter':
          this.models['openrouter'] = this.openRouter;
          break;
        case 'deepseek':
          this.models['deepseek'] = this.openRouter;
          break;
        case 'mistralai':
          this.models['mistralai'] = this.openRouter;
          break;
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }

      return this.models[provider];
    }
  }

  /**
   * Simple delay utility function.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Enhanced send method with improved error handling and account verification.
   */
  async send({
    model,
    provider,
    temperature,
    messages,
    props = {},
    options = {},
    json = false,
  }: {
    model: string;
    provider: ProviderType;
    temperature?: Number;
    messages: any[];
    props?: {};
    options?: {
      retries?: number;
      language?: string;
    };
    json?: boolean;
  }): Promise<string> {
    const { retries = 2, language } = options;

    let useOpenRouter = false;

    if (!json && messages[0]?.content?.indexOf('valid JSON object') > 0) {
      json = true;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Ensure the account exists before sending messages
        // const account = await this.prisma.account.findUnique({
        //   where: {userId},
        // });

        // if (!account) {
        //   this.logger.error('Account not found during send', {userId});
        //   throw new Error('Account does not exist.');
        // }
        // console.log('request', this.request);

        const requestPayload = {
          model,
          messages: language
            ? this.addLanguageInstruction(messages, language)
            : messages,
        };

        const response = await this.getProvider(
          provider,
          useOpenRouter
        ).sendChatMessage(
          useOpenRouter || provider == 'deepseek' || provider == 'mistralai'
            ? provider + '/' + model
            : model,
          requestPayload.messages,
          props,
          json
        );

        return response;
      } catch (error) {
        useOpenRouter = this.handleTokenLimitError(error);

        if (attempt < retries) {
          await this.delay(this.RETRY_DELAY);
        } else {
          throw error;
        }
      }
    }

    // Fallback, should never reach here
    throw new Error('Unexpected error in send');
  }

  async token(
    model: string,
    provider: ProviderType,
    messages: any[] | string,
    props?: {}
  ): Promise<string> {
    return await this.getProvider(provider).token(model, messages, props);
  }

  handleTokenLimitError(error: any): boolean {
    const status = error.status;
    const errorCode = error?.error?.error?.code;
    const errorMessage = error?.error?.error?.message;

    return (
      status === 429 ||
      errorCode === 'rate_limit_exceeded' ||
      (errorMessage && errorMessage.toLowerCase().includes('limit'))
    );
  }
}
