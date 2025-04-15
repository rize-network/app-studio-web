/**
 * RadioGroup View Component
 *
 * Renders a group of radio buttons with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { RadioGroupViewProps } from './RadioGroup.props';
import { RadioProps } from '../Radio/Radio.props';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../../../Text/Text';

const RadioGroupView: React.FC<RadioGroupViewProps> = ({
  children,
  name,
  label,
  helperText,
  error,
  selectedValue,
  setSelectedValue,
  direction = 'vertical',
  spacing = 8, // 2 × 4px grid
  isDisabled = false,
  isReadOnly = false,
  views = { container: {}, label: {}, helperText: {} },
  ...props
}) => {
  // Container component based on direction
  const Container = direction === 'vertical' ? Vertical : Horizontal;

  // Process children to add necessary props
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Create props object with the correct type
      const radioProps: Partial<RadioProps> = {
        name,
        isChecked: child.props.value === selectedValue,
        isDisabled: isDisabled || child.props.isDisabled,
        isReadOnly: isReadOnly || child.props.isReadOnly,
        onChange: (value: string) => {
          setSelectedValue(value);
          if (child.props.onChange) {
            child.props.onChange(value);
          }
        },
      };

      // Clone element with properly typed props
      return React.cloneElement(child, radioProps);
    }
    return child;
  });

  return (
    <Vertical gap={spacing} width="100%" {...views.container} {...props}>
      {/* Label */}
      {label && (
        <Text
          fontWeight="600" // Semi-bold for better readability
          fontSize="16px" // 4 × 4px grid
          color={error ? 'color.red.600' : 'color.gray.700'}
          marginBottom={4} // 1 × 4px grid
          {...views.label}
        >
          {label}
        </Text>
      )}

      {/* Radio buttons */}
      <Container gap={spacing}>{processedChildren}</Container>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <Text
          fontWeight={error ? '500' : '400'} // Medium weight for error, regular for helper text
          fontSize="14px" // 3.5 × 4px grid
          lineHeight="20px" // 5 × 4px grid
          color={error ? 'color.red.500' : 'color.gray.500'}
          marginTop={4} // 1 × 4px grid
          transition="all 0.2s ease"
          {...views.helperText}
        >
          {error || helperText}
        </Text>
      )}
    </Vertical>
  );
};

export default RadioGroupView;
