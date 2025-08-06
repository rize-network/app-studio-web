/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgentMessageResponse } from './AgentMessageResponse';
import type { SessionResponse } from './SessionResponse';

export type AgentRunResponse = {
  /**
   * Response message
   */
  message: AgentMessageResponse;
  /**
   * Session information
   */
  session: SessionResponse;
  /**
   * Execution metadata
   */
  metadata: any;
};
