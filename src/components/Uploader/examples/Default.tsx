import React from 'react';
import { Vertical } from 'app-studio';
import { Uploader } from '../Uploader';

export const DefaultUploader = () => (
  <Vertical gap={12} width="100%">
    <Uploader
      text="Tap to choose a file"
      onFileSelect={(file) => console.log('selected', file?.name)}
    />
  </Vertical>
);
