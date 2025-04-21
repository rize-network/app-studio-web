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
  color,
  backgroundColor = 'theme.primary',
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const handleHover = (over: boolean) => setIsHovered(over);

  const isActive = !(isDisabled || isLoading);
  const defaultNativeProps = { disabled: !isActive };
  const buttonBackgroundColor = isActive ? backgroundColor : 'theme.disabled';
  const [hovered, setHovered] = React.useState(false);
  const reverse = effect === 'reverse';

  // Determine if the button color is light or dark for proper contrast
  const mode = elementMode ?? themeMode; // effective mode
  const bg = getColor(buttonBackgroundColor, { themeMode: mode });
  const bgHover = getColor(buttonBackgroundColor, {
    themeMode: mode == 'light' ? 'dark' : 'light',
  });
  const isLight = contrast(bg) == 'light';
  const isLightHover = contrast(bgHover) == 'light';
  const txtOnBg = isLight ? 'color.black' : 'color.white';
  const txtOnHover = isLightHover ? 'color.black' : 'color.white';
  const reverseTxtOnBg = isLight ? 'color.white' : 'color.black';
  const reverseTxtOnHover = isLightHover ? 'color.white' : 'color.black';
  const borderClr = getColor(buttonBackgroundColor, { themeMode: mode });

  const ButtonVariants: Record<Variant, any> = {
    filled: {
      backgroundColor: reverse ? 'transparent' : bg,
      color: reverse ? reverseTxtOnBg : txtOnBg,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? bg : 'transparent',
      _hover: {
        backgroundColor: reverse ? bgHover : 'transparent',
        color: reverse ? txtOnHover : reverseTxtOnHover,
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    },

    outline: {
      backgroundColor: reverse ? bg : 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? bg : borderClr,
      color: reverse ? txtOnBg : reverseTxtOnBg,
      _hover: {
        color: reverse ? reverseTxtOnHover : txtOnHover,
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      },
    },

    link: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      color: reverse ? reverseTxtOnBg : txtOnBg,
      textDecoration: reverse ? 'none' : 'underline',
      _hover: {
        transform: 'translateY(-1px)',
        textDecorationThickness: '2px',
      },
    },

    ghost: {
      backgroundColor: reverse ? bg : 'transparent',
      color: reverse ? txtOnBg : reverseTxtOnBg,
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      _hover: {
        transform: 'translateY(-1px)',
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

  // Extract hover and active styles from buttonVariant
  const { _hover, _active, ...baseButtonVariant } = buttonVariant;

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
          {...baseButtonVariant}
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
      filter={
        isHovered
          ? effect === 'hover'
            ? 'brightness(0.85)'
            : 'brightness(1)'
          : undefined
      }
      transition="all 0.2s ease"
      transform={
        isHovered
          ? effect === 'hover' && !isDisabled
            ? 'translateY(-5px)'
            : ''
          : undefined
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
      {...scaleWidth}
      {...baseButtonVariant}
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
