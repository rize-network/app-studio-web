import React, { useEffect } from 'react';

import { ToggleProps } from '../Toggle/Toggle/Toggle.props';
import { useToggleState } from '../Toggle/Toggle/Toggle.state';
import ToggleView from '../Toggle/Toggle/Toggle.view';
import { useFormikInput } from './Formik.Hook';

const ToggleComponent: React.FC<ToggleProps> = ({
  children,
  shape,
  variant,
  isDisabled,
  isToggled = false,
  onToggle,
  ...props
}) => {
  const formProps = useFormikInput(props);
  const { isHovered, setIsHovered, isToggle, setIsToggled } = useToggleState(
    formProps.value ?? isToggled
  );

  // Sync with Formik value
  useEffect(() => {
    setIsToggled(formProps.value ?? isToggled);
  }, [formProps.value, isToggled]);

  // Handle toggle change
  const handleToggle = (newToggleState: boolean) => {
    setIsToggled(newToggleState);
    formProps.onChange(newToggleState);
    onToggle?.(newToggleState);
  };

  return (
    <ToggleView
      shape={shape}
      variant={variant}
      isDisabled={isDisabled}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      isToggle={isToggle}
      setIsToggled={setIsToggled}
      onToggle={handleToggle}
      {...props}
    >
      {children}
    </ToggleView>
  );
};

/**
 * Toggle allows users to switch between two states with Formik integration.
 */
export const FormikToggle = ToggleComponent;
