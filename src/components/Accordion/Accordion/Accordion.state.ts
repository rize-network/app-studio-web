import { useState, useCallback, useMemo, useEffect } from 'react';
import { AccordionProps } from './Accordion.props';
import { generateId } from '../../../utils/id';
// This file defines the 'useAccordionState' hook, which centralizes all state management and core logic for the Accordion component, handling item expansion, value changes, and controlled/uncontrolled modes.
export const useAccordionState = ({
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = false,
}: Pick<
  AccordionProps,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'collapsible'
>) => {
  const isControlled = controlledValue !== undefined;
  const initialValue = controlledValue ?? defaultValue;
  const getValidInitialValue = () => {
    if (type === 'multiple') {
      return Array.isArray(initialValue)
        ? initialValue
        : initialValue
        ? [initialValue]
        : [];
    }
    return Array.isArray(initialValue) ? initialValue[0] : initialValue;
  };
  const [internalValue, setInternalValue] = useState<
    string | string[] | undefined
  >(getValidInitialValue());
  const baseId = useMemo(() => generateId('accordion'), []);
  const selectedValue = isControlled ? controlledValue : internalValue;
  const expandedItems = useMemo(() => {
    if (selectedValue === undefined) return [];
    return Array.isArray(selectedValue) ? selectedValue : [selectedValue];
  }, [selectedValue]);
  useEffect(() => {
    if (isControlled) {
      if (type === 'multiple' && !Array.isArray(controlledValue)) {
        console.warn(
          `Accordion with type="multiple" received non-array value:`,
          controlledValue
        );
        setInternalValue(controlledValue ? [String(controlledValue)] : []);
      } else if (type === 'single' && Array.isArray(controlledValue)) {
        console.warn(
          `Accordion with type="single" received array value:`,
          controlledValue
        );
        setInternalValue(
          controlledValue.length > 0 ? controlledValue[0] : undefined
        );
      } else {
        setInternalValue(controlledValue);
      }
    }
  }, [controlledValue, isControlled, type]);
  const toggleItem = useCallback(
    (itemValue: string) => {
      let newValue: string | string[] | undefined;
      if (type === 'single') {
        if (selectedValue === itemValue && collapsible) {
          newValue = undefined;
        } else if (selectedValue !== itemValue) {
          newValue = itemValue;
        } else {
          newValue = selectedValue;
        }
      } else {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
        if (currentValues.includes(itemValue)) {
          newValue = currentValues.filter((v) => v !== itemValue);
        } else {
          newValue = [...currentValues, itemValue];
        }
        if (Array.isArray(newValue) && newValue.length === 0) newValue = [];
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [type, selectedValue, collapsible, isControlled, onValueChange]
  );
  const isItemExpanded = useCallback(
    (itemValue: string) => {
      return expandedItems.includes(itemValue);
    },
    [expandedItems]
  );
  return {
    expandedItems,
    toggleItem,
    isItemExpanded,
    type,
    collapsible,
    baseId,
  };
};
