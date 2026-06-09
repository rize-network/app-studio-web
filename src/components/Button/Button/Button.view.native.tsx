/**
 * ButtonView (React Native) – simplified RN-friendly view.
 * - Drops web-only animations (borderMoving / animatedStroke / borderReveal) and
 *   gracefully falls back to the default Standard button.
 * - Uses app-studio's <Element/> (renders a Pressable when onPress is set).
 * - Preserves the public API surface of the web ButtonView.
 */

import React, { useMemo } from 'react';
import { Element, Horizontal, Vertical, View } from 'app-studio';
import { Link } from '../../Link/Link';
import { Loader } from '../../Loader/Loader';
import { ButtonProps } from './Button.props';
import {
  ButtonSizes,
  ButtonShapes,
  IconSizes,
  getButtonVariants,
} from './Button.style';
import { useDesignSystem, deepMerge } from 'src/design-system';
import { Variant } from './Button.type.d';

// --- Helper: Button Content ---
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
    views,
  }) => {
    const Wrapper = ['left', 'right'].includes(iconPosition)
      ? Horizontal
      : Vertical;
    const sizeStyles = ButtonSizes[size];

    return (
      <Wrapper
        gap={8}
        alignItems="center"
        justifyContent="center"
        fontSize={sizeStyles.fontSize}
        fontWeight={sizeStyles.fontWeight}
        lineHeight={sizeStyles.lineHeight}
        letterSpacing={sizeStyles.letterSpacing}
        color={resolvedTextColor}
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

// --- Main Component ---
const ButtonView = React.memo(
  React.forwardRef<any, ButtonProps>(
    (
      {
        variant = 'filled',
        size = 'md',
        shape = 'rounded',
        iconPosition = 'left',
        loaderPosition = 'left',
        backgroundColor,
        color,
        textColor,
        reversed = false,
        isAuto = true,
        isFilled,
        isDisabled,
        isLoading,
        isIconRounded,
        icon,
        children,
        to,
        isExternal,
        shadow,
        onClick,
        views = {},
        config: buttonConfig,
        ...props
      },
      ref
    ) => {
      const baseColorKey = backgroundColor ?? color ?? 'theme-primary';
      const mainColorKey = isDisabled
        ? 'theme-disabled'
        : isLoading
        ? 'theme-loading'
        : baseColorKey;
      const textColorKey = textColor ?? 'color-white';

      const { config } = useDesignSystem();
      const theme = config?.theme;
      const palette = useMemo(() => {
        const basePalette = getButtonVariants(
          mainColorKey,
          textColorKey,
          reversed,
          theme
        );
        if (buttonConfig?.variants) {
          Object.keys(buttonConfig.variants).forEach((v) => {
            if (basePalette[v as Variant]) {
              basePalette[v as Variant] = deepMerge(
                basePalette[v as Variant],
                buttonConfig.variants[v]
              );
            }
          });
        }
        return basePalette;
      }, [mainColorKey, textColorKey, reversed, theme, buttonConfig?.variants]);

      const base = palette[variant];
      const finalContentColor = (base?.color as string) ?? textColorKey;

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

      const sizeStyles = ButtonSizes[size];
      const iconPad = isIconRounded ? IconSizes[size] : {};

      const linkOrContent = to ? (
        <Link
          to={to}
          isExternal={isExternal}
          color={finalContentColor}
          {...views?.link}
        >
          {content}
        </Link>
      ) : (
        content
      );

      return (
        <Element
          ref={ref}
          {...sizeStyles}
          {...iconPad}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          alignSelf={isFilled ? 'stretch' : isAuto ? 'flex-start' : undefined}
          borderRadius={ButtonShapes[shape]}
          opacity={isDisabled ? 0.6 : 1}
          onPress={!isDisabled && !isLoading ? (onClick as any) : undefined}
          {...base}
          {...views?.container}
          {...props}
        >
          {linkOrContent}
        </Element>
      );
    }
  )
);

export default ButtonView;
