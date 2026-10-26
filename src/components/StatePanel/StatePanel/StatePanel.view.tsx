import React from 'react';
import { Text, Vertical, View } from 'app-studio';
import { StatePanelProps } from './StatePanel.props';
import {
  StatePanelContainerStyles,
  StatePanelDescriptionStyles,
  StatePanelTitleStyles,
} from './StatePanel.style';

const StatePanelView = ({
  state,
  title,
  description,
  action,
  views = {},
  ...props
}: StatePanelProps) => (
  <Vertical
    {...(state === 'error' ? { role: 'alert' } : {})}
    data-testid={`state-${state}`}
    data-state={state}
    {...StatePanelContainerStyles}
    {...views.container}
    {...props}
  >
    <Text as="h2" {...StatePanelTitleStyles} {...views.title}>
      {title}
    </Text>
    {description ? (
      <Text as="p" {...StatePanelDescriptionStyles} {...views.description}>
        {description}
      </Text>
    ) : null}
    {action ? <View {...views.action}>{action}</View> : null}
  </Vertical>
);

export default StatePanelView;
