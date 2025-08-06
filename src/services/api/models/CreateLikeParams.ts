/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateLikeParams = {
  /**
   * News ID, Formation ID, news ID, Module ID, news ID or Dancer Profile ID
   */
  objectId: string;
  /**
   * Object Type
   */
  objectType: string;
  /**
   * Reaction (0 - for dislike, 1 - for like)
   */
  reaction: number;
};
