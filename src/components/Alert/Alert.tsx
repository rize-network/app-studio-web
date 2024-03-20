import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
const AlertComponent = ({
  icon,
  title,
  // The component destructures its props to individually pass them into the AlertView component.
  // AlertComponent is a functional component that serves as a wrapper for AlertView.
  styles,
  // The component is rendering AlertView with the props: icon, title, styles, description, and variant.
  description,
  variant,
}: AlertProps) => (
  <AlertView
    // Exporting AlertComponent as Alert for use in other parts of the application.
    icon={icon}
    title={title}
    styles={styles}
    description={description}
    variant={variant}
  />
);
export const Alert = AlertComponent;
