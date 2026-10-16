import React from 'react';
import { ViewProps } from 'app-studio';

export interface BlockEditorProps
  extends Omit<ViewProps, 'onChange' | 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onChange?: (markdown: string) => void;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onSave?: () => void;
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
