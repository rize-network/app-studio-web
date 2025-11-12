import { ViewProps } from 'app-studio';
import { TextProps } from '../../Text/Text/Text.props';
import { ProgressBarStyles } from '../../ProgressBar/ProgressBar/ProgressBar.props';
import { StatusIndicatorStyles } from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';
import { OKRStatus } from './OKR.type';

export interface OKRKeyResult {
  id?: string;
  title: string;
  description?: string;
  owner?: string;
  metric?: string;
  target?: string;
  progress?: number;
  status?: OKRStatus;
  confidence?: number;
}

export interface OKRViews {
  container?: ViewProps;
  header?: ViewProps;
  objectiveTitle?: TextProps;
  objectiveDescription?: TextProps;
  metaContainer?: ViewProps;
  metaItem?: ViewProps;
  metaLabel?: TextProps;
  metaValue?: TextProps;
  objectiveProgressCard?: ViewProps;
  objectiveProgressLabel?: TextProps;
  objectiveProgressValue?: TextProps;
  objectiveConfidenceLabel?: TextProps;
  objectiveProgressBar?: ProgressBarStyles;
  keyResultsContainer?: ViewProps;
  keyResultsTitle?: TextProps;
  keyResultCard?: ViewProps;
  keyResultHeader?: ViewProps;
  keyResultTitle?: TextProps;
  keyResultDescription?: TextProps;
  keyResultStatus?: StatusIndicatorStyles;
  keyResultMeta?: ViewProps;
  keyResultMetaItem?: ViewProps;
  keyResultMetaLabel?: TextProps;
  keyResultMetaValue?: TextProps;
  keyResultProgress?: ViewProps;
  keyResultProgressLabel?: TextProps;
  keyResultProgressValue?: TextProps;
  keyResultProgressBar?: ProgressBarStyles;
  emptyState?: ViewProps;
  emptyStateText?: TextProps;
}

export interface OKRProps extends Omit<ViewProps, 'children'> {
  objective: string;
  description?: string;
  owner?: string;
  timeframe?: string;
  progress?: number;
  confidence?: number;
  keyResults: OKRKeyResult[];
  themeMode?: 'light' | 'dark';
  views?: OKRViews;
}

export interface OKRViewProps extends OKRProps {
  computedProgress: number;
}
