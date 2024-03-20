import React from 'react';
import { AlertView } from './Alert/Alert.view';
import { AlertProps } from './Alert/Alert.props';

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
