/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AgentMessageResponse = {
  /**
   * Message ID
   */
  id: string;
  /**
   * Message role
   */
  role: string;
  /**
   * Message parts
   */
  parts: Array<string>;
  /**
   * Message metadata
   */
  metadata: any;
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * Session ID
   */
  sessionId: string;
};
