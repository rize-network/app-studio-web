import { ViewProps } from 'app-studio';

export interface AudioInputProps extends ViewProps {
  /**
   * Callback function to be called when audio is available.
   * @param file The audio file (Blob)
   */
  onAudio: (file: File) => void;
}

export interface AudioInputViewProps extends AudioInputProps {
  recording: boolean;
  paused: boolean;
  audioBlob: Blob | null;
  analyserNode: AnalyserNode | null;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  resetRecording: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
