import React from 'react';
import { LoaderProps } from './Loader/Loader.props';
import LoaderView from './Loader/Loader.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Defines a LoaderComponent as a functional component with props defined by LoaderProps and returns the LoaderView component, passing along any received props.
const LoaderComponent: React.FC<LoaderProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('loader', props);
  // Renders the LoaderView component by spreading the received props, which allows for a clean pass-through of properties.
  return <LoaderView {...mergedProps} />;
};
// Exports the LoaderComponent as Loader, making it available for use in other parts of the application.
export const Loader = LoaderComponent;
