import React from 'react';

import { CheckboxProps } from './Checkbox/Checkbox.props';
import { useCheckboxState } from './Checkbox/Checkbox.state';
import CheckboxView from './Checkbox/Checkbox.view';

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  const checkboxStates = useCheckboxState(props);

  return <CheckboxView {...checkboxStates} {...props} />;
};

/**
 * Checkbox allows users to select one or more options from a list of choices.
 */
export const Checkbox = CheckboxComponent;
