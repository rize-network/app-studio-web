/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateContentParams } from '../models/CreateContentParams';
import type { FindContentParams } from '../models/FindContentParams';
import type { UpdateContentParams } from '../models/UpdateContentParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create an content
 * @param requestBody
 * @returns any content created
 * @throws ApiError
 */
export const contentControllerCreate = (
  requestBody: CreateContentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/content`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to find by name
 * @param requestBody
 * @returns any contents found
 * @throws ApiError
 */
export const contentControllerFind = (
  requestBody: FindContentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/content/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a admin, i want to count contents found by name
 * @param requestBody
 * @returns any Number of contents found
 * @throws ApiError
 */
export const contentControllerCount = (
  requestBody: FindContentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/content/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a admin, i want to read an content
 * @param id
 * @returns any content's data
 * @throws ApiError
 */
export const contentControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/content/${id}`,
    errors: {
      401: `Incorrect credentials`,
      404: `content doesn't exists`,
    },
  });
};

/**
 * As a admin, i want to delete an content
 * @param id
 * @returns any content delete
 * @throws ApiError
 */
export const contentControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/content/${id}`,
    errors: {
      404: `content doesn't exists`,
    },
  });
};

/**
 * as a admin, i want to update an content
 * @param id
 * @param requestBody
 * @returns any content Updated
 * @throws ApiError
 */
export const contentControllerUpdate = (
  id: string,
  requestBody: UpdateContentParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/content/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `content doesn't exists`,
    },
  });
};

export const useContentControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateContentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(contentControllerCreate, { method, ...options });
};

export const useContentControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindContentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(contentControllerFind, { method, ...options });
};

export const useContentControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindContentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(contentControllerCount, { method, ...options });
};

export const useContentControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(contentControllerRead, { method, ...options });
};

export const useContentControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(contentControllerDelete, { method, ...options });
};

export const useContentControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateContentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(contentControllerUpdate, { method, ...options });
};
