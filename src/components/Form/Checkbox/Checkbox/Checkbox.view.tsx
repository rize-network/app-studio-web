import React from 'react';
import { Typography } from 'app-studio';

import { Center } from '../../../Layout/Center/Center';
import { Label } from '../../../Form/Label/Label';
import { TickIcon, MinusIcon } from '../../../Icon/Icon';

import { CheckboxViewProps } from './Checkbox.props';
import { IconSizes, Sizes } from './Checkbox.style';
import { Text } from '../../../Text/Text';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';
import { Vertical } from '../../../Layout/Vertical/Vertical';

const CheckboxView: React.FC<CheckboxViewProps> = ({
  id,
  icon,
  name,
  label,
  isChecked,
  onChange,
  onValueChange,
  shadow = {},
  labelPosition = 'right',
  size = 'md',
  error = false,
  isSelected = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isIndeterminate = false,
  defaultIsSelected = false,
  setIsSelected = () => {},
  setIsHovered = () => {},
  views = { checkbox: {}, label: {} },
  infoText,
  helperText,
  ...props
}) => {
  const handleHover = () => setIsHovered(!isHovered);

  const handleChange = () => {
    if (!isReadOnly && !isDisabled) {
      if (setIsSelected) setIsSelected(!isSelected);
      if (onChange) onChange(!isChecked);
      if (onValueChange) onValueChange(!isChecked);
    }
  };

  const checkboxStyle = {
    container: {
      gap: 10,
      display: 'flex',
      height: 'fit-content',
      flexDirection: 'column',
      width: 'fit-content',
      color: error
        ? 'theme.error'
        : isDisabled
        ? 'theme.disabled'
        : 'color.blueGray.700',
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer',
      ...views['label'],
    },
    checkbox: {
      ...(isDisabled
        ? { backgroundColor: 'theme.disabled' }
        : ((isChecked || isSelected) && !isIndeterminate) || isIndeterminate
        ? { backgroundColor: 'theme.primary' }
        : {
            borderWidth: 2,
            borderColor: error
              ? 'theme.error'
              : isHovered
              ? 'color.gray.500'
              : 'color.gray.300',
            borderStyle: 'solid',
          }),
      borderRadius: 3,
      ...(isHovered ? { filter: 'brightness(0.9)' } : {}),
      ...Sizes[size],
      ...shadow,
      ...views['checkbox'],
    },
  };

  return (
    <Label
      htmlFor={id}
      as="div"
      onClick={handleChange}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      size={Typography.fontSizes[size]}
      {...checkboxStyle.container}
      {...props}
    >
      <Vertical gap={8}>
        <Horizontal gap={10} alignItems="center">
          {labelPosition === 'left' && label && (
            <Text size={size} {...views?.label}>
              {label}
            </Text>
          )}

          <Center {...checkboxStyle.checkbox}>
            {isIndeterminate ? (
              <MinusIcon widthHeight={IconSizes[size]} color="white" />
            ) : (
              (isChecked || isSelected) &&
              (icon ?? <TickIcon widthHeight={IconSizes[size]} color="white" />)
            )}
          </Center>

          {labelPosition === 'right' && label && (
            <Text size={size} {...views?.label}>
              {label}
            </Text>
          )}
        </Horizontal>
        {infoText && (
          <Text
            marginLeft={labelPosition === 'left' ? 0 : 27}
            color="color.gray.400"
            size="sm"
            {...views?.infoText}
          >
            {infoText}
          </Text>
        )}
      </Vertical>
      {error && (
        <Text
          size="xs"
          marginVertical={0}
          marginHorizontal={0}
          color={'theme.error'}
        >
          {error}
        </Text>
      )}
    </Label>
  );
};

export default CheckboxView;
