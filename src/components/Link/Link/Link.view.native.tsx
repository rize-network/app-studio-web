/**
 * LinkView (React Native) – uses RN's Linking for external URLs.
 * - For external links: pressing opens the URL via Linking.openURL.
 * - For internal links: calls `onPress` (the host app wires it to its
 *   navigation library – react-navigation, expo-router, etc.).
 * - Falls back to underlined-by-default since hover does not apply on RN.
 */

import React from 'react';
import { Linking } from 'react-native';
import { Horizontal } from 'app-studio';
import { ExternalLinkIcon } from '../../Icon/Icon';
import { LinkViewProps } from './Link.props';
import { IconSizes } from './Link.style';

const LinkView = React.forwardRef<any, LinkViewProps>(
  (
    {
      children,
      to = '/',
      iconSize = 'sm',
      underline = 'default',
      isExternal = false,
      views = { icon: {}, text: {} },
      onPress,
      ...props
    },
    ref
  ) => {
    const textDecoration =
      underline === 'underline' || underline === 'hover' ? 'underline' : 'none';

    const handlePress = (e?: any) => {
      if (isExternal && typeof to === 'string') {
        Linking.openURL(to).catch(() => {
          /* swallow – host may want to handle this */
        });
        return;
      }
      onPress?.(e);
    };

    return (
      <Horizontal
        ref={ref}
        onPress={handlePress}
        gap={3}
        alignItems="center"
        flexWrap="nowrap"
        textDecorationLine={textDecoration}
        {...views.text}
        {...props}
      >
        {children}
        {isExternal && <ExternalLinkIcon widthHeight={IconSizes[iconSize]} />}
      </Horizontal>
    );
  }
);
LinkView.displayName = 'LinkView';
export default LinkView;
