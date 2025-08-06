# ADK Components Quick Start Guide

Get up and running with ADK Agent Components in minutes.

## Installation

The ADK components are part of the app-studio component library:

```bash
npm install @app-studio/web
```

## Basic Setup

### 1. Import Components

```tsx
import { 
  AgentChat, 
  AgentSession, 
  AgentTrace, 
  AgentEval,
  AgentServiceProvider 
} from '@app-studio/web';
```

### 2. Wrap with Service Provider

```tsx
import { AgentServiceProvider } from '@app-studio/web';

function App() {
  return (
    <AgentServiceProvider config={{ baseUrl: 'https://your-adk-api.com' }}>
      <YourApp />
    </AgentServiceProvider>
  );
}
```

### 3. Use Components

```tsx
function YourApp() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Session Management */}
      <div style={{ width: '300px' }}>
        <AgentSession
          appName="my-agent"
          userId="user123"
        />
      </div>
      
      {/* Chat Interface */}
      <div style={{ flex: 1 }}>
        <AgentChat
          appName="my-agent"
          userId="user123"
          enableFileUpload={true}
          enableStreaming={true}
        />
      </div>
    </div>
  );
}
```

## Component Overview

### AgentChat
**Purpose**: Real-time chat interface with ADK agents
**Key Features**: File uploads, streaming, function calls, code execution

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

### AgentSession
**Purpose**: Session management and organization
**Key Features**: Create, list, import/export, search sessions

```tsx
<AgentSession
  appName="my-agent"
  userId="user123"
  showSessionHistory={true}
  enableSessionImport={true}
  enableSessionExport={true}
/>
```

### AgentTrace
**Purpose**: Visualize agent execution traces
**Key Features**: Timeline view, performance metrics, real-time updates

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

### AgentEval
**Purpose**: Run and manage agent evaluations
**Key Features**: Test creation, execution monitoring, results analysis

```tsx
<AgentEval
  appName="my-agent"
  userId="user123"
  enableBatchEvaluation={true}
  enableMetricsComparison={true}
  enableResultExport={true}
/>
```

## Common Patterns

### 1. Complete Agent Interface

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
        <AgentTrace sessionId="current-session" userId="user123" appName="my-agent" />
      </Tabs.Content>

      <Tabs.Content value="eval">
        <AgentEval appName="my-agent" userId="user123" />
      </Tabs.Content>
    </Tabs>
  );
}
```

### 2. Custom Styling

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

### 3. Event Handling

```tsx
function MyComponent() {
  const handleSessionCreate = (session) => {
    console.log('New session created:', session);
  };

  const handleMessageSent = (message) => {
    console.log('Message sent:', message);
  };

  const handleError = (error) => {
    console.error('Error:', error);
  };

  return (
    <AgentChat
      appName="my-agent"
      userId="user123"
      onSessionCreate={handleSessionCreate}
      onMessageSent={handleMessageSent}
      onError={handleError}
    />
  );
}
```

## Backend Requirements

Your ADK backend must provide these endpoints:

### Session Management
- `POST /sessions` - Create session
- `GET /sessions` - List sessions
- `GET /sessions/:id` - Get session
- `DELETE /sessions/:id` - Delete session

### Messaging
- `POST /run` - Send message (non-streaming)
- `POST /run_sse` - Send message (streaming)

### Tracing (Optional)
- `GET /trace/events` - Get trace events
- `GET /trace/spans` - Get trace spans
- `GET /trace/metrics` - Get trace metrics

### Evaluation (Optional)
- `POST /evaluations` - Create evaluation
- `GET /evaluations` - List evaluations
- `POST /evaluations/:id/start` - Start evaluation

## Environment Variables

```bash
# .env
REACT_APP_AGENT_API_URL=https://your-adk-api.com
REACT_APP_AGENT_API_KEY=your-api-key
```

## TypeScript Support

All components include comprehensive TypeScript definitions:

```tsx
import type { 
  AgentChatProps,
  AgentSessionProps,
  AgentTraceProps,
  AgentEvalProps,
  AgentMessage,
  AgentSession,
  TraceEvent,
  EvaluationRun
} from '@app-studio/web';
```

## Troubleshooting

### Common Issues

1. **Components not rendering**: Ensure you've wrapped your app with `AgentServiceProvider`
2. **API errors**: Check your backend URL and API endpoints
3. **Styling issues**: Verify you're using the app-studio color system
4. **TypeScript errors**: Import types from the correct package

### Debug Mode

Enable debug logging:

```tsx
<AgentServiceProvider 
  config={{ 
    baseUrl: 'https://api.example.com',
    enableLogging: true 
  }}
>
  <App />
</AgentServiceProvider>
```

## Next Steps

- Explore the [complete documentation](./adk-components.md)
- Check out the [demo page](../src/pages/adkComponents.page.tsx)
- View component examples in each component's `examples/` directory
- Customize components using the `views` prop system

## Support

For questions or issues:
- Check the component documentation
- Review the example implementations
- Create an issue in the repository
