import React, { useEffect, useState } from 'react';
import { AudioWaveform } from '../AudioWaveform/AudioWaveform';
import { AudioInputViewProps } from './AudioInput.props';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { Uploader } from '../../Uploader/Uploader';
import {
  AttachmentIcon,
  MicrophoneIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from '../../Icon/Icon';

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
    <Vertical
      gap="10px"
      padding="8px"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      backgroundColor="color-white"
      {...viewProps}
    >
      <Horizontal gap={8} alignItems="center">
        <Uploader
          accept="audio/*"
          icon={<AttachmentIcon widthHeight={16} />}
          maxSize={100 * 1024 * 1024}
          onFileSelect={(file) => onAudio(file)}
          fileType="file"
          multiple={false}
          renderError={({ errorMessage }) => null}
          views={{
            container: {
              height: '40px',
              cursor: 'pointer',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              backgroundColor: 'color-white',
              _hover: { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' },
            },
          }}
          containerProps={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            borderRadius: '10px',
            padding: 8,
          }}
          textProps={{
            fontSize: '13px',
            color: 'color-gray-600',
          }}
          validateFile={(file: File) => {
            if (file.size > 100 * 1024 * 1024) {
              return 'File size exceeds 100MB limit';
            }
            if (!file.type.startsWith('audio/')) {
              return 'Only audio files are allowed';
            }
            return null;
          }}
        />

        {/* Recording controls styled like ChatInput */}
        {!recording ? (
          <View
            as="button"
            type="button"
            onClick={startRecording}
            height="40px"
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="color-white"
            color="color-gray-600"
            borderRadius="10px"
            border="1px solid #E2E8F0"
            cursor="pointer"
            transition="background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease"
            _hover={{ backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' }}
          >
            <MicrophoneIcon
              widthHeight={16}
              color="currentColor"
              filled={false}
            />
          </View>
        ) : (
          <Horizontal gap={8} alignItems="center">
            {/* Pause/Resume toggle */}
            <View
              as="button"
              type="button"
              onClick={paused ? resumeRecording : pauseRecording}
              height="40px"
              width="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="color-white"
              color="color-gray-600"
              borderRadius="10px"
              border="1px solid #E2E8F0"
              cursor="pointer"
              transition="background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease"
              _hover={{ backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' }}
            >
              {paused ? (
                <PlayIcon
                  widthHeight={16}
                  color="currentColor"
                  filled={false}
                />
              ) : (
                <PauseIcon
                  widthHeight={16}
                  color="currentColor"
                  filled={false}
                />
              )}
            </View>

            {/* Stop button (red) */}
            <View
              as="button"
              type="button"
              onClick={stopRecording}
              height="40px"
              width="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="theme-primary"
              color="color-white"
              borderRadius="10px"
              border="1px solid theme-primary"
              cursor="pointer"
              transition="background-color 0.2s ease, border-color 0.2s ease"
              _hover={{ backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' }}
            >
              <StopIcon widthHeight={16} color="currentColor" filled={false} />
            </View>

            <View
              minWidth={120}
              flex={1}
              minHeight="40px"
              padding="4px 10px"
              border="1px solid #E2E8F0"
              borderRadius="10px"
              backgroundColor="#F8FAFC"
            >
              {recording && (
                <AudioWaveform analyserNode={analyserNode} isPaused={paused} />
              )}
            </View>
          </Horizontal>
        )}
      </Horizontal>

      {audioUrl && !recording && (
        <Vertical gap="8px" paddingTop="10px" borderTop="1px solid #E2E8F0">
          <Text fontSize="12px" lineHeight="16px" color="color-gray-500">
            Recorded audio
          </Text>
          <View
            as="audio"
            controls
            src={audioUrl}
            width="100%"
            borderRadius="10px"
          />
        </Vertical>
      )}
    </Vertical>
  );
}

export default AudioInputView;
