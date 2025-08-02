/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeedbackParams = {
  /**
   * The title of the feedback
   */
  title?: string;
  /**
   * The detailed description of the feedback
   */
  description?: string;
  /**
   * The status of the feedback
   */
  status?:
    | 'UNDER_REVIEW'
    | 'PLANNED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DECLINED';
};
