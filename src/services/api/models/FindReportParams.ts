/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindReportParams = {
  /**
   * objectType :profile,news,comment,feature,feedback,project,action,page,component,grant,application,survey
   */
  objectType: string;
  /**
   * Object Id
   */
  objectId: string;
  /**
   * true/false comment reported
   */
  reported?: boolean;
  /**
   * Number or result to return
   */
  take?: number;
  /**
   * Number or result to skip
   */
  skip?: number;
  /**
   * Order by field
   */
  sortField?:
    | 'id'
    | 'userId'
    | 'text'
    | 'objectType'
    | 'objectId'
    | 'commentId'
    | 'commentCount'
    | 'likeCount'
    | 'createdAt'
    | 'updatedAt';
  /**
   * Order sort
   */
  sortOrder?: 'asc' | 'desc';
};
