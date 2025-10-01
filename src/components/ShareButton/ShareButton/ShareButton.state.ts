import React from 'react';
import { NavigatorShareData, ShareButtonProps } from './ShareButton.props';

const getNavigator = (): Navigator | undefined =>
  typeof navigator === 'undefined' ? undefined : navigator;

const canShareData = (nav: Navigator | undefined, data: NavigatorShareData) => {
  if (!nav || typeof nav.share !== 'function') {
    return false;
  }

  if (typeof nav.canShare === 'function') {
    try {
      return nav.canShare(data);
    } catch {
      return false;
    }
  }

  return true;
};

const getErrorName = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'name' in error) {
    return String((error as { name?: string }).name);
  }
  return undefined;
};

export const useShareButton = (props: ShareButtonProps) => {
  const {
    shareData,
    onClick,
    onUnsupported,
    onShareStart,
    onShareSuccess,
    onShareCancel,
    onShareError,
  } = props;

  const [isSharing, setIsSharing] = React.useState(false);

  const isSupported = React.useMemo(
    () => canShareData(getNavigator(), shareData),
    [shareData]
  );

  const handleShare = React.useCallback(
    (...args: unknown[]) => {
      onClick?.(...args);

      const nav = getNavigator();

      if (!nav || typeof nav.share !== 'function') {
        onUnsupported?.();
        return;
      }

      if (isSharing) {
        return;
      }

      if (typeof nav.canShare === 'function') {
        try {
          if (!nav.canShare(shareData)) {
            onUnsupported?.();
            return;
          }
        } catch (error) {
          onShareError?.(error);
          return;
        }
      }

      setIsSharing(true);
      onShareStart?.();

      try {
        void nav
          .share(shareData)
          .then(() => {
            onShareSuccess?.();
          })
          .catch((error: unknown) => {
            const errorName = getErrorName(error);

            if (errorName === 'AbortError') {
              onShareCancel?.();
              return;
            }

            onShareError?.(error);
          })
          .finally(() => {
            setIsSharing(false);
          });
      } catch (error) {
        setIsSharing(false);
        onShareError?.(error);
      }
    },
    [
      isSharing,
      onClick,
      onShareCancel,
      onShareError,
      onShareStart,
      onShareSuccess,
      onUnsupported,
      shareData,
    ]
  );

  return {
    isSupported,
    isSharing,
    handleShare,
  };
};
