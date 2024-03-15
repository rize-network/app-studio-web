import { Shape, Variant } from './Toggle.type';

export interface ToggleProps {
  shape?: Shape;
  isToggled?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  variant?: Variant;
  colorScheme?: string;
  onToggle?: (isToggled: boolean) => void;
  [x: string]: any;
}

export interface ToggleViewProps extends ToggleProps {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isToggle: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}
