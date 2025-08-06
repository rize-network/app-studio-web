/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentRunRequest } from '../models/AgentRunRequest';
import type { AgentRunResponse } from '../models/AgentRunResponse';
import type { CreateSessionParams } from '../models/CreateSessionParams';
import type { ImportSessionParams } from '../models/ImportSessionParams';
import type { SessionResponse } from '../models/SessionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Create a new agent session
 * @param requestBody
 * @returns SessionResponse Session created successfully
 * @throws ApiError
 */
export const adkControllerCreateSession = (
  requestBody: CreateSessionParams
): CancelablePromise<SessionResponse> => {
  return __request({
    method: 'POST',
    path: `/adk/sessions`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Unauthorized`,
      403: `Forbidden`,
    },
  });
};

/**
 * List user sessions
 * @param appName Filter by application name
 * @returns SessionResponse Sessions retrieved successfully
 * @throws ApiError
 */
export const adkControllerListSessions = (
  appName?: string
): CancelablePromise<Array<SessionResponse>> => {
  return __request({
    method: 'GET',
    path: `/adk/sessions`,
    query: {
      appName: appName,
    },
    errors: {
      401: `Unauthorized`,
    },
  });
};

/**
 * Get session by ID
 * @param id
 * @returns SessionResponse Session retrieved successfully
 * @throws ApiError
 */
export const adkControllerGetSession = (
  id: string
): CancelablePromise<SessionResponse> => {
  return __request({
    method: 'GET',
    path: `/adk/sessions/${id}`,
    errors: {
      401: `Unauthorized`,
      404: `Session not found`,
    },
  });
};

/**
 * Delete session by ID
 * @param id
 * @returns any Session deleted successfully
 * @throws ApiError
 */
export const adkControllerDeleteSession = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/adk/sessions/${id}`,
    errors: {
      401: `Unauthorized`,
      404: `Session not found`,
    },
  });
};

/**
 * Import session from JSON data
 * @param requestBody
 * @returns SessionResponse Session imported successfully
 * @throws ApiError
 */
export const adkControllerImportSession = (
  requestBody: ImportSessionParams
): CancelablePromise<SessionResponse> => {
  return __request({
    method: 'POST',
    path: `/adk/sessions/import`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      400: `Invalid session data`,
      401: `Unauthorized`,
    },
  });
};

/**
 * Send message to agent (non-streaming)
 * @param requestBody
 * @returns AgentRunResponse Message processed successfully
 * @throws ApiError
 */
export const adkControllerRunAgent = (
  requestBody: AgentRunRequest
): CancelablePromise<AgentRunResponse> => {
  return __request({
    method: 'POST',
    path: `/adk/run`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      400: `Invalid request`,
      401: `Unauthorized`,
    },
  });
};

/**
 * Send message to agent (streaming)
 * @param requestBody
 * @returns any Streaming response started
 * @throws ApiError
 */
export const adkControllerRunAgentStreaming = (
  requestBody: AgentRunRequest
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/adk/run_sse`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      400: `Invalid request`,
      401: `Unauthorized`,
    },
  });
};

/**
 * ADK service health check
 * @returns any Service is healthy
 * @throws ApiError
 */
export const adkControllerHealthCheck = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/adk/health`,
  });
};

/**
 * Get ADK service information
 * @returns any Service information
 * @throws ApiError
 */
export const adkControllerGetServiceInfo = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/adk/info`,
  });
};

export const useAdkControllerCreateSessionService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreateSessionParams) => void;
  data: SessionResponse;
} & UseRequestProperties => {
  return useRequest(adkControllerCreateSession, { method, ...options });
};

export const useAdkControllerListSessionsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (appName?: string) => void;
  data: Array<SessionResponse>;
} & UseRequestProperties => {
  return useRequest(adkControllerListSessions, { method, ...options });
};

export const useAdkControllerGetSessionService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: SessionResponse;
} & UseRequestProperties => {
  return useRequest(adkControllerGetSession, { method, ...options });
};

export const useAdkControllerDeleteSessionService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adkControllerDeleteSession, { method, ...options });
};

export const useAdkControllerImportSessionService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ImportSessionParams) => void;
  data: SessionResponse;
} & UseRequestProperties => {
  return useRequest(adkControllerImportSession, { method, ...options });
};

export const useAdkControllerRunAgentService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: AgentRunRequest) => void;
  data: AgentRunResponse;
} & UseRequestProperties => {
  return useRequest(adkControllerRunAgent, { method, ...options });
};

export const useAdkControllerRunAgentStreamingService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: AgentRunRequest) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adkControllerRunAgentStreaming, { method, ...options });
};

export const useAdkControllerHealthCheckService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adkControllerHealthCheck, { method, ...options });
};

export const useAdkControllerGetServiceInfoService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(adkControllerGetServiceInfo, { method, ...options });
};
