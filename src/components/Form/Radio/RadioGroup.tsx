import React from 'react';
import { RadioGroupProps } from './RadioGroup/RadioGroup.props';
import { useRadioGroupState } from './RadioGroup/RadioGroup.state';
import RadioGroupView from './RadioGroup/RadioGroup.view';
// Defines the main RadioGroup functional component, which orchestrates state management and rendering for the RadioGroup.
const RadioGroupComponent: React.FC<RadioGroupProps> = (props) => {
  // Initializes and manages the state logic for the RadioGroup by utilizing a custom hook, passing down component properties.
  const radioGroupStates = useRadioGroupState(props);
  // Renders the presentational RadioGroup view, combining both the derived state logic and the original component properties.
  return <RadioGroupView {...radioGroupStates} {...props} />;
};
// Exports the RadioGroup component for external use, making it available throughout the application.
export const RadioGroup = RadioGroupComponent;
