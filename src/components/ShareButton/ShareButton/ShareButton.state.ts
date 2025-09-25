import { useCallback, useEffect, useState } from 'react';
import type {
  ShareButtonData,
  ShareButtonStateOptions,
} from './ShareButton.props';

const isNavigatorShareSupported = () =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';

const getDefaultShareData = (): ShareData => {
  const shareData: ShareData = {};
  if (typeof document !== 'undefined' && document.title) {
    shareData.title = document.title;
    shareData.text = document.title;
  }
  if (typeof window !== 'undefined' && window.location?.href) {
    shareData.url = window.location.href;
  }
  return shareData;
};

const resolveShareData = async (
  data?: ShareButtonData
): Promise<ShareData> => {
  if (typeof data === 'function') {
    const result = data();
    return (await Promise.resolve(result)) ?? {};
  }
  if (data) {
    return data;
  }
  return getDefaultShareData();
};

const hasText = (value?: string) =>
  typeof value === 'string' && value.trim().length > 0;

const hasShareContent = (shareData: ShareData) => {
  if (!shareData) {
    return false;
  }

  const files = Array.isArray(shareData.files)
    ? shareData.files.filter(Boolean)
    : undefined;

  return (
    hasText(shareData.title) ||
    hasText(shareData.text) ||
    hasText(shareData.url) ||
    (files?.length ?? 0) > 0
  );
};

export const useShareButtonState = ({
  data,
  onShareStart,
  onShareSuccess,
  onShareError,
  onShareComplete,
  onUnsupported,
  fallback,
}: ShareButtonStateOptions) => {
  const [isShareSupported, setIsShareSupported] = useState<boolean>(
    isNavigatorShareSupported()
  );
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setIsShareSupported(isNavigatorShareSupported());
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = await resolveShareData(data);

    if (!hasShareContent(shareData)) {
      const emptyError = new Error(
        'Share data must include at least a title, text, url, or files.'
      );
      onShareError?.(emptyError, shareData);
      fallback?.(shareData);
      onShareComplete?.(shareData);
      return;
    }

    if (!isNavigatorShareSupported()) {
      setIsShareSupported(false);
      const unsupportedError = new Error(
        'The Web Share API is not supported in this browser.'
      );
      onShareError?.(unsupportedError, shareData);
      onUnsupported?.(shareData);
      fallback?.(shareData);
      onShareComplete?.(shareData);
      return;
    }

    if (shareData.files && typeof navigator.canShare === 'function') {
      let canShare = false;
      try {
        canShare = navigator.canShare(shareData);
      } catch (error) {
        canShare = false;
      }

      if (!canShare) {
        const unsupportedError = new Error(
          'This browser cannot share the provided files.'
        );
        onShareError?.(unsupportedError, shareData);
        onUnsupported?.(shareData);
        fallback?.(shareData);
        onShareComplete?.(shareData);
        return;
      }
    }

    setIsSharing(true);

    try {
      onShareStart?.(shareData);
      await navigator.share(shareData);
      onShareSuccess?.(shareData);
    } catch (error) {
      const shareError =
        error instanceof Error ? error : new Error(String(error));

      if (shareError.name !== 'AbortError') {
        onShareError?.(shareError, shareData);
        fallback?.(shareData);
      }
    } finally {
      setIsSharing(false);
      onShareComplete?.(shareData);
    }
  }, [
    data,
    fallback,
    onShareComplete,
    onShareError,
    onShareStart,
    onShareSuccess,
    onUnsupported,
  ]);

  return {
    isShareSupported,
    isSharing,
    handleShare,
  };
};
