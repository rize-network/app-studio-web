import React from 'react';
// Defines an interface 'AspectRatioProps' for component properties.
export interface AspectRatioProps {
  // Optional 'ratio' prop specifying the aspect ratio, as a number.
  ratio?: number;
  // Optional 'children' prop that can be of type ReactNode, defining the child components.
  children?: React.ReactNode;
  // Allows for an indefinite number of additional properties with any types, adding flexibility to the props.
  [x: string]: any;
}
