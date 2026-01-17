import React from 'react';
import { ButtonProps as $ButtonProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../utils/elevation';
import {
  IconPosition,
  Shape,
  Size,
  Variant,
  Animation,
  LoaderPosition,
  // Defines the types and structure required for the ButtonProps interface, used as a contract for Button component properties.
} from './Button.type';
// Optional React node(s) to be displayed as the button's content.
import { LoaderProps } from '../../Loader/Loader/Loader.props';
// Optional string to define the color scheme of the button.
export interface ButtonProps extends Omit<$ButtonProps, 'size'> {
  // Optional React node(s) to be displayed as the button's content.
  children?: React.ReactNode;
  // Optional LoaderProps object to configure the appearance and behavior of the loader animation.
  to?: string;
  // Optional LoaderPosition to determine the location of the loader animation relative to the button content.
  isLoading?: boolean;
  // Optional React node(s) defining the icon to be displayed within the button.
  loaderProps?: LoaderProps;
  // Optional IconPosition to specify the icon placement inside the button relative to text.
  loaderPosition?: LoaderPosition;
  // Optional boolean to indicate if the button is non-interactive/disabled.
  icon?: React.ReactNode;
  // Optional boolean to control the fill property of the button, affecting its style.
  iconPosition?: IconPosition;
  // Optional boolean indicating if the button size should automatically adjust to its content.
  isDisabled?: boolean;
  // Optional boolean that adds a rounded style to the icon if present.
  isFilled?: boolean;
  // Optional function that will be called when the button is clicked.
  isAuto?: boolean;
  // Optional Size to specify the size of the button.
  isIconRounded?: boolean;
  // Optional shadow property that can be a predefined Shadow, Elevation value or custom CSSProperties to apply shadow effects to the button.
  onClick?: Function;
  // Optional Shape to specify the shape of the button (e.g., rounded or square edges).
  size?: Size;
  // Optional string used as an accessible label for screen readers.
  shadow?: Shadow | Elevation | ViewProps;
  // Optional Variant to define the stylistic variation of the button.
  shape?: Shape;
  // Optional effect to apply interactive effects (e.g., ripple) to the button.
  ariaLabel?: string;

  // Variant to define the stylistic variation of the button.
  variant?: Variant;

  // Optional animation to apply to the button
  animation?: Animation;

  // Main color for the button (accepts theme tokens like 'theme-primary' or color palette like 'color-blue-600')
  color?: string;

  // Explicit text color (overrides auto-calculated color)
  textColor?: string;

  // Whether to reverse the colors (useful for dark backgrounds)
  reversed?: boolean;

  // Props for borderMoving variant
  borderMovingDuration?: number;
  borderMovingGradientColors?: string[];

  // Props for animatedStroke variant
  animatedStrokeAccentColor?: string;
  animatedStrokeTextColor?: string;

  views?: {
    container?: ViewProps;
    content?: ViewProps;
    loader?: ViewProps;
    icon?: ViewProps;
    link?: ViewProps;
  };
}
