import React, { CSSProperties } from 'react';
import { ToggleViewProps } from './Toggle.props';
import { ToggleShapes } from './Toggle.style';
import { Variant } from './Toggle.type';
import { Center } from '../../Layout/Center/Center';
const ToggleView: React.FC<ToggleViewProps> = ({
  children,
  shape = 'rounded',
  colorScheme = 'color.trueGray.400',
  variant = 'ghost',
  isHovered,
  setIsHovered,
  isDisabled,
  isToggle,
  setIsToggled,
  onToggle,
  ...props
}) => {
  const toggleColor = !isDisabled ? colorScheme : 'theme.disabled';
  const isActive = !!(isToggle || isHovered);
  const ToggleVariants: Record<Variant, CSSProperties> = {
    outline: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colorScheme,
    },
    link: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: isActive ? toggleColor : 'transparent',
      textDecoration: 'underline',
    },
    ghost: {},
  };
  const handleToggle = () => {
    if (!isDisabled) {
      setIsToggled((prev) => {
        const newState = !prev;
        if (onToggle) {
          onToggle(newState);
        }
        return newState;
      });
    }
  };
  return (
    <Center
      role="Toggle"
      padding={shape === 'pillShaped' ? '10px 12px' : '8px'}
      width="fit-content"
      color={isActive ? 'color.white' : toggleColor}
      backgroundColor={isActive ? toggleColor : 'transparent'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      borderRadius={ToggleShapes[shape]}
      onClick={handleToggle}
      {...ToggleVariants[variant]}
      {...props}
    >
      {children}
    </Center>
  );
};
export default ToggleView;
