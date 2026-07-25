import React from 'react';
import { Text, View, Vertical } from 'app-studio';
import { KeyboardAvoidingView, TextField } from '../..';

/**
 * On native, focusing a field lifts this content above the keyboard and a tap
 * on empty space dismisses it. On web it renders as a plain flex container.
 */
export const DefaultKeyboardAvoidingView = () => (
  <View
    height={320}
    width="100%"
    maxWidth={360}
    borderRadius={16}
    overflow="hidden"
    borderWidth={1}
    borderStyle="solid"
    borderColor="color-gray-200"
  >
    <KeyboardAvoidingView dismissOnTap>
      <Vertical flex={1} justifyContent="flex-end" padding={16} gap={12}>
        <Text color="color-gray-500">Tap empty space to dismiss</Text>
        <TextField name="email" label="Email" />
        <TextField name="message" label="Message" />
      </Vertical>
    </KeyboardAvoidingView>
  </View>
);
