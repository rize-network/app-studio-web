import {HfInference} from '@huggingface/inference';

export class HuggingFaceConnector {
  private readonly apiKey: string;
  private readonly hf: HfInference;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.hf = new HfInference(this.apiKey);
  }

  async sendChatMessage(model: string, messages: any[], props?: {}) {
    console.log({model, messages, props});
    try {
      const response = await this.hf.chatCompletion({
        model,
        messages,
        ...props,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in sending hugging face chat message:', error);
      throw error;
    }
  }
}
