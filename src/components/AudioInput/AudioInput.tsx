'use client';

import React from 'react';
import { AudioInputView } from './AudioInput/AudioInput.view';
import { useAudioInputState } from './AudioInput/AudioInput.state';
import { AudioInputProps } from './AudioInput/AudioInput.props';

export function AudioInput(props: AudioInputProps) {
  const state = useAudioInputState(props);

  return <AudioInputView {...props} {...state} />;
}

export default AudioInput;
