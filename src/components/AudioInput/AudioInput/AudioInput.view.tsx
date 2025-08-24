'use client';

import React, { useEffect, useState } from 'react';
import { AudioWaveform } from '../AudioWaveform/AudioWaveform';
import { AudioInputViewProps } from './AudioInput.props';
import { View, Horizontal, Button } from 'app-studio'; // Assuming these are from app-studio

export function AudioInputView({
  onAudio,
  recording,
  paused,
  audioBlob,
  analyserNode,
  startRecording,
  stopRecording,
  pauseRecording,
  resumeRecording,
  resetRecording,
  handleFileChange,
  ...viewProps
}: AudioInputViewProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    setAudioUrl(null);
    return () => {};
  }, [audioBlob]);

  return (
    <View {...viewProps} gap="2">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <AudioWaveform analyserNode={analyserNode} isPaused={paused} />

      <Horizontal gap="2">
        {!recording && (
          <Button type="button" onClick={startRecording}>
            Record
          </Button>
        )}
        {recording && (
          <>
            <Button
              type="button"
              onClick={paused ? resumeRecording : pauseRecording}
            >
              {paused ? 'Resume' : 'Pause'}
            </Button>
            <Button type="button" onClick={stopRecording}>
              Stop
            </Button>
            <Button type="button" onClick={resetRecording}>
              Reset
            </Button>
          </>
        )}
      </Horizontal>
      {audioUrl && !recording && <audio controls src={audioUrl} />}
    </View>
  );
}

export default AudioInputView;
