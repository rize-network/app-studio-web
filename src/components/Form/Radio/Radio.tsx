import React from 'react';
import { RadioProps } from './Radio/Radio.props';
import { useRadioState } from './Radio/Radio.state';
import RadioView from './Radio/Radio.view';
// Defines the main Radio component, serving as the orchestrator that integrates component properties (`RadioProps`), state management logic (`useRadioState`), and the visual presentation (`RadioView`) into a single functional component.
const RadioComponent: React.FC<RadioProps> = (props) => {
  const radioStates = useRadioState(props);
  return <RadioView {...radioStates} {...props} />;
};
export const Radio = RadioComponent;
