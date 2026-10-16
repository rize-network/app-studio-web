import React from 'react';
import { ViewProps } from 'app-studio';

export type NativeMediaDescriptor = {
  uri: string;
  name: string;
  /** MIME type supplied by the application's picker. */
  type: string;
  size?: number;
};
export type EditorMediaFile = File | NativeMediaDescriptor;
export type EditorMediaResult = { url: string; type: 'image' | 'video' };

export interface BlockEditorProps
  extends Omit<ViewProps, 'onChange' | 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onChange?: (markdown: string) => void;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onSave?: () => void;
  /** Upload one user-selected file. The application owns storage and authorization. */
  uploadMedia?: (
    file: EditorMediaFile,
    options: { signal: AbortSignal }
  ) => Promise<EditorMediaResult>;
  /** Native applications supply their real picker; null means user cancellation. */
  pickMedia?: () => Promise<EditorMediaFile | null>;
  generate?: (
    prompt: string,
    fragment: string,
    scope: 'selection' | 'section'
  ) => Promise<string>;
  status?: React.ReactNode;
  labels?: Partial<BlockEditorLabels>;
  views?: {
    container?: ViewProps;
    toolbar?: ViewProps;
    block?: ViewProps;
    content?: ViewProps;
    source?: ViewProps;
    notice?: ViewProps;
    panel?: ViewProps;
  };
}

export const defaultBlockEditorLabels = {
  document: 'Document',
  paragraph: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  bullet: 'Bulleted list',
  number: 'Numbered list',
  quote: 'Quote',
  codeBlock: 'Code block',
  table: 'Table',
  blocks: 'Blocks /',
  below: 'Insert below',
  duplicate: 'Duplicate',
  delete: 'Delete',
  up: 'Move up',
  down: 'Move down',
  drag: 'Drag block',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  code: 'Inline code',
  link: 'Link',
  linkUrl: 'Link address',
  invalidLink: 'Enter an http, https, mailto, tel or relative link.',
  media: 'Insert image or video',
  image: 'Image',
  video: 'Video',
  mediaUrl: 'Media address',
  mediaDescription: 'Description / alternative text',
  mediaSource:
    'Inserting media switches this document to Markdown source editing.',
  invalidMedia:
    'Choose an image or video and a safe http, https or relative address.',
  upload: 'Upload a file',
  uploading: 'Uploading…',
  pickingMedia: 'Choose a file…',
  uploadError: 'Upload failed. Your document is unchanged.',
  cancelUpload: 'Cancel upload',
  mediaStale:
    'The document has changed. Close this panel and choose the insertion point again.',
  undo: 'Undo',
  redo: 'Redo',
  source: 'Markdown source',
  visual: 'Visual editor',
  emoji: 'Insert emoji',
  sourceFallback:
    'This Markdown contains syntax that visual editing cannot preserve. Edit its source instead.',
  selectionToolbar: 'Selection actions',
  askSelection: 'Edit selection with AI',
  askSection: 'Edit document with AI',
  aiPanel: 'AI proposal',
  instruction: 'Describe the change',
  generating: 'Preparing proposal…',
  aiError: 'Generation failed. Your text is unchanged.',
  proposal: 'Proposal',
  apply: 'Apply',
  discard: 'Discard',
  cancel: 'Close',
  retry: 'Retry',
  generate: 'Generate',
  stale:
    'The document has changed. Select the text again before generating a proposal.',
  selectionRequired: 'Select text inside this editor first.',
  save: 'Save',
  empty: 'Write something…',
};
export type BlockEditorLabels = typeof defaultBlockEditorLabels;
