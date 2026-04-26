import React from 'react';
import { Horizontal, View } from 'app-studio';
import { AudioWaveformViewProps } from './AudioWaveform.props';
// Defines a utility function to clamp a given number between a minimum and maximum value. This ensures that a value always stays within a specified range, preventing it from going too low or too high.
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
// Defines the `AudioWaveformView` functional component responsible for rendering the visual representation of an audio waveform. It takes waveform data (`bars`), playback status (`isPaused`), and other generic view properties as input.
export const AudioWaveformView: React.FC<AudioWaveformViewProps> = ({
  bars,
  isPaused,
  ...viewProps
}) => {
  // Initializes `scalingFactor` which is used to convert normalized audio amplitude values into pixel heights for the waveform bars, visually amplifying their representation.
  const scalingFactor = 300;
  // Defines an array of predefined heights for waveform bars. These heights are used as visual placeholders when the audio is paused or when no active amplitude data is present, providing a subtle animation effect.
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
