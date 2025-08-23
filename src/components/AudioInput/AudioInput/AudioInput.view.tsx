'use client';

import React from 'react';
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
  return (
    <View {...viewProps} gap="2">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {recording && (
        <AudioWaveform analyserNode={analyserNode} isPaused={paused} />
      )}
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
      {audioBlob && !recording && (
        <audio controls src={URL.createObjectURL(audioBlob)} className="mt-2" />
      )}
    </View>
  );
}

export default AudioInputView;
