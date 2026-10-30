import { ViewProps } from 'app-studio';

// The states a data-backed region can be in. `DataState` renders each one the
// same way everywhere; `StatePanel` draws every state except `populated`.
export type DataStateName =
  | 'loading'
  | 'empty'
  | 'error'
  | 'forbidden'
  | 'gone'
  | 'populated';

// Style overrides for each part of the StatePanel.
export type StatePanelStyles = {
  container?: ViewProps;
  title?: ViewProps;
  description?: ViewProps;
  action?: ViewProps;
};
