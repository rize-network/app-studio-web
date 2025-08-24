'use client';

import React, { useEffect } from 'react';
import { Horizontal, View } from 'app-studio';
import { MicrophoneIcon, StopIcon } from '../Icon/Icon';
import { AudioWaveform } from './AudioWaveform';
import { useAudioRecording } from './useAudioRecording';

interface AudioRecorderProps {
  onRecordingComplete: (file: File) => void;
  onRecordingStart?: () => void;
  views?: { button?: any };
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  onRecordingStart,
  views = {},
}) => {
  const {
    recording,
    paused,
    audioBlob,
    analyserNode,
    startRecording,
    stopRecording,
  } = useAudioRecording();


  useEffect(() => {
    if (audioBlob) {
      const file = new File([audioBlob], `recording-${Date.now()}.webm`, {
        type: audioBlob.type || 'audio/webm;codecs=opus',
      });
      onRecordingComplete(file);
    }
  }, [audioBlob, onRecordingComplete]);

  const handleStart = () => {
    startRecording();
    onRecordingStart?.();
  };

  return (
    <Horizontal alignItems="center" gap={4}>
      <View
        as="button"
        type="button"
        onClick={recording ? stopRecording : handleStart}
        height="40px"
        width="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={recording ? 'theme.error' : 'color.gray.100'}
        color={recording ? 'color.white' : 'color.gray.600'}
        borderRadius="50%"
        border="none"
        cursor="pointer"
        _hover={{
          backgroundColor: recording ? 'color.red.600' : 'color.gray.200',
        }}
        {...views.button}
      >
        {recording ? (
          <StopIcon widthHeight={16} color="currentColor" filled={false} />
        ) : (
          <MicrophoneIcon
            widthHeight={16}
            color="currentColor"
            filled={false}
          />
        )}
      </View>
      {recording && analyserNode && (
        <AudioWaveform analyserNode={analyserNode} isPaused={paused} />
      )}
    </Horizontal>
  );
};
