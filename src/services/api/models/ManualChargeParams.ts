/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ManualChargeParams = {
  /**
   * The payment method ID
   */
  paymentMethodId: string;
  /**
   * The plan to charge
   */
  plan: string;
  /**
   * The idempotency key
   */
  idempotencyKey: string;
};
