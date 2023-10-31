import React from 'react';

import { Justify, Wrap } from '../../configs/Input.type';

export interface HorizontalProps {
  /**
   * The layout content
   */
  children: React.ReactNode;
  /**
   * Aligns items horizontally, when they don't fill up the entire main-axis
   */
  justify?: Justify;
  /**
   * To specifies if the items should be wrap or not, based on available space on the line.
   */
  wrap?: Wrap;
  /**
   * If true, it reverses the items order on the horizontal axis.
   */
  isReversed?: boolean;
  /**
   * other properties
   */
  [x: string]: any;
}
