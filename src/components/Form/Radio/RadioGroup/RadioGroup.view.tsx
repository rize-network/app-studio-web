import React from 'react';
import { RadioGroupViewProps } from './RadioGroup.props';
import { RadioProps } from '../Radio/Radio.props';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
// Defines the `RadioGroupView` functional component, responsible for rendering the visual structure of the radio group, including its label, helper text, and the layout of its radio children.
const RadioGroupView: React.FC<RadioGroupViewProps> = ({
  children,
  name,
  label,
  helperText,
  error,
  selectedValue,
  setSelectedValue,
  direction = 'vertical',
  spacing = 8,
  isDisabled = false,
  isReadOnly = false,
  views = { container: {}, label: {}, helperText: {} },
  onChange,
  ...props
}) => {
  // Dynamically selects the layout container (`Vertical` or `Horizontal`) based on the `direction` prop to arrange the radio buttons within the group.
  const Container = direction === 'vertical' ? Vertical : Horizontal;
  // Processes each child element (expected to be `Radio` components) to inject common props such as `name`, `isChecked`, `isDisabled`, `isReadOnly`, and a unified `onChange` handler, ensuring proper group functionality.
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
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
      return React.cloneElement(child, radioProps);
    }
    return child;
  });
  return (
    <Vertical gap={spacing} width="100%" {...views.container} {...props}>
      {}
      {label && (
        <Text
          fontWeight="600"
          fontSize="14px"
          color={error ? 'color-red-600' : 'color-gray-700'}
          marginBottom={4}
          {...views.label}
        >
          {label}
        </Text>
      )}
      {}
      <Container gap={spacing}>{processedChildren}</Container>
      {}
      {(helperText || error) && (
        <Text
          fontWeight={error ? '500' : '400'}
          fontSize="14px"
          lineHeight="20px"
          color={error ? 'color-red-500' : 'color-gray-500'}
          marginTop={4}
          transition="color 0.2s ease, opacity 0.2s ease"
          {...views.helperText}
        >
          {error || helperText}
        </Text>
      )}
    </Vertical>
  );
};
export default RadioGroupView;
