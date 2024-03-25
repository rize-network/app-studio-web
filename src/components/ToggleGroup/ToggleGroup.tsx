import React from 'react';
import { ToggleGroupProps } from './ToggleGroup/ToggleGroup.props';
import { useToggleGroupState } from './ToggleGroup/ToggleGroup.state';
import { ToggleGroupView } from './ToggleGroup/ToggleGroup.view';
// Define the functional component with destructured props
const ToggleGroupComponent = ({
  // Destructure 'items' prop which represents the group items to toggle
  items,
  // Destructure 'shape' prop to define the shape of the toggle buttons
  shape,
  // Destructure 'colorScheme' prop for toggle button styling
  colorScheme,
  // Destructure 'variant' prop to determine the visual style of the toggle group
  variant,
  // Destructure 'onToggleChange' prop for the callback when toggle state changes
  onToggleChange,
}: ToggleGroupProps) => {
  // Hook to manage toggle group state, returns active toggles and a setter for it
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
// Expose the ToggleGroupComponent for import into other modules
export const ToggleGroup = ToggleGroupComponent;
