export interface Sections {
  [sectionTitle: string]: Chapter[];
}

export interface Chapter {
  title: string;
  subchapters: Subchapter[];
}

export interface Subchapter {
  subtitle: string;
  minWordCount: number;
  maxWordCount: number;
  summary: string;
  points: string[];
}

export interface NewsletterSettings {
  language: string;
  tone: string;
  style: string;
}
