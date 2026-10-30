import { ViewProps } from 'app-studio';

// Style overrides for each part of the PageHeader.
export type PageHeaderStyles = {
  // The row holding the text column and the action.
  container?: ViewProps;
  // The page title (the page's level-1 heading).
  title?: ViewProps;
  // The description under the title.
  description?: ViewProps;
  // The slot wrapping the primary action.
  action?: ViewProps;
};
