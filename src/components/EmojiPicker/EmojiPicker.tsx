import React from 'react';
import { EmojiPickerProps } from './EmojiPicker/EmojiPicker.props';
import { useEmojiPickerState } from './EmojiPicker/EmojiPicker.state';
import EmojiPickerView from './EmojiPicker/EmojiPicker.view';
// Defines the main EmojiPicker functional component, serving as the top-level orchestrator that integrates state management with the presentation layer to render the emoji picker UI.
const EmojiPickerComponent: React.FC<EmojiPickerProps> = (
  props: EmojiPickerProps
) => {
  const emojiPickerStates = useEmojiPickerState(props);
  return <EmojiPickerView {...emojiPickerStates} {...props} />;
};
export const EmojiPicker = EmojiPickerComponent;
