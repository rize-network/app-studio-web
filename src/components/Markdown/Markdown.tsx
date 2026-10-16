import React from 'react';
import { MarkdownProps } from './Markdown/Markdown.props';
import { MarkdownView } from './Markdown/Markdown.view';

export const Markdown: React.FC<MarkdownProps> = (props) => (
  <MarkdownView {...props} />
);
