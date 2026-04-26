import React from 'react';
import { SliderProps } from './Slider/Slider.props';
import { useSliderState } from './Slider/Slider.state';
import { SliderView } from './Slider/Slider.view';
// This file defines the main Slider component, which integrates the slider's state management logic with its presentation via the SliderView and useSliderState hook.
const SliderComponent: React.FC<SliderProps> = (props) => {
  const sliderState = useSliderState(props);
  return <SliderView {...props} {...sliderState} />;
};
export const Slider = SliderComponent;
