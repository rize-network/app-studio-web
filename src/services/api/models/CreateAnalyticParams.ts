/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateAnalyticParams = {
  /**
   * Analytic Type :view,click,track
   */
  event?: string;
  /**
   * Analytic Name
   */
  name?: string;
  /**
   * ObjectType :profile,news,comment,feature,feedback
   */
  objectType?: string;
  /**
   * Object Id
   */
  objectId?: string;
  /**
   * Device Id
   */
  deviceId?: string;
};
