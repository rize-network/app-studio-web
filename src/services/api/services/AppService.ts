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
 * redirect to app
 * @param path Redirect url
 * @param userType User Type
 * @param language Languuage
 * @returns any Redirection done
 * @throws ApiError
 */
export const appControllerRedirect = (
  path: string,
  userType: string = 'user',
  language?: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/redirect`,
    query: {
      path: path,
      userType: userType,
      language: language,
    },
  });
};

/**
 * @returns any
 * @throws ApiError
 */
export const appControllerRoot = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/`,
  });
};

/**
 * @returns any
 * @throws ApiError
 */
export const appControllerHealth = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/health`,
  });
};

/**
 * @returns any
 * @throws ApiError
 */
export const appControllerExit = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/exit`,
  });
};

export const useAppControllerRedirectService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (path: string, userType: string, language?: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(appControllerRedirect, { method, ...options });
};

export const useAppControllerRootService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(appControllerRoot, { method, ...options });
};

export const useAppControllerHealthService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(appControllerHealth, { method, ...options });
};

export const useAppControllerExitService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(appControllerExit, { method, ...options });
};
