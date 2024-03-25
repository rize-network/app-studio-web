import React from 'react';
import { ComboBoxProps } from './ComboBox/ComboBox.props';
import { useComboBoxState } from './ComboBox/ComboBox.state';
import ComboBoxView from './ComboBox/ComboBox.view';

// Defines the ComboBoxComponent functional component with ComboBoxProps
const ComboBoxComponent: React.FC<ComboBoxProps> = ({
  // Destructures 'id' from component props
  id,
  // Destructures 'name' from component props
  name,
  // Destructures 'items' from component props, used to populate combobox
  items,
  // Destructures 'placeholder' from component props, displayed when no item selected
  placeholder,
  // Destructures 'searchPlaceholder' from component props, used as the search field placeholder
  searchPlaceholder,
  // Destructures the rest of the props not explicitly defined
  ...props
}) => {
  // Initializes ComboBox state using custom hook with items and placeholders
  const state = useComboBoxState(items, placeholder, searchPlaceholder);
  return (
    // Render ComboBoxView with passed and state props
    <ComboBoxView id={id} name={name} items={items} {...state} {...props} />
  );
};
// Exports the ComboBoxComponent as ComboBox
export const ComboBox = ComboBoxComponent;
