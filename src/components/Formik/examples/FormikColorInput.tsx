import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Vertical, Horizontal } from 'app-studio';
import { FormikForm } from '../Formik.Form';
import { FormikColorInput } from '../Formik.ColorInput';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';

const validationSchema = Yup.object({
  backgroundColor: Yup.string().required('Background color is required'),
  textColor: Yup.string().required('Text color is required'),
  accentColor: Yup.string().required('Accent color is required'),
});

export const FormikColorInputExample = () => {
  return (
    <Formik
      initialValues={{
        backgroundColor: 'color-blue-500',
        textColor: 'color-white',
        accentColor: 'color-orange-500',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, isSubmitting }) => (
        <FormikForm>
          <Vertical gap={16} width="400px">
            <FormikColorInput
              name="backgroundColor"
              label="Background Color"
              helperText="Choose the main background color"
            />

            <FormikColorInput
              name="textColor"
              label="Text Color"
              helperText="Choose the primary text color"
            />

            <FormikColorInput
              name="accentColor"
              label="Accent Color"
              helperText="Choose an accent color for highlights"
              showCustomInput={false}
            />

            {/* Preview */}
            <Vertical
              gap={8}
              padding="16px"
              borderRadius="8px"
              backgroundColor={values.backgroundColor}
              color={values.textColor}
              borderWidth="2px"
              borderStyle="solid"
              borderColor={values.accentColor}
            >
              <Text fontWeight="bold">Live Preview</Text>
              <Text>This preview updates as you change the colors above</Text>
              <Text color={values.accentColor} fontWeight="500">
                This text uses the accent color
              </Text>
            </Vertical>

            <Horizontal gap={8}>
              <Button type="submit" variant="filled" isDisabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Theme'}
              </Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </Horizontal>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
