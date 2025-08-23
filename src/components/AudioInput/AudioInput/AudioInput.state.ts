import { useEffect } from 'react';
import { useAudioRecording } from '../../../hooks/useAudioRecording';
import { AudioInputProps } from './AudioInput.props';

export function useAudioInputState(props: AudioInputProps) {
  const { onAudio } = props;

  const {
    recording,
    paused,
    audioBlob,
    analyserNode,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  } = useAudioRecording();

  useEffect(() => {
    if (audioBlob && onAudio) {
      const file = new File([audioBlob], 'recording.webm', {
        type: audioBlob.type || 'audio/webm;codecs=opus',
      });
      onAudio(file);
    }
  }, [audioBlob, onAudio]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAudio) {
      onAudio(file);
    }
  };

  return {
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
  };
}
