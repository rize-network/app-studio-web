/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SetAnalyticViewParams = {
  /**
   * ObjectType :profile,news,comment,feature,feedback,project,action,page,component,grant,application,survey
   */
  objectType: string;
  /**
   * Object Id
   */
  objectId: string;
  /**
   * Analytic View based number
   */
  count: number;
};
