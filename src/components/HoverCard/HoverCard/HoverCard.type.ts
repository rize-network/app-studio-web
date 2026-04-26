// Defines the possible positions for the hover card relative to its trigger.
export type Side = 'top' | 'right' | 'bottom' | 'left';
// Defines the possible alignment options for the hover card content.
export type Alignment = 'start' | 'center' | 'end';
// Defines the shape of the context object provided to children of the HoverCard.
export interface HoverCardContextType {
  // Indicates whether the hover card content is currently open or visible.
  isOpen: boolean;
  // Function to explicitly open the hover card content.
  openCard: () => void;
  // Function to explicitly close the hover card content.
  closeCard: () => void;
  // Function to cancel any pending timer that would close the hover card.
  cancelCloseTimer: () => void;
  // A ref object pointing to the DOM element that triggers the hover card.
  triggerRef: React.RefObject<HTMLDivElement>;
  // A ref object pointing to the DOM element representing the hover card's content.
  contentRef: React.RefObject<HTMLDivElement>;
  // A unique identifier for the hover card's content element.
  contentId: string;
  // A unique identifier for the hover card's trigger element.
  triggerId: string;
}
