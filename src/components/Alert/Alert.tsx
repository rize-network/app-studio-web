import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
// Definition of the AlertComponent functional component with destructured props.
const AlertComponent = ({
  icon,
  title,
  styles,
  description,
  variant,
}: AlertProps) => (
  <AlertView
    icon={icon}
    title={title}
    styles={styles}
    description={description}
    variant={variant}
  />
);
// Exporting the AlertComponent as 'Alert' for use in other parts of the application.
export const Alert = AlertComponent;
