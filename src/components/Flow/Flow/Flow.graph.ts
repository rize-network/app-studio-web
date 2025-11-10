import { FlowNode, NodeConnection } from './Flow.type';

export interface FlowGraphOptions {
  /**
   * Whether the graph should treat edges as directed.
   */
  directed?: boolean;
  /**
   * Allow multiple edges between the same pair of nodes.
   */
  multigraph?: boolean;
  /**
   * Allow edges that start and end on the same node.
   */
  allowSelfLoops?: boolean;
}

type EdgeIndex = Map<string, Set<string>>;

const cloneNode = (node: FlowNode): FlowNode => ({
  ...node,
  position: { ...node.position },
  data: node.data ? { ...node.data } : undefined,
  style: node.style ? { ...node.style } : undefined,
});

const cloneEdge = (edge: NodeConnection): NodeConnection => ({
  ...edge,
  style: edge.style ? { ...edge.style } : undefined,
});

export class FlowGraph {
  private directed: boolean;

  private multigraph: boolean;

  private allowSelfLoops: boolean;

  private nodes: Map<string, FlowNode>;

  private edges: Map<string, NodeConnection>;

  private outgoing: EdgeIndex;

  private incoming: EdgeIndex;

  constructor(options: FlowGraphOptions = {}) {
    const {
      directed = true,
      multigraph = false,
      allowSelfLoops = false,
    } = options;
    this.directed = directed;
    this.multigraph = multigraph;
    this.allowSelfLoops = allowSelfLoops;
    this.nodes = new Map();
    this.edges = new Map();
    this.outgoing = new Map();
    this.incoming = new Map();
  }

  static from(
    nodes: FlowNode[] = [],
    edges: NodeConnection[] = [],
    options: FlowGraphOptions = {}
  ): FlowGraph {
    const graph = new FlowGraph(options);
    graph.replace(nodes, edges);
    return graph;
  }

  clone(): FlowGraph {
    return FlowGraph.from(this.getNodes(), this.getEdges(), {
      directed: this.directed,
      multigraph: this.multigraph,
      allowSelfLoops: this.allowSelfLoops,
    });
  }

  isDirected(): boolean {
    return this.directed;
  }

  isMultigraph(): boolean {
    return this.multigraph;
  }

  allowsSelfLoops(): boolean {
    return this.allowSelfLoops;
  }

  setDirected(directed: boolean): void {
    if (this.directed === directed) {
      return;
    }
    this.directed = directed;
    this.rebuildEdgeIndices();
  }

  setMultigraph(multigraph: boolean): void {
    if (this.multigraph === multigraph) {
      return;
    }
    this.multigraph = multigraph;
  }

  setAllowSelfLoops(allowSelfLoops: boolean): void {
    this.allowSelfLoops = allowSelfLoops;
  }

  clear(): void {
    this.nodes.clear();
    this.edges.clear();
    this.outgoing.clear();
    this.incoming.clear();
  }

  replace(nodes: FlowNode[], edges: NodeConnection[]): void {
    this.clear();
    nodes.forEach((node) => this.setNode(node));
    edges.forEach((edge) => this.setEdge(edge));
  }

  setNode(node: FlowNode): void {
    if (!node?.id) {
      throw new Error('FlowGraph: node.id is required');
    }
    const clonedNode = cloneNode(node);
    this.nodes.set(clonedNode.id, clonedNode);
    this.ensureNodeIndex(clonedNode.id);
  }

  hasNode(nodeId: string): boolean {
    return this.nodes.has(nodeId);
  }

  getNode(nodeId: string): FlowNode | undefined {
    const node = this.nodes.get(nodeId);
    return node ? cloneNode(node) : undefined;
  }

  removeNode(nodeId: string): boolean {
    if (!this.nodes.has(nodeId)) {
      return false;
    }

    const incidentEdges = this.getIncidentEdges(nodeId);
    incidentEdges.forEach((edge) => this.removeEdge(edge.id));

    this.nodes.delete(nodeId);
    this.outgoing.delete(nodeId);
    this.incoming.delete(nodeId);
    return true;
  }

  updateNode(nodeId: string, updates: Partial<FlowNode>): FlowNode | undefined {
    const node = this.nodes.get(nodeId);
    if (!node) {
      return undefined;
    }

    const merged: FlowNode = cloneNode({
      ...node,
      ...updates,
      position: updates.position
        ? { ...updates.position }
        : { ...node.position },
      data: updates.data
        ? {
            ...(node.data || {}),
            ...updates.data,
          }
        : node.data
        ? { ...node.data }
        : undefined,
      style: updates.style
        ? {
            ...(node.style || {}),
            ...updates.style,
          }
        : node.style
        ? { ...node.style }
        : undefined,
    });

    this.nodes.set(nodeId, merged);
    return cloneNode(merged);
  }

  setEdge(edge: NodeConnection): void {
    if (!edge?.id) {
      throw new Error('FlowGraph: edge.id is required');
    }
    if (!this.nodes.has(edge.source)) {
      throw new Error(`FlowGraph: source node "${edge.source}" is not defined`);
    }
    if (!this.nodes.has(edge.target)) {
      throw new Error(`FlowGraph: target node "${edge.target}" is not defined`);
    }
    if (!this.allowSelfLoops && edge.source === edge.target) {
      throw new Error('FlowGraph: self-loops are not allowed');
    }

    const existingEdge = this.edges.get(edge.id);
    if (existingEdge) {
      this.deindexEdge(existingEdge);
    } else if (!this.multigraph) {
      const conflictingEdge = this.edgesBetween(edge.source, edge.target).find(
        (candidate) => candidate.id !== edge.id
      );
      if (conflictingEdge) {
        throw new Error(
          `FlowGraph: edge between "${edge.source}" and "${edge.target}" already exists`
        );
      }
    }

    const clonedEdge = cloneEdge(edge);
    this.edges.set(clonedEdge.id, clonedEdge);
    this.indexEdge(clonedEdge);
  }

  hasEdge(edgeId: string): boolean {
    return this.edges.has(edgeId);
  }

  getEdge(edgeId: string): NodeConnection | undefined {
    const edge = this.edges.get(edgeId);
    return edge ? cloneEdge(edge) : undefined;
  }

  removeEdge(edgeId: string): boolean {
    const edge = this.edges.get(edgeId);
    if (!edge) {
      return false;
    }

    this.edges.delete(edgeId);
    this.deindexEdge(edge);
    return true;
  }

  edgesBetween(source: string, target: string): NodeConnection[] {
    const result: NodeConnection[] = [];
    const seen = new Set<string>();
    const evaluateEdge = (edgeId: string) => {
      if (seen.has(edgeId)) {
        return;
      }
      const edge = this.edges.get(edgeId);
      if (!edge) {
        return;
      }
      if (
        (edge.source === source && edge.target === target) ||
        (!this.directed && edge.source === target && edge.target === source)
      ) {
        result.push(cloneEdge(edge));
        seen.add(edgeId);
      }
    };

    (this.outgoing.get(source) || []).forEach(evaluateEdge);
    if (!this.directed) {
      (this.outgoing.get(target) || []).forEach(evaluateEdge);
    }

    return result;
  }

  hasEdgeBetween(source: string, target: string): boolean {
    return this.edgesBetween(source, target).length > 0;
  }

  getIncidentEdges(nodeId: string): NodeConnection[] {
    const edgeIds = new Set<string>();
    (this.outgoing.get(nodeId) || []).forEach((edgeId) => edgeIds.add(edgeId));
    (this.incoming.get(nodeId) || []).forEach((edgeId) => edgeIds.add(edgeId));
    return Array.from(edgeIds)
      .map((edgeId) => this.edges.get(edgeId))
      .filter((edge): edge is NodeConnection => Boolean(edge))
      .map((edge) => cloneEdge(edge));
  }

  getNodes(): FlowNode[] {
    return Array.from(this.nodes.values()).map((node) => cloneNode(node));
  }

  getEdges(): NodeConnection[] {
    return Array.from(this.edges.values()).map((edge) => cloneEdge(edge));
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  edgeCount(): number {
    return this.edges.size;
  }

  successors(nodeId: string): string[] {
    const outgoingEdges = this.outgoing.get(nodeId);
    if (!outgoingEdges) {
      return [];
    }

    const successors = new Set<string>();
    outgoingEdges.forEach((edgeId) => {
      const edge = this.edges.get(edgeId);
      if (!edge) {
        return;
      }
      if (this.directed) {
        successors.add(edge.target);
      } else {
        const neighbor = edge.source === nodeId ? edge.target : edge.source;
        successors.add(neighbor);
      }
    });

    return Array.from(successors);
  }

  predecessors(nodeId: string): string[] {
    const incomingEdges = this.incoming.get(nodeId);
    if (!incomingEdges) {
      return [];
    }

    const predecessors = new Set<string>();
    incomingEdges.forEach((edgeId) => {
      const edge = this.edges.get(edgeId);
      if (!edge) {
        return;
      }
      if (this.directed) {
        predecessors.add(edge.source);
      } else {
        const neighbor = edge.source === nodeId ? edge.target : edge.source;
        predecessors.add(neighbor);
      }
    });

    return Array.from(predecessors);
  }

  neighbors(nodeId: string): string[] {
    const neighbors = new Set<string>();
    this.successors(nodeId).forEach((id) => neighbors.add(id));
    this.predecessors(nodeId).forEach((id) => neighbors.add(id));
    return Array.from(neighbors);
  }

  roots(): string[] {
    const roots: string[] = [];
    this.nodes.forEach((_, nodeId) => {
      const incomingCount = this.incoming.get(nodeId)?.size || 0;
      if (incomingCount === 0) {
        roots.push(nodeId);
      }
    });
    return roots;
  }

  topologicalSort(): string[] {
    if (!this.directed) {
      throw new Error('FlowGraph: topological sort requires a directed graph');
    }

    const inDegree = new Map<string, number>();
    this.nodes.forEach((_, nodeId) => {
      inDegree.set(nodeId, this.incoming.get(nodeId)?.size || 0);
    });

    const queue: string[] = Array.from(inDegree.entries())
      .filter(([, degree]) => degree === 0)
      .map(([nodeId]) => nodeId);

    const sorted: string[] = [];

    while (queue.length > 0) {
      const nodeId = queue.shift() as string;
      sorted.push(nodeId);

      (this.outgoing.get(nodeId) || []).forEach((edgeId) => {
        const edge = this.edges.get(edgeId);
        if (!edge) {
          return;
        }
        const targetId = edge.target;
        const degree = (inDegree.get(targetId) || 0) - 1;
        inDegree.set(targetId, degree);
        if (degree === 0) {
          queue.push(targetId);
        }
      });
    }

    if (sorted.length !== this.nodes.size) {
      throw new Error('FlowGraph: graph contains at least one cycle');
    }

    return sorted;
  }

  hasCycle(): boolean {
    if (!this.directed) {
      return this.findCycles().length > 0;
    }

    try {
      this.topologicalSort();
      return false;
    } catch (error) {
      return true;
    }
  }

  findCycles(): string[][] {
    const indexMap = new Map<string, number>();
    const lowLinkMap = new Map<string, number>();
    const onStack = new Set<string>();
    const stack: string[] = [];
    const stronglyConnectedComponents: string[][] = [];
    let index = 0;

    const strongConnect = (nodeId: string) => {
      indexMap.set(nodeId, index);
      lowLinkMap.set(nodeId, index);
      index += 1;
      stack.push(nodeId);
      onStack.add(nodeId);

      this.successors(nodeId).forEach((neighborId) => {
        if (!indexMap.has(neighborId)) {
          strongConnect(neighborId);
          const neighborLowLink = lowLinkMap.get(neighborId) as number;
          const currentLowLink = lowLinkMap.get(nodeId) as number;
          lowLinkMap.set(nodeId, Math.min(currentLowLink, neighborLowLink));
        } else if (onStack.has(neighborId)) {
          const neighborIndex = indexMap.get(neighborId) as number;
          const currentLowLink = lowLinkMap.get(nodeId) as number;
          lowLinkMap.set(nodeId, Math.min(currentLowLink, neighborIndex));
        }
      });

      if (
        (lowLinkMap.get(nodeId) as number) === (indexMap.get(nodeId) as number)
      ) {
        const component: string[] = [];
        let w: string;
        do {
          w = stack.pop() as string;
          onStack.delete(w);
          component.push(w);
        } while (w !== nodeId);
        stronglyConnectedComponents.push(component);
      }
    };

    this.nodes.forEach((_, nodeId) => {
      if (!indexMap.has(nodeId)) {
        strongConnect(nodeId);
      }
    });

    return stronglyConnectedComponents.filter((component) => {
      if (component.length > 1) {
        return true;
      }
      const [nodeId] = component;
      return this.hasEdgeBetween(nodeId, nodeId);
    });
  }

  toJSON(): {
    directed: boolean;
    multigraph: boolean;
    allowSelfLoops: boolean;
    nodes: FlowNode[];
    edges: NodeConnection[];
  } {
    return {
      directed: this.directed,
      multigraph: this.multigraph,
      allowSelfLoops: this.allowSelfLoops,
      nodes: this.getNodes(),
      edges: this.getEdges(),
    };
  }

  private ensureNodeIndex(nodeId: string): void {
    if (!this.outgoing.has(nodeId)) {
      this.outgoing.set(nodeId, new Set());
    }
    if (!this.incoming.has(nodeId)) {
      this.incoming.set(nodeId, new Set());
    }
  }

  private indexEdge(edge: NodeConnection): void {
    this.ensureNodeIndex(edge.source);
    this.ensureNodeIndex(edge.target);

    this.outgoing.get(edge.source)?.add(edge.id);
    this.incoming.get(edge.target)?.add(edge.id);

    if (!this.directed) {
      this.outgoing.get(edge.target)?.add(edge.id);
      this.incoming.get(edge.source)?.add(edge.id);
    }
  }

  private deindexEdge(edge: NodeConnection): void {
    this.outgoing.get(edge.source)?.delete(edge.id);
    this.incoming.get(edge.target)?.delete(edge.id);

    if (!this.directed) {
      this.outgoing.get(edge.target)?.delete(edge.id);
      this.incoming.get(edge.source)?.delete(edge.id);
    }
  }

  private rebuildEdgeIndices(): void {
    const allEdges = Array.from(this.edges.values()).map((edge) =>
      cloneEdge(edge)
    );
    this.outgoing.clear();
    this.incoming.clear();
    this.nodes.forEach((_, nodeId) => this.ensureNodeIndex(nodeId));
    allEdges.forEach((edge) => this.indexEdge(edge));
  }
}

export type FlowGraphSnapshot = ReturnType<FlowGraph['toJSON']>;
