/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Represents a relationship/edge in the knowledge graph
 */
export interface KnowledgeGraphRelationship {
  /**
   * Unique identifier for the relationship
   */
  id: string;

  /**
   * Type/label of the relationship (e.g., 'WORKS_FOR', 'MANAGES', 'KNOWS')
   */
  type: string;

  /**
   * ID of the source node
   */
  fromNodeId: string;

  /**
   * ID of the target node
   */
  toNodeId: string;

  /**
   * Properties/attributes of the relationship
   */
  properties: Record<string, any>;

  /**
   * Timestamp when the relationship was created
   */
  createdAt?: string;

  /**
   * Timestamp when the relationship was last updated
   */
  updatedAt?: string;
}

/**
 * Parameters for creating a new relationship
 */
export interface CreateRelationshipParams {
  type: string;
  fromNodeId: string;
  toNodeId: string;
  properties?: Record<string, any>;
}

/**
 * Parameters for updating a relationship
 */
export interface UpdateRelationshipParams {
  properties: Record<string, any>;
}
