import Groq from 'groq-sdk';

export class GroqConnector {
  private readonly apiKey: string;
  private readonly groq: Groq;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.groq = new Groq({
      apiKey: this.apiKey,
    });
  }

  async sendChatMessage(
    model: string,
    messages: any[],
    props?: {},
    json?: boolean,
  ): Promise<any> {
    try {
      const response = await this.groq.chat.completions.create({
        model: model,
        messages: messages,
        ...props,
        response_format: json ? {type: 'json_object'} : undefined,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in sending groq chat message:', error);
      throw error;
    }
  }
  async token(messages: any[]) {
    try {
      const text = messages.map(message => message.content).join('');
      const numCharsToRemove = Math.floor(text.length * (10 / 100));
      const reducedText = text.slice(0, -numCharsToRemove);
      return reducedText.split(/\s+/).length;
    } catch (error) {
      console.error('Error in calculating token for groq:', error);
      throw error;
    }
  }
}
