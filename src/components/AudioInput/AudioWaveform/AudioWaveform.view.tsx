import React from 'react';
import { View } from 'app-studio';
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
    <View
      flexDirection="row"
      alignItems="center"
      gap={1}
      height={32} // Fixed height for the waveform container
      maxWidth={200}
      width="100%"
      marginTop={4} // Equivalent to mt-4
      md={{ marginTop: 5 }} // Equivalent to md:mt-5
      {...viewProps}
    >
      {bars.map((amplitude, index) => (
        <View
          key={index}
          width={2} // Equivalent to w-[2px]
          backgroundColor={
            isPaused ? 'gray.100' : amplitude >= 0 ? 'gray.600' : 'gray.200'
          }
          style={{ height: `${clamp(amplitude * scalingFactor, 2, 32)}px` }}
        />
      ))}
    </View>
  );
};
