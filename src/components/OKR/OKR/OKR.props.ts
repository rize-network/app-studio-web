import type React from 'react';
import type { ViewProps } from 'app-studio';
import type { TextProps } from '../../Text/Text/Text.props';
import type { ProgressBarProps } from '../../ProgressBar/ProgressBar/ProgressBar.props';

export type OKRConfidenceLevel = 'low' | 'medium' | 'high';

export interface OKRKeyResult {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  progress?: number;
  confidence?: OKRConfidenceLevel;
  target?: string;
}

export interface OKRObjective {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  timeframe?: string;
  progress?: number;
  keyResults: OKRKeyResult[];
}

export interface OKRViews {
  container?: ViewProps;
  objective?: ViewProps;
  objectiveHeader?: ViewProps;
  objectiveBody?: ViewProps;
  objectiveTitle?: TextProps;
  objectiveMeta?: TextProps;
  objectiveDescription?: TextProps;
  objectiveProgressLabel?: TextProps;
  objectiveProgressBar?: ProgressBarProps;
  keyResultList?: ViewProps;
  keyResult?: ViewProps;
  keyResultHeader?: ViewProps;
  keyResultTitle?: TextProps;
  keyResultDescription?: TextProps;
  keyResultMeta?: TextProps;
  keyResultProgressBar?: ProgressBarProps;
  confidencePill?: ViewProps;
  confidenceLabel?: TextProps;
  emptyState?: ViewProps;
}

export interface OKRProps extends ViewProps {
  objectives: OKRObjective[];
  showObjectiveProgress?: boolean;
  showKeyResultProgress?: boolean;
  showConfidence?: boolean;
  formatConfidenceLabel?: (confidence: OKRConfidenceLevel) => React.ReactNode;
  formatObjectiveProgress?: (objective: OKRObjective) => number;
  emptyState?: React.ReactNode;
  views?: OKRViews;
  themeMode?: 'light' | 'dark';
}
