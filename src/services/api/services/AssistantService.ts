/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EditImageParams } from '../models/EditImageParams';
import type { EditLogoParams } from '../models/EditLogoParams';
import type { EditTextParams } from '../models/EditTextParams';
import type { GenerateAssistantParams } from '../models/GenerateAssistantParams';
import type { GenerateJsonAssistantParams } from '../models/GenerateJsonAssistantParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to generate an intelli content
 * @param requestBody
 * @returns any Assistant created
 * @throws ApiError
 */
export const assistantControllerGenerateAiContent = (
  requestBody: GenerateAssistantParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/assistant/content`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to generate an intelli content
 * @param requestBody
 * @returns any Assistant created
 * @throws ApiError
 */
export const assistantControllerGenerateAiJsonContent = (
  requestBody: GenerateJsonAssistantParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/assistant/json`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, I want to edit an image using AI
 * @param requestBody
 * @returns any Image edited successfully
 * @throws ApiError
 */
export const assistantControllerEditImage = (
  requestBody: EditImageParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/assistant/image/edit`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, I want to edit an image using AI
 * @param requestBody
 * @returns any Image edited successfully
 * @throws ApiError
 */
export const assistantControllerEditLogo = (
  requestBody: EditLogoParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/assistant/logo/edit`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, I want to edit text using AI
 * @param requestBody
 * @returns any Text edited successfully
 * @throws ApiError
 */
export const assistantControllerEditText = (
  requestBody: EditTextParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/assistant/text/edit`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useAssistantControllerGenerateAiContentService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: GenerateAssistantParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(assistantControllerGenerateAiContent, {
    method,
    ...options,
  });
};

export const useAssistantControllerGenerateAiJsonContentService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: GenerateJsonAssistantParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(assistantControllerGenerateAiJsonContent, {
    method,
    ...options,
  });
};

export const useAssistantControllerEditImageService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: EditImageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(assistantControllerEditImage, { method, ...options });
};

export const useAssistantControllerEditLogoService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: EditLogoParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(assistantControllerEditLogo, { method, ...options });
};

export const useAssistantControllerEditTextService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: EditTextParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(assistantControllerEditText, { method, ...options });
};
