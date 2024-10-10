// Defines the Size type representing permissible sizes for the Loader component
export type Size =
// Extra small size option for the Loader component
  | 'xs'
// Small size option for the Loader component
  | 'sm'
// Medium size option for the Loader component
  | 'md'
// Large size option for the Loader component
  | 'lg'
// Extra large size option for the Loader component
  | 'xl'
// 2 times extra large size option for the Loader component
  | '2xl'
// 3 times extra large size option for the Loader component
  | '3xl'
// 4 times extra large size option for the Loader component
  | '4xl'
// 5 times extra large size option for the Loader component
  | '5xl'
// 6 times extra large size option for the Loader component
  | '6xl';
// Defines the LoaderType type for different Loader visual styles
export type LoaderType = 'default' | 'dotted' | 'quarter';
// Defines the TextPosition type for text positioning relative to the Loader
export type TextPosition = 'right' | 'left' | 'top' | 'bottom';
// Defines the Speed type representing different speed options for the Loader's animation
export type Speed = 'fast' | 'normal' | 'slow';
