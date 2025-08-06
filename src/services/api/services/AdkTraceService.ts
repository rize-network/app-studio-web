/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TraceEvent } from '../models/TraceEvent';
import type { TraceMetrics } from '../models/TraceMetrics';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Get trace events for a session
 * @param sessionId Session ID
 * @param eventType Filter by event type
 * @param startTime Start time filter (ISO string)
 * @param endTime End time filter (ISO string)
 * @param limit Maximum number of events to return
 * @param offset Number of events to skip
 * @returns TraceEvent Trace events retrieved successfully
 * @throws ApiError
 */
export const traceControllerGetTraceEvents = (
  sessionId: string,
  eventType?: string,
  startTime?: string,
  endTime?: string,
  limit?: string,
  offset?: string
): CancelablePromise<Array<TraceEvent>> => {
  return __request({
    method: 'GET',
    path: `/adk/trace/events`,
    query: {
      sessionId: sessionId,
      eventType: eventType,
      startTime: startTime,
      endTime: endTime,
      limit: limit,
      offset: offset,
    },
    errors: {
      401: `Unauthorized`,
      404: `Session not found`,
    },
  });
};

/**
 * Record a trace event
 * @returns TraceEvent Trace event recorded successfully
 * @throws ApiError
 */
export const traceControllerRecordTraceEvent =
  (): CancelablePromise<TraceEvent> => {
    return __request({
      method: 'POST',
      path: `/adk/trace/events`,
      errors: {
        400: `Invalid event data`,
        401: `Unauthorized`,
      },
    });
  };

/**
 * Get trace spans for a session
 * @param sessionId Session ID
 * @param spanType Filter by span type
 * @param minDuration Minimum duration filter (ms)
 * @param maxDuration Maximum duration filter (ms)
 * @returns any Trace spans retrieved successfully
 * @throws ApiError
 */
export const traceControllerGetTraceSpans = (
  sessionId: string,
  spanType?: string,
  minDuration?: string,
  maxDuration?: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/adk/trace/spans`,
    query: {
      sessionId: sessionId,
      spanType: spanType,
      minDuration: minDuration,
      maxDuration: maxDuration,
    },
    errors: {
      401: `Unauthorized`,
      404: `Session not found`,
    },
  });
};

/**
 * Get trace metrics for a session or time period
 * @param sessionId Session ID (optional)
 * @param startTime Start time filter (ISO string)
 * @param endTime End time filter (ISO string)
 * @param aggregation Aggregation level (session, hourly, daily)
 * @returns TraceMetrics Trace metrics retrieved successfully
 * @throws ApiError
 */
export const traceControllerGetTraceMetrics = (
  sessionId?: string,
  startTime?: string,
  endTime?: string,
  aggregation?: string
): CancelablePromise<TraceMetrics> => {
  return __request({
    method: 'GET',
    path: `/adk/trace/metrics`,
    query: {
      sessionId: sessionId,
      startTime: startTime,
      endTime: endTime,
      aggregation: aggregation,
    },
    errors: {
      401: `Unauthorized`,
    },
  });
};

/**
 * Get trace timeline for visualization
 * @param sessionId Session ID
 * @returns any Trace timeline retrieved successfully
 * @throws ApiError
 */
export const traceControllerGetTraceTimeline = (
  sessionId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/adk/trace/timeline`,
    query: {
      sessionId: sessionId,
    },
    errors: {
      401: `Unauthorized`,
      404: `Session not found`,
    },
  });
};

/**
 * Start a trace span
 * @returns any Trace span started successfully
 * @throws ApiError
 */
export const traceControllerStartTraceSpan = (): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/adk/trace/spans/start`,
    errors: {
      400: `Invalid span data`,
      401: `Unauthorized`,
    },
  });
};

/**
 * End a trace span
 * @param spanId
 * @returns any Trace span ended successfully
 * @throws ApiError
 */
export const traceControllerEndTraceSpan = (
  spanId: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/adk/trace/spans/${spanId}/end`,
    errors: {
      401: `Unauthorized`,
      404: `Span not found`,
    },
  });
};

export const useTraceControllerGetTraceEventsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (
    sessionId: string,
    eventType?: string,
    startTime?: string,
    endTime?: string,
    limit?: string,
    offset?: string
  ) => void;
  data: Array<TraceEvent>;
} & UseRequestProperties => {
  return useRequest(traceControllerGetTraceEvents, { method, ...options });
};

export const useTraceControllerRecordTraceEventService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: TraceEvent;
} & UseRequestProperties => {
  return useRequest(traceControllerRecordTraceEvent, { method, ...options });
};

export const useTraceControllerGetTraceSpansService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (
    sessionId: string,
    spanType?: string,
    minDuration?: string,
    maxDuration?: string
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(traceControllerGetTraceSpans, { method, ...options });
};

export const useTraceControllerGetTraceMetricsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (
    sessionId?: string,
    startTime?: string,
    endTime?: string,
    aggregation?: string
  ) => void;
  data: TraceMetrics;
} & UseRequestProperties => {
  return useRequest(traceControllerGetTraceMetrics, { method, ...options });
};

export const useTraceControllerGetTraceTimelineService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (sessionId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(traceControllerGetTraceTimeline, { method, ...options });
};

export const useTraceControllerStartTraceSpanService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(traceControllerStartTraceSpan, { method, ...options });
};

export const useTraceControllerEndTraceSpanService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (spanId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(traceControllerEndTraceSpan, { method, ...options });
};
