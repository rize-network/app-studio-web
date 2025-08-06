/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateItemParams } from '../models/CreateItemParams';
import type { UpdateItemParams } from '../models/UpdateItemParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a Item for a market
 * @param ownerType
 * @param ownerId
 * @param requestBody
 * @returns any Data created
 * @throws ApiError
 */
export const itemControllerCreate = (
  ownerType: string,
  ownerId: string,
  requestBody: CreateItemParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/item/${ownerId}/${ownerType}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read a item
 * @param ownerType
 * @param ownerId
 * @param itemType
 * @returns any Data item
 * @throws ApiError
 */
export const itemControllerGet = (
  ownerType: string,
  ownerId: string,
  itemType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/item/${ownerType}/${ownerId}/${itemType}`,
    errors: {
      404: `Data does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a item for a market
 * @param id
 * @returns any item delete
 * @throws ApiError
 */
export const itemControllerRemove = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/item/${id}`,
    errors: {
      403: `Incorrect credentials`,
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
export const itemControllerUpdate = (
  id: string,
  requestBody: UpdateItemParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/item/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Data does not exists`,
    },
  });
};

export const useItemControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    ownerType: string,
    ownerId: string,
    requestBody: CreateItemParams
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemControllerCreate, { method, ...options });
};

export const useItemControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (ownerType: string, ownerId: string, itemType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemControllerGet, { method, ...options });
};

export const useItemControllerRemoveService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemControllerRemove, { method, ...options });
};

export const useItemControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateItemParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(itemControllerUpdate, { method, ...options });
};
