/**
 * Button View Component
 *
 * Renders a button with various styles and states according to the design guidelines.
 */

import React from 'react';
import { Element, useTheme, Vertical, View } from 'app-studio';
import { Link } from './../../Link/Link';
import { ButtonProps } from './Button.props';
import { ButtonShapes, ButtonSizes, IconSizes } from './Button.style';
import { Variant } from './Button.type';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from 'app-studio';

var contrast = require('contrast');

const ButtonView: React.FC<ButtonProps> = ({
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
  backgroundColor = 'theme.primary',
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const handleHover = (over: boolean) => setIsHovered(over);

  const isActive = !(isDisabled || isLoading);
  const defaultNativeProps = { disabled: !isActive };
  const buttonColor = isActive ? backgroundColor : 'theme.disabled';
  const hovering = isHovered && effect === 'hover';
  const reverse = isHovered && effect === 'reverse';

  // Determine if the button color is light or dark for proper contrast
  const buttonMode = elementMode ? elementMode : themeMode;
  const reverseMode = reverse && buttonMode == 'light' ? 'dark' : `light`; // Slightly darker

  const isLight =
    contrast(getColor(buttonColor, { themeMode: buttonMode })) == 'light';

  // Define button variants with effect support
  const ButtonVariants: Record<Variant, any> = {
    filled: {
      backgroundColor: reverse ? 'transparent' : buttonColor,
      color: reverse
        ? isLight
          ? 'white'
          : buttonColor
        : isLight
        ? buttonColor
        : 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'transparent',
      _hover: {
        backgroundColor: reverse
          ? getColor(buttonColor, { themeMode: reverseMode })
          : buttonColor,
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px rgba(60, 46, 46, 0.1)',
      },
      _active: {
        themeMode: reverse && buttonMode == 'light' ? 'light' : `dark`, // Slightly darker
        transform: 'translateY(0)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
    outline: {
      backgroundColor: reverse ? buttonColor : 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : backgroundColor,
      color: reverse ? 'white' : buttonColor,
      _hover: {
        themeMode: reverse ? reverseMode : buttonMode,
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      },
      _active: {
        themeMode: reverse ? reverseMode : buttonMode,
        transform: 'translateY(0)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
    link: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      color: buttonColor,
      textDecoration: reverse ? 'none' : 'underline',
      _hover: {
        opacity: 0.8,
        textDecorationThickness: '2px',
      },
      _active: {
        opacity: 0.8,
        textDecorationThickness: '2px',
      },
    },
    ghost: {
      backgroundColor: reverse ? buttonColor : 'transparent',
      color: reverse ? 'white' : buttonColor,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      _hover: {
        themeMode: reverse ? reverseMode : buttonMode,
        transform: 'translateY(-1px)',
      },
      _active: {
        themeMode: reverse ? reverseMode : buttonMode,
        transform: 'translateY(0)',
      },
    },
  };

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

  // Extract hover and active styles from buttonVariant
  const { _hover, _active, ...baseButtonVariant } = buttonVariant || {};

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
      filter={
        hovering && effect === 'hover' ? 'brightness(0.85)' : 'brightness(1)'
      }
      transition="all 0.2s ease"
      transform={
        hovering && effect === 'hover' && !isDisabled ? 'translateY(-5px)' : ''
      }
      // Apply consistent styling according to design guidelines

      // Apply shadow if provided
      boxShadow={shadow ? shadow : undefined}
      // Apply default props and styles
      {...defaultNativeProps}
      // Apply any custom props except height
      {...(({ height, ...rest }) => rest)(props)}
      // Apply size-specific styles to ensure consistent sizing
      {...buttonSizeStyles}
      {...baseButtonVariant}
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
      // Apply hover and active styles
      _hover={_hover}
      _active={_active}
      // Apply container view styles last
      {...views?.container}
    >
      {variant === 'link' && to ? (
        <Link
          to={to}
          textDecorationColor={backgroundColor}
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
