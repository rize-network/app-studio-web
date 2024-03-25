// Imports the React library to be used in this component
import React from 'react';
// Imports a specific AlertView component from the Alert folder
import { AlertView } from './Alert/Alert.view';
// Imports AlertProps type definition for type-checking Alert component props
import { AlertProps } from './Alert/Alert.props';
// Declaration of the AlertComponent as a functional component
const AlertComponent = ({
  icon,
  title,
  styles,
  description,
  variant,
}: // Destructuring AlertProps type into individual props for the AlertComponent
AlertProps) => (
  <AlertView
    icon={icon}
    title={title}
    styles={styles}
    description={description}
    variant={variant}
    // The JSX code for rendering the AlertView with its props
  />
);
// Exports the AlertComponent for external use
export const Alert = AlertComponent;
