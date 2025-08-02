/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNewsletterSectionParams } from '../models/CreateNewsletterSectionParams';
import type { UpdateNewsletterSectionParams } from '../models/UpdateNewsletterSectionParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a newsletterSection
 * @param id
 * @param requestBody
 * @returns any NewsletterSection created
 * @throws ApiError
 */
export const newsletterSectionControllerGenerate = (
  id: string,
  requestBody: CreateNewsletterSectionParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/newsletter/section/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read an newsletterSection
 * @param id
 * @returns any NewsletterSection data
 * @throws ApiError
 */
export const newsletterSectionControllerRead = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/newsletter/section/${id}`,
    errors: {
      404: `NewsletterSection does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a newsletterSection
 * @param id
 * @returns any newsletterSection delete
 * @throws ApiError
 */
export const newsletterSectionControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/newsletter/section/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `NewsletterSection does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a newsletterSection
 * @param id
 * @param requestBody
 * @returns any NewsletterSection Updated
 * @throws ApiError
 */
export const newsletterSectionControllerUpdate = (
  id: string,
  requestBody: UpdateNewsletterSectionParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/newsletter/section/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useNewsletterSectionControllerGenerateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: CreateNewsletterSectionParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterSectionControllerGenerate, {
    method,
    ...options,
  });
};

export const useNewsletterSectionControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterSectionControllerRead, { method, ...options });
};

export const useNewsletterSectionControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterSectionControllerDelete, { method, ...options });
};

export const useNewsletterSectionControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateNewsletterSectionParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterSectionControllerUpdate, { method, ...options });
};
