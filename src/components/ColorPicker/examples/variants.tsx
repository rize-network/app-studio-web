import React from 'react';
import { Vertical } from 'app-studio';
import { ColorPicker } from '../ColorPicker';

export const ColorPickerVariants = () => (
  <Vertical gap={16}>
    <ColorPicker
      label="Default variant"
      variant="default"
      placeholder="Default style"
    />
    <ColorPicker
      label="Outline variant"
      variant="outline"
      placeholder="Outline style"
    />
    <ColorPicker
      label="Filled variant"
      variant="filled"
      placeholder="Filled style"
    />
  </Vertical>
);
