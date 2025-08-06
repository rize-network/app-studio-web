/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FindNewsParams = {
  title?: string;
  /**
   * Category :medias,innewss
   */
  category?: string;
  /**
   * Publication Status :published,draft,hidden
   */
  publicationStatus?: string;
  /**
   * Publication date
   */
  publicationDate?: any;
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
