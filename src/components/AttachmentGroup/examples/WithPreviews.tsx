import React from 'react';
import { AttachmentGroup } from '../AttachmentGroup';

const files = [
  {
    name: 'logo.png',
    size: 18_000,
    type: 'image/png',
    url: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    name: 'notes.txt',
    size: 2_400,
    type: 'text/plain',
  },
] as any;

export const AttachmentGroupWithPreviews = () => (
  <AttachmentGroup
    files={files}
    onRemove={() => {}}
    showPreviews
    layout="grid"
  />
);
