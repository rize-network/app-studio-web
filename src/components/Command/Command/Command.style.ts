import { ViewProps } from 'app-studio';
import { CommandSize, CommandVariant } from './Command.type';
// Defines a mapping of command sizes (small, medium, large) to their respective `ViewProps`, specifying width and maximum height for the Command component.
export const CommandSizes: Record<CommandSize, ViewProps> = {
  sm: {
    width: '400px',
    maxHeight: '300px',
  },
  md: {
    width: '500px',
    maxHeight: '400px',
  },
  lg: {
    width: '600px',
    maxHeight: '500px',
  },
};
// A factory function that returns `ViewProps` based on a specified `themeMode`, defining different visual variants (default, filled, outline) for the Command component.
export const getCommand = (
  // Specifies the current theme mode, which influences the visual styles returned for the Command component variants.
  themeMode: string
): Record<CommandVariant, ViewProps> => {
  return {
    default: {
      backgroundColor: 'color-white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'color-gray-200',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
    filled: {
      backgroundColor: 'color-gray-50',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'color-gray-200',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
    outline: {
      backgroundColor: 'color-white',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'color-gray-300',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
  };
};
// Applies the 'light' theme to generate a set of predefined `ViewProps` for various command variants.
export const CommandVariants = getCommand('light');
// Defines the foundational `ViewProps` for the command input area, including display, alignment, padding, and bottom border styling.
export const CommandInputStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'color-gray-200',
};
// Specifies the `ViewProps` for the scrollable list container within the Command component, managing overflow and padding.
export const CommandListStyles: ViewProps = {
  overflow: 'auto',
  padding: '8px 0',
};
// Sets the `ViewProps` for grouping related command items, primarily applying a bottom margin for visual separation.
export const CommandGroupStyles: ViewProps = {
  marginBottom: '8px',
};
// Defines the `ViewProps` for the heading of a command group, including padding, font size, weight, color, and text transformation.
export const CommandGroupHeadingStyles: ViewProps = {
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'color-gray-500',
  textTransform: 'uppercase',
};
// Provides the base `ViewProps` for individual command items, covering layout, padding, cursor, user selection, border radius, margins, and hover effects.
export const CommandItemStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: '4px',
  margin: '0 8px',
  _hover: {
    backgroundColor: 'color-gray-100',
  },
};
// Specifies the `ViewProps` for a selected command item, overriding base styles with a distinct background color for highlighting and a specific hover state.
export const CommandItemSelectedStyles: ViewProps = {
  backgroundColor: 'color-blue-50',
  _hover: {
    backgroundColor: 'color-blue-100',
  },
};
// Sets the `ViewProps` for a disabled command item, reducing opacity, changing the cursor, and removing hover effects to indicate it is not interactive.
export const CommandItemDisabledStyles: ViewProps = {
  opacity: 0.5,
  cursor: 'not-allowed',
  _hover: {
    backgroundColor: 'transparent',
  },
};
// Defines the `ViewProps` for the icon displayed within a command item, managing its layout, alignment, spacing, and color.
export const CommandItemIconStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
  color: 'color-gray-500',
};
// Establishes the `ViewProps` for the content area of a command item, enabling a flexible column layout to accommodate name and description.
export const CommandItemContentStyles: ViewProps = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
};
// Specifies the `ViewProps` for the name or title part of a command item, controlling font size and weight.
export const CommandItemNameStyles: ViewProps = {
  fontSize: '14px',
  fontWeight: 'medium',
};
// Defines the `ViewProps` for the descriptive text within a command item, setting font size, color, and top margin for visual hierarchy.
export const CommandItemDescriptionStyles: ViewProps = {
  fontSize: '12px',
  color: 'color-gray-500',
  marginTop: '2px',
};
// Provides the `ViewProps` for displaying keyboard shortcuts associated with a command item, managing layout, alignment, spacing, font size, and color.
export const CommandItemShortcutStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '12px',
  fontSize: '12px',
  color: 'color-gray-500',
};
// Sets the `ViewProps` for the state when no command items are found, ensuring the message is centered and styled appropriately.
export const CommandEmptyStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  color: 'color-gray-500',
  textAlign: 'center',
};
// Defines the `ViewProps` for the footer section of the Command component, including layout, padding, border, font size, and color for informational display.
export const CommandFooterStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'color-gray-200',
  fontSize: '12px',
  color: 'color-gray-500',
};
