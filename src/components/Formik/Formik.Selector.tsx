import React from 'react';

import { SelectorProps } from '../Form/Selector/Selector/Selector.props';
import { useSelectorState } from '../Form/Selector/Selector/Selector.state';
import SelectorView from '../Form/Selector/Selector/Selector.view';
import { useFormikInput } from './Formik.Hook';

const SelectorComponent: React.FC<SelectorProps> = (props) => {
  let formProps = useFormikInput(props);
  formProps.selected = formProps.value;
  const selectorStates = useSelectorState(props);
  return <SelectorView {...selectorStates} {...formProps} />;
};

/**
 * Selector provides a dropdown list of options for the user to choose from.
 */

export const FormikSelector = SelectorComponent;
