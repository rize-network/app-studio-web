import { ViewProps } from 'app-studio';

export const StatePanelContainerStyles: ViewProps = {
  alignItems: 'center',
  gap: 8,
  paddingVertical: 48,
  paddingHorizontal: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderStyle: 'dashed',
  borderColor: 'color-gray-200',
  backgroundColor: 'color-white',
};

export const StatePanelTitleStyles: ViewProps = {
  margin: 0,
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
  color: 'theme-text',
};

export const StatePanelDescriptionStyles: ViewProps = {
  margin: 0,
  textAlign: 'center',
  color: 'color-gray-600',
};
