import React, { useCallback } from 'react';
import { useTheme } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { Button } from '../../../Button/Button';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { InfoIcon } from '../../../Icon/Icon';
import { SelectorViewProps } from './Selector.props';
import { Option } from './Selector.type';

/**
 * SelectorView Component
 *
 * Renders a segmented control style selector.
 */
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
  const { getColor } = useTheme();

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
          color="color.black.500"
          fontWeight="bold"
          marginBottom={12}
          alignItems="center"
          gap={6}
          //Text transform uppercase
          style={{ textTransform: 'uppercase' }}
        >
          <InfoIcon widthHeight={14} /> <Text>{label}</Text>
        </Horizontal>
      )}
      <Horizontal gap={0}>
        {options.map((option, index, arr) => {
          const isSelected = value === option.value;
          let borderColor = getColor('color.gray.200');
          let textColor = getColor('color.gray.500');
          let bgColor = 'transparent';

          if (isSelected) {
            if (option.color) {
              // If option has a specific color, use it
              // Note: This requires the color string to be a valid color key or value
              // We might need to resolve it if it's a theme token, but here we assume the logic
              // matches usage where basic colors are passed or handled.
              // For now, let's try to infer from the option label or value if no color provided,
              // OR stick to a default primary color if no specific 'complexity' logic is desired.
              // However, the user specifically asked for "Complexity" look.
              // Let's rely on option.color if present.
              const baseColorName = option.color; // e.g., 'color.red.500'
              // We need a way to get related colors (50, 500, 700 etc) from a base color if we want full fidelity.
              // But passing full style strings is easier.
              borderColor = getColor(option.color);
              textColor = getColor(option.color);
              // Try to approximate background color if possible, or just use white/transparent.
              // Simplification: if color provided, use it for border/text.
              // Background is hard to derive without more specific props.
              // Let's try to use a very light opacity of the color for background.
              bgColor = 'rgba(0,0,0,0.05)'; // Generic active background
            } else {
              // Default active style
              const primary = getColor('theme.primary');
              borderColor = primary;
              textColor = primary;
              bgColor = 'color.gray.50';
            }

            // Specific overrides based on user request "ComplexitySelector" style
            // If the values match 'High', 'Medium', 'Low' we can hardcode for *demo* fidelity if generic logic fails.
            // But let's try to make it generic.
            // The user simply pasted code.

            if (option.color) {
              // Fallback for customized options
              borderColor = getColor(option.color);
              textColor = getColor(option.color);
              bgColor = 'transparent';
            } else {
              // Default fallback
              borderColor = getColor('theme.primary');
              textColor = getColor('theme.primary');
              bgColor = 'transparent';
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
                    // Legacy default: keep existing compact look when `size` isn't specified.
                    paddingVertical: 6,
                    fontSize: '12px',
                  })}
              fontWeight={isSelected ? 'bold' : 'normal'}
              style={{
                borderTop: `1px solid ${
                  isSelected ? borderColor : getColor('color.gray.200')
                }`,
                borderBottom: `1px solid ${
                  isSelected ? borderColor : getColor('color.gray.200')
                }`,
                borderLeft: `1px solid ${
                  isSelected ? borderColor : getColor('color.gray.200')
                }`,
                borderRight:
                  index === arr.length - 1 || isSelected
                    ? `1px solid ${
                        isSelected ? borderColor : getColor('color.gray.200')
                      }`
                    : 'none',
                backgroundColor: bgColor,
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
      {/* Hidden input for form submission compatibility */}
      <input
        type="hidden"
        id={id}
        name={name}
        value={Array.isArray(value) ? value.join(',') : value}
        onChange={() => {}} // Read-only
      />
    </FieldContainer>
  );
};
export default SelectorView;
