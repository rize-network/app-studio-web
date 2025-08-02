/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindExempleParams = {
  name?: string;
  /**
   * Order by field
   */
  sortField?:
    | 'id'
    | 'userId'
    | 'name'
    | 'imageUrl'
    | 'image'
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
