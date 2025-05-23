export interface ToggleGroupProps {}
import { InputProps, ViewProps } from 'app-studio';
import { Shape, ToggleItem, Variant } from './ToggleGroup.type';
// Defines the structure for ToggleGroup component properties.
export interface ToggleGroupProps extends Omit<InputProps, 'size'> {
  // Optional shape prop to define the shape of toggle elements.
  shape?: Shape;
  // Mandatory array of items defining each toggle in the group.
  items: ToggleItem[];
  // Optional variant prop to specify the visual style of the toggle group.
  variant?: Variant;
  // Optional callback function that fires when the active toggle changes, providing the IDs of active toggles.
  onToggleChange?: (activeIds: string[]) => void;
}
// Interface extending ToggleGroup props for use in the ToggleGroupView component.
export interface ToggleGroupViewProps extends Omit<ToggleGroupProps, ''> {
  // Array storing the IDs of active toggles within the group.
  activeToggles: string[];
  setActiveToggles: React.Dispatch<React.SetStateAction<string[]>>;
  views?: {
    container?: ViewProps;
    toggle?: ViewProps;
  };
}
