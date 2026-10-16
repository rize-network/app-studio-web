import React from 'react';

import { CheckboxProps } from './Checkbox/Checkbox.props';
import { useCheckboxState } from './Checkbox/Checkbox.state';
import CheckboxView from './Checkbox/Checkbox.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('checkbox', props);
  const checkboxStates = useCheckboxState(mergedProps);

  return <CheckboxView {...checkboxStates} {...mergedProps} />;
};

/**
 * Checkbox allows users to select one or more options from a list of choices.
 */
export const Checkbox = CheckboxComponent;
