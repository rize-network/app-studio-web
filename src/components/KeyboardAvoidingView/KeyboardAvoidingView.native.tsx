/**
 * KeyboardAvoidingView (native).
 *
 * Wraps RN's `KeyboardAvoidingView` with sensible per-platform defaults and an
 * optional tap-to-dismiss: a transparent `Pressable` over the content dismisses
 * the keyboard when an empty area is tapped, while taps that land on a real
 * input (which captures its own touch) still focus it. Replaces the ad-hoc
 * `TouchableWithoutFeedback` wrappers from the original app-demo PageLayout.
 */
import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import { View } from 'app-studio';
import { KeyboardAvoidingViewProps } from './KeyboardAvoidingView.types';

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  behavior,
  keyboardVerticalOffset = 0,
  dismissOnTap = false,
  enabled = true,
  children,
  ...props
}) => {
  const resolvedBehavior =
    behavior ?? (Platform.OS === 'ios' ? 'padding' : 'height');

  const content = (
    <View flex={1} width="100%" {...props}>
      {children}
    </View>
  );

  return (
    <RNKeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={resolvedBehavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={enabled}
    >
      {dismissOnTap ? (
        <Pressable
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          {content}
        </Pressable>
      ) : (
        content
      )}
    </RNKeyboardAvoidingView>
  );
};
