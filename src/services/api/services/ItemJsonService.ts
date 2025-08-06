/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateItemJsonBody } from '../models/UpdateItemJsonBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a Item for a market
 * @returns any Data created
 * @throws ApiError
 */
export const itemJsonControllerCreate = (): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/sectio/json`,
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read a item
 * @param id
 * @returns any Data item
 * @throws ApiError
 */
export const itemJsonControllerGet = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/sectio/json/${id}`,
    errors: {
      404: `Data does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a item
 * @param id
 * @param requestBody
 * @returns any Data Updated
 * @throws ApiError
 */
export const itemJsonControllerUpdate = (
  id: string,
  requestBody: UpdateItemJsonBody
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/sectio/json/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Data does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a item for a market
 * @param id
 * @returns boolean item delete
 * @throws ApiError
 */
export const itemJsonControllerRemove = (
  id: string
): CancelablePromise<boolean> => {
  return __request({
    method: 'DELETE',
    path: `/sectio/json/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Data does not exists`,
    },
  });
};

/**
 * Toggle lock status of an ItemJson
 * @param id
 * @returns any ItemJson lock status toggled successfully
 * @throws ApiError
 */
export const itemJsonControllerToggleLock = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/sectio/json/${id}/toggle-lock`,
    errors: {
      403: `Incorrect credentials`,
      404: `ItemJson doesn't exist`,
    },
  });
};

export const useItemJsonControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemJsonControllerCreate, { method, ...options });
};

export const useItemJsonControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemJsonControllerGet, { method, ...options });
};

export const useItemJsonControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateItemJsonBody) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemJsonControllerUpdate, { method, ...options });
};

export const useItemJsonControllerRemoveService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: boolean;
} & UseRequestProperties => {
  return useRequest(itemJsonControllerRemove, { method, ...options });
};

export const useItemJsonControllerToggleLockService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemJsonControllerToggleLock, { method, ...options });
};
