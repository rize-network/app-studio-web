import React from 'react';

import { SelectProps } from '../Form/Select/Select/Select.props';
import { useSelectState } from '../Form/Select/Select/Select.state';
import SelectView from '../Form/Select/Select/Select.view';
import { useFormikInput } from './Formik.Hook';

const SelectComponent: React.FC<SelectProps> = (props) => {
  let formProps = useFormikInput(props);
  formProps.selected = formProps.value;
  console.log({ formProps, test: formProps.value });
  const selectStates = useSelectState(props);
  return <SelectView {...selectStates} {...formProps} />;
};

/**
 * Select provides a dropdown list of options for the user to choose from.
 */

export const FormikSelect = SelectComponent;
