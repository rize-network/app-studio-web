export type Shape = 'sharp' | 'rounded' | 'pillShaped';

export type Variant = 'outline' | 'link' | 'ghost';

export type ToggleItem = {
  id: string;
  value: React.ReactNode;
  state?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
};
