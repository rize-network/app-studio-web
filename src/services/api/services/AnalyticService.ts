/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAnalyticParams } from '../models/CreateAnalyticParams';
import type { FindAnalyticParams } from '../models/FindAnalyticParams';
import type { GetAnalyticViewParams } from '../models/GetAnalyticViewParams';
import type { SetAnalyticViewParams } from '../models/SetAnalyticViewParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to create an analytic
 * @param requestBody
 * @returns any Analytic created
 * @throws ApiError
 */
export const analyticControllerCreate = (
  requestBody: CreateAnalyticParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/analytic`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * as a user, i want to update an analytic
 * @param requestBody
 * @returns any Analytic Updated
 * @throws ApiError
 */
export const analyticControllerUpdate = (
  requestBody: SetAnalyticViewParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/analytic`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Analytic doesn't exists`,
    },
  });
};

/**
 * As a user, i want to find by name
 * @param requestBody
 * @returns any Analytics found
 * @throws ApiError
 */
export const analyticControllerFind = (
  requestBody: FindAnalyticParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/analytic/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to count analytics found by name
 * @param requestBody
 * @returns any Number of Analytics found
 * @throws ApiError
 */
export const analyticControllerCount = (
  requestBody: FindAnalyticParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/analytic/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to read an analytic
 * @param requestBody
 * @returns any Analytic's data
 * @throws ApiError
 */
export const analyticControllerRead = (
  requestBody: GetAnalyticViewParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/analytic/view`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Analytic doesn't exists`,
    },
  });
};

/**
 * As a user, i want to delete an analytic
 * @param id
 * @returns any Analytic delete
 * @throws ApiError
 */
export const analyticControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/analytic/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Analytic doesn't exists`,
    },
  });
};

export const useAnalyticControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateAnalyticParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(analyticControllerCreate, { method, ...options });
};

export const useAnalyticControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SetAnalyticViewParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(analyticControllerUpdate, { method, ...options });
};

export const useAnalyticControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindAnalyticParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(analyticControllerFind, { method, ...options });
};

export const useAnalyticControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindAnalyticParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(analyticControllerCount, { method, ...options });
};

export const useAnalyticControllerReadService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: GetAnalyticViewParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(analyticControllerRead, { method, ...options });
};

export const useAnalyticControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(analyticControllerDelete, { method, ...options });
};
