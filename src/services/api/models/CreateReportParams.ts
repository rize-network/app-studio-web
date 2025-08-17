/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateReportParams = {
  /**
   * Message describing the report
   */
  text?: string;
  /**
   * Content to report
   */
  content?: any;
  objectId: string;
  /**
   * objectType :profile,news,comment,feature,feedback,project,action,page,component,grant,application,survey
   */
  objectType: string;
};
