export interface ToggleGroupProps {}
// Defines an empty interface `ToggleGroupProps` as a placeholder for later expansion or to signify its usage for type-checking or component prop definition.
import { Shape, ToggleItem, Variant } from './ToggleGroup.type';
// Imports specific types `Shape`, `ToggleItem`, and `Variant` from './ToggleGroup.type' which are to be used within the `ToggleGroupProps` interface definition.
export interface ToggleGroupProps {
  // Extends `ToggleGroupProps` to include optional properties such as `shape', 'items`, `variant`, `colorScheme`, and a method `onToggleChange` for handling changes, as well as an Index Signature to allow any additional properties.
  shape?: Shape;
  items: ToggleItem[];
  variant?: Variant;
  colorScheme?: string;
  // `ToggleGroupViewProps` interface extends `ToggleGroupProps` and adds two more properties: `activeToggles` to keep track of active toggle items, and `setActiveToggles` as a dispatch function to update the active items state.
  onToggleChange?: (activeIds: string[]) => void;
  [x: string]: any;
}
export interface ToggleGroupViewProps extends ToggleGroupProps {
  activeToggles: string[];
  setActiveToggles: React.Dispatch<React.SetStateAction<string[]>>;
}
