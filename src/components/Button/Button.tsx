import React from 'react';

import { ButtonProps } from './Button/Button.props';
import { useButtonState } from './Button/Button.state';
import ButtonView from './Button/Button.view';

const ButtonComponent: React.FC<ButtonProps> = (props: any) => {
  const { isHovered, setIsHovered } = useButtonState();
  const handleHover = () => setIsHovered(!isHovered);

  return (
    <ButtonView
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      filter={isHovered ? 'brightness(0.85)' : 'brightness(1)'}
      {...props}
    />
  );
};

/**
 * Buttons allow us to trigger an event or an action with a single click.
 */
export const Button = ButtonComponent;
