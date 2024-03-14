import React from 'react';

import { ButtonProps } from './Button/Button.props';
import { useButtonState } from './Button/Button.state';
import ButtonView from './Button/Button.view';

const ButtonComponent: React.FC<ButtonProps> = (props: any) => {
  const { isHovered, setIsHovered } = useButtonState();
  const handleHover = () => setIsHovered(!isHovered);

  return (
    <ButtonView
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      {...props}
    />
  );
};

/**
 * Buttons allow us to trigger an event or an action with a single click.
 */
export const Button = ButtonComponent;
