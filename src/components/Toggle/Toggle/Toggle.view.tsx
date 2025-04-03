import React from 'react';
import { Center } from '../../Layout/Center/Center';
import { ToggleViewProps } from './Toggle.props';
import { ViewProps } from 'app-studio';

const ToggleView: React.FC<ToggleViewProps> = ({
  children,
  shape = 'rounded',
  variant = 'ghost',
  isHovered,
  setIsHovered,
  isDisabled,
  isToggle,
  setIsToggled,
  onToggle,
  ...props
}) => {
  const toggleColor = !isDisabled ? 'color.trueGray.400' : 'theme.disabled';
  const isActive = !!(isToggle || isHovered);
  const toggleVariants: { [key: string]: ViewProps } = {
    outline: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'color.trueGray.400',
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
      borderRadius={shape === 'pillShaped' ? '50px' : '8px'}
      onClick={handleToggle}
      {...toggleVariants[variant]}
      {...props}
    >
      {children}
    </Center>
  );
};
export default ToggleView;
