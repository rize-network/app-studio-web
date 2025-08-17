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
 * Update an exemple picture. Only image files are supported (mime type image/*).
 * @param formData
 * @returns any Media Upload Succeed
 * @throws ApiError
 */
export const uploadControllerPicture = (
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/upload/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not a picture.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * Update an exemple picture. Only image files are supported (mime type image/*).
 * @param formData
 * @returns any File Upload Succeed
 * @throws ApiError
 */
export const uploadControllerFile = (
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/upload/file`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * As a user, i want to list my files
 * @param objectType
 * @param objectId
 * @returns any Files listed
 * @throws ApiError
 */
export const uploadControllerList = (
  objectType: string,
  objectId: string,
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'GET',
    path: `/upload/list/${objectType}/${objectId}`,
    errors: {
      403: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to delete a file
 * @param id
 * @returns any file delete
 * @throws ApiError
 */
export const uploadControllerRemove = (
  id: string,
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/upload/remove/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `File does not exists`,
    },
  });
};

export const useUploadControllerPictureService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (formData: { file?: Blob }) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(uploadControllerPicture, { method, ...options });
};

export const useUploadControllerFileService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (formData: { file?: Blob }) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(uploadControllerFile, { method, ...options });
};

export const useUploadControllerListService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string, objectId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(uploadControllerList, { method, ...options });
};

export const useUploadControllerRemoveService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(uploadControllerRemove, { method, ...options });
};
