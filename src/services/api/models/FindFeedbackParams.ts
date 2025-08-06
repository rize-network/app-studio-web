/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindFeedbackParams = {
  /**
   * Number of items to take
   */
  take?: number;
  /**
   * Number of items to skip
   */
  skip?: number;
  /**
   * Field to sort by
   */
  sortField?: string;
  /**
   * Sort order
   */
  sortOrder?: 'asc' | 'desc';
  /**
   * Filter by status
   */
  status?:
    | 'UNDER_REVIEW'
    | 'PLANNED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DECLINED';
  /**
   * Filter by user ID
   */
  userId?: string;
  /**
   * Filter by category
   */
  category?: 'feature' | 'bug' | 'suggestion' | 'issue';
};
