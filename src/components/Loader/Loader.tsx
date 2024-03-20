import React from 'react';

import { LoaderProps } from './Loader/Loader.props';
import LoaderView from './Loader/Loader.view';

const LoaderComponent: React.FC<LoaderProps> = (props) => (
  <LoaderView {...props} />
);

/**
 * It  gives the user an insight about an action being processed. It may have an undefined waiting time or display the process length.
 */
export const Loader = LoaderComponent;
