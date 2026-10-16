import React from 'react';
import { BlockEditor } from '../../../components/BlockEditor/BlockEditor';

export const MarkdownEditor = ({ markdown }: { markdown: string }) => (
  <BlockEditor key={markdown} defaultValue={markdown} />
);
