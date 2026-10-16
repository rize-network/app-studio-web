import { ViewProps } from 'app-studio';
// Defines the available styles for highlighting the title text, including `underline`, `background`, `gradient`, `outline`, `glow`, `solid`, and `default`.
export type HighlightStyle =
  | 'underline'
  | 'background'
  | 'gradient'
  | 'outline'
  | 'glow'
  | 'solid'
  | 'default';
// Defines the predefined size options for the title component, such as `xs` (extra small), `sm` (small), `md` (medium), `lg` (large), and `xl` (extra large).
export type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines a type for custom styling properties applicable to different parts of the Title component.
export type TitleStyles = {
  // Optional `ViewProps` to apply custom styles to the main container of the Title component.
  container?: ViewProps;
  // Optional `ViewProps` to apply custom styles directly to the text element of the Title component.
  text?: ViewProps;
  // Optional `ViewProps` to apply custom styles to the highlight element associated with the Title text.
  highlight?: ViewProps;
};
