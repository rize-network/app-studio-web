# App Studio Component Library

This document provides an overview of the core components available in the App Studio library. Each component is designed to be composable, themeable, and consistent.

For detailed rules on creating or modifying components, please refer to the [App Studio Rules](./app-studio.md).

## I. Layout Components

Layout components are the foundation for building consistent user interfaces. They provide powerful and simple abstractions over CSS Flexbox.

### View

The most fundamental layout component. It's a simple block element that can be customized with style props.

**Example:**
```tsx
import { View, Text } from '@app-studio';

const MyComponent = () => (
  <View style={{ padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
    <Text>This is a View component.</Text>
  </View>
);
```

### Horizontal

A `View` component with `flexDirection: 'row'`. It arranges its children in a horizontal line.

**Example:**
```tsx
import { Horizontal, Button, Icon } from '@app-studio';

const ActionBar = () => (
  <Horizontal gap={8} alignItems="center">
    <Button variant="primary">Save</Button>
    <Button>Cancel</Button>
    <Icon name="Settings" />
  </Horizontal>
);
```

### Vertical

A `View` component with `flexDirection: 'column'`. It stacks its children vertically.

**Example:**
```tsx
import { Vertical, Text, TextField } from '@app-studio';

const UserProfile = () => (
  <Vertical gap={12}>
    <Text variant="heading">User Profile</Text>
    <TextField label="Name" />
    <TextField label="Email" />
  </Vertical>
);
```

### Center

A `View` component that centers its children both horizontally and vertically.

**Example:**
```tsx
import { Center, Loader } from '@app-studio';

const LoadingScreen = () => (
  <Center style={{ height: '100vh' }}>
    <Loader size="lg" />
  </Center>
);
```

## II. General Components

### Button

A standard button component with multiple variants, sizes, and states.

**Example:**
```tsx
import { Button, Horizontal } from '@app-studio';

const ButtonExamples = () => (
  <Horizontal gap={8} alignItems="center">
    <Button variant="primary" size="md">Primary</Button>
    <Button variant="secondary" size="sm">Secondary</Button>
    <Button isLoading>Loading</Button>
    <Button isDisabled>Disabled</Button>
  </Horizontal>
);
```

### Icon

Renders an SVG icon from the library's icon set. It can be customized with props for size, color, and more.

**Example:**
```tsx
import { Icon, Horizontal, useTheme } from '@app-studio';

const IconExamples = () => {
  const { theme } = useTheme();
  return (
    <Horizontal gap={16} alignItems="center">
      <Icon name="Home" size={24} />
      <Icon name="User" size={24} color={theme.primary} />
      <Icon name="CheckCircle" size={24} color="green" filled />
    </Horizontal>
  );
};
```

### Text

A component for rendering text with consistent typography based on the theme.

**Example:**
```tsx
import { Text, Vertical } from '@app-studio';

const TextExamples = () => (
  <Vertical gap={4}>
    <Text variant="heading">This is a Heading</Text>
    <Text>This is standard body text.</Text>
    <Text variant="label" color="gray">This is a label.</Text>
  </Vertical>
);
```

### Title

A component for rendering animated and highlighted titles in hero sections and other prominent areas of the UI.

**Example:**
```tsx
import { Title } from '@app-studio/web';

const HeroTitle = () => (
  <Title
    size="xl"
    highlightText="Platform"
    highlightStyle="gradient"
    highlightColor="theme.primary"
    highlightSecondaryColor="theme.secondary"
    centered
  >
    Welcome to Our Platform
  </Title>
);
```

For detailed documentation, see [Title Component](./components/Title.mdx).

## III. Form Components

### TextField

A complete text input field component including a label, helper text, and error handling.

**Example:**
```tsx
import { TextField } from '@app-studio';

const FormExample = () => (
  <TextField
    label="Email Address"
    name="email"
    placeholder="you@example.com"
    helperText="We'll never share your email."
  />
);
```

### FormikTextField

A wrapper around `TextField` that integrates seamlessly with Formik. It automatically handles value, `onChange`, `onBlur`, and error display.

**Example:**
```tsx
import { FormikTextField } from '@app-studio';
import { Formik, Form } from 'formik';

const MyForm = () => (
  <Formik initialValues={{ email: '' }} onSubmit={() => {}}>
    <Form>
      <FormikTextField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
      />
    </Form>
  </Formik>
);
```

### ChatInput

A customizable chat input field with support for file uploads, prompt examples, and agent controls.

**Example:**
```tsx
import { ChatInput } from '@app-studio/web';
import { useState } from 'react';

const ChatExample = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (message) => {
    console.log('Message submitted:', message);
    setInputValue('');
  };

  return (
    <ChatInput
      onSubmit={handleSubmit}
      value={inputValue}
      onChange={setInputValue}
      placeholder="Type your message here..."
      hideAttachments={false}
    />
  );
};
```

For detailed documentation, see [ChatInput Component](./components/ChatInput.mdx).

## IV. Feedback Components

### Alert

A component to display important, contextual messages to the user.

**Example:**
```tsx
import { Alert } from '@app-studio';

const AlertExample = () => (
  <Alert
    status="warning"
    title="Attention Required"
    description="Your session is about to expire. Please save your work."
  />
);
```

### Modal

A dialog window that overlays the main content.

**Example:**
```tsx
import { Modal, Button, useModal } from '@app-studio';

const MyModal = () => {
  const { openModal } = useModal();
  return (
    <>
      <Button onClick={() => openModal('my-modal-id')}>Open Modal</Button>
      <Modal id="my-modal-id" title="My Modal">
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};
```

### Toast

A small, non-intrusive notification that appears temporarily.

**Example:**
```tsx
import { Button, showToast } from '@app-studio';

const ToastButton = () => (
  <Button onClick={() => showToast('success', 'Success!', 'Your action was successful.')}>
    Show Success Toast
  </Button>
);
```

### Tooltip

A small pop-up that displays information when a user hovers over an element.

**Example:**
```tsx
import { Tooltip, Button } from '@app-studio';

const TooltipExample = () => (
  <Tooltip label="This is a tooltip">
    <Button>Hover me</Button>
  </Tooltip>
);
```

## V. Data Display Components

### Calendar

A component for displaying dates and allowing users to select a single date or a date range.

**Example:**
```tsx
import { Calendar } from '@app-studio';
import { useState } from 'react';

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
    />
  );
};
```

### Kanban Card

A draggable card component designed for use within a Kanban board. It displays key information and can be customized.

**Example:**
```tsx
import { KanbanCard } from '@app-studio';

const KanbanCardExample = () => (
  <KanbanCard
    id="task-1"
    title="Design the new dashboard"
    description="Create mockups in Figma for the v2 dashboard."
    tags={[{ label: 'UI/UX', color: 'blue' }, { label: 'High Priority', color: 'red' }]}
    assignee={{ name: 'Jane Doe', avatarUrl: '/avatars/jane.png' }}
  />
);
```

### Tree

A component for displaying hierarchical data with expandable/collapsible nodes. Supports both a compound component pattern and a data-driven approach.

**Example:**
```tsx
import { Tree } from '@app-studio/web';
import { FolderIcon, FileIcon } from '@app-studio/web';

const FileTreeExample = () => {
  const treeData = [
    {
      id: 'root',
      label: 'Project',
      icon: <FolderIcon size={16} />,
      children: [
        {
          id: 'src',
          label: 'src',
          icon: <FolderIcon size={16} />,
          children: [
            { id: 'components', label: 'components', icon: <FileIcon size={16} /> },
            { id: 'utils', label: 'utils', icon: <FileIcon size={16} /> },
          ],
        },
      ],
    },
  ];

  return (
    <Tree
      items={treeData}
      defaultExpandedItems={['root', 'src']}
      onItemSelect={(itemId) => console.log(`Selected: ${itemId}`)}
    />
  );
};
```

For detailed documentation, see [Tree Component](./components/Tree.mdx).

### Flow

A component for creating interactive workflow diagrams and flowcharts with support for node connections, drag-and-drop functionality, and viewport controls.

**Example:**
```tsx
import { Flow } from '@app-studio/web';
import { useState } from 'react';

const FlowExample = () => {
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      position: { x: 50, y: 50 },
      data: { label: 'Start Node', subtitle: 'Begin here' },
    },
    {
      id: 'node-2',
      position: { x: 50, y: 200 },
      data: { label: 'Process Node', subtitle: 'Do something' },
    },
  ]);

  const [edges, setEdges] = useState([
    { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
  ]);

  return (
    <Flow
      nodes={nodes}
      edges={edges}
      onNodesChange={setNodes}
      onEdgesChange={setEdges}
    />
  );
};
```

For detailed documentation, see [Flow Component](./components/Flow.mdx).

### OKR

A component for displaying and tracking Objectives and Key Results (OKRs). Provides a comprehensive view of progress, status, and ownership for strategic goals.

**Example:**
```tsx
import { OKR } from '@app-studio/web';

const OKRExample = () => {
  const objectives = [
    {
      id: '1',
      title: 'Launch New Feature',
      description: 'Successfully launch the new feature to all users.',
      owner: 'John Doe',
      timeframe: 'Q4 2025',
      tags: ['new-feature', 'launch'],
      progress: 50,
      status: 'onTrack',
      keyResults: [
        {
          id: '1.1',
          title: 'Complete development',
          progress: 80,
          status: 'onTrack',
        },
        {
          id: '1.2',
          title: 'Complete QA testing',
          progress: 40,
          status: 'atRisk',
        },
      ],
    },
  ];

  return <OKR objectives={objectives} />;
};
```

For detailed documentation, see [OKR Component](./components/OKR.mdx).
