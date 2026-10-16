import React from 'react';
import { Button } from '../../Button/Button';
import { ShareIcon } from '../../Icon/Icon';
import { ShareButtonViewProps } from './ShareButton.props';
// Defines a mapping from different size categories (extra-small, small, medium, large, extra-large) to their corresponding numerical pixel dimensions for icons.
const ICON_SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};
// Renders the visual representation of the ShareButton component. It accepts various props to control its appearance, state, and behavior.
const ShareButtonView: React.FC<ShareButtonViewProps> = ({
  // Indicates whether the Web Share API is supported in the current browser environment.
  isSupported,
  // A boolean flag indicating if a sharing operation is currently active or in progress.
  isSharing,
  // The callback function to be executed when the share button is clicked, typically initiating the sharing process.
  onShare,
  // The text label to display on the button, which can be overridden by 'children'.
  label,
  // React children to be rendered inside the button, providing a flexible way to add content and overriding the 'label' prop.
  children,
  // A custom icon component to render within the button. If not provided, a default ShareIcon will be used.
  icon,
  // Specifies the predefined size of the button and its default icon (e.g., 'xs', 'sm', 'md', 'lg', 'xl').
  size,
  // A boolean prop that explicitly disables the button, preventing user interaction.
  isDisabled,
  // A boolean prop that, when true, displays a loading spinner within the button.
  isLoading,
  // Determines the placement of the icon relative to the button's text (e.g., 'left' or 'right').
  iconPosition,
  // A boolean flag that, if true, will automatically disable the button when the Web Share API is not supported.
  disableWhenUnsupported = true,
  ...rest
}) => {
  // Determines the effective size for the button, defaulting to 'md' if no size is explicitly provided via props.
  const resolvedSize = size ?? 'md';
  // Determines the icon component to be displayed. If no custom icon is provided, it defaults to a ShareIcon with dimensions based on the resolved size.
  const resolvedIcon = icon ?? (
    <ShareIcon
      widthHeight={ICON_SIZE_MAP[resolvedSize]}
      strokeWidth={1.5}
      filled={false}
    />
  );
  // Calculates the final disabled state of the button, considering explicit `isDisabled` and whether the share functionality is unsupported and `disableWhenUnsupported` is active.
  const shouldDisable =
    Boolean(isDisabled) || (!isSupported && disableWhenUnsupported);
  // Determines if the button should display a loading state, either due to an explicit `isLoading` prop or if a sharing operation is currently in progress.
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
