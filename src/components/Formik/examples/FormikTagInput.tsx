import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Vertical, Horizontal, Text } from 'app-studio';
import { FormikTagInput } from '../Formik.TagInput';
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
 * Initial form values
 */
const initialValues = {
  skills: ['React', 'TypeScript'],
  interests: [],
};

/**
 * Basic Formik TagInput example
 */
export const FormikTagInputExample = () => {
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
    alert(
      `Form submitted with:\nSkills: ${values.skills.join(
        ', '
      )}\nInterests: ${values.interests.join(', ')}`
    );
  };

  return (
    <Vertical gap={20} padding={20}>
      <Text fontSize={18} fontWeight="bold">
        Formik TagInput Example
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Vertical gap={20}>
              {/* Skills TagInput */}
              <FormikTagInput
                name="skills"
                label="Skills"
                placeholder="Add your skills..."
                helperText="Add programming languages, frameworks, or technologies you know"
                maxTags={10}
                minTagLength={2}
                maxTagLength={30}
                allowDuplicates={false}
                separators={['enter', 'comma', 'space']}
                variant="outline"
                shape="rounded"
                size="md"
              />

              {/* Interests TagInput */}
              <FormikTagInput
                name="interests"
                label="Interests"
                placeholder="Add your interests..."
                helperText="Add hobbies, interests, or topics you're passionate about"
                maxTags={5}
                minTagLength={1}
                maxTagLength={50}
                allowDuplicates={true}
                separators={['enter', 'comma']}
                variant="outline"
                shape="pillShaped"
                size="md"
              />

              {/* Form Values Display */}
              <Vertical
                gap={10}
                padding={16}
                backgroundColor="color.gray.50"
                borderRadius="8px"
              >
                <Text fontWeight="bold">Current Form Values:</Text>
                <Text fontSize={14}>
                  Skills:{' '}
                  {values.skills.length > 0 ? values.skills.join(', ') : 'None'}
                </Text>
                <Text fontSize={14}>
                  Interests:{' '}
                  {values.interests.length > 0
                    ? values.interests.join(', ')
                    : 'None'}
                </Text>
              </Vertical>

              {/* Error Display */}
              {(errors.skills || errors.interests) && (
                <Vertical
                  gap={5}
                  padding={16}
                  backgroundColor="color.red.50"
                  borderRadius="8px"
                >
                  <Text fontWeight="bold" color="color.red.600">
                    Validation Errors:
                  </Text>
                  {errors.skills && touched.skills && (
                    <Text fontSize={14} color="color.red.600">
                      Skills: {errors.skills}
                    </Text>
                  )}
                  {errors.interests && touched.interests && (
                    <Text fontSize={14} color="color.red.600">
                      Interests: {errors.interests}
                    </Text>
                  )}
                </Vertical>
              )}

              {/* Submit Button */}
              <Horizontal justifyContent="flex-start">
                <Button
                  type="submit"
                  variant="filled"
                  size="md"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Submit Form
                </Button>
              </Horizontal>
            </Vertical>
          </Form>
        )}
      </Formik>
    </Vertical>
  );
};

/**
 * Advanced Formik TagInput example with custom styling
 */
export const FormikTagInputAdvanced = () => {
  const advancedInitialValues = {
    categories: ['Web Development', 'UI/UX'],
  };

  const advancedValidationSchema = Yup.object({
    categories: Yup.array()
      .of(Yup.string().min(3, 'Category must be at least 3 characters'))
      .min(2, 'At least 2 categories are required')
      .max(8, 'Maximum 8 categories allowed'),
  });

  return (
    <Vertical gap={20} padding={20}>
      <Text fontSize={18} fontWeight="bold">
        Advanced Formik TagInput with Custom Styling
      </Text>

      <Formik
        initialValues={advancedInitialValues}
        validationSchema={advancedValidationSchema}
        onSubmit={(values) => console.log('Advanced form:', values)}
      >
        {({ values }) => (
          <Form>
            <Vertical gap={20}>
              <FormikTagInput
                name="categories"
                label="Project Categories"
                placeholder="Add project categories..."
                helperText="Categorize your project for better organization"
                maxTags={8}
                minTagLength={3}
                maxTagLength={25}
                allowDuplicates={false}
                separators={['enter', 'comma']}
                variant="none"
                shape="rounded"
                size="lg"
                shadow={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
                views={{
                  inputContainer: {
                    borderColor: 'theme.primary',
                    borderWidth: '2px',
                    backgroundColor: 'color.blue.50',
                  },
                  tag: {
                    backgroundColor: 'theme.primary',
                    borderColor: 'theme.primary',
                  },
                  tagText: {
                    color: 'color.white',
                  },
                  tagRemove: {
                    _hover: {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  label: {
                    color: 'theme.primary',
                    fontWeight: 'bold',
                  },
                }}
              />

              <Text fontSize={14} color="color.gray.600">
                Categories: {values.categories.join(' • ')}
              </Text>
            </Vertical>
          </Form>
        )}
      </Formik>
    </Vertical>
  );
};
