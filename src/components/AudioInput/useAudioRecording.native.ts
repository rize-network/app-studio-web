/**
 * useAudioRecording (React Native)
 *
 * The web hook uses `navigator.mediaDevices.getUserMedia` + `MediaRecorder` +
 * the Web Audio API — none of which exist on React Native, and actual PCM
 * capture needs a native module (e.g. react-native-audio-recorder-player /
 * expo-av) that isn't installed here. This native hook keeps the SAME public
 * surface so `AudioInputView` renders and is interactive: pressing the mic
 * requests microphone permission, flips into a "recording" state, and ticks the
 * duration so the waveform animates. `audioBlob`/`analyserNode` stay null (no
 * capture backend). Wire a recorder library into `startRecording` to capture.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

export function useAudioRecording() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const requestMicPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone permission',
            message:
              'This demo needs access to your microphone to record audio.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch {
        return false;
      }
    }
    // iOS: the actual permission prompt is shown by the native recorder the
    // first time it accesses the mic (requires NSMicrophoneUsageDescription in
    // Info.plist). With no recorder wired up we optimistically allow the UI.
    return true;
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    const ok = await requestMicPermission();
    if (!ok) {
      setError('Microphone permission denied.');
      return;
    }
    setDuration(0);
    setRecording(true);
    setPaused(false);
    clearTimer();
    timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
  }, [requestMicPermission]);

  const stopRecording = useCallback(() => {
    setRecording(false);
    setPaused(false);
    clearTimer();
  }, []);

  const pauseRecording = useCallback(() => {
    setPaused(true);
    clearTimer();
  }, []);

  const resumeRecording = useCallback(() => {
    setPaused(false);
    clearTimer();
    timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
  }, []);

  const resetRecording = useCallback(() => {
    setRecording(false);
    setPaused(false);
    setDuration(0);
    setError(null);
    clearTimer();
  }, []);

  return {
    recording,
    paused,
    audioBlob: null as Blob | null,
    analyserNode: null,
    duration,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  };
}
