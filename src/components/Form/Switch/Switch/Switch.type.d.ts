// Defines the Size type which can be one of several predefined string values representing size categories for the component
export type Size =
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
// Defines the SwitchStyles type for styling with optional CSSProperties for slider, circle, and label elements
export type SwitchStyles = {
  // Optional CSS properties to style the slider part of the switch
  slider?: CSSProperties;
  // Optional CSS properties to style the circle part that moves within the switch
  circle?: CSSProperties;
  // Optional CSS properties to style the label associated with the switch
  label?: CSSProperties;
};
