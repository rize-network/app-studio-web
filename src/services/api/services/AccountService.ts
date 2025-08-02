/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutoChargeSettingsParams } from '../models/AutoChargeSettingsParams';
import type { ManualChargeParams } from '../models/ManualChargeParams';
import type { SetPaymentMethodParams } from '../models/SetPaymentMethodParams';
import type { UpdateAccountParams } from '../models/UpdateAccountParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to read my account
 * @returns any Account data.
 * @throws ApiError
 */
export const accountControllerMe = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/account`,
    errors: {
      401: `Not authorized`,
    },
  });
};

/**
 * As a user, i want to update my account
 * @param requestBody
 * @returns any account update succeed
 * @throws ApiError
 */
export const accountControllerUpdate = (
  requestBody: UpdateAccountParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/account`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
    },
  });
};

/**
 * As a user, i want to read my account
 * @returns any Account data.
 * @throws ApiError
 */
export const accountControllerBalance = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/account/balance`,
    errors: {
      401: `Not authorized`,
    },
  });
};

/**
 * As a user, i want to read my notifications
 * @returns any Notifications data.
 * @throws ApiError
 */
export const accountControllerNotifications = (): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/account/notification`,
    errors: {
      401: `Not authorized`,
    },
  });
};

/**
 * As a user, i want to create a fake notification
 * @returns any Notifications data.
 * @throws ApiError
 */
export const accountControllerCreateFakeNotification =
  (): CancelablePromise<any> => {
    return __request({
      method: 'POST',
      path: `/account/notification`,
      errors: {
        401: `Not authorized`,
      },
    });
  };

/**
 * As a user, i want to mark as read a notification
 * @param id
 * @returns any Notifications data.
 * @throws ApiError
 */
export const accountControllerNotification = (
  id: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/account/notification/${id}`,
    errors: {
      401: `Not authorized`,
    },
  });
};

/**
 * Create a SetupIntent for future payments
 * @returns any SetupIntent created successfully.
 * @throws ApiError
 */
export const accountControllerCreateSetupIntent =
  (): CancelablePromise<any> => {
    return __request({
      method: 'POST',
      path: `/account/setup-intent`,
      errors: {
        401: `Unauthorized`,
      },
    });
  };

/**
 * Get all payment methods for the customer
 * @returns any Payment methods retrieved successfully.
 * @throws ApiError
 */
export const accountControllerGetPaymentMethods =
  (): CancelablePromise<any> => {
    return __request({
      method: 'GET',
      path: `/account/payment-methods`,
      errors: {
        401: `Unauthorized`,
      },
    });
  };

/**
 * Delete a payment method for the customer
 * @param requestBody
 * @returns any Payment method deleted successfully.
 * @throws ApiError
 */
export const accountControllerDeletePaymentMethod = (
  requestBody: SetPaymentMethodParams
): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/account/payment-method`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Unauthorized`,
    },
  });
};

/**
 * Set a payment method as default for the customer
 * @param requestBody
 * @returns any Payment method set as default successfully.
 * @throws ApiError
 */
export const accountControllerSetDefaultPaymentMethod = (
  requestBody: SetPaymentMethodParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/account/payment-method/default`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Unauthorized`,
    },
  });
};

/**
 * Manually charge a payment method
 * @param requestBody
 * @returns any Charge created successfully.
 * @throws ApiError
 */
export const accountControllerManualCharge = (
  requestBody: ManualChargeParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/account/manual-charge`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Unauthorized`,
    },
  });
};

/**
 * Update auto-charge settings
 * @param requestBody
 * @returns any Auto-charge settings updated successfully.
 * @throws ApiError
 */
export const accountControllerUpdateAutoChargeSettings = (
  requestBody: AutoChargeSettingsParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/account/auto-charge-settings`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

export const useAccountControllerMeService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerMe, { method, ...options });
};

export const useAccountControllerUpdateService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdateAccountParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerUpdate, { method, ...options });
};

export const useAccountControllerBalanceService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerBalance, { method, ...options });
};

export const useAccountControllerNotificationsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerNotifications, { method, ...options });
};

export const useAccountControllerCreateFakeNotificationService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerCreateFakeNotification, {
    method,
    ...options,
  });
};

export const useAccountControllerNotificationService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerNotification, { method, ...options });
};

export const useAccountControllerCreateSetupIntentService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerCreateSetupIntent, { method, ...options });
};

export const useAccountControllerGetPaymentMethodsService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: () => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerGetPaymentMethods, { method, ...options });
};

export const useAccountControllerDeletePaymentMethodService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SetPaymentMethodParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerDeletePaymentMethod, {
    method,
    ...options,
  });
};

export const useAccountControllerSetDefaultPaymentMethodService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: SetPaymentMethodParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerSetDefaultPaymentMethod, {
    method,
    ...options,
  });
};

export const useAccountControllerManualChargeService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ManualChargeParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerManualCharge, { method, ...options });
};

export const useAccountControllerUpdateAutoChargeSettingsService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: AutoChargeSettingsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(accountControllerUpdateAutoChargeSettings, {
    method,
    ...options,
  });
};
