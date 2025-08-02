/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TraceMetrics = {
  /**
   * Total execution time (ms)
   */
  totalTime: number;
  /**
   * Number of events
   */
  eventCount: number;
  /**
   * Error count
   */
  errorCount: number;
  /**
   * Success rate
   */
  successRate: number;
  /**
   * Average response time (ms)
   */
  avgResponseTime: number;
};
