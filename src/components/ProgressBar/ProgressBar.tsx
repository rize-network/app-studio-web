import React from 'react';
import { ProgressBarProps } from './ProgressBar/ProgressBar.props';
import ProgressBarView from './ProgressBar/ProgressBar.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Defines the main ProgressBar functional component, serving as the entry point for the ProgressBar UI by rendering the ProgressBarView with provided properties.
const ProgressBarComponent: React.FC<ProgressBarProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('progress', props);
  return <ProgressBarView {...mergedProps} />;
};
export const ProgressBar = ProgressBarComponent;
export * from './ProgressBar/ProgressBar.props';
