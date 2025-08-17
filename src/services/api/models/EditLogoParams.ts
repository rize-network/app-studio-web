/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditLogoParams = {
  /**
   * The URL of the logo image to edit
   */
  imageUrl: string;
  /**
   * The prompt describing how to edit the logo
   */
  prompt: string;
  /**
   * Owner type for tracking purposes
   */
  ownerType?: string;
  /**
   * Specific model to use for logo editing
   */
  model?: string;
  /**
   * Specific provider to use for logo editing
   */
  provider?: string;
};
