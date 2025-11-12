import React from 'react';
import { ViewProps } from 'app-studio';
import { CardStyles } from '../../Card/Card/Card.type';
import { StatusIndicatorStyles } from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';
import { ProgressBarStyles } from '../../ProgressBar/ProgressBar/ProgressBar.props';

export type OKRStatus =
  | 'onTrack'
  | 'atRisk'
  | 'offTrack'
  | 'completed'
  | 'notStarted';

export interface OKRKeyResult {
  /**
   * Identifier for the key result
   */
  id?: string;
  /**
   * Display name for the key result
   */
  title: string;
  /**
   * Optional short description that provides context
   */
  description?: string;
  /**
   * Person responsible for the key result
   */
  owner?: string;
  /**
   * Status flag used to surface risk level
   */
  status?: OKRStatus;
  /**
   * Current progress value (0-100)
   */
  progress?: number;
  /**
   * Current measured value (e.g. revenue, signups)
   */
  currentValue?: string | number;
  /**
   * Target value that defines success
   */
  targetValue?: string | number;
  /**
   * Optional metric label displayed next to values
   */
  metric?: string;
}

export interface OKRObjective {
  /**
   * Identifier for the objective
   */
  id?: string;
  /**
   * Human readable name of the objective
   */
  title: string;
  /**
   * Additional context for the objective
   */
  description?: string;
  /**
   * Person accountable for the objective
   */
  owner?: string;
  /**
   * Current status of the objective
   */
  status?: OKRStatus;
  /**
   * Overall progress percentage for the objective (0-100)
   */
  progress?: number;
  /**
   * Due date or timeframe string
   */
  dueDate?: string;
  /**
   * Key results associated with the objective
   */
  keyResults?: OKRKeyResult[];
}

export interface OKRViewOverrides {
  container?: ViewProps;
  header?: ViewProps;
  title?: ViewProps;
  subtitle?: ViewProps;
  objectives?: ViewProps;
  objectiveCard?: CardStyles;
  objectiveHeader?: ViewProps;
  objectiveMeta?: ViewProps;
  objectiveDescription?: ViewProps;
  objectiveTitle?: ViewProps;
  objectiveMetaText?: ViewProps;
  progressWrapper?: ViewProps;
  progressLabel?: ViewProps;
  progressValue?: ViewProps;
  keyResults?: ViewProps;
  keyResultsHeader?: ViewProps;
  keyResultsTitle?: ViewProps;
  keyResultsSummary?: ViewProps;
  keyResultList?: ViewProps;
  keyResultRow?: ViewProps;
  keyResultTitle?: ViewProps;
  keyResultMeta?: ViewProps;
  keyResultMetaText?: ViewProps;
  keyResultDescription?: ViewProps;
  objectiveStatusIndicator?: StatusIndicatorStyles;
  keyResultStatusIndicator?: StatusIndicatorStyles;
  progressBar?: ProgressBarStyles;
  emptyState?: ViewProps;
}

export interface OKRProps extends ViewProps {
  /**
   * Headline displayed above the objective list
   */
  title?: string;
  /**
   * Supporting copy displayed under the title
   */
  description?: string;
  /**
   * Collection of objectives to render
   */
  objectives: OKRObjective[];
  /**
   * Optional text or node to display when no objectives are provided
   */
  emptyState?: React.ReactNode;
  /**
   * Reduces spacing for dense layouts
   */
  compact?: boolean;
  /**
   * Customise styles for individual layout sections
   */
  views?: OKRViewOverrides;
  /**
   * Optional theme mode override ('light' or 'dark'). If not provided the value from context is used.
   */
  themeMode?: 'light' | 'dark';
}
