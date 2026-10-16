import React from 'react';
import { Input, ViewProps } from 'app-studio';

export interface CommandTextInputProps
  extends Omit<ViewProps, 'onChange' | 'value'> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const CommandTextInput = React.forwardRef<any, CommandTextInputProps>(
  ({ value, onValueChange, ...props }, ref) => (
    <Input
      value={value}
      onChange={(event: any) =>
        onValueChange(
          typeof event === 'string'
            ? event
            : event?.target?.value ?? event?.nativeEvent?.text ?? ''
        )
      }
      ref={ref}
      {...props}
    />
  )
);

CommandTextInput.displayName = 'CommandTextInput';
