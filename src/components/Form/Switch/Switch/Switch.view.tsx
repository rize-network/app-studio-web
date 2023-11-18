import React from 'react';
import { Input } from 'app-studio';
import { Label } from '../../../Form/Label/Label';
import { View } from '../../../Layout/View/View';

import { SwitchViewProps } from './Switch.props';
import { KnobSizes, SliderPadding, SliderSizes } from './Switch.style';

const SwitchContent = (props: any) => <Input type="checkbox" {...props} />;

const SwitchView: React.FC<SwitchViewProps> = ({
  id,
  name,
  inActiveChild,
  activeChild,
  shadow = {},
  size = 'sm',
  colorScheme = 'theme.primary',
  value = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  onChange,
  setValue = () => {},
  setIsHovered = () => {},
  styles = { slider: {}, circle: {} },
  ...props
}) => {
  const handleToggle = (event: any) => {
    if (!isReadOnly) {
      setValue(!value);
      if (onChange) onChange(event.target.checked);
    }
  };

  const handleHover = () => setIsHovered(!isHovered);

  return (
    <Label htmlFor={id} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <SwitchContent
        id={id}
        name={name}
        opacity={0}
        width={0}
        height={0}
        checked={value}
        onChange={handleToggle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...props}
      />
      {/* Slide */}
      <View
        display="flex"
        cursor="pointer"
        alignItems="center"
        borderRadius={24}
        marginBottom={5}
        filter={isHovered && value ? 'brightness(0.9)' : 'brightness(1)'}
        transition="justify-content 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        backgroundColor={
          isDisabled ? 'disabled' : value ? colorScheme : 'lightgray'
        }
        justifyContent={
          activeChild ? 'space-between' : value ? 'flex-end' : 'flex-start'
        }
        {...shadow}
        {...SliderPadding[size]}
        {...SliderSizes[size]}
        {...styles['slider']}
      >
        {activeChild && value && <View>{activeChild}</View>}
        <View
          borderRadius="50%"
          backgroundColor="white"
          {...KnobSizes[size]}
          {...styles['circle']}
        />
        {inActiveChild && !value && <View>{inActiveChild}</View>}
      </View>
    </Label>
  );
};

export default SwitchView;
