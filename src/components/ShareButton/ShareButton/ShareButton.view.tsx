import React from 'react';
import { Button } from '../../Button/Button';
import { ShareButtonViewProps } from './ShareButton.props';

const ShareButtonView: React.FC<ShareButtonViewProps> = ({
  onShare,
  isShareSupported,
  isSharing,
  disableWhenUnsupported = false,
  unsupportedText,
  isDisabled,
  isLoading,
  children,
  ...buttonProps
}) => {
  const shouldDisable =
    Boolean(isDisabled) || (disableWhenUnsupported && !isShareSupported);
  const loading = Boolean(isLoading) || isSharing;
  const label = !isShareSupported && unsupportedText ? unsupportedText : children;

  return (
    <Button
      {...buttonProps}
      onClick={onShare}
      isDisabled={shouldDisable}
      isLoading={loading}
    >
      {label}
    </Button>
  );
};

export default ShareButtonView;
