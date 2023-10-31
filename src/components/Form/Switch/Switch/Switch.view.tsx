import React from 'react';
import { Input } from 'app-studio';
import { Label } from 'src/components/Form/Label/Label';
import { View } from 'src/components/Layout/View/View';

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
  on = false,
  isHovered = false,
  isChecked = false,
  isDisabled = false,
  isReadOnly = false,
  onChange,
  onValueChange,
  setOn = () => {},
  setIsHovered = () => {},
  styles = { slider: {}, circle: {} },
  ...props
}) => {
  const handleToggle = (event: any) => {
    if (!isReadOnly) {
      setOn(!on);
      if (onChange) onChange(event);
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
        checked={on}
        onChange={handleToggle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...(onValueChange && { onValueChange: handleToggle })}
        {...props}
      />
      {/* Slide */}
      <View
        display="flex"
        cursor="pointer"
        alignItems="center"
        borderRadius={24}
        filter={isHovered && on ? 'brightness(0.9)' : 'brightness(1)'}
        transition="justify-content 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        backgroundColor={isDisabled ? 'disabled' : on ? colorScheme : 'lightgray'}
        justifyContent={activeChild ? 'space-between' : on ? 'flex-end' : 'flex-start'}
        {...shadow}
        {...SliderPadding[size]}
        {...SliderSizes[size]}
        {...styles['slider']}
      >
        {activeChild && on && <View>{activeChild}</View>}
        <View borderRadius="50%" backgroundColor="white" {...KnobSizes[size]} {...styles['circle']} />
        {inActiveChild && !on && <View>{inActiveChild}</View>}
      </View>
    </Label>
  );
};

export default SwitchView;
