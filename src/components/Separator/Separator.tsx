import React from 'react';
import { SeparatorProps } from './Separator/Separator.props';
import { SeparatorView } from './Separator/Separator.view';

/**
 * Separator component for visually or semantically separating content.
 */
const SeparatorComponent: React.FC<SeparatorProps> = (props) => {
  return <SeparatorView {...props} />;
};

export const Separator = SeparatorComponent;
