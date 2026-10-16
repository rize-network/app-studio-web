import React from 'react';
import { Vertical, Input as BaseInput } from 'app-studio';
import { FieldContainer } from '../FieldContainer/FieldContainer';
import { FieldLabel } from '../FieldLabel/FieldLabel';

// The Input package ships the low-level field primitives (FieldContainer,
// FieldLabel, HelperText, …) that higher-level fields like TextField compose.
// This demo wires a few of them together directly.
export const DefaultInput = () => {
  const [value, setValue] = React.useState('');
  return (
    <Vertical gap={16} width="100%">
      <FieldContainer helperText="We'll never share your email.">
        <FieldLabel color="color-gray-700">Email</FieldLabel>
        <BaseInput
          value={value}
          onChangeText={setValue}
          placeholder="you@example.com"
          paddingVertical={10}
          paddingHorizontal={12}
          borderRadius={8}
          borderWidth={1}
          borderStyle="solid"
          borderColor="color-gray-200"
          backgroundColor="color-white"
          color="color-gray-900"
          placeholderTextColor="color-gray-400"
        />
      </FieldContainer>

      <FieldContainer error="This field is required">
        <FieldLabel error color="color-gray-700">
          Username
        </FieldLabel>
        <BaseInput
          placeholder="required"
          paddingVertical={10}
          paddingHorizontal={12}
          borderRadius={8}
          borderWidth={1}
          borderStyle="solid"
          borderColor="color-red-500"
          backgroundColor="color-white"
          color="color-gray-900"
          placeholderTextColor="color-gray-400"
        />
      </FieldContainer>
    </Vertical>
  );
};
