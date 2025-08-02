/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateProfileParams } from '../models/UpdateProfileParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to read an user's profile
 * @param id
 * @returns any User Profile's data
 * @throws ApiError
 */
export const profileControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/profile/${id}`,
    errors: {
      401: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a user, i want to read an user's profile
 * @returns any User Profile's data
 * @throws ApiError
 */
export const profileControllerMe = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/profile`,
    errors: {
      401: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * as a user, i want to update an user profile
 * @param requestBody
 * @returns any Profile Updated
 * @throws ApiError
 */
export const profileControllerUpdate = (
  requestBody: UpdateProfileParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/profile`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Profile doesn't exists`,
    },
  });
};

/**
 * Update a profile picture. Only image files are supported (mime type image/*).
 * @param formData
 * @returns any Picture Upload Succeed
 * @throws ApiError
 */
export const profileUploadControllerPicture = (
  formData: {
    file?: Blob;
  },
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/profile/picture`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required picture is empty or the file type is not an image.`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

export const useProfileControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(profileControllerRead, { method, ...options });
};

export const useProfileControllerMeService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(profileControllerMe, { method, ...options });
};

export const useProfileControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdateProfileParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(profileControllerUpdate, { method, ...options });
};

export const useProfileUploadControllerPictureService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (formData: { file?: Blob }) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(profileUploadControllerPicture, { method, ...options });
};
