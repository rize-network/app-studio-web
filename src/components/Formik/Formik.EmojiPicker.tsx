import React from 'react';

import { EmojiPickerProps } from '../EmojiPicker/EmojiPicker/EmojiPicker.props';
import { Emoji } from '../EmojiPicker/EmojiPicker/EmojiPicker.type';
import { useEmojiPickerState } from '../EmojiPicker/EmojiPicker/EmojiPicker.state';
import EmojiPickerView from '../EmojiPicker/EmojiPicker/EmojiPicker.view';
import { useFormikInput } from './Formik.Hook';

const EmojiPickerComponent: React.FC<EmojiPickerProps> = (props) => {
  const formProps = useFormikInput(props);

  // Use the Formik value as the current value
  const propsWithValue = {
    ...props,
    value: formProps.value ?? props.value ?? props.defaultValue,
    onChange: formProps.onChange,
  };

  const emojiPickerStates = useEmojiPickerState(propsWithValue);

  // Handle emoji selection
  const handleEmojiSelect = (emoji: Emoji) => {
    emojiPickerStates.handleEmojiSelect(emoji);
  };

  return (
    <EmojiPickerView
      {...emojiPickerStates}
      {...propsWithValue}
      handleEmojiSelect={handleEmojiSelect}
    />
  );
};

/**
 * EmojiPicker allows users to select an emoji from a list with Formik integration.
 */
export const FormikEmojiPicker = EmojiPickerComponent;
