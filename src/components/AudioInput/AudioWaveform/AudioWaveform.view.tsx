import React from 'react';
import { Horizontal, View } from 'app-studio';
import { AudioWaveformViewProps } from './AudioWaveform.props';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const AudioWaveformView: React.FC<AudioWaveformViewProps> = ({
  bars,
  isPaused,
  ...viewProps
}) => {
  const scalingFactor = 300;
  const placeholderHeights = [
    6, 16, 23, 24, 18, 9, 14, 22, 24, 20, 11, 12, 20, 24, 21, 13, 9, 19, 24, 23,
    16, 7, 17, 23, 23, 18, 8, 15, 22, 24, 20, 10,
  ];

  return (
    <Horizontal
      alignItems="center"
      minWidth={120}
      gap={2}
      height={24}
      width="100%"
      maxWidth="100%"
      {...viewProps}
    >
      {bars.map((amplitude, index) => (
        <View
          key={index}
          width={3}
          borderRadius={2}
          backgroundColor={
            isPaused
              ? 'color-gray-300'
              : amplitude >= 0
              ? 'theme-primary'
              : 'color-gray-300'
          }
          style={{
            height: `${
              amplitude >= 0
                ? clamp(amplitude * scalingFactor, 6, 24)
                : placeholderHeights[index % placeholderHeights.length]
            }px`,
          }}
        />
      ))}
    </Horizontal>
  );
};
