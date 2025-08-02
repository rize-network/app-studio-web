/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AutoChargeSettingsParams = {
  /**
   * Whether auto-charge is enabled
   */
  autoChargeEnabled: boolean;
  /**
   * The threshold balance to trigger auto-charge
   */
  autoChargeThreshold: number;
  /**
   * The plan to charge
   */
  autoChargePlan: string;
};
