/**
 * RadioGroup Component
 *
 * A component that manages a group of radio buttons.
 */

import React from 'react';

import { RadioGroupProps } from './RadioGroup/RadioGroup.props';
import { useRadioGroupState } from './RadioGroup/RadioGroup.state';
import RadioGroupView from './RadioGroup/RadioGroup.view';

const RadioGroupComponent: React.FC<RadioGroupProps> = (props) => {
  const radioGroupStates = useRadioGroupState(props);

  return <RadioGroupView {...radioGroupStates} {...props} />;
};

/**
 * RadioGroup allows users to manage a group of radio buttons.
 */
export const RadioGroup = RadioGroupComponent;
