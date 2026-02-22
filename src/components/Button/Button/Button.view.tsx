/**
 * ButtonView component – minimal and design‑system aligned.
 * - Chooses a **main color** with priority: `backgroundColor` → `color` → `theme-primary`.
 * - Uses `getButtonVariants` to derive base/hover/active styles per variant.
 */

import React, { useMemo } from 'react';
import { Element, Horizontal, Vertical, View, useTheme } from 'app-studio';
import { Link } from '../../Link/Link';
import { Loader } from '../../Loader/Loader';
import { ButtonProps } from './Button.props';
import {
  ButtonSizes,
  ButtonShapes,
  IconSizes,
  getButtonVariants,
} from './Button.style';

// --- Helper: Button Content ---
// Renders the inner content: Loader, Icon, and Children.
const ButtonContent: React.FC<{
  children: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  iconPosition?: string;
  loaderPosition?: string;
  size?: string;
  resolvedTextColor: string;
  isIconRounded?: boolean;
  views?: any;
}> = React.memo(
  ({
    children,
    icon,
    isLoading,
    iconPosition = 'left',
    loaderPosition = 'left',
    size = 'md',
    resolvedTextColor,
    isIconRounded,
    views,
  }) => {
    const Wrapper = ['left', 'right'].includes(iconPosition)
      ? Horizontal
      : Vertical;
    const sizeStyles = ButtonSizes[size];
    const iconPad = isIconRounded ? IconSizes[size] : {};

    return (
      <Wrapper
        gap={8}
        alignItems="center"
        justifyContent="center"
        {...sizeStyles}
        {...iconPad} // Apply icon padding if needed
        {...views?.content}
      >
        {isLoading && loaderPosition === 'left' && (
          <Loader
            size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
            color={resolvedTextColor}
            {...views?.loader}
          />
        )}

        {icon && ['left', 'top'].includes(iconPosition) && !isLoading && (
          <View color={resolvedTextColor} {...views?.icon}>
            {icon}
          </View>
        )}

        {children}

        {icon && ['right', 'bottom'].includes(iconPosition) && !isLoading && (
          <View color={resolvedTextColor} {...views?.icon}>
            {icon}
          </View>
        )}

        {isLoading && loaderPosition === 'right' && (
          <Loader
            size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
            color={resolvedTextColor}
            {...views?.loader}
          />
        )}
      </Wrapper>
    );
  }
);

// --- Animation Logic moved to StandardButton ---

// --- Variant: Standard Button ---
// --- Helpers ---

// Helper to calculate numeric border radius
const getNumericBorderRadius = (shape: string): number => {
  const shapeValue = ButtonShapes[shape as keyof typeof ButtonShapes];
  if (typeof shapeValue === 'number') return shapeValue;
  if (typeof shapeValue === 'string') return parseInt(shapeValue, 10) || 0;
  return 0;
};

// Common Inner Button Surface
const InnerButton: React.FC<{
  asComponent: any;
  isDisabled?: boolean;
  isLoading?: boolean;
  isWrapped?: boolean;
  borderRadius?: any;
  width?: any;
  height?: any;
  baseStyles?: any;
  sizeStyles?: any;
  iconPad?: any;
  mainTone?: string;
  resolvedTextColor?: any;
  children?: React.ReactNode;
  borderWidth?: number;
  [x: string]: any;
}> = ({
  asComponent,
  isDisabled,
  isLoading,
  isWrapped = false,
  borderRadius,
  width,
  height,
  baseStyles,
  sizeStyles,
  iconPad,
  mainTone,
  resolvedTextColor,
  children,
  borderWidth = 0,
  ...props
}) => {
  return (
    <Element
      as={asComponent}
      disabled={Boolean(isDisabled || isLoading)}
      display={isWrapped ? 'flex' : 'inline-flex'}
      alignItems="center"
      justifyContent="center"
      borderRadius={borderRadius}
      width={width}
      height={height}
      {...baseStyles}
      {...sizeStyles}
      {...iconPad}
      // Ensure background is solid for wrapped buttons if baseStyles doesn't provide it
      backgroundColor={
        baseStyles?.backgroundColor || (isWrapped ? mainTone : undefined)
      }
      color={resolvedTextColor}
      borderWidth={isWrapped ? 0 : undefined}
      cursor={isDisabled ? 'default' : 'pointer'}
      {...props}
    >
      {children}
    </Element>
  );
};

// Common Header for Border Animations
const BorderWrapper: React.FC<{
  shape: string;
  isDisabled?: boolean;
  onClick?: any;
  shadow?: any;
  borderWidth: number;
  isAuto?: boolean;
  isFilled?: boolean;
  views?: any;
  children: React.ReactNode;
  [x: string]: any;
}> = ({
  shape,
  isDisabled,
  onClick,
  shadow,
  borderWidth,
  isAuto,
  isFilled,
  views,
  children,
  ...props
}) => (
  <Element
    as="div"
    position="relative"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    borderRadius={ButtonShapes[shape as keyof typeof ButtonShapes]}
    cursor={isDisabled ? 'default' : 'pointer'}
    onClick={onClick}
    boxShadow={shadow}
    padding={borderWidth}
    width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
    {...views?.container}
    {...props}
  >
    {children}
  </Element>
);

// --- Variant: Standard Button ---
const StandardButton: React.FC<
  ButtonProps & {
    baseStyles: any;
    sizeStyles: any;
    iconPad: any;
    // Extra props passed from ButtonView
    mainTone?: string;
    borderMovingDuration?: number;
    borderMovingGradientColors?: string[];
    animatedStrokeAccentColor?: string;
    animatedStrokeTextColor?: string;
    getColor?: (color: string) => string;
  }
> = ({
  variant,
  animation,
  to,
  isDisabled,
  isLoading,
  isAuto,
  isFilled,
  isExternal,
  shape = 'rounded',
  shadow,
  onClick,
  views,
  baseStyles,
  sizeStyles,
  iconPad,
  resolvedTextColor,
  content,
  size,
  mainTone,
  borderMovingDuration = 2,
  borderMovingGradientColors = ['#705CFF', '#FF5C97', '#FFC75C'],
  animatedStrokeAccentColor = '#705CFF',
  animatedStrokeTextColor = '#333333',
  getColor = (c: string) => c,
  ...props
}) => {
  // --- Common Helpers ---
  const numericBorderRadius = getNumericBorderRadius(shape);

  const linkOrContent = to ? (
    <Link
      to={to}
      isExternal={isExternal}
      color="currentColor"
      textDecoration="inherit"
      _hover={{ color: 'currentColor' }}
      {...views?.link}
    >
      {content}
    </Link>
  ) : (
    content
  );

  const innerProps = {
    isDisabled,
    isLoading,
    baseStyles,
    sizeStyles,
    iconPad,
    resolvedTextColor,
    mainTone,
    children: linkOrContent,
  };

  // --- Animation: Border Moving ---
  if (animation === 'borderMoving' && borderMovingGradientColors) {
    const borderWidth = 3;
    const borderAnimation = {
      from: { backgroundPosition: '0% 50%' },
      to: { backgroundPosition: '200% 50%' },
      duration: `${borderMovingDuration}s`,
      timingFunction: 'linear',
      iterationCount: 'infinite',
    };

    return (
      <BorderWrapper
        shape={shape}
        isDisabled={isDisabled}
        onClick={onClick}
        shadow={shadow}
        borderWidth={borderWidth}
        isAuto={isAuto}
        isFilled={isFilled}
        views={views}
        background={`linear-gradient(90deg, ${borderMovingGradientColors[0]}, ${borderMovingGradientColors[1]}, ${borderMovingGradientColors[2]}, ${borderMovingGradientColors[0]})`}
        backgroundSize="200% 100%"
        animate={borderAnimation}
        {...props}
      >
        <InnerButton
          asComponent={to ? 'div' : 'button'}
          isWrapped={true}
          borderRadius={Math.max(0, numericBorderRadius - borderWidth)}
          width="100%"
          height="100%"
          {...innerProps}
        />
      </BorderWrapper>
    );
  }

  // --- Animation: Animated Stroke ---
  if (animation === 'animatedStroke') {
    const resolvedAccentColor = getColor(animatedStrokeAccentColor);
    const resolvedStrokeTextColor = getColor(animatedStrokeTextColor);
    const strokePathLength = 1000;
    const strokeAnimation = {
      from: {
        strokeWidth: '8px',
        strokeDasharray: `0 ${strokePathLength}`,
        strokeDashoffset: -Math.round(strokePathLength * 0.63),
      },
      to: {
        strokeWidth: '3px',
        strokeDasharray: `${strokePathLength}`,
        strokeDashoffset: 0,
      },
      duration: '0.9s',
      timingFunction: 'ease-in',
      fillMode: 'forwards',
    };

    const mergedClassName = [
      'group',
      (views?.container as any)?.className,
      (props as any)?.className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Element
        as={to ? 'div' : 'button'}
        type={to ? undefined : 'button'}
        disabled={Boolean(!to && (isDisabled || isLoading))}
        onClick={onClick}
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
        borderRadius={ButtonShapes[shape as keyof typeof ButtonShapes]}
        boxShadow={shadow as any}
        transition="all 0.2s ease"
        cursor={isDisabled ? 'default' : 'pointer'}
        color={resolvedStrokeTextColor}
        backgroundColor="transparent"
        borderWidth={0}
        {...views?.container}
        {...props}
        className={mergedClassName}
      >
        <View
          as="svg"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          pointerEvents="none"
          zIndex={1}
          aria-hidden="true"
        >
          <View
            as="rect"
            x="0"
            y="0"
            height="100%"
            width="100%"
            rx={numericBorderRadius}
            ry={numericBorderRadius}
            fill="transparent"
            stroke={resolvedAccentColor}
            strokeWidth="8px"
            strokeDasharray={`0 ${strokePathLength}`}
            strokeDashoffset={-Math.round(strokePathLength * 0.63)}
            pathLength={strokePathLength}
            on={{
              groupHover: {
                animate: strokeAnimation,
              },
            }}
          />
        </View>

        <View position="relative" zIndex={0}>
          {linkOrContent}
        </View>
      </Element>
    );
  }

  // --- Animation: Border Reveal ---
  if (animation === 'borderReveal') {
    const borderWidth = 3;
    // Use the first color from gradient colors or fall back to mainTone
    const activeColor =
      borderMovingGradientColors?.[0] || mainTone || '#000000';

    // Sides duration
    // The default duration (2s) is too slow for a hover interaction.
    // We scale it by 0.25 to make it responsive (0.5s total).
    const effectiveDuration = borderMovingDuration * 0.75;
    const sideDuration = effectiveDuration / 4;

    // Gradients for each side (color 50%, transparent 50%)
    const topGrad = `linear-gradient(90deg, ${activeColor} 50%, transparent 50%)`;
    const rightGrad = `linear-gradient(180deg, ${activeColor} 50%, transparent 50%)`;
    const bottomGrad = `linear-gradient(270deg, ${activeColor} 50%, transparent 50%)`;
    const leftGrad = `linear-gradient(0deg, ${activeColor} 50%, transparent 50%)`;

    // Coordinates:
    // Top (L->R): 100% 0 -> 0 0
    // Right (T->B): 100% 100% -> 100% 0
    // Bottom (R->L): 0 100% -> 100% 100%
    // Left (B->T): 0 0 -> 0 100%
    const bgPosStart = `100% 0, 100% 100%, 0 100%, 0 0`;
    const bgPosEnd = `0 0, 100% 0, 100% 100%, 0 100%`;

    // Delays:
    // Enter (Forward): Top(0), Right(1), Bottom(2), Left(3)
    const delayEnter = `0s, ${sideDuration}s, ${sideDuration * 2}s, ${
      sideDuration * 2
    }s`;
    // Exit (Reverse): Top(3), Right(2), Bottom(1), Left(0)
    const delayExit = `${sideDuration * 2}s, ${
      sideDuration * 2
    }s, ${sideDuration}s, 0s`;

    // Use slightly larger gradient size to overlap with button content (avoid gaps)
    const gradientSize = borderWidth + 1;

    return (
      <Element
        as="div"
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={ButtonShapes[shape]}
        cursor={isDisabled ? 'default' : 'pointer'}
        onClick={onClick}
        boxShadow={shadow as any}
        padding={borderWidth}
        background={`
          ${topGrad} no-repeat,
          ${rightGrad} no-repeat,
          ${bottomGrad} no-repeat,
          ${leftGrad} no-repeat
        `}
        backgroundSize={`200% ${gradientSize}px, ${gradientSize}px 200%, 200% ${gradientSize}px, ${gradientSize}px 200%`}
        // Default State (Hidden)
        backgroundPosition={bgPosStart}
        transitionProperty="background-position"
        transitionDuration={`${sideDuration}s`}
        transitionTimingFunction="linear"
        transitionDelay={delayExit}
        // Hover State (Visible)
        _hover={{
          backgroundPosition: bgPosEnd,
          transitionDelay: delayEnter,
        }}
        width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
        {...views?.container}
        {...props}
      >
        <View
          as={to ? 'div' : 'button'}
          disabled={Boolean(isDisabled || isLoading)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={Math.max(0, numericBorderRadius - borderWidth)}
          width="100%"
          height="100%"
          {...baseStyles}
          {...sizeStyles}
          {...iconPad}
          backgroundColor={baseStyles?.backgroundColor || mainTone}
          color={resolvedTextColor}
          borderWidth={0}
          cursor={isDisabled ? 'default' : 'pointer'}
        >
          {linkOrContent}
        </View>
      </Element>
    );
  }

  // --- Default: Standard Button ---
  return (
    <Element
      as={variant === 'link' && to ? 'div' : 'button'}
      type={variant === 'link' && to ? undefined : 'button'}
      disabled={Boolean(isDisabled || isLoading)}
      /* sizing */
      {...sizeStyles}
      {...iconPad} // Apply icon padding if needed
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
      /* visuals */
      borderRadius={ButtonShapes[shape]}
      boxShadow={shadow as any}
      transition="all 0.2s ease"
      cursor={isDisabled ? 'default' : 'pointer'}
      onClick={onClick}
      {...baseStyles}
      {...views?.container}
      {...props}
    >
      {linkOrContent}
    </Element>
  );
};

// --- Main Component ---
const ButtonView: React.FC<ButtonProps> = React.memo(
  ({
    /* behaviour */
    variant = 'filled',
    size = 'md',
    shape = 'rounded',
    iconPosition = 'left',
    loaderPosition = 'left',
    backgroundColor, // Primary override for main color
    color, // Main button color (theme tokens or color palette)
    textColor, // Explicit text color
    reversed = false, // Reverse colors for dark backgrounds
    isAuto = true,
    isFilled,
    isDisabled,
    isLoading,
    isIconRounded,
    isHovered,
    /* content */
    icon,
    children,
    /* nav */
    to,
    isExternal,
    /* misc */
    shadow,
    onClick,
    views = {},
    /* effect props */
    borderMovingDuration = 2,
    borderMovingGradientColors = ['#705CFF', '#FF5C97', '#FFC75C'],
    animatedStrokeAccentColor = '#705CFF',
    animatedStrokeTextColor = '#333333',
    ...props
  }) => {
    /* theme helpers */
    const { getColorHex } = useTheme();

    /* MAIN COLOR – determines the entire palette */
    // Priority: explicit backgroundColor/color prop -> theme-button.background -> theme-primary
    const mainColorKey = backgroundColor ?? color ?? 'theme-button-background';

    // Decide which theme token to resolve based on state
    const stateColorKey = isDisabled
      ? 'theme-disabled'
      : isLoading
      ? 'theme-loading'
      : mainColorKey;

    // Resolve to actual hex color-
    // If 'theme-button-background' isn't defined, it falls back to 'theme-primary'
    let mainTone = getColorHex(stateColorKey);
    if (
      mainTone === 'theme-button-background' ||
      mainTone === 'theme-loading'
    ) {
      mainTone = getColorHex(isLoading ? 'color-dark-500' : 'theme-primary');
    }

    /* text color - explicitly provided or default to white */
    // Priority: explicit textColor prop -> theme-button.text -> color-white
    let resolvedTextColorKey = textColor ?? 'theme-button-text';
    let resolvedTextColor = getColorHex(resolvedTextColorKey);

    if (resolvedTextColor === 'theme-button-text') {
      resolvedTextColor = getColorHex('color-white');
    }

    /* variant palette */
    const palette = useMemo(
      () => getButtonVariants(mainTone, resolvedTextColor, reversed),
      [mainTone, resolvedTextColor, reversed]
    );
    const base = palette[variant];
    const finalContentColor = (base?.color as string) ?? resolvedTextColor;

    // Render content logic safely
    const content = (
      <ButtonContent
        icon={icon}
        isLoading={isLoading}
        iconPosition={iconPosition}
        loaderPosition={loaderPosition}
        size={size}
        resolvedTextColor={finalContentColor}
        isIconRounded={isIconRounded}
        views={views}
      >
        {children}
      </ButtonContent>
    );

    // Standard variants (filled, outline, ghost, link)
    const sizeStyles = ButtonSizes[size];
    const iconPad = isIconRounded ? IconSizes[size] : {};

    return (
      <StandardButton
        variant={variant}
        animation={props.animation}
        to={to}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isAuto={isAuto}
        isFilled={isFilled}
        isExternal={isExternal}
        shape={shape}
        shadow={shadow}
        onClick={onClick}
        views={views}
        baseStyles={base}
        sizeStyles={sizeStyles}
        iconPad={iconPad}
        resolvedTextColor={finalContentColor}
        content={content}
        size={size}
        mainTone={mainTone}
        borderMovingDuration={borderMovingDuration}
        borderMovingGradientColors={borderMovingGradientColors}
        animatedStrokeAccentColor={animatedStrokeAccentColor}
        animatedStrokeTextColor={animatedStrokeTextColor}
        getColor={getColorHex}
        {...props}
      />
    );
  }
);

export default ButtonView;
