import React from 'react';
import { Horizontal, Vertical, View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { StatusIndicator } from '../../StatusIndicator/StatusIndicator';
import {
  Status,
  StatusIndicatorStyles,
} from '../../StatusIndicator/StatusIndicator/StatusIndicator.type';
import { OKRViewProps } from './OKR.props';
import { OKRStatus } from './OKR.type';

const STATUS_PRESETS: Record<
  OKRStatus,
  {
    label: string;
    indicator: Status;
    text: { light: string; dark: string };
  }
> = {
  notStarted: {
    label: 'Not started',
    indicator: 'default',
    text: { light: '#475467', dark: '#D0D5DD' },
  },
  onTrack: {
    label: 'On track',
    indicator: 'info',
    text: { light: '#1D4ED8', dark: '#60A5FA' },
  },
  atRisk: {
    label: 'At risk',
    indicator: 'warning',
    text: { light: '#B45309', dark: '#FBBF24' },
  },
  offTrack: {
    label: 'Off track',
    indicator: 'error',
    text: { light: '#B91C1C', dark: '#FCA5A5' },
  },
  completed: {
    label: 'Completed',
    indicator: 'success',
    text: { light: '#15803D', dark: '#86EFAC' },
  },
};

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

const toPercentValue = (value?: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  if (value > 0 && value < 1) {
    return value * 100;
  }

  return value;
};

const formatPercent = (value?: number) =>
  `${Math.round(clampPercent(toPercentValue(value)))}%`;

const buildStatusViews = (
  status: OKRStatus,
  themeMode: 'light' | 'dark',
  base?: StatusIndicatorStyles
): StatusIndicatorStyles | undefined => {
  const preset = STATUS_PRESETS[status];
  const labelColor = preset.text[themeMode];

  return {
    ...base,
    label: {
      color: labelColor,
      ...(base?.label ?? {}),
    },
  };
};

const OKRView: React.FC<OKRViewProps> = ({
  objective,
  description,
  owner,
  timeframe,
  confidence,
  keyResults,
  computedProgress,
  views,
  themeMode: elementMode,
  ...rest
}) => {
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;

  const containerBorderColor =
    currentThemeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#EAECF0';
  const containerBackground =
    currentThemeMode === 'dark' ? 'color.gray.900' : '#ffffff';
  const surfaceSubtle =
    currentThemeMode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#F9FAFB';
  const textMuted = currentThemeMode === 'dark' ? '#D0D5DD' : '#475467';
  const textSubtle = currentThemeMode === 'dark' ? '#98A2B3' : '#667085';
  const textStrong = currentThemeMode === 'dark' ? '#F9FAFB' : '#101828';

  const objectiveProgressValue = clampPercent(toPercentValue(computedProgress));

  const metaItems = [
    owner ? { label: 'Owner', value: owner } : null,
    timeframe ? { label: 'Timeframe', value: timeframe } : null,
    { label: 'Key results', value: String(keyResults?.length ?? 0) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Vertical
      gap={24}
      width="100%"
      backgroundColor={containerBackground}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={containerBorderColor}
      borderRadius={16}
      padding={24}
      boxShadow={
        currentThemeMode === 'dark'
          ? '0 1px 2px 0 rgba(15, 23, 42, 0.6)'
          : '0 1px 2px 0 rgba(16, 24, 40, 0.08)'
      }
      {...views?.container}
      {...rest}
    >
      <Vertical gap={20} {...views?.header}>
        <Horizontal
          alignItems="flex-start"
          justifyContent="space-between"
          gap={24}
          flexWrap="wrap"
        >
          <Vertical gap={12} maxWidth="min(100%, 540px)">
            <Text
              heading="h4"
              weight="semiBold"
              color={textStrong}
              {...views?.objectiveTitle}
            >
              {objective}
            </Text>
            {description && (
              <Text
                size="md"
                color={textMuted}
                {...views?.objectiveDescription}
              >
                {description}
              </Text>
            )}
          </Vertical>

          <Vertical
            gap={12}
            minWidth={220}
            maxWidth="100%"
            padding={20}
            borderRadius={12}
            backgroundColor={surfaceSubtle}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={containerBorderColor}
            {...views?.objectiveProgressCard}
          >
            <Horizontal justifyContent="space-between" alignItems="center">
              <Text
                size="sm"
                color={textSubtle}
                {...views?.objectiveProgressLabel}
              >
                Objective progress
              </Text>
              <Text
                size="md"
                weight="semiBold"
                color={textStrong}
                {...views?.objectiveProgressValue}
              >
                {`${Math.round(objectiveProgressValue)}%`}
              </Text>
            </Horizontal>
            <ProgressBar
              value={objectiveProgressValue}
              max={100}
              height={8}
              views={views?.objectiveProgressBar}
            />
            {typeof confidence === 'number' && !Number.isNaN(confidence) && (
              <Text
                size="sm"
                color={textSubtle}
                {...views?.objectiveConfidenceLabel}
              >
                Confidence: {formatPercent(confidence)}
              </Text>
            )}
          </Vertical>
        </Horizontal>

        {metaItems.length > 0 && (
          <Horizontal
            gap={24}
            flexWrap="wrap"
            alignItems="flex-start"
            {...views?.metaContainer}
          >
            {metaItems.map((item) => (
              <Vertical key={item.label} gap={4} {...views?.metaItem}>
                <Text
                  size="xs"
                  weight="medium"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  color={textSubtle}
                  {...views?.metaLabel}
                >
                  {item.label}
                </Text>
                <Text size="sm" color={textStrong} {...views?.metaValue}>
                  {item.value}
                </Text>
              </Vertical>
            ))}
          </Horizontal>
        )}
      </Vertical>

      <Vertical gap={16} {...views?.keyResultsContainer}>
        <Text
          size="md"
          weight="semiBold"
          color={textStrong}
          {...views?.keyResultsTitle}
        >
          Key results
        </Text>

        {keyResults && keyResults.length > 0 ? (
          <Vertical gap={16}>
            {keyResults.map((kr, index) => {
              const key = kr.id ?? `${index}-${kr.title}`;
              const progressValue = clampPercent(toPercentValue(kr.progress));
              const status = kr.status ?? 'notStarted';
              const statusViews = buildStatusViews(
                status,
                currentThemeMode,
                views?.keyResultStatus
              );

              const keyResultMeta = [
                kr.owner ? { label: 'Owner', value: kr.owner } : null,
                kr.metric ? { label: 'Metric', value: kr.metric } : null,
                kr.target ? { label: 'Target', value: kr.target } : null,
                typeof kr.confidence === 'number' &&
                !Number.isNaN(kr.confidence)
                  ? { label: 'Confidence', value: formatPercent(kr.confidence) }
                  : null,
              ].filter(Boolean) as { label: string; value: string }[];

              return (
                <Vertical
                  key={key}
                  gap={16}
                  padding={20}
                  borderRadius={12}
                  backgroundColor={surfaceSubtle}
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor={containerBorderColor}
                  {...views?.keyResultCard}
                >
                  <Horizontal
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={16}
                    flexWrap="wrap"
                    {...views?.keyResultHeader}
                  >
                    <Vertical gap={8} flex="1 1 220px">
                      <Text
                        size="md"
                        weight="semiBold"
                        color={textStrong}
                        {...views?.keyResultTitle}
                      >
                        {kr.title}
                      </Text>
                      {kr.description && (
                        <Text
                          size="sm"
                          color={textMuted}
                          {...views?.keyResultDescription}
                        >
                          {kr.description}
                        </Text>
                      )}
                    </Vertical>

                    {kr.status && (
                      <StatusIndicator
                        status={STATUS_PRESETS[status].indicator}
                        label={STATUS_PRESETS[status].label}
                        views={statusViews}
                        themeMode={elementMode}
                      />
                    )}
                  </Horizontal>

                  {keyResultMeta.length > 0 && (
                    <Horizontal
                      gap={24}
                      flexWrap="wrap"
                      alignItems="flex-start"
                      {...views?.keyResultMeta}
                    >
                      {keyResultMeta.map((item) => (
                        <Vertical
                          key={item.label}
                          gap={4}
                          {...views?.keyResultMetaItem}
                        >
                          <Text
                            size="xs"
                            weight="medium"
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                            color={textSubtle}
                            {...views?.keyResultMetaLabel}
                          >
                            {item.label}
                          </Text>
                          <Text
                            size="sm"
                            color={textStrong}
                            {...views?.keyResultMetaValue}
                          >
                            {item.value}
                          </Text>
                        </Vertical>
                      ))}
                    </Horizontal>
                  )}

                  <Vertical gap={8} {...views?.keyResultProgress}>
                    <Horizontal
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        size="sm"
                        color={textSubtle}
                        {...views?.keyResultProgressLabel}
                      >
                        Progress
                      </Text>
                      <Text
                        size="sm"
                        weight="medium"
                        color={textStrong}
                        {...views?.keyResultProgressValue}
                      >
                        {`${Math.round(progressValue)}%`}
                      </Text>
                    </Horizontal>
                    <ProgressBar
                      value={progressValue}
                      max={100}
                      height={6}
                      views={views?.keyResultProgressBar}
                    />
                  </Vertical>
                </Vertical>
              );
            })}
          </Vertical>
        ) : (
          <View
            padding={24}
            borderRadius={12}
            backgroundColor={surfaceSubtle}
            borderWidth="1px"
            borderStyle="dashed"
            borderColor={containerBorderColor}
            textAlign="center"
            {...views?.emptyState}
          >
            <Text size="sm" color={textSubtle} {...views?.emptyStateText}>
              No key results have been added yet.
            </Text>
          </View>
        )}
      </Vertical>
    </Vertical>
  );
};

export default OKRView;
