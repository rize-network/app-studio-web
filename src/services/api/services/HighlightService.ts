/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateHighlightParams } from '../models/CreateHighlightParams';
import type { UpdateHighlightParams } from '../models/UpdateHighlightParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to create an highlight
 * @param requestBody
 * @returns any Highlight created
 * @throws ApiError
 */
export const highlightControllerCreate = (
  requestBody: CreateHighlightParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/highlight`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to get highlight sections
 * @returns any Highlight's Data
 * @throws ApiError
 */
export const highlightControllerFind = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/highlight`,
  });
};

/**
 * As a user, i want to read an highlight
 * @param location
 * @returns any Highlight's data
 * @throws ApiError
 */
export const highlightControllerRead = (
  location: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/highlight/${location}`,
    errors: {
      401: `Incorrect credentials`,
      404: `Highlight section doesn't exists`,
    },
  });
};

/**
 * As a user, i want to delete an highlight
 * @param id
 * @returns any Highlight delete
 * @throws ApiError
 */
export const highlightControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/highlight/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Highlight doesn't exists`,
    },
  });
};

/**
 * as a user, i want to update an highlight
 * @param id
 * @param requestBody
 * @returns any Highlight section Updated
 * @throws ApiError
 */
export const highlightControllerUpdate = (
  id: string,
  requestBody: UpdateHighlightParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/highlight/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useHighlightControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateHighlightParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(highlightControllerCreate, { method, ...options });
};

export const useHighlightControllerFindService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(highlightControllerFind, { method, ...options });
};

export const useHighlightControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (location: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(highlightControllerRead, { method, ...options });
};

export const useHighlightControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(highlightControllerDelete, { method, ...options });
};

export const useHighlightControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateHighlightParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(highlightControllerUpdate, { method, ...options });
};
