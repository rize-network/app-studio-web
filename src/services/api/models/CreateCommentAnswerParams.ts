/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateCommentAnswerParams = {
  commentId: string;
  text: string;
  objectId?: string;
  /**
   * ObjectType :profile,news,comment,feature,feedback
   */
  objectType: string;
};
