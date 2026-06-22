/**
 * useShareButton (React Native)
 *
 * The web hook drives the browser Web Share API (`navigator.share`). On native
 * we route through React Native's built-in `Share` module, which opens the OS
 * share sheet. The public surface (`isSupported`, `isSharing`, `handleShare`)
 * is identical to the web hook so `ShareButton` / `ShareButtonView` are
 * unchanged across platforms.
 */

import React from 'react';
import { Share } from 'react-native';
import { ShareButtonProps } from './ShareButton.props';

export const useShareButton = (props: ShareButtonProps) => {
  const {
    shareData,
    onClick,
    onShareStart,
    onShareSuccess,
    onShareCancel,
    onShareError,
  } = props;

  const [isSharing, setIsSharing] = React.useState(false);

  // The native share sheet is always available on iOS/Android.
  const isSupported = true;

  const handleShare = React.useCallback(
    (...args: unknown[]) => {
      onClick?.(...(args as []));
      if (isSharing) return;

      const data = (shareData ?? {}) as {
        title?: string;
        text?: string;
        url?: string;
      };
      const message = [data.text, data.url].filter(Boolean).join('\n');

      setIsSharing(true);
      onShareStart?.();

      Share.share(
        {
          title: data.title,
          message: message || data.title || '',
          url: data.url,
        },
        { subject: data.title }
      )
        .then((result) => {
          if (result.action === Share.dismissedAction) {
            onShareCancel?.();
          } else {
            onShareSuccess?.();
          }
        })
        .catch((error: unknown) => {
          onShareError?.(error);
        })
        .finally(() => {
          setIsSharing(false);
        });
    },
    [
      isSharing,
      onClick,
      onShareCancel,
      onShareError,
      onShareStart,
      onShareSuccess,
      shareData,
    ]
  );

  return { isSupported, isSharing, handleShare };
};
