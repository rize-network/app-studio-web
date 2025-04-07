import React from 'react';
import { Element, useTheme, Vertical, View, ViewProps } from 'app-studio';
import { Link } from './../../Link/Link';
import { ButtonProps } from './Button.props';
import { ButtonShapes, ButtonSizes, IconSizes } from './Button.style';
import { Variant } from './Button.type';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

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
  containerProps,
  linkProps,
  views,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const handleHover = (over: boolean) => setIsHovered(over);

  const isActive = !(isDisabled || isLoading);
  const defaultNativeProps = { disabled: !isActive };
  const buttonColor = isActive ? 'theme.primary' : 'theme.disabled';
  const hovering = isHovered && effect === 'hover';
  const reverse = isHovered && effect === 'reverse';

  const isLight =
    contrast(getColor(buttonColor, elementMode ? elementMode : themeMode)) ==
    'light';
  const ButtonVariants: Record<Variant, ViewProps> = {
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
    },
    outline: {
      backgroundColor: reverse ? buttonColor : 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'theme.primary',
      color: reverse ? 'white' : buttonColor,
    },
    link: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'transparent',
      color: buttonColor,
      textDecoration: reverse ? 'none' : 'underline',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: reverse ? 'white' : buttonColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'transparent',
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

  const Container = ['left', 'right'].includes(iconPosition)
    ? Horizontal
    : Vertical;
  const content = (
    <Container gap={5} alignItems="center" {...views?.container}>
      {isLoading && loaderPosition === 'left' && <Loader {...loaderProps} />}
      {icon && ['left', 'top'].includes(iconPosition) && !isLoading && (
        <View {...views?.icon}>{icon}</View>
      )}
      {children}
      {icon && ['right', 'bottom'].includes(iconPosition) && !isLoading && (
        <View {...views?.icon}>{icon}</View>
      )}
      {isLoading && loaderPosition === 'right' && <Loader {...loaderProps} />}
    </Container>
  );

  return (
    <Element
      gap={8}
      as="button"
      border="none"
      color="color.white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-label={ariaLabel}
      backgroundColor={buttonColor}
      borderRadius={ButtonShapes[shape]}
      onClick={props.onClick ?? onClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      cursor={isActive ? 'pointer' : 'default'}
      filter={hovering ? 'brightness(0.85)' : 'brightness(1)'}
      {...(hovering && !props.isDisabled
        ? { transition: 'transform 0.3s ease', transform: 'translateY(-5px)' }
        : {})}
      {...defaultNativeProps}
      {...buttonSizeStyles}
      {...buttonVariant}
      {...scaleWidth}
      {...(props.padding ||
      props.paddingHorizontal ||
      props.paddingVertical ||
      props.paddingLeft ||
      props.paddingRight ||
      props.paddingTop ||
      props.paddingBottom
        ? {}
        : changePadding)}
      {...shadow}
      {...props}
      {...views?.container}
    >
      {variant === 'link' && to ? (
        <Link
          to={to}
          textDecorationColor={'theme.primary'}
          isExternal={isExternal}
          {...linkProps}
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
