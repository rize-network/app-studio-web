import React from 'react';
import { AlertProps } from './Alert/Alert.props';
import { AlertView } from './Alert/Alert.view';

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

export const Alert = AlertComponent;
