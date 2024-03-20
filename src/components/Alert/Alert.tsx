import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
// React import is required to use JSX in the code.
const AlertComponent = ({
  // AlertView is a custom component imported to be used in the AlertComponent.
  icon,
  // AlertProps is the TypeScript interface or type being imported to type-check the component props.
  title,
  // Destructuring is used here to directly extract the properties from the props object passed to the AlertComponent.
  // AlertComponent is a stateless functional component, utilizing ES6 arrow function syntax.
  styles,
  description,
  variant,
}: AlertProps) => (
  <AlertView
    // The AlertComponent renders the AlertView component with the destructured props.
    icon={icon}
    title={title}
    styles={styles}
    // Exporting AlertComponent as Alert to be used in other parts of the application.
    description={description}
    variant={variant}
  />
);
export const Alert = AlertComponent;
