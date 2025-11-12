import type { ViewProps } from 'app-studio';
import type { Status } from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';
import type { OKRStatus } from './OKR.props';

type ThemeMode = 'light' | 'dark';

type OKRTheme = {
  container: ViewProps;
  objectiveCard: ViewProps;
  tag: ViewProps;
  keyResultItem: ViewProps;
  divider: ViewProps;
};

export const getOKRTheme = (mode: ThemeMode): OKRTheme => {
  const isDark = mode === 'dark';

  return {
    container: {
      width: '100%',
      gap: 16,
    },
    objectiveCard: {
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'color.white',
      borderColor: isDark ? 'rgba(148, 163, 184, 0.24)' : 'color.gray.200',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: 16,
      padding: 24,
      gap: 20,
    },
    tag: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: 999,
      backgroundColor: isDark ? 'rgba(148, 163, 184, 0.16)' : 'color.gray.100',
    },
    keyResultItem: {
      padding: 16,
      borderRadius: 12,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDark ? 'rgba(148, 163, 184, 0.18)' : 'color.gray.200',
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.35)' : 'color.gray.50',
      gap: 12,
    },
    divider: {
      height: 1,
      backgroundColor: isDark ? 'rgba(148, 163, 184, 0.24)' : 'color.gray.200',
      width: '100%',
    },
  };
};

export const STATUS_METADATA: Record<
  OKRStatus,
  { indicator: Status; label: string }
> = {
  notStarted: { indicator: 'info', label: 'Not started' },
  onTrack: { indicator: 'success', label: 'On track' },
  atRisk: { indicator: 'warning', label: 'At risk' },
  offTrack: { indicator: 'error', label: 'Off track' },
  achieved: { indicator: 'success', label: 'Achieved' },
};

export const deriveStatusFromProgress = (progress: number): OKRStatus => {
  if (progress >= 100) {
    return 'achieved';
  }
  if (progress >= 70) {
    return 'onTrack';
  }
  if (progress >= 40) {
    return 'atRisk';
  }
  if (progress > 0) {
    return 'offTrack';
  }
  return 'notStarted';
};

export const clampProgress = (value?: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
};
