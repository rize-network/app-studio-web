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
// Helper function to format a duration in seconds into a 'MM:SS' string.
//
// Parameters:
// - `duration`: The time in seconds to format.
//
// Steps:
// 1. Calculates minutes by dividing duration by 60 and flooring the result.
// 2. Calculates remaining seconds using the modulo operator.
// 3. Formats the output string, padding seconds with a leading zero if necessary.
function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
// React functional component responsible for rendering the UI for audio input, including recording controls, file upload, waveform display, and audio playback preview.
//
// Parameters (props):
// - `onAudio`: Callback function triggered when an audio file is selected or a recording is completed.
// - `recording`: Boolean indicating if recording is currently active.
// - `paused`: Boolean indicating if recording is currently paused.
// - `audioBlob`: The recorded audio data as a Blob object.
// - `analyserNode`: An AnalyserNode from the Web Audio API, used for visualizing audio waveforms during recording.
// - `duration`: The current duration of the recording or selected audio.
// - `error`: An error message to display if an issue occurs.
// - `startRecording`: Function to initiate audio recording.
// - `stopRecording`: Function to stop audio recording.
// - `pauseRecording`: Function to pause audio recording.
// - `resumeRecording`: Function to resume a paused recording.
// - `resetRecording`: Function to clear the current recording and reset its state.
// - `handleFileChange`: Function to handle changes from an input file element (used if file upload mechanism directly uses an input element).
// - `...viewProps`: Rest of the props passed down to the root `Vertical` container.
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
  // State variable to store information about the audio preview, including its URL and label, for playback or display.
  const [preview, setPreview] = useState<{ url: string; label: string } | null>(
    null
  );
  // Effect hook that creates a temporary URL for the `audioBlob` when it changes, allowing for local playback or display. It also cleans up the URL when the component unmounts or `audioBlob` changes.
  //
  // Steps:
  // 1. Checks if `audioBlob` exists.
  // 2. If so, creates an object URL from the `audioBlob`.
  // 3. Sets the `preview` state with the new URL and a generated label.
  // 4. Returns a cleanup function to revoke the object URL, preventing memory leaks.
  //
  // Dependencies: `audioBlob`
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
  // Function to clear the audio preview, revoke its object URL if it exists, and reset the recording state.
  //
  // Steps:
  // 1. Checks if a `preview` URL exists and revokes it to release resources.
  // 2. Sets the `preview` state back to `null`.
  // 3. Calls `resetRecording` to clear the current recording.
  const clearPreview = () => {
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
    resetRecording();
  };
  // Handler function for when a user selects an audio file via the `Uploader` component.
  //
  // Parameters:
  // - `file`: The selected `File` object.
  //
  // Steps:
  // 1. Calls the `onAudio` prop with the selected file.
  // 2. If a previous `preview` URL exists, it revokes it.
  // 3. Creates a new object URL for the selected file and sets the `preview` state with it and the file's name.
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
