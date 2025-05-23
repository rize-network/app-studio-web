import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikSlider } from '../Formik.Slider';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const FormikSliderExample = () => {
  // Define initial values
  const initialValues = {
    basicSlider: 50,
    priceRange: 25,
    stepSlider: 40,
  };

  // Define validation schema
  const validationSchema = Yup.object().shape({
    basicSlider: Yup.number()
      .min(0, 'Value must be at least 0')
      .max(100, 'Value must be at most 100')
      .required('Required'),
    priceRange: Yup.number()
      .min(0, 'Value must be at least 0')
      .max(100, 'Value must be at most 100')
      .required('Required'),
    stepSlider: Yup.number()
      .oneOf([0, 20, 40, 60, 80, 100], 'Value must be one of the step values')
      .required('Required'),
  });

  // Define specific step values for the step slider
  const stepValues = [0, 20, 40, 60, 80, 100];

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleSubmit }) => (
        <FormikForm>
          <Vertical gap={30} width="100%" maxWidth={500}>
            {/* Basic slider */}
            <FormikSlider
              name="basicSlider"
              label="Basic Slider"
              min={0}
              max={100}
              step={1}
              showValue
              helperText="Drag the slider to adjust the value"
            />

            {/* Price range slider with custom styling */}
            <Vertical gap={10}>
              <Text fontWeight="bold">Price Range: ${values.priceRange}</Text>
              <FormikSlider
                name="priceRange"
                min={0}
                max={100}
                step={5}
                showTooltip
                views={{
                  track: {
                    backgroundColor: 'color.blue.100',
                    height: 8,
                  },
                  progress: {
                    backgroundColor: 'color.blue.500',
                  },
                  thumb: {
                    backgroundColor: 'color.white',
                    border: '2px solid color.blue.500',
                  },
                  tooltip: {
                    backgroundColor: 'color.blue.500',
                    color: 'color.white',
                  },
                }}
              />
            </Vertical>

            {/* Step slider with specific values */}
            <FormikSlider
              name="stepSlider"
              label="Step Slider"
              min={0}
              max={100}
              stepValues={stepValues}
              showValue
              helperText="This slider only allows specific values"
            />

            {/* Display current values */}
            <Vertical
              padding={16}
              backgroundColor="color.gray.100"
              borderRadius={8}
            >
              <Text fontWeight="bold">Current Values:</Text>
              <Text>Basic Slider: {values.basicSlider}</Text>
              <Text>Price Range: ${values.priceRange}</Text>
              <Text>Step Slider: {values.stepSlider}</Text>
            </Vertical>

            {/* Submit button */}
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
