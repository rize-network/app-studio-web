import React from 'react';
import { AudioInputView } from './AudioInput/AudioInput.view';
import { useAudioInputState } from './AudioInput/AudioInput.state';
import { AudioInputProps } from './AudioInput/AudioInput.props';
// This file defines the main AudioInput functional component, acting as the primary orchestrator. It manages the component's state using the 'useAudioInputState' hook and renders the visual presentation through the 'AudioInputView' component, passing along both properties and managed state.
export function AudioInput(props: AudioInputProps) {
  const state = useAudioInputState(props);
  return <AudioInputView {...props} {...state} />;
}
export default AudioInput;
