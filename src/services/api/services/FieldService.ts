/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FieldCreateOptionsParams } from '../models/FieldCreateOptionsParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Field Field values
 * @param key enum
 * @returns any
 * @throws ApiError
 */
export const fieldControllerStatic = (
  key?:
    | 'FeedbackCategory'
    | 'FeedbackStatus'
    | 'TransactionStatus'
    | 'WorkflowStatus'
    | 'ActionStepStatus'
    | 'AnalyticEvent'
    | 'UserRole'
    | 'PageType'
    | 'Skill'
    | 'CompetitionType'
    | 'AdminRole'
    | 'AuthMode'
    | 'AuthUserType'
    | 'Gender'
    | 'MediaType'
    | 'CronStatus'
    | 'Locale'
    | 'OwnerType'
    | 'ObjectType'
    | 'PublicationStatus'
    | 'Duration'
    | 'NewsCategory'
    | 'Right'
    | 'RightType'
    | 'GrantStatus'
    | 'SourceStatus'
    | 'SubscriptionStatus'
    | 'BrandType'
    | 'WorkerType'
    | 'AdkSessionState'
    | 'TransactionIsolationLevel'
    | 'SortOrder'
    | 'QueryMode'
    | 'NullsOrder'
    | 'UserOrderByRelevanceFieldEnum'
    | 'ProjectOrderByRelevanceFieldEnum'
    | 'WorkflowOrderByRelevanceFieldEnum'
    | 'WorkflowItemOrderByRelevanceFieldEnum'
    | 'ActionOrderByRelevanceFieldEnum'
    | 'PhaseOrderByRelevanceFieldEnum'
    | 'StepOrderByRelevanceFieldEnum'
    | 'MediaOrderByRelevanceFieldEnum'
    | 'PageOrderByRelevanceFieldEnum'
    | 'RevisionOrderByRelevanceFieldEnum'
    | 'ComponentOrderByRelevanceFieldEnum'
    | 'ComponentRevisionOrderByRelevanceFieldEnum'
    | 'PromptOrderByRelevanceFieldEnum'
    | 'ExempleOrderByRelevanceFieldEnum'
    | 'PaymentOrderByRelevanceFieldEnum'
    | 'SubscriptionOrderByRelevanceFieldEnum'
    | 'UserApiLimitOrderByRelevanceFieldEnum'
    | 'ItemOrderByRelevanceFieldEnum'
    | 'ItemTextOrderByRelevanceFieldEnum'
    | 'ItemJsonOrderByRelevanceFieldEnum'
    | 'ItemFieldOrderByRelevanceFieldEnum'
    | 'ItemBooleanOrderByRelevanceFieldEnum'
    | 'ProjectSupplementaryInfoOrderByRelevanceFieldEnum'
    | 'NewsletterOrderByRelevanceFieldEnum'
    | 'NewsletterSectionOrderByRelevanceFieldEnum'
    | 'SourceOrderByRelevanceFieldEnum'
    | 'TransactionValidationOrderByRelevanceFieldEnum'
    | 'NotificationOrderByRelevanceFieldEnum'
    | 'AdminOrderByRelevanceFieldEnum'
    | 'AccountOrderByRelevanceFieldEnum'
    | 'CreditHistoryOrderByRelevanceFieldEnum'
    | 'TransactionOrderByRelevanceFieldEnum'
    | 'DeviceOrderByRelevanceFieldEnum'
    | 'ProfileOrderByRelevanceFieldEnum'
    | 'ImageOrderByRelevanceFieldEnum'
    | 'AdminImageOrderByRelevanceFieldEnum'
    | 'ExempleFileOrderByRelevanceFieldEnum'
    | 'FileOrderByRelevanceFieldEnum'
    | 'HomeOrderByRelevanceFieldEnum'
    | 'HighlightOrderByRelevanceFieldEnum'
    | 'AdminFileOrderByRelevanceFieldEnum'
    | 'AuthOrderByRelevanceFieldEnum'
    | 'TokenOrderByRelevanceFieldEnum'
    | 'CommentOrderByRelevanceFieldEnum'
    | 'ReportCommentOrderByRelevanceFieldEnum'
    | 'ReportOrderByRelevanceFieldEnum'
    | 'AnalyticOrderByRelevanceFieldEnum'
    | 'AnalyticViewOrderByRelevanceFieldEnum'
    | 'FieldOrderByRelevanceFieldEnum'
    | 'RatingOrderByRelevanceFieldEnum'
    | 'LikeOrderByRelevanceFieldEnum'
    | 'NewsOrderByRelevanceFieldEnum'
    | 'ContentOrderByRelevanceFieldEnum'
    | 'TaskOrderByRelevanceFieldEnum'
    | 'FeedbackOrderByRelevanceFieldEnum'
    | 'AdkSessionOrderByRelevanceFieldEnum'
    | 'AdkMemoryOrderByRelevanceFieldEnum'
    | 'ModelName'
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/field/static`,
    query: {
      key: key,
    },
  });
};

/**
 * As a user, i want to read a field
 * @param key Option's key
 * @returns any Field's data
 * @throws ApiError
 */
export const fieldControllerDynamic = (
  key?: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/field/dynamic`,
    query: {
      key: key,
    },
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to create a dynamic field value
 * @param requestBody
 * @returns any Field created
 * @throws ApiError
 */
export const fieldControllerCreateDynamic = (
  requestBody: FieldCreateOptionsParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/field/dynamic`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a user, i want to delete a dynamic field value
 * @param id
 * @returns any Field deleted
 * @throws ApiError
 */
export const fieldControllerDelete = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/field/${id}`,
    errors: {
      404: `Field doesn't exists`,
    },
  });
};

export const useFieldControllerStaticService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (
    key?:
      | 'FeedbackCategory'
      | 'FeedbackStatus'
      | 'TransactionStatus'
      | 'WorkflowStatus'
      | 'ActionStepStatus'
      | 'AnalyticEvent'
      | 'UserRole'
      | 'PageType'
      | 'Skill'
      | 'CompetitionType'
      | 'AdminRole'
      | 'AuthMode'
      | 'AuthUserType'
      | 'Gender'
      | 'MediaType'
      | 'CronStatus'
      | 'Locale'
      | 'OwnerType'
      | 'ObjectType'
      | 'PublicationStatus'
      | 'Duration'
      | 'NewsCategory'
      | 'Right'
      | 'RightType'
      | 'GrantStatus'
      | 'SourceStatus'
      | 'SubscriptionStatus'
      | 'BrandType'
      | 'WorkerType'
      | 'AdkSessionState'
      | 'TransactionIsolationLevel'
      | 'SortOrder'
      | 'QueryMode'
      | 'NullsOrder'
      | 'UserOrderByRelevanceFieldEnum'
      | 'ProjectOrderByRelevanceFieldEnum'
      | 'WorkflowOrderByRelevanceFieldEnum'
      | 'WorkflowItemOrderByRelevanceFieldEnum'
      | 'ActionOrderByRelevanceFieldEnum'
      | 'PhaseOrderByRelevanceFieldEnum'
      | 'StepOrderByRelevanceFieldEnum'
      | 'MediaOrderByRelevanceFieldEnum'
      | 'PageOrderByRelevanceFieldEnum'
      | 'RevisionOrderByRelevanceFieldEnum'
      | 'ComponentOrderByRelevanceFieldEnum'
      | 'ComponentRevisionOrderByRelevanceFieldEnum'
      | 'PromptOrderByRelevanceFieldEnum'
      | 'ExempleOrderByRelevanceFieldEnum'
      | 'PaymentOrderByRelevanceFieldEnum'
      | 'SubscriptionOrderByRelevanceFieldEnum'
      | 'UserApiLimitOrderByRelevanceFieldEnum'
      | 'ItemOrderByRelevanceFieldEnum'
      | 'ItemTextOrderByRelevanceFieldEnum'
      | 'ItemJsonOrderByRelevanceFieldEnum'
      | 'ItemFieldOrderByRelevanceFieldEnum'
      | 'ItemBooleanOrderByRelevanceFieldEnum'
      | 'ProjectSupplementaryInfoOrderByRelevanceFieldEnum'
      | 'NewsletterOrderByRelevanceFieldEnum'
      | 'NewsletterSectionOrderByRelevanceFieldEnum'
      | 'SourceOrderByRelevanceFieldEnum'
      | 'TransactionValidationOrderByRelevanceFieldEnum'
      | 'NotificationOrderByRelevanceFieldEnum'
      | 'AdminOrderByRelevanceFieldEnum'
      | 'AccountOrderByRelevanceFieldEnum'
      | 'CreditHistoryOrderByRelevanceFieldEnum'
      | 'TransactionOrderByRelevanceFieldEnum'
      | 'DeviceOrderByRelevanceFieldEnum'
      | 'ProfileOrderByRelevanceFieldEnum'
      | 'ImageOrderByRelevanceFieldEnum'
      | 'AdminImageOrderByRelevanceFieldEnum'
      | 'ExempleFileOrderByRelevanceFieldEnum'
      | 'FileOrderByRelevanceFieldEnum'
      | 'HomeOrderByRelevanceFieldEnum'
      | 'HighlightOrderByRelevanceFieldEnum'
      | 'AdminFileOrderByRelevanceFieldEnum'
      | 'AuthOrderByRelevanceFieldEnum'
      | 'TokenOrderByRelevanceFieldEnum'
      | 'CommentOrderByRelevanceFieldEnum'
      | 'ReportCommentOrderByRelevanceFieldEnum'
      | 'ReportOrderByRelevanceFieldEnum'
      | 'AnalyticOrderByRelevanceFieldEnum'
      | 'AnalyticViewOrderByRelevanceFieldEnum'
      | 'FieldOrderByRelevanceFieldEnum'
      | 'RatingOrderByRelevanceFieldEnum'
      | 'LikeOrderByRelevanceFieldEnum'
      | 'NewsOrderByRelevanceFieldEnum'
      | 'ContentOrderByRelevanceFieldEnum'
      | 'TaskOrderByRelevanceFieldEnum'
      | 'FeedbackOrderByRelevanceFieldEnum'
      | 'AdkSessionOrderByRelevanceFieldEnum'
      | 'AdkMemoryOrderByRelevanceFieldEnum'
      | 'ModelName'
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(fieldControllerStatic, { method, ...options });
};

export const useFieldControllerDynamicService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (key?: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(fieldControllerDynamic, { method, ...options });
};

export const useFieldControllerCreateDynamicService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: FieldCreateOptionsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(fieldControllerCreateDynamic, { method, ...options });
};

export const useFieldControllerDeleteService = ({
  method = 'DELETE',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(fieldControllerDelete, { method, ...options });
};
