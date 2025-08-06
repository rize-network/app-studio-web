# Flow

The Flow component is used to create interactive workflow diagrams and flowcharts with support for node connections, drag-and-drop functionality, and viewport controls.

## Import

```jsx
import { Flow } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| nodes | FlowNode[] | [] | Array of nodes in the flow |
| edges | NodeConnection[] | [] | Array of edges/connections between nodes |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the flow nodes |
| variant | 'default' \| 'outline' \| 'filled' | 'default' | Visual variant of the flow nodes |
| direction | 'horizontal' \| 'vertical' | 'vertical' | Direction of the flow layout |
| showControls | boolean | true | Whether to show viewport controls (zoom in/out, reset) |
| allowAddingNodes | boolean | true | Whether to allow adding new nodes |
| allowDraggingNodes | boolean | true | Whether to allow dragging nodes |
| selectedNodeId | string | undefined | ID of the currently selected node |
| onNodeSelect | (nodeId: string \| null) => void | undefined | Callback when a node is selected |
| onNodesChange | (nodes: FlowNode[]) => void | undefined | Callback when nodes change |
| onEdgesChange | (edges: NodeConnection[]) => void | undefined | Callback when edges change |
| onNodeAdd | (node: FlowNode) => void | undefined | Callback when a node is added |
| onNodeDragStart | (nodeId: string) => void | undefined | Callback when node dragging starts |
| onNodeDrag | (nodeId: string, position: NodePosition) => void | undefined | Callback during node dragging |
| onNodeDragEnd | (nodeId: string, position: NodePosition) => void | undefined | Callback when node dragging ends |
| viewport | FlowViewport | { zoom: 1, x: 0, y: 0 } | Current viewport state (zoom level and position) |
| onViewportChange | (viewport: FlowViewport) => void | undefined | Callback when viewport changes |
| views | object | {} | Custom styling for different parts of the component |

## Node Structure

The `FlowNode` interface defines the structure of nodes in the Flow component:

```tsx
interface FlowNode {
  id: string;
  type?: 'default' | 'start' | 'end' | 'decision' | 'process' | string;
  position: { x: number; y: number };
  data?: {
    label?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    number?: number;
    [key: string]: any;
  };
  selected?: boolean;
  isDragging?: boolean;
  draggable?: boolean;
  style?: ViewProps;
}
```

## Edge Structure

The `NodeConnection` interface defines the structure of edges in the Flow component:

```tsx
interface NodeConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: ViewProps;
}
```

## Examples

### Basic Usage

```jsx
import React, { useState } from 'react';
import { Flow } from '@app-studio/web';
import { View } from 'app-studio';

export const BasicFlow = () => {
  // Initial nodes and edges
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      position: { x: 50, y: 50 },
      data: { 
        label: 'Start Node', 
        subtitle: 'Begin here' 
      },
    },
    {
      id: 'node-2',
      position: { x: 50, y: 200 },
      data: { 
        label: 'Process Node', 
        subtitle: 'Do something' 
      },
    },
  ]);

  const [edges, setEdges] = useState([
    { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
  ]);

  return (
    <View height="400px" border="1px solid" borderColor="color.gray.200" borderRadius={8}>
      <Flow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      />
    </View>
  );
};
```

### With Node Addition

```jsx
import React, { useState } from 'react';
import { Flow } from '@app-studio/web';
import { View } from 'app-studio';

export const FlowWithNodeAddition = () => {
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      position: { x: 50, y: 50 },
      data: { label: 'Start', subtitle: 'Begin workflow' },
    },
    {
      id: 'node-2',
      position: { x: 50, y: 200 },
      data: { label: 'Process', subtitle: 'Do something' },
    },
  ]);

  const [edges, setEdges] = useState([
    { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState(null);

  return (
    <View height="400px" border="1px solid" borderColor="color.gray.200" borderRadius={8}>
      <Flow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        selectedNodeId={selectedNodeId}
        onNodeSelect={setSelectedNodeId}
        allowAddingNodes={true}
        onNodeAdd={(newNode) => {
          setNodes((prevNodes) => [...prevNodes, newNode]);
        }}
      />
    </View>
  );
};
```

## Compound Components

The Flow component uses a compound component pattern with the following sub-components:

```jsx
// These are primarily for potential direct use or a more componentized future version
Flow.Node       // Renders a single node
Flow.Edge       // Renders a connection between nodes
Flow.Controls   // Renders viewport controls
Flow.AddNodeButton // Renders a button to add a new node
```

## Customization

The Flow component can be customized using the `views` prop:

```jsx
<Flow
  // ...other props
  views={{
    container: { /* styles for the main flow container */ },
    node: {
      container: { /* styles for the node's root View */ },
      content: { /* styles for the content wrapper inside the node */ },
      icon: { /* styles for the node's icon View */ },
    },
    edge: {
      path: { /* styles for the SVG path */ },
      label: { /* styles for the edge label */ },
    },
    controls: {
      container: { /* styles for the controls container */ },
      button: { /* styles for individual control buttons */ },
    },
    addNodeButton: { /* styles for the add node button */ },
  }}
/>
```

## Accessibility

The Flow component implements the following accessibility features:

- Keyboard navigation for selecting nodes
- ARIA attributes for interactive elements
- Focus management for controls and nodes
- Proper contrast for node and edge colors

## Best Practices

- Provide clear labels and subtitles for nodes to improve understanding
- Use consistent node types and styling for similar functionality
- Implement proper error handling for node and edge operations
- Consider viewport size when determining initial node positions
- Use the `onNodeAdd` callback to validate new node positions
- Implement undo/redo functionality for node operations when needed
