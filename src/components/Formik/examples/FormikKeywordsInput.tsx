import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Vertical, Horizontal, Text } from 'app-studio';
import { FormikKeywordsInput } from '../Formik.KeywordsInput';
import { Button } from '../../Button/Button';

/**
 * Validation schema for the form
 */
const validationSchema = Yup.object({
  skills: Yup.array()
    .of(Yup.string().min(2, 'Skill must be at least 2 characters'))
    .min(1, 'At least one skill is required')
    .max(10, 'Maximum 10 skills allowed'),
  interests: Yup.array().of(Yup.string()).max(5, 'Maximum 5 interests allowed'),
});

/**
 * Basic Formik KeywordsInput example
 */
export const FormikKeywordsInputExample = () => {
  const initialValues = {
    skills: ['React', 'TypeScript'],
    interests: [],
  };

  const handleSubmit = (values: typeof initialValues) => {
    alert(
      `Form submitted with:\nSkills: ${values.skills.join(
        ', '
      )}\nInterests: ${values.interests.join(', ')}`
    );
  };

  return (
    <Vertical gap={20}>
      <Text>Formik Integration Example:</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Vertical gap={16}>
              <FormikKeywordsInput
                name="skills"
                label="Technical Skills"
                placeholder="Add your technical skills..."
                maxKeywords={10}
                minKeywordLength={2}
                allowDuplicates={false}
                separators={['enter', 'comma']}
                helperText="Add your technical skills (2-50 characters each)"
                variant="outline"
                shape="rounded"
              />

              <FormikKeywordsInput
                name="interests"
                label="Interests"
                placeholder="Add your interests..."
                maxKeywords={5}
                separators={['enter', 'comma', 'space']}
                helperText="Add up to 5 interests"
                variant="outline"
                shape="rounded"
              />

              <Horizontal gap={12} alignItems="center">
                <Button type="submit" variant="filled" size="md">
                  Submit Form
                </Button>

                <Text fontSize={14} color="color.gray.600">
                  Skills: {values.skills.length}, Interests:{' '}
                  {values.interests.length}
                </Text>
              </Horizontal>

              {/* Display validation errors */}
              {(errors.skills || errors.interests) && (
                <Vertical gap={8}>
                  {errors.skills && touched.skills && (
                    <Text fontSize={12} color="color.red.500">
                      Skills: {errors.skills}
                    </Text>
                  )}
                  {errors.interests && touched.interests && (
                    <Text fontSize={12} color="color.red.500">
                      Interests: {errors.interests}
                    </Text>
                  )}
                </Vertical>
              )}
            </Vertical>
          </Form>
        )}
      </Formik>
    </Vertical>
  );
};

/**
 * Advanced Formik KeywordsInput example with custom validation
 */
export const AdvancedFormikKeywordsInputExample = () => {
  const initialValues = {
    tags: ['frontend', 'backend'],
  };

  const customValidationSchema = Yup.object({
    tags: Yup.array()
      .of(
        Yup.string()
          .matches(
            /^[a-zA-Z0-9-_]+$/,
            'Tags can only contain letters, numbers, hyphens, and underscores'
          )
          .min(3, 'Tag must be at least 3 characters')
          .max(20, 'Tag must be at most 20 characters')
      )
      .min(2, 'At least 2 tags are required')
      .max(8, 'Maximum 8 tags allowed'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Advanced form submitted:', values);
    alert(`Advanced form submitted with tags: ${values.tags.join(', ')}`);
  };

  return (
    <Vertical gap={20}>
      <Text>Advanced Formik Example with Custom Validation:</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={customValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid }) => (
          <Form>
            <Vertical gap={16}>
              <FormikKeywordsInput
                name="tags"
                label="Project Tags"
                placeholder="Add project tags (alphanumeric, -, _)..."
                maxKeywords={8}
                minKeywordLength={3}
                maxKeywordLength={20}
                allowDuplicates={false}
                separators={['enter', 'comma']}
                helperText="Tags: 3-20 chars, alphanumeric with - and _ only"
                variant="outline"
                shape="pillShaped"
                size="lg"
                views={{
                  keyword: {
                    backgroundColor: isValid
                      ? 'color.green.100'
                      : 'color.red.100',
                    borderColor: isValid ? 'color.green.300' : 'color.red.300',
                  },
                  keywordText: {
                    color: isValid ? 'color.green.700' : 'color.red.700',
                  },
                }}
              />

              <Horizontal gap={12} alignItems="center">
                <Button
                  type="submit"
                  variant="filled"
                  size="md"
                  isDisabled={!isValid}
                >
                  Submit Advanced Form
                </Button>

                <Text fontSize={14} color="color.gray.600">
                  {values.tags.length}/8 tags • Valid: {isValid ? 'Yes' : 'No'}
                </Text>
              </Horizontal>

              {errors.tags && touched.tags && (
                <Text fontSize={12} color="color.red.500">
                  {errors.tags}
                </Text>
              )}
            </Vertical>
          </Form>
        )}
      </Formik>
    </Vertical>
  );
};
