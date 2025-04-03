import {GoogleGenerativeAI} from '@google/generative-ai';

export class GeminiConnector {
  private readonly apiKey: string;
  private readonly googleAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.googleAI = new GoogleGenerativeAI(this.apiKey);
  }

  async sendChatMessage(
    GeminiModel: string,
    messages: any[],
    props?: {},
    json?: boolean,
  ) {
    try {
      const model = this.googleAI.getGenerativeModel({
        model: GeminiModel,
        ...props,

        // generationConfig: json
        //   ? {
        //       responseMimeType: 'application/json',
        //       // responseSchema: ,
        //     }
        //   : undefined,
      });
      const message = messages.map(message => message.content).join('');
      const result = await model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in sending gemini chat message:', error);
      throw error;
    }
  }

  async token(GeminiModel: string, prompt: string, props?: {}) {
    try {
      const model = this.googleAI.getGenerativeModel({
        model: GeminiModel,
        ...props,
      });
      const {totalTokens} = await model.countTokens(prompt);
      return totalTokens;
    } catch (error) {
      console.error('Error in sending gemini chat message:', error);
      throw error;
    }
  }
}
