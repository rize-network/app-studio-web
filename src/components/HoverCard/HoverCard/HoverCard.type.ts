export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

export interface HoverCardContextType {
  isOpen: boolean;
  openCard: () => void;
  closeCard: () => void;
  cancelCloseTimer: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  contentId: string;
  triggerId: string;
}
