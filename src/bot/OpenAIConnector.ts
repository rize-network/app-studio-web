/**
Constructeur : Initialise l'instance OpenAI avec la clé API et l'organisation.
createFile : Méthode pour créer un fichier dans OpenAI. Utile pour charger des documents de référence.
sendChatMessage : Méthode pour envoyer un message à l'API de chat d'OpenAI et obtenir une réponse.
createThread : Crée un nouveau thread pour une conversation avec l'assistant.
addMessageToThread : Ajoute un message au thread spécifié. Utile pour envoyer des prompts ou des questions.
runAssistant : Exécute l'assistant sur le thread donné et attend la réponse. Récupère et retourne la réponse de l'assistant.
*/

import { OpenAI } from 'openai';
import { Assistant, Thread } from 'openai/resources/beta';
import {
  MessageCreateParams,
  ThreadMessage,
} from 'openai/resources/beta/threads';
import { FileHandler } from './FileHandler';
import { API_CONFIG } from './Config';

export class OpenAIConnector {
  private readonly apiKey: string;
  private readonly organization: string;
  private readonly openai: OpenAI;
  private readonly fileHandler: FileHandler;

  constructor(apiKey: string, organization: string) {
    this.apiKey = apiKey;
    this.organization = organization;
    this.openai = new OpenAI({
      apiKey: this.apiKey,
      organization: this.organization,
    });
    this.fileHandler = new FileHandler(
      API_CONFIG.openaiApiKey,
      API_CONFIG.openaiOrganization
    );
  }

  async sendChatMessage(model: string, messages: MessageCreateParams[]) {
    try {
      const response = await this.openai.chat.completions.create({
        model: model,
        messages: messages,
      });
      return response;
    } catch (error) {
      console.error('Error in sending chat message:', error);
      throw error;
    }
  }

  async createAssistant(
    instructions: string,
    name: string,
    fileIds: string[]
  ): Promise<Assistant> {
    try {
      const assistant = await this.openai.beta.assistants.create({
        model: 'gpt-4-1106-preview',
        instructions: instructions,
        name,
        tools: [{ type: 'retrieval' }],
        file_ids: fileIds,
      });
      return assistant;
    } catch (error) {
      console.error('Error in creating assistant:', error);
      throw error;
    }
  }

  async updateAssistantFiles(
    assistantId: string,
    newFileIds: string[]
  ): Promise<Assistant> {
    try {
      // Retrieve the current assistant to get the existing file IDs
      const currentAssistant = await this.openai.beta.assistants.retrieve(
        assistantId
      );
      console.log({ existing: currentAssistant.file_ids });
      await this.fileHandler.writeFile(
        './',
        'test',
        `${currentAssistant.file_ids.toString()}`
      );
      // Create sets for existing and new file IDs for efficient comparison
      const existingFileIdsSet = new Set(currentAssistant.file_ids);
      const newFileIdsSet = new Set(newFileIds);

      // Check if the new file IDs are different from the existing file IDs
      const hasDifferentFiles =
        [...newFileIdsSet].some((id) => !existingFileIdsSet.has(id)) ||
        [...existingFileIdsSet].some((id) => !newFileIdsSet.has(id));

      if (hasDifferentFiles) {
        console.log(
          'Existing and new file IDs are different. Updating assistant with new file IDs.'
        );

        // Delete the existing file IDs that are not needed anymore
        const fileIdsToDelete = [...existingFileIdsSet].filter(
          (id) => !newFileIdsSet.has(id)
        );
        if (fileIdsToDelete.length > 0) {
          console.log('Deleting old file IDs:', fileIdsToDelete);
          await this.fileHandler.deleteFiles(fileIdsToDelete);
        }

        // Update the assistant with the new list of file IDs
        const updatedAssistant = await this.openai.beta.assistants.update(
          assistantId,
          { file_ids: newFileIds } // Replace existing file IDs with the new ones
        );

        return updatedAssistant;
      } else {
        console.log(
          'Existing and new file IDs are the same. No update necessary.'
        );
        return currentAssistant;
      }
    } catch (error) {
      console.error('Error in updating assistant files:', error);
      throw error;
    }
  }

  async createAssistantFiles(
    assistantId: string,
    filesIds: string[]
  ): Promise<Assistant> {
    const assistant = await this.openai.beta.assistants.update(assistantId, {
      tools: [
        {
          type: 'retrieval',
        },
      ],
      file_ids: filesIds,
    });

    return assistant;
  }

  async deleteAssistantFiles(assistantId: string, AssistantFileId: string) {
    return await this.openai.beta.assistants.files.del(
      assistantId,
      AssistantFileId
    );
  }

  async getAssistantFiles(assistantId: string) {
    return await this.openai.beta.assistants.files.list(assistantId);
  }

  async createThread(): Promise<Thread> {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread;
    } catch (error) {
      console.error('Error in creating thread:', error);
      throw error;
    }
  }

  async addMessageToThread(
    threadId: string,
    message: MessageCreateParams
  ): Promise<ThreadMessage> {
    try {
      console.log({ message });
      const response = await this.openai.beta.threads.messages.create(
        threadId,
        message
      );
      return response;
    } catch (error) {
      console.error('Error in adding message to thread:', error);
      throw error;
    }
  }

  async runAssistant(assistantId: string, threadId: string): Promise<any> {
    try {
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      });
      while (run.status === 'queued' || run.status === 'in_progress') {
        const updatedRun = await this.openai.beta.threads.runs.retrieve(
          threadId,
          run.id
        );
        if (updatedRun.status === 'completed') {
          const allMessages = await this.openai.beta.threads.messages.list(
            threadId
          );
          return allMessages.data[0].content[0]; // Assuming the latest message is the response
        }
      }
    } catch (error) {
      console.error('Error in running assistant:', error);
      throw error;
    }
  }

  // Ajoutez d'autres méthodes selon les besoins, par exemple pour la gestion des threads, des fichiers, etc.
}
