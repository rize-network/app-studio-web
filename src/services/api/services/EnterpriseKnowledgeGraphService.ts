/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {
  KnowledgeGraphNode,
  CreateNodeParams,
  UpdateNodeParams,
} from '../models/KnowledgeGraphNode';
import type {
  KnowledgeGraphRelationship,
  CreateRelationshipParams,
  UpdateRelationshipParams,
} from '../models/KnowledgeGraphRelationship';
import type {
  FindNodesParams,
  FindRelationshipsParams,
  FindPathParams,
  PathResult,
  TraverseParams,
  TraverseResult,
} from '../models/KnowledgeGraphQuery';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

/**
 * Custom Knowledge Graph implementation without Neo4j
 * This service provides enterprise-grade knowledge graph capabilities
 * running on your own server infrastructure
 */

// ==================== Node Operations ====================

/**
 * Create a new node in the knowledge graph
 * @param requestBody Node creation parameters
 * @returns KnowledgeGraphNode The created node
 * @throws ApiError
 */
export const createNode = (
  requestBody: CreateNodeParams
): CancelablePromise<KnowledgeGraphNode> => {
  return __request({
    method: 'POST',
    path: `/knowledge-graph/nodes`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      400: `Invalid node parameters`,
    },
  });
};

/**
 * Get a node by ID
 * @param nodeId The node ID
 * @returns KnowledgeGraphNode The requested node
 * @throws ApiError
 */
export const getNode = (nodeId: string): CancelablePromise<KnowledgeGraphNode> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/nodes/${nodeId}`,
    errors: {
      401: `Not authorized`,
      404: `Node not found`,
    },
  });
};

/**
 * Update a node's properties
 * @param nodeId The node ID
 * @param requestBody Updated properties
 * @returns KnowledgeGraphNode The updated node
 * @throws ApiError
 */
export const updateNode = (
  nodeId: string,
  requestBody: UpdateNodeParams
): CancelablePromise<KnowledgeGraphNode> => {
  return __request({
    method: 'PATCH',
    path: `/knowledge-graph/nodes/${nodeId}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      404: `Node not found`,
    },
  });
};

/**
 * Delete a node from the knowledge graph
 * @param nodeId The node ID
 * @returns any Deletion confirmation
 * @throws ApiError
 */
export const deleteNode = (nodeId: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/knowledge-graph/nodes/${nodeId}`,
    errors: {
      401: `Not authorized`,
      404: `Node not found`,
    },
  });
};

/**
 * Find nodes matching specific criteria
 * @param params Query parameters for finding nodes
 * @returns Array of matching nodes
 * @throws ApiError
 */
export const findNodes = (
  params?: FindNodesParams
): CancelablePromise<KnowledgeGraphNode[]> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/nodes`,
    query: {
      labels: params?.labels,
      properties: params?.properties ? JSON.stringify(params.properties) : undefined,
      limit: params?.limit,
      skip: params?.skip,
    },
    errors: {
      401: `Not authorized`,
    },
  });
};

// ==================== Relationship Operations ====================

/**
 * Create a new relationship between nodes
 * @param requestBody Relationship creation parameters
 * @returns KnowledgeGraphRelationship The created relationship
 * @throws ApiError
 */
export const createRelationship = (
  requestBody: CreateRelationshipParams
): CancelablePromise<KnowledgeGraphRelationship> => {
  return __request({
    method: 'POST',
    path: `/knowledge-graph/relationships`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      400: `Invalid relationship parameters`,
      404: `Source or target node not found`,
    },
  });
};

/**
 * Get a relationship by ID
 * @param relationshipId The relationship ID
 * @returns KnowledgeGraphRelationship The requested relationship
 * @throws ApiError
 */
export const getRelationship = (
  relationshipId: string
): CancelablePromise<KnowledgeGraphRelationship> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/relationships/${relationshipId}`,
    errors: {
      401: `Not authorized`,
      404: `Relationship not found`,
    },
  });
};

/**
 * Update a relationship's properties
 * @param relationshipId The relationship ID
 * @param requestBody Updated properties
 * @returns KnowledgeGraphRelationship The updated relationship
 * @throws ApiError
 */
export const updateRelationship = (
  relationshipId: string,
  requestBody: UpdateRelationshipParams
): CancelablePromise<KnowledgeGraphRelationship> => {
  return __request({
    method: 'PATCH',
    path: `/knowledge-graph/relationships/${relationshipId}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      404: `Relationship not found`,
    },
  });
};

/**
 * Delete a relationship from the knowledge graph
 * @param relationshipId The relationship ID
 * @returns any Deletion confirmation
 * @throws ApiError
 */
export const deleteRelationship = (relationshipId: string): CancelablePromise<any> => {
  return __request({
    method: 'DELETE',
    path: `/knowledge-graph/relationships/${relationshipId}`,
    errors: {
      401: `Not authorized`,
      404: `Relationship not found`,
    },
  });
};

/**
 * Find relationships matching specific criteria
 * @param params Query parameters for finding relationships
 * @returns Array of matching relationships
 * @throws ApiError
 */
export const findRelationships = (
  params?: FindRelationshipsParams
): CancelablePromise<KnowledgeGraphRelationship[]> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/relationships`,
    query: {
      type: params?.type,
      fromNodeId: params?.fromNodeId,
      toNodeId: params?.toNodeId,
      properties: params?.properties ? JSON.stringify(params.properties) : undefined,
      limit: params?.limit,
      skip: params?.skip,
    },
    errors: {
      401: `Not authorized`,
    },
  });
};

// ==================== Advanced Query Operations ====================

/**
 * Find the shortest path between two nodes
 * @param params Path finding parameters
 * @returns PathResult The found path or null if no path exists
 * @throws ApiError
 */
export const findPath = (
  params: FindPathParams
): CancelablePromise<PathResult | null> => {
  return __request({
    method: 'POST',
    path: `/knowledge-graph/query/path`,
    body: params,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      404: `Start or end node not found`,
    },
  });
};

/**
 * Traverse the graph from a starting node
 * @param params Traversal parameters
 * @returns TraverseResult Nodes and relationships discovered during traversal
 * @throws ApiError
 */
export const traverse = (
  params: TraverseParams
): CancelablePromise<TraverseResult> => {
  return __request({
    method: 'POST',
    path: `/knowledge-graph/query/traverse`,
    body: params,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      404: `Start node not found`,
    },
  });
};

/**
 * Get all neighbors (connected nodes) of a specific node
 * @param nodeId The node ID
 * @param direction Direction of relationships: 'outgoing', 'incoming', or 'both'
 * @returns Array of neighboring nodes
 * @throws ApiError
 */
export const getNeighbors = (
  nodeId: string,
  direction: 'outgoing' | 'incoming' | 'both' = 'both'
): CancelablePromise<KnowledgeGraphNode[]> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/nodes/${nodeId}/neighbors`,
    query: {
      direction,
    },
    errors: {
      401: `Not authorized`,
      404: `Node not found`,
    },
  });
};

/**
 * Get all relationships connected to a specific node
 * @param nodeId The node ID
 * @param direction Direction of relationships: 'outgoing', 'incoming', or 'both'
 * @returns Array of relationships
 * @throws ApiError
 */
export const getNodeRelationships = (
  nodeId: string,
  direction: 'outgoing' | 'incoming' | 'both' = 'both'
): CancelablePromise<KnowledgeGraphRelationship[]> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/nodes/${nodeId}/relationships`,
    query: {
      direction,
    },
    errors: {
      401: `Not authorized`,
      404: `Node not found`,
    },
  });
};

// ==================== Batch Operations ====================

/**
 * Create multiple nodes in a single operation
 * @param requestBody Array of node creation parameters
 * @returns Array of created nodes
 * @throws ApiError
 */
export const batchCreateNodes = (
  requestBody: CreateNodeParams[]
): CancelablePromise<KnowledgeGraphNode[]> => {
  return __request({
    method: 'POST',
    path: `/knowledge-graph/batch/nodes`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      400: `Invalid node parameters`,
    },
  });
};

/**
 * Create multiple relationships in a single operation
 * @param requestBody Array of relationship creation parameters
 * @returns Array of created relationships
 * @throws ApiError
 */
export const batchCreateRelationships = (
  requestBody: CreateRelationshipParams[]
): CancelablePromise<KnowledgeGraphRelationship[]> => {
  return __request({
    method: 'POST',
    path: `/knowledge-graph/batch/relationships`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Not authorized`,
      400: `Invalid relationship parameters`,
      404: `One or more nodes not found`,
    },
  });
};

// ==================== Graph Analytics ====================

/**
 * Get statistics about the knowledge graph
 * @returns Graph statistics
 * @throws ApiError
 */
export const getGraphStats = (): CancelablePromise<{
  nodeCount: number;
  relationshipCount: number;
  labelCounts: Record<string, number>;
  relationshipTypeCounts: Record<string, number>;
}> => {
  return __request({
    method: 'GET',
    path: `/knowledge-graph/stats`,
    errors: {
      401: `Not authorized`,
    },
  });
};

/**
 * Clear all data from the knowledge graph (use with caution!)
 * @returns Confirmation message
 * @throws ApiError
 */
export const clearGraph = (): CancelablePromise<{ message: string }> => {
  return __request({
    method: 'DELETE',
    path: `/knowledge-graph/clear`,
    errors: {
      401: `Not authorized`,
      403: `Forbidden - requires admin privileges`,
    },
  });
};
