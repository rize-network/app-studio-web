import React, { useEffect } from 'react';

import { ToggleGroupProps } from '../ToggleGroup/ToggleGroup/ToggleGroup.props';
import { useToggleGroupState } from '../ToggleGroup/ToggleGroup/ToggleGroup.state';
import { ToggleGroupView } from '../ToggleGroup/ToggleGroup/ToggleGroup.view';
import { useFormikInput } from './Formik.Hook';

const ToggleGroupComponent: React.FC<ToggleGroupProps> = ({
  items,
  shape,
  variant,
  onToggleChange,
  ...props
}) => {
  const formProps = useFormikInput(props);
  const { activeToggles, setActiveToggles } = useToggleGroupState();

  // Sync with Formik value
  useEffect(() => {
    if (Array.isArray(formProps.value)) {
      setActiveToggles(formProps.value);
    }
  }, [formProps.value]);

  // Handle toggle change
  const handleToggleChange = (activeIds: string[]) => {
    setActiveToggles(activeIds);
    formProps.onChange(activeIds);
    onToggleChange?.(activeIds);
  };

  return (
    <ToggleGroupView
      items={items}
      shape={shape}
      variant={variant}
      activeToggles={activeToggles}
      setActiveToggles={setActiveToggles}
      onToggleChange={handleToggleChange}
      {...props}
    />
  );
};

/**
 * ToggleGroup allows users to select multiple options from a group with Formik integration.
 */
export const FormikToggleGroup = ToggleGroupComponent;
