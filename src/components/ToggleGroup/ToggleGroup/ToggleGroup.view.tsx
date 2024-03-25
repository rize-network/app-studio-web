import React, { useCallback } from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toggle } from '../../Toggle/Toggle';
import { ToggleGroupViewProps } from './ToggleGroup.props';
// ToggleGroupView component declaration with destructured properties from props.
export const ToggleGroupView = ({
  // Prop 'items' defines the list of toggle elements to be rendered.
  items,
  // Prop 'onToggleChange' is a callback function triggered when the toggle state changes.
  onToggleChange,
  // Prop 'activeToggles' holds the array of active toggle identifiers.
  activeToggles,
  // Prop 'setActiveToggles' is a function to update the active toggle states.
  setActiveToggles,
  // Prop 'shape' with default value 'rounded', determines the shape of the toggle buttons.
  shape = 'rounded',
  // Prop 'variant' with default value 'ghost' represents the visual style variant of the toggles.
  variant = 'ghost',
  // Prop 'colorScheme' with default value 'color.trueGray.400' sets the color theme for toggles.
  colorScheme = 'color.trueGray.400',
}: ToggleGroupViewProps) => {
  // handleToggle is a memoized callback that handles the toggle state changes.
  const handleToggle = useCallback(
    (id: string, isActive: boolean) => {
      setActiveToggles((prevActiveToggles) => {
        let newActiveToggles;
        if (isActive) {
          newActiveToggles = prevActiveToggles.includes(id)
            ? prevActiveToggles
            : [...prevActiveToggles, id];
        } else {
          newActiveToggles = prevActiveToggles.filter(
            (toggleId) => toggleId !== id
          );
        }
        onToggleChange?.(newActiveToggles);
        return newActiveToggles;
      });
    },
    [onToggleChange, setActiveToggles]
  );
  return (
    <Horizontal role="ToggleGroup" display="flex" gap={5}>
      {items.map((item) => (
        <Toggle
          role={`toggle-${item.id}`}
          key={item.id}
          colorScheme={colorScheme}
          shape={shape}
          variant={variant}
          isToggled={activeToggles.includes(item.id) || item.isActive}
          onToggle={(state) => handleToggle(item.id, state)}
          isDisabled={item.isDisabled}
          isIntern={true}
        >
          {item.value}
        </Toggle>
      ))}
    </Horizontal>
  );
};
