import React from 'react';
import { Horizontal, Vertical, View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import type {
  OKRConfidenceLevel,
  OKRObjective,
  OKRKeyResult,
  OKRProps,
} from './OKR.props';
import { getConfidenceStyles, getOKRTheme } from './OKR.style';
import type { OKRTheme } from './OKR.style';

const clampProgress = (value: number | undefined) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return value;
};

const calculateObjectiveProgress = (objective: OKRObjective) => {
  if (typeof objective.progress === 'number') {
    return clampProgress(objective.progress);
  }

  const keyResultsWithProgress = objective.keyResults.filter(
    (keyResult) => typeof keyResult.progress === 'number'
  );

  if (keyResultsWithProgress.length === 0) {
    return 0;
  }

  const total = keyResultsWithProgress.reduce(
    (sum, keyResult) => sum + clampProgress(keyResult.progress),
    0
  );

  return clampProgress(total / keyResultsWithProgress.length);
};

const formatProgressLabel = (value: number) => `${Math.round(value)}%`;

const renderKeyResultMeta = (
  keyResult: OKRKeyResult,
  showProgress: boolean,
  showConfidence: boolean,
  themeMode: string,
  views: OKRProps['views'],
  themeStyles: OKRTheme,
  formatConfidenceLabel?: (confidence: OKRConfidenceLevel) => React.ReactNode
) => {
  const clampedProgress = clampProgress(keyResult.progress);
  const confidence = keyResult.confidence;
  const confidenceStyles =
    confidence && getConfidenceStyles(confidence, themeMode);

  return (
    <Vertical alignItems="flex-end" gap="8px">
      {showProgress && typeof keyResult.progress === 'number' && (
        <Text {...themeStyles.keyResultMeta} {...views?.keyResultMeta}>
          {formatProgressLabel(clampedProgress)} complete
        </Text>
      )}

      {showConfidence && confidence && (
        <View
          {...themeStyles.confidencePill}
          {...confidenceStyles?.pill}
          {...views?.confidencePill}
        >
          <Text
            {...themeStyles.confidenceLabel}
            {...confidenceStyles?.label}
            {...views?.confidenceLabel}
          >
            {formatConfidenceLabel
              ? formatConfidenceLabel(confidence)
              : confidence.charAt(0).toUpperCase() + confidence.slice(1)}
          </Text>
        </View>
      )}
    </Vertical>
  );
};

const OKRView: React.FC<OKRProps> = ({
  objectives,
  showObjectiveProgress = true,
  showKeyResultProgress = true,
  showConfidence = true,
  formatConfidenceLabel,
  formatObjectiveProgress,
  emptyState,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const theme = useTheme();
  const currentThemeMode = elementMode || theme.themeMode;
  const themeStyles = getOKRTheme(currentThemeMode);

  if (!objectives || objectives.length === 0) {
    return (
      <View {...themeStyles.container} {...views?.container} {...props}>
        <View {...themeStyles.emptyState} {...views?.emptyState}>
          {emptyState ?? (
            <Text {...themeStyles.objectiveMeta}>
              No objectives have been defined yet.
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View {...themeStyles.container} {...views?.container} {...props}>
      {objectives.map((objective) => {
        const objectiveProgress = formatObjectiveProgress
          ? clampProgress(formatObjectiveProgress(objective))
          : calculateObjectiveProgress(objective);

        return (
          <Vertical
            key={objective.id}
            {...themeStyles.objective}
            {...views?.objective}
          >
            <Horizontal
              {...themeStyles.objectiveHeader}
              {...views?.objectiveHeader}
            >
              <Vertical gap="8px">
                <Text
                  {...themeStyles.objectiveTitle}
                  {...views?.objectiveTitle}
                >
                  {objective.title}
                </Text>
                {objective.description && (
                  <Text
                    {...themeStyles.objectiveDescription}
                    {...views?.objectiveDescription}
                  >
                    {objective.description}
                  </Text>
                )}
              </Vertical>

              <Vertical alignItems="flex-end" gap="6px">
                {objective.timeframe && (
                  <Text
                    {...themeStyles.objectiveMeta}
                    {...views?.objectiveMeta}
                  >
                    {objective.timeframe}
                  </Text>
                )}
                {objective.owner && (
                  <Text
                    {...themeStyles.objectiveMeta}
                    {...views?.objectiveMeta}
                  >
                    Owner: {objective.owner}
                  </Text>
                )}
                {showObjectiveProgress && (
                  <Text
                    {...themeStyles.objectiveProgressLabel}
                    {...views?.objectiveProgressLabel}
                  >
                    {formatProgressLabel(objectiveProgress)} complete
                  </Text>
                )}
              </Vertical>
            </Horizontal>

            <Vertical {...themeStyles.objectiveBody} {...views?.objectiveBody}>
              {showObjectiveProgress && (
                <ProgressBar
                  value={objectiveProgress}
                  max={100}
                  {...themeStyles.objectiveProgressBar}
                  {...views?.objectiveProgressBar}
                />
              )}

              <Vertical
                {...themeStyles.keyResultList}
                {...views?.keyResultList}
              >
                {objective.keyResults.map((keyResult) => {
                  const clampedProgress = clampProgress(keyResult.progress);

                  return (
                    <Vertical
                      key={keyResult.id}
                      {...themeStyles.keyResult}
                      {...views?.keyResult}
                    >
                      <Horizontal
                        {...themeStyles.keyResultHeader}
                        {...views?.keyResultHeader}
                      >
                        <Vertical gap="6px">
                          <Text
                            {...themeStyles.keyResultTitle}
                            {...views?.keyResultTitle}
                          >
                            {keyResult.title}
                          </Text>
                          {keyResult.description && (
                            <Text
                              {...themeStyles.keyResultDescription}
                              {...views?.keyResultDescription}
                            >
                              {keyResult.description}
                            </Text>
                          )}
                          {(keyResult.owner || keyResult.target) && (
                            <Text
                              {...themeStyles.keyResultMeta}
                              {...views?.keyResultMeta}
                            >
                              {[keyResult.owner && `Owner: ${keyResult.owner}`]
                                .filter(Boolean)
                                .concat(
                                  keyResult.target
                                    ? `Target: ${keyResult.target}`
                                    : []
                                )
                                .join(' • ')}
                            </Text>
                          )}
                        </Vertical>

                        {renderKeyResultMeta(
                          keyResult,
                          showKeyResultProgress,
                          showConfidence,
                          currentThemeMode,
                          views,
                          themeStyles,
                          formatConfidenceLabel
                        )}
                      </Horizontal>

                      {showKeyResultProgress &&
                        typeof keyResult.progress === 'number' && (
                          <ProgressBar
                            value={clampedProgress}
                            max={100}
                            {...themeStyles.keyResultProgressBar}
                            {...views?.keyResultProgressBar}
                          />
                        )}
                    </Vertical>
                  );
                })}
              </Vertical>
            </Vertical>
          </Vertical>
        );
      })}
    </View>
  );
};

export default OKRView;
