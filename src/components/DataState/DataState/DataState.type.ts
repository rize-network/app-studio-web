import React from 'react';

// Any query hook's result: the discriminated `status`, its `data` once
// loaded, its `error` once failed, and `reload()` to try again.
export type DataStateQuery<T> = (
  | { status: 'loading'; data?: undefined; error?: unknown }
  | { status: 'error'; error: unknown; data?: undefined }
  | { status: 'success'; data: T; error?: unknown }
) & {
  reload: () => void;
};

// The empty state: say what will appear here, and offer the one action that
// fills it.
export type DataStateEmpty = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

// Every word DataState shows. Override any of them through `labels`.
export type DataStateLabels = {
  loading: string;
  emptyTitle: string;
  errorTitle: string;
  networkError: string;
  retry: string;
  forbiddenTitle: string;
  signInRequired: string;
  askAccess: string;
  goneTitle: string;
  goneDescription: string;
};
