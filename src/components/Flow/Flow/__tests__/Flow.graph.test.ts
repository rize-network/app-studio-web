import { FlowGraph } from '../Flow.graph';
import { FlowNode, NodeConnection } from '../Flow.type';

const createNode = (id: string, x = 0, y = 0): FlowNode => ({
  id,
  position: { x, y },
});

const createEdge = (
  source: string,
  target: string,
  suffix = ''
): NodeConnection => ({
  id: `edge-${source}-${target}${suffix}`,
  source,
  target,
});

describe('FlowGraph', () => {
  it('adds nodes and edges and resolves successors and predecessors', () => {
    const graph = new FlowGraph();
    graph.setNode(createNode('A'));
    graph.setNode(createNode('B'));
    graph.setEdge(createEdge('A', 'B'));

    expect(graph.nodeCount()).toBe(2);
    expect(graph.edgeCount()).toBe(1);
    expect(graph.successors('A')).toEqual(['B']);
    expect(graph.predecessors('B')).toEqual(['A']);
    expect(graph.neighbors('A')).toEqual(['B']);
  });

  it('removes nodes together with their incident edges', () => {
    const graph = FlowGraph.from(
      [createNode('A'), createNode('B')],
      [createEdge('A', 'B')]
    );

    expect(graph.edgeCount()).toBe(1);
    graph.removeNode('A');

    expect(graph.hasNode('A')).toBe(false);
    expect(graph.edgeCount()).toBe(0);
    expect(graph.predecessors('B')).toEqual([]);
  });

  it('prevents duplicate edges when multigraph option is disabled', () => {
    const graph = FlowGraph.from(
      [createNode('A'), createNode('B')],
      [createEdge('A', 'B')]
    );

    expect(() =>
      graph.setEdge({ id: 'edge-second', source: 'A', target: 'B' })
    ).toThrow(/already exists/);
  });

  it('supports multigraph edges when enabled', () => {
    const graph = new FlowGraph({ multigraph: true });
    graph.setNode(createNode('A'));
    graph.setNode(createNode('B'));

    graph.setEdge(createEdge('A', 'B'));
    graph.setEdge(createEdge('A', 'B', '-2'));

    expect(graph.edgesBetween('A', 'B')).toHaveLength(2);
  });

  it('updates node metadata immutably', () => {
    const graph = new FlowGraph();
    graph.setNode(createNode('A'));

    graph.updateNode('A', { data: { label: 'Start' } });
    const node = graph.getNode('A');

    expect(node?.data?.label).toBe('Start');
    expect(node?.position).toEqual({ x: 0, y: 0 });
  });

  it('performs topological sort and detects cycles', () => {
    const nodes = ['A', 'B', 'C'].map((id, index) =>
      createNode(id, index * 10, 0)
    );
    const graph = FlowGraph.from(nodes, [
      createEdge('A', 'B'),
      createEdge('B', 'C'),
    ]);

    expect(graph.topologicalSort()).toEqual(['A', 'B', 'C']);
    expect(graph.hasCycle()).toBe(false);

    graph.setEdge(createEdge('C', 'A'));

    expect(graph.hasCycle()).toBe(true);
    const cycles = graph.findCycles();
    const normalized = cycles.map((cycle) => cycle.slice().sort().join(''));
    expect(normalized).toContain('ABC');
  });
});
