import React from 'react';
import { Typography } from 'app-studio';
import { Center } from '../../../Layout/Center/Center';
import { Label } from '../../../Form/Label/Label';
import { CheckSvg, IndeterminateSvg } from '../../../Svg';

import { CheckboxViewProps } from './Checkbox.props';
import { IconSizes, Sizes } from './Checkbox.style';
import { Text } from '../../../Text/Text';
import { Horizontal, Vertical } from 'src/components/Layout';

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
  colorScheme = 'theme.primary',
  error = false,
  isSelected = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isIndeterminate = false,
  defaultIsSelected = false,
  setIsSelected = () => {},
  setIsHovered = () => {},
  styles = { checkbox: {}, label: {} },
  infoText,
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
      alignItems: 'center',
      height: 'fit-content',
      width: 'fit-content',
      color: error
        ? 'theme.error'
        : isDisabled
        ? 'theme.disabled'
        : 'color.blueGray.700',
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer',
      ...styles['label'],
    },
    checkbox: {
      ...(isDisabled
        ? { backgroundColor: 'theme.disabled' }
        : ((isChecked || isSelected) && !isIndeterminate) || isIndeterminate
        ? { backgroundColor: colorScheme }
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
      filter: isHovered ? 'brightness(0.9)' : undefined,
      ...Sizes[size],
      ...shadow,
      ...styles['checkbox'],
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
            <Text size={size} {...styles?.label}>
              {label}
            </Text>
          )}
          <Center {...checkboxStyle.checkbox}>
            {isIndeterminate ? (
              <IndeterminateSvg />
            ) : (
              (isChecked || isSelected) &&
              (icon ?? <CheckSvg size={IconSizes[size]} />)
            )}
          </Center>
          {labelPosition === 'right' && label && (
            <Text size={size} {...styles?.label}>
              {label}
            </Text>
          )}
        </Horizontal>
        {infoText && (
          <Text
            marginLeft={labelPosition === 'left' ? 0 : 27}
            color="color.gray.400"
            size="sm"
            {...styles?.infoText}
          >
            {infoText}
          </Text>
        )}
      </Vertical>
    </Label>
  );
};

export default CheckboxView;
