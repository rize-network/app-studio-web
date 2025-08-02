/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGrantParams } from '../models/CreateGrantParams';
import type { UpdateGrantParams } from '../models/UpdateGrantParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Validate grant
 * @param grantId
 * @param stepId
 * @returns any Workflow created
 * @throws ApiError
 */
export const grantWorkflowControllerValidateUploadGrantFiles = (
  grantId: string,
  stepId: string,
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/workflow/grant/${grantId}/validate/${stepId}`,
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * Upload a file.
 * @param id
 * @param stepId
 * @param formData
 * @returns any File Upload Succeed
 * @throws ApiError
 */
export const grantFileControllerCreate = (
  id: string,
  stepId: string,
  formData: {
    file?: Blob;
  }
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/grant/${id}/file/${stepId}`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required file is empty`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * As a admin, i want to delete a grantFile
 * @param id
 * @returns any grantFile delete
 * @throws ApiError
 */
export const grantFileControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/grant/${id}/file/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Grant does not exists`,
    },
  });
};

/**
 * As a admin, i want to create a grant
 * @param requestBody
 * @returns any Grant created
 * @throws ApiError
 */
export const grantControllerCreate = (
  requestBody: CreateGrantParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/grant`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read an grant
 * @param id
 * @returns any Grant data
 * @throws ApiError
 */
export const grantControllerGet = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/grant/${id}`,
    errors: {
      404: `Grant does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a grant
 * @param id
 * @returns any grant delete
 * @throws ApiError
 */
export const grantControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/grant/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Grant does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a grant
 * @param id
 * @param requestBody
 * @returns any Grant Updated
 * @throws ApiError
 */
export const grantControllerUpdate = (
  id: string,
  requestBody: UpdateGrantParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/grant/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read all the grant
 * @param projectId
 * @returns any Grant data
 * @throws ApiError
 */
export const grantControllerGetAll = (
  projectId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/grant/project/${projectId}`,
    errors: {
      404: `Grants does not exists`,
    },
  });
};

export const useGrantWorkflowControllerValidateUploadGrantFilesService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (grantId: string, stepId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantWorkflowControllerValidateUploadGrantFiles, {
    method,
    ...options,
  });
};

export const useGrantFileControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    id: string,
    stepId: string,
    formData: {
      file?: Blob;
    }
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantFileControllerCreate, { method, ...options });
};

export const useGrantFileControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantFileControllerDelete, { method, ...options });
};

export const useGrantControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateGrantParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantControllerCreate, { method, ...options });
};

export const useGrantControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantControllerGet, { method, ...options });
};

export const useGrantControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantControllerDelete, { method, ...options });
};

export const useGrantControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateGrantParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantControllerUpdate, { method, ...options });
};

export const useGrantControllerGetAllService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (projectId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantControllerGetAll, { method, ...options });
};
