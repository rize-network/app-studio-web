/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MessagePart = {
  /**
   * Part type (text, image, file, etc.)
   */
  type: string;
  /**
   * Part content
   */
  content: any;
  /**
   * Part metadata
   */
  metadata?: any;
};
