import React from 'react';
import { StatePanelProps } from './StatePanel/StatePanel.props';
import StatePanelView from './StatePanel/StatePanel.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';

// A centred message for a region that is not showing its content: loading,
// empty, error, forbidden or gone. The error state is announced (role=alert).
export const StatePanel = (props: StatePanelProps) => {
  const mergedProps = useMergedDesignSystemComponentProps('statePanel', props);
  return <StatePanelView {...mergedProps} />;
};
