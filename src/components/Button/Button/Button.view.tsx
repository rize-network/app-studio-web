/**
 * Button View Component
 *
 * Renders a button with various styles and states according to the design guidelines.
 */

import React from 'react';
import { Element, useTheme, Vertical, View } from 'app-studio';
import { Link } from './../../Link/Link'; // Assuming Link is correctly imported
import { ButtonProps } from './Button.props';
import { ButtonShapes, ButtonSizes, IconSizes } from './Button.style'; // Assuming these are correct
import { Loader } from '../../Loader/Loader'; // Assuming Loader is correctly imported
import { Horizontal } from 'app-studio';

// Using require for contrast as it seems to be a common pattern in your code
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
  effect = 'default', // 'default', 'hover', 'reverse'
  isHovered,
  setIsHovered = () => {},
  isExternal = false,
  themeMode: elementMode, // Allow overriding themeMode for this element
  views,
  color, // Text color prop
  backgroundColor = 'theme.primary', // Background color prop
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const handleHover = (over: boolean) => setIsHovered(over);

  const isActive = !(isDisabled || isLoading);
  const defaultNativeProps = { disabled: !isActive };

  // Determine the base background color key/value, considering disabled state
  const buttonBackgroundColorKey = isActive
    ? backgroundColor
    : 'theme.disabled';

  // --- Provided Color Logic ---
  // Determine the effective theme mode for this button
  const mode = elementMode ?? themeMode; // effective mode

  // Resolve the base background color string
  const bg = getColor(buttonBackgroundColorKey, { themeMode: mode });

  // Resolve the background color string in the opposite theme mode (for reverse effect, though not directly used for ghost/outline text contrast)
  // const bgHover = getColor(buttonBackgroundColorKey, {
  //   themeMode: mode === 'light' ? 'dark' : 'light',
  // }); // bgHover is not strictly needed for the text contrast logic below

  // Check contrast of base background
  const isBgLight = contrast(bg) === mode;

  // Determine contrasting text color key for the base background
  const txtOnBgKey = isBgLight ? 'color.black' : 'color.white';
  // --- End Provided Color Logic ---

  // Determine the default text color key/value if 'color' prop is not provided
  // For filled buttons, default text color should contrast with the background (use txtOnBgKey).
  // For outline/link/ghost, a theme-appropriate text color is usually better (e.g., theme.text or theme.primary).
  let defaultTextColorKey;
  if (variant === 'filled') {
    defaultTextColorKey = txtOnBgKey; // Use the calculated contrasting color key
  } else {
    // For non-filled variants, default to theme's text color or primary color
    defaultTextColorKey = 'theme.primary'; // Or 'theme.primary' depending on design system
  }

  // Determine the actual key/value for the base text color
  // Use the provided 'color' prop if available, otherwise use the calculated default
  const baseTextColorKey = color || defaultTextColorKey;

  // Resolve the actual base text color string
  const resolvedBaseTextColor = getColor(baseTextColorKey, { themeMode: mode });

  // Resolve the contrasting color string for the base background (used for text in outline/ghost reverse)
  const contrastingColorForBg = getColor(txtOnBgKey, { themeMode: mode });

  // Resolve the contrasting color string for the base text color (used for text in ghost reverse)
  const isBaseTextLight = contrast(resolvedBaseTextColor) === 'light';
  const contrastingColorForBaseText = getColor(
    isBaseTextLight ? 'color.black' : 'color.white',
    { themeMode: mode }
  );

  // --- Button Variant Styles Function ---
  // This function calculates the styles based on the current state (base, hover, active)
  const getButtonVariantStyles = ({
    currentVariant,
    currentEffect,
    resolvedBg, // Resolved base background color string (bg)
    resolvedBaseTextColor, // Resolved base text color string
    contrastingColorForBg, // Resolved contrasting color string for resolvedBg
    contrastingColorForBaseText, // Resolved contrasting color string for resolvedBaseTextColor
    resolvedBorderColor, // Resolved border color string (usually resolvedBg)
  }) => {
    // Define the base styles for each variant
    const baseStyles = {
      filled: {
        backgroundColor: resolvedBg,
        color: resolvedBaseTextColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      outline: {
        backgroundColor: 'transparent',
        color: resolvedBaseTextColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: resolvedBorderColor, // Border color is the base background color
      },
      link: {
        backgroundColor: 'transparent',
        color: resolvedBg, // Link color is typically the base background color
        borderWidth: 0,
        borderStyle: 'none',
        borderColor: 'transparent',
        textDecoration: 'underline',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: resolvedBaseTextColor,
        borderWidth: 0,
        borderStyle: 'none',
        borderColor: 'transparent',
      },
    };

    // Define the styles applied on hover/active when effect is 'reverse'
    const reverseHoverActiveStyles = {
      filled: {
        backgroundColor: 'transparent',
        color: resolvedBg, // Text color becomes the original background
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: resolvedBg, // Border color becomes the original background
      },
      outline: {
        backgroundColor: resolvedBg, // Background becomes the original border color
        color: contrastingColorForBg, // *** FIX: Text color contrasts with the NEW background (resolvedBg) ***
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent', // No border when filled
      },
      link: {
        backgroundColor: 'transparent', // Background is original text color - Correct
        color: resolvedBg, // Color stays the same (original background color)
        borderWidth: 0,
        borderStyle: 'none',
        borderColor: 'transparent',
        textDecoration: 'none', // Remove underline on reverse hover
      },
      ghost: {
        backgroundColor: resolvedBg, // Background is original text color - Correct
        color: contrastingColorForBaseText, // Text color contrasts with original text color - Correct
        borderWidth: 0,
        borderStyle: 'none',
        borderColor: 'transparent',
      },
    };

    // General hover/active effects (transform, shadow, opacity, etc.)
    const generalHoverStyles = {
      transform: 'translateY(2px)',
      boxShadow:
        currentVariant === 'link' ? undefined : '0 4px 8px rgba(0, 0, 0, 0.1)', // Consider theme-based shadow color
      // opacity: currentVariant === 'link' ? 0.8 : undefined,
      textDecorationThickness: currentVariant === 'link' ? '2px' : undefined,
    };

    const generalActiveStyles = {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Consider theme-based shadow color
      opacity: currentVariant === 'link' ? 0.8 : undefined,
      textDecorationThickness: currentVariant === 'link' ? '2px' : undefined,
    };

    // Combine base styles with conditional hover/active overrides
    return {
      ...baseStyles[currentVariant], // Start with base styles
      _hover: {
        ...(currentEffect === 'reverse'
          ? reverseHoverActiveStyles[currentVariant]
          : {}), // Apply reverse overrides if needed
        ...(currentEffect === 'hover' ? { filter: 'brightness(0.85)' } : {}), // Apply brightness for 'hover' effect
        ...generalHoverStyles, // Apply general hover effects
      },
      _active: {
        ...(currentEffect === 'reverse'
          ? reverseHoverActiveStyles[currentVariant]
          : {}), // Apply reverse overrides if needed
        ...(currentEffect === 'hover' ? { filter: 'brightness(0.7)' } : {}), // Apply brightness for 'hover' effect
        ...generalActiveStyles, // Apply general active effects
      },
    };
  };

  // Get the calculated variant styles for the current state
  const buttonVariantStyles = getButtonVariantStyles({
    currentVariant: variant,
    currentEffect: effect,
    resolvedBg: bg,
    resolvedBaseTextColor: resolvedBaseTextColor,
    contrastingColorForBg: contrastingColorForBg, // Pass the contrasting color for the base background
    contrastingColorForBaseText: contrastingColorForBaseText, // Pass the contrasting color for the base text
    resolvedBorderColor: bg, // Border color for outline is typically the base background
  });

  // Extract hover and active styles from the calculated styles
  const { _hover, _active, ...baseButtonVariantStyles } = buttonVariantStyles;

  const buttonSizeStyles = ButtonSizes[size];
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
      {...views?.content} // Apply container view overrides
    >
      {/* Show loader on the left if loading and position is left */}
      {isLoading && loaderPosition === 'left' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          color={baseButtonVariantStyles.color} // Use calculated text color for loader
          {...views?.loader}
        />
      )}

      {/* Show icon on the left/top if not loading */}
      {icon && ['left', 'top'].includes(iconPosition) && !isLoading && (
        <View
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={baseButtonVariantStyles.color} // Use calculated text color for icon
          {...views?.icon} // Apply icon view overrides
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
          color={baseButtonVariantStyles.color} // Use calculated text color for icon
          {...views?.icon} // Apply icon view overrides
        >
          {icon}
        </View>
      )}

      {/* Show loader on the right if loading and position is right */}
      {isLoading && loaderPosition === 'right' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          color={baseButtonVariantStyles.color} // Use calculated text color for loader
          {...views?.loader}
        />
      )}
    </Container>
  );

  // Determine if the button should render as a Link or a button Element
  const isLink = variant === 'link' && to;

  return (
    <Element
      gap={8} // This gap on Element might conflict with Container gap, consider removing or adjusting
      as={isLink ? 'div' : 'button'} // Render as div if it's a Link wrapper
      type={isLink ? undefined : 'button'} // Only set type for button element
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-label={ariaLabel}
      // backgroundColor="transparent" // Remove this unless it's intended to override variant styles
      borderRadius={ButtonShapes[shape]}
      onClick={props.onClick ?? onClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      cursor={isActive ? (isLink ? 'pointer' : 'pointer') : 'default'} // Cursor for link vs button
      transition="all 0.2s ease"
      // filter and transform are now handled within _hover/_active styles

      // Apply shadow if provided
      boxShadow={shadow ? shadow : undefined}
      // Apply default props and styles
      {...defaultNativeProps}
      // Apply any custom props except height (height is controlled by size)
      {...(({ height, ...rest }) => rest)(props)}
      // Apply size-specific styles to ensure consistent sizing
      {...buttonSizeStyles}
      // Apply calculated base variant styles (backgroundColor, color, border, etc.)
      {...baseButtonVariantStyles}
      // Apply width scaling
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
      // Apply container view styles last (Note: views?.container is also applied to the inner Container)
      {...props}
      {...views?.container}
      // Applying here might override variant styles, prefer applying to inner Container
    >
      {to ? (
        <Link
          to={to}
          isExternal={isExternal}
          // Link styles should inherit from the button's calculated styles or be defined here
          // Let's apply relevant styles from the button variant to the Link
          color={baseButtonVariantStyles.color}
          textDecoration={baseButtonVariantStyles.textDecoration}
          textDecorationColor={baseButtonVariantStyles.color} // Link underline color matches text color
          textDecorationThickness="1px" // Base thickness
          textUnderlineOffset="2px"
          transition="all 0.2s ease"
          // Apply Link-specific hover/active styles if needed, or let Element's _hover/_active handle it
          _hover={{
            ...(_hover as any), // Merge Element's hover styles
            textDecorationThickness: '2px', // Thicker underline on hover
          }}
          _active={{
            ...(_active as any), // Merge Element's active styles
            textDecorationThickness: '2px', // Thicker underline on active
          }}
          {...views?.link} // Apply link view overrides
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
