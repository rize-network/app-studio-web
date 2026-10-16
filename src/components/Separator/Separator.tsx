import React from 'react';
import { SeparatorProps } from './Separator/Separator.props';
import { SeparatorView } from './Separator/Separator.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Defines the primary Separator functional component, which acts as a simple wrapper to render the SeparatorView, and is also exported as Divider.
const SeparatorComponent: React.FC<SeparatorProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('separator', props);
  return <SeparatorView {...mergedProps} />;
};
export const Separator = SeparatorComponent;
export const Divider = SeparatorComponent;
