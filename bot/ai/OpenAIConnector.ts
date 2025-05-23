import { OpenAI } from 'openai';
import { encoding_for_model, TiktokenModel } from 'tiktoken';

export class OpenAIConnector {
  private readonly openai: OpenAI;

  constructor({
    apiKey,
    baseURL,
    organization,
  }: {
    apiKey: string;
    organization?: string;
    baseURL?: string;
  }) {
    this.openai = new OpenAI({
      apiKey,
      organization,
      baseURL,
    });
  }

  async sendChatMessage(
    model: string,
    messages: any[],
    props?: {},
    json?: boolean
  ): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: model,
        messages: messages,
        ...props,
        response_format: json ? { type: 'json_object' } : undefined,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in sending openai chat message:', error);
      throw error;
    }
  }

  async token(model: TiktokenModel, messages: any[]): Promise<any> {
    try {
      const text = messages.map((message) => message.content).join('');
      // Get the encoding for a specific model
      const modelEncoding = encoding_for_model(model);
      const encodedModel = modelEncoding.encode(text);

      return encodedModel.length;
    } catch (error) {
      console.error('Error in running assistant:', error);
      throw error;
    }
  }
}
