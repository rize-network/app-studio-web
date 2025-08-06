/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateApplicationParams } from '../models/CreateApplicationParams';
import type { createPageComponentParams } from '../models/createPageComponentParams';
import type { CreatePageParams } from '../models/CreatePageParams';
import type { DeployPageParams } from '../models/DeployPageParams';
import type { DomainPageParams } from '../models/DomainPageParams';
import type { EditComponentsParams } from '../models/EditComponentsParams';
import type { GenerateProjectParams } from '../models/GenerateProjectParams';
import type { RequestTask } from '../models/RequestTask';
import type { ResetTaskParams } from '../models/ResetTaskParams';
import type { UpdateTaskStatus } from '../models/UpdateTaskStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * As a user, i want to read an workflow
 * @param id
 * @returns any Workflow's data
 * @throws ApiError
 */
export const workflowControllerGet = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/workflow/${id}`,
    errors: {
      404: `Workflow doesn't exists`,
    },
  });
};

/**
 * As a user, i want to find by kill and projectId
 * @param skill Skill
 * @param projectId Project id
 * @returns any Workflows found
 * @throws ApiError
 */
export const workflowControllerList = (
  skill?:
    | 'project'
    | 'finance'
    | 'dev'
    | 'brand'
    | 'growth'
    | 'community'
    | 'design'
    | 'ads'
    | 'product',
  projectId?: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/project/${projectId}/skill/${skill}`,
    query: {
      skill: skill,
      projectId: projectId,
    },
  });
};

/**
 * As a user, i want to find by kill and projectId
 * @param skill Skill
 * @param projectId Project id
 * @returns any Workflows found
 * @throws ApiError
 */
export const workflowControllerListTasks = (
  skill?:
    | 'project'
    | 'finance'
    | 'dev'
    | 'brand'
    | 'growth'
    | 'community'
    | 'design'
    | 'ads'
    | 'product',
  projectId?: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/project/${projectId}/skill/${skill}/tasks`,
    query: {
      skill: skill,
      projectId: projectId,
    },
  });
};

/**
 * Request a new task
 * @param requestBody
 * @returns any Workflow created
 * @throws ApiError
 */
export const workflowControllerRequestTask = (
  requestBody: RequestTask
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/task/request`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * get a task
 * @param taskId taskId
 * @returns any
 * @throws ApiError
 */
export const workflowControllerGetTask = (
  taskId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/workflow/task`,
    query: {
      taskId: taskId,
    },
  });
};

/**
 * get a workflow tasks
 * @param workflowId workflowId
 * @returns any
 * @throws ApiError
 */
export const workflowControllerGetTasks = (
  workflowId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/workflow/tasks`,
    query: {
      workflowId: workflowId,
    },
  });
};

/**
 * Reset a task
 * @param requestBody
 * @returns any Task assigned
 * @throws ApiError
 */
export const workflowControllerResetTask = (
  requestBody: ResetTaskParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/task/reset`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Reset a task
 * @param requestBody
 * @returns any Task assigned
 * @throws ApiError
 */
export const workflowControllerResetTaskImage = (
  requestBody: ResetTaskParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/task/reset/image`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * Update task status
 * @param requestBody
 * @returns any Status updated
 * @throws ApiError
 */
export const workflowControllerUpdateTaskStatus = (
  requestBody: UpdateTaskStatus
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/workflow/task/status`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As a admin, i want to generate the project details
 * @param requestBody
 * @returns any Project Details generated successfully
 * @throws ApiError
 */
export const projectWorkflowControllerCreate = (
  requestBody: GenerateProjectParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/project/create`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * Create a component
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const pageWorkflowControllerCreateComponentTask = (
  requestBody: createPageComponentParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/workflow/component`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, I want to create a page
 * @param requestBody
 * @returns any page created
 * @throws ApiError
 */
export const pageWorkflowControllerCreate = (
  requestBody: CreatePageParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/workflow/create`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      403: `Incorrect credentials`,
    },
  });
};

/**
 * Deploy a Page Page
 * @param requestBody
 * @returns any Workflow created
 * @throws ApiError
 */
export const pageWorkflowControllerDeploy = (
  requestBody: DeployPageParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/workflow/deploy`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * Update Domains for a Project
 * @param requestBody
 * @returns any Workflow created
 * @throws ApiError
 */
export const pageWorkflowControllerDomains = (
  requestBody: DomainPageParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/workflow/domains`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * Edit components using the workflow system
 * @param requestBody
 * @returns any Workflow created
 * @throws ApiError
 */
export const pageWorkflowControllerEditComponents = (
  requestBody: EditComponentsParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/page/workflow/edit-components`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * Validate grant
 * @param grantId
 * @param stepId
 * @returns any Workflow created
 * @throws ApiError
 */
export const grantWorkflowControllerValidateUploadGrantFiles = (
  grantId: string,
  stepId: string,
  onProgress
): CancelablePromise<any> => {
  return upload({
    onProgress,
    method: 'POST',
    path: `/workflow/grant/${grantId}/validate/${stepId}`,
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * Validate application
 * @param stepId
 * @param requestBody
 * @returns any Workflow created
 * @throws ApiError
 */
export const applicationWorkflowControllerFillApplication = (
  stepId: string,
  requestBody: CreateApplicationParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/workflow/application/process/${stepId}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

export const useWorkflowControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerGet, { method, ...options });
};

export const useWorkflowControllerListService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    skill?:
      | 'project'
      | 'finance'
      | 'dev'
      | 'brand'
      | 'growth'
      | 'community'
      | 'design'
      | 'ads'
      | 'product',
    projectId?: string
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerList, { method, ...options });
};

export const useWorkflowControllerListTasksService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    skill?:
      | 'project'
      | 'finance'
      | 'dev'
      | 'brand'
      | 'growth'
      | 'community'
      | 'design'
      | 'ads'
      | 'product',
    projectId?: string
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerListTasks, { method, ...options });
};

export const useWorkflowControllerRequestTaskService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: RequestTask) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerRequestTask, { method, ...options });
};

export const useWorkflowControllerGetTaskService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (taskId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerGetTask, { method, ...options });
};

export const useWorkflowControllerGetTasksService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (workflowId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerGetTasks, { method, ...options });
};

export const useWorkflowControllerResetTaskService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ResetTaskParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerResetTask, { method, ...options });
};

export const useWorkflowControllerResetTaskImageService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ResetTaskParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerResetTaskImage, { method, ...options });
};

export const useWorkflowControllerUpdateTaskStatusService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: UpdateTaskStatus) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(workflowControllerUpdateTaskStatus, { method, ...options });
};

export const useProjectWorkflowControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: GenerateProjectParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(projectWorkflowControllerCreate, { method, ...options });
};

export const usePageWorkflowControllerCreateComponentTaskService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: createPageComponentParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageWorkflowControllerCreateComponentTask, {
    method,
    ...options,
  });
};

export const usePageWorkflowControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: CreatePageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageWorkflowControllerCreate, { method, ...options });
};

export const usePageWorkflowControllerDeployService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: DeployPageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageWorkflowControllerDeploy, { method, ...options });
};

export const usePageWorkflowControllerDomainsService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: DomainPageParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageWorkflowControllerDomains, { method, ...options });
};

export const usePageWorkflowControllerEditComponentsService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: EditComponentsParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(pageWorkflowControllerEditComponents, {
    method,
    ...options,
  });
};

export const useGrantWorkflowControllerValidateUploadGrantFilesService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (grantId: string, stepId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(grantWorkflowControllerValidateUploadGrantFiles, {
    method,
    ...options,
  });
};

export const useApplicationWorkflowControllerFillApplicationService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (stepId: string, requestBody: CreateApplicationParams) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(applicationWorkflowControllerFillApplication, {
    method,
    ...options,
  });
};
