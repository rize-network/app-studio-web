import React from 'react';
import { SliderProps } from './Slider/Slider.props';
import { useSliderState } from './Slider/Slider.state';
import { SliderView } from './Slider/Slider.view';

const SliderComponent: React.FC<SliderProps> = (props) => {
  // Get state and handlers from the custom hook
  const sliderState = useSliderState(props);

  // Render the view component, passing down props and state
  return <SliderView {...props} {...sliderState} />;
};

/**
 * Slider allows users to select a value from a range by moving a handle.
 */
export const Slider = SliderComponent;
