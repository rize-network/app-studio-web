import React from 'react';

import { SliderProps } from '../Slider/Slider/Slider.props';
import { useSliderState } from '../Slider/Slider/Slider.state';
import { SliderView } from '../Slider/Slider/Slider.view';
import { useFormikInput } from './Formik.Hook';

const SliderComponent: React.FC<SliderProps> = (props) => {
  // Get Formik props (value, onChange, etc.)
  const formProps = useFormikInput(props);
  
  // Get slider state and handlers
  const sliderState = useSliderState({
    ...props,
    value: formProps.value !== undefined ? Number(formProps.value) : undefined,
    onChange: (value: number) => {
      // Call Formik's onChange
      formProps.onChange(value);
      // Call the original onChange if provided
      props.onChange?.(value);
    }
  });

  // Render the slider with both Formik props and slider state
  return <SliderView {...props} {...sliderState} {...formProps} />;
};

/**
 * Slider component integrated with Formik for form state management.
 * Allows users to select a value from a range by moving a handle.
 */
export const FormikSlider = SliderComponent;
