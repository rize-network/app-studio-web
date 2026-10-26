import React from 'react';
import { PageHeaderProps } from './PageHeader/PageHeader.props';
import PageHeaderView from './PageHeader/PageHeader.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';

// The top of a page: one title, an optional description and at most one
// primary action. Renders an <h1> on web and a header-role Text on native.
export const PageHeader = (props: PageHeaderProps) => {
  const mergedProps = useMergedDesignSystemComponentProps('pageHeader', props);
  return <PageHeaderView {...mergedProps} />;
};
