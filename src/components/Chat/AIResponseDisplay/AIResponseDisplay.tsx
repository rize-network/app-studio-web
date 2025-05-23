/**
 * AIResponseDisplay Component
 *
 * A component for displaying AI-generated responses with support for
 * code blocks, inline code, and other formatting.
 */

import React from 'react';
import { AIResponseDisplayProps } from './AIResponseDisplay/AIResponseDisplay.props';
import { AIResponseDisplayView } from './AIResponseDisplay/AIResponseDisplay.view';

export const AIResponseDisplay: React.FC<AIResponseDisplayProps> = (props) => {
  return <AIResponseDisplayView {...props} />;
};

export type { AIResponseDisplayProps } from './AIResponseDisplay/AIResponseDisplay.props';
