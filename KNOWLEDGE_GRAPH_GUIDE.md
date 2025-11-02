# Enterprise Knowledge Graph Service

Custom knowledge graph implementation that replaces Neo4j with your own server infrastructure.

## Overview

This implementation provides a complete knowledge graph solution without requiring Neo4j. It includes:

- **In-memory graph engine** with efficient indexing
- **Full CRUD operations** for nodes and relationships
- **Advanced querying** including path finding and graph traversal
- **Batch operations** for performance
- **Graph analytics** and statistics
- **Export/Import** capabilities for persistence

## Architecture

### Components

1. **Models** (`src/services/api/models/KnowledgeGraph*.ts`)
   - Type definitions for nodes, relationships, and queries
   - Request/response parameter types

2. **Graph Engine** (`src/services/api/core/KnowledgeGraphEngine.ts`)
   - In-memory graph storage and algorithms
   - Efficient indexing by labels and relationships
   - BFS-based path finding
   - Graph traversal algorithms

3. **Service API** (`src/services/api/services/EnterpriseKnowledgeGraphService.ts`)
   - HTTP API integration layer
   - Backend server communication

## Usage Examples

### 1. Direct In-Memory Usage

```typescript
import { knowledgeGraph } from './src/services/api/core/KnowledgeGraphEngine';

// Create nodes
const person = knowledgeGraph.createNode({
  labels: ['Person'],
  properties: {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
  }
});

const company = knowledgeGraph.createNode({
  labels: ['Company'],
  properties: {
    name: 'Tech Corp',
    industry: 'Technology'
  }
});

// Create relationship
const employment = knowledgeGraph.createRelationship({
  type: 'WORKS_FOR',
  fromNodeId: person.id,
  toNodeId: company.id,
  properties: {
    position: 'Software Engineer',
    since: '2020-01-01'
  }
});

// Query nodes
const allPeople = knowledgeGraph.findNodes({
  labels: ['Person']
});

const engineers = knowledgeGraph.findNodes({
  labels: ['Person'],
  properties: { position: 'Software Engineer' }
});

// Find relationships
const personRelationships = knowledgeGraph.getNodeRelationships(
  person.id,
  'outgoing'
);

// Find path between nodes
const path = knowledgeGraph.findPath({
  fromNodeId: person.id,
  toNodeId: company.id,
  maxDepth: 5
});

// Traverse graph
const network = knowledgeGraph.traverse({
  startNodeId: person.id,
  maxDepth: 2,
  direction: 'both'
});
```

### 2. Using Service API (with Backend)

```typescript
import * as EnterpriseKnowledgeGraphService from './src/services/api/services/EnterpriseKnowledgeGraphService';

// Create a node (makes HTTP request to backend)
const node = await EnterpriseKnowledgeGraphService.createNode({
  labels: ['Document'],
  properties: {
    title: 'Project Proposal',
    author: 'Jane Smith',
    date: '2024-01-15'
  }
});

// Find nodes
const documents = await EnterpriseKnowledgeGraphService.findNodes({
  labels: ['Document'],
  limit: 10
});

// Create relationship
const rel = await EnterpriseKnowledgeGraphService.createRelationship({
  type: 'REFERENCES',
  fromNodeId: node.id,
  toNodeId: anotherNodeId,
  properties: {
    context: 'Background research'
  }
});

// Advanced queries
const path = await EnterpriseKnowledgeGraphService.findPath({
  fromNodeId: startId,
  toNodeId: endId,
  maxDepth: 10,
  relationshipTypes: ['REFERENCES', 'RELATES_TO']
});

// Get graph statistics
const stats = await EnterpriseKnowledgeGraphService.getGraphStats();
console.log(`Total nodes: ${stats.nodeCount}`);
console.log(`Total relationships: ${stats.relationshipCount}`);
```

### 3. Batch Operations

```typescript
// Create multiple nodes at once
const nodes = knowledgeGraph.batchCreateNodes([
  {
    labels: ['Product'],
    properties: { name: 'Widget A', price: 29.99 }
  },
  {
    labels: ['Product'],
    properties: { name: 'Widget B', price: 39.99 }
  },
  {
    labels: ['Product'],
    properties: { name: 'Widget C', price: 49.99 }
  }
]);

// Create multiple relationships
const relationships = knowledgeGraph.batchCreateRelationships([
  {
    type: 'SIMILAR_TO',
    fromNodeId: nodes[0].id,
    toNodeId: nodes[1].id
  },
  {
    type: 'SIMILAR_TO',
    fromNodeId: nodes[1].id,
    toNodeId: nodes[2].id
  }
]);
```

### 4. Persistence (Export/Import)

```typescript
// Export graph data
const graphData = knowledgeGraph.exportData();

// Save to file or database
localStorage.setItem('graph-data', JSON.stringify(graphData));
// or send to backend
await fetch('/api/graph/backup', {
  method: 'POST',
  body: JSON.stringify(graphData)
});

// Import graph data
const savedData = JSON.parse(localStorage.getItem('graph-data'));
knowledgeGraph.importData(savedData);
```

## Backend Integration

To integrate with your own server, implement these REST API endpoints:

### Node Endpoints

- `POST /knowledge-graph/nodes` - Create node
- `GET /knowledge-graph/nodes/:id` - Get node
- `PATCH /knowledge-graph/nodes/:id` - Update node
- `DELETE /knowledge-graph/nodes/:id` - Delete node
- `GET /knowledge-graph/nodes` - Find nodes (with query params)
- `GET /knowledge-graph/nodes/:id/neighbors` - Get neighbors
- `GET /knowledge-graph/nodes/:id/relationships` - Get relationships

### Relationship Endpoints

- `POST /knowledge-graph/relationships` - Create relationship
- `GET /knowledge-graph/relationships/:id` - Get relationship
- `PATCH /knowledge-graph/relationships/:id` - Update relationship
- `DELETE /knowledge-graph/relationships/:id` - Delete relationship
- `GET /knowledge-graph/relationships` - Find relationships

### Query Endpoints

- `POST /knowledge-graph/query/path` - Find path
- `POST /knowledge-graph/query/traverse` - Traverse graph

### Batch Endpoints

- `POST /knowledge-graph/batch/nodes` - Batch create nodes
- `POST /knowledge-graph/batch/relationships` - Batch create relationships

### Analytics Endpoints

- `GET /knowledge-graph/stats` - Get statistics
- `DELETE /knowledge-graph/clear` - Clear graph (admin only)

## Performance Considerations

### Indexing

The engine maintains several indexes for fast queries:

- **Label index**: Quick lookup of nodes by label
- **Relationship index**: Fast access to incoming/outgoing relationships
- **Property filtering**: Applied after index lookup for efficiency

### Scalability

For large graphs (>100,000 nodes), consider:

1. **Backend persistence**: Use a database (PostgreSQL, MongoDB) for storage
2. **Caching**: Keep frequently accessed subgraphs in memory
3. **Pagination**: Use `limit` and `skip` parameters
4. **Graph partitioning**: Split large graphs into smaller subgraphs

### Memory Usage

Approximate memory usage:

- Node: ~200-500 bytes (depends on properties)
- Relationship: ~100-300 bytes
- Indexes: ~50 bytes per node/relationship

Example: A graph with 10,000 nodes and 20,000 relationships uses approximately 10-15 MB.

## Advanced Features

### Path Finding

Uses breadth-first search (BFS) to find the shortest path:

```typescript
const path = knowledgeGraph.findPath({
  fromNodeId: startId,
  toNodeId: endId,
  maxDepth: 10,
  relationshipTypes: ['KNOWS', 'MANAGES'] // Optional filter
});

if (path) {
  console.log(`Path length: ${path.length}`);
  console.log(`Nodes: ${path.nodes.join(' -> ')}`);
}
```

### Graph Traversal

Explore the graph from a starting point:

```typescript
const result = knowledgeGraph.traverse({
  startNodeId: rootId,
  maxDepth: 3,
  relationshipTypes: ['PART_OF', 'CONTAINS'],
  direction: 'outgoing' // 'incoming', 'both'
});

console.log(`Discovered ${result.nodes.length} nodes`);
console.log(`Discovered ${result.relationships.length} relationships`);
```

### Analytics

Get insights about your graph:

```typescript
const stats = knowledgeGraph.getStats();

console.log('Graph Statistics:');
console.log(`- Total nodes: ${stats.nodeCount}`);
console.log(`- Total relationships: ${stats.relationshipCount}`);
console.log('\nNode types:');
Object.entries(stats.labelCounts).forEach(([label, count]) => {
  console.log(`- ${label}: ${count}`);
});
console.log('\nRelationship types:');
Object.entries(stats.relationshipTypeCounts).forEach(([type, count]) => {
  console.log(`- ${type}: ${count}`);
});
```

## Migration from Neo4j

If you're migrating from Neo4j:

### Cypher to JavaScript Mapping

**Neo4j Cypher:**
```cypher
CREATE (p:Person {name: 'John', age: 30})
RETURN p
```

**Knowledge Graph:**
```typescript
const p = knowledgeGraph.createNode({
  labels: ['Person'],
  properties: { name: 'John', age: 30 }
});
```

**Neo4j Cypher:**
```cypher
MATCH (p:Person)-[r:KNOWS]->(f:Person)
WHERE p.name = 'John'
RETURN f
```

**Knowledge Graph:**
```typescript
// Find John
const johns = knowledgeGraph.findNodes({
  labels: ['Person'],
  properties: { name: 'John' }
});

// Get his relationships
const relationships = knowledgeGraph.getNodeRelationships(
  johns[0].id,
  'outgoing'
).filter(r => r.type === 'KNOWS');

// Get the connected people
const friends = relationships.map(r =>
  knowledgeGraph.getNode(r.toNodeId)
);
```

## Testing

```typescript
import { KnowledgeGraphEngine } from './src/services/api/core/KnowledgeGraphEngine';

describe('Knowledge Graph', () => {
  let graph: KnowledgeGraphEngine;

  beforeEach(() => {
    graph = new KnowledgeGraphEngine();
  });

  it('should create and retrieve nodes', () => {
    const node = graph.createNode({
      labels: ['Test'],
      properties: { value: 'test' }
    });

    const retrieved = graph.getNode(node.id);
    expect(retrieved).toEqual(node);
  });

  it('should find shortest path', () => {
    const n1 = graph.createNode({ labels: ['Node'], properties: {} });
    const n2 = graph.createNode({ labels: ['Node'], properties: {} });
    const n3 = graph.createNode({ labels: ['Node'], properties: {} });

    graph.createRelationship({ type: 'LINK', fromNodeId: n1.id, toNodeId: n2.id });
    graph.createRelationship({ type: 'LINK', fromNodeId: n2.id, toNodeId: n3.id });

    const path = graph.findPath({ fromNodeId: n1.id, toNodeId: n3.id });

    expect(path?.length).toBe(2);
    expect(path?.nodes).toEqual([n1.id, n2.id, n3.id]);
  });
});
```

## Support

For issues or questions:
1. Check this documentation
2. Review the type definitions in `models/KnowledgeGraph*.ts`
3. Examine the implementation in `core/KnowledgeGraphEngine.ts`
4. Create an issue in the repository

## License

Same as the parent project.
