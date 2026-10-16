import { ViewProps } from 'app-studio';
import { ActionSheetSize } from './ActionSheet.type';

export const ActionSheetItemSizes: Record<ActionSheetSize, ViewProps> = {
  sm: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  md: {
    minHeight: 52,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  lg: {
    minHeight: 60,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
};

export const ActionSheetTextSizes: Record<
  ActionSheetSize,
  { label: number; description: number }
> = {
  sm: {
    label: 14,
    description: 12,
  },
  md: {
    label: 16,
    description: 13,
  },
  lg: {
    label: 18,
    description: 14,
  },
};

export const actionSheetShadow = {
  elevation: 10,
  shadowColor: '#0F172A',
  shadowOpacity: 0.16,
  shadowOffset: { width: 0, height: -8 },
  shadowRadius: 28,
};
