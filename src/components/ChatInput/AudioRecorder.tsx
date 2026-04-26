import React, { useCallback, useEffect } from 'react';
import { Horizontal, View } from 'app-studio';
import { MicrophoneIcon, StopIcon } from '../Icon/Icon';
import { AudioWaveform } from '../AudioInput/AudioWaveform/AudioWaveform';
import { useAudioRecording } from '../AudioInput/useAudioRecording';
// Defines the interface for the properties accepted by the AudioRecorder component.
interface AudioRecorderProps {
  // Callback function that is invoked when an audio recording successfully finishes, providing the recorded audio as a File object.
  onRecordingComplete: (file: File) => void;
  // Optional callback function that is invoked when the audio recording process begins.
  onRecordingStart?: () => void;
  // Optional prop for extending or overriding styles or properties of sub-components, such as the recording button.
  views?: { button?: any };
}
// The main AudioRecorder functional component, responsible for managing and displaying audio recording functionality.
export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  onRecordingStart,
  views = {},
}) => {
  // Destructures state variables and functions from the custom 'useAudioRecording' hook to manage recording logic.
  const {
    // Boolean state indicating whether audio recording is currently active.
    recording,
    // Boolean state indicating whether the recording is currently paused.
    paused,
    // The recorded audio data stored as a Blob object once recording is stopped.
    audioBlob,
    // An AnalyserNode from the Web Audio API, used for real-time audio analysis and visualization.
    analyserNode,
    // Function to initiate the audio recording process.
    startRecording,
    // Function to stop the current audio recording process.
    stopRecording,
  } = useAudioRecording();
  // A React effect hook that triggers an action when the 'audioBlob' state changes, specifically after a recording has completed.
  useEffect(() => {
    // Checks if an audio blob has been generated, signifying the completion of a recording.
    if (audioBlob) {
      // Creates a new 'File' object from the recorded audio blob, assigning a unique name and appropriate MIME type.
      const file = new File([audioBlob], `recording-${Date.now()}.webm`, {
        type: audioBlob.type || 'audio/webm;codecs=opus',
      });
      // Invokes the 'onRecordingComplete' callback prop, passing the newly created audio file to the parent component.
      onRecordingComplete(file);
    }
  }, [audioBlob]);
  // Memoized callback function to handle the start recording event, ensuring it's not recreated unnecessarily.
  const handleStart = useCallback(() => {
    // Initiates the audio recording using the function provided by the 'useAudioRecording' hook.
    startRecording();
    // Calls the optional 'onRecordingStart' callback if it was provided, signaling the beginning of recording.
    onRecordingStart?.();
  }, []);
  return (
    <Horizontal alignItems="center" gap={4}>
      <View minWidth={90}>
        {recording && analyserNode && (
          <AudioWaveform analyserNode={analyserNode} isPaused={paused} />
        )}
      </View>
      <View
        as="button"
        type="button"
        onClick={recording ? stopRecording : handleStart}
        height="40px"
        width="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={recording ? 'theme-error' : 'color-gray-100'}
        color={recording ? 'color-white' : 'color-gray-600'}
        borderRadius="50%"
        border="none"
        cursor="pointer"
        _hover={{
          backgroundColor: recording ? 'color-red-600' : 'color-gray-200',
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
    </Horizontal>
  );
};
