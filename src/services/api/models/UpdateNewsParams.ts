/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateNewsParams = {
  /**
   * News title
   */
  title?: string;
  /**
   * News Url
   */
  url?: string;
  /**
   * Category :medias,innewss
   */
  category?: string;
  /**
   * News Author
   */
  author?: string;
  /**
   * Publication Status :published,draft,hidden
   */
  publicationStatus?: string;
  /**
   * Publication date
   */
  publicationDate?: string;
  /**
   * can pay with coins
   */
  payWithCoins?: boolean;
  /**
   * can pay with subscription
   */
  payWithSubscription?: boolean;
  /**
   * price in coins
   */
  priceWithCoins?: number;
  /**
   * price with subscription
   */
  priceWithSubscription?: number;
  /**
   * number of coins if shared
   */
  numberOfCoinsIfShared?: number;
};
