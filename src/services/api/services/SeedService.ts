/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * seed new data
 * @param seed Seed a service
 * @returns any Redirection done
 * @throws ApiError
 */
export const seedControllerSeed = (
  seed:
    | 'dynamicFieldToRead'
    | 'dynamicFieldToDelete'
    | 'fieldDynamic'
    | 'user'
    | 'creatorEvent'
    | 'admin'
    | 'test'
    | 'userPasswordForgot'
    | 'userWantingToChangePassword'
    | 'userAlreadyRegistered'
    | 'profileToRead'
    | 'profileToUpdate'
    | 'adminPasswordForgot'
    | 'adminWantingToChangePassword'
    | 'adminToUpdate'
    | 'adminToRead'
    | 'adminToDelete'
    | 'adminToFind1'
    | 'adminToFind2'
    | 'exempleToUpdate'
    | 'exempleToRead'
    | 'exempleToDelete'
    | 'exempleToFind1'
    | 'exempleToFind2'
    | 'adminUserDisplayedCount'
    | 'newsToShowOnHome'
    | 'likeOnNews'
    | 'likeOnProfile'
    | 'ratingOnFormation'
    | 'ratingToRead'
    | 'ratingOnFormationModule'
    | 'newsToDelete'
    | 'newsToFind'
    | 'newsToRead'
    | 'newsToUpdate'
    | 'contentToUpdate'
    | 'contentToRead'
    | 'contentToDelete'
    | 'contentToFind1'
    | 'contentToFind2'
    | 'commentToDelete'
    | 'commentToFind1'
    | 'commentToFind2'
    | 'commentToRead'
    | 'commentToUpdate'
    | 'commentToUpdateByAdmin'
    | 'commentToDeleteByAdmin'
    | 'commentToReport'
    | 'homeToUpdate'
    | 'homeToDelete'
    | 'homeToList'
    | 'homeToRead'
    | 'highlightToUpdate'
    | 'highlightToDelete'
    | 'highlightToList'
    | 'highlightToRead'
    | 'analyticToDelete'
    | 'analyticToFind1'
    | 'analyticToFind2'
    | 'analyticToRead'
    | 'analyticToUpdate'
    | 'notificationToRead'
    | 'projectToGenerate'
    | 'userToUpdate'
    | 'itemToRead'
    | 'itemTextToUpdate'
    | 'pageToCreate'
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/seed/set`,
    query: {
      seed: seed,
    },
  });
};

/**
 * get seed data
 * @param seed Seed a service
 * @returns any Redirection done
 * @throws ApiError
 */
export const seedControllerGet = (
  seed:
    | 'dynamicFieldToRead'
    | 'dynamicFieldToDelete'
    | 'fieldDynamic'
    | 'user'
    | 'creatorEvent'
    | 'admin'
    | 'test'
    | 'userPasswordForgot'
    | 'userWantingToChangePassword'
    | 'userAlreadyRegistered'
    | 'profileToRead'
    | 'profileToUpdate'
    | 'adminPasswordForgot'
    | 'adminWantingToChangePassword'
    | 'adminToUpdate'
    | 'adminToRead'
    | 'adminToDelete'
    | 'adminToFind1'
    | 'adminToFind2'
    | 'exempleToUpdate'
    | 'exempleToRead'
    | 'exempleToDelete'
    | 'exempleToFind1'
    | 'exempleToFind2'
    | 'adminUserDisplayedCount'
    | 'newsToShowOnHome'
    | 'likeOnNews'
    | 'likeOnProfile'
    | 'ratingOnFormation'
    | 'ratingToRead'
    | 'ratingOnFormationModule'
    | 'newsToDelete'
    | 'newsToFind'
    | 'newsToRead'
    | 'newsToUpdate'
    | 'contentToUpdate'
    | 'contentToRead'
    | 'contentToDelete'
    | 'contentToFind1'
    | 'contentToFind2'
    | 'commentToDelete'
    | 'commentToFind1'
    | 'commentToFind2'
    | 'commentToRead'
    | 'commentToUpdate'
    | 'commentToUpdateByAdmin'
    | 'commentToDeleteByAdmin'
    | 'commentToReport'
    | 'homeToUpdate'
    | 'homeToDelete'
    | 'homeToList'
    | 'homeToRead'
    | 'highlightToUpdate'
    | 'highlightToDelete'
    | 'highlightToList'
    | 'highlightToRead'
    | 'analyticToDelete'
    | 'analyticToFind1'
    | 'analyticToFind2'
    | 'analyticToRead'
    | 'analyticToUpdate'
    | 'notificationToRead'
    | 'projectToGenerate'
    | 'userToUpdate'
    | 'itemToRead'
    | 'itemTextToUpdate'
    | 'pageToCreate'
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/seed/get`,
    query: {
      seed: seed,
    },
  });
};

export const useSeedControllerSeedService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (
    seed:
      | 'dynamicFieldToRead'
      | 'dynamicFieldToDelete'
      | 'fieldDynamic'
      | 'user'
      | 'creatorEvent'
      | 'admin'
      | 'test'
      | 'userPasswordForgot'
      | 'userWantingToChangePassword'
      | 'userAlreadyRegistered'
      | 'profileToRead'
      | 'profileToUpdate'
      | 'adminPasswordForgot'
      | 'adminWantingToChangePassword'
      | 'adminToUpdate'
      | 'adminToRead'
      | 'adminToDelete'
      | 'adminToFind1'
      | 'adminToFind2'
      | 'exempleToUpdate'
      | 'exempleToRead'
      | 'exempleToDelete'
      | 'exempleToFind1'
      | 'exempleToFind2'
      | 'adminUserDisplayedCount'
      | 'newsToShowOnHome'
      | 'likeOnNews'
      | 'likeOnProfile'
      | 'ratingOnFormation'
      | 'ratingToRead'
      | 'ratingOnFormationModule'
      | 'newsToDelete'
      | 'newsToFind'
      | 'newsToRead'
      | 'newsToUpdate'
      | 'contentToUpdate'
      | 'contentToRead'
      | 'contentToDelete'
      | 'contentToFind1'
      | 'contentToFind2'
      | 'commentToDelete'
      | 'commentToFind1'
      | 'commentToFind2'
      | 'commentToRead'
      | 'commentToUpdate'
      | 'commentToUpdateByAdmin'
      | 'commentToDeleteByAdmin'
      | 'commentToReport'
      | 'homeToUpdate'
      | 'homeToDelete'
      | 'homeToList'
      | 'homeToRead'
      | 'highlightToUpdate'
      | 'highlightToDelete'
      | 'highlightToList'
      | 'highlightToRead'
      | 'analyticToDelete'
      | 'analyticToFind1'
      | 'analyticToFind2'
      | 'analyticToRead'
      | 'analyticToUpdate'
      | 'notificationToRead'
      | 'projectToGenerate'
      | 'userToUpdate'
      | 'itemToRead'
      | 'itemTextToUpdate'
      | 'pageToCreate'
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(seedControllerSeed, { method, ...options });
};

export const useSeedControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (
    seed:
      | 'dynamicFieldToRead'
      | 'dynamicFieldToDelete'
      | 'fieldDynamic'
      | 'user'
      | 'creatorEvent'
      | 'admin'
      | 'test'
      | 'userPasswordForgot'
      | 'userWantingToChangePassword'
      | 'userAlreadyRegistered'
      | 'profileToRead'
      | 'profileToUpdate'
      | 'adminPasswordForgot'
      | 'adminWantingToChangePassword'
      | 'adminToUpdate'
      | 'adminToRead'
      | 'adminToDelete'
      | 'adminToFind1'
      | 'adminToFind2'
      | 'exempleToUpdate'
      | 'exempleToRead'
      | 'exempleToDelete'
      | 'exempleToFind1'
      | 'exempleToFind2'
      | 'adminUserDisplayedCount'
      | 'newsToShowOnHome'
      | 'likeOnNews'
      | 'likeOnProfile'
      | 'ratingOnFormation'
      | 'ratingToRead'
      | 'ratingOnFormationModule'
      | 'newsToDelete'
      | 'newsToFind'
      | 'newsToRead'
      | 'newsToUpdate'
      | 'contentToUpdate'
      | 'contentToRead'
      | 'contentToDelete'
      | 'contentToFind1'
      | 'contentToFind2'
      | 'commentToDelete'
      | 'commentToFind1'
      | 'commentToFind2'
      | 'commentToRead'
      | 'commentToUpdate'
      | 'commentToUpdateByAdmin'
      | 'commentToDeleteByAdmin'
      | 'commentToReport'
      | 'homeToUpdate'
      | 'homeToDelete'
      | 'homeToList'
      | 'homeToRead'
      | 'highlightToUpdate'
      | 'highlightToDelete'
      | 'highlightToList'
      | 'highlightToRead'
      | 'analyticToDelete'
      | 'analyticToFind1'
      | 'analyticToFind2'
      | 'analyticToRead'
      | 'analyticToUpdate'
      | 'notificationToRead'
      | 'projectToGenerate'
      | 'userToUpdate'
      | 'itemToRead'
      | 'itemTextToUpdate'
      | 'pageToCreate'
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(seedControllerGet, { method, ...options });
};
