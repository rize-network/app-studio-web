import React from 'react';
import { Horizontal, Vertical, View, useTheme } from 'app-studio';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { StatusIndicator } from '../../StatusIndicator/StatusIndicator';
import { Text } from '../../Text/Text';
import { OKRKeyResult, OKRObjective, OKRProps, OKRStatus } from './OKR.props';
import {
  STATUS_METADATA,
  clampProgress,
  deriveStatusFromProgress,
  getOKRTheme,
} from './OKR.style';
import type { StatusIndicatorStyles } from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';

const formatPercentage = (value: number) => `${value}%`;

const formatConfidence = (confidence: OKRKeyResult['confidence']) => {
  if (!confidence) {
    return undefined;
  }

  return confidence.charAt(0).toUpperCase() + confidence.slice(1);
};

const getObjectiveProgress = (objective: OKRObjective) => {
  if (typeof objective.progress === 'number') {
    return clampProgress(objective.progress);
  }

  if (!objective.keyResults.length) {
    return 0;
  }

  const total = objective.keyResults.reduce(
    (acc, keyResult) => acc + (keyResult.progress ?? 0),
    0
  );

  return clampProgress(total / objective.keyResults.length);
};

const renderStatusIndicator = (
  status: OKRStatus,
  themeMode: 'light' | 'dark',
  views?: StatusIndicatorStyles
) => {
  const metadata = STATUS_METADATA[status];

  return (
    <StatusIndicator
      themeMode={themeMode}
      status={metadata.indicator}
      label={metadata.label}
      views={views}
    />
  );
};

const OKRView: React.FC<OKRProps> = ({
  objectives,
  themeMode: elementMode,
  views,
  onKeyResultClick,
  onObjectiveClick,
  renderObjectiveFooter,
  renderKeyResultFooter,
}) => {
  const { themeMode } = useTheme();
  const currentMode = (elementMode || themeMode || 'light') as 'light' | 'dark';
  const theme = getOKRTheme(currentMode);
  const secondaryTextColor =
    currentMode === 'dark' ? 'color.gray.200' : 'color.gray.600';
  const subtleTextColor =
    currentMode === 'dark' ? 'color.gray.300' : 'color.gray.500';
  const tagTextColor =
    currentMode === 'dark' ? 'color.gray.100' : 'color.gray.700';

  return (
    <Vertical {...theme.container} {...views?.container}>
      {objectives.map((objective) => {
        const objectiveProgress = getObjectiveProgress(objective);
        const objectiveStatus =
          objective.status ?? deriveStatusFromProgress(objectiveProgress);
        const objectiveFooter = renderObjectiveFooter?.(objective);

        return (
          <Vertical
            key={objective.id}
            role={onObjectiveClick ? 'button' : undefined}
            cursor={onObjectiveClick ? 'pointer' : undefined}
            onClick={
              onObjectiveClick
                ? () => onObjectiveClick(objective)
                : undefined
            }
            {...theme.objectiveCard}
            {...views?.objectiveCard}
          >
            <Horizontal
              justifyContent="space-between"
              alignItems="flex-start"
              flexWrap="wrap"
              gap={16}
              {...views?.objectiveHeader}
            >
              <Vertical gap={10} minWidth={240}>
                <Text size="lg" weight="semiBold" {...views?.objectiveTitle}>
                  {objective.title}
                </Text>
                {objective.description && (
                  <Text
                    size="sm"
                    color={secondaryTextColor}
                    {...views?.objectiveDescription}
                  >
                    {objective.description}
                  </Text>
                )}
                {objective.tags?.length ? (
                  <Horizontal gap={8} flexWrap="wrap" {...views?.objectiveTags}>
                    {objective.tags.map((tag) => (
                      <View key={tag} {...theme.tag} {...views?.tag}>
                        <Text
                          size="xs"
                          weight="medium"
                          color={tagTextColor}
                          {...views?.tagText}
                        >
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </Horizontal>
                ) : null}
              </Vertical>

              <Vertical
                gap={8}
                alignItems="flex-end"
                minWidth={160}
                {...views?.objectiveMeta}
              >
                {objective.owner && (
                  <Text
                    size="sm"
                    color={secondaryTextColor}
                    {...views?.objectiveOwner}
                  >
                    Owner: {objective.owner}
                  </Text>
                )}
                {objective.timeframe && (
                  <Text
                    size="sm"
                    color={subtleTextColor}
                    {...views?.objectiveTimeframe}
                  >
                    {objective.timeframe}
                  </Text>
                )}
                {renderStatusIndicator(
                  objectiveStatus,
                  currentMode,
                  views?.objectiveStatus
                )}
              </Vertical>
            </Horizontal>

            <Vertical gap={8} {...views?.objectiveProgressSection}>
              <Horizontal justifyContent="space-between" alignItems="center">
                <Text
                  size="sm"
                  color={secondaryTextColor}
                  {...views?.objectiveProgressLabel}
                >
                  Progress
                </Text>
                <Text
                  size="sm"
                  weight="semiBold"
                  {...views?.objectiveProgressValue}
                >
                  {formatPercentage(objectiveProgress)}
                </Text>
              </Horizontal>
              <ProgressBar
                value={objectiveProgress}
                max={100}
                views={{
                  container: {
                    width: '100%',
                    ...(views?.objectiveProgressBar?.container ?? {}),
                  },
                  bar: {
                    ...(views?.objectiveProgressBar?.bar ?? {}),
                  },
                }}
              />
            </Vertical>

            <Vertical gap={16} {...views?.keyResultList}>
              {objective.keyResults.map((keyResult, index) => {
                const progress = clampProgress(keyResult.progress);
                const keyResultStatus =
                  keyResult.status ?? deriveStatusFromProgress(progress);
                const keyResultFooter = renderKeyResultFooter?.(
                  keyResult,
                  objective
                );
                const showDivider = index < objective.keyResults.length - 1;

                return (
                  <Vertical key={keyResult.id} gap={12}>
                    <Vertical
                      role={onKeyResultClick ? 'button' : undefined}
                      cursor={onKeyResultClick ? 'pointer' : undefined}
                      onClick={
                        onKeyResultClick
                          ? (e) => {
                              e.stopPropagation();
                              onKeyResultClick(keyResult, objective);
                            }
                          : undefined
                      }
                      {...theme.keyResultItem}
                      {...views?.keyResultItem}
                    >
                      <Horizontal
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap={16}
                        {...views?.keyResultHeader}
                      >
                        <Vertical gap={8} minWidth={220}>
                          <Text
                            size="md"
                            weight="medium"
                            {...views?.keyResultTitle}
                          >
                            {keyResult.title}
                          </Text>
                          {keyResult.description && (
                            <Text
                              size="sm"
                              color={secondaryTextColor}
                              {...views?.keyResultDescription}
                            >
                              {keyResult.description}
                            </Text>
                          )}
                          {(keyResult.metric ||
                            keyResult.target ||
                            keyResult.current ||
                            keyResult.confidence ||
                            keyResult.lastUpdated) && (
                            <Horizontal
                              gap={12}
                              flexWrap="wrap"
                              {...views?.keyResultMeta}
                            >
                              {keyResult.metric && (
                                <Text size="xs" color={secondaryTextColor}>
                                  Metric: {keyResult.metric}
                                </Text>
                              )}
                              {keyResult.current && (
                                <Text size="xs" color={secondaryTextColor}>
                                  Current: {keyResult.current}
                                </Text>
                              )}
                              {keyResult.target && (
                                <Text size="xs" color={secondaryTextColor}>
                                  Target: {keyResult.target}
                                </Text>
                              )}
                              {keyResult.confidence && (
                                <Text size="xs" color={secondaryTextColor}>
                                  Confidence:{' '}
                                  {formatConfidence(keyResult.confidence)}
                                </Text>
                              )}
                              {keyResult.lastUpdated && (
                                <Text size="xs" color={subtleTextColor}>
                                  Updated: {keyResult.lastUpdated}
                                </Text>
                              )}
                            </Horizontal>
                          )}

                          {keyResult.tags?.length ? (
                            <Horizontal
                              gap={8}
                              flexWrap="wrap"
                              {...views?.keyResultTags}
                            >
                              {keyResult.tags.map((tag) => (
                                <View
                                  key={tag}
                                  {...theme.tag}
                                  {...views?.keyResultTag}
                                >
                                  <Text
                                    size="xs"
                                    weight="medium"
                                    color={tagTextColor}
                                    {...views?.keyResultTagText}
                                  >
                                    {tag}
                                  </Text>
                                </View>
                              ))}
                            </Horizontal>
                          ) : null}
                        </Vertical>

                        <Vertical gap={8} alignItems="flex-end">
                          {keyResult.owner && (
                            <Text
                              size="xs"
                              color={secondaryTextColor}
                              {...views?.keyResultOwner}
                            >
                              Owner: {keyResult.owner}
                            </Text>
                          )}
                          {renderStatusIndicator(
                            keyResultStatus,
                            currentMode,
                            views?.keyResultStatus
                          )}
                        </Vertical>
                      </Horizontal>

                      <Horizontal
                        alignItems="center"
                        gap={12}
                        {...views?.keyResultProgressSection}
                      >
                        <ProgressBar
                          value={progress}
                          max={100}
                          views={{
                            container: {
                              width: '100%',
                              ...(views?.keyResultProgressBar?.container ?? {}),
                            },
                            bar: {
                              ...(views?.keyResultProgressBar?.bar ?? {}),
                            },
                          }}
                        />
                        <Text
                          size="xs"
                          weight="semiBold"
                          {...views?.keyResultProgressValue}
                        >
                          {formatPercentage(progress)}
                        </Text>
                      </Horizontal>

                      {keyResultFooter ? (
                        <View {...views?.footer}>{keyResultFooter}</View>
                      ) : null}
                    </Vertical>

                    {showDivider ? <View {...theme.divider} /> : null}
                  </Vertical>
                );
              })}
            </Vertical>

            {objectiveFooter ? (
              <View {...views?.footer}>{objectiveFooter}</View>
            ) : null}
          </Vertical>
        );
      })}
    </Vertical>
  );
};

export default OKRView;
