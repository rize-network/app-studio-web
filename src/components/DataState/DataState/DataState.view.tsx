import React from 'react';
import { Text, Vertical, ViewProps } from 'app-studio';
import { Loader } from '../../Loader/Loader';

// The loading region: announced politely while the query runs.
export const DataStateLoadingView = ({
  label,
  ...props
}: ViewProps & { label: string }) => (
  <Vertical
    role="status"
    aria-live="polite"
    data-testid="state-loading"
    data-state="loading"
    alignItems="center"
    gap={8}
    padding={48}
    {...props}
  >
    <Loader />
    <Text color="color-gray-600">{label}</Text>
  </Vertical>
);

// The populated region wrapping the rendered data.
export const DataStateContentView = (props: ViewProps) => (
  <Vertical
    data-testid="state-populated"
    data-state="populated"
    gap={12}
    {...props}
  />
);
