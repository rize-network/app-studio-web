import React from 'react';
import { Typography } from 'app-studio';
import { Center } from '../../../Layout/Center/Center';
import { Label } from '../../../Form/Label/Label';
import { CheckSvg, IndeterminateSvg } from '../../../Svg';

import { CheckboxViewProps } from './Checkbox.props';
import { IconSizes, Sizes } from './Checkbox.style';

const CheckboxView: React.FC<CheckboxViewProps> = ({
  id,
  icon,
  name,
  label,
  isChecked,
  onChange,
  onValueChange,
  shadow = {},
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
      <Center {...checkboxStyle.checkbox}>
        {isIndeterminate ? (
          <IndeterminateSvg />
        ) : (
          (isChecked || isSelected) &&
          (icon ?? <CheckSvg size={IconSizes[size]} />)
        )}
      </Center>
      {label}
    </Label>
  );
};

export default CheckboxView;
