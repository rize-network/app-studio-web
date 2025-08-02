/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateActionParams = {
  /**
   * The name of the action
   */
  name: string;
  /**
   * The ID of the project associated with the action
   */
  projectId: number;
  /**
   * The status of the action
   */
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  /**
   * The result of the action (optional JSON)
   */
  result?: any;
  /**
   * The requirements associated with the action (optional)
   */
  requirements?: any[];
};
