/**
 * SettingsPanel Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
  backgroundColor: 'color.white',
  borderRadius: 'md',
  boxShadow: 'sm',
  overflow: 'hidden',
};

export const headerStyles: ViewProps = {
  padding: 'md',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
};

export const contentStyles: ViewProps = {
  padding: 'md',
};

export const settingItemStyles: ViewProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: 'md',
  borderBottom: '1px solid',
  borderColor: 'color.gray.100',
  _last: {
    borderBottom: 'none',
  },
};

export const settingInfoStyles: ViewProps = {
  flex: 1,
  marginRight: 'md',
};

export const settingControlStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  minWidth: '120px',
};

export const categoryHeaderStyles: ViewProps = {
  padding: 'sm',
  backgroundColor: 'color.gray.50',
  fontWeight: 'bold',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
};
