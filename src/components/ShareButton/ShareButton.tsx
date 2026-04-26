import React from 'react';
import ShareButtonView from './ShareButton/ShareButton.view';
import { ShareButtonProps } from './ShareButton/ShareButton.props';
import { useShareButton } from './ShareButton/ShareButton.state';
const ShareButtonComponent: React.FC<ShareButtonProps> = (props) => {
  const { isSupported, isSharing, handleShare } = useShareButton(props);
  const {
    shareData: _shareData,
    onShareStart: _onShareStart,
    onShareSuccess: _onShareSuccess,
    onShareCancel: _onShareCancel,
    onShareError: _onShareError,
    onUnsupported: _onUnsupported,
    onClick: _onClick,
    ...viewProps
  } = props;
  return (
    <ShareButtonView
      {...viewProps}
      isSupported={isSupported}
      isSharing={isSharing}
      onShare={handleShare}
    />
  );
};
// This file defines the `ShareButton` component, serving as a smart container that integrates browser sharing logic using the `useShareButton` hook and renders its visual representation via `ShareButtonView`.
export const ShareButton = ShareButtonComponent;
