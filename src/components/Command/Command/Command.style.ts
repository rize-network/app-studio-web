import { ViewProps } from 'app-studio';
import { CommandSize, CommandVariant } from './Command.type';

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

export const getCommand = (themeMode: string): Record<CommandVariant, ViewProps> => {
  const isDarkMode = themeMode === 'dark';

  return {
  default: {
    backgroundColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  filled: {
    backgroundColor: 'color.gray.50',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  outline: {
    backgroundColor: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'color.gray.300',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
}
  // Add dark mode conditional styling here
};

// For backward compatibility
export const CommandVariants = getCommand('light');

export const CommandInputStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'color.gray.200',
};

export const CommandListStyles: ViewProps = {
  overflow: 'auto',
  padding: '8px 0',
};

export const CommandGroupStyles: ViewProps = {
  marginBottom: '8px',
};

export const CommandGroupHeadingStyles: ViewProps = {
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'color.gray.500',
  textTransform: 'uppercase',
};

export const CommandItemStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: '4px',
  margin: '0 8px',
  _hover: {
    backgroundColor: 'color.gray.100',
  },
};

export const CommandItemSelectedStyles: ViewProps = {
  backgroundColor: 'color.blue.50',
  _hover: {
    backgroundColor: 'color.blue.100',
  },
};

export const CommandItemDisabledStyles: ViewProps = {
  opacity: 0.5,
  cursor: 'not-allowed',
  _hover: {
    backgroundColor: 'transparent',
  },
};

export const CommandItemIconStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
  color: 'color.gray.500',
};

export const CommandItemContentStyles: ViewProps = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
};

export const CommandItemNameStyles: ViewProps = {
  fontSize: '14px',
  fontWeight: 'medium',
};

export const CommandItemDescriptionStyles: ViewProps = {
  fontSize: '12px',
  color: 'color.gray.500',
  marginTop: '2px',
};

export const CommandItemShortcutStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '12px',
  fontSize: '12px',
  color: 'color.gray.500',
};

export const CommandEmptyStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  color: 'color.gray.500',
  textAlign: 'center',
};

export const CommandFooterStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'color.gray.200',
  fontSize: '12px',
  color: 'color.gray.500',
};
