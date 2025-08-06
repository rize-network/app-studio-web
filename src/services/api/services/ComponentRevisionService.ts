/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateComponentRevisionParams } from '../models/CreateComponentRevisionParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to create a componentRevision
 * @param requestBody
 * @returns any ComponentRevision created
 * @throws ApiError
 */
export const componentRevisionControllerCreate = (
  requestBody: CreateComponentRevisionParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/componentRevision`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to find by componentRevision based on a componentRevision identifier
 * @param id
 * @returns any ComponentRevision fetched successfully
 * @throws ApiError
 */
export const componentRevisionControllerRead = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/componentRevision/${id}`,
  });
};

export const useComponentRevisionControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateComponentRevisionParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentRevisionControllerCreate, { method, ...options });
};

export const useComponentRevisionControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(componentRevisionControllerRead, { method, ...options });
};
