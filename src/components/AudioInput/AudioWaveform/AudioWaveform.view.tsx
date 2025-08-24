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
  const scalingFactor = 300; // This should ideally be a constant or prop if it needs to be configurable

  return (
    <Horizontal
      flexDirection="row"
      alignItems="center"
      gap={1}
      height={32} // Fixed height for the waveform container
      maxWidth={200}
      width="100%"
      marginTop={4} // Equivalent to mt-4
      {...viewProps}
    >
      {bars.map((amplitude, index) => (
        <View
          key={index}
          width={2} // Equivalent to w-[2px]
          backgroundColor={
            isPaused
              ? 'color.gray.300'
              : amplitude >= 0
              ? 'color.gray.900'
              : 'color.gray.500'
          }
          style={{ height: `${clamp(amplitude * scalingFactor, 2, 32)}px` }}
        />
      ))}
    </Horizontal>
  );
};
