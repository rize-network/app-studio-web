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
 * Upload a file.
 * @param id
 * @param stepId
 * @param formData
 * @returns any File Upload Succeed
 * @throws ApiError
 */
export const grantFileControllerCreate = (
  id: string,
  stepId: string,
  formData: {
    file?: Blob;
  }
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/grant/${id}/file/${stepId}`,
    formData: formData,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Required file is empty`,
      403: `Forbidden. You do not have the rights.`,
    },
  });
};

/**
 * As a admin, i want to delete a grantFile
 * @param id
 * @returns any grantFile delete
 * @throws ApiError
 */
export const grantFileControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/grant/${id}/file/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Grant does not exists`,
    },
  });
};

export const useGrantFileControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    id: string,
    stepId: string,
    formData: {
      file?: Blob;
    }
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantFileControllerCreate, { method, ...options });
};

export const useGrantFileControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantFileControllerDelete, { method, ...options });
};
