/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateContentParams = {
  /**
   * Content Name
   */
  name?: 'Users' | 'Admins' | 'News' | 'NumberOfUsers';
  /**
   * Type right Name (Read or Update)
   */
  rightType?: 'Read' | 'Update';
};
