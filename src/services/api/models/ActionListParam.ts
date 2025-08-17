/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ActionListParam = {
  /**
   * ObjectType :profile,news,comment,feature,feedback,project,action,page,component,grant,application,survey
   */
  objectType: string;
  /**
   * Object Id
   */
  objectId: string;
  /**
   * Skill :project,finance,dev,brand,growth,community,design,ads,product
   */
  skill: string;
  /**
   * Project id
   */
  projectId: string;
};
