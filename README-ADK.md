# ADK Agent Components for React

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![ADK Compatible](https://img.shields.io/badge/ADK-Compatible-green.svg)](https://github.com/your-org/adk)

A comprehensive React component library for building applications with the Agent Development Kit (ADK). These components provide seamless integration with ADK agents while maintaining full compatibility with the existing ADK ecosystem.

## 🚀 Features

- **🤖 Complete Agent Interface**: Chat, session management, tracing, and evaluation
- **⚡ Real-time Communication**: WebSocket and SSE support for live updates
- **📁 File Handling**: Upload and preview images, videos, audio, and documents
- **🔧 Function Calls**: Visualize and execute agent function calls
- **💻 Code Execution**: Display and run code with syntax highlighting
- **📊 Performance Monitoring**: Comprehensive tracing and metrics
- **🧪 Evaluation Framework**: Test and validate agent performance
- **🎨 Fully Customizable**: Extensive styling and theming options
- **♿ Accessibility First**: WCAG 2.1 compliant with full keyboard navigation
- **📱 Responsive Design**: Works seamlessly across all device sizes
- **🔒 TypeScript Support**: Complete type definitions included

## 📚 Documentation

- **[Main Documentation](./docs/README.md)** - Complete component library docs
- **[Getting Started](./docs/getting-started/introduction.md)** - Library setup and basics
- **[API Integration](./docs/api-integration.md)** - Backend integration patterns

## 📦 Installation

```bash
npm install @app-studio/web
```

## 🏃‍♂️ Quick Start

```tsx
import React from 'react';
import { AgentChat, AgentServiceProvider } from '@app-studio/web';

function App() {
  return (
    <AgentServiceProvider config={{ baseUrl: 'https://your-adk-api.com' }}>
      <AgentChat
        appName="my-agent"
        userId="user123"
        enableFileUpload={true}
        enableStreaming={true}
      />
    </AgentServiceProvider>
  );
}

export default App;
```

## 🧩 Components

### AgentChat
Real-time chat interface with comprehensive agent interaction capabilities.

```tsx
<AgentChat
  appName="my-agent"
  userId="user123"
  enableFileUpload={true}
  enableStreaming={true}
  enableThoughts={true}
  onMessageSent={(message) => console.log(message)}
/>
```

**Key Features:**
- Real-time messaging with streaming responses
- File upload with drag & drop support
- Function call visualization and execution
- Code execution with syntax highlighting
- Agent thought process display
- Message history and session management

### AgentSession
Comprehensive session management for organizing agent interactions.

```tsx
<AgentSession
  appName="my-agent"
  userId="user123"
  showSessionHistory={true}
  enableSessionImport={true}
  enableSessionExport={true}
/>
```

**Key Features:**
- Create, list, and manage sessions
- Import/export sessions in JSON format
- Search and filter capabilities
- Session metadata and tagging
- Real-time session updates

### AgentTrace
Advanced tracing and monitoring for agent execution analysis.

```tsx
<AgentTrace
  sessionId="session-123"
  userId="user123"
  appName="my-agent"
  showTimeline={true}
  showMetrics={true}
  enableFiltering={true}
/>
```

**Key Features:**
- Timeline visualization of execution traces
- Performance metrics and analytics
- Event filtering and search
- Multiple visualization types (timeline, tree, table, flamegraph)
- Real-time trace updates
- Export functionality (JSON, CSV, SVG)

### AgentEval
Comprehensive evaluation framework for testing agent performance.

```tsx
<AgentEval
  appName="my-agent"
  userId="user123"
  enableBatchEvaluation={true}
  enableMetricsComparison={true}
  enableResultExport={true}
/>
```

**Key Features:**
- Create and manage evaluations
- Test case execution and monitoring
- Results analysis and comparison
- Metrics calculation and visualization
- Batch evaluation support
- Template system for reusable evaluations

## 🔧 Service Integration

The components include a powerful service layer for backend communication:

```tsx
import { AgentServiceProvider, useAgentService } from '@app-studio/web';

// Wrap your app
<AgentServiceProvider config={{ baseUrl: 'https://api.example.com' }}>
  <App />
</AgentServiceProvider>

// Use in components
const { service, isConnected } = useAgentService();
```

**Service Features:**
- Automatic connection management
- Error handling and retry logic
- Real-time updates via WebSocket/SSE
- Connection status monitoring
- Utility functions for common operations

## 🎨 Customization

All components support extensive customization through the `views` prop:

```tsx
<AgentChat
  appName="my-agent"
  userId="user123"
  views={{
    container: { backgroundColor: 'color.blue.50' },
    userMessage: { backgroundColor: 'color.blue.500' },
    botMessage: { backgroundColor: 'color.green.100' },
    input: { borderColor: 'color.blue.300' },
  }}
/>
```

## 🏗️ Architecture

### Component Structure
```
ComponentName/
├── ComponentName.tsx                 # Main component
├── ComponentName/                    # Core implementation
│   ├── ComponentName.props.ts        # TypeScript definitions
│   ├── ComponentName.state.ts        # State management hook
│   ├── ComponentName.view.tsx        # Presentational component
│   ├── ComponentName.style.ts        # Style constants
│   └── [SupportingComponents].tsx    # Sub-components
└── examples/                         # Usage examples
    └── default.tsx                   # Demo implementations
```

### ADK Compatibility
- **Same API patterns** as original adk-web Angular application
- **Compatible message formats** and data structures
- **Identical backend endpoints** and protocols
- **Session management** following ADK specifications

## 📋 Backend Requirements

Your ADK backend should provide these endpoints:

```
POST /sessions              # Create session
GET /sessions               # List sessions
POST /run                   # Send message (non-streaming)
POST /run_sse              # Send message (streaming)
GET /trace/events          # Get trace events (optional)
POST /evaluations          # Create evaluation (optional)
```

## 📖 Additional Resources

- **[Complete ADK Documentation](./docs/adk-components.md)** - Comprehensive component guide
- **[Quick Start Guide](./docs/adk-quick-start.md)** - Get started in minutes
- **[Demo Page](./src/pages/adkComponents.page.tsx)** - Interactive examples

## 🔍 Examples

### Complete Agent Interface
```tsx
import { Tabs } from 'app-studio';

function AgentInterface() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Trigger value="chat">Chat</Tabs.Trigger>
        <Tabs.Trigger value="sessions">Sessions</Tabs.Trigger>
        <Tabs.Trigger value="trace">Trace</Tabs.Trigger>
        <Tabs.Trigger value="eval">Evaluation</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="chat">
        <AgentChat appName="my-agent" userId="user123" />
      </Tabs.Content>
      
      <Tabs.Content value="sessions">
        <AgentSession appName="my-agent" userId="user123" />
      </Tabs.Content>
      
      <Tabs.Content value="trace">
        <AgentTrace sessionId="current" userId="user123" appName="my-agent" />
      </Tabs.Content>
      
      <Tabs.Content value="eval">
        <AgentEval appName="my-agent" userId="user123" />
      </Tabs.Content>
    </Tabs>
  );
}
```

### Custom Service Configuration
```tsx
<AgentServiceProvider 
  config={{
    baseUrl: 'https://api.example.com',
    timeout: 30000,
    retryCount: 3,
    enableLogging: true,
    apiKey: 'your-api-key',
  }}
>
  <App />
</AgentServiceProvider>
```

## 🤝 Contributing

See the main [README.md](./README.md) for development setup and contribution guidelines.

## 📞 Support

- 📚 [Main Documentation](./docs/README.md)
- 📖 [ADK Documentation](./docs/adk-components.md)
- 🚀 [Quick Start Guide](./docs/adk-quick-start.md)
