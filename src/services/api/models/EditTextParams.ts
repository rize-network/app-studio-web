/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditTextParams = {
  /**
   * The text to edit
   */
  text: string;
  /**
   * The prompt describing how to edit the text
   */
  prompt: string;
  /**
   * Owner ID for tracking purposes
   */
  ownerId?: string;
  /**
   * Owner type for tracking purposes
   */
  ownerType?: string;
};
