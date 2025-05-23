import { ViewProps } from 'app-studio';

/**
 * Highlight style options for the Title component
 */
export type HighlightStyle =
  | 'underline' // Underline the text
  | 'background' // Background color highlight
  | 'gradient' // Gradient background
  | 'outline' // Text with outline
  | 'glow'; // Text with glow effect

/**
 * Title size options
 */
export type TitleSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

/**
 * Title styles for customization
 */
export type TitleStyles = {
  container?: ViewProps;
  text?: ViewProps;
  highlight?: ViewProps;
};
