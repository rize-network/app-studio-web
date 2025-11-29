import React, { useEffect, useState } from 'react';
import { AudioWaveform } from '../AudioWaveform/AudioWaveform';
import { AudioInputViewProps } from './AudioInput.props';
import { View, Horizontal } from 'app-studio'; // Assuming these are from app-studio
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
    <View gap="8px" {...viewProps}>
      {/* Waveform (visible while recording) */}

      {/* Controls row with attachment + audio controls (matching ChatInput style) */}
      <Horizontal gap={8} alignItems="center" margin={10}>
        {/* Attachment-style button for selecting audio files */}
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
              height: '36px',
              cursor: 'pointer',
              _hover: { backgroundColor: 'color.gray.100' },
            },
          }}
          containerProps={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            borderRadius: '50%',
            padding: 10,
          }}
          textProps={{
            fontSize: '14px',
            color: 'color.gray.600',
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
            backgroundColor={'color.gray.100'}
            color={'color.gray.600'}
            borderRadius={'50%'}
            border="none"
            cursor="pointer"
            _hover={{ backgroundColor: 'color.gray.200' }}
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
              backgroundColor={'color.gray.100'}
              color={'color.gray.600'}
              borderRadius={'50%'}
              border="none"
              cursor="pointer"
              _hover={{ backgroundColor: 'color.gray.200' }}
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
              backgroundColor={'theme.error'}
              color={'color.white'}
              borderRadius={'50%'}
              border="none"
              cursor="pointer"
              _hover={{ backgroundColor: 'color.red.600' }}
            >
              <StopIcon widthHeight={16} color="currentColor" filled={false} />
            </View>

            <View minWidth={90}>
              {recording && (
                <AudioWaveform analyserNode={analyserNode} isPaused={paused} />
              )}
            </View>
          </Horizontal>
        )}
      </Horizontal>

      {/* Playback when not recording */}
      {audioUrl && !recording && <audio controls src={audioUrl} />}
    </View>
  );
}

export default AudioInputView;
