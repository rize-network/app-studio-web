export type TextWeights =
  // Defines a TypeScript type 'TextWeights' which allows specifying the visual weight (thickness) of text, with predefined values ranging from 'hairline' to 'black'.
  | 'hairline'
  // Each value corresponds to a conventional font weight used in styling.
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';
// Defines a TypeScript type 'Sizes' to standardize the sizing scale for UI elements. Predefined sizes range from 'xs' for extra small to '6xl' for 6 times extra large.
export type Sizes =
  // This type can be used for consistent application of size-related styling across the application.
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  // Defines a TypeScript type 'Headings' to ensure heading elements use one of the standard HTML heading tags, such as 'h1' to 'h6'.
  | '6xl';
// Enforcing the use of this type can enhance semantic markup and accessibility of the web app.
export type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
