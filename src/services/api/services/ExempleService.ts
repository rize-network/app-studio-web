/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateExempleParams } from '../models/CreateExempleParams';
import type { FindExempleParams } from '../models/FindExempleParams';
import type { UpdateExempleParams } from '../models/UpdateExempleParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to create an exemple
 * @param requestBody
 * @returns any Exemple created
 * @throws ApiError
 */
export const exempleControllerCreate = (
  requestBody: CreateExempleParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/exemple`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to find by name
 * @param requestBody
 * @returns any Exemples found
 * @throws ApiError
 */
export const exempleControllerFind = (
  requestBody: FindExempleParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/exemple/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to count exemples found by name
 * @param requestBody
 * @returns any Number of Exemples found
 * @throws ApiError
 */
export const exempleControllerCount = (
  requestBody: FindExempleParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/exemple/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to read an exemple
 * @param id
 * @returns any Exemple's data
 * @throws ApiError
 */
export const exempleControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/exemple/${id}`,
    errors: {
      401: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a user, i want to delete an exemple
 * @param id
 * @returns any Exemple delete
 * @throws ApiError
 */
export const exempleControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/exemple/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * as a user, i want to update an exemple
 * @param id
 * @param requestBody
 * @returns any Exemple Updated
 * @throws ApiError
 */
export const exempleControllerUpdate = (
  id: string,
  requestBody: UpdateExempleParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/exemple/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * Update an exemple picture. Only image files are supported (mime type image/*).
 * @param id
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const exempleUploadControllerPicture = (
  id: string,
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/exemple/${id}/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * Update an exemple file.
 * @param id
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const exempleUploadControllerFile = (
  id: string,
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/exemple/${id}/file`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required file is empty`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

export const useExempleControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateExempleParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleControllerCreate, { method, ...options });
};

export const useExempleControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindExempleParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleControllerFind, { method, ...options });
};

export const useExempleControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindExempleParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleControllerCount, { method, ...options });
};

export const useExempleControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleControllerRead, { method, ...options });
};

export const useExempleControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleControllerDelete, { method, ...options });
};

export const useExempleControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateExempleParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleControllerUpdate, { method, ...options });
};

export const useExempleUploadControllerPictureService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    id: string,
    formData: {
      file?: Blob;
    }
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleUploadControllerPicture, { method, ...options });
};

export const useExempleUploadControllerFileService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    id: string,
    formData: {
      file?: Blob;
    }
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(exempleUploadControllerFile, { method, ...options });
};
