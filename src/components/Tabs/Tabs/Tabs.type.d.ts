import { ButtonProps } from '../../Button/Button/Button.props';
import { TextProps } from '../../Text/Text/Text.props';
// Declare the 'Tab' type with required title and value properties, and an optional content property that can be a string, a React node, or any type.
export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};
// Declare the 'TabsStyles' type for styling the tab components, with optional properties to customize container, active/inactive tabs, text, content display, and the header tabs.
export type TabsStyles = {
  container?: CSSProperties;
  activeTab?: CSSProperties | ButtonProps;
  activeText?: CSSProperties | TextProps;
  tab?: CSSProperties | ButtonProps;
  content?: CSSProperties;
  title?: CSSProperties | TextProps;
  headerTabs?: CSSProperties;
};
