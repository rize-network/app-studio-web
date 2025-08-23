'use client';

import React, { useEffect, useRef, useState, startTransition } from 'react';
import { AudioWaveformProps } from './AudioWaveform.props';
import { AudioWaveformView } from './AudioWaveform.view';

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  analyserNode,
  isPaused,
  ...viewProps
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_BARS = 60;
  const resolution = 32; // ms
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    if (!analyserNode) {
      setBars(Array(MAX_BARS).fill(-1));
      return;
    }
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const captureAmplitude = () => {
      analyserNode.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const sample = (dataArray[i] - 128) / 128;
        sum += sample * sample;
      }
      const rms = Math.sqrt(sum / bufferLength);
      startTransition(() => {
        setBars((prev) => {
          const newBars = [...prev, rms];
          const slicedBars = newBars.slice(-MAX_BARS);
          if (slicedBars.length < MAX_BARS) {
            return [
              ...Array(MAX_BARS - slicedBars.length).fill(-1),
              ...slicedBars,
            ];
          }
          return slicedBars;
        });
      });
    };

    intervalRef.current = setInterval(captureAmplitude, resolution);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [analyserNode]);

  return <AudioWaveformView bars={bars} isPaused={isPaused} {...viewProps} />;
};
