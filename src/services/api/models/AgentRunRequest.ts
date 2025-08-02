/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgentMessage } from './AgentMessage';

export type AgentRunRequest = {
  /**
   * Application name
   */
  appName: string;
  /**
   * User ID
   */
  userId: string;
  /**
   * Session ID
   */
  sessionId: string;
  /**
   * New message to send
   */
  newMessage: AgentMessage;
  /**
   * Enable streaming response
   */
  streaming?: boolean;
  /**
   * Request options
   */
  options?: any;
};
