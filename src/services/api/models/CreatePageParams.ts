/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreatePageParams = {
  /**
   * The name to be associated with the page
   */
  name: string;
  /**
   * The project Id to be associated with the page
   */
  projectId: string;
  /**
   * The pageType  to be used to create the code
   */
  pageType?: string;
  /**
   * The description to be associated with the page
   */
  description?: string;
  /**
   * The itemId Id  be associated with the page
   */
  itemId?: string;
};
