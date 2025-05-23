import Anthropic from '@anthropic-ai/sdk';

const modelsMaxToken = {
  'claude-3-5-sonnet-latest': 8192,
  'claude-3-5-opus-latest': 4096,
};

export class AnthropicConnector {
  private readonly apiKey: string;
  private readonly anthropic: Anthropic;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.anthropic = new Anthropic({
      apiKey: this.apiKey,
    });
  }

  async sendChatMessage(model: string, messages: any[], props?: {}) {
    try {
      const response: any = await this.anthropic.messages.create({
        model: model,
        messages: messages,
        max_tokens: modelsMaxToken[model] ?? 8192,
        ...props,
      });
      return response.content[0].text;
    } catch (error) {
      console.error('Error in sending anthropic chat message:', error);
      throw error;
    }
  }
}
