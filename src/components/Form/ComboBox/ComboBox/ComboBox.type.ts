// Defines an interface for styles where keys are string properties and values are React.CSSProperties
export type Styles = {
  // Allows for any key to be used as long as it maps to a set of React.CSSProperties
  [key: string]: React.CSSProperties;
};
// Defines specific style properties for various parts of the ComboBox component
export type ComboBoxStyles = {
  // Style for the container element of the ComboBox
  container?: React.CSSProperties;
  // Style for the label of the ComboBox which can be of any type
  label?: any;
  // Style for the dropdown element of the ComboBox
  dropdown?: React.CSSProperties;
  // Style for each item within the ComboBox dropdown
  item?: React.CSSProperties;
  // Style for the container of the label element within the ComboBox
  labelContainer?: React.CSSProperties;
  // Style for the text property, which can accept any type, potentially allowing for extended customization.
  text?: any;
};
