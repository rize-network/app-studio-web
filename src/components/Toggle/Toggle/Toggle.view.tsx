import React from 'react';
import { ViewProps } from 'app-studio';
import { ToggleViewProps } from './Toggle.props';
import { Center } from '../../Layout/Center/Center';

interface Props extends ToggleViewProps {
  views?: {
    container?: ViewProps;
  };
}

const ToggleView: React.FC<Props> = ({
  children,
  shape = 'rounded',
  variant = 'ghost',
  isHovered,
  setIsHovered,
  isDisabled,
  isToggle,
  setIsToggled,
  onToggle,
  views,
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

  const handleHover = () => setIsHovered(!isHovered);

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
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      borderRadius={shape === 'pillShaped' ? '50px' : '8px'}
      onClick={handleToggle}
      {...toggleVariants[variant]}
      {...props}
      {...views?.container}
    >
      {children}
    </Center>
  );
};
export default ToggleView;
