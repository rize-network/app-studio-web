/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EvaluationResponse = {
  /**
   * Evaluation ID
   */
  id: string;
  /**
   * Evaluation name
   */
  name: string;
  /**
   * Application name
   */
  appName: string;
  /**
   * User ID
   */
  userId: string;
  /**
   * Evaluation status
   */
  status: string;
  /**
   * Test cases
   */
  testCases: Array<string>;
  /**
   * Results
   */
  results?: Array<string>;
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * Completion timestamp
   */
  completedAt?: string;
};
