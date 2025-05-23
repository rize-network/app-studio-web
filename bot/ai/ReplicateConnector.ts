import Replicate from 'replicate';

export class ReplicateConnector {
  private readonly apiKey: string;
  private readonly replicate: Replicate;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.replicate = new Replicate({
      auth: this.apiKey,
    });
  }

  async sendChatMessage(model: string, messages: any[], props?: {}) {
    const prompt = messages.map(message => message.content).join('\n');

    try {
      const response = await this.replicate.run(model as any, {
        input: {
          prompt,
          guidance: 3.5,
          num_outputs: 1,
          aspect_ratio: '1:1',
          output_format: 'png',
          output_quality: 80,
          prompt_strength: 0.8,
          ...props,
        },
      });
      console.log({response});
      return response;
    } catch (error) {
      console.error('Error in sending replicate chat message:', error);
      throw error;
    }
  }

  async removeBackground(image: string) {
    const output = await this.replicate.run(
      'lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1',
      {
        input: {
          image,
        },
      },
    );

    return output;
  }
}
