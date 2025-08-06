/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Upload a file for prompt attachment
 * Upload any file type to be attached to a prompt. Supports documents, images, and other file types up to 10MB.
 * @param formData
 * @returns any File uploaded successfully
 * @throws ApiError
 */
export const promptUploadControllerUploadPromptFile = (
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/prompt/upload/file`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Bad request - file is empty or invalid`,
      403: `Forbidden - insufficient permissions`,
    },
  });
};

export const usePromptUploadControllerUploadPromptFileService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (formData: { file?: Blob }) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(promptUploadControllerUploadPromptFile, {
    method,
    ...options,
  });
};
