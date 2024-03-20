import React, { useCallback } from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toggle } from '../../Toggle/Toggle';
import { ToggleGroupViewProps } from './ToggleGroup.props';

export const ToggleGroupView = ({
  items,
  onToggleChange,
  activeToggles,
  setActiveToggles,
  shape = 'rounded',
  variant = 'ghost',
  colorScheme = 'color.trueGray.400',
}: ToggleGroupViewProps) => {
  const handleToggle = useCallback(
    (id: string, isActive: boolean) => {
      setActiveToggles((prevActiveToggles) => {
        let newActiveToggles;
        if (isActive) {
          // Add the ID only if it's not already included
          newActiveToggles = prevActiveToggles.includes(id)
            ? prevActiveToggles
            : [...prevActiveToggles, id];
        } else {
          // Remove the ID if it's included
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
