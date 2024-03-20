import React from 'react';

import { ComboBoxProps } from '../Form/ComboBox/ComboBox/ComboBox.props';
import { useComboBoxState } from '../Form/ComboBox/ComboBox/ComboBox.state';
import ComboBoxView from '../Form/ComboBox/ComboBox/ComboBox.view';
import { useFormikInput } from './Formik.Hook';

const ComboBoxComponent: React.FC<ComboBoxProps> = ({
  items,
  placeholder,
  searchPlaceholder,
  ...props
}) => {
  const formProps = useFormikInput(props);
  const ComboBoxStates = useComboBoxState(
    items,
    placeholder,
    searchPlaceholder
  );

  // Ensure the onChange function from formProps is being called when an item is selected
  const handleSelect = (item: any) => {
    formProps.onChange(item);
  };

  return (
    <ComboBoxView {...ComboBoxStates} {...formProps} onSelect={handleSelect} />
  );
};

/**
 * ComboBox allows users to select one or more options from a list of choices.
 */
export const FormikComboBox = ComboBoxComponent;
