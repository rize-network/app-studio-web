import { ButtonProps } from '../../Button/Button/Button.props';
import { TextProps } from '../../Text/Text/Text.props';
export type Tab = {
  // Defines the type 'Tab' representing each tab's structure with title, value, and an optional content property that can be of various types including a string, React node, or any other type.
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};
export type TabsStyles = {
  // Defines the type 'TabsStyles' representing the CSS styles for different parts of the tabs component. It includes styles for the container, active/inactive tabs and text, the content area, the title, and the header where tabs are housed.
  container?: CSSProperties;
  // Optional 'container' property to apply custom CSS styles or properties to the main container wrapping the entire tabs component.
  activeTab?: CSSProperties | ButtonProps;
  // Optional 'activeTab' property to apply custom styles or ButtonProps to the currently active tab.
  activeText?: CSSProperties | TextProps;
  // Optional 'activeText' property to customize the appearance of the text within the active tab, allowing for CSS styles or TextProps.
  tab?: CSSProperties | ButtonProps;
  // Optional 'tab' property for styling any tab or to pass ButtonProps, allowing customization of tabs regardless of their active state.
  content?: CSSProperties;
  // Optional 'content' property to apply custom CSS styles to the content area that displays the active tab's associated content.
  title?: CSSProperties | TextProps;
  // Optional 'title' property to style the title of the tabs, which can include CSS properties or specific TextProps.
  headerTabs?: CSSProperties;
  // Optional 'headerTabs' property to apply custom styles to the header section that contains all the tab titles.
};
