// Defines the possible shapes for the toggle button within the group.
export type Shape = 'square' | 'rounded' | 'pill';
// Specifies the visual styles or variants the toggle button can have.
export type Variant = 'outline' | 'link' | 'ghost';
// Begins the definition of the data structure for each toggle item in the group.
export type ToggleItem = {
  // Unique identifier for the toggle item, used for distinguishing between items.
  id: string;
  // The content rendered inside the toggle item, which can be any React node.
  value: React.ReactNode;
  // Optional boolean representing toggle item's current state (on/off).
  state?: boolean;
  // Optional flag to disable interaction with the toggle item.
  isDisabled?: boolean;
  // Optional flag indicating whether the toggle item is the active/selected one.
  isActive?: boolean;
};
