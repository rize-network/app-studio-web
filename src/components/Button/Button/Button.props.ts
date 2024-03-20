import React, { CSSProperties } from 'react';
import { Shadow } from 'app-studio';

import { Elevation } from '../../../utils/elevation';

import {
  IconPosition,
  Shape,
  Size,
  Variant,
  LoaderPosition,
  Effects,
} from './Button.type';
import { LoaderProps } from '../../Loader/Loader/Loader.props';

/**
 * Represents the properties for the Button component.
 */
export interface ButtonProps {
  /**
   * The content to be rendered inside the button.
   */
  children?: React.ReactNode;
  /**
   * Sets the background color of the button.
   */
  colorScheme?: string;
  /**
   * Specifies the external URL used when the variant is set to "link".
   */
  externalHref?: string;
  /**
   * Indicates whether the button is in a loading state.
   */
  isLoading?: boolean;
  /**
   * Indicates whether the button is in a loading state.
   */
  loaderProps?: LoaderProps;
  /**
   * Specifies the position of the icon within the button.
   */
  loaderPosition?: LoaderPosition;
  /**
   * The icon component rendered within the button.
   */
  icon?: React.ReactNode;
  /**
   * Specifies the position of the icon within the button.
   */
  iconPosition?: IconPosition;
  /**
   * Disables the button if set to true.
   */
  isDisabled?: boolean;
  /**
   * Adjusts the width of the button to take available space.
   */
  isFilled?: boolean;
  /**
   * Adjusts the width of the button based on content size.
   */
  isAuto?: boolean;
  /**
   * Makes the icon container shape rounded if set to true.
   */
  isIconRounded?: boolean;
  /**
   * The event handler called when the button is clicked or pressed.
   */
  onClick?: Function;
  /**
   * Specifies the size of the button's text and padding.
   */
  size?: Size;
  /**
   * Sets a shadow effect applied to the button.
   */
  shadow?: Shadow | Elevation | CSSProperties;
  /**
   * Specifies the shape of the button's corners.
   */
  shape?: Shape;
  /**
   * Descriptive label for accessibility (ARIA) purposes.
   */
  ariaLabel?: string;
  /**
   * Specifies the style variant of the button.
   */
  variant?: Variant;
  effect?: Effects;
  /**
   * Additional properties for the button component.
   */
  [x: string]: any;
}
