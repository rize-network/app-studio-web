import React from 'react';

import { Justify, Wrap } from '../../configs/Input.type';

export interface VerticalProps {
  /**
   * The layout content
   */
  children: React.ReactNode;
  /**
   * It aligns the elements of the container according to the available space.
   */
  justify?: Justify;
  /**
   * To specify, if the items should be wrap or not, based on available space on the line.
   */
  wrap?: Wrap;
  /**
   * If true, the items' position on the vertical axis is reversed.
   */
  isReversed?: boolean;
  /**
   * other properties
   */
  [x: string]: any;
}
