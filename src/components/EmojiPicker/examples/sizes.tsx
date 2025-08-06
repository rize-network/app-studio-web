import React from 'react';
import { Vertical } from 'app-studio';
import { EmojiPicker } from '../EmojiPicker';

export const EmojiPickerSizes = () => (
  <Vertical gap={16}>
    <EmojiPicker label="Extra small" size="xs" placeholder="XS size" />
    <EmojiPicker label="Small" size="sm" placeholder="SM size" />
    <EmojiPicker label="Medium" size="md" placeholder="MD size" />
    <EmojiPicker label="Large" size="lg" placeholder="LG size" />
    <EmojiPicker label="Extra large" size="xl" placeholder="XL size" />
  </Vertical>
);
