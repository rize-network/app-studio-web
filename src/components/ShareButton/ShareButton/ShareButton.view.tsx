import React from 'react';
import { Button } from '../../Button/Button';
import { ShareIcon } from '../../Icon/Icon';
import { ShareButtonViewProps } from './ShareButton.props';

const ICON_SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

const ShareButtonView: React.FC<ShareButtonViewProps> = ({
  isSupported,
  isSharing,
  onShare,
  label,
  children,
  icon,
  size,
  isDisabled,
  isLoading,
  iconPosition,
  disableWhenUnsupported = true,
  ...rest
}) => {
  const resolvedSize = size ?? 'md';
  const resolvedIcon = icon ?? (
    <ShareIcon
      widthHeight={ICON_SIZE_MAP[resolvedSize]}
      strokeWidth={1.5}
      filled={false}
    />
  );

  const shouldDisable =
    Boolean(isDisabled) || (!isSupported && disableWhenUnsupported);
  const shouldShowLoader = Boolean(isLoading) || isSharing;

  return (
    <Button
      {...rest}
      size={resolvedSize}
      icon={resolvedIcon}
      iconPosition={iconPosition ?? 'left'}
      isDisabled={shouldDisable}
      isLoading={shouldShowLoader}
      onClick={onShare}
    >
      {children ?? label ?? 'Share'}
    </Button>
  );
};

export default ShareButtonView;
