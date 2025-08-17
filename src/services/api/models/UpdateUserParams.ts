/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateUserParams = {
  email?: string;
  name?: string;
  /**
   * text Model
   */
  textModel?: string;
  /**
   * text Provider
   */
  textProvider?: string;
  /**
   * text Temperature
   */
  textTemp?: number;
  /**
   * Text Language
   */
  textLanguage?: string;
  /**
   * Image Model
   */
  imageModel?: string;
  /**
   * Image Provider
   */
  imageProvider?: string;
  /**
   * Image Temperature
   */
  imageTemp?: number;
  /**
   * Image Edit Model
   */
  imageEditModel?: string;
  /**
   * Image Edit Provider
   */
  imageEditProvider?: string;
  /**
   * Video Model
   */
  videoModel?: string;
  /**
   * Video Provider
   */
  videoProvider?: string;
  /**
   * Video Temperature
   */
  videoTemp?: number;
};
