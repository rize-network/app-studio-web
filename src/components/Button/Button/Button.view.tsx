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

// --- Variant: Border Moving ---
const BorderMovingButton: React.FC<
  ButtonProps & {
    mainTone: string;
    tone: string;
    borderMovingGradientColors: string[];
    borderMovingDuration: number;
    content: React.ReactNode;
  }
> = ({
  shape = 'rounded',
  size = 'md',
  isDisabled,
  onClick,
  views,
  mainTone,
  tone,
  borderMovingGradientColors,
  borderMovingDuration,
  content,
  shadow,
  ...props
}) => {
  const sizeStyles = ButtonSizes[size];
  const borderWidth = 3;
  const numericWidth =
    typeof sizeStyles.width === 'number' ? (sizeStyles.width as number) : 300;
  const numericHeight =
    typeof sizeStyles.height === 'number' ? (sizeStyles.height as number) : 64;

  const numericBorderRadius = (() => {
    const shapeValue = ButtonShapes[shape];
    if (typeof shapeValue === 'number') {
      return shapeValue;
    }
    if (typeof shapeValue === 'string') {
      return parseInt(shapeValue, 10) || 50;
    }
    return 50;
  })();

  const containerBg = mainTone;
  // Use high contrast text color for this variant
  const borderMovingTextColor = tone === 'light' ? '#000000' : '#FFFFFF';

  // Create gradient string for border animation
  const gradientColors = borderMovingGradientColors.join(', ');

  // Animation sequence for the moving border effect
  const borderAnimation = {
    from: {
      backgroundPosition: '0% 50%',
    },
    to: {
      backgroundPosition: '200% 50%',
    },
    duration: `${borderMovingDuration}s`,
    timingFunction: 'linear',
    iterationCount: 'infinite',
  };

  return (
    <Element
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={ButtonShapes[shape]}
      cursor={isDisabled ? 'default' : 'pointer'}
      onClick={onClick}
      boxShadow={shadow}
      padding={borderWidth}
      background={`linear-gradient(90deg, ${borderMovingGradientColors[0]}, ${borderMovingGradientColors[1]}, ${borderMovingGradientColors[2]}, ${borderMovingGradientColors[0]})`}
      backgroundSize="200% 100%"
      animate={borderAnimation}
      {...views?.container}
      {...props}
    >
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={containerBg}
        borderRadius={Math.max(0, numericBorderRadius - borderWidth)}
        width="100%"
        height="100%"
        minWidth={numericWidth - borderWidth * 2}
        minHeight={numericHeight - borderWidth * 2}
        color={borderMovingTextColor}
        fontSize={14}
        cursor="pointer"
      >
        {content}
      </View>
    </Element>
  );
};

// --- Variant: Animated Stroke ---
const AnimatedStrokeButton: React.FC<
  ButtonProps & {
    accentColor: string;
    textColor: string;
    getColor: (color: string) => string;
  }
> = ({
  to,
  onClick,
  views,
  children,
  size = 'md',
  accentColor,
  textColor,
  getColor,
  shadow,
  ...props
}) => {
  const resolvedAccentColor = getColor(accentColor);
  const resolvedTextColor = getColor(textColor);
  const sizeStyles = ButtonSizes[size];
  const numericWidth =
    typeof sizeStyles.width === 'number' ? (sizeStyles.width as number) : 300;
  const numericHeight =
    typeof sizeStyles.height === 'number' ? (sizeStyles.height as number) : 60;

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
      boxShadow={shadow}
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
        textAlign="center"
        pointerEvents="none"
        userSelect="none"
        color={resolvedTextColor}
        {...sizeStyles}
      >
        {children}
      </View>
    </Element>
  );
};

// --- Variant: Standard Button ---
const StandardButton: React.FC<
  ButtonProps & {
    baseStyles: any;
    sizeStyles: any;
    iconPad: any;
    resolvedTextColor: string;
    content: React.ReactNode;
  }
> = ({
  variant,
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
  size, // Destructure size to avoid passing it to Element
  ...props
}) => {
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
      {to ? (
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
      )}
    </Element>
  );
};

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
  const mainColorKey = backgroundColor ?? color ?? 'theme.primary';
  const mainTone = getColor(isDisabled ? 'theme.disabled' : mainColorKey, {
    themeMode: mode,
  });
  const tone = contrast(mainTone);

  /* text color with mixBlendMode for maximum visibility */
  const textColor = tone === 'light' ? '#000000' : '#FFFFFF';

  /* variant palette */
  const palette = useMemo(
    () => getButtonVariants(mainTone, tone === 'light', mode === 'light'),
    [mainTone, tone, mode]
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

  // Dispatch to the correct variant component

  if (variant === 'borderMoving') {
    return (
      <BorderMovingButton
        variant={variant}
        shape={shape}
        size={size}
        isDisabled={isDisabled}
        onClick={onClick}
        views={views}
        mainTone={mainTone}
        tone={tone}
        borderMovingGradientColors={borderMovingGradientColors}
        borderMovingDuration={borderMovingDuration}
        content={content}
        {...props}
      />
    );
  }

  if (variant === 'animatedStroke') {
    return (
      <AnimatedStrokeButton
        variant={variant}
        to={to}
        onClick={onClick}
        views={views}
        size={size}
        accentColor={animatedStrokeAccentColor}
        textColor={animatedStrokeTextColor}
        getColor={getColor}
        {...props}
      >
        {children}
      </AnimatedStrokeButton>
    );
  }

  // Standard variants (filled, outline, ghost, link)
  const sizeStyles = ButtonSizes[size];
  const iconPad = isIconRounded ? IconSizes[size] : {};

  return (
    <StandardButton
      variant={variant}
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
      {...props}
    />
  );
};

export default ButtonView;
