import React from 'react';
import { ViewProps } from 'app-studio';
import { DataStateName, StatePanelStyles } from './StatePanel.type';

export interface StatePanelProps extends Omit<ViewProps, 'title'> {
  // Which state the region is in. `error` is announced as an alert. Exposed
  // as `data-state` (web) and in the `state-<state>` test id.
  state: DataStateName;
  // What happened, in a few words ("Nothing here yet").
  title: string;
  // Optional sentence saying why, or what to do next.
  description?: string;
  // Optional single action that gets the visitor out of this state (retry,
  // create the first item, sign in).
  action?: React.ReactNode;
  // Optional style overrides per part.
  views?: StatePanelStyles;
}
