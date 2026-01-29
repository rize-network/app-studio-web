import React from 'react';

import { RadioProps } from '../Form/Radio/Radio/Radio.props';
import { useRadioState } from '../Form/Radio/Radio/Radio.state';
import RadioView from '../Form/Radio/Radio/Radio.view';
import { useFormikInput } from './Formik.Hook';

const RadioComponent: React.FC<RadioProps> = (props) => {
  let { value, ...formProps } = useFormikInput(props);
  formProps.isChecked = value === props.value;
  const radioStates = useRadioState(props);
  return <RadioView {...radioStates} {...formProps} />;
};

/**
 * Radio allows users to select one option from a set of choices with Formik integration.
 */
export const FormikRadio = RadioComponent;
