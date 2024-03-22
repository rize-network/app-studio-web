import React from 'react';
import { ComboBoxProps } from './ComboBox/ComboBox.props';
import { useComboBoxState } from './ComboBox/ComboBox.state';
import ComboBoxView from './ComboBox/ComboBox.view';

const ComboBoxComponent: React.FC<ComboBoxProps> = ({
  // Ensure there is a unique ID for each ComboBox
  id,
  name,
  items,
  placeholder,
  searchPlaceholder,
  ...props
}) => {
  const state = useComboBoxState(items, placeholder, searchPlaceholder);

  return (
    <ComboBoxView id={id} name={name} items={items} {...state} {...props} />
  );
};

export const ComboBox = ComboBoxComponent;
