/**
 * ButtonView component – minimal and design‑system aligned.
 * - Chooses a **main color** with priority: `backgroundColor` → `color` → `theme.primary`.
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
import contrast from 'contrast';

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
}> = ({
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
          color={'currentColor'}
          {...views?.loader}
        />
      )}

      {icon && ['left', 'top'].includes(iconPosition) && !isLoading && (
        <View color={'currentColor'} {...views?.icon}>
          {icon}
        </View>
      )}

      {children}

      {icon && ['right', 'bottom'].includes(iconPosition) && !isLoading && (
        <View color={'currentColor'} {...views?.icon}>
          {icon}
        </View>
      )}

      {isLoading && loaderPosition === 'right' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          color={'currentColor'}
          {...views?.loader}
        />
      )}
    </Wrapper>
  );
};

// --- Animation Logic moved to StandardButton ---

// --- Variant: Standard Button ---
const StandardButton: React.FC<
  ButtonProps & {
    baseStyles: any;
    sizeStyles: any;
    iconPad: any;
    // Extra props passed from ButtonView
    mainTone?: string;
    tone?: string;
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
  tone,
  borderMovingDuration = 2,
  borderMovingGradientColors = ['#705CFF', '#FF5C97', '#FFC75C'],
  animatedStrokeAccentColor = '#705CFF',
  animatedStrokeTextColor = '#333333',
  getColor = (c: string) => c,
  ...props
}) => {
  // --- Common Helpers ---
  const numericBorderRadius = (() => {
    const shapeValue = ButtonShapes[shape];
    if (typeof shapeValue === 'number') {
      return shapeValue;
    }
    if (typeof shapeValue === 'string') {
      return parseInt(shapeValue, 10) || 0;
    }
    return 0;
  })();

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
      <Element
        as="div" // Container is div, inner can be button if needed, or container handles events
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={ButtonShapes[shape]}
        cursor={isDisabled ? 'default' : 'pointer'}
        onClick={onClick}
        boxShadow={shadow as any}
        padding={borderWidth}
        background={`linear-gradient(90deg, ${borderMovingGradientColors[0]}, ${borderMovingGradientColors[1]}, ${borderMovingGradientColors[2]}, ${borderMovingGradientColors[0]})`}
        backgroundSize="200% 100%"
        animate={borderAnimation}
        width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
        {...views?.container}
        {...props}
      >
        <View
          as={to ? 'div' : 'button'} // Inner element is the semantic button or div
          disabled={Boolean(isDisabled || isLoading)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={Math.max(0, numericBorderRadius - borderWidth)}
          width="100%"
          height="100%"
          /* Merge baseStyles but ensure we override absolute sizing if necessary */
          {...baseStyles}
          {...sizeStyles}
          {...iconPad}
          // Ensure background covers the inner area
          backgroundColor={baseStyles?.backgroundColor || mainTone}
          color={resolvedTextColor}
          borderWidth={0} // Handled by wrapper
          cursor={isDisabled ? 'default' : 'pointer'}
        >
          {linkOrContent}
        </View>
      </Element>
    );
  }

  // --- Animation: Animated Stroke ---
  if (animation === 'animatedStroke') {
    const resolvedAccentColor = getColor(animatedStrokeAccentColor);
    const strokeAnimation = {
      from: {
        strokeWidth: '8px',
        strokeDasharray: '0 500',
        strokeDashoffset: -454,
      },
      to: {
        strokeWidth: '3px',
        strokeDasharray: '760',
        strokeDashoffset: 0,
      },
      duration: '0.9s',
      timingFunction: 'ease-in',
      fillMode: 'forwards',
    };

    // We need numeric dimensions for SVG.
    // This is a limitation: if width/height are auto, SVG might not work well.
    // We use rough defaults or rely on View props if set.
    const numericWidth =
      typeof sizeStyles.width === 'number' ? sizeStyles.width : 300;
    const numericHeight =
      typeof sizeStyles.height === 'number' ? sizeStyles.height : 60;

    return (
      <Element
        as={to ? 'a' : 'div'}
        href={to ? to : undefined}
        onClick={onClick}
        display="inline-block"
        maxWidth="20rem"
        margin="0 auto"
        textAlign="center"
        textDecoration="none"
        position="relative"
        cursor="pointer"
        boxShadow={shadow as any}
        {...views?.container}
        {...props}
      >
        <View
          as="svg"
          display="block"
          height={numericHeight}
          width={numericWidth}
          xmlns="http://www.w3.org/2000/svg"
        >
          <View
            as="rect"
            height={numericHeight}
            width={numericWidth}
            fill="transparent"
            stroke={resolvedAccentColor}
            strokeWidth="8px"
            strokeDasharray="0 500"
            strokeDashoffset={-454}
            on={{
              hover: {
                animate: strokeAnimation,
              },
            }}
          />
        </View>

        <View
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          {...sizeStyles}
          {...baseStyles}
          backgroundColor="transparent" // SVG handles background
          borderWidth={0} // SVG handles border
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
      boxShadow={shadow}
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
// --- Main Component ---
const ButtonView: React.FC<ButtonProps> = ({
  /* behaviour */
  variant = 'filled',
  size = 'md',
  shape = 'rounded',
  iconPosition = 'left',
  loaderPosition = 'left',
  backgroundColor, // primary candidate for main color
  color, // 2nd candidate for main color (NOT text‑color)
  scheme, // New scheme prop
  reversed = false, // New reversed prop
  isAuto = true,
  isFilled,
  isDisabled,
  isLoading,
  isIconRounded,
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
  themeMode: elementMode,
  /* effect props */
  borderMovingDuration = 2,
  borderMovingGradientColors = ['#705CFF', '#FF5C97', '#FFC75C'],
  animatedStrokeAccentColor = '#705CFF',
  animatedStrokeTextColor = '#333333',
  ...props
}) => {
  /* theme helpers */
  const { getColor, themeMode } = useTheme();
  const mode = elementMode ?? themeMode;

  /* MAIN COLOR – determines the entire palette */
  let schemeColor: string | undefined;
  if (scheme === 'primary') schemeColor = 'theme.primary';
  else if (scheme === 'secondary') schemeColor = 'theme.secondary';
  else if (scheme === 'black') schemeColor = 'color.black.900';
  else if (scheme === 'white') schemeColor = 'color.white.100';

  const mainColorKey =
    backgroundColor ?? color ?? schemeColor ?? 'theme.primary';
  const mainTone = getColor(isDisabled ? 'theme.disabled' : mainColorKey, {
    themeMode: mode,
  });
  const tone = contrast(mainTone);

  /* text color with mixBlendMode for maximum visibility */
  let textColor: string;
  if (scheme === 'white' && !color) {
    textColor = '#000000';
  } else {
    textColor = tone === 'light' ? '#000000' : '#FFFFFF';
  }

  /* variant palette */
  const palette = useMemo(
    () =>
      getButtonVariants(mainTone, tone === 'light', mode === 'light', reversed),
    [mainTone, tone, mode, reversed]
  );
  const base = palette[variant];
  const resolvedTextColor = (base?.color as string) ?? textColor;

  // Render content logic safely
  const content = (
    <ButtonContent
      icon={icon}
      isLoading={isLoading}
      iconPosition={iconPosition}
      loaderPosition={loaderPosition}
      size={size}
      resolvedTextColor={resolvedTextColor}
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
      resolvedTextColor={resolvedTextColor}
      content={content}
      size={size}
      mainTone={mainTone}
      tone={tone}
      borderMovingDuration={borderMovingDuration}
      borderMovingGradientColors={borderMovingGradientColors}
      animatedStrokeAccentColor={animatedStrokeAccentColor}
      animatedStrokeTextColor={animatedStrokeTextColor}
      getColor={getColor}
      {...props}
    />
  );
};

export default ButtonView;
