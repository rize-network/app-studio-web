import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
const AlertComponent = ({
  icon,
  // The 'AlertProps' are the expected props for this component which include 'icon', 'title', 'styles', 'description', and 'variant'.
  // Defines 'AlertComponent', a functional component in React that utilizes destructuring to extract 'AlertProps'.
  title,
  styles,
  // Renders the 'AlertView' component and passes the extracted props into it.
  description,
  variant,
}: AlertProps) => (
  <AlertView
    icon={icon}
    title={title}
    styles={styles}
    // Exports the 'AlertComponent' as 'Alert' to be used in other parts of the application.
    description={description}
    variant={variant}
  />
);
export const Alert = AlertComponent;
