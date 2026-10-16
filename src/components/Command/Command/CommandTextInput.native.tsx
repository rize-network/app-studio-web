import React from 'react';
import { TextInput } from 'react-native';

export interface CommandTextInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
  fontSize?: string | number;
  color?: string;
  backgroundColor?: string;
  style?: any;
  [key: string]: any;
}

export const CommandTextInput = React.forwardRef<any, CommandTextInputProps>(
  (
    {
      value,
      onValueChange,
      width,
      fontSize = 14,
      color = '#111827',
      backgroundColor,
      border: _border,
      outline: _outline,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedFontSize =
      typeof fontSize === 'number'
        ? fontSize
        : parseFloat(String(fontSize).replace('px', '')) || 14;

    return (
      <TextInput
        value={value}
        onChangeText={onValueChange}
        ref={ref}
        style={[
          {
            flex: width === '100%' ? 1 : undefined,
            width: typeof width === 'number' ? width : undefined,
            minWidth: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderWidth: 0,
            lineHeight: resolvedFontSize + 4,
            includeFontPadding: false,
            backgroundColor:
              backgroundColor === 'transparent'
                ? 'transparent'
                : backgroundColor,
            color,
            fontSize: resolvedFontSize,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

CommandTextInput.displayName = 'CommandTextInput';
