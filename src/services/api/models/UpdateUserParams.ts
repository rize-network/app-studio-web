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
   * image Model
   */
  imageModel?: string;
  /**
   * image Provider
   */
  imageProvider?: string;
  /**
   * image Temperature
   */
  imageTemp?: number;
  /**
   * video Model
   */
  videoModel?: string;
  /**
   * video Provider
   */
  videoProvider?: string;
  /**
   * video Temperature
   */
  videoTemp?: number;
};
