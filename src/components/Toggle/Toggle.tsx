import React, { useEffect } from 'react';
import { ToggleProps } from './Toggle/Toggle.props';
import { useToggleState } from './Toggle/Toggle.state';
import ToggleView from './Toggle/Toggle.view';

const ToggleComponent = ({
  children,
  shape,
  colorScheme,
  variant,
  isDisabled,
  isToggled = false,
  onToggle,
  ...props
}: ToggleProps) => {
  const { isHovered, setIsHovered, isToggle, setIsToggled } =
    useToggleState(isToggled);

  useEffect(() => {
    setIsToggled(isToggled);
  }, [isToggled]);
  return (
    <ToggleView
      shape={shape}
      colorScheme={colorScheme}
      variant={variant}
      isDisabled={isDisabled}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      isToggle={isToggle}
      setIsToggled={setIsToggled}
      onToggle={onToggle}
      {...props}
    >
      {children}
    </ToggleView>
  );
};

export const Toggle = ToggleComponent;
