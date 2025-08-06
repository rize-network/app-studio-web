/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateContentParams = {
  /**
   * Content Name
   */
  name?: 'Users' | 'Admins' | 'News' | 'NumberOfUsers';
  /**
   * Type right Name (Read or Update)
   */
  rightType?: 'Read' | 'Update';
};
