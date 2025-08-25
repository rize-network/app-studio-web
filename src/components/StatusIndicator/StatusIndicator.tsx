import React from 'react';
import { StatusIndicatorProps } from './StatusIndicator/StatusIndicator.props';
import { StatusIndicatorView } from './StatusIndicator/StatusIndicator.view';

export const StatusIndicator = (props: StatusIndicatorProps) => (
  <StatusIndicatorView {...props} />
);
