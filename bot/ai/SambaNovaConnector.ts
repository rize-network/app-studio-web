import {OpenAI} from 'openai';

export class SambaNovaConnector {
  private readonly apiKey: string;
  private readonly openai: OpenAI;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: this.apiKey,
      baseURL: 'https://api.sambanova.ai/v1/',
    });
  }

  async sendChatMessage(
    model: string,
    messages: any[],
    props?: {},
    json?: boolean,
  ): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: model,
        messages: messages,
        ...props,
        // response_format: json ? {type: 'json_object'} : undefined,
      });
      // console.log('response:', response);
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in sending openai chat message:', error);
      throw error;
    }
  }
}
