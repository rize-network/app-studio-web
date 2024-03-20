import React from 'react';

import { CheckboxProps } from '../Form/Checkbox/Checkbox/Checkbox.props';
import { useCheckboxState } from '../Form/Checkbox/Checkbox/Checkbox.state';
import CheckboxView from '../Form/Checkbox/Checkbox/Checkbox.view';
import { useFormikInput } from './Formik.Hook';

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  let { value, ...formProps } = useFormikInput(props);
  formProps.isChecked = value;
  const checkboxStates = useCheckboxState(props);
  return <CheckboxView {...checkboxStates} {...formProps} />;
};

/**
 * Checkbox allows users to select one or more options from a list of choices.
 */
export const FormikCheckbox = CheckboxComponent;
