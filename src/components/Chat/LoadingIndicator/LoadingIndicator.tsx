/**
 * LoadingIndicator Component
 *
 * A versatile loading indicator with multiple variants and sizes.
 */

import React from 'react';
import { LoadingIndicatorProps } from './LoadingIndicator/LoadingIndicator.props';
import { LoadingIndicatorView } from './LoadingIndicator/LoadingIndicator.view';

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
  return <LoadingIndicatorView {...props} />;
};

export type { LoadingIndicatorProps } from './LoadingIndicator/LoadingIndicator.props';
export type {
  LoadingIndicatorSize,
  LoadingIndicatorVariant,
} from './LoadingIndicator/LoadingIndicator.type';
