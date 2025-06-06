'use client';

import { ViewProps } from 'app-studio';

/**
 * Size options for the ChatInput component
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Shape options for the ChatInput component
 */
export type Shape = 'default' | 'sharp' | 'rounded';

/**
 * Variant options for the ChatInput component
 */
export type Variant = 'default' | 'outline' | 'none';

/**
 * Uploaded file interface
 */
export interface UploadedFile {
  name: string;
  path: string;
  size: number;
  type: string;
  localUrl?: string;
  isReferenceImage?: boolean;
}

/**
 * Prompt example interface
 */
export interface PromptExample {
  id: string;
  text: string;
}

/**
 * Model option interface
 */
export interface ModelOption {
  id: string;
  name: string;
  description?: string;
  isThinking?: boolean;
}

/**
 * Style customization interface for ChatInput
 */
export interface ChatInputStyles {
  textarea?: ViewProps;
  container?: ViewProps;
  content?: ViewProps;
  editableInput?: ViewProps;
  header?: ViewProps;
  title?: ViewProps;
  guideTip?: ViewProps;
  guideTipVideo?: ViewProps;
  guideTipClose?: ViewProps;
  promptExamples?: ViewProps;
  promptExampleItem?: ViewProps;
  referenceImageButton?: ViewProps;
  referenceImageModal?: ViewProps;
  attachments?: ViewProps;
  attachmentItem?: ViewProps;
  attachmentName?: ViewProps;
  attachmentSize?: ViewProps;
  attachmentRemove?: ViewProps;
  referenceButton?: ViewProps;
  submitButton?: ViewProps;
  fileButton?: ViewProps;
  modelSelector?: ViewProps;
  loadingIndicator?: ViewProps;
  bottomTip?: ViewProps;
}
