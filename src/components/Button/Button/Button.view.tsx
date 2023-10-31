import React, { CSSProperties } from 'react';
import { Element, useTheme } from 'app-studio';
import { Link } from 'src/components';

import { ButtonProps } from './Button.props';
import { ButtonShapes, ButtonSizes, IconSizes } from './Button.style';
import { Variant } from './Button.type';

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
  onPress = () => {},
  ...props
}) => {
  const isActive = !(isDisabled || isLoading);
  const {getColor} = useTheme()

  const defaultNativeProps = { disabled: !isActive };

  const buttonColor = isActive ? colorScheme : 'theme.disabled';

  const ButtonVariants: Record<Variant, CSSProperties> = {
    filled: {
      backgroundColor: buttonColor,
      color: 'color.white',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colorScheme,
      color: buttonColor,
    },
    link: {
      backgroundColor: 'transparent',
      border: 'none',
      color: buttonColor,
      textDecorationLine: 'underline',
    },
    ghost: {
      backgroundColor: 'transparent',
      border: 'none',
      color: buttonColor,
    },
  };

  const buttonSizeStyles = ButtonSizes[size];

  const buttonVariant = ButtonVariants[variant];

  const scaleWidth = {
    width: isAuto ? 'fit-content' : isFilled ? '100%' : buttonSizeStyles.width,
  };

  const changePadding = {
    padding: isIconRounded ? IconSizes[size].padding : ButtonSizes[size].padding,
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && !isLoading && icon}
      {children}
      {icon && iconPosition === 'right' && !isLoading && icon}
    </>
  );

  console.log({buttonColor, r: getColor(buttonColor)})

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
      onPress={props.onClick ?? onPress}
      cursor={isActive ? 'pointer' : 'default'}
      {...defaultNativeProps} // set default native html button properties
      {...buttonSizeStyles} // set default width, paddings and fonts
      {...buttonVariant} // changes default background color, color and border
      {...scaleWidth} //changes the actual fixed width when isAuto or isFilled are true
      {...changePadding} // changes the actual padding when variant equals to circled
      {...shadow}
      {...props}
    >
      {variant === 'link' && externalHref ? (
        <Link href={externalHref} textDecorationColor={colorScheme} colorScheme={colorScheme} isExternal>
          {content}
        </Link>
      ) : (
        content
      )}
    </Element>
  );
};

export default ButtonView;
