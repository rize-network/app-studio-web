// Defines the Size type which can be one of several predefined string values representing size categories for the component
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines the SwitchStyles type for styling with optional ViewProps for slider, circle, and label elements
export type SwitchStyles = {
  // Optional CSS properties to style the slider part of the switch
  slider?: ViewProps;
  // Optional CSS properties to style the circle part that moves within the switch
  circle?: ViewProps;
  // Optional CSS properties to style the label associated with the switch
  label?: ViewProps;
};
