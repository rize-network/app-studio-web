import React, { useCallback, useState } from 'react';
import { FormikValues, getIn, useFormikContext } from 'formik';

import { Uploader } from '../Uploader/Uploader';
import type { UploadProps } from '../Uploader/Uploader/Uploader.props';
import { UploadService } from 'src/services/api';

export type UploadFileHandler = (
  file: File,
  onProgress: (progress: number) => void
) => Promise<any>;

export interface FormikUploaderProps
  extends Omit<
    UploadProps,
    'onFileSelect' | 'onMultipleFileSelect' | 'isLoading' | 'progress'
  > {
  /**
   * Name of the field that will receive the uploaded file responses
   */
  name: string;
  /**
   * Custom upload handler. Defaults to the platform UploadService
   */
  uploadFile?: UploadFileHandler;
  /**
   * Callback fired when a single file upload succeeds
   */
  onUploadSuccess?: (file: File, response: any) => void;
  /**
   * Callback fired when a single file upload fails
   */
  onUploadError?: (file: File, error: unknown) => void;
  /**
   * Transform the raw upload response before storing it in the form state
   */
  transformResponse?: (response: any, file: File) => any;
  /**
   * Optional external handler mirroring the Uploader prop
   */
  onMultipleFileSelect?: (files: File[]) => void;
  /**
   * Optional external handler mirroring the Uploader prop for single upload mode
   */
  onFileSelect?: (file: File) => void;
  /**
   * Enable/disable multiple uploads. Defaults to true
   */
  multiple?: boolean;
}

const defaultUploadFile: UploadFileHandler = (file, onProgress) => {
  return UploadService.uploadControllerFile({ file }, onProgress);
};

const toArrayValue = (value: any) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [value];
};

export const FormikUploader: React.FC<FormikUploaderProps> = ({
  name,
  uploadFile = defaultUploadFile,
  onUploadSuccess,
  onUploadError,
  transformResponse,
  onMultipleFileSelect,
  onFileSelect,
  multiple = true,
  ...props
}) => {
  const { setFieldValue, setFieldTouched, values } =
    useFormikContext<FormikValues>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = useCallback(
    async (files: File[]) => {
      if (!files || files.length === 0) {
        return;
      }

      setFieldTouched(name, true, true);
      setIsUploading(true);

      const uploadedResponses: any[] = [];

      for (const file of files) {
        setUploadProgress(0);

        try {
          const response = await uploadFile(file, (progress) => {
            setUploadProgress(progress ?? 0);
          });

          const processedResponse = transformResponse
            ? transformResponse(response, file)
            : response;

          uploadedResponses.push(processedResponse);
          onUploadSuccess?.(file, processedResponse);
        } catch (error) {
          onUploadError?.(file, error);
        }
      }

      if (uploadedResponses.length > 0) {
        const currentValue = toArrayValue(getIn(values, name));
        setFieldValue(name, [...currentValue, ...uploadedResponses], true);
        setUploadProgress(100);
      } else {
        setUploadProgress(0);
      }

      setIsUploading(false);
    },
    [
      name,
      onUploadError,
      onUploadSuccess,
      setFieldTouched,
      setFieldValue,
      transformResponse,
      uploadFile,
      values,
    ]
  );

  const handleMultiple = useCallback(
    async (files: File[]) => {
      onMultipleFileSelect?.(files);
      await handleUpload(files);
    },
    [handleUpload, onMultipleFileSelect]
  );

  const handleSingle = useCallback(
    async (file: File) => {
      onFileSelect?.(file);
      await handleUpload([file]);
    },
    [handleUpload, onFileSelect]
  );

  return (
    <Uploader
      {...props}
      multiple={multiple}
      onMultipleFileSelect={multiple ? handleMultiple : undefined}
      onFileSelect={!multiple ? handleSingle : undefined}
      isLoading={isUploading}
      progress={uploadProgress}
    />
  );
};

FormikUploader.displayName = 'FormikUploader';
