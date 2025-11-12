import type { ViewProps } from 'app-studio';
import type { ReactNode } from 'react';
import type { ProgressBarStyles } from '../../ProgressBar/ProgressBar/ProgressBar.props';
import type { StatusIndicatorStyles } from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';
import type { TextProps } from '../../Text/Text/Text.props';

export type OKRStatus =
  | 'notStarted'
  | 'onTrack'
  | 'atRisk'
  | 'offTrack'
  | 'achieved';

export interface OKRKeyResult {
  id: string;
  title: string;
  description?: string;
  progress?: number;
  metric?: string;
  target?: string;
  current?: string;
  owner?: string;
  status?: OKRStatus;
  confidence?: 'low' | 'medium' | 'high';
  lastUpdated?: string;
  tags?: string[];
}

export interface OKRObjective {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  timeframe?: string;
  tags?: string[];
  progress?: number;
  status?: OKRStatus;
  keyResults: OKRKeyResult[];
}

export interface OKRViews {
  container?: ViewProps;
  objectiveCard?: ViewProps;
  objectiveHeader?: ViewProps;
  objectiveTitle?: TextProps;
  objectiveDescription?: TextProps;
  objectiveMeta?: ViewProps;
  objectiveOwner?: TextProps;
  objectiveTimeframe?: TextProps;
  objectiveTags?: ViewProps;
  tag?: ViewProps;
  tagText?: TextProps;
  objectiveProgressSection?: ViewProps;
  objectiveProgressLabel?: TextProps;
  objectiveProgressValue?: TextProps;
  objectiveProgressBar?: ProgressBarStyles;
  objectiveStatus?: StatusIndicatorStyles;
  keyResultList?: ViewProps;
  keyResultItem?: ViewProps;
  keyResultHeader?: ViewProps;
  keyResultTitle?: TextProps;
  keyResultDescription?: TextProps;
  keyResultMeta?: ViewProps;
  keyResultOwner?: TextProps;
  keyResultStatus?: StatusIndicatorStyles;
  keyResultTags?: ViewProps;
  keyResultTag?: ViewProps;
  keyResultTagText?: TextProps;
  keyResultProgressSection?: ViewProps;
  keyResultProgressValue?: TextProps;
  keyResultProgressBar?: ProgressBarStyles;
  footer?: ViewProps;
}

export interface OKRProps {
  objectives: OKRObjective[];
  themeMode?: 'light' | 'dark';
  views?: OKRViews;
  onKeyResultClick?: (keyResult: OKRKeyResult, objective: OKRObjective) => void;
  renderObjectiveFooter?: (objective: OKRObjective) => ReactNode;
  renderKeyResultFooter?: (
    keyResult: OKRKeyResult,
    objective: OKRObjective
  ) => ReactNode;
}
