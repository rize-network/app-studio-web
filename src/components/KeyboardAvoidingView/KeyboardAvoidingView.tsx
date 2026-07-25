/**
 * KeyboardAvoidingView (web).
 *
 * On the web the browser already reflows the layout around the on-screen
 * keyboard, so this is just a flex container. The native build
 * (`KeyboardAvoidingView.native.tsx`) wraps React Native's
 * `KeyboardAvoidingView` and adds tap-to-dismiss. Both accept the same props
 * so layouts (e.g. `PageLayout`) compose identically across platforms.
 */
import React from 'react';
import { View } from 'app-studio';
import { KeyboardAvoidingViewProps } from './KeyboardAvoidingView.types';

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  // Keyboard-specific props are accepted for API parity and ignored on web.
  behavior,
  keyboardVerticalOffset,
  dismissOnTap,
  enabled,
  children,
  ...props
}) => (
  <View flex={1} width="100%" {...props}>
    {children}
  </View>
);
