/**
 * ToolSelector Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
};

export const toolsContainerStyles: ViewProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'sm',
};

export const toolItemStyles = (
  isSelected: boolean,
  isEnabled: boolean
): ViewProps => ({
  display: 'flex',
  alignItems: 'center',
  gap: 'sm',
  padding: 'sm',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: isSelected ? 'theme.primary' : 'color.gray.200',
  backgroundColor: isSelected ? 'color.blue.50' : 'color.white',
  cursor: isEnabled ? 'pointer' : 'not-allowed',
  opacity: isEnabled ? 1 : 0.5,
  _hover: isEnabled
    ? {
        borderColor: 'theme.primary',
        backgroundColor: isSelected ? 'color.blue.50' : 'color.gray.50',
      }
    : {},
});

export const toolIconStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: 'md',
  backgroundColor: 'color.gray.100',
};

export const toolInfoStyles: ViewProps = {
  flex: 1,
};

export const categoryHeaderStyles: ViewProps = {
  padding: 'xs',
  marginTop: 'md',
  marginBottom: 'xs',
  fontWeight: 'bold',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
};
