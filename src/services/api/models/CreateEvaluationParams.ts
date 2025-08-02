/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateEvaluationParams = {
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
   * Test cases
   */
  testCases: Array<string>;
  /**
   * Evaluation configuration
   */
  config?: any;
};
