/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFeedbackParams } from '../models/CreateFeedbackParams';
import type { FindFeedbackParams } from '../models/FindFeedbackParams';
import type { UpdateFeedbackParams } from '../models/UpdateFeedbackParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, I want to create a feedback
 * @param requestBody
 * @returns any Feature request created
 * @throws ApiError
 */
export const feedbackControllerCreate = (
  requestBody: CreateFeedbackParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/feedback`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, I want to find feedbacks
 * @param requestBody
 * @returns any Feature requests found
 * @throws ApiError
 */
export const feedbackControllerFind = (
  requestBody: FindFeedbackParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/feedback/find`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, I want to read a feedback
 * @param id
 * @returns any Feature request found
 * @throws ApiError
 */
export const feedbackControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/feedback/${id}`,
    errors: {
      404: `Feature request not found`,
    },
  });
};

/**
 * As an admin, I want to update a feedback
 * @param id
 * @param requestBody
 * @returns any Feature request updated
 * @throws ApiError
 */
export const feedbackControllerUpdate = (
  id: string,
  requestBody: UpdateFeedbackParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/feedback/${id}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
      403: `Forbidden`,
      404: `Feature request not found`,
    },
  });
};

/**
 * As an admin, I want to delete a feedback
 * @param id
 * @returns any Feature request deleted
 * @throws ApiError
 */
export const feedbackControllerRemove = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/feedback/${id}`,
    errors: {
      401: `Incorrect credentials`,
      403: `Forbidden`,
      404: `Feature request not found`,
    },
  });
};

/**
 * As a user, I want to count feedbacks
 * @param requestBody
 * @returns any Feature requests counted
 * @throws ApiError
 */
export const feedbackControllerCount = (
  requestBody: FindFeedbackParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/feedback/count`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Get user vote for a feedback
 * @param id
 * @returns any User vote retrieved
 * @throws ApiError
 */
export const feedbackControllerGetUserVote = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/feedback/${id}/user-vote`,
  });
};

export const useFeedbackControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateFeedbackParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerCreate, { method, ...options });
};

export const useFeedbackControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindFeedbackParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerFind, { method, ...options });
};

export const useFeedbackControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerRead, { method, ...options });
};

export const useFeedbackControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateFeedbackParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerUpdate, { method, ...options });
};

export const useFeedbackControllerRemoveService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerRemove, { method, ...options });
};

export const useFeedbackControllerCountService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FindFeedbackParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerCount, { method, ...options });
};

export const useFeedbackControllerGetUserVoteService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(feedbackControllerGetUserVote, { method, ...options });
};
