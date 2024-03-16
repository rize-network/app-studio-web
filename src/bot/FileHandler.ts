/**
uploadFile : Méthode pour uploader un fichier sur OpenAI. Prend le chemin du fichier et le purpose (utilisation prévue du fichier) en paramètres.
deleteFile : Méthode pour supprimer un fichier de OpenAI en utilisant son ID.
listFiles : Méthode pour lister tous les fichiers disponibles sur votre compte OpenAI.
*/

import fs from 'fs';
import { OpenAI } from 'openai';
import path from 'path';

export class FileHandler {
  private readonly openai: OpenAI;

  constructor(apiKey: string, organization: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
      organization: organization,
    });
  }

  public readFile(filePath: string): string {
    //    if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
    // }
    // return '';
  }
  public readFiles(folder: string): string[] {
    // Créer le répertoire de cache s'il n'existe pas
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    return fs.readdirSync(folder);
  }

  public writeFile(fileFolder: string, filename: string, content: string) {
    const filePath = path.join(fileFolder, filename);
    if (!fs.existsSync(fileFolder)) {
      fs.mkdirSync(fileFolder, { recursive: true });
    }
    // Ensure content is a string before writing
    const contentStr =
      typeof content === 'string' ? content : JSON.stringify(content, null, 2); // Convert objects to strings

    fs.writeFileSync(filePath, contentStr, 'utf8');
  }

  public writeWithoutCheck(filePath: string, content: string) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  public pathExists(filePath: string) {
    return fs.existsSync(filePath);
  }
  public readComponentPropsFromJson = (
    filePath: string
  ): Record<string, any> => {
    const absoluteFilePath = path.resolve(filePath);
    if (!fs.existsSync(absoluteFilePath)) {
      console.error(`File not found: ${absoluteFilePath}`);
      process.exit(1);
    }
    const fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
    return JSON.parse(fileContent);
  };

  async uploadFile(filePath: string, purpose: 'fine-tune' | 'assistants') {
    try {
      const fileStream = fs.createReadStream(filePath);
      const response = await this.openai.files.create({
        file: fileStream,
        purpose: purpose,
      });
      return response.id;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(fileId: string) {
    try {
      const response = await this.openai.files.del(fileId);
      return response.deleted;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async listFiles() {
    try {
      const response = await this.openai.files.list();
      return response.data; // Returns an array of file objects
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }
}
