import { ViewProps, TextProps } from 'app-studio';

export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'light' | 'dark';

export interface TooltipContextType {
  isOpen: boolean;
  openTooltip: () => void;
  closeTooltip: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLElement>;
  contentId: string;
  triggerId: string;
}

export interface TooltipStyles {
  container?: ViewProps;
  content?: ViewProps;
  arrow?: ViewProps;
  text?: TextProps;
}
