import React from 'react';
import { Vertical } from 'app-studio';
import { DropZone } from '../DropZone';

export const DefaultDropZone = () => (
  <Vertical gap={12} width="100%">
    <DropZone
      text="Tap to choose a file"
      onFileSelect={(file) => console.log('selected', file?.name)}
    />
  </Vertical>
);
