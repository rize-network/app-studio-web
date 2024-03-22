import React from 'react';
import { ComboBoxProps } from './ComboBox/ComboBox.props';
import { useComboBoxState } from './ComboBox/ComboBox.state';
import ComboBoxView from './ComboBox/ComboBox.view';
const ComboBoxComponent: React.FC<ComboBoxProps> = ({
  // The `ComboBoxComponent` takes in parameters for ID, name, an array of items, two placeholders, and any additional properties passed as `...props`.
  // Define a React functional component with generic type `React.FC` and destructuring its props against `ComboBoxProps`.
  id,
  // Invoke the custom hook `useComboBoxState` with the provided items and placeholders which likely manages the component's state.
  name,
  // Render the `ComboBoxView` component, passing the deconstructed props, the generated state, and any additional props.
  items,
  placeholder,
  // Export the `ComboBox` component for use in other parts of the application under the named export `ComboBox`.
  searchPlaceholder,
  ...props
}) => {
  const state = useComboBoxState(items, placeholder, searchPlaceholder);
  return (
    <ComboBoxView id={id} name={name} items={items} {...state} {...props} />
  );
};
export const ComboBox = ComboBoxComponent;
