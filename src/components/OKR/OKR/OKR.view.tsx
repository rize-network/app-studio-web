import React, { useMemo } from 'react';
import { Horizontal, Vertical, View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { Card } from '../../Card/Card';
import { StatusIndicator } from '../../StatusIndicator/StatusIndicator';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { OKRProps, OKRStatus, OKRObjective, OKRKeyResult } from './OKR.props';
import { getOKRTheme, getStatusTheme, StatusVisuals } from './OKR.style';
import {
  Status,
  StatusIndicatorStyles,
} from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';

const statusLabels: Record<OKRStatus, string> = {
  onTrack: 'On Track',
  atRisk: 'At Risk',
  offTrack: 'Off Track',
  completed: 'Completed',
  notStarted: 'Not Started',
};

const statusToIndicator: Record<OKRStatus, Status> = {
  onTrack: 'success',
  atRisk: 'warning',
  offTrack: 'error',
  completed: 'info',
  notStarted: 'default',
};

const getObjectiveProgress = (objective: OKRObjective) => {
  if (typeof objective.progress === 'number') {
    return objective.progress;
  }

  const keyResults = objective.keyResults ?? [];
  if (!keyResults.length) {
    return undefined;
  }

  const completed = keyResults.filter((kr) => {
    if (kr.status === 'completed') {
      return true;
    }

    if (typeof kr.progress === 'number') {
      return kr.progress >= 100;
    }

    return false;
  }).length;

  return Math.round((completed / keyResults.length) * 100);
};

const getKeyResultProgress = (keyResult: OKRKeyResult) => {
  if (typeof keyResult.progress === 'number') {
    return keyResult.progress;
  }

  if (keyResult.status === 'completed') {
    return 100;
  }

  return undefined;
};

const formatMetric = (value?: string | number, metric?: string) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const valueString =
    typeof value === 'number' ? value.toLocaleString() : value;
  return metric ? `${valueString} ${metric}` : valueString;
};

const mergeStatusIndicatorViews = (
  base: StatusVisuals,
  override?: StatusIndicatorStyles
): StatusIndicatorStyles => ({
  container: {
    ...(override?.container ?? {}),
  },
  indicator: {
    ...base.indicator,
    ...(override?.indicator ?? {}),
  },
  label: {
    ...base.label,
    ...(override?.label ?? {}),
  },
});

export const OKRView: React.FC<OKRProps> = ({
  title = 'Objectives & Key Results',
  description,
  objectives,
  emptyState = 'No objectives have been created yet.',
  compact = false,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { themeMode } = useTheme();
  const currentMode = (elementMode || themeMode) as 'light' | 'dark';
  const theme = useMemo(() => getOKRTheme(currentMode), [currentMode]);
  const statusTheme = useMemo(() => getStatusTheme(currentMode), [currentMode]);

  const spacing = compact ? 12 : theme.objectives.gap ?? 16;
  const objectiveCardPadding = compact
    ? 16
    : (theme.objectiveCard.container?.padding as number) ?? 20;

  return (
    <Vertical
      width="100%"
      {...theme.container}
      gap={compact ? 16 : theme.container.gap}
      {...views?.container}
      {...props}
    >
      <Vertical {...theme.header} {...views?.header}>
        {title && (
          <Text role="heading" {...theme.title} {...views?.title}>
            {title}
          </Text>
        )}
        {description && (
          <Text {...theme.subtitle} {...views?.subtitle}>
            {description}
          </Text>
        )}
      </Vertical>

      <Vertical {...theme.objectives} gap={spacing} {...views?.objectives}>
        {objectives.length === 0 ? (
          <View role="okr-empty-state">
            {typeof emptyState === 'string' ? (
              <Text {...theme.emptyStateText} {...views?.emptyState}>
                {emptyState}
              </Text>
            ) : (
              emptyState
            )}
          </View>
        ) : (
          objectives.map((objective) => {
            const objectiveStatus = objective.status ?? 'notStarted';
            const progress = getObjectiveProgress(objective);
            const keyResults = objective.keyResults ?? [];
            const completedKeyResults = keyResults.filter(
              (kr) => kr.status === 'completed' || (kr.progress ?? 0) >= 100
            ).length;
            const objectiveIndicatorViews = mergeStatusIndicatorViews(
              statusTheme[objectiveStatus],
              views?.objectiveStatusIndicator
            );
            const progressBarColor =
              (views?.progressBar?.bar?.backgroundColor as
                | string
                | undefined) ??
              (statusTheme[objectiveStatus].progressBar.backgroundColor as
                | string
                | undefined);
            const resolvedProgressBarColor =
              progressBarColor ?? 'theme.primary';

            return (
              <Card
                key={objective.id ?? objective.title}
                variant="outlined"
                size={compact ? 'sm' : 'md'}
                views={{
                  container: {
                    ...theme.objectiveCard.container,
                    padding: objectiveCardPadding,
                    ...views?.objectiveCard?.container,
                  },
                  header: {
                    ...theme.objectiveCard.header,
                    ...views?.objectiveCard?.header,
                  },
                  content: {
                    ...theme.objectiveCard.content,
                    ...views?.objectiveCard?.content,
                  },
                  footer: {
                    ...theme.objectiveCard.footer,
                    ...views?.objectiveCard?.footer,
                  },
                }}
              >
                <Vertical gap={compact ? 12 : 16}>
                  <Horizontal
                    justifyContent="space-between"
                    alignItems="flex-start"
                    {...theme.objectiveHeader}
                    {...views?.objectiveHeader}
                  >
                    <Vertical gap={4} width="100%">
                      <Text
                        {...theme.objectiveTitle}
                        fontSize={
                          compact ? '16px' : theme.objectiveTitle.fontSize
                        }
                        {...views?.objectiveTitle}
                      >
                        {objective.title}
                      </Text>
                      {objective.description && (
                        <Text
                          {...theme.objectiveDescription}
                          {...views?.objectiveDescription}
                        >
                          {objective.description}
                        </Text>
                      )}
                      <Horizontal
                        gap={12}
                        flexWrap="wrap"
                        {...theme.objectiveMeta}
                        {...views?.objectiveMeta}
                      >
                        {objective.owner && (
                          <Text
                            {...theme.objectiveMetaText}
                            {...views?.objectiveMetaText}
                          >
                            Owner: {objective.owner}
                          </Text>
                        )}
                        {objective.dueDate && (
                          <Text
                            {...theme.objectiveMetaText}
                            {...views?.objectiveMetaText}
                          >
                            Due: {objective.dueDate}
                          </Text>
                        )}
                        {keyResults.length > 0 && (
                          <Text
                            {...theme.objectiveMetaText}
                            {...views?.objectiveMetaText}
                          >
                            {completedKeyResults}/{keyResults.length} key
                            results complete
                          </Text>
                        )}
                      </Horizontal>
                    </Vertical>

                    <StatusIndicator
                      status={statusToIndicator[objectiveStatus]}
                      label={statusLabels[objectiveStatus]}
                      views={objectiveIndicatorViews}
                    />
                  </Horizontal>

                  {(progress !== undefined || keyResults.length > 0) && (
                    <Vertical
                      {...theme.progressWrapper}
                      {...views?.progressWrapper}
                    >
                      <Horizontal
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          {...theme.progressLabel}
                          {...views?.progressLabel}
                        >
                          Progress
                        </Text>
                        {progress !== undefined && (
                          <Text
                            {...theme.progressValue}
                            {...views?.progressValue}
                          >
                            {progress}%
                          </Text>
                        )}
                      </Horizontal>
                      <ProgressBar
                        value={progress}
                        max={100}
                        color={resolvedProgressBarColor}
                        views={{
                          container: {
                            ...views?.progressBar?.container,
                          },
                          bar: {
                            ...views?.progressBar?.bar,
                          },
                        }}
                        height={compact ? 6 : 8}
                        radius={999}
                      />
                    </Vertical>
                  )}

                  {keyResults.length > 0 && (
                    <Vertical {...theme.keyResults} {...views?.keyResults}>
                      <Horizontal
                        {...theme.keyResultsHeader}
                        {...views?.keyResultsHeader}
                      >
                        <Text
                          {...theme.keyResultsLabel}
                          {...views?.keyResultsTitle}
                        >
                          Key Results
                        </Text>
                        <Text
                          {...theme.keyResultsSummary}
                          {...views?.keyResultsSummary}
                        >
                          {completedKeyResults}/{keyResults.length} complete
                        </Text>
                      </Horizontal>
                      <Vertical
                        {...theme.keyResultList}
                        {...views?.keyResultList}
                      >
                        {keyResults.map((keyResult) => {
                          const keyResultStatus =
                            keyResult.status ?? 'notStarted';
                          const keyResultProgress =
                            getKeyResultProgress(keyResult);
                          const currentValue = formatMetric(
                            keyResult.currentValue,
                            keyResult.metric
                          );
                          const targetValue = formatMetric(
                            keyResult.targetValue,
                            keyResult.metric
                          );
                          const keyResultIndicatorViews =
                            mergeStatusIndicatorViews(
                              statusTheme[keyResultStatus],
                              views?.keyResultStatusIndicator
                            );

                          return (
                            <Horizontal
                              key={keyResult.id ?? keyResult.title}
                              justifyContent="space-between"
                              alignItems="flex-start"
                              {...theme.keyResultRow}
                              {...views?.keyResultRow}
                            >
                              <Vertical gap={6} flex={1}>
                                <Text
                                  {...theme.keyResultTitle}
                                  {...views?.keyResultTitle}
                                >
                                  {keyResult.title}
                                </Text>
                                {keyResult.description && (
                                  <Text
                                    fontSize="12px"
                                    {...theme.keyResultDescription}
                                    {...views?.keyResultDescription}
                                  >
                                    {keyResult.description}
                                  </Text>
                                )}
                                <Horizontal
                                  gap={12}
                                  flexWrap="wrap"
                                  {...theme.keyResultMeta}
                                  {...views?.keyResultMeta}
                                >
                                  {keyResult.owner && (
                                    <Text
                                      {...theme.objectiveMetaText}
                                      {...views?.keyResultMetaText}
                                    >
                                      Owner: {keyResult.owner}
                                    </Text>
                                  )}
                                  {currentValue && (
                                    <Text
                                      {...theme.objectiveMetaText}
                                      {...views?.keyResultMetaText}
                                    >
                                      Current: {currentValue}
                                    </Text>
                                  )}
                                  {targetValue && (
                                    <Text
                                      {...theme.objectiveMetaText}
                                      {...views?.keyResultMetaText}
                                    >
                                      Target: {targetValue}
                                    </Text>
                                  )}
                                  {keyResultProgress !== undefined && (
                                    <Text
                                      {...theme.objectiveMetaText}
                                      {...views?.keyResultMetaText}
                                    >
                                      {keyResultProgress}%
                                    </Text>
                                  )}
                                </Horizontal>
                              </Vertical>
                              <StatusIndicator
                                status={statusToIndicator[keyResultStatus]}
                                label={statusLabels[keyResultStatus]}
                                views={keyResultIndicatorViews}
                              />
                            </Horizontal>
                          );
                        })}
                      </Vertical>
                    </Vertical>
                  )}
                </Vertical>
              </Card>
            );
          })
        )}
      </Vertical>
    </Vertical>
  );
};
