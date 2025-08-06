/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateTaskStatus = {
  /**
   * Task ID
   */
  taskId: string;
  /**
   * Task Status
   */
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  /**
   * Task Result
   */
  result?: any;
  /**
   * Task Error
   */
  error?: any;
};
