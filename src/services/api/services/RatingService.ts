/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckRatingParams } from '../models/CheckRatingParams';
import type { CreateRatingParams } from '../models/CreateRatingParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const ratingControllerCreate = (
  requestBody: CreateRatingParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/rating`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * @param id
 * @returns any
 * @throws ApiError
 */
export const ratingControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/rating/rate/${id}`,
  });
};

/**
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const ratingControllerCheckRatingByUser = (
  requestBody: CheckRatingParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/rating/checkRating`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

export const useRatingControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateRatingParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(ratingControllerCreate, { method, ...options });
};

export const useRatingControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(ratingControllerRead, { method, ...options });
};

export const useRatingControllerCheckRatingByUserService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CheckRatingParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(ratingControllerCheckRatingByUser, { method, ...options });
};
