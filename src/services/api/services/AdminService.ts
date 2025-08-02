/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAdminParams } from '../models/CreateAdminParams';
import type { FindAdminParams } from '../models/FindAdminParams';
import type { UpdateAdminParams } from '../models/UpdateAdminParams';
import type { UpdateUserCountParams } from '../models/UpdateUserCountParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to read an admin
 * @param id
 * @returns any Exemple's data
 * @throws ApiError
 */
export const adminControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/admin/${id}`,
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * as a admin, i want to update an admin
 * @param id
 * @param requestBody
 * @returns any Admin Updated
 * @throws ApiError
 */
export const adminControllerUpdate = (
  id: string,
  requestBody: UpdateAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/admin/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a admin, i want to delete an admin
 * @param id
 * @returns any Admin delete
 * @throws ApiError
 */
export const adminControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/admin/${id}`,
    errors: {
      404: `Admin doesn't exists`,
    },
  });
};

/**
 * Display my admin innews.
 * @returns any Retrieve connected admin admin
 * @throws ApiError
 */
export const adminControllerMe = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/admin`,
    errors: {
      401: `Not authorized. You should have an admin session authorized.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * Update my admin innews.
 * @param requestBody
 * @returns any Admin Updated
 * @throws ApiError
 */
export const adminControllerUpdateMe = (
  requestBody: UpdateAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/admin`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized. You should have an admin session authorized.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * create an admin
 * @param requestBody
 * @returns any Admin Created Succeed
 * @throws ApiError
 */
export const adminControllerCreate = (
  requestBody: CreateAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/admin`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      400: `Required fields is empty.`,
      401: `Incorrect credentials`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * As a admin, i want to find by name
 * @param requestBody
 * @returns any admins found
 * @throws ApiError
 */
export const adminControllerFind = (
  requestBody: FindAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/admin/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a admin, i want to count admin found by name
 * @param requestBody
 * @returns any Number of Exemples found
 * @throws ApiError
 */
export const adminControllerCount = (
  requestBody: FindAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/admin/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * as Admin return the number of user to display
 * @returns any Return userCount datas.
 * @throws ApiError
 */
export const adminControllerUserDisplayedCount = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/admin/user/displayedCount`,
    errors: {
      400: `userCount data is empty.`,
      404: `userCount is not found.`,
    },
  });
};

/**
 * As an Admin I want to update userCount
 * @param requestBody
 * @returns any Displayed Count updated.
 * @throws ApiError
 */
export const adminControllerUpdateDisplayedCount = (
  requestBody: UpdateUserCountParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/admin/user/displayedCount`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      400: `Displayed Count not updated.`,
      403: `Not authorized.`,
      404: `Displayed Count number is not found.`,
    },
  });
};

/**
 * Update an admin picture. Only image files are supported (mime type image/*).
 * @param id
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const adminUploadControllerPicture = (
  id: string,
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/admin/${id}/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

export const useAdminControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerRead, { method, ...options });
};

export const useAdminControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerUpdate, { method, ...options });
};

export const useAdminControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerDelete, { method, ...options });
};

export const useAdminControllerMeService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerMe, { method, ...options });
};

export const useAdminControllerUpdateMeService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdateAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerUpdateMe, { method, ...options });
};

export const useAdminControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerCreate, { method, ...options });
};

export const useAdminControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerFind, { method, ...options });
};

export const useAdminControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerCount, { method, ...options });
};

export const useAdminControllerUserDisplayedCountService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerUserDisplayedCount, { method, ...options });
};

export const useAdminControllerUpdateDisplayedCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdateUserCountParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adminControllerUpdateDisplayedCount, {
    method,
    ...options,
  });
};

export const useAdminUploadControllerPictureService = ({
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
  return useRequest(adminUploadControllerPicture, { method, ...options });
};
