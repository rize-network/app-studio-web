/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateApplicationParams } from '../models/CreateApplicationParams';
import type { FindApplicationParams } from '../models/FindApplicationParams';
import type { UpdateApplicationParams } from '../models/UpdateApplicationParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a application
 * @param requestBody
 * @returns any Application created
 * @throws ApiError
 */
export const applicationControllerCreate = (
  requestBody: CreateApplicationParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/application`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read all the application
 * @returns any Application data
 * @throws ApiError
 */
export const applicationControllerGetAll = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/application`,
    errors: {
      404: `Applications does not exists`,
    },
  });
};

/**
 * I want to read an application
 * @param id
 * @returns any Application data
 * @throws ApiError
 */
export const applicationControllerGet = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/application/${id}`,
    errors: {
      404: `Application does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a application
 * @param id
 * @returns any application delete
 * @throws ApiError
 */
export const applicationControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/application/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Application does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a application
 * @param id
 * @param requestBody
 * @returns any Application Updated
 * @throws ApiError
 */
export const applicationControllerUpdate = (
  id: string,
  requestBody: UpdateApplicationParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/application/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to find application by name
 * @param requestBody
 * @returns any Application found
 * @throws ApiError
 */
export const applicationControllerFind = (
  requestBody: FindApplicationParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/application/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Validate application
 * @param stepId
 * @param requestBody
 * @returns any Workflow created
 * @throws ApiError
 */
export const applicationWorkflowControllerFillApplication = (
  stepId: string,
  requestBody: CreateApplicationParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/application/process/${stepId}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useApplicationControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateApplicationParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationControllerCreate, { method, ...options });
};

export const useApplicationControllerGetAllService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationControllerGetAll, { method, ...options });
};

export const useApplicationControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationControllerGet, { method, ...options });
};

export const useApplicationControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationControllerDelete, { method, ...options });
};

export const useApplicationControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateApplicationParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationControllerUpdate, { method, ...options });
};

export const useApplicationControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindApplicationParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationControllerFind, { method, ...options });
};

export const useApplicationWorkflowControllerFillApplicationService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (stepId: string, requestBody: CreateApplicationParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationWorkflowControllerFillApplication, {
    method,
    ...options,
  });
};
