import React, { CSSProperties } from 'react';
import { Element, useTheme } from 'app-studio';
import { Link } from './../../Link/Link';
import { ButtonProps } from './Button.props';
import { ButtonShapes, ButtonSizes, IconSizes } from './Button.style';
import { Variant } from './Button.type';
import { Loader } from '../../Loader/Loader';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

var contrast = require('contrast');

const ButtonView: React.FC<ButtonProps> = ({
  icon,
  shadow,
  children,
  // Defines the functional component ButtonView with its expected props detailed in ButtonProps.
  ariaLabel,
  // Initializes default values for the ButtonProps object; useful for defining states like isAuto, isFilled, etc.
  externalHref,
  isAuto = false,
  // Determines if button should be active based on isDisabled and isLoading properties.
  isFilled = false,
  // Prepares default properties for the native button element based on isActive state.
  isIconRounded = false,
  // Sets button color; defaults to the theme's disabled color if button is not active.
  isLoading = false,
  // Determines if the hover effect shall be applied based on isHovered and effect property.
  isDisabled = false,
  // Determines if the reverse style shall be applied based on isHovered and effect property.
  size = 'md',
  variant = 'filled',
  iconPosition = 'left',
  // Defines CSS properties for 'filled' variant of the button with conditional styles based on reverse state.
  colorScheme = 'theme.primary',
  shape = 'rounded',
  onClick = () => {},
  loaderProps = {},
  loaderPosition = 'left',
  effect = 'default',
  isHovered,
  ...props
  // Defines CSS properties for 'outline' variant of the button with conditional styles based on reverse state.
}) => {
  const { getColor } = useTheme();

  const isActive = !(isDisabled || isLoading);
  const defaultNativeProps = { disabled: !isActive };
  const buttonColor = isActive ? colorScheme : 'theme.disabled';
  const hovering = isHovered && effect === 'hover';
  const reverse = isHovered && effect === 'reverse';

  const isLight = contrast(getColor(buttonColor)) == 'light';
  const ButtonVariants: Record<Variant, CSSProperties> = {
    filled: {
      // Defines CSS properties for 'link' variant of the button with conditional styles based on reverse state, includes text decoration.
      backgroundColor: reverse ? 'transparent' : buttonColor,
      color: reverse
        ? isLight
          ? getColor('color.white')
          : buttonColor
        : isLight
        ? buttonColor
        : getColor('color.white'),
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : 'transparent',
    },
    outline: {
      backgroundColor: reverse ? buttonColor : 'transparent',
      // Defines CSS properties for 'ghost' variant of the button with conditional styles based on reverse state.
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: reverse ? buttonColor : colorScheme,
      // Fetches size-specific styles from ButtonSizes based on the 'size' prop.
      color: reverse ? 'white' : buttonColor,
      // Fetches variant-specific styles from ButtonVariants based on the 'variant' prop.
    },
    // Adjusts button width based on isAuto and isFilled properties, using buttonSizeStyles for fallback width.
    link: {
      backgroundColor: 'transparent',
      // Changes padding for the button based on whether isIconRounded is true or false.
      borderWidth: 1,
      borderStyle: 'solid',
      // Creates the content for the button including loaders and icons positioned based on their respective properties.
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
  // Executes rendering of the button or a link element based on the variant; applies conditional rendering for externalHref in 'link' variant.
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
      {...defaultNativeProps}
      {...buttonSizeStyles}
      {...buttonVariant}
      {...scaleWidth}
      {...changePadding}
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
