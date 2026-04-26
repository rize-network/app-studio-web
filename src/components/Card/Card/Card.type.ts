import { ViewProps } from 'app-studio';
// Defines the available visual variants for the Card component.
export type Variant = 'default' | 'outlined' | 'elevated';
// Specifies the predefined size options for the Card component.
export type Size = 'sm' | 'md' | 'lg';
// Determines the border-radius style or geometric shape of the Card.
export type Shape = 'square' | 'rounded' | 'pill';
// Defines the interface for custom styling properties applied to different sub-components of the Card.
export interface CardStyles {
  // Optional styling properties for the main container of the card.
  container?: ViewProps;
  // Optional styling properties for the header section of the card.
  header?: ViewProps;
  // Optional styling properties for the primary content area of the card.
  content?: ViewProps;
  // Optional styling properties for the footer section of the card.
  footer?: ViewProps;
}
