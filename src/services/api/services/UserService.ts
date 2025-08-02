/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserParams } from '../models/CreateUserParams';
import type { FindUserParams } from '../models/FindUserParams';
import type { UpdateUserParams } from '../models/UpdateUserParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to create an user
 * @param requestBody
 * @returns any Exemple created
 * @throws ApiError
 */
export const userControllerCreate = (
  requestBody: CreateUserParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/user`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to find by name
 * @param requestBody
 * @returns any Users found
 * @throws ApiError
 */
export const userControllerFind = (
  requestBody: FindUserParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/user/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to count found by name
 * @param requestBody
 * @returns any Number of Exemples found
 * @throws ApiError
 */
export const userControllerCount = (
  requestBody: FindUserParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/user/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to read an user
 * @param id
 * @returns any Exemple's data
 * @throws ApiError
 */
export const userControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/user/${id}`,
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a user, i want to delete an user
 * @param id
 * @returns any Exemple delete
 * @throws ApiError
 */
export const userControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/user/${id}`,
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a user, I want to update my information
 * @param id
 * @param requestBody
 * @returns any User updated successfully
 * @throws ApiError
 */
export const userControllerUpdate = (
  id: string,
  requestBody: UpdateUserParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/user/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      403: `Incorrect credentials`,
      404: `User doesn't exists`,
    },
  });
};

/**
 * @param id
 * @returns any
 * @throws ApiError
 */
export const userControllerInactive = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/user/${id}/inactive`,
  });
};

/**
 * @param id
 * @returns any
 * @throws ApiError
 */
export const userControllerActive = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/user/${id}/active`,
  });
};

/**
 * @param id
 * @returns any
 * @throws ApiError
 */
export const userControllerBlocked = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/user/${id}/block`,
  });
};

/**
 * @param id
 * @returns any
 * @throws ApiError
 */
export const userControllerUnblocked = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/user/${id}/unblock`,
  });
};

/**
 * Return the number of total users
 * @returns any As user i want to return number of users
 * @throws ApiError
 */
export const userControllerTotal = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/user/total`,
    errors: {
      400: `displayedUserCount data id is empty.`,
      404: `displayedUserCount is not found.`,
    },
  });
};

/**
 * As a user, i want to find by name
 * @returns any Users found
 * @throws ApiError
 */
export const userControllerCountUsersByCountries =
  (): CancelablePromise<any> => {
    return __request({
      method: 'GET',
      path: `/user/count/ByCountry`,
    });
  };

/**
 * Update an user picture. Only image files are supported (mime type image/*).
 * @param id
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const userUploadControllerPicture = (
  id: string,
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/user/${id}/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

export const useUserControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateUserParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerCreate, { method, ...options });
};

export const useUserControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindUserParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerFind, { method, ...options });
};

export const useUserControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindUserParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerCount, { method, ...options });
};

export const useUserControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerRead, { method, ...options });
};

export const useUserControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerDelete, { method, ...options });
};

export const useUserControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateUserParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerUpdate, { method, ...options });
};

export const useUserControllerInactiveService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerInactive, { method, ...options });
};

export const useUserControllerActiveService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerActive, { method, ...options });
};

export const useUserControllerBlockedService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerBlocked, { method, ...options });
};

export const useUserControllerUnblockedService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerUnblocked, { method, ...options });
};

export const useUserControllerTotalService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerTotal, { method, ...options });
};

export const useUserControllerCountUsersByCountriesService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerCountUsersByCountries, {
    method,
    ...options,
  });
};

export const useUserUploadControllerPictureService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    id: string,
    formData: {
      file?: Blob;
    }
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userUploadControllerPicture, { method, ...options });
};
