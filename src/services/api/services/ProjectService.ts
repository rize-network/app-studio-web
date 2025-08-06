/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectParams } from '../models/CreateProjectParams';
import type { UpdateProjectParams } from '../models/UpdateProjectParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a project
 * @param requestBody
 * @returns any Project created
 * @throws ApiError
 */
export const projectControllerCreate = (
  requestBody: CreateProjectParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/project`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read all the project
 * @returns any Project data
 * @throws ApiError
 */
export const projectControllerList = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/project/list`,
    errors: {
      404: `Projects does not exists`,
    },
  });
};

/**
 * I want to read an project
 * @param id
 * @returns any Project data
 * @throws ApiError
 */
export const projectControllerGet = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/project/${id}`,
    errors: {
      404: `Project does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a project
 * @param id
 * @returns any project delete
 * @throws ApiError
 */
export const projectControllerRemove = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/project/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Project does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a project
 * @param id
 * @param requestBody
 * @returns any Project Updated
 * @throws ApiError
 */
export const projectControllerUpdate = (
  id: string,
  requestBody: UpdateProjectParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/project/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useProjectControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateProjectParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(projectControllerCreate, { method, ...options });
};

export const useProjectControllerListService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(projectControllerList, { method, ...options });
};

export const useProjectControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(projectControllerGet, { method, ...options });
};

export const useProjectControllerRemoveService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(projectControllerRemove, { method, ...options });
};

export const useProjectControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateProjectParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(projectControllerUpdate, { method, ...options });
};
