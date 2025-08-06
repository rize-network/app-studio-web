import React from 'react';
import { EmojiPickerProps } from './EmojiPicker/EmojiPicker.props';
import { useEmojiPickerState } from './EmojiPicker/EmojiPicker.state';
import EmojiPickerView from './EmojiPicker/EmojiPicker.view';

const EmojiPickerComponent: React.FC<EmojiPickerProps> = (
  props: EmojiPickerProps
) => {
  // Initialize the emojiPickerStates with state-management logic and relevant properties from useEmojiPickerState hook
  const emojiPickerStates = useEmojiPickerState(props);

  // Render the EmojiPickerView component with the spread attributes from both emojiPickerStates and props
  return <EmojiPickerView {...emojiPickerStates} {...props} />;
};

// Export EmojiPickerComponent as EmojiPicker
export const EmojiPicker = EmojiPickerComponent;
