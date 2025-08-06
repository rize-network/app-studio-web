/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRatingParams = {
  /**
   * Formation ID or news ID
   */
  objectId: string;
  /**
   * ObjectType :profile,news,comment,feature,feedback
   */
  objectType: string;
  /**
   * Count
   */
  count: number;
};
