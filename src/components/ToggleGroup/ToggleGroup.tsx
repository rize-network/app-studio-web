import React from 'react';
import { ToggleGroupProps } from './ToggleGroup/ToggleGroup.props';
import { useToggleGroupState } from './ToggleGroup/ToggleGroup.state';
import { ToggleGroupView } from './ToggleGroup/ToggleGroup.view';

const ToggleGroupComponent = ({
  items,
  shape,
  colorScheme,
  variant,
  onToggleChange,
}: ToggleGroupProps) => {
  const { activeToggles, setActiveToggles } = useToggleGroupState();

  return (
    <ToggleGroupView
      items={items}
      shape={shape}
      colorScheme={colorScheme}
      variant={variant}
      activeToggles={activeToggles}
      setActiveToggles={setActiveToggles}
      onToggleChange={onToggleChange}
    />
  );
};

export const ToggleGroup = ToggleGroupComponent;
