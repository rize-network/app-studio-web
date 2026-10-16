import React from 'react';
import { SwitchProps } from './Switch/Switch.props';
import { useSwitchState } from './Switch/Switch.state';
import SwitchView from './Switch/Switch.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Defines the SwitchComponent as a functional component that takes SwitchProps as props.
const SwitchComponent: React.FC<SwitchProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('switch', props);
  // Invokes useSwitchState hook to obtain state for this component, passing props to it.
  const switchStates = useSwitchState(mergedProps);
  // Renders the SwitchView component, spreading the switchStates and props to pass all necessary data.
  return <SwitchView {...switchStates} {...mergedProps} />;
};
// Exports the SwitchComponent as 'Switch' for use in other parts of the application.
export const Switch = SwitchComponent;
