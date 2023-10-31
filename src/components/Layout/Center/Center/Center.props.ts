import React from 'react';

import { Wrap } from '../../configs/Input.type';

export interface CenterProps {
  /**
   * To specifies if the items should be wrap or not, based on available space on the line.
   */
  wrap?: Wrap;
  /**
   * Layout content
   */
  children: React.ReactNode;
  /**
   * other properties
   */
  [x: string]: any;
}
