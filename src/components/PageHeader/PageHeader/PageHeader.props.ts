import React from 'react';
import { ViewProps } from 'app-studio';
import { PageHeaderStyles } from './PageHeader.type';

export interface PageHeaderProps extends Omit<ViewProps, 'title'> {
  // The page title, rendered as the page's level-1 heading.
  title: string;
  // Optional sentence under the title saying what the page is for.
  description?: string;
  // Optional single primary action (a button that creates, a link that starts
  // the main task). One action only: secondary actions belong in the page.
  action?: React.ReactNode;
  // Optional style overrides per part.
  views?: PageHeaderStyles;
}
