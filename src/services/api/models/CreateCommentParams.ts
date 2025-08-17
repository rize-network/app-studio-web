/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateCommentParams = {
  text: string;
  objectId: string;
  /**
   * ObjectType :profile,news,comment,feature,feedback,project,action,page,component,grant,application,survey
   */
  objectType: string;
};
