export interface ToggleGroupProps {}
import { Shape, ToggleItem, Variant } from './ToggleGroup.type';

export interface ToggleGroupProps {
  shape?: Shape;
  items: ToggleItem[];
  variant?: Variant;
  colorScheme?: string;
  onToggleChange?: (activeIds: string[]) => void;
  [x: string]: any;
}

export interface ToggleGroupViewProps extends ToggleGroupProps {
  activeToggles: string[];
  setActiveToggles: React.Dispatch<React.SetStateAction<string[]>>;
}
