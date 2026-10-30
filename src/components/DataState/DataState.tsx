import React from 'react';
import { Button } from '../Button/Button';
import { StatePanel } from '../StatePanel/StatePanel';
import { DataStateProps } from './DataState/DataState.props';
import {
  classifyDataStateError,
  DataStateDefaultLabels,
} from './DataState/DataState.state';
import {
  DataStateContentView,
  DataStateLoadingView,
} from './DataState/DataState.view';

// Every data-backed region goes through DataState, so loading, empty, error
// (with Retry), forbidden (401/403) and gone (404) look and behave the same
// everywhere, on web and native.
export const DataState = <T,>({
  query,
  isEmpty,
  empty,
  children,
  labels,
  views = {},
}: DataStateProps<T>) => {
  const words = { ...DataStateDefaultLabels, ...labels };

  if (query.status === 'loading') {
    return <DataStateLoadingView label={words.loading} {...views.loading} />;
  }

  if (query.status === 'error') {
    const failure = classifyDataStateError(query.error);
    if (failure.kind === 'forbidden') {
      return (
        <StatePanel
          state="forbidden"
          title={words.forbiddenTitle}
          description={
            failure.status === 401 ? words.signInRequired : words.askAccess
          }
        />
      );
    }
    if (failure.kind === 'gone') {
      return (
        <StatePanel
          state="gone"
          title={words.goneTitle}
          description={words.goneDescription}
        />
      );
    }
    return (
      <StatePanel
        state="error"
        title={words.errorTitle}
        description={
          failure.kind === 'network' ? words.networkError : undefined
        }
        action={<Button onClick={query.reload}>{words.retry}</Button>}
      />
    );
  }

  if (isEmpty?.(query.data)) {
    return (
      <StatePanel
        state="empty"
        title={empty?.title ?? words.emptyTitle}
        description={empty?.description}
        action={empty?.action}
      />
    );
  }

  return (
    <DataStateContentView {...views.content}>
      {children(query.data)}
    </DataStateContentView>
  );
};
