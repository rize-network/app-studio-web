/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindContentParams = {
  name?: string;
  /**
   * Order by field
   */
  sortField?:
    | 'id'
    | 'name'
    | 'rightType'
    | 'owner'
    | 'adminId'
    | 'createdAt'
    | 'updatedAt';
  /**
   * Order sort
   */
  sortOrder?: 'asc' | 'desc';
  /**
   * Number or result to return
   */
  take?: number;
  /**
   * Number or result to skip
   */
  skip?: number;
};
