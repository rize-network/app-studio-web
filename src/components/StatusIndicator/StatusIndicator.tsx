import React from 'react';
import { StatusIndicatorProps } from './StatusIndicator/StatusIndicator.props';
import { StatusIndicatorView } from './StatusIndicator/StatusIndicator.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// This component serves as the main entry point for the StatusIndicator, acting as a functional component that primarily renders the StatusIndicatorView, passing all received props directly to it. Its purpose is to define the core StatusIndicator component.
export const StatusIndicator = (props: StatusIndicatorProps) => {
  const mergedProps = useMergedDesignSystemComponentProps('status', props);
  return <StatusIndicatorView {...mergedProps} />;
};
