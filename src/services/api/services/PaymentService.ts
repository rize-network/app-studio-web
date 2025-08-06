/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Buffer } from '../models/Buffer';
import type { CreatePaymentParams } from '../models/CreatePaymentParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a admin, i want to create a payment
 * @param origin
 * @returns any Payment created
 * @throws ApiError
 */
export const paymentControllerStripeSetupSession = (
  origin: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/payment/stripe/setup`,
    headers: {
      origin: origin,
    },
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * @param id
 * @returns any
 * @throws ApiError
 */
export const paymentControllerGetSession = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/payment/session/${id}`,
  });
};

/**
 * @param stripeSignature
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const paymentControllerHandleWebhook = (
  stripeSignature: string,
  requestBody: Buffer
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/payment/webhook`,
    headers: {
      'stripe-signature': stripeSignature,
    },
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a admin, i want to create a payment
 * @param requestBody
 * @returns any Payment created
 * @throws ApiError
 */
export const paymentControllerGenerate = (
  requestBody: CreatePaymentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/payment`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * I want to read an payment
 * @returns any Payment data
 * @throws ApiError
 */
export const paymentControllerTransactions = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/payment/transactions`,
    errors: {
      404: `Payment does not exists`,
    },
  });
};

/**
 * I want to read an payment
 * @param id
 * @returns any Payment data
 * @throws ApiError
 */
export const paymentControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/payment/${id}`,
    errors: {
      404: `Payment does not exists`,
    },
  });
};

/**
 * As a admin, i want to delete a payment
 * @param id
 * @returns any payment delete
 * @throws ApiError
 */
export const paymentControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/payment/${id}`,
    errors: {
      403: `Incorrect credentials`,
      404: `Payment does not exists`,
    },
  });
};

export const usePaymentControllerStripeSetupSessionService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (origin: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerStripeSetupSession, {
    method,
    ...options,
  });
};

export const usePaymentControllerGetSessionService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerGetSession, { method, ...options });
};

export const usePaymentControllerHandleWebhookService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (stripeSignature: string, requestBody: Buffer) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerHandleWebhook, { method, ...options });
};

export const usePaymentControllerGenerateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreatePaymentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerGenerate, { method, ...options });
};

export const usePaymentControllerTransactionsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerTransactions, { method, ...options });
};

export const usePaymentControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerRead, { method, ...options });
};

export const usePaymentControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(paymentControllerDelete, { method, ...options });
};
