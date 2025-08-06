/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReportParams } from '../models/CreateReportParams';
import type { UpdateReportParams } from '../models/UpdateReportParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * @returns any
 * @throws ApiError
 */
export const reportControllerFind = (): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/report/find`,
  });
};

/**
 * Create report
 * report created
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const reportControllerSignal = (
  requestBody: CreateReportParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/report`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Return a report
 * @param id
 * @returns any Return a report
 * @throws ApiError
 */
export const reportControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/report/${id}`,
    errors: {
      400: `Report not found`,
      404: `Report not found`,
    },
  });
};

/**
 * Update a report
 * @param id
 * @param requestBody
 * @returns any Update a comment
 * @throws ApiError
 */
export const reportControllerUpdate = (
  id: string,
  requestBody: UpdateReportParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/report/${id}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

export const useReportControllerFindService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(reportControllerFind, { method, ...options });
};

export const useReportControllerSignalService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateReportParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(reportControllerSignal, { method, ...options });
};

export const useReportControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(reportControllerRead, { method, ...options });
};

export const useReportControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, requestBody: UpdateReportParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(reportControllerUpdate, { method, ...options });
};
