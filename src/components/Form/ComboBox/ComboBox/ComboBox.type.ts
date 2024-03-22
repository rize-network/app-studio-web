export type Styles = {
  // Defines a type alias 'Styles' representing an object where each property is a string (key) with values of type 'React.CSSProperties'. This allows for a flexible object that can define any number of CSS properties for dynamic styling in React components.
  [key: string]: React.CSSProperties;
};
// Defines a type alias 'ComboBoxStyles' for specialized styling of ComboBox components, allowing optional custom styling for elements such as the container, label, dropdown, and item. The 'label' and 'text' properties accept any type, indicating flexibility in the data that can be used for rendering these elements.
export type ComboBoxStyles = {
  // The 'container' property within 'ComboBoxStyles' is optional and defines styling for the outermost wrapper of a ComboBox component, using React.CSSProperties for type.
  container?: React.CSSProperties;
  // The 'label' property is optional and can be of any type, which can include not only styling information but potentially other data, such as for accessibility or data attributes.
  label?: any;
  // The 'dropdown' property is optional and allows for defining the appearance of the dropdown list portion of the ComboBox, using React.CSSProperties.
  dropdown?: React.CSSProperties;
  // The 'item' property is optional and refers to the individual items within the dropdown list, enabling specific styling for each item.
  item?: React.CSSProperties;
  // The 'labelContainer' property is optional and is meant to style the container that might house the ComboBox's label, separate from the 'label' itself.
  labelContainer?: React.CSSProperties;
  // The 'text' property much like the 'label' property, is optionally any type, pointing to its flexibility in representing complex non-style based data or configurations, likely associated with the textual content within the ComboBox.
  text?: any;
};
