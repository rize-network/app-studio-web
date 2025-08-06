/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateHomeParams } from '../models/CreateHomeParams';
import type { UpdateHomeParams } from '../models/UpdateHomeParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to create an home
 * @param requestBody
 * @returns any Home created
 * @throws ApiError
 */
export const homeControllerCreate = (
  requestBody: CreateHomeParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/home`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to get home sections
 * @returns any Home's Data
 * @throws ApiError
 */
export const homeControllerFind = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/home`,
  });
};

/**
 * As a user, i want to read an home
 * @param id
 * @returns any Home's data
 * @throws ApiError
 */
export const homeControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/home/${id}`,
    errors: {
      401: `Incorrect credentials`,
      404: `Home section doesn't exists`,
    },
  });
};

/**
 * As a user, i want to delete an home
 * @param id
 * @returns any Home delete
 * @throws ApiError
 */
export const homeControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/home/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Home doesn't exists`,
    },
  });
};

/**
 * as a user, i want to update an home
 * @param id
 * @param requestBody
 * @returns any Home section Updated
 * @throws ApiError
 */
export const homeControllerUpdate = (
  id: string,
  requestBody: UpdateHomeParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/home/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useHomeControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateHomeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(homeControllerCreate, { method, ...options });
};

export const useHomeControllerFindService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(homeControllerFind, { method, ...options });
};

export const useHomeControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(homeControllerRead, { method, ...options });
};

export const useHomeControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(homeControllerDelete, { method, ...options });
};

export const useHomeControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateHomeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(homeControllerUpdate, { method, ...options });
};
