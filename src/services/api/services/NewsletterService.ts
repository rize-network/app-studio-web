/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateContentParams } from '../models/CreateContentParams';
import type { CreateNewsletterParams } from '../models/CreateNewsletterParams';
import type { CreateNewsletterSectionParams } from '../models/CreateNewsletterSectionParams';
import type { CreateSourceParams } from '../models/CreateSourceParams';
import type { FindNewsletterParams } from '../models/FindNewsletterParams';
import type { UpdateNewsletterParams } from '../models/UpdateNewsletterParams';
import type { UpdateNewsletterSectionParams } from '../models/UpdateNewsletterSectionParams';
import type { UpdateSourceParams } from '../models/UpdateSourceParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a newsletter
 * @param requestBody
 * @returns any Newsletter created
 * @throws ApiError
 */
export const newsletterControllerGenerate = (
  requestBody: CreateNewsletterParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/newsletter`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read an newsletter
 * @param id
 * @returns any Newsletter data
 * @throws ApiError
 */
export const newsletterControllerRead = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/newsletter/${id}`,
    errors: {
      404: `Newsletter does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a newsletter
 * @param id
 * @returns any newsletter delete
 * @throws ApiError
 */
export const newsletterControllerDelete = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/newsletter/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Newsletter does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a newsletter
 * @param id
 * @param requestBody
 * @returns any Newsletter Updated
 * @throws ApiError
 */
export const newsletterControllerUpdate = (
  id: string,
  requestBody: UpdateNewsletterParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/newsletter/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read all the newsletter
 * @param projectId
 * @returns any Newsletter data
 * @throws ApiError
 */
export const newsletterControllerReadAll = (
  projectId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/newsletter/project/${projectId}`,
    errors: {
      404: `Newsletters does not exists`,
    },
  });
};

/**
 * I want to find newsletter by name
 * @param requestBody
 * @returns any Newsletter found
 * @throws ApiError
 */
export const newsletterControllerFind = (
  requestBody: FindNewsletterParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/newsletter/find`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to create a source
 * @param requestBody
 * @returns any Source created
 * @throws ApiError
 */
export const newsletterControllerCreateSource = (
  requestBody: CreateSourceParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/newsletter/source`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to delete a history
 * @param id
 * @returns any history delete
 * @throws ApiError
 */
export const newsletterControllerDeleteSource = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/newsletter/source/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `History does not exists`,
    },
  });
};

/**
 * As a admin, i want to update a source
 * @param id
 * @param requestBody
 * @returns any Source Updated
 * @throws ApiError
 */
export const newsletterControllerUpdateSource = (
  id: string,
  requestBody: UpdateSourceParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/newsletter/source/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to update the newsletter content
 * @param id
 * @param requestBody
 * @returns void
 * @throws ApiError
 */
export const newsletterControllerGenerateContent = (
  id: string,
  requestBody: CreateContentParams
): CancelablePromise<void> => {
  return __request({
    method: 'POST',
    path: `/newsletter/${id}/content`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

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

export const useNewsletterControllerGenerateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateNewsletterParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerGenerate, { method, ...options });
};

export const useNewsletterControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerRead, { method, ...options });
};

export const useNewsletterControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerDelete, { method, ...options });
};

export const useNewsletterControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateNewsletterParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerUpdate, { method, ...options });
};

export const useNewsletterControllerReadAllService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (projectId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerReadAll, { method, ...options });
};

export const useNewsletterControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindNewsletterParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerFind, { method, ...options });
};

export const useNewsletterControllerCreateSourceService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateSourceParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerCreateSource, { method, ...options });
};

export const useNewsletterControllerDeleteSourceService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerDeleteSource, { method, ...options });
};

export const useNewsletterControllerUpdateSourceService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateSourceParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(newsletterControllerUpdateSource, { method, ...options });
};

export const useNewsletterControllerGenerateContentService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: CreateContentParams) => void;
  data: void;
} & UseRequestProperties => {
  return useRequest(newsletterControllerGenerateContent, {
    method,
    ...options,
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
