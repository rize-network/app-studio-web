import React from 'react';
import { ViewProps } from 'app-studio';

export interface SplashScreenProps extends ViewProps {
  /** Custom logo node. Takes precedence over `logoSrc`. */
  logo?: React.ReactNode;
  /** Image URL used for the logo when `logo` isn't provided. */
  logoSrc?: string;
  /** Custom loading indicator. Defaults to the `Loader` component. */
  loader?: React.ReactNode;
  /** Show the loading indicator under the logo. Default true. */
  showLoader?: boolean;
  /** Exit animation duration in ms (also the unmount delay). Default 600. */
  duration?: number;
  /**
   * Controlled "loaded" flag. When omitted the component reads the shared
   * `useSplashStore`. When the flag flips true, the splash fades out and
   * unmounts.
   */
  isLoaded?: boolean;
  /** Called once the exit animation completes and the splash unmounts. */
  onHidden?: () => void;
  children?: React.ReactNode;
}
