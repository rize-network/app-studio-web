import React from 'react';
import { IconPickerProps } from './IconPicker/IconPicker.props';
import { useIconPickerState } from './IconPicker/IconPicker.state';
import IconPickerView from './IconPicker/IconPicker.view';

const IconPickerComponent: React.FC<IconPickerProps> = (
  props: IconPickerProps
) => {
  const iconPickerStates = useIconPickerState(props);

  return <IconPickerView {...iconPickerStates} {...props} />;
};

export const IconPicker = IconPickerComponent;
