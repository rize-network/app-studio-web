import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Definition of the AlertComponent functional component with props.
const AlertComponent = (props: AlertProps) => {
  const mergedProps = useMergedDesignSystemComponentProps('alert', props);
  return <AlertView {...mergedProps} />;
};
// Exporting the AlertComponent as 'Alert' for use in other parts of the application.
export const Alert = AlertComponent;
