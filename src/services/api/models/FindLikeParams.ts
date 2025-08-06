/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindLikeParams = {
  /**
   * News ID, Formation ID, news ID, Module ID, news ID or Dancer Profile ID
   */
  objectId?: string;
  /**
   * reaction
   */
  reaction?: number;
  /**
   * Number or result to return
   */
  take?: number;
  /**
   * Number or result to skip
   */
  skip?: number;
  /**
   * Order by field
   */
  sortField?:
    | 'id'
    | 'title'
    | 'description'
    | 'category'
    | 'image'
    | 'imageUrl'
    | 'payWithCoins'
    | 'payWithSubscription'
    | 'priceWithCoins'
    | 'priceWithSubscription'
    | 'numberOfCoinsIfShared'
    | 'url'
    | 'author'
    | 'numberOfViews'
    | 'publicationDate'
    | 'publicationStatus'
    | 'commentCount'
    | 'likeCount'
    | 'locale'
    | 'translations'
    | 'rating'
    | 'createdAt'
    | 'updatedAt';
  /**
   * Order sort
   */
  sortOrder?: 'asc' | 'desc';
};
