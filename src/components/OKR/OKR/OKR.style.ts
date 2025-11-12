import type { ViewProps } from 'app-studio';
import type { TextProps } from '../../Text/Text/Text.props';
import type { ProgressBarProps } from '../../ProgressBar/ProgressBar/ProgressBar.props';
import type { OKRConfidenceLevel } from './OKR.props';

export interface OKRTheme {
  container: ViewProps;
  objective: ViewProps;
  objectiveHeader: ViewProps;
  objectiveBody: ViewProps;
  objectiveTitle: TextProps;
  objectiveMeta: TextProps;
  objectiveDescription: TextProps;
  objectiveProgressLabel: TextProps;
  objectiveProgressBar: ProgressBarProps;
  keyResultList: ViewProps;
  keyResult: ViewProps;
  keyResultHeader: ViewProps;
  keyResultTitle: TextProps;
  keyResultDescription: TextProps;
  keyResultMeta: TextProps;
  keyResultProgressBar: ProgressBarProps;
  confidencePill: ViewProps;
  confidenceLabel: TextProps;
  emptyState: ViewProps;
}

const getSurfaceColor = (themeMode: string) =>
  themeMode === 'dark' ? 'color.gray.900' : 'color.white';

const getBorderColor = (themeMode: string) =>
  themeMode === 'dark' ? 'color.gray.800' : 'color.gray.200';

const getSecondaryTextColor = (themeMode: string) =>
  themeMode === 'dark' ? 'color.gray.300' : 'color.gray.600';

const getPrimaryTextColor = (themeMode: string) =>
  themeMode === 'dark' ? 'color.gray.50' : 'color.gray.900';

const getConfidenceBackground = (
  level: OKRConfidenceLevel,
  themeMode: string
) => {
  if (themeMode === 'dark') {
    switch (level) {
      case 'low':
        return 'rgba(248, 113, 113, 0.16)';
      case 'medium':
        return 'rgba(251, 191, 36, 0.18)';
      case 'high':
      default:
        return 'rgba(74, 222, 128, 0.18)';
    }
  }

  switch (level) {
    case 'low':
      return 'color.red.50';
    case 'medium':
      return 'color.orange.50';
    case 'high':
    default:
      return 'color.green.50';
  }
};

const getConfidenceTextColor = (
  level: OKRConfidenceLevel,
  themeMode: string
) => {
  if (themeMode === 'dark') {
    switch (level) {
      case 'low':
        return 'color.red.200';
      case 'medium':
        return 'color.orange.200';
      case 'high':
      default:
        return 'color.green.200';
    }
  }

  switch (level) {
    case 'low':
      return 'color.red.700';
    case 'medium':
      return 'color.orange.700';
    case 'high':
    default:
      return 'color.green.700';
  }
};

export const getConfidenceStyles = (
  level: OKRConfidenceLevel,
  themeMode: string
): { pill: ViewProps; label: TextProps } => ({
  pill: {
    backgroundColor: getConfidenceBackground(level, themeMode),
    borderRadius: '999px',
    padding: '4px 10px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    color: getConfidenceTextColor(level, themeMode),
  },
});

export const getOKRTheme = (themeMode: string): OKRTheme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  },
  objective: {
    backgroundColor: getSurfaceColor(themeMode),
    borderRadius: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: getBorderColor(themeMode),
    padding: '20px',
    boxShadow:
      themeMode === 'dark'
        ? '0px 12px 24px rgba(0, 0, 0, 0.35)'
        : '0px 10px 30px rgba(15, 23, 42, 0.08)',
  },
  objectiveHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    flexWrap: 'wrap',
  },
  objectiveBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px',
  },
  objectiveTitle: {
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
    color: getPrimaryTextColor(themeMode),
  },
  objectiveMeta: {
    fontSize: '14px',
    lineHeight: '20px',
    color: getSecondaryTextColor(themeMode),
  },
  objectiveDescription: {
    fontSize: '14px',
    lineHeight: '22px',
    color: getSecondaryTextColor(themeMode),
  },
  objectiveProgressLabel: {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 500,
    color: getSecondaryTextColor(themeMode),
  },
  objectiveProgressBar: {
    height: 10,
    radius: 999,
    backgroundColor:
      themeMode === 'dark' ? 'rgba(148, 163, 184, 0.24)' : 'color.gray.200',
    color: themeMode === 'dark' ? 'color.blue.400' : 'color.blue.500',
  },
  keyResultList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  keyResult: {
    backgroundColor:
      themeMode === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'color.gray.50',
    borderRadius: '12px',
    padding: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor:
      themeMode === 'dark' ? 'rgba(148, 163, 184, 0.2)' : 'color.gray.200',
  },
  keyResultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
  },
  keyResultTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 600,
    color: getPrimaryTextColor(themeMode),
  },
  keyResultDescription: {
    fontSize: '14px',
    lineHeight: '20px',
    color: getSecondaryTextColor(themeMode),
  },
  keyResultMeta: {
    fontSize: '13px',
    lineHeight: '18px',
    color: getSecondaryTextColor(themeMode),
  },
  keyResultProgressBar: {
    height: 8,
    radius: 999,
    backgroundColor:
      themeMode === 'dark' ? 'rgba(148, 163, 184, 0.24)' : 'color.gray.200',
    color: themeMode === 'dark' ? 'color.green.400' : 'color.green.500',
  },
  confidencePill: {
    borderRadius: '999px',
    padding: '4px 10px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  confidenceLabel: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    color: getSecondaryTextColor(themeMode),
  },
  emptyState: {
    backgroundColor:
      themeMode === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'color.gray.50',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
  },
});
