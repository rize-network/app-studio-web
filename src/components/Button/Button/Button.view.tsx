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
      width={isAuto ? 'fit-content' : isFilled ? '100%' : undefined}
      /* visuals */
      borderRadius={ButtonShapes[shape]}
      backgroundColor={base.backgroundColor}
      color={base.color}
      borderWidth={base.borderWidth}
      borderStyle={base.borderStyle}
      borderColor={base.borderColor}
      _hover={base._hover}
      _active={base._active}
      boxShadow={shadow}
      transition="all 0.2s ease"
      cursor={isDisabled ? 'default' : 'pointer'}
      onClick={onClick}
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
