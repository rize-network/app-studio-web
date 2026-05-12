import React, { useCallback } from 'react';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { InfoIcon } from '../../../Icon/Icon';
import { SelectorViewProps } from './Selector.props';
import { Option } from './Selector.type';

const SelectorView: React.FC<SelectorViewProps> = ({
  id,
  name,
  label,
  value,
  views = {},
  options = [],
  onChange = () => {},
  setValue = () => {},
}) => {
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
          const accent = option.color ?? 'theme-primary';
          const borderToken = isSelected ? accent : 'color-gray-200';
          const textToken = isSelected ? accent : 'color-gray-500';
          const isFirst = index === 0;
          const isLast = index === arr.length - 1;
          const showRightBorder = isLast || isSelected;

          return (
            <View
              key={option.value}
              as="button"
              type="button"
              onClick={() => handleCallback(option)}
              flex={1}
              paddingVertical={6}
              paddingHorizontal={12}
              fontSize="12px"
              fontWeight={isSelected ? 'bold' : 'normal'}
              cursor="pointer"
              backgroundColor="transparent"
              color={textToken}
              borderStyle="solid"
              borderColor={borderToken}
              borderTopWidth={1}
              borderBottomWidth={1}
              borderLeftWidth={1}
              borderRightWidth={showRightBorder ? 1 : 0}
              borderRadius={
                isFirst ? '6px 0 0 6px' : isLast ? '0 6px 6px 0' : '0'
              }
              zIndex={isSelected ? 1 : 0}
              transition="color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease"
              {...views.item}
            >
              {option.label}
            </View>
          );
        })}
      </Horizontal>
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
