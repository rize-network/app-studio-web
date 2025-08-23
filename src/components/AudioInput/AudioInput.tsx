'use client';

import React, { useEffect } from 'react';
import { useAudioRecording } from '../../hooks/useAudioRecording';
import { AudioWaveform } from './AudioWaveform';
import { AudioInputProps } from './AudioInput/AudioInput.props';

export function AudioInput({ onAudio }: AudioInputProps) {
  const {
    recording,
    paused,
    audioBlob,
    analyserNode,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  } = useAudioRecording();

  useEffect(() => {
    if (audioBlob && onAudio) {
      const file = new File([audioBlob], 'recording.webm', {
        type: audioBlob.type,
      });
      onAudio(file);
    }
  }, [audioBlob, onAudio]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAudio) {
      onAudio(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {recording && (
        <AudioWaveform analyserNode={analyserNode} isPaused={paused} />
      )}
      <div className="flex gap-2">
        {!recording && (
          <button
            type="button"
            onClick={startRecording}
            className="px-2 py-1 border"
          >
            Record
          </button>
        )}
        {recording && (
          <>
            <button
              type="button"
              onClick={paused ? resumeRecording : pauseRecording}
              className="px-2 py-1 border"
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button
              type="button"
              onClick={stopRecording}
              className="px-2 py-1 border"
            >
              Stop
            </button>
            <button
              type="button"
              onClick={resetRecording}
              className="px-2 py-1 border"
            >
              Reset
            </button>
          </>
        )}
      </div>
      {audioBlob && !recording && (
        <audio controls src={URL.createObjectURL(audioBlob)} className="mt-2" />
      )}
    </div>
  );
}

export default AudioInput;
