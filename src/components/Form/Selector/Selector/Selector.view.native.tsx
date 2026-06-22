/**
 * SelectorView (React Native)
 *
 * Identical segmented-control UI to the web view, minus the trailing hidden
 * `<input type="hidden">` (a web-only form-submission shim that crashes the RN
 * renderer). `as="button"` collapses to a Pressable on native and `onClick`
 * maps to `onPress`, so the segments stay fully interactive.
 */

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
              onClick={() => handleCallback(option)}
              flex={1}
              alignItems="center"
              paddingVertical={6}
              paddingHorizontal={12}
              backgroundColor="transparent"
              borderStyle="solid"
              borderColor={borderToken}
              borderTopWidth={1}
              borderBottomWidth={1}
              borderLeftWidth={1}
              borderRightWidth={showRightBorder ? 1 : 0}
              borderTopLeftRadius={isFirst ? 6 : 0}
              borderBottomLeftRadius={isFirst ? 6 : 0}
              borderTopRightRadius={isLast ? 6 : 0}
              borderBottomRightRadius={isLast ? 6 : 0}
              zIndex={isSelected ? 1 : 0}
              {...views.item}
            >
              <Text
                fontSize="12px"
                fontWeight={isSelected ? 'bold' : 'normal'}
                color={textToken}
              >
                {option.label}
              </Text>
            </View>
          );
        })}
      </Horizontal>
    </FieldContainer>
  );
};

export default SelectorView;
