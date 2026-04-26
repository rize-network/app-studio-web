import React, { useCallback } from 'react';
import { useTheme } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { Button } from '../../../Button/Button';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { InfoIcon } from '../../../Icon/Icon';
import { SelectorViewProps } from './Selector.props';
import { Option } from './Selector.type';
// Defines the SelectorView functional component, which is responsible for rendering a group of selectable options as buttons, handling user interactions, and applying dynamic styling based on the selection state.
const SelectorView: React.FC<SelectorViewProps> = ({
  id,
  name,
  label,
  value,
  size,
  views = {},
  options = [],
  onChange = () => {},
  setValue = () => {},
  ...props
}) => {
  // Utilizes the `useTheme` hook to retrieve the `getColor` utility function, allowing dynamic access to theme-defined colors for styling.
  const { getColor } = useTheme();
  // Memoizes the `handleCallback` function using `useCallback` to optimize performance by preventing unnecessary re-renders. This function is triggered when a user clicks an option button, updating the component's internal value via `setValue` and notifying external consumers via `onChange`.
  const handleCallback = useCallback(
    (option: Option) => {
      setValue(option.value);
      if (onChange) onChange(option.value);
    },
    [setValue, onChange]
  );
  return (
    <FieldContainer id={id} width="100%" views={views}>
      {label && (
        <Horizontal
          fontSize="10px"
          letterSpacing="wider"
          color="color-black-500"
          fontWeight="bold"
          marginBottom={12}
          alignItems="center"
          gap={6}
          style={{ textTransform: 'uppercase' }}
        >
          <InfoIcon widthHeight={14} /> <Text>{label}</Text>
        </Horizontal>
      )}
      <Horizontal gap={0}>
        {options.map((option, index, arr) => {
          const isSelected = value === option.value;
          let borderColor = getColor('color-gray-200');
          let textColor = getColor('color-gray-500');
          let backgroundColor = 'transparent';
          if (isSelected) {
            if (option.color) {
              const baseColorName = option.color;
              borderColor = getColor(option.color);
              textColor = getColor(option.color);
              backgroundColor = 'color-blackAlpha-200';
            } else {
              const primary = getColor('theme-primary');
              borderColor = primary;
              textColor = primary;
              backgroundColor = 'color-gray-50';
            }
            if (option.color) {
              borderColor = getColor(option.color);
              textColor = getColor(option.color);
              backgroundColor = 'transparent';
            } else {
              borderColor = getColor('theme-primary');
              textColor = getColor('theme-primary');
              backgroundColor = 'transparent';
            }
          }
          return (
            <Button
              key={option.value}
              onClick={() => handleCallback(option)}
              flex={1}
              {...(size
                ? { size }
                : {
                    paddingVertical: 6,
                    fontSize: '12px',
                  })}
              fontWeight={isSelected ? 'bold' : 'normal'}
              style={{
                borderTop: `1px solid ${
                  isSelected ? borderColor : getColor('color-gray-200')
                }`,
                borderBottom: `1px solid ${
                  isSelected ? borderColor : getColor('color-gray-200')
                }`,
                borderLeft: `1px solid ${
                  isSelected ? borderColor : getColor('color-gray-200')
                }`,
                borderRight:
                  index === arr.length - 1 || isSelected
                    ? `1px solid ${
                        isSelected ? borderColor : getColor('color-gray-200')
                      }`
                    : 'none',
                backgroundColor: backgroundColor,
                color: textColor,
                borderRadius:
                  index === 0
                    ? '6px 0 0 6px'
                    : index === arr.length - 1
                    ? '0 6px 6px 0'
                    : '0',
                zIndex: isSelected ? 1 : 0,
                boxShadow: 'none',
              }}
              {...views.item}
            >
              {option.label}
            </Button>
          );
        })}
      </Horizontal>
      {}
      <input
        type="hidden"
        id={id}
        name={name}
        value={Array.isArray(value) ? value.join(',') : value}
        onChange={() => {}}
      />
    </FieldContainer>
  );
};
export default SelectorView;
