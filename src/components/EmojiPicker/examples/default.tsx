import React from 'react';
import { EmojiPicker } from '../EmojiPicker';

export const DefaultEmojiPicker = () => (
  <EmojiPicker
    label="Choose an emoji"
    placeholder="Select an emoji"
    onChange={(emoji) => console.log('Selected emoji:', emoji)}
    onEmojiSelect={(emoji) => console.log('Selected emoji object:', emoji)}
  />
);
