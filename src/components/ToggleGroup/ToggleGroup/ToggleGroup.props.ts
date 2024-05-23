export interface ToggleGroupProps {}
import { Shape, ToggleItem, Variant } from './ToggleGroup.type';
// Defines the structure for ToggleGroup component properties.
export interface ToggleGroupProps {
  // Optional shape prop to define the shape of toggle elements.
  shape?: Shape;
  // Mandatory array of items defining each toggle in the group.
  items: ToggleItem[];
  // Optional variant prop to specify the visual style of the toggle group.
  variant?: Variant;
  // Optional colorScheme prop for theming the toggle group.
  colorScheme?: string;
  // Optional callback function that fires when the active toggle changes, providing the IDs of active toggles.
  onToggleChange?: (activeIds: string[]) => void;
  // Allows the ToggleGroupProps to accept additional properties dynamically.
  [x: string]: any;
}
// Interface extending ToggleGroup props for use in the ToggleGroupView component.
export interface ToggleGroupViewProps extends ToggleGroupProps {
  // Array storing the IDs of active toggles within the group.
  activeToggles: string[];
  setActiveToggles: React.Dispatch<React.SetStateAction<string[]>>;
}
