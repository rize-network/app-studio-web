export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

export interface HoverCardContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
