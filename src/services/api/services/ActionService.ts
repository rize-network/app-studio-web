/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateActionParams } from '../models/CreateActionParams';
import type { UpdateActionParams } from '../models/UpdateActionParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As an admin, I want to create a action
 * @param requestBody
 * @returns any action created
 * @throws ApiError
 */
export const actionControllerCreate = (
  requestBody: CreateActionParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, I want to find a specific action by criteria
 * @param skill Skill
 * @param projectId Project id
 * @returns any Action found
 * @throws ApiError
 */
export const actionControllerList = (
  skill?:
    | 'project'
    | 'finance'
    | 'dev'
    | 'brand'
    | 'growth'
    | 'community'
    | 'design'
    | 'ads'
    | 'product',
  projectId?: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action/project/${projectId}/skill/${skill}`,
    query: {
      skill: skill,
      projectId: projectId,
    },
  });
};

/**
 * As a user, I want to read a specific action
 * @param id
 * @returns any action details fetched
 * @throws ApiError
 */
export const actionControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/action/${id}`,
    errors: {
      404: `action not found`,
    },
  });
};

/**
 * As an admin, I want to delete a action
 * @param id
 * @returns any action deleted
 * @throws ApiError
 */
export const actionControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/action/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `action not found`,
    },
  });
};

/**
 * As an admin, I want to update a action
 * @param id
 * @param requestBody
 * @returns any action updated
 * @throws ApiError
 */
export const actionControllerUpdate = (
  id: string,
  requestBody: UpdateActionParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/action/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `action not found`,
    },
  });
};

/**
 * As an admin, I want to update a action
 * @param stepId
 * @returns any action updated
 * @throws ApiError
 */
export const actionControllerUpdateStepStatus = (
  stepId: string
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/action/${stepId}/status`,
    errors: {
      401: `Incorrect credentials`,
      404: `action not found`,
    },
  });
};

export const useActionControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateActionParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerCreate, { method, ...options });
};

export const useActionControllerListService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    skill?:
      | 'project'
      | 'finance'
      | 'dev'
      | 'brand'
      | 'growth'
      | 'community'
      | 'design'
      | 'ads'
      | 'product',
    projectId?: string
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerList, { method, ...options });
};

export const useActionControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerRead, { method, ...options });
};

export const useActionControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerDelete, { method, ...options });
};

export const useActionControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateActionParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerUpdate, { method, ...options });
};

export const useActionControllerUpdateStepStatusService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (stepId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerUpdateStepStatus, { method, ...options });
};
