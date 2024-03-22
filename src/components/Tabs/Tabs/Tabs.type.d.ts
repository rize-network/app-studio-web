import { ButtonProps } from '../../Button/Button/Button.props';
import { TextProps } from '../../Text/Text/Text.props';
export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};
export type TabsStyles = {
  container?: CSSProperties;
  activeTab?: CSSProperties | ButtonProps;
  activeText?: CSSProperties | TextProps;
  tab?: CSSProperties | ButtonProps;
  content?: CSSProperties;
  title?: CSSProperties | TextProps;
  headerTabs?: CSSProperties;
};
