import React from 'react';

import { IconPickerProps } from '../IconPicker/IconPicker/IconPicker.props';
import { useIconPickerState } from '../IconPicker/IconPicker/IconPicker.state';
import IconPickerView from '../IconPicker/IconPicker/IconPicker.view';
import { useFormikInput } from './Formik.Hook';
import { IconName } from '../Icon/Icon';

const IconPickerComponent: React.FC<IconPickerProps> = (props) => {
  const formProps = useFormikInput(props);

  // Use the Formik value as the current value
  const propsWithValue = {
    ...props,
    value: formProps.value ?? props.value ?? props.defaultValue,
  };

  const iconPickerStates = useIconPickerState(propsWithValue);

  // Handle icon selection
  const handleIconSelect = (iconName: IconName) => {
    iconPickerStates.handleIconSelect(iconName);
    formProps.onChange(iconName);
  };

  return (
    <IconPickerView
      {...iconPickerStates}
      {...propsWithValue}
      handleIconSelect={handleIconSelect}
    />
  );
};

/**
 * IconPicker allows users to select an icon from a list with Formik integration.
 */
export const FormikIconPicker = IconPickerComponent;
