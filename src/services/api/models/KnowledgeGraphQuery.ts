/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Query parameters for finding nodes
 */
export interface FindNodesParams {
  /**
   * Filter by node labels
   */
  labels?: string[];

  /**
   * Filter by property values
   */
  properties?: Record<string, any>;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * Number of results to skip (for pagination)
   */
  skip?: number;
}

/**
 * Query parameters for finding relationships
 */
export interface FindRelationshipsParams {
  /**
   * Filter by relationship type
   */
  type?: string;

  /**
   * Filter by source node ID
   */
  fromNodeId?: string;

  /**
   * Filter by target node ID
   */
  toNodeId?: string;

  /**
   * Filter by property values
   */
  properties?: Record<string, any>;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * Number of results to skip (for pagination)
   */
  skip?: number;
}

/**
 * Parameters for finding a path between two nodes
 */
export interface FindPathParams {
  /**
   * Starting node ID
   */
  fromNodeId: string;

  /**
   * Ending node ID
   */
  toNodeId: string;

  /**
   * Maximum depth to search
   */
  maxDepth?: number;

  /**
   * Filter by relationship types (optional)
   */
  relationshipTypes?: string[];
}

/**
 * Result of a path query
 */
export interface PathResult {
  /**
   * Sequence of node IDs in the path
   */
  nodes: string[];

  /**
   * Sequence of relationship IDs connecting the nodes
   */
  relationships: string[];

  /**
   * Length of the path (number of relationships)
   */
  length: number;
}

/**
 * Parameters for graph traversal
 */
export interface TraverseParams {
  /**
   * Starting node ID
   */
  startNodeId: string;

  /**
   * Maximum depth to traverse
   */
  maxDepth?: number;

  /**
   * Filter by relationship types
   */
  relationshipTypes?: string[];

  /**
   * Direction of traversal: 'outgoing', 'incoming', or 'both'
   */
  direction?: 'outgoing' | 'incoming' | 'both';
}

/**
 * Result of a graph traversal
 */
export interface TraverseResult {
  /**
   * Nodes discovered during traversal
   */
  nodes: string[];

  /**
   * Relationships discovered during traversal
   */
  relationships: string[];
}
