/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNewsParams } from '../models/CreateNewsParams';
import type { FindNewsParams } from '../models/FindNewsParams';
import type { UpdateNewsParams } from '../models/UpdateNewsParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a news
 * @param requestBody
 * @returns any News created
 * @throws ApiError
 */
export const newsControllerCreate = (
  requestBody: CreateNewsParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/news`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to find news by title
 * @param requestBody
 * @returns any News found
 * @throws ApiError
 */
export const newsControllerFind = (
  requestBody: FindNewsParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/news/find`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to count found by title
 * @returns any Number of News found
 * @throws ApiError
 */
export const newsControllerCount = (): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/news/count`,
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read an news
 * @param id
 * @returns any News data
 * @throws ApiError
 */
export const newsControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/news/${id}`,
    errors: {
      404: `News does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a news
 * @param id
 * @returns any news delete
 * @throws ApiError
 */
export const newsControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/news/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `News does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a news
 * @param id
 * @param requestBody
 * @returns any News Updated
 * @throws ApiError
 */
export const newsControllerUpdate = (
  id: string,
  requestBody: UpdateNewsParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/news/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `News does not exists`,
    },
  });
};

/**
 * Update a news image. Only image files are supported (mime type image/*).
 * @param id
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const newsUploadControllerPicture = (
  id: string,
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/news/${id}/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
      404: `News not found.`,
    },
  });
};

export const useNewsControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateNewsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsControllerCreate, { method, ...options });
};

export const useNewsControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindNewsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsControllerFind, { method, ...options });
};

export const useNewsControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsControllerCount, { method, ...options });
};

export const useNewsControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsControllerRead, { method, ...options });
};

export const useNewsControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsControllerDelete, { method, ...options });
};

export const useNewsControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateNewsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsControllerUpdate, { method, ...options });
};

export const useNewsUploadControllerPictureService = ({
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
  return useRequest(newsUploadControllerPicture, { method, ...options });
};
