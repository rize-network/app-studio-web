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

/**
 * In-memory Knowledge Graph Engine
 * Custom implementation to replace Neo4j with your own server logic
 */
export class KnowledgeGraphEngine {
  private nodes: Map<string, KnowledgeGraphNode>;
  private relationships: Map<string, KnowledgeGraphRelationship>;
  private nodesByLabel: Map<string, Set<string>>;
  private outgoingRelationships: Map<string, Set<string>>;
  private incomingRelationships: Map<string, Set<string>>;
  private idCounter: number;

  constructor() {
    this.nodes = new Map();
    this.relationships = new Map();
    this.nodesByLabel = new Map();
    this.outgoingRelationships = new Map();
    this.incomingRelationships = new Map();
    this.idCounter = 0;
  }

  // ==================== Node Operations ====================

  /**
   * Create a new node
   */
  createNode(params: CreateNodeParams): KnowledgeGraphNode {
    const id = this.generateId();
    const now = new Date().toISOString();

    const node: KnowledgeGraphNode = {
      id,
      labels: params.labels,
      properties: { ...params.properties },
      createdAt: now,
      updatedAt: now,
    };

    this.nodes.set(id, node);

    // Index by labels
    params.labels.forEach((label) => {
      if (!this.nodesByLabel.has(label)) {
        this.nodesByLabel.set(label, new Set());
      }
      this.nodesByLabel.get(label)!.add(id);
    });

    // Initialize relationship sets
    this.outgoingRelationships.set(id, new Set());
    this.incomingRelationships.set(id, new Set());

    return node;
  }

  /**
   * Get a node by ID
   */
  getNode(nodeId: string): KnowledgeGraphNode | undefined {
    return this.nodes.get(nodeId);
  }

  /**
   * Update a node's properties
   */
  updateNode(nodeId: string, params: UpdateNodeParams): KnowledgeGraphNode | null {
    const node = this.nodes.get(nodeId);
    if (!node) {
      return null;
    }

    node.properties = { ...node.properties, ...params.properties };
    node.updatedAt = new Date().toISOString();

    return node;
  }

  /**
   * Delete a node and all its relationships
   */
  deleteNode(nodeId: string): boolean {
    const node = this.nodes.get(nodeId);
    if (!node) {
      return false;
    }

    // Delete all connected relationships
    const outgoing = this.outgoingRelationships.get(nodeId) || new Set();
    const incoming = this.incomingRelationships.get(nodeId) || new Set();

    [...outgoing, ...incoming].forEach((relId) => {
      this.deleteRelationship(relId);
    });

    // Remove from label index
    node.labels.forEach((label) => {
      this.nodesByLabel.get(label)?.delete(nodeId);
    });

    // Remove the node
    this.nodes.delete(nodeId);
    this.outgoingRelationships.delete(nodeId);
    this.incomingRelationships.delete(nodeId);

    return true;
  }

  /**
   * Find nodes matching criteria
   */
  findNodes(params?: FindNodesParams): KnowledgeGraphNode[] {
    let results: KnowledgeGraphNode[] = [];

    // If labels are specified, use the index
    if (params?.labels && params.labels.length > 0) {
      const nodeIds = new Set<string>();
      params.labels.forEach((label) => {
        const idsForLabel = this.nodesByLabel.get(label);
        if (idsForLabel) {
          idsForLabel.forEach((id) => nodeIds.add(id));
        }
      });
      results = Array.from(nodeIds)
        .map((id) => this.nodes.get(id))
        .filter((node): node is KnowledgeGraphNode => node !== undefined);
    } else {
      results = Array.from(this.nodes.values());
    }

    // Filter by properties
    if (params?.properties) {
      results = results.filter((node) =>
        this.matchesProperties(node.properties, params.properties!)
      );
    }

    // Apply pagination
    const skip = params?.skip || 0;
    const limit = params?.limit || results.length;

    return results.slice(skip, skip + limit);
  }

  // ==================== Relationship Operations ====================

  /**
   * Create a new relationship
   */
  createRelationship(
    params: CreateRelationshipParams
  ): KnowledgeGraphRelationship | null {
    // Validate nodes exist
    if (!this.nodes.has(params.fromNodeId) || !this.nodes.has(params.toNodeId)) {
      return null;
    }

    const id = this.generateId();
    const now = new Date().toISOString();

    const relationship: KnowledgeGraphRelationship = {
      id,
      type: params.type,
      fromNodeId: params.fromNodeId,
      toNodeId: params.toNodeId,
      properties: params.properties || {},
      createdAt: now,
      updatedAt: now,
    };

    this.relationships.set(id, relationship);

    // Update relationship indexes
    this.outgoingRelationships.get(params.fromNodeId)!.add(id);
    this.incomingRelationships.get(params.toNodeId)!.add(id);

    return relationship;
  }

  /**
   * Get a relationship by ID
   */
  getRelationship(relationshipId: string): KnowledgeGraphRelationship | undefined {
    return this.relationships.get(relationshipId);
  }

  /**
   * Update a relationship's properties
   */
  updateRelationship(
    relationshipId: string,
    params: UpdateRelationshipParams
  ): KnowledgeGraphRelationship | null {
    const relationship = this.relationships.get(relationshipId);
    if (!relationship) {
      return null;
    }

    relationship.properties = { ...relationship.properties, ...params.properties };
    relationship.updatedAt = new Date().toISOString();

    return relationship;
  }

  /**
   * Delete a relationship
   */
  deleteRelationship(relationshipId: string): boolean {
    const relationship = this.relationships.get(relationshipId);
    if (!relationship) {
      return false;
    }

    // Remove from indexes
    this.outgoingRelationships.get(relationship.fromNodeId)?.delete(relationshipId);
    this.incomingRelationships.get(relationship.toNodeId)?.delete(relationshipId);

    // Remove the relationship
    this.relationships.delete(relationshipId);

    return true;
  }

  /**
   * Find relationships matching criteria
   */
  findRelationships(params?: FindRelationshipsParams): KnowledgeGraphRelationship[] {
    let results: KnowledgeGraphRelationship[] = [];

    // Use indexes when possible
    if (params?.fromNodeId) {
      const relIds = this.outgoingRelationships.get(params.fromNodeId) || new Set();
      results = Array.from(relIds)
        .map((id) => this.relationships.get(id))
        .filter((rel): rel is KnowledgeGraphRelationship => rel !== undefined);
    } else if (params?.toNodeId) {
      const relIds = this.incomingRelationships.get(params.toNodeId) || new Set();
      results = Array.from(relIds)
        .map((id) => this.relationships.get(id))
        .filter((rel): rel is KnowledgeGraphRelationship => rel !== undefined);
    } else {
      results = Array.from(this.relationships.values());
    }

    // Filter by type
    if (params?.type) {
      results = results.filter((rel) => rel.type === params.type);
    }

    // Filter by properties
    if (params?.properties) {
      results = results.filter((rel) =>
        this.matchesProperties(rel.properties, params.properties!)
      );
    }

    // Apply pagination
    const skip = params?.skip || 0;
    const limit = params?.limit || results.length;

    return results.slice(skip, skip + limit);
  }

  // ==================== Advanced Queries ====================

  /**
   * Find shortest path between two nodes using BFS
   */
  findPath(params: FindPathParams): PathResult | null {
    const { fromNodeId, toNodeId, maxDepth = 10, relationshipTypes } = params;

    if (!this.nodes.has(fromNodeId) || !this.nodes.has(toNodeId)) {
      return null;
    }

    if (fromNodeId === toNodeId) {
      return { nodes: [fromNodeId], relationships: [], length: 0 };
    }

    const queue: Array<{ nodeId: string; path: string[]; rels: string[] }> = [
      { nodeId: fromNodeId, path: [fromNodeId], rels: [] },
    ];
    const visited = new Set<string>([fromNodeId]);

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current.path.length - 1 >= maxDepth) {
        continue;
      }

      const outgoingRels = this.outgoingRelationships.get(current.nodeId) || new Set();

      for (const relId of outgoingRels) {
        const rel = this.relationships.get(relId)!;

        // Filter by relationship types if specified
        if (relationshipTypes && !relationshipTypes.includes(rel.type)) {
          continue;
        }

        const nextNodeId = rel.toNodeId;

        if (nextNodeId === toNodeId) {
          return {
            nodes: [...current.path, nextNodeId],
            relationships: [...current.rels, relId],
            length: current.rels.length + 1,
          };
        }

        if (!visited.has(nextNodeId)) {
          visited.add(nextNodeId);
          queue.push({
            nodeId: nextNodeId,
            path: [...current.path, nextNodeId],
            rels: [...current.rels, relId],
          });
        }
      }
    }

    return null; // No path found
  }

  /**
   * Traverse the graph from a starting node
   */
  traverse(params: TraverseParams): TraverseResult {
    const {
      startNodeId,
      maxDepth = 3,
      relationshipTypes,
      direction = 'both',
    } = params;

    const discoveredNodes = new Set<string>([startNodeId]);
    const discoveredRels = new Set<string>();
    const queue: Array<{ nodeId: string; depth: number }> = [
      { nodeId: startNodeId, depth: 0 },
    ];

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current.depth >= maxDepth) {
        continue;
      }

      const relsToProcess: Set<string> = new Set();

      if (direction === 'outgoing' || direction === 'both') {
        const outgoing = this.outgoingRelationships.get(current.nodeId) || new Set();
        outgoing.forEach((id) => relsToProcess.add(id));
      }

      if (direction === 'incoming' || direction === 'both') {
        const incoming = this.incomingRelationships.get(current.nodeId) || new Set();
        incoming.forEach((id) => relsToProcess.add(id));
      }

      for (const relId of relsToProcess) {
        const rel = this.relationships.get(relId)!;

        // Filter by relationship types if specified
        if (relationshipTypes && !relationshipTypes.includes(rel.type)) {
          continue;
        }

        discoveredRels.add(relId);

        const nextNodeId =
          rel.fromNodeId === current.nodeId ? rel.toNodeId : rel.fromNodeId;

        if (!discoveredNodes.has(nextNodeId)) {
          discoveredNodes.add(nextNodeId);
          queue.push({ nodeId: nextNodeId, depth: current.depth + 1 });
        }
      }
    }

    return {
      nodes: Array.from(discoveredNodes),
      relationships: Array.from(discoveredRels),
    };
  }

  /**
   * Get neighbors of a node
   */
  getNeighbors(
    nodeId: string,
    direction: 'outgoing' | 'incoming' | 'both' = 'both'
  ): KnowledgeGraphNode[] {
    const neighborIds = new Set<string>();

    if (direction === 'outgoing' || direction === 'both') {
      const outgoing = this.outgoingRelationships.get(nodeId) || new Set();
      outgoing.forEach((relId) => {
        const rel = this.relationships.get(relId)!;
        neighborIds.add(rel.toNodeId);
      });
    }

    if (direction === 'incoming' || direction === 'both') {
      const incoming = this.incomingRelationships.get(nodeId) || new Set();
      incoming.forEach((relId) => {
        const rel = this.relationships.get(relId)!;
        neighborIds.add(rel.fromNodeId);
      });
    }

    return Array.from(neighborIds)
      .map((id) => this.nodes.get(id))
      .filter((node): node is KnowledgeGraphNode => node !== undefined);
  }

  /**
   * Get relationships of a node
   */
  getNodeRelationships(
    nodeId: string,
    direction: 'outgoing' | 'incoming' | 'both' = 'both'
  ): KnowledgeGraphRelationship[] {
    const relIds = new Set<string>();

    if (direction === 'outgoing' || direction === 'both') {
      const outgoing = this.outgoingRelationships.get(nodeId) || new Set();
      outgoing.forEach((id) => relIds.add(id));
    }

    if (direction === 'incoming' || direction === 'both') {
      const incoming = this.incomingRelationships.get(nodeId) || new Set();
      incoming.forEach((id) => relIds.add(id));
    }

    return Array.from(relIds)
      .map((id) => this.relationships.get(id))
      .filter((rel): rel is KnowledgeGraphRelationship => rel !== undefined);
  }

  // ==================== Batch Operations ====================

  /**
   * Create multiple nodes at once
   */
  batchCreateNodes(params: CreateNodeParams[]): KnowledgeGraphNode[] {
    return params.map((param) => this.createNode(param));
  }

  /**
   * Create multiple relationships at once
   */
  batchCreateRelationships(
    params: CreateRelationshipParams[]
  ): Array<KnowledgeGraphRelationship | null> {
    return params.map((param) => this.createRelationship(param));
  }

  // ==================== Analytics ====================

  /**
   * Get graph statistics
   */
  getStats(): {
    nodeCount: number;
    relationshipCount: number;
    labelCounts: Record<string, number>;
    relationshipTypeCounts: Record<string, number>;
  } {
    const labelCounts: Record<string, number> = {};
    const relationshipTypeCounts: Record<string, number> = {};

    // Count labels
    this.nodesByLabel.forEach((nodeIds, label) => {
      labelCounts[label] = nodeIds.size;
    });

    // Count relationship types
    this.relationships.forEach((rel) => {
      relationshipTypeCounts[rel.type] = (relationshipTypeCounts[rel.type] || 0) + 1;
    });

    return {
      nodeCount: this.nodes.size,
      relationshipCount: this.relationships.size,
      labelCounts,
      relationshipTypeCounts,
    };
  }

  /**
   * Clear all data from the graph
   */
  clear(): void {
    this.nodes.clear();
    this.relationships.clear();
    this.nodesByLabel.clear();
    this.outgoingRelationships.clear();
    this.incomingRelationships.clear();
    this.idCounter = 0;
  }

  // ==================== Helper Methods ====================

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `node_${Date.now()}_${this.idCounter++}`;
  }

  /**
   * Check if properties match the filter
   */
  private matchesProperties(
    nodeProps: Record<string, any>,
    filterProps: Record<string, any>
  ): boolean {
    return Object.entries(filterProps).every(([key, value]) => {
      return nodeProps[key] === value;
    });
  }

  /**
   * Export graph data for persistence
   */
  exportData(): {
    nodes: KnowledgeGraphNode[];
    relationships: KnowledgeGraphRelationship[];
  } {
    return {
      nodes: Array.from(this.nodes.values()),
      relationships: Array.from(this.relationships.values()),
    };
  }

  /**
   * Import graph data from persistence
   */
  importData(data: {
    nodes: KnowledgeGraphNode[];
    relationships: KnowledgeGraphRelationship[];
  }): void {
    this.clear();

    // Import nodes
    data.nodes.forEach((node) => {
      this.nodes.set(node.id, node);

      // Rebuild indexes
      node.labels.forEach((label) => {
        if (!this.nodesByLabel.has(label)) {
          this.nodesByLabel.set(label, new Set());
        }
        this.nodesByLabel.get(label)!.add(node.id);
      });

      this.outgoingRelationships.set(node.id, new Set());
      this.incomingRelationships.set(node.id, new Set());
    });

    // Import relationships
    data.relationships.forEach((rel) => {
      this.relationships.set(rel.id, rel);
      this.outgoingRelationships.get(rel.fromNodeId)?.add(rel.id);
      this.incomingRelationships.get(rel.toNodeId)?.add(rel.id);
    });
  }
}

// Create a singleton instance for use across the application
export const knowledgeGraph = new KnowledgeGraphEngine();
