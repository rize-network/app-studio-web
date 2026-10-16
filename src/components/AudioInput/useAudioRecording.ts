import { useCallback, useEffect, useRef, useState } from 'react';
// Defines a custom React hook for managing audio recording functionality, providing state, controls, and audio analysis.
export function useAudioRecording() {
  // Manages the recording state; `true` if currently recording, `false` otherwise.
  const [recording, setRecording] = useState(false);
  // Indicates whether the recording is currently paused (`true`) or active (`false`).
  const [paused, setPaused] = useState(false);
  // Tracks the current duration of the recording in seconds.
  const [duration, setDuration] = useState(0);
  // Stores any error messages that occur during the recording process, such as microphone access issues.
  const [error, setError] = useState<string | null>(null);
  // Holds a reference to the Web Audio API AnalyserNode, used for visualizing audio data.
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  // Stores the final audio recording as a Blob object after the recording is stopped.
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  // A mutable ref object to hold the MediaRecorder instance, allowing it to persist across re-renders without causing updates.
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // A mutable ref object to hold the AudioContext instance, essential for audio processing.
  const audioContextRef = useRef<AudioContext | null>(null);
  // A mutable ref object to hold the AnalyserNode instance for audio visualization.
  const analyserRef = useRef<AnalyserNode | null>(null);
  // A mutable ref object to hold the MediaStream object, representing the audio input from the microphone.
  const streamRef = useRef<MediaStream | null>(null);
  // A mutable ref object to accumulate Blob chunks of audio data during recording.
  const chunksRef = useRef<Blob[]>([]);
  // A mutable ref object to hold the ID of the interval timer used for tracking recording duration.
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Determines the preferred MIME type for the audio recording, falling back to a general webm type if opus is not supported.
  const MIME_TYPE =
    typeof MediaRecorder !== 'undefined' &&
    MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';
  // A memoized callback function responsible for stopping all active recording processes, releasing media streams, audio contexts, and clearing timers.
  const cleanup = useCallback(() => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    setAnalyserNode(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  // A memoized asynchronous callback function to initiate the audio recording process.
  const startRecording = useCallback(async () => {
    // Calls the cleanup function to ensure any previous recording resources are released before starting a new one.
    cleanup();
    // Resets the error state, clearing any previous errors.
    setError(null);
    // Resets the recording duration to zero.
    setDuration(0);
    // Clears the array holding audio data chunks for a fresh recording.
    chunksRef.current = [];
    try {
      // Requests access to the user's microphone, returning a MediaStream object.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stores the obtained media stream in a ref for later access and cleanup.
      streamRef.current = stream;
      // Determines the actual MIME type to use for the MediaRecorder, preferring 'audio/webm;codecs=opus' if supported.
      const mimeType = MediaRecorder.isTypeSupported(MIME_TYPE)
        ? MIME_TYPE
        : undefined;
      // Initializes a new MediaRecorder instance with the microphone stream and the determined MIME type.
      const mediaRecorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );
      // Stores the MediaRecorder instance in a ref for controlling recording actions.
      mediaRecorderRef.current = mediaRecorder;
      // Creates a new Web Audio API AudioContext for processing and analyzing audio.
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      // Stores the AudioContext instance in a ref for managing audio graph operations.
      audioContextRef.current = audioContext;
      // Creates an AudioNode from the MediaStream, allowing the microphone input to be processed by the audio context.
      const source = audioContext.createMediaStreamSource(stream);
      // Creates an AnalyserNode, which can provide real-time frequency and time-domain data.
      const analyser = audioContext.createAnalyser();
      // Sets the FFT (Fast Fourier Transform) size for the analyser, determining the frequency resolution.
      analyser.fftSize = 256;
      // Adjusts the smoothing time constant, which averages out sudden changes in the audio data for smoother visualization.
      analyser.smoothingTimeConstant = 0.8;
      // Connects the audio source (microphone stream) to the analyser node for processing.
      source.connect(analyser);
      // Stores the AnalyserNode in a ref for external access and potential manipulation.
      analyserRef.current = analyser;
      // Updates the state with the AnalyserNode, making it available for components to use for audio visualization.
      setAnalyserNode(analyser);
      // Sets up an event handler to collect audio data chunks as they become available from the MediaRecorder.
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      // Sets up an event handler that triggers when the MediaRecorder stops, processing the collected audio chunks.
      mediaRecorder.onstop = () => {
        // Creates a Blob object from the accumulated audio data chunks, representing the complete recording.
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType || MIME_TYPE,
        });
        // Updates the state with the newly created audio Blob, making it available for playback or download.
        setAudioBlob(blob);
        // Calls the cleanup function to release all resources associated with the stopped recording.
        cleanup();
      };
      // Starts the MediaRecorder, beginning the capture of audio data.
      mediaRecorder.start();
      // Sets the recording state to `true` to indicate that recording is active.
      setRecording(true);
      // Ensures the paused state is `false` when recording starts.
      setPaused(false);
      // Starts an interval timer to update the recording duration every second.
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } catch {
      // Sets an error message if microphone access is denied or unavailable.
      setError('Microphone access denied or unavailable.');
      // Calls cleanup to release any partially acquired resources if an error occurs during startup.
      cleanup();
    }
  }, [cleanup]);
  // A memoized callback function to stop the ongoing audio recording.
  const stopRecording = useCallback(() => {
    // Checks if the MediaRecorder exists and is in an active state before attempting to stop it.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      // Stops the MediaRecorder, triggering the `onstop` event to finalize the audio blob.
      mediaRecorderRef.current.stop();
    }
    // Sets the recording state to `false` as recording has ceased.
    setRecording(false);
    // Sets the paused state to `false` when recording stops.
    setPaused(false);
    // Clears the duration interval timer if it's active.
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  // A memoized callback function to pause the active audio recording.
  const pauseRecording = useCallback(() => {
    // Checks if the MediaRecorder exists and is currently recording before pausing.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      // Pauses the MediaRecorder, temporarily stopping audio data collection.
      mediaRecorderRef.current.pause();
      // Sets the paused state to `true` to reflect the recording status.
      setPaused(true);
      // Clears the duration interval timer when recording is paused.
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);
  // A memoized callback function to resume a paused audio recording.
  const resumeRecording = useCallback(() => {
    // Checks if the MediaRecorder exists and is currently paused before resuming.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'paused'
    ) {
      // Resumes the MediaRecorder, continuing audio data collection.
      mediaRecorderRef.current.resume();
      // Sets the paused state to `false` as recording has resumed.
      setPaused(false);
      // Restarts the duration interval timer if it's not already running.
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setDuration((d) => d + 1);
        }, 1000);
      }
    }
  }, []);
  // A memoized callback function to reset all recording-related states and resources to their initial values.
  const resetRecording = useCallback(() => {
    // Calls the cleanup function to release all media resources.
    cleanup();
    // Resets the recording state to `false`.
    setRecording(false);
    // Resets the paused state to `false`.
    setPaused(false);
    // Clears the stored audio Blob.
    setAudioBlob(null);
    // Resets the recording duration to zero.
    setDuration(0);
    // Clears any stored error messages.
    setError(null);
    // Clears the array holding audio data chunks.
    chunksRef.current = [];
  }, [cleanup]);
  // An effect hook that ensures the `cleanup` function is called when the component unmounts, preventing memory leaks.
  useEffect(() => () => cleanup(), [cleanup]);
  // Returns an object containing the current recording state, audio data, analyser node, duration, any errors, and control functions for external components to use.
  return {
    // Indicates if recording is active.
    recording,
    // Indicates if recording is paused.
    paused,
    // The recorded audio as a Blob.
    audioBlob,
    // The AnalyserNode for audio visualization.
    analyserNode,
    // The current recording duration in seconds.
    duration,
    // Any error message encountered.
    error,
    // Function to begin recording.
    startRecording,
    // Function to stop recording.
    stopRecording,
    // Function to pause recording.
    pauseRecording,
    // Function to resume recording.
    resumeRecording,
    // Function to reset all recording states.
    resetRecording,
  } as const;
}
