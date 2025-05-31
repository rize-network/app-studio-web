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
  generateOffsetPath,
} from './Button.style';
import contrast from 'contrast';

const ButtonView: React.FC<ButtonProps> = ({
  /* behaviour */
  variant = 'filled',
  size = 'md',
  shape = 'rounded',
  iconPosition = 'left',
  loaderPosition = 'left',
  backgroundColor, // primary candidate for main color
  color, // 2nd candidate for main color (NOT text‑color)
  isAuto,
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

  /* variant palette */
  const palette = useMemo(
    () => getButtonVariants(mainTone, tone == 'light'),
    [mainTone, tone]
  );
  const base = palette[variant];

  /* layout helpers */
  const Wrapper = ['left', 'right'].includes(iconPosition)
    ? Horizontal
    : Vertical;
  const sizeStyles = ButtonSizes[size];
  const iconPad = isIconRounded ? IconSizes[size] : {};

  const content = (
    <Wrapper
      gap={8}
      alignItems="center"
      justifyContent="center"
      color={'inherit'}
      _hover={{
        color: 'inherit',
      }}
      {...sizeStyles}
      {...views?.content}
    >
      {isLoading && loaderPosition === 'left' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          color={'inherit'}
          _hover={{
            color: 'inherit',
          }}
          {...views?.loader}
        />
      )}

      {icon && ['left', 'top'].includes(iconPosition) && !isLoading && (
        <View
          color={'inherit'}
          _hover={{
            color: 'inherit',
          }}
          {...views?.icon}
        >
          {icon}
        </View>
      )}

      {children}

      {icon && ['right', 'bottom'].includes(iconPosition) && !isLoading && (
        <View
          color={'inherit'}
          _hover={{
            color: 'inherit',
          }}
          {...views?.icon}
        >
          {icon}
        </View>
      )}

      {isLoading && loaderPosition === 'right' && (
        <Loader
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          color={'inherit'}
          _hover={{
            color: 'inherit',
          }}
          {...views?.loader}
        />
      )}
    </Wrapper>
  );

  // Handle special effect variants
  if (variant === 'borderMoving') {
    const borderWidth = 5;
    const numericWidth =
      typeof sizeStyles.width === 'number' ? sizeStyles.width : 300;
    const numericHeight =
      typeof sizeStyles.height === 'number' ? sizeStyles.height : 64;
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
    const path = generateOffsetPath(
      numericWidth as number,
      numericHeight as number,
      numericBorderRadius as number
    );

    return (
      <View
        width={numericWidth}
        height={numericHeight}
        position="relative"
        backgroundColor="black"
        overflow="hidden"
        borderRadius={ButtonShapes[shape]}
        cursor={isDisabled ? 'default' : 'pointer'}
        onClick={onClick}
        {...views?.container}
        {...props}
      >
        <svg
          width={numericWidth}
          height={numericHeight}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient
              id="circleGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor={borderMovingGradientColors[0]} />
              <stop offset="60%" stopColor={borderMovingGradientColors[1]} />
              <stop offset="100%" stopColor={borderMovingGradientColors[2]} />
            </linearGradient>
            <path id="uniqueId" d={path} fill="none" stroke="transparent" />
          </defs>
          <circle r="30" fill="url(#circleGradient)">
            <animateMotion
              dur={borderMovingDuration + 's'}
              repeatCount="indefinite"
              path={path}
            />
          </circle>
        </svg>

        <View
          position="absolute"
          backgroundColor="black"
          borderRadius={Math.max(0, numericBorderRadius - 1)}
          top={borderWidth}
          bottom={borderWidth}
          left={borderWidth}
          right={borderWidth}
        />

        <View
          width="100%"
          height="100%"
          backgroundColor="rgba(15, 23, 42, 0.2)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize={14}
          style={{ cursor: 'pointer' }}
        >
          {content}
        </View>
      </View>
    );
  }

  if (variant === 'animatedStroke') {
    const resolvedAccentColor = getColor(animatedStrokeAccentColor);
    const resolvedTextColor = getColor(animatedStrokeTextColor);
    const numericWidth =
      typeof sizeStyles.width === 'number' ? sizeStyles.width : 300;
    const numericHeight =
      typeof sizeStyles.height === 'number' ? sizeStyles.height : 60;

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
      <View
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
        {...views?.container}
        {...props}
      >
        <View
          as="svg"
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
            strokeDasharray="120 500"
            strokeDashoffset={-454}
            on={{
              hover: {
                animate: strokeAnimation,
              },
            }}
          />
        </View>

        <View
          fontSize="22px"
          lineHeight="32px"
          letterSpacing="0.3rem"
          position="relative"
          top="-48px"
          textTransform="uppercase"
          pointerEvents="none"
          userSelect="none"
          color={resolvedTextColor}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <Element
      as={variant === 'link' && to ? 'div' : 'button'}
      type={variant === 'link' && to ? undefined : 'button'}
      disabled={Boolean(isDisabled || isLoading)}
      /* sizing */
      {...sizeStyles}
      {...iconPad}
      display="flex"
      alignItems="center"
      justifyContent="center"
      // width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
      /* visuals */
      borderRadius={ButtonShapes[shape]}
      boxShadow={shadow}
      transition="all 0.2s ease"
      cursor={isDisabled ? 'default' : 'pointer'}
      onClick={onClick}
      {...base}
      {...views?.container}
      {...props}
    >
      {to ? (
        <Link
          to={to}
          isExternal={isExternal}
          color={'inherit'}
          textDecoration={'inherit'}
          textDecorationColor={'inherit'} // Link underline color matches text color
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
