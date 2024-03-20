import React, { CSSProperties } from 'react';
import { Element } from 'app-studio';

import { Link } from './../../Link/Link';
import { ButtonProps } from './Button.props';
import { ButtonShapes, ButtonSizes, IconSizes } from './Button.style';
import { Variant } from './Button.type';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

const ButtonView: React.FC<ButtonProps> = ({
  icon,
  shadow,
  children,
  ariaLabel,
  externalHref,
  isAuto = false,
  isFilled = false,
  isIconRounded = false,
  isLoading = false,
  isDisabled = false,
  size = 'md',
  variant = 'filled',
  iconPosition = 'left',
  colorScheme = 'theme.primary',
  shape = 'rounded',
  onClick = () => {},
  loaderProps = {},
  loaderPosition = 'left',
  effect = 'default',
  isHovered,
  ...props
}) => {
  const isActive = !(isDisabled || isLoading);

  const defaultNativeProps = { disabled: !isActive };

  const buttonColor = isActive ? colorScheme : 'theme.disabled';

  const hovering = isHovered && effect === 'hover';
  const reverse = isHovered && effect === 'reverse';

  const ButtonVariants: Record<Variant, CSSProperties> = {
    filled: {
      backgroundColor: reverse ? 'transparent' : buttonColor,
      color: reverse ? buttonColor : 'color.white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'transparent',
    },
    outline: {
      backgroundColor: reverse ? buttonColor : 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : colorScheme,
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
      backgroundColor: reverse ? buttonColor : 'transparent',
      color: reverse ? 'color.white' : buttonColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'transparent',
    },
  };

  const buttonSizeStyles = ButtonSizes[size];

  const buttonVariant = ButtonVariants[variant];

  const scaleWidth = {
    width: isAuto ? 'fit-content' : isFilled ? '100%' : buttonSizeStyles.width,
  };

  const changePadding = {
    padding: isIconRounded
      ? IconSizes[size].padding
      : ButtonSizes[size].padding,
  };

  const content = (
    <Horizontal gap={10}>
      {isLoading && loaderPosition === 'left' && <Loader {...loaderProps} />}
      {icon && iconPosition === 'left' && !isLoading && icon}
      {children}
      {icon && iconPosition === 'right' && !isLoading && icon}
      {isLoading && loaderPosition === 'right' && <Loader {...loaderProps} />}
    </Horizontal>
  );

  return (
    <Element
      gap={8}
      as="button"
      role="button"
      border="none"
      color="color.white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      ariaLabel={ariaLabel}
      backgroundColor={buttonColor}
      borderRadius={ButtonShapes[shape]}
      onClick={props.onClick ?? onClick}
      cursor={isActive ? 'pointer' : 'default'}
      filter={hovering ? 'brightness(0.85)' : 'brightness(1)'}
      transition={hovering && !props.isDisabled ? 'transform 0.3s ease' : ''}
      transform={hovering && !props.isDisabled ? 'translateY(-5px)' : ''}
      {...defaultNativeProps} // set default native html button properties
      {...buttonSizeStyles} // set default width, paddings and fonts
      {...buttonVariant} // changes default background color, color and border
      // {...buttonEffect}
      {...scaleWidth} //changes the actual fixed width when isAuto or isFilled are true
      {...changePadding} // changes the actual padding when variant equals to circled
      {...shadow}
      {...props}
    >
      {variant === 'link' && externalHref ? (
        <Link
          href={externalHref}
          textDecorationColor={colorScheme}
          colorScheme={colorScheme}
          isExternal
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
