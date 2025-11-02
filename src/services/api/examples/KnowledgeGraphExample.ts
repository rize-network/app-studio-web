/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Knowledge Graph Usage Examples
 *
 * This file demonstrates how to use the Enterprise Knowledge Graph Service
 * as a replacement for Neo4j
 */

import { knowledgeGraph } from '../core/KnowledgeGraphEngine';

/**
 * Example 1: Building an organizational knowledge graph
 */
export function organizationalGraphExample() {
  console.log('=== Organizational Graph Example ===\n');

  // Create company
  const company = knowledgeGraph.createNode({
    labels: ['Company'],
    properties: {
      name: 'TechCorp Inc.',
      industry: 'Technology',
      founded: '2010',
    },
  });

  // Create departments
  const engineering = knowledgeGraph.createNode({
    labels: ['Department'],
    properties: { name: 'Engineering', size: 50 },
  });

  const sales = knowledgeGraph.createNode({
    labels: ['Department'],
    properties: { name: 'Sales', size: 30 },
  });

  // Create employees
  const ceo = knowledgeGraph.createNode({
    labels: ['Person', 'Executive'],
    properties: { name: 'Alice Johnson', title: 'CEO', email: 'alice@techcorp.com' },
  });

  const cto = knowledgeGraph.createNode({
    labels: ['Person', 'Executive'],
    properties: { name: 'Bob Smith', title: 'CTO', email: 'bob@techcorp.com' },
  });

  const engineer1 = knowledgeGraph.createNode({
    labels: ['Person', 'Engineer'],
    properties: { name: 'Charlie Brown', title: 'Senior Engineer', skills: ['JavaScript', 'Python'] },
  });

  const engineer2 = knowledgeGraph.createNode({
    labels: ['Person', 'Engineer'],
    properties: { name: 'Diana Prince', title: 'Staff Engineer', skills: ['Rust', 'Go'] },
  });

  // Create relationships
  knowledgeGraph.createRelationship({
    type: 'WORKS_FOR',
    fromNodeId: ceo.id,
    toNodeId: company.id,
    properties: { since: '2010-01-01' },
  });

  knowledgeGraph.createRelationship({
    type: 'WORKS_FOR',
    fromNodeId: cto.id,
    toNodeId: company.id,
    properties: { since: '2011-03-15' },
  });

  knowledgeGraph.createRelationship({
    type: 'MANAGES',
    fromNodeId: ceo.id,
    toNodeId: cto.id,
  });

  knowledgeGraph.createRelationship({
    type: 'PART_OF',
    fromNodeId: engineering.id,
    toNodeId: company.id,
  });

  knowledgeGraph.createRelationship({
    type: 'PART_OF',
    fromNodeId: sales.id,
    toNodeId: company.id,
  });

  knowledgeGraph.createRelationship({
    type: 'HEADS',
    fromNodeId: cto.id,
    toNodeId: engineering.id,
  });

  knowledgeGraph.createRelationship({
    type: 'MEMBER_OF',
    fromNodeId: engineer1.id,
    toNodeId: engineering.id,
  });

  knowledgeGraph.createRelationship({
    type: 'MEMBER_OF',
    fromNodeId: engineer2.id,
    toNodeId: engineering.id,
  });

  knowledgeGraph.createRelationship({
    type: 'MENTORS',
    fromNodeId: engineer2.id,
    toNodeId: engineer1.id,
  });

  // Query examples
  console.log('All executives:');
  const executives = knowledgeGraph.findNodes({ labels: ['Executive'] });
  executives.forEach((exec) => console.log(`  - ${exec.properties.name} (${exec.properties.title})`));

  console.log('\nAll engineers:');
  const engineers = knowledgeGraph.findNodes({ labels: ['Engineer'] });
  engineers.forEach((eng) => console.log(`  - ${eng.properties.name} - Skills: ${eng.properties.skills?.join(', ')}`));

  console.log('\nCEO\'s direct reports:');
  const ceoReports = knowledgeGraph.getNodeRelationships(ceo.id, 'outgoing')
    .filter((rel) => rel.type === 'MANAGES')
    .map((rel) => knowledgeGraph.getNode(rel.toNodeId));
  ceoReports.forEach((person) => console.log(`  - ${person?.properties.name}`));

  console.log('\nEngineering department members:');
  const engMembers = knowledgeGraph.getNodeRelationships(engineering.id, 'incoming')
    .filter((rel) => rel.type === 'MEMBER_OF')
    .map((rel) => knowledgeGraph.getNode(rel.fromNodeId));
  engMembers.forEach((person) => console.log(`  - ${person?.properties.name}`));

  console.log('\nPath from engineer to company:');
  const path = knowledgeGraph.findPath({
    fromNodeId: engineer1.id,
    toNodeId: company.id,
    maxDepth: 5,
  });
  if (path) {
    const pathNodes = path.nodes.map((id) => knowledgeGraph.getNode(id));
    console.log(`  Length: ${path.length} hops`);
    console.log(`  Path: ${pathNodes.map((n) => n?.properties.name || n?.labels[0]).join(' -> ')}`);
  }

  console.log('\nGraph statistics:');
  const stats = knowledgeGraph.getStats();
  console.log(`  - Total nodes: ${stats.nodeCount}`);
  console.log(`  - Total relationships: ${stats.relationshipCount}`);
  console.log('  - Node types:', stats.labelCounts);
  console.log('  - Relationship types:', stats.relationshipTypeCounts);
}

/**
 * Example 2: Document knowledge graph
 */
export function documentGraphExample() {
  console.log('\n=== Document Knowledge Graph Example ===\n');

  // Create documents
  const proposal = knowledgeGraph.createNode({
    labels: ['Document'],
    properties: {
      title: 'Project Proposal',
      author: 'John Doe',
      date: '2024-01-15',
      type: 'proposal',
    },
  });

  const spec = knowledgeGraph.createNode({
    labels: ['Document'],
    properties: {
      title: 'Technical Specification',
      author: 'Jane Smith',
      date: '2024-01-20',
      type: 'specification',
    },
  });

  const implementation = knowledgeGraph.createNode({
    labels: ['Document'],
    properties: {
      title: 'Implementation Guide',
      author: 'Bob Johnson',
      date: '2024-02-01',
      type: 'guide',
    },
  });

  // Create topics
  const aiTopic = knowledgeGraph.createNode({
    labels: ['Topic'],
    properties: { name: 'Artificial Intelligence' },
  });

  const mlTopic = knowledgeGraph.createNode({
    labels: ['Topic'],
    properties: { name: 'Machine Learning' },
  });

  // Create relationships
  knowledgeGraph.createRelationship({
    type: 'REFERENCES',
    fromNodeId: spec.id,
    toNodeId: proposal.id,
    properties: { section: 'Introduction' },
  });

  knowledgeGraph.createRelationship({
    type: 'IMPLEMENTS',
    fromNodeId: implementation.id,
    toNodeId: spec.id,
  });

  knowledgeGraph.createRelationship({
    type: 'ABOUT',
    fromNodeId: proposal.id,
    toNodeId: aiTopic.id,
  });

  knowledgeGraph.createRelationship({
    type: 'ABOUT',
    fromNodeId: spec.id,
    toNodeId: mlTopic.id,
  });

  knowledgeGraph.createRelationship({
    type: 'SUBTOPIC_OF',
    fromNodeId: mlTopic.id,
    toNodeId: aiTopic.id,
  });

  // Queries
  console.log('All documents:');
  const docs = knowledgeGraph.findNodes({ labels: ['Document'] });
  docs.forEach((doc) => console.log(`  - "${doc.properties.title}" by ${doc.properties.author}`));

  console.log('\nDocument reference chain:');
  const references = knowledgeGraph.traverse({
    startNodeId: implementation.id,
    maxDepth: 3,
    relationshipTypes: ['IMPLEMENTS', 'REFERENCES'],
    direction: 'outgoing',
  });
  const refDocs = references.nodes
    .map((id) => knowledgeGraph.getNode(id))
    .filter((n) => n?.labels.includes('Document'));
  refDocs.forEach((doc) => console.log(`  - ${doc?.properties.title}`));

  console.log('\nDocuments about AI and related topics:');
  const aiDocs = knowledgeGraph.traverse({
    startNodeId: aiTopic.id,
    maxDepth: 2,
    direction: 'incoming',
  });
  const aboutAI = aiDocs.nodes
    .map((id) => knowledgeGraph.getNode(id))
    .filter((n) => n?.labels.includes('Document'));
  aboutAI.forEach((doc) => console.log(`  - ${doc?.properties.title}`));
}

/**
 * Example 3: Social network graph
 */
export function socialNetworkExample() {
  console.log('\n=== Social Network Graph Example ===\n');

  // Create people
  const people = [
    { name: 'Alice', interests: ['Photography', 'Travel'] },
    { name: 'Bob', interests: ['Coding', 'Gaming'] },
    { name: 'Charlie', interests: ['Photography', 'Cooking'] },
    { name: 'Diana', interests: ['Travel', 'Hiking'] },
    { name: 'Eve', interests: ['Gaming', 'Music'] },
  ].map((person) =>
    knowledgeGraph.createNode({
      labels: ['Person'],
      properties: person,
    })
  );

  // Create friendships
  const friendships = [
    { from: 0, to: 1, since: '2020' }, // Alice -> Bob
    { from: 0, to: 2, since: '2019' }, // Alice -> Charlie
    { from: 1, to: 4, since: '2021' }, // Bob -> Eve
    { from: 2, to: 0, since: '2019' }, // Charlie -> Alice
    { from: 2, to: 3, since: '2022' }, // Charlie -> Diana
    { from: 3, to: 0, since: '2021' }, // Diana -> Alice
    { from: 4, to: 1, since: '2021' }, // Eve -> Bob
  ];

  friendships.forEach((f) =>
    knowledgeGraph.createRelationship({
      type: 'FRIENDS_WITH',
      fromNodeId: people[f.from].id,
      toNodeId: people[f.to].id,
      properties: { since: f.since },
    })
  );

  // Queries
  console.log('Social network:');
  people.forEach((person) => {
    const friends = knowledgeGraph.getNeighbors(person.id, 'outgoing');
    console.log(`  ${person.properties.name} is friends with: ${friends.map((f) => f.properties.name).join(', ')}`);
  });

  console.log('\nFind connection between Alice and Eve:');
  const path = knowledgeGraph.findPath({
    fromNodeId: people[0].id, // Alice
    toNodeId: people[4].id, // Eve
    maxDepth: 5,
  });
  if (path) {
    const pathNames = path.nodes
      .map((id) => knowledgeGraph.getNode(id))
      .map((n) => n?.properties.name);
    console.log(`  Path: ${pathNames.join(' -> ')}`);
  }

  console.log('\nAlice\'s extended network (2 degrees):');
  const network = knowledgeGraph.traverse({
    startNodeId: people[0].id,
    maxDepth: 2,
    direction: 'both',
  });
  const networkPeople = network.nodes
    .map((id) => knowledgeGraph.getNode(id))
    .filter((n) => n?.id !== people[0].id);
  networkPeople.forEach((person) => console.log(`  - ${person?.properties.name}`));
}

/**
 * Run all examples
 */
export function runAllExamples() {
  // Clear the graph before running examples
  knowledgeGraph.clear();

  organizationalGraphExample();

  knowledgeGraph.clear();
  documentGraphExample();

  knowledgeGraph.clear();
  socialNetworkExample();

  console.log('\n=== Examples Complete ===');
}

// Uncomment to run examples:
// runAllExamples();
