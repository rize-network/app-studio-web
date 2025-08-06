/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FindPageParams } from '../models/FindPageParams';
import type { FixPageParams } from '../models/FixPageParams';
import type { UpdatePageParams } from '../models/UpdatePageParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, I want to read a specific page
 * @param id
 * @returns any page details fetched
 * @throws ApiError
 */
export const pageControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/page/${id}`,
    errors: {
      404: `page not found`,
    },
  });
};

/**
 * As an admin, I want to delete a page
 * @param id
 * @returns any page deleted
 * @throws ApiError
 */
export const pageControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/page/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `page not found`,
    },
  });
};

/**
 * As an admin, I want to update a page
 * @param id
 * @param requestBody
 * @returns any page updated
 * @throws ApiError
 */
export const pageControllerUpdate = (
  id: string,
  requestBody: UpdatePageParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/page/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, I want to read a specific page
 * @param id
 * @returns any page details fetched
 * @throws ApiError
 */
export const pageControllerComponents = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/page/${id}/components`,
    errors: {
      404: `page not found`,
    },
  });
};

/**
 * As a user, I want to find a specific page by criteria
 * @param requestBody
 * @returns any History found
 * @throws ApiError
 */
export const pageControllerFind = (
  requestBody: FindPageParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As an admin, I want to get all page
 * @param projectId
 * @returns any All page fetched
 * @throws ApiError
 */
export const pageControllerReadAll = (
  projectId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/page/project/${projectId}`,
    errors: {
      404: `pages does not exists`,
    },
  });
};

/**
 * As a user, i want to generate a new code for my page
 * @param id
 * @param requestBody
 * @returns any Page Code Fixed
 * @throws ApiError
 */
export const pageControllerFix = (
  id: string,
  requestBody: FixPageParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/fix/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

export const usePageControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerRead, { method, ...options });
};

export const usePageControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerDelete, { method, ...options });
};

export const usePageControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdatePageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerUpdate, { method, ...options });
};

export const usePageControllerComponentsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerComponents, { method, ...options });
};

export const usePageControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindPageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerFind, { method, ...options });
};

export const usePageControllerReadAllService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (projectId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerReadAll, { method, ...options });
};

export const usePageControllerFixService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: FixPageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerFix, { method, ...options });
};
