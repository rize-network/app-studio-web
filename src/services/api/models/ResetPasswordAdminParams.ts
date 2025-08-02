/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResetPasswordAdminParams = {
  /**
   * the token to recreate the password
   */
  passwordToken: string;
  /**
   * the new password
   */
  newPassword: string;
};
