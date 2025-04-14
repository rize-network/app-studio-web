/**
 * Radio Component
 *
 * A radio button component that allows users to select one option from a set.
 */

import React from 'react';

import { RadioProps } from './Radio/Radio.props';
import { useRadioState } from './Radio/Radio.state';
import RadioView from './Radio/Radio.view';

const RadioComponent: React.FC<RadioProps> = (props) => {
  const radioStates = useRadioState(props);

  return <RadioView {...radioStates} {...props} />;
};

/**
 * Radio allows users to select one option from a set of choices.
 */
export const Radio = RadioComponent;
