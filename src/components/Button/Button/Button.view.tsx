/**
 * Button View Component
 *
 * Renders a button with various styles and states according to the design guidelines.
 */

import React from 'react';
import { Element, useTheme, Vertical, View } from 'app-studio';
import { Link } from './../../Link/Link';
import { ButtonProps } from './Button.props';
import {
  ButtonShapes,
  ButtonSizes,
  IconSizes,
  getButtonVariants,
} from './Button.style';
// We don't need to import Variant as it's already imported in Button.style
import { Loader } from '../../Loader/Loader';
import { Horizontal } from 'app-studio';

var contrast = require('contrast');

interface Props extends ButtonProps {}

const ButtonView: React.FC<Props> = ({
  icon,
  shadow,
  children,
  ariaLabel,
  to,
  isAuto = false,
  isFilled = false,
  isIconRounded = false,
  isLoading = false,
  isDisabled = false,
  size = 'md',
  variant = 'filled',
  iconPosition = 'left',
  shape = 'rounded',
  onClick = () => {},
  loaderProps = {},
  loaderPosition = 'left',
  effect = 'default',
  isHovered,
  setIsHovered = () => {},
  isExternal = false,
  themeMode: elementMode,
  views,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const handleHover = (over: boolean) => setIsHovered(over);

  const isActive = !(isDisabled || isLoading);
  const defaultNativeProps = { disabled: !isActive };
  const buttonColor = isActive ? 'theme.primary' : 'theme.disabled';
  // We'll handle hover effects through CSS transitions in the style

  // Determine if the button color is light or dark for proper contrast
  const isLight =
    contrast(getColor(buttonColor, elementMode ? elementMode : themeMode)) ==
    'light';

  // Get button variants based on color and light/dark status
  const ButtonVariants = getButtonVariants(buttonColor, isLight);

  // Note: Effects are now handled through CSS transitions in the style definitions
  const buttonSizeStyles = ButtonSizes[size];
  const buttonVariant = ButtonVariants[variant];
  const scaleWidth = {
    width:
      isAuto === true
        ? 'fit-content'
        : isFilled
        ? '100%'
        : buttonSizeStyles.width,
  };
  const changePadding = isIconRounded ? IconSizes[size] : ButtonSizes[size];

  // Use Horizontal or Vertical container based on icon position
  const Container = ['left', 'right'].includes(iconPosition)
    ? Horizontal
    : Vertical;

  // Create the button content with proper spacing and alignment
  const content = (
    <Container
      gap={8} // 8px gap (2x4px grid) for consistent spacing
      alignItems="center"
      justifyContent="center"
      {...views?.container}
    >
      {/* Show loader on the left if loading and position is left */}
      {isLoading && loaderPosition === 'left' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          {...loaderProps}
        />
      )}

      {/* Show icon on the left/top if not loading */}
      {icon && ['left', 'top'].includes(iconPosition) && !isLoading && (
        <View
          display="flex"
          alignItems="center"
          justifyContent="center"
          {...views?.icon}
        >
          {icon}
        </View>
      )}

      {/* Button text/children */}
      {children}

      {/* Show icon on the right/bottom if not loading */}
      {icon && ['right', 'bottom'].includes(iconPosition) && !isLoading && (
        <View
          display="flex"
          alignItems="center"
          justifyContent="center"
          {...views?.icon}
        >
          {icon}
        </View>
      )}

      {/* Show loader on the right if loading and position is right */}
      {isLoading && loaderPosition === 'right' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          {...loaderProps}
        />
      )}
    </Container>
  );

  return (
    <Element
      gap={8}
      as="button"
      type="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-label={ariaLabel}
      backgroundColor="transparent"
      borderRadius={ButtonShapes[shape]}
      onClick={props.onClick ?? onClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      cursor={isActive ? 'pointer' : 'default'}
      // Apply consistent styling according to design guidelines

      // Apply shadow if provided
      boxShadow={shadow ? shadow : undefined}
      // Apply default props and styles
      {...defaultNativeProps}
      // Apply any custom props except height
      {...(({ height, ...rest }) => rest)(props)}
      // Apply size-specific styles to ensure consistent sizing
      {...buttonSizeStyles}
      {...buttonVariant}
      {...scaleWidth}
      // Only apply padding from ButtonSizes if no custom padding is provided
      {...(props.padding ||
      props.paddingHorizontal ||
      props.paddingVertical ||
      props.paddingLeft ||
      props.paddingRight ||
      props.paddingTop ||
      props.paddingBottom
        ? {}
        : changePadding)}
      // Apply container view styles last
      {...views?.container}
    >
      {variant === 'link' && to ? (
        <Link
          to={to}
          textDecorationColor={'theme.primary'}
          textDecorationThickness="1px"
          textUnderlineOffset="2px"
          transition="all 0.2s ease"
          isExternal={isExternal}
          _hover={{
            textDecorationThickness: '2px',
          }}
          {...views?.link}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </Element>
  );
};
export default ButtonView;
