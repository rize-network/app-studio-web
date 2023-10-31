import React from 'react';

export interface WrapperFieldProps {
  /**
   * The content to be rendered inside the Wrapper Field.
   */
  children?: React.ReactNode;
  /**
   * Additional properties and attributes for the field.
   */
  [x: string]: any;
}
