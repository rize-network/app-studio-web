/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ForgotPasswordAdminParams } from '../models/ForgotPasswordAdminParams';
import type { ForgotPasswordParams } from '../models/ForgotPasswordParams';
import type { ResetPasswordAdminParams } from '../models/ResetPasswordAdminParams';
import type { ResetPasswordParams } from '../models/ResetPasswordParams';
import type { SignInAdminParams } from '../models/SignInAdminParams';
import type { SignInParams } from '../models/SignInParams';
import type { SignUpParams } from '../models/SignUpParams';
import type { UpdatePasswordAminParams } from '../models/UpdatePasswordAminParams';
import type { UpdatePasswordParams } from '../models/UpdatePasswordParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want sign up
 * @param requestBody
 * @returns any Registration succeed
 * @throws ApiError
 */
export const authUserControllerSignUp = (
  requestBody: SignUpParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/user/signUp`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `User already registered`,
    },
  });
};

/**
 * As a user, i want to sign in
 * @param requestBody
 * @returns any Login succeed
 * @throws ApiError
 */
export const authUserControllerSignIn = (
  requestBody: SignInParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/user/signIn`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want remenber my password
 * @param requestBody
 * @returns any User email sended
 * @throws ApiError
 */
export const authUserControllerForgotPassword = (
  requestBody: ForgotPasswordParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/user/forgotPassword`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `User Not Found`,
    },
  });
};

/**
 * As a user, i want reset my password
 * @param requestBody
 * @returns any password updated
 * @throws ApiError
 */
export const authUserControllerResetPassword = (
  requestBody: ResetPasswordParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/user/resetPassword`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `Token Not found`,
    },
  });
};

/**
 * As a user, i want update my password
 * @param requestBody
 * @returns any Password has been updated.
 * @throws ApiError
 */
export const authUserControllerUpdatePassword = (
  requestBody: UpdatePasswordParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/auth/user/password`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      403: `Old Password doesn't Found match`,
    },
  });
};

/**
 * As a user, i want get my session
 * @returns any user session
 * @throws ApiError
 */
export const authUserControllerMe = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/auth/user/session`,
  });
};

/**
 * As an admin, i want to login
 * @param requestBody
 * @returns any Login succeed
 * @throws ApiError
 */
export const authAdminControllerSignIn = (
  requestBody: SignInAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/admin/signIn`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want remenber my password
 * @param requestBody
 * @returns any Admin email sended
 * @throws ApiError
 */
export const authAdminControllerForgotPassword = (
  requestBody: ForgotPasswordAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/admin/forgotPassword`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `Admin Not Found`,
    },
  });
};

/**
 * As a admin, i want reset my password
 * @param requestBody
 * @returns any password updated
 * @throws ApiError
 */
export const authAdminControllerResetPassword = (
  requestBody: ResetPasswordAdminParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/auth/admin/resetPassword`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      404: `Token Not found`,
    },
  });
};

/**
 * As a admin, i want update my password
 * @param requestBody
 * @returns any Password has been updated.
 * @throws ApiError
 */
export const authAdminControllerUpdatePassword = (
  requestBody: UpdatePasswordAminParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/auth/admin/password`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      403: `Old Password doesn't Found match`,
    },
  });
};

/**
 * As a admin, i want get my session
 * @returns any admin session
 * @throws ApiError
 */
export const authAdminControllerMe = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/auth/admin/session`,
  });
};

export const useAuthUserControllerSignUpService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SignUpParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authUserControllerSignUp, { method, ...options });
};

export const useAuthUserControllerSignInService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SignInParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authUserControllerSignIn, { method, ...options });
};

export const useAuthUserControllerForgotPasswordService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ForgotPasswordParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authUserControllerForgotPassword, { method, ...options });
};

export const useAuthUserControllerResetPasswordService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ResetPasswordParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authUserControllerResetPassword, { method, ...options });
};

export const useAuthUserControllerUpdatePasswordService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdatePasswordParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authUserControllerUpdatePassword, { method, ...options });
};

export const useAuthUserControllerMeService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authUserControllerMe, { method, ...options });
};

export const useAuthAdminControllerSignInService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SignInAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authAdminControllerSignIn, { method, ...options });
};

export const useAuthAdminControllerForgotPasswordService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ForgotPasswordAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authAdminControllerForgotPassword, { method, ...options });
};

export const useAuthAdminControllerResetPasswordService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ResetPasswordAdminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authAdminControllerResetPassword, { method, ...options });
};

export const useAuthAdminControllerUpdatePasswordService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdatePasswordAminParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authAdminControllerUpdatePassword, { method, ...options });
};

export const useAuthAdminControllerMeService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(authAdminControllerMe, { method, ...options });
};
