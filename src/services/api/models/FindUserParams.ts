/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindUserParams = {
  name?: string;
  /**
   * List of user IDs to fetch (for batch fetching)
   */
  ids?: Array<string>;
  /**
   * Order by field
   */
  sortField?:
    | 'id'
    | 'name'
    | 'blocked'
    | 'inactive'
    | 'role'
    | 'language'
    | 'imageUrl'
    | 'image'
    | 'textModel'
    | 'textProvider'
    | 'textTemp'
    | 'textLanguage'
    | 'imageModel'
    | 'imageProvider'
    | 'imageTemp'
    | 'videoModel'
    | 'videoProvider'
    | 'videoTemp'
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
