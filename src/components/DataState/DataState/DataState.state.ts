import { DataStateLabels } from './DataState.type';

export const DataStateDefaultLabels: DataStateLabels = {
  loading: 'Loading…',
  emptyTitle: 'Nothing here yet',
  errorTitle: 'Something went wrong',
  networkError:
    'The server could not be reached. Check your connection and retry.',
  retry: 'Retry',
  forbiddenTitle: "You don't have access to this",
  signInRequired: 'Sign in to continue.',
  askAccess: 'Ask an administrator for access.',
  goneTitle: 'This no longer exists',
  goneDescription: 'It may have been deleted.',
};

// What a failed query says about itself, from any client's error that
// exposes a numeric `status` (generated ApiError, fetch wrappers…).
export type DataStateFailure =
  | { kind: 'forbidden'; status: 401 | 403 }
  | { kind: 'gone' }
  | { kind: 'network' }
  | { kind: 'error' };

export const classifyDataStateError = (error: unknown): DataStateFailure => {
  const status =
    error !== null &&
    typeof error === 'object' &&
    'status' in error &&
    typeof error.status === 'number'
      ? error.status
      : undefined;
  if (status === undefined) return { kind: 'network' };
  if (status === 401 || status === 403) return { kind: 'forbidden', status };
  if (status === 404) return { kind: 'gone' };
  return { kind: 'error' };
};
