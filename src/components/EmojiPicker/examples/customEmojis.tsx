import React from 'react';
import { EmojiPicker } from '../EmojiPicker';

export const CustomEmojisEmojiPicker = () => (
  <EmojiPicker
    label="Custom emoji set"
    customEmojis={[
      {
        emoji: '🚀',
        name: 'rocket',
        category: 'objects',
        keywords: ['rocket', 'space', 'launch'],
      },
      {
        emoji: '⭐',
        name: 'star',
        category: 'symbols',
        keywords: ['star', 'favorite', 'rating'],
      },
      {
        emoji: '🎯',
        name: 'target',
        category: 'activities',
        keywords: ['target', 'goal', 'aim'],
      },
      {
        emoji: '💎',
        name: 'diamond',
        category: 'objects',
        keywords: ['diamond', 'gem', 'precious'],
      },
      {
        emoji: '🔥',
        name: 'fire',
        category: 'symbols',
        keywords: ['fire', 'hot', 'trending'],
      },
      {
        emoji: '⚡',
        name: 'lightning',
        category: 'symbols',
        keywords: ['lightning', 'fast', 'energy'],
      },
    ]}
    enabledCategories={['recent', 'objects', 'symbols', 'activities']}
    showSearch={true}
    showRecentEmojis={true}
    placeholder="Choose from custom emojis"
    onChange={(emoji) => console.log('Selected custom emoji:', emoji)}
  />
);
