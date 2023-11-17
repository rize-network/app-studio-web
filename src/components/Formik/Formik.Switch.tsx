import React from 'react';

import { SwitchProps } from '../Form/Switch/Switch/Switch.props';
import { useSwitchState } from '../Form/Switch/Switch/Switch.state';
import SwitchView from '../Form/Switch/Switch/Switch.view';
import { useFormikInput } from './Formik.Hook';

const SwitchComponent: React.FC<SwitchProps> = (props) => {
  let { value, ...formProps } = useFormikInput(props);
  formProps.isChecked = value;
  const switchStates = useSwitchState(props);
  return <SwitchView {...switchStates} {...formProps} />;
};

export const FormikSwitch = SwitchComponent;
