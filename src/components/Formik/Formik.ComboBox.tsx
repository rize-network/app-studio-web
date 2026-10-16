import React, { useEffect } from 'react';

import {
  ComboBoxItem,
  ComboBoxProps,
} from '../Form/ComboBox/ComboBox/ComboBox.props';
import { useComboBoxState } from '../Form/ComboBox/ComboBox/ComboBox.state';
import ComboBoxView from '../Form/ComboBox/ComboBox/ComboBox.view';
import { useFormikInput } from './Formik.Hook';

const ComboBoxComponent: React.FC<ComboBoxProps> = ({
  items,
  placeholder,
  searchPlaceholder,
  isMulti = false,
  ...props
}) => {
  const formProps = useFormikInput(props);
  const ComboBoxStates = useComboBoxState(
    items,
    placeholder,
    searchPlaceholder
  );

  // Sync Formik value with internal state for multi-select
  useEffect(() => {
    if (isMulti && Array.isArray(formProps.value)) {
      // Map Formik values (array of ComboBoxItem) to selectedItems state
      ComboBoxStates.setSelectedItems(formProps.value);
    } else if (!isMulti && formProps.value) {
      // For single select, sync the selectedItem
      const selectedItem =
        typeof formProps.value === 'object'
          ? formProps.value
          : items.find((item) => item.value === formProps.value);
      if (selectedItem) {
        ComboBoxStates.setSelectedItem(selectedItem);
      }
    }
  }, [formProps.value, isMulti, items]);

  // Ensure the onChange function from formProps is being called when an item is selected
  const handleSelect = (selected: ComboBoxItem | ComboBoxItem[]) => {
    formProps.onChange(selected);
  };

  return (
    <ComboBoxView
      {...ComboBoxStates}
      {...formProps}
      items={items}
      placeholder={placeholder}
      isMulti={isMulti}
      onSelect={handleSelect}
    />
  );
};

/**
 * ComboBox allows users to select one or more options from a list of choices.
 */
export const FormikComboBox = ComboBoxComponent;
