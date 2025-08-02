/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditImageParams = {
  /**
   * The URL of the image to edit
   */
  imageUrl: string;
  /**
   * The prompt describing how to edit the image
   */
  prompt: string;
  /**
   * Owner type for tracking purposes
   */
  ownerType?: string;
};
