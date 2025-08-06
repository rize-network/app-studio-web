/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCommentAnswerParams } from '../models/CreateCommentAnswerParams';
import type { CreateCommentParams } from '../models/CreateCommentParams';
import type { FindCommentParams } from '../models/FindCommentParams';
import type { FindReportParams } from '../models/FindReportParams';
import type { ListCommentParams } from '../models/ListCommentParams';
import type { SignalCommentParams } from '../models/SignalCommentParams';
import type { UpdateCommentParams } from '../models/UpdateCommentParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to find by ownerType & ownerId
 * @param requestBody
 * @returns any Comment found
 * @throws ApiError
 */
export const commentControllerFind = (
  requestBody: FindCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to count comments by ownerType & ownerId
 * @param requestBody
 * @returns any Number of Comments found
 * @throws ApiError
 */
export const commentControllerCount = (
  requestBody: FindCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to read an comment
 * @param requestBody
 * @returns any Comment's data
 * @throws ApiError
 */
export const commentControllerList = (
  requestBody: ListCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/list`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      404: `Exemple doesn't exists`,
    },
  });
};

/**
 * As a admin, i want to find by ownerType & ownerId & reported status
 * @param requestBody
 * @returns any Comment with report found
 * @throws ApiError
 */
export const commentControllerFindReportedComments = (
  requestBody: FindReportParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/reported`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a admin, i want to count by ownerType & ownerId & reported status
 * @param requestBody
 * @returns any Comment with report count
 * @throws ApiError
 */
export const commentControllerCountReportedComments = (
  requestBody: FindReportParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/reported/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to create a comment
 * @param requestBody
 * @returns any Comment created
 * @throws ApiError
 */
export const commentControllerCreate = (
  requestBody: CreateCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to comment a comment
 * @param requestBody
 * @returns any Comment created
 * @throws ApiError
 */
export const commentControllerCreateAnswer = (
  requestBody: CreateCommentAnswerParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/answer`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * as a admin, i want to update a comment
 * @param id
 * @param requestBody
 * @returns any Comment Updated by admin
 * @throws ApiError
 */
export const commentControllerUpdateByAdmin = (
  id: string,
  requestBody: UpdateCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/comment/admin/${id}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a admin, i want to delete a comment
 * @param id
 * @returns any Comment delete
 * @throws ApiError
 */
export const commentControllerDeleteAdmin = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/comment/admin/${id}`,
  });
};

/**
 * as a user, i want to update a comment
 * @param id
 * @param requestBody
 * @returns any Comment Updated
 * @throws ApiError
 */
export const commentControllerUpdate = (
  id: string,
  requestBody: UpdateCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/comment/${id}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to delete a comment
 * @param id
 * @returns any Comment delete
 * @throws ApiError
 */
export const commentControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/comment/${id}`,
  });
};

/**
 * As a user, i want to create a report comment
 * @param id
 * @param requestBody
 * @returns any Report Comment created
 * @throws ApiError
 */
export const commentControllerReportComment = (
  id: string,
  requestBody: SignalCommentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/comment/${id}/report`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

export const useCommentControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerFind, { method, ...options });
};

export const useCommentControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerCount, { method, ...options });
};

export const useCommentControllerListService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ListCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerList, { method, ...options });
};

export const useCommentControllerFindReportedCommentsService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindReportParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerFindReportedComments, {
    method,
    ...options,
  });
};

export const useCommentControllerCountReportedCommentsService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindReportParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerCountReportedComments, {
    method,
    ...options,
  });
};

export const useCommentControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerCreate, { method, ...options });
};

export const useCommentControllerCreateAnswerService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateCommentAnswerParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerCreateAnswer, { method, ...options });
};

export const useCommentControllerUpdateByAdminService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerUpdateByAdmin, { method, ...options });
};

export const useCommentControllerDeleteAdminService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerDeleteAdmin, { method, ...options });
};

export const useCommentControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerUpdate, { method, ...options });
};

export const useCommentControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerDelete, { method, ...options });
};

export const useCommentControllerReportCommentService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: SignalCommentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(commentControllerReportComment, { method, ...options });
};
