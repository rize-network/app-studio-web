import React from 'react';
import { BadgeProps } from './Badge/Badge.props';
import BadgeView from './Badge/Badge.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Badge component that displays a small indicator, typically used for counts or status
export const Badge = (props: BadgeProps) => {
  const mergedProps = useMergedDesignSystemComponentProps('badge', props);
  return <BadgeView {...mergedProps} />;
};
