/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateObjectDto } from '../models/UpdateObjectDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Create a new object of the specified type
 * @param objectType Type of object to create
 * @param requestBody Object data to create
 * @returns any
 * @throws ApiError
 */
export const objectControllerCreate = (
  objectType: string,
  requestBody: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/object/${objectType}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Get multiple objects with pagination
 * @param objectType Type of objects to retrieve
 * @returns any
 * @throws ApiError
 */
export const objectControllerFindMany = (
  objectType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/object/list/${objectType}`,
  });
};

/**
 * Get an object by ID
 * @param objectType Type of object to retrieve
 * @param id ID of the object
 * @returns any
 * @throws ApiError
 */
export const objectControllerGetById = (
  objectType: string,
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/object/details/${objectType}/${id}`,
  });
};

/**
 * Update an object by ID
 * @param objectType Type of object to update
 * @param id ID of the object
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const objectControllerUpdate = (
  objectType: string,
  id: string,
  requestBody: UpdateObjectDto
): CancelablePromise<any> => {
  return __request({
    method: 'PUT',
    path: `/object/${objectType}/${id}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Delete an object by ID
 * @param objectType Type of object to delete
 * @param id ID of the object
 * @returns any
 * @throws ApiError
 */
export const objectControllerDelete = (
  objectType: string,
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/object/${objectType}/${id}`,
  });
};

/**
 * Count objects of the specified type
 * @param objectType Type of objects to count
 * @returns any
 * @throws ApiError
 */
export const objectControllerCount = (
  objectType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/object/${objectType}/count`,
  });
};

export const useObjectControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string, requestBody: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(objectControllerCreate, { method, ...options });
};

export const useObjectControllerFindManyService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(objectControllerFindMany, { method, ...options });
};

export const useObjectControllerGetByIdService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string, id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(objectControllerGetById, { method, ...options });
};

export const useObjectControllerUpdateService = ({
  method = 'PUT',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string, id: string, requestBody: UpdateObjectDto) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(objectControllerUpdate, { method, ...options });
};

export const useObjectControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string, id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(objectControllerDelete, { method, ...options });
};

export const useObjectControllerCountService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(objectControllerCount, { method, ...options });
};
