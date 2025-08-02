/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindPageParams = {
  /**
   * Page Id
   */
  projectId: string;
  /**
   * Order by field
   */
  sortField?: string;
  /**
   * Order sort
   */
  sortOrder?: string;
  /**
   * Number or result to return
   */
  take?: number;
  /**
   * Number or result to skip
   */
  skip?: number;
};
