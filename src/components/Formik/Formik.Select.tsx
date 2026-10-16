import React from 'react';

import { SelectProps } from '../Form/Select/Select/Select.props';
import { useSelectState } from '../Form/Select/Select/Select.state';
import SelectView from '../Form/Select/Select/Select.view';
import { useFormikInput } from './Formik.Hook';

const SelectComponent: React.FC<SelectProps> = (props) => {
  let formProps = useFormikInput(props);
  formProps.selected = formProps.value;
  // Formik owns the value, so hand it to the state hook as the controlled
  // `value` instead of letting the hook keep a second copy that drifts. When
  // the field has no Formik value yet this is `undefined`, and the hook falls
  // back to its own initial selection rather than rendering nothing.
  const selectStates = useSelectState({ ...props, value: formProps.value });
  return <SelectView {...formProps} {...selectStates} />;
};

/**
 * Select provides a dropdown list of options for the user to choose from.
 */

export const FormikSelect = SelectComponent;
