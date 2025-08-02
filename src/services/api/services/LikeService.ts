/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLikeParams } from '../models/CreateLikeParams';
import type { FindLikeParams } from '../models/FindLikeParams';
import type { UpdateLikeParams } from '../models/UpdateLikeParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a User I want to create a like/unlike for an object
 * @param requestBody
 * @returns any Like created
 * @throws ApiError
 */
export const likeControllerCreate = (
  requestBody: CreateLikeParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/like`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read an like
 * @param objectId
 * @param objectType
 * @returns any Like data
 * @throws ApiError
 */
export const likeControllerRead = (
  objectId: string,
  objectType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/like/${objectId}/${objectType}`,
    errors: {
      404: `Like does not exists`,
    },
  });
};

/**
 * As a User I want to display a number of like/unlike for an ownerId for a news
 * @param objectId
 * @param objectType
 * @returns any likes unlikes
 * @throws ApiError
 */
export const likeControllerGetCount = (
  objectId: string,
  objectType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/like/count/${objectType}/${objectId}`,
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a User I want to display a number of like/unlike for an ownerId for a news
 * @param objectId
 * @param objectType
 * @returns any likes unlikes
 * @throws ApiError
 */
export const likeControllerExists = (
  objectId: string,
  objectType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/like/exists/${objectType}/${objectId}`,
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a User I want to display a number of like/unlike for an ownerId for a dancer profile
 * @param requestBody
 * @returns any likes unlikes
 * @throws ApiError
 */
export const likeControllerGetProfileLike = (
  requestBody: FindLikeParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/like/profile`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a User I want to display a number of like/unlike for an ownerId for a dancer profile
 * @param requestBody
 * @returns any likes count
 * @throws ApiError
 */
export const likeControllerCountProfileLike = (
  requestBody: FindLikeParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/like/profile/count`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to update a like
 * @param id
 * @param requestBody
 * @returns any Like Updated
 * @throws ApiError
 */
export const likeControllerUpdate = (
  id: string,
  requestBody: UpdateLikeParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/like/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useLikeControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateLikeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerCreate, { method, ...options });
};

export const useLikeControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectId: string, objectType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerRead, { method, ...options });
};

export const useLikeControllerGetCountService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectId: string, objectType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerGetCount, { method, ...options });
};

export const useLikeControllerExistsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectId: string, objectType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerExists, { method, ...options });
};

export const useLikeControllerGetProfileLikeService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindLikeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerGetProfileLike, { method, ...options });
};

export const useLikeControllerCountProfileLikeService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindLikeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerCountProfileLike, { method, ...options });
};

export const useLikeControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateLikeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(likeControllerUpdate, { method, ...options });
};
