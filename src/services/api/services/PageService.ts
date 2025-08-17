/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, I want to read a specific page
 * @param id
 * @returns any page details fetched
 * @throws ApiError
 */
export const pageControllerComponents = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/page/${id}/components`,
    errors: {
      404: `page not found`,
    },
  });
};

/**
 * As an admin, I want to get all page
 * @param projectId
 * @returns any All page fetched
 * @throws ApiError
 */
export const pageControllerReadAll = (
  projectId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/page/project/${projectId}`,
    errors: {
      404: `pages does not exists`,
    },
  });
};

export const usePageControllerComponentsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerComponents, { method, ...options });
};

export const usePageControllerReadAllService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (projectId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageControllerReadAll, { method, ...options });
};
