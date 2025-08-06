/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MessagePart } from './MessagePart';

export type AgentMessage = {
  /**
   * Message role (user, assistant, system)
   */
  role: string;
  /**
   * Message parts
   */
  parts: Array<MessagePart>;
  /**
   * Message metadata
   */
  metadata?: any;
};
