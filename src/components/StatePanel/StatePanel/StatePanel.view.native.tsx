import React from 'react';
import { Text, Vertical, View } from 'app-studio';
import { StatePanelProps } from './StatePanel.props';
import {
  StatePanelContainerStyles,
  StatePanelDescriptionStyles,
  StatePanelTitleStyles,
} from './StatePanel.style';

// React Native twin of StatePanel.view.tsx: the error state is an assertive
// alert, the title a header; tests find the panel by `testID`.
const StatePanelView = ({
  state,
  title,
  description,
  action,
  views = {},
  ...props
}: StatePanelProps) => (
  <Vertical
    {...(state === 'error'
      ? {
          accessibilityRole: 'alert' as const,
          accessibilityLiveRegion: 'assertive' as const,
        }
      : {})}
    testID={`state-${state}`}
    {...StatePanelContainerStyles}
    {...views.container}
    {...props}
  >
    <Text
      accessibilityRole="header"
      {...StatePanelTitleStyles}
      {...views.title}
    >
      {title}
    </Text>
    {description ? (
      <Text {...StatePanelDescriptionStyles} {...views.description}>
        {description}
      </Text>
    ) : null}
    {action ? <View {...views.action}>{action}</View> : null}
  </Vertical>
);

export default StatePanelView;
