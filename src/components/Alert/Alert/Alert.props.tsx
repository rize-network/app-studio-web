import React from 'react';
import { ViewProps } from 'app-studio';
import { AlertStyles, Variant } from './Alert.type';
// Defines the AlertProps interface for alert components
export interface AlertProps extends ViewProps {
  // Optional icon property, expecting a React node element
  icon?: React.ReactNode;
  // Mandatory title property, must be a string
  title: string;
  // Mandatory description property, must be a string
  description: string | React.ReactNode;
  // Optional variant property to determine the style of the alert
  variant?: Variant;
  // Optional styles property to apply custom styles to the alert component
  views?: AlertStyles;
  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
  themeMode?: 'light' | 'dark';
}
