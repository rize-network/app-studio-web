import { useState, useCallback, useMemo, useEffect } from 'react';
import { AccordionProps } from './Accordion.props';
import { generateId } from '../../../utils/id';

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

  // Ensure initial value matches the type ('single' needs string/undefined, 'multiple' needs array)
  const getValidInitialValue = () => {
    if (type === 'multiple') {
      return Array.isArray(initialValue)
        ? initialValue
        : initialValue
        ? [initialValue]
        : [];
    }
    // Type 'single'
    return Array.isArray(initialValue) ? initialValue[0] : initialValue;
  };

  const [internalValue, setInternalValue] = useState<
    string | string[] | undefined
  >(getValidInitialValue());

  // Generate a base ID for ARIA attributes
  const baseId = useMemo(() => generateId('accordion'), []);

  // Memoize the value to be used (controlled or internal)
  const selectedValue = isControlled ? controlledValue : internalValue;

  // Convert selectedValue to array for internal use
  const expandedItems = useMemo(() => {
    if (selectedValue === undefined) return [];
    return Array.isArray(selectedValue) ? selectedValue : [selectedValue];
  }, [selectedValue]);

  // Update internal state if controlled value changes externally
  useEffect(() => {
    if (isControlled) {
      // Ensure the controlled value type matches the accordion type
      if (type === 'multiple' && !Array.isArray(controlledValue)) {
        console.warn(
          `Accordion with type="multiple" received non-array value:`,
          controlledValue
        );
        // Attempt to gracefully handle: use empty array or convert if single string
        setInternalValue(controlledValue ? [String(controlledValue)] : []);
      } else if (type === 'single' && Array.isArray(controlledValue)) {
        console.warn(
          `Accordion with type="single" received array value:`,
          controlledValue
        );
        // Attempt to gracefully handle: use first element or undefined
        setInternalValue(
          controlledValue.length > 0 ? controlledValue[0] : undefined
        );
      } else {
        setInternalValue(controlledValue); // Sync types match
      }
    }
  }, [controlledValue, isControlled, type]);

  const toggleItem = useCallback(
    (itemValue: string) => {
      let newValue: string | string[] | undefined;

      if (type === 'single') {
        if (selectedValue === itemValue && collapsible) {
          newValue = undefined; // Collapse if collapsible
        } else if (selectedValue !== itemValue) {
          newValue = itemValue; // Open the new one
        } else {
          newValue = selectedValue; // No change if not collapsible and already open
        }
      } else {
        // Type 'multiple'
        const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
        if (currentValues.includes(itemValue)) {
          // Item is open, close it by filtering out
          newValue = currentValues.filter((v) => v !== itemValue);
        } else {
          // Item is closed, open it by adding
          newValue = [...currentValues, itemValue];
        }
        // Ensure empty array instead of undefined for multiple type when all closed
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
