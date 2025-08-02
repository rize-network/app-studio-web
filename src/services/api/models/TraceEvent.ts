/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TraceEvent = {
  /**
   * Event ID
   */
  id: string;
  /**
   * Event type
   */
  type: string;
  /**
   * Event timestamp
   */
  timestamp: string;
  /**
   * Event data
   */
  data: any;
  /**
   * Session ID
   */
  sessionId: string;
  /**
   * Parent event ID
   */
  parentId?: string;
};
