import React from 'react';

import { SwitchProps } from './Switch/Switch.props';
import { useSwitchState } from './Switch/Switch.state';
import SwitchView from './Switch/Switch.view';

const SwitchComponent: React.FC<SwitchProps> = (props) => {
  const switchStates = useSwitchState(props);
  return <SwitchView {...switchStates} {...props} />;
};

export const Switch = SwitchComponent;
