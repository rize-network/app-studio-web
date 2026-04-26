import React, { useEffect, useState } from 'react';
import { AudioWaveform } from '../AudioWaveform/AudioWaveform';
import { AudioInputViewProps } from './AudioInput.props';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { Uploader } from '../../Uploader/Uploader';
import {
  AttachmentIcon,
  CloseIcon,
  MicrophoneIcon,
  StopIcon,
} from '../../Icon/Icon';

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function AudioInputView({
  onAudio,
  recording,
  paused,
  audioBlob,
  analyserNode,
  duration,
  error,
  startRecording,
  stopRecording,
  pauseRecording,
  resumeRecording,
  resetRecording,
  handleFileChange,
  ...viewProps
}: AudioInputViewProps) {
  const [preview, setPreview] = useState<{ url: string; label: string } | null>(
    null
  );

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setPreview({
        url,
        label: `recording-${Date.now()}.webm`,
      });
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    return () => {};
  }, [audioBlob]);

  const clearPreview = () => {
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
    resetRecording();
  };

  const handleAudioFileSelect = (file: File) => {
    onAudio(file);
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview({
      url: URL.createObjectURL(file),
      label: file.name,
    });
  };

  return (
    <Vertical gap="10px" width="100%" {...viewProps}>
      <Horizontal
        gap={12}
        alignItems="center"
        padding="12px 14px"
        border="1px solid #E5E7EB"
        borderRadius="12px"
        backgroundColor="color-white"
      >
        <Uploader
          accept="audio/*"
          icon={<AttachmentIcon widthHeight={16} />}
          maxSize={100 * 1024 * 1024}
          onFileSelect={handleAudioFileSelect}
          fileType="file"
          multiple={false}
          renderError={({ errorMessage }) => null}
          views={{
            container: {
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              border: '1px solid #E5E7EB',
              borderRadius: '10px',
              backgroundColor: 'color-white',
              transition:
                'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
              _hover: { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' },
            },
          }}
          containerProps={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            width: '36px',
            height: '36px',
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

        <View
          as="button"
          type="button"
          onClick={recording ? stopRecording : startRecording}
          width="36px"
          height="36px"
          minWidth="36px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="theme-primary"
          color="color-white"
          borderRadius="999px"
          border="0"
          cursor="pointer"
          transition="background-color 0.2s ease, opacity 0.2s ease"
          _hover={{ opacity: 0.92 }}
        >
          {recording ? (
            <StopIcon widthHeight={14} color="currentColor" filled={false} />
          ) : (
            <MicrophoneIcon
              widthHeight={18}
              color="currentColor"
              filled={false}
            />
          )}
        </View>

        <View flex={1} minWidth={120}>
          <AudioWaveform
            analyserNode={recording ? analyserNode : null}
            isPaused={!recording || paused}
          />
        </View>

        <Text
          fontSize="12px"
          lineHeight="16px"
          color="color-gray-500"
          whiteSpace="nowrap"
        >
          {formatDuration(duration)}
        </Text>
      </Horizontal>

      {preview && !recording && (
        <Vertical
          gap="8px"
          padding="12px 14px"
          border="1px solid #E5E7EB"
          borderRadius="12px"
          backgroundColor="color-white"
        >
          <Horizontal
            alignItems="center"
            justifyContent="space-between"
            gap={8}
          >
            <Text fontSize="12px" lineHeight="16px" color="color-gray-500">
              {preview.label}
            </Text>
            <View
              as="button"
              type="button"
              onClick={clearPreview}
              width="24px"
              height="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="0"
              backgroundColor="transparent"
              color="color-gray-500"
              cursor="pointer"
            >
              <CloseIcon widthHeight={14} color="currentColor" />
            </View>
          </Horizontal>
          <View as="audio" controls src={preview.url} width="100%" />
        </Vertical>
      )}

      {error && (
        <Text fontSize="11px" lineHeight="16px" color="color-red-500">
          {error}
        </Text>
      )}
    </Vertical>
  );
}

export default AudioInputView;
