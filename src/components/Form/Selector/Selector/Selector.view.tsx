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
  helperText,
  error = false,
  isDisabled = false,
  isReadOnly = false,
  onChange = () => {},
  setValue = () => {},
  // Internal state plumbing and field-shell props with no DOM equivalent on
  // this control: pulled out so they stay off the rendered elements.
  hide,
  setHide,
  isHovered,
  setIsHovered,
  isFocused,
  setIsFocused,
  placeholder,
  isMulti,
  shape,
  variant,
  size,
  shadow,
  isScrollable,
  // Pulled out so an explicit caller label can name the group; the visible
  // label names it via `aria-labelledby` otherwise.
  'aria-label': ariaLabel,
  ...props
}) => {
  const generatedId = React.useId();
  const selectorId = id ?? generatedId;
  const labelId = `${selectorId}-label`;
  const helperTextId = `${selectorId}-helper-text`;
  const hasHelper = Boolean(helperText);

  const handleCallback = useCallback(
    (option: Option) => {
      if (isDisabled || isReadOnly) return;
      setValue(option.value);
      if (onChange) onChange(option.value);
    },
    [setValue, onChange, isDisabled, isReadOnly]
  );

  return (
    <FieldContainer id={selectorId} width="100%" views={views} {...props}>
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
          <InfoIcon widthHeight={14} /> <Text id={labelId}>{label}</Text>
        </Horizontal>
      )}
      <Horizontal
        gap={0}
        // A single-choice segmented control is a radio group: without the role
        // the options are anonymous buttons and the group has no name at all.
        role="radiogroup"
        aria-labelledby={!ariaLabel && label ? labelId : undefined}
        aria-label={ariaLabel}
        aria-describedby={hasHelper ? helperTextId : undefined}
        aria-readonly={isReadOnly || undefined}
        aria-invalid={error ? true : undefined}
      >
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
              role="radio"
              aria-checked={isSelected}
              disabled={isDisabled}
              onClick={() => handleCallback(option)}
              flex={1}
              // Segments stay on one line and ellipsise. Without this a long
              // option label wrapped word-by-word inside its segment, turning a
              // single-row control into a multi-line block (three long options
              // in a narrow column reached ~100px tall).
              //
              // `minWidth: 0` is required: a `flex: 1` child will not shrink
              // below its content width while `min-width` is `auto`, so the
              // ellipsis would never appear.
              minWidth={0}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              textAlign="center"
              paddingVertical={6}
              paddingHorizontal={12}
              fontSize="12px"
              fontWeight={isSelected ? 'bold' : 'normal'}
              cursor={
                isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer'
              }
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
        id={`${selectorId}-input`}
        name={name}
        value={Array.isArray(value) ? value.join(',') : value}
        onChange={() => {}}
      />
      {hasHelper && (
        <Text
          id={helperTextId}
          fontSize="11px"
          lineHeight="16px"
          marginTop={0}
          fontWeight={error ? '500' : '400'}
          color={error ? 'color-red-500' : 'color-gray-500'}
          transition="color 0.2s ease, opacity 0.2s ease"
          {...views.helperText}
        >
          {helperText}
        </Text>
      )}
    </FieldContainer>
  );
};

export default SelectorView;
