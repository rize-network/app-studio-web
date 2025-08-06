/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FixComponentParams } from '../models/FixComponentParams';
import type { UpdateComponentParams } from '../models/UpdateComponentParams';
import type { UpdateComponentPropsParams } from '../models/UpdateComponentPropsParams';
import type { UpdateImagePropsParams } from '../models/UpdateImagePropsParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to read an component
 * @param id
 * @returns any Exemple's data
 * @throws ApiError
 */
export const componentControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/component/${id}`,
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a user, i want to delete an component
 * @param id
 * @returns any Exemple delete
 * @throws ApiError
 */
export const componentControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/component/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * as a user, i want to update an component
 * @param id
 * @param requestBody
 * @returns any Exemple Updated
 * @throws ApiError
 */
export const componentControllerUpdate = (
  id: string,
  requestBody: UpdateComponentParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/component/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to refresh the image component
 * @param id
 * @param requestBody
 * @returns any Image fetched successfully
 * @throws ApiError
 */
export const componentControllerRefreshImage = (
  id: string,
  requestBody: UpdateImagePropsParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/component/${id}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As an admin, I want to get all components
 * @param pageId
 * @returns any All components fetched
 * @throws ApiError
 */
export const componentControllerReadAll = (
  pageId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/component/project/${pageId}`,
    errors: {
      404: `Components does not exists`,
    },
  });
};

/**
 * As a user, i want to generate a new code for my component
 * @param id
 * @param requestBody
 * @returns any Component Code Fixed
 * @throws ApiError
 */
export const componentControllerFix = (
  id: string,
  requestBody: FixComponentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/component/fix/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a user, i want to update my text props
 * @param id
 * @param requestBody
 * @returns any Image fetched successfully
 * @throws ApiError
 */
export const componentControllerUpdateProps = (
  id: string,
  requestBody: UpdateComponentPropsParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/component/${id}/update/props`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Update an exemple picture. Only image files are supported (mime type image/*).
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const componentUploadControllerPicture = (
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/component/upload/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

export const useComponentControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerRead, { method, ...options });
};

export const useComponentControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerDelete, { method, ...options });
};

export const useComponentControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateComponentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerUpdate, { method, ...options });
};

export const useComponentControllerRefreshImageService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateImagePropsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerRefreshImage, { method, ...options });
};

export const useComponentControllerReadAllService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (pageId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerReadAll, { method, ...options });
};

export const useComponentControllerFixService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: FixComponentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerFix, { method, ...options });
};

export const useComponentControllerUpdatePropsService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateComponentPropsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentControllerUpdateProps, { method, ...options });
};

export const useComponentUploadControllerPictureService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (formData: { file?: Blob }) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentUploadControllerPicture, { method, ...options });
};
