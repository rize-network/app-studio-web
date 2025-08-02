/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SaveReceiptParams } from '../models/SaveReceiptParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to subscribe to the premium account
 * @param requestBody
 * @returns any Subscription saved
 * @throws ApiError
 */
export const iapControllerSave = (
  requestBody: SaveReceiptParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/iap/save-receipt`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to buy gold
 * @param requestBody
 * @returns any Gold saved
 * @throws ApiError
 */
export const iapControllerBuyGold = (
  requestBody: SaveReceiptParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/iap/gold`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, i want to find my subscription
 * @param appType
 * @returns any Subscription data
 * @throws ApiError
 */
export const iapControllerRead = (appType: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/iap/user-subscription/${appType}`,
    errors: {
      404: `There is no subscription for this user`,
    },
  });
};

export const useIapControllerSaveService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SaveReceiptParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(iapControllerSave, { method, ...options });
};

export const useIapControllerBuyGoldService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SaveReceiptParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(iapControllerBuyGold, { method, ...options });
};

export const useIapControllerReadService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (appType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(iapControllerRead, { method, ...options });
};
