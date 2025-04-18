import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
// Definition of the AlertComponent functional component with props.
const AlertComponent = (props: AlertProps) => <AlertView {...props} />;
// Exporting the AlertComponent as 'Alert' for use in other parts of the application.
export const Alert = AlertComponent;
