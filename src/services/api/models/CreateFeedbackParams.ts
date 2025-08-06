/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateFeedbackParams = {
  /**
   * The title of the feedback
   */
  title: string;
  /**
   * The detailed description of the feedback
   */
  description: string;
  /**
   * The category of the feedback
   */
  category?:
    | 'UNDER_REVIEW'
    | 'PLANNED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DECLINED';
};
