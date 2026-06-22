/**
 * TextArea (React Native)
 *
 * The web version renders `<View as="textarea">` with web-only CSS
 * (`resize`, `outline`, `box-shadow` focus rings). On native `as` is ignored
 * and there is no `<textarea>`, so this mirrors the same public surface on top
 * of app-studio's `Input` (a `TextInput`) configured as a multiline field.
 */

import React from 'react';
import { Input } from 'app-studio';

export interface TextAreaProps {
  rows?: number;
  isDisabled?: boolean;
  hasError?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  // Accepts arbitrary app-studio style props.
  [key: string]: any;
}

export const TextArea: React.FC<TextAreaProps> = ({
  rows = 3,
  isDisabled,
  hasError,
  style,
  ...props
}) => {
  return (
    <Input
      multiline
      numberOfLines={rows}
      editable={!isDisabled}
      textAlignVertical="top"
      width="100%"
      minHeight={rows * 22 + 24}
      paddingVertical={12}
      paddingHorizontal={16}
      borderRadius={8}
      borderWidth={1}
      borderStyle="solid"
      borderColor={hasError ? 'color-red-500' : 'color-gray-200'}
      fontSize={14}
      backgroundColor={isDisabled ? 'color-gray-50' : 'color-white'}
      color={isDisabled ? 'color-gray-400' : 'color-gray-900'}
      placeholderTextColor="color-gray-400"
      {...props}
    />
  );
};

export default TextArea;
