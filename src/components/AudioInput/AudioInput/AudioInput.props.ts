import { ViewProps } from 'app-studio';
// Defines the base properties for the AudioInput component.
export interface AudioInputProps extends ViewProps {
  // Callback function invoked when an audio file is ready, typically after recording or selection.
  onAudio: (file: File) => void;
}
// Extends AudioInputProps with additional state and handler properties required for the view component's logic.
export interface AudioInputViewProps extends AudioInputProps {
  // Indicates whether audio recording is currently active.
  recording: boolean;
  // Indicates whether the active audio recording is currently paused.
  paused: boolean;
  // Stores the recorded audio data as a Blob object, or null if no audio has been recorded.
  audioBlob: Blob | null;
  // Holds an AnalyserNode instance, used for visualizing audio data, or null if not initialized.
  analyserNode: AnalyserNode | null;
  // Represents the current duration of the recorded audio in seconds.
  duration: number;
  // Stores any error message that occurred during audio recording or processing, or null if no error.
  error: string | null;
  // Function to initiate the audio recording process.
  startRecording: () => void;
  // Function to finalize and stop the audio recording.
  stopRecording: () => void;
  // Function to temporarily halt the audio recording.
  pauseRecording: () => void;
  // Function to continue a previously paused audio recording.
  resumeRecording: () => void;
  // Function to clear all recorded audio and reset the recording state.
  resetRecording: () => void;
  // Function to handle changes from a file input element, typically for uploading audio files.
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
