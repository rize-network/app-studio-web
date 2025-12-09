import React from 'react';
import { SelectorProps } from './Selector/Selector.props';
import { useSelectorState } from './Selector/Selector.state';
import SelectorView from './Selector/Selector.view';

// Defines a functional component named 'SelectorComponent', which is expected to receive 'SelectorProps' as properties.
const SelectorComponent: React.FC<SelectorProps> = (props) => {
  // Ensure options is always an array
  const safeProps = {
    ...props,
    options: props.options || [],
  };

  // Invokes the 'useSelectorState' hook with props to obtain stateful logic for the Selector component.
  const selectorStates = useSelectorState(safeProps);

  // Renders the 'SelectorView' component, passing along any states controlled by 'useSelectorState' and all properties passed to 'SelectorComponent'.
  return (
    <SelectorView
      {...selectorStates}
      {...safeProps}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        // Stop propagation to prevent the global click handler from closing other dropdowns
        e.stopPropagation();
        if (props.onClick) props.onClick(e);
      }}
    />
  );
};

// Exports 'SelectorComponent' as 'Selector', making it available for import in other parts of the application.
export const Selector = SelectorComponent;
