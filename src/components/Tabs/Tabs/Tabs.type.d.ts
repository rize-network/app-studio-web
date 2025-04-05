import { ButtonProps } from '../../Button/Button/Button.props'; // Adjust path as needed
import { TextProps } from '../../Text/Text/Text.props'; // Adjust path as needed
import { ViewProps } from 'app-studio';

/**
 * Defines the structure for a single tab.
 */
export type Tab = {
  /** The text displayed on the tab header/button. */
  title: string;
  /** Optional icon element to display next to the title. */
  icon?: React.ReactNode; // Use React.ReactNode instead of any
  /** The content to display when this tab is active. Can be any renderable React node. */
  content?: React.ReactNode; // Use React.ReactNode instead of any
};

/**
 * Defines the structure for applying custom styles to various parts of the Tabs component.
 * Allows using either direct CSSProperties or passing props compatible with underlying Button/Text components.
 */
export type TabsStyles = {
  /** Styles for the main container wrapping the tabs and content. */
  container?: ViewProps;
  /** Styles applied specifically to the active tab button/header. Merged with `tab` views. */
  activeTab?: ButtonProps;
  /** Styles applied specifically to the text within the active tab button/header. Merged with `title` views. */
  activeText?: TextProps;
  /** Styles applied to each tab button/header (both active and inactive). */
  tab?: ButtonProps;
  /** Styles applied to the content area displaying the active tab's content. */
  content?: ViewProps;
  /** Styles applied to the text within each tab button/header (both active and inactive). */
  title?: TextProps;
  /** Styles applied to the container element that wraps the tab buttons/headers. */
  headerTabs?: ViewProps;
};
