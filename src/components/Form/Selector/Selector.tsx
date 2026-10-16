import React from 'react';
import { SelectorProps } from './Selector/Selector.props';
import { useSelectorState } from './Selector/Selector.state';
import SelectorView from './Selector/Selector.view';
// Defines the main functional component for the Selector, which takes `SelectorProps` to configure its behavior and appearance.
const SelectorComponent: React.FC<SelectorProps> = (props) => {
  // Prepares a set of props for the component, ensuring that the `options` array always has a default empty array if not provided, enhancing robustness.
  const safeProps = {
    ...props,
    options: props.options || [],
  };
  // Initializes the internal state and derived logic for the Selector component by utilizing a custom hook, `useSelectorState`, based on the processed `safeProps`.
  const selectorStates = useSelectorState(safeProps);
  return (
    <SelectorView
      {...selectorStates}
      {...safeProps}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (props.onClick) props.onClick(e);
      }}
    />
  );
};
export const Selector = SelectorComponent;
