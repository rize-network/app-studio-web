import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
// Definition of the AlertComponent functional component with destructured props.
const AlertComponent = ({
  icon,
  title,
  views,
  description,
  variant,
}: AlertProps) => (
  <AlertView
    icon={icon}
    title={title}
    views={views}
    description={description}
    variant={variant}
  />
);
// Exporting the AlertComponent as 'Alert' for use in other parts of the application.
export const Alert = AlertComponent;
