/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Represents a node in the knowledge graph
 */
export interface KnowledgeGraphNode {
  /**
   * Unique identifier for the node
   */
  id: string;

  /**
   * Labels/types for the node (e.g., 'Person', 'Company', 'Document')
   */
  labels: string[];

  /**
   * Properties/attributes of the node
   */
  properties: Record<string, any>;

  /**
   * Timestamp when the node was created
   */
  createdAt?: string;

  /**
   * Timestamp when the node was last updated
   */
  updatedAt?: string;
}

/**
 * Parameters for creating a new node
 */
export interface CreateNodeParams {
  labels: string[];
  properties: Record<string, any>;
}

/**
 * Parameters for updating a node
 */
export interface UpdateNodeParams {
  properties: Record<string, any>;
}
