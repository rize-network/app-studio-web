/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEvaluationParams } from '../models/CreateEvaluationParams';
import type { EvaluationResponse } from '../models/EvaluationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Create a new evaluation
 * @param requestBody
 * @returns EvaluationResponse Evaluation created successfully
 * @throws ApiError
 */
export const evaluationControllerCreateEvaluation = (
  requestBody: CreateEvaluationParams
): CancelablePromise<EvaluationResponse> => {
  return __request({
    method: 'POST',
    path: `/adk/evaluations`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      400: `Invalid evaluation data`,
      401: `Unauthorized`,
    },
  });
};

/**
 * List user evaluations
 * @param appName Filter by application name
 * @param status Filter by evaluation status
 * @returns EvaluationResponse Evaluations retrieved successfully
 * @throws ApiError
 */
export const evaluationControllerListEvaluations = (
  appName?: string,
  status?: string
): CancelablePromise<Array<EvaluationResponse>> => {
  return __request({
    method: 'GET',
    path: `/adk/evaluations`,
    query: {
      appName: appName,
      status: status,
    },
    errors: {
      401: `Unauthorized`,
    },
  });
};

/**
 * Get evaluation by ID
 * @param id
 * @returns EvaluationResponse Evaluation retrieved successfully
 * @throws ApiError
 */
export const evaluationControllerGetEvaluation = (
  id: string
): CancelablePromise<EvaluationResponse> => {
  return __request({
    method: 'GET',
    path: `/adk/evaluations/${id}`,
    errors: {
      401: `Unauthorized`,
      404: `Evaluation not found`,
    },
  });
};

/**
 * Delete evaluation by ID
 * @param id
 * @returns any Evaluation deleted successfully
 * @throws ApiError
 */
export const evaluationControllerDeleteEvaluation = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/adk/evaluations/${id}`,
    errors: {
      401: `Unauthorized`,
      404: `Evaluation not found`,
    },
  });
};

/**
 * Start evaluation execution
 * @param id
 * @returns any Evaluation started successfully
 * @throws ApiError
 */
export const evaluationControllerStartEvaluation = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/adk/evaluations/${id}/start`,
    errors: {
      400: `Evaluation cannot be started`,
      401: `Unauthorized`,
      404: `Evaluation not found`,
    },
  });
};

/**
 * Get evaluation results
 * @param id
 * @returns any Evaluation results retrieved successfully
 * @throws ApiError
 */
export const evaluationControllerGetEvaluationResults = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/adk/evaluations/${id}/results`,
    errors: {
      401: `Unauthorized`,
      404: `Evaluation not found`,
    },
  });
};

/**
 * Export evaluation results
 * @param id
 * @param format Export format (json, csv)
 * @returns any Evaluation results exported successfully
 * @throws ApiError
 */
export const evaluationControllerExportEvaluationResults = (
  id: string,
  format?: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/adk/evaluations/${id}/export`,
    query: {
      format: format,
    },
    errors: {
      401: `Unauthorized`,
      404: `Evaluation not found`,
    },
  });
};

/**
 * Get evaluation templates
 * @returns any Evaluation templates retrieved successfully
 * @throws ApiError
 */
export const evaluationControllerGetEvaluationTemplates =
  (): CancelablePromise<any> => {
    return __request({
      method: 'GET',
      path: `/adk/evaluations/templates/list`,
      errors: {
        401: `Unauthorized`,
      },
    });
  };

export const useEvaluationControllerCreateEvaluationService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateEvaluationParams) => void;
  data: EvaluationResponse;
} & UseRequestProperties => {
  return useRequest(evaluationControllerCreateEvaluation, {
    method,
    ...options,
  });
};

export const useEvaluationControllerListEvaluationsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (appName?: string, status?: string) => void;
  data: Array<EvaluationResponse>;
} & UseRequestProperties => {
  return useRequest(evaluationControllerListEvaluations, {
    method,
    ...options,
  });
};

export const useEvaluationControllerGetEvaluationService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: EvaluationResponse;
} & UseRequestProperties => {
  return useRequest(evaluationControllerGetEvaluation, { method, ...options });
};

export const useEvaluationControllerDeleteEvaluationService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(evaluationControllerDeleteEvaluation, {
    method,
    ...options,
  });
};

export const useEvaluationControllerStartEvaluationService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(evaluationControllerStartEvaluation, {
    method,
    ...options,
  });
};

export const useEvaluationControllerGetEvaluationResultsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(evaluationControllerGetEvaluationResults, {
    method,
    ...options,
  });
};

export const useEvaluationControllerExportEvaluationResultsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string, format?: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(evaluationControllerExportEvaluationResults, {
    method,
    ...options,
  });
};

export const useEvaluationControllerGetEvaluationTemplatesService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(evaluationControllerGetEvaluationTemplates, {
    method,
    ...options,
  });
};
