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
 * computes ranks during seed
 * @returns any ranks created
 * @throws ApiError
 */
export const cronControllerCompute = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/cron`,
    errors: {
      403: `endpoint inaccessible`,
    },
  });
};

export const useCronControllerComputeService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(cronControllerCompute, { method, ...options });
};
