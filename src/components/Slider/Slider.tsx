import React from 'react';
import { SliderProps } from './Slider/Slider.props';
import { useSliderState } from './Slider/Slider.state';
import { SliderView } from './Slider/Slider.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// This file defines the main Slider component, which integrates the slider's state management logic with its presentation via the SliderView and useSliderState hook.
const SliderComponent: React.FC<SliderProps> = (props) => {
  const mergedProps = useMergedDesignSystemComponentProps('slider', props);
  const sliderState = useSliderState(mergedProps);
  return <SliderView {...mergedProps} {...sliderState} />;
};
export const Slider = SliderComponent;
