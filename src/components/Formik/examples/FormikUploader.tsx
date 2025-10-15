import React from 'react';
import { Formik, FormikProps } from 'formik';
import { Vertical, Text } from 'app-studio';

import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikUploader, UploadFileHandler } from '../Formik.Uploader';

interface FormValues {
  attachments: Array<Record<string, unknown>>;
}

const mockUpload: UploadFileHandler = async (file, onProgress) => {
  return new Promise((resolve) => {
    const totalSteps = 5;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      onProgress(Math.min(100, Math.round((currentStep / totalSteps) * 100)));

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        });
      }
    }, 150);
  });
};

export const FormikUploaderExample = () => {
  return (
    <Formik<FormValues>
      initialValues={{ attachments: [] }}
      onSubmit={console.log}
    >
      {(props: FormikProps<FormValues>) => (
        <FormikForm gap={16}>
          <Vertical gap={12}>
            <FormikUploader
              name="attachments"
              text="Upload supporting files"
              multiple
              uploadFile={mockUpload}
              accept="image/*,application/pdf"
              onUploadSuccess={(file) =>
                console.log(`Uploaded ${file.name} successfully`)
              }
            />

            <Text fontSize={12}>
              Stored value: {JSON.stringify(props.values.attachments, null, 2)}
            </Text>

            <Button
              type="submit"
              alignSelf="flex-start"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </Vertical>
        </FormikForm>
      )}
    </Formik>
  );
};
