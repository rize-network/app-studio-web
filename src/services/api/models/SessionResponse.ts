/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SessionResponse = {
  /**
   * Session ID
   */
  id: string;
  /**
   * Application name
   */
  appName: string;
  /**
   * User ID
   */
  userId: string;
  /**
   * Session metadata
   */
  metadata: any;
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * Last updated timestamp
   */
  updatedAt: string;
  /**
   * Session messages
   */
  messages: Array<string>;
};
