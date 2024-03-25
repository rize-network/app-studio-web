import React from 'react';

import { SelectProps } from './Select/Select.props';
import { useSelectState } from './Select/Select.state';
import SelectView from './Select/Select.view';

const SelectComponent: React.FC<SelectProps> = (props) => {
  const selectStates = useSelectState(props);
  return <SelectView {...selectStates} {...props} />;
};

/**
 * Select provides a dropdown list of options for the user to choose from.
 */
export const Select = SelectComponent;
