/**
 * PageLayout — a screen scaffold with a pinned header, a scrollable content
 * area, and a pinned footer, with keyboard avoidance built in.
 *
 * A cross-platform, hooks-based reimagining of the original app-demo
 * `PageLayout` (a class component that absolutely-positioned the header/footer
 * and hand-measured heights to decide whether to scroll). Here a plain flex
 * column does the same job on web and native with no measuring: the header
 * stays at the top, the content flexes and scrolls only when it overflows, and
 * the footer sits inside the keyboard-avoiding region so a submit bar rides
 * above the keyboard. Safe-area insets come from app-studio's `SafeArea`
 * instead of `react-native-static-safe-area-insets`.
 */
import React from 'react';
import { View, SafeArea, Scroll, Center, isBrowser } from 'app-studio';
import { Loader } from '../Loader/Loader';
import { KeyboardAvoidingView } from '../KeyboardAvoidingView/KeyboardAvoidingView';
import { PageLayoutProps } from './PageLayout.types';

export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  footer,
  children,
  isLoading = false,
  safe = true,
  scrollable = true,
  dismissKeyboardOnTap = true,
  keyboardVerticalOffset = 0,
  views = {},
  backgroundColor = 'color-white',
  ...props
}) => {
  const Container: any = safe ? SafeArea : View;

  // `keyboardShouldPersistTaps` / `contentContainerStyle` are React Native
  // ScrollView props; on the web they'd be invalid DOM attributes, so gate
  // them behind the platform check (`isBrowser` is exported by both bundles).
  const nativeScrollProps = isBrowser()
    ? {}
    : {
        keyboardShouldPersistTaps: 'handled',
        showsVerticalScrollIndicator: false,
        contentContainerStyle: { flexGrow: 1 },
      };

  const content = isLoading ? (
    <Center flex={1} width="100%" {...views.content}>
      <Loader />
    </Center>
  ) : scrollable ? (
    <Scroll flex={1} width="100%" {...nativeScrollProps} {...views.content}>
      {children}
    </Scroll>
  ) : (
    <View flex={1} width="100%" {...views.content}>
      {children}
    </View>
  );

  return (
    <Container
      flex={1}
      height="100%"
      width="100%"
      flexDirection="column"
      backgroundColor={backgroundColor}
      {...props}
      {...views.container}
    >
      {header != null && (
        <View width="100%" flexShrink={0} {...views.header}>
          {header}
        </View>
      )}
      <KeyboardAvoidingView
        flexDirection="column"
        dismissOnTap={dismissKeyboardOnTap}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {content}
        {footer != null && (
          <View width="100%" flexShrink={0} {...views.footer}>
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </Container>
  );
};
