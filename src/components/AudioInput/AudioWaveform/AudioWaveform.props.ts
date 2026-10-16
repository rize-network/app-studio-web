import { ViewProps } from 'app-studio';
export interface AudioWaveformProps extends ViewProps {
  // Specifies the AnalyserNode used to get frequency data for the waveform visualization. It can be null if not yet initialized.
  analyserNode: AnalyserNode | null;
  // Indicates whether the audio playback is currently paused, affecting waveform visualization updates.
  isPaused: boolean;
}
export interface AudioWaveformViewProps extends ViewProps {
  // Indicates if the waveform rendering should be paused.
  isPaused: boolean;
  // An array representing the height of each bar in the waveform visualization.
  bars: number[];
}
