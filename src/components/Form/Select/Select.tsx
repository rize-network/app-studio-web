import React from 'react';
import { SelectProps } from './Select/Select.props';
import { useSelectState } from './Select/Select.state';
import SelectView from './Select/Select.view';

// Defines a functional component named 'SelectComponent', which is expected to receive 'SelectProps' as properties.
const SelectComponent: React.FC<SelectProps> = (props) => {
  // Ensure options is always an array
  const safeProps = {
    ...props,
    options: props.options || [],
  };

  // Invokes the 'useSelectState' hook with props to obtain stateful logic for the Select component.
  const selectStates = useSelectState(safeProps);

  // Renders the 'SelectView' component, passing along any states controlled by 'useSelectState' and all properties passed to 'SelectComponent'.
  return (
    <SelectView
      {...selectStates}
      {...safeProps}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        // Stop propagation to prevent the global click handler from closing other dropdowns
        e.stopPropagation();
        if (props.onClick) props.onClick(e);
      }}
    />
  );
};

// Exports 'SelectComponent' as 'Select', making it available for import in other parts of the application.
export const Select = SelectComponent;
