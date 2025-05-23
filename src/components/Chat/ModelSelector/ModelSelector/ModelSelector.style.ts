/**
 * ModelSelector Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  position: 'relative',
  width: '100%',
};

export const selectedModelStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'sm',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'color.gray.300',
  backgroundColor: 'color.white',
  cursor: 'pointer',
  _hover: {
    borderColor: 'theme.primary',
  },
  _disabled: {
    backgroundColor: 'color.gray.100',
    cursor: 'not-allowed',
  },
};

export const dropdownStyles: ViewProps = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: 'color.white',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'color.gray.200',
  boxShadow: 'md',
  zIndex: 10,
  maxHeight: '300px',
  overflowY: 'auto',
};

export const searchInputStyles: ViewProps = {
  width: '100%',
  padding: 'sm',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
};

export const optionStyles = (isSelected: boolean): ViewProps => ({
  padding: 'sm',
  cursor: 'pointer',
  backgroundColor: isSelected ? 'color.gray.100' : 'transparent',
  _hover: {
    backgroundColor: 'color.gray.100',
  },
});

export const providerGroupStyles: ViewProps = {
  padding: 'xs',
  backgroundColor: 'color.gray.50',
  fontWeight: 'bold',
  fontSize: 'sm',
};

export const modelInfoStyles: ViewProps = {
  marginTop: 'xs',
  fontSize: 'sm',
  color: 'color.gray.600',
};
