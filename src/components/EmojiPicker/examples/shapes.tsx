import React from 'react';
import { Vertical } from 'app-studio';
import { EmojiPicker } from '../EmojiPicker';

export const EmojiPickerShapes = () => (
  <Vertical gap={16}>
    <EmojiPicker
      label="Default shape"
      shape="default"
      placeholder="Default corners"
    />
    <EmojiPicker
      label="square shape"
      shape="square"
      placeholder="square corners"
    />
    <EmojiPicker
      label="Rounded shape"
      shape="rounded"
      placeholder="Rounded corners"
    />
    <EmojiPicker label="Pill shaped" shape="pill" placeholder="Pill shaped" />
  </Vertical>
);
