/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateItemTextBody } from '../models/UpdateItemTextBody';
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
export const itemTextControllerCreate = (): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/item/text`,
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
export const itemTextControllerGet = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/item/text/${id}`,
    errors: {
      404: `Data does not exists`,
    },
  });
};

/**
 * As a user, I want to update an item text
 * @param id
 * @param requestBody
 * @returns any Item Text updated successfully
 * @throws ApiError
 */
export const itemTextControllerUpdate = (
  id: string,
  requestBody: UpdateItemTextBody
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/item/text/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      403: `Incorrect credentials`,
      404: `User doesn't exists`,
    },
  });
};

/**
 * As a admin, i want to delete a item for a market
 * @param id
 * @returns boolean item delete
 * @throws ApiError
 */
export const itemTextControllerRemove = (
  id: string
): CancelablePromise<boolean> => {
  return __request({
    method: 'DELETE',
    path: `/item/text/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Data does not exists`,
    },
  });
};

/**
 * Toggle lock status of an ItemText
 * @param id
 * @returns any ItemText lock status toggled successfully
 * @throws ApiError
 */
export const itemTextControllerToggleLock = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/item/text/${id}/toggle-lock`,
    errors: {
      403: `Incorrect credentials`,
      404: `ItemText doesn't exist`,
    },
  });
};

/**
 * As a admin, i want to create a Item for a market
 * @returns any Data created
 * @throws ApiError
 */
export const itemBooleanControllerCreate = (): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/item/boolean`,
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
export const itemBooleanControllerGet = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/item/boolean/${id}`,
    errors: {
      404: `Data does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a item
 * @param id
 * @returns any Data Updated
 * @throws ApiError
 */
export const itemBooleanControllerUpdate = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/item/boolean/${id}`,
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
export const itemBooleanControllerRemove = (
  id: string
): CancelablePromise<boolean> => {
  return __request({
    method: 'DELETE',
    path: `/item/boolean/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Data does not exists`,
    },
  });
};

export const useItemTextControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemTextControllerCreate, { method, ...options });
};

export const useItemTextControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemTextControllerGet, { method, ...options });
};

export const useItemTextControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateItemTextBody) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemTextControllerUpdate, { method, ...options });
};

export const useItemTextControllerRemoveService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: boolean;
} & UseRequestProperties => {
  return useRequest(itemTextControllerRemove, { method, ...options });
};

export const useItemTextControllerToggleLockService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemTextControllerToggleLock, { method, ...options });
};

export const useItemBooleanControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemBooleanControllerCreate, { method, ...options });
};

export const useItemBooleanControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemBooleanControllerGet, { method, ...options });
};

export const useItemBooleanControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemBooleanControllerUpdate, { method, ...options });
};

export const useItemBooleanControllerRemoveService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: boolean;
} & UseRequestProperties => {
  return useRequest(itemBooleanControllerRemove, { method, ...options });
};
