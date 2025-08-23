import { ViewProps } from 'app-studio';

export interface AudioWaveformProps extends ViewProps {
  /**
   * The AnalyserNode from the Web Audio API, used to capture audio data.
   */
  analyserNode: AnalyserNode | null;
  /**
   * Indicates whether the audio capture is paused.
   */
  isPaused: boolean;
}

export interface AudioWaveformViewProps extends ViewProps {
  /**
   * Indicates whether the audio capture is paused.
   */
  isPaused: boolean;
  /**
   * An array of amplitude values representing the audio waveform bars.
   */
  bars: number[];
}
