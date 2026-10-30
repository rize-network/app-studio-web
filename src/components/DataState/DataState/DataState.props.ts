import React from 'react';
import { ViewProps } from 'app-studio';
import {
  DataStateEmpty,
  DataStateLabels,
  DataStateQuery,
} from './DataState.type';

export interface DataStateProps<T> {
  // The query driving the region (`useQuery`, `useRequest`… any hook with
  // this shape).
  query: DataStateQuery<T>;
  // When the loaded data counts as empty: `(page) => page.items.length === 0`.
  isEmpty?: (data: T) => boolean;
  // Title, description and action of the empty state.
  empty?: DataStateEmpty;
  // Renders the loaded data.
  children: (data: T) => React.ReactNode;
  // Optional words replacing the English defaults (`DataStateDefaultLabels`).
  labels?: Partial<DataStateLabels>;
  // Optional style overrides of the loading and populated regions.
  views?: { loading?: ViewProps; content?: ViewProps };
}
