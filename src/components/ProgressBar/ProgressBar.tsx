import React from 'react';
import { ProgressBarProps } from './ProgressBar/ProgressBar.props';
import ProgressBarView from './ProgressBar/ProgressBar.view';

/**
 * ProgressBar component displays completion status of a task or process.
 */
const ProgressBarComponent: React.FC<ProgressBarProps> = (props) => (
  <ProgressBarView {...props} />
);

export const ProgressBar = ProgressBarComponent;
