import React from 'react';
import { Vertical } from 'app-studio';
import { EmojiPicker } from '../EmojiPicker';

export const EmojiPickerVariants = () => (
  <Vertical gap={16}>
    <EmojiPicker
      label="Default variant"
      variant="default"
      placeholder="Default style"
    />
    <EmojiPicker
      label="Outline variant"
      variant="outline"
      placeholder="Outline style"
    />
    <EmojiPicker
      label="Filled variant"
      variant="filled"
      placeholder="Filled style"
    />
  </Vertical>
);
