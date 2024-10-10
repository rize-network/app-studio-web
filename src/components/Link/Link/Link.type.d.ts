// Defines a union type for text decoration styles which can be 'default', 'hover', or 'underline'.
export type TextDecorationStyle = 'default' | 'hover' | 'underline';
// Begins the declaration of a 'Styles' type that will specify the shape of style properties for the Link component.
export type Styles = {
// Optional 'icon' property of type 'CSSProperties' to define styles for the icon within the link.
  icon?: CSSProperties;
// Optional 'text' property of type 'CSSProperties' to define styles for the text within the link.
  text?: CSSProperties;
};
// Begins the declaration of a 'Size' type to dictate allowable size options for the Link component.
export type Size =
// The 'Size' type includes 'xs' as one of its possible values for the size of the Link component.
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
// The 'Size' type includes '6xl' as its largest defined value for the size of the Link component.
  | '6xl';
