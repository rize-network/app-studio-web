import React from 'react';
import { SliderProps } from './Slider/Slider.props';
import { useSliderState } from './Slider/Slider.state';
import SliderView from './Slider/Slider.view';

const SliderComponent: React.FC<SliderProps> = (props) => {
  const sliderStates = useSliderState(props);
  return <SliderView {...sliderStates} {...props} />;
};

export const Slider = SliderComponent;
