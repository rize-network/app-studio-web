import React from 'react';
import { Text, Vertical, ViewProps } from 'app-studio';
import { Loader } from '../../Loader/Loader';

// React Native twin of DataState.view.tsx: same regions, RN accessibility
// semantics and `testID`s.
export const DataStateLoadingView = ({
  label,
  ...props
}: ViewProps & { label: string }) => (
  <Vertical
    accessibilityLiveRegion="polite"
    testID="state-loading"
    alignItems="center"
    gap={8}
    padding={48}
    {...props}
  >
    <Loader />
    <Text color="color-gray-600">{label}</Text>
  </Vertical>
);

export const DataStateContentView = (props: ViewProps) => (
  <Vertical testID="state-populated" gap={12} {...props} />
);
