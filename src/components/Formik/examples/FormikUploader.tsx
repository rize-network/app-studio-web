import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { Vertical, Text } from 'app-studio';

import { Button } from '../../Button/Button';
import { FormikForm } from '../Formik.Form';
import { FormikUploader, UploadFileHandler } from '../Formik.Uploader';
import { AttachmentPreview } from '../AttachmentPreview';

interface FormValues {
  attachments: Array<Record<string, unknown>>;
}

interface FileWithPreview {
  name: string;
  size: number;
  type: string;
  url?: string;
  lastModified: number;
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
        // Create a preview URL for the file
        const previewUrl = URL.createObjectURL(file);
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          url: previewUrl,
        });
      }
    }, 150);
  });
};

export const FormikUploaderExample = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);

  const handleRemoveFile = (
    index: number,
    setFieldValue: (field: string, value: any) => void,
    currentValues: Array<Record<string, unknown>>
  ) => {
    // Remove from preview state
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);

    // Remove from Formik values
    const newValues = currentValues.filter((_, i) => i !== index);
    setFieldValue('attachments', newValues);
  };

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
              onUploadSuccess={(file, response) => {
                console.log(`Uploaded ${file.name} successfully`);
                // Add to preview state
                setUploadedFiles((prev) => [
                  ...prev,
                  response as FileWithPreview,
                ]);
              }}
            />

            {/* Attachment Preview */}
            {uploadedFiles.length > 0 && (
              <AttachmentPreview
                files={uploadedFiles}
                onRemove={(index) =>
                  handleRemoveFile(
                    index,
                    props.setFieldValue,
                    props.values.attachments
                  )
                }
              />
            )}

            <Text fontSize={12} color="color-gray-600">
              Uploaded {uploadedFiles.length} file(s)
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
