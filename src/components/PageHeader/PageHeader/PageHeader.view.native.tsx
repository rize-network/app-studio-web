import React from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import { PageHeaderProps } from './PageHeader.props';
import {
  PageHeaderContainerStyles,
  PageHeaderDescriptionStyles,
  PageHeaderTitleStyles,
} from './PageHeader.style';

// React Native twin of PageHeader.view.tsx: the title is announced as a header.
const PageHeaderView = ({
  title,
  description,
  action,
  views = {},
  ...props
}: PageHeaderProps) => (
  <Horizontal {...PageHeaderContainerStyles} {...views.container} {...props}>
    <Vertical gap={4} flexShrink={1}>
      <Text
        accessibilityRole="header"
        {...PageHeaderTitleStyles}
        {...views.title}
      >
        {title}
      </Text>
      {description ? (
        <Text {...PageHeaderDescriptionStyles} {...views.description}>
          {description}
        </Text>
      ) : null}
    </Vertical>
    {action ? (
      <View flexShrink={0} {...views.action}>
        {action}
      </View>
    ) : null}
  </Horizontal>
);

export default PageHeaderView;
