import { ViewProps } from 'app-studio';
import { CardStyles } from '../../Card/Card/Card.type';
import { OKRStatus } from './OKR.props';

export interface OKRTheme {
  container: ViewProps;
  header: ViewProps;
  title: ViewProps;
  subtitle: ViewProps;
  objectives: ViewProps;
  objectiveCard: CardStyles;
  objectiveHeader: ViewProps;
  objectiveMeta: ViewProps;
  objectiveDescription: ViewProps;
  objectiveTitle: ViewProps;
  objectiveMetaText: ViewProps;
  progressWrapper: ViewProps;
  progressLabel: ViewProps;
  progressValue: ViewProps;
  keyResults: ViewProps;
  keyResultsHeader: ViewProps;
  keyResultsLabel: ViewProps;
  keyResultsSummary: ViewProps;
  keyResultList: ViewProps;
  keyResultRow: ViewProps;
  keyResultTitle: ViewProps;
  keyResultMeta: ViewProps;
  keyResultDescription: ViewProps;
  emptyStateText: ViewProps;
}

export interface StatusVisuals {
  label: ViewProps;
  indicator: ViewProps;
  progressBar: ViewProps;
}

const statusVisuals: Record<
  'light' | 'dark',
  Record<OKRStatus, StatusVisuals>
> = {
  light: {
    onTrack: {
      label: { color: 'color.green.700' },
      indicator: { backgroundColor: 'color.green.500' },
      progressBar: { backgroundColor: 'color.green.500' },
    },
    atRisk: {
      label: { color: 'color.orange.700' },
      indicator: { backgroundColor: 'color.orange.500' },
      progressBar: { backgroundColor: 'color.orange.500' },
    },
    offTrack: {
      label: { color: 'color.red.700' },
      indicator: { backgroundColor: 'color.red.500' },
      progressBar: { backgroundColor: 'color.red.500' },
    },
    completed: {
      label: { color: 'color.blue.700' },
      indicator: { backgroundColor: 'color.blue.500' },
      progressBar: { backgroundColor: 'color.blue.500' },
    },
    notStarted: {
      label: { color: 'color.gray.600' },
      indicator: { backgroundColor: 'color.gray.400' },
      progressBar: { backgroundColor: 'color.gray.400' },
    },
  },
  dark: {
    onTrack: {
      label: { color: 'color.green.300' },
      indicator: { backgroundColor: 'color.green.400' },
      progressBar: { backgroundColor: 'color.green.400' },
    },
    atRisk: {
      label: { color: 'color.orange.300' },
      indicator: { backgroundColor: 'color.orange.400' },
      progressBar: { backgroundColor: 'color.orange.400' },
    },
    offTrack: {
      label: { color: 'color.red.300' },
      indicator: { backgroundColor: 'color.red.400' },
      progressBar: { backgroundColor: 'color.red.400' },
    },
    completed: {
      label: { color: 'color.blue.300' },
      indicator: { backgroundColor: 'color.blue.400' },
      progressBar: { backgroundColor: 'color.blue.400' },
    },
    notStarted: {
      label: { color: 'color.gray.400' },
      indicator: { backgroundColor: 'color.gray.500' },
      progressBar: { backgroundColor: 'color.gray.500' },
    },
  },
};

const baseThemes: Record<'light' | 'dark', OKRTheme> = {
  light: {
    container: {
      width: '100%',
      gap: 24,
    },
    header: {
      gap: 4,
    },
    title: {
      fontSize: '20px',
      fontWeight: 600,
      color: 'color.gray.900',
    },
    subtitle: {
      fontSize: '14px',
      lineHeight: '20px',
      color: 'color.gray.600',
    },
    objectives: {
      gap: 16,
    },
    objectiveCard: {
      container: {
        padding: 20,
        gap: 16,
        backgroundColor: 'color.white',
      },
    },
    objectiveHeader: {
      gap: 12,
      alignItems: 'flex-start',
    },
    objectiveMeta: {
      gap: 16,
      flexWrap: 'wrap',
    },
    objectiveDescription: {
      color: 'color.gray.700',
      lineHeight: '22px',
    },
    objectiveTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: 'color.gray.900',
    },
    objectiveMetaText: {
      fontSize: '12px',
      color: 'color.gray.500',
    },
    progressWrapper: {
      gap: 8,
    },
    progressLabel: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'color.gray.500',
    },
    progressValue: {
      fontSize: '12px',
      color: 'color.gray.700',
    },
    keyResults: {
      gap: 12,
    },
    keyResultsHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    keyResultsLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'color.gray.700',
    },
    keyResultsSummary: {
      fontSize: '12px',
      color: 'color.gray.500',
    },
    keyResultList: {
      gap: 12,
    },
    keyResultRow: {
      gap: 12,
      padding: 12,
      borderRadius: 12,
      backgroundColor: 'color.gray.050',
    },
    keyResultTitle: {
      fontWeight: 600,
      color: 'color.gray.800',
    },
    keyResultMeta: {
      gap: 12,
      flexWrap: 'wrap',
    },
    keyResultDescription: {
      color: 'color.gray.600',
      lineHeight: '20px',
    },
    emptyStateText: {
      color: 'color.gray.500',
    },
  },
  dark: {
    container: {
      width: '100%',
      gap: 24,
    },
    header: {
      gap: 4,
    },
    title: {
      fontSize: '20px',
      fontWeight: 600,
      color: 'color.gray.050',
    },
    subtitle: {
      fontSize: '14px',
      lineHeight: '20px',
      color: 'color.gray.400',
    },
    objectives: {
      gap: 16,
    },
    objectiveCard: {
      container: {
        padding: 20,
        gap: 16,
        backgroundColor: 'color.gray.900',
        borderColor: 'color.gray.700',
      },
    },
    objectiveHeader: {
      gap: 12,
      alignItems: 'flex-start',
    },
    objectiveMeta: {
      gap: 16,
      flexWrap: 'wrap',
    },
    objectiveDescription: {
      color: 'color.gray.200',
      lineHeight: '22px',
    },
    objectiveTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: 'color.gray.050',
    },
    objectiveMetaText: {
      fontSize: '12px',
      color: 'color.gray.400',
    },
    progressWrapper: {
      gap: 8,
    },
    progressLabel: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'color.gray.400',
    },
    progressValue: {
      fontSize: '12px',
      color: 'color.gray.300',
    },
    keyResults: {
      gap: 12,
    },
    keyResultsHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    keyResultsLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'color.gray.100',
    },
    keyResultsSummary: {
      fontSize: '12px',
      color: 'color.gray.400',
    },
    keyResultList: {
      gap: 12,
    },
    keyResultRow: {
      gap: 12,
      padding: 12,
      borderRadius: 12,
      backgroundColor: 'color.gray.800',
    },
    keyResultTitle: {
      fontWeight: 600,
      color: 'color.gray.050',
    },
    keyResultMeta: {
      gap: 12,
      flexWrap: 'wrap',
    },
    keyResultDescription: {
      color: 'color.gray.300',
      lineHeight: '20px',
    },
    emptyStateText: {
      color: 'color.gray.400',
    },
  },
};

export const getOKRTheme = (mode: 'light' | 'dark' = 'light'): OKRTheme =>
  baseThemes[mode];

export const getStatusTheme = (
  mode: 'light' | 'dark' = 'light'
): Record<OKRStatus, StatusVisuals> => statusVisuals[mode];
