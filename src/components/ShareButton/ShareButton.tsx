import React from 'react';
import { ShareButtonProps } from './ShareButton/ShareButton.props';
import { useShareButtonState } from './ShareButton/ShareButton.state';
import ShareButtonView from './ShareButton/ShareButton.view';

export const ShareButton: React.FC<ShareButtonProps> = ({
  children = 'Share',
  data,
  disableWhenUnsupported,
  unsupportedText,
  onShareStart,
  onShareSuccess,
  onShareError,
  onShareComplete,
  onUnsupported,
  fallback,
  ...buttonProps
}) => {
  const { isShareSupported, isSharing, handleShare } = useShareButtonState({
    data,
    onShareStart,
    onShareSuccess,
    onShareError,
    onShareComplete,
    onUnsupported,
    fallback,
  });

  return (
    <ShareButtonView
      {...buttonProps}
      onShare={handleShare}
      isShareSupported={isShareSupported}
      isSharing={isSharing}
      disableWhenUnsupported={disableWhenUnsupported}
      unsupportedText={unsupportedText}
    >
      {children}
    </ShareButtonView>
  );
};
