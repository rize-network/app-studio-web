export type BorderWeights = 'light' | 'normal' | 'bold' | 'extrabold' | 'black';
// Defines a TypeScript type 'BorderWeights' that allows for any of these string literal values: 'light', 'normal', 'bold', 'extrabold', or 'black' to represent the weight (thickness) of borders.
export type Shape = 'sharp' | 'rounded' | 'pillShaped';
// Defines a TypeScript type 'Shape' which can be one of these string literals: 'sharp', 'rounded', or 'pillShaped', likely representing the shape of UI elements like buttons.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Creates a TypeScript type 'Size' for standardized size categories such as 'xs' for extra-small, 'sm' for small, 'md' for medium, 'lg' for large, or 'xl' for extra-large.
export type Loaders = 'spinner' | 'points' | 'points-opacity';
// Introduces a TypeScript type 'Loaders' which could be used to define the style of loading indicators from a set of predefined options: 'spinner', 'points', 'points-opacity'.
export type IconPosition = 'left' | 'right' | 'top' | 'bottom';
// Specifies a TypeScript type 'IconPosition' to define the position where an icon should be placed relative to another element, with possible values 'left' or 'right'.
export type LoaderPosition = 'left' | 'right';
// Specifying a 'LoaderPosition' type for positioning a loader on the 'left' or 'right' side within a component where it is used.
export type ColorScheme = 'primary' | 'secondary' | 'black' | 'white';

export type Variant =
  | 'filled'
  | 'outline'
  | 'empty'
  | 'ghost'
  | 'link'
  | 'subtle';

export type Animation = 'borderMoving' | 'animatedStroke';
// Declares a type 'Variant' used for styling components where each value—'filled', 'outline', 'link', 'ghost'—likely describes a visual style or theme, and 'borderMoving', 'animatedStroke' are special effect variants.
