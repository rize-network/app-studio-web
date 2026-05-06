import React from 'react';
import { RadioProps } from './Radio/Radio.props';
import { useRadioState } from './Radio/Radio.state';
import RadioView from './Radio/Radio.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Defines the main Radio component, serving as the orchestrator that integrates component properties (`RadioProps`), state management logic (`useRadioState`), and the visual presentation (`RadioView`) into a single functional component.
const RadioComponent: React.FC<RadioProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('radio', props);
  const radioStates = useRadioState(mergedProps);
  return <RadioView {...radioStates} {...mergedProps} />;
};
export const Radio = RadioComponent;
