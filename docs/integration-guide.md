# ADK Components Integration Guide

This guide provides step-by-step instructions for integrating ADK Agent Components into your React application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Basic Setup](#basic-setup)
4. [Component Integration](#component-integration)
5. [Service Configuration](#service-configuration)
6. [Advanced Features](#advanced-features)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- React 18+
- TypeScript 4.5+ (recommended)
- ADK backend service running
- Node.js 16+

## Installation

### 1. Install the Package

```bash
npm install @app-studio/web
```

### 2. Install Peer Dependencies

```bash
npm install react react-dom
```

### 3. TypeScript Setup (Optional but Recommended)

```bash
npm install -D typescript @types/react @types/react-dom
```

## Basic Setup

### 1. Environment Configuration

Create a `.env` file in your project root:

```bash
# .env
REACT_APP_ADK_API_URL=https://your-adk-api.com
REACT_APP_ADK_API_KEY=your-api-key-here
REACT_APP_AGENT_NAME=my-agent
```

### 2. Service Provider Setup

Wrap your application with the `AgentServiceProvider`:

```tsx
// src/App.tsx
import React from 'react';
import { AgentServiceProvider } from '@app-studio/web';
import { YourMainComponent } from './components/YourMainComponent';

function App() {
  return (
    <AgentServiceProvider
      config={{
        baseUrl: process.env.REACT_APP_ADK_API_URL!,
        apiKey: process.env.REACT_APP_ADK_API_KEY,
        timeout: 30000,
        retryCount: 3,
        enableLogging: process.env.NODE_ENV === 'development',
      }}
      onConnectionChange={(isConnected) => {
        console.log('ADK Service connection:', isConnected);
      }}
      onError={(error) => {
        console.error('ADK Service error:', error);
      }}
    >
      <YourMainComponent />
    </AgentServiceProvider>
  );
}

export default App;
```

## Component Integration

### 1. Simple Chat Interface

```tsx
// src/components/SimpleChatInterface.tsx
import React from 'react';
import { AgentChat } from '@app-studio/web';

export const SimpleChatInterface = () => {
  return (
    <div style={{ height: '100vh' }}>
      <AgentChat
        appName={process.env.REACT_APP_AGENT_NAME!}
        userId="user123"
        enableFileUpload={true}
        enableStreaming={true}
        onMessageSent={(message) => {
          console.log('Message sent:', message);
        }}
        onSessionCreate={(sessionId) => {
          console.log('Session created:', sessionId);
        }}
      />
    </div>
  );
};
```

### 2. Complete Agent Interface

```tsx
// src/components/AgentInterface.tsx
import React, { useState } from 'react';
import { 
  AgentChat, 
  AgentSession, 
  AgentTrace, 
  AgentEval 
} from '@app-studio/web';

export const AgentInterface = () => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'chat' | 'trace' | 'eval'>('chat');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Session Sidebar */}
      <div style={{ width: '300px', borderRight: '1px solid #e5e7eb' }}>
        <AgentSession
          appName={process.env.REACT_APP_AGENT_NAME!}
          userId="user123"
          onSessionSelect={setCurrentSessionId}
          selectedSessionId={currentSessionId}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navigation */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <button onClick={() => setActiveView('chat')}>Chat</button>
          <button onClick={() => setActiveView('trace')}>Trace</button>
          <button onClick={() => setActiveView('eval')}>Evaluation</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeView === 'chat' && (
            <AgentChat
              appName={process.env.REACT_APP_AGENT_NAME!}
              userId="user123"
              sessionId={currentSessionId}
              enableFileUpload={true}
              enableStreaming={true}
            />
          )}

          {activeView === 'trace' && currentSessionId && (
            <AgentTrace
              sessionId={currentSessionId}
              userId="user123"
              appName={process.env.REACT_APP_AGENT_NAME!}
              showTimeline={true}
              showMetrics={true}
            />
          )}

          {activeView === 'eval' && (
            <AgentEval
              appName={process.env.REACT_APP_AGENT_NAME!}
              userId="user123"
              enableBatchEvaluation={true}
              enableResultExport={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
```

## Service Configuration

### 1. Development Configuration

```tsx
const developmentConfig = {
  baseUrl: 'http://localhost:8000',
  timeout: 30000,
  retryCount: 3,
  enableLogging: true,
};
```

### 2. Production Configuration

```tsx
const productionConfig = {
  baseUrl: process.env.REACT_APP_ADK_API_URL!,
  apiKey: process.env.REACT_APP_ADK_API_KEY,
  timeout: 30000,
  retryCount: 3,
  enableLogging: false,
  headers: {
    'X-App-Version': process.env.REACT_APP_VERSION || '1.0.0',
  },
};
```

### 3. Custom Service Hooks

```tsx
// src/hooks/useAgentOperations.ts
import { useAgentOperations } from '@app-studio/web';

export const useCustomAgentOperations = () => {
  const operations = useAgentOperations();

  const sendMessageWithLogging = async (message: string) => {
    console.log('Sending message:', message);
    const result = await operations.messages.send({
      appName: process.env.REACT_APP_AGENT_NAME!,
      userId: 'user123',
      newMessage: {
        role: 'user',
        parts: [{ type: 'text', text: message }],
      },
    });
    console.log('Message result:', result);
    return result;
  };

  return {
    ...operations,
    sendMessageWithLogging,
  };
};
```

## Advanced Features

### 1. Custom Styling

```tsx
const customViews = {
  container: { 
    backgroundColor: 'color.blue.50',
    borderRadius: '12px',
  },
  userMessage: { 
    backgroundColor: 'color.blue.500',
    color: 'white',
  },
  botMessage: { 
    backgroundColor: 'color.green.100',
    borderColor: 'color.green.300',
  },
};

<AgentChat
  appName="my-agent"
  userId="user123"
  views={customViews}
/>
```

### 2. Event Handling

```tsx
const handleAgentEvents = {
  onMessageSent: (message) => {
    // Analytics tracking
    analytics.track('message_sent', { messageLength: message.text?.length });
  },
  onSessionCreate: (sessionId) => {
    // Session tracking
    analytics.track('session_created', { sessionId });
  },
  onError: (error) => {
    // Error reporting
    errorReporting.captureException(error);
  },
};

<AgentChat
  appName="my-agent"
  userId="user123"
  {...handleAgentEvents}
/>
```

### 3. Real-time Updates

```tsx
// Enable real-time features
<AgentTrace
  sessionId="session-123"
  userId="user123"
  appName="my-agent"
  enableRealTimeUpdates={true}
  enableAutoRefresh={true}
  refreshInterval={5000}
/>
```

## Production Deployment

### 1. Environment Variables

```bash
# Production .env
REACT_APP_ADK_API_URL=https://api.yourdomain.com
REACT_APP_ADK_API_KEY=prod-api-key-here
REACT_APP_AGENT_NAME=production-agent
REACT_APP_VERSION=1.0.0
```

### 2. Build Configuration

```json
// package.json
{
  "scripts": {
    "build:prod": "REACT_APP_ENV=production npm run build",
    "build:staging": "REACT_APP_ENV=staging npm run build"
  }
}
```

### 3. Error Boundaries

```tsx
// src/components/ErrorBoundary.tsx
import React from 'react';

class ADKErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ADK Component Error:', error, errorInfo);
    // Report to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong with the ADK components.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap your components
<ADKErrorBoundary>
  <AgentChat appName="my-agent" userId="user123" />
</ADKErrorBoundary>
```

## Troubleshooting

### Common Issues

1. **Components not rendering**
   - Ensure `AgentServiceProvider` wraps your app
   - Check console for JavaScript errors
   - Verify environment variables are set

2. **API connection errors**
   - Verify backend URL is correct and accessible
   - Check CORS configuration on your backend
   - Ensure API key is valid

3. **Styling issues**
   - Import app-studio CSS if needed
   - Check for conflicting CSS rules
   - Verify color system usage

4. **TypeScript errors**
   - Ensure all required props are provided
   - Check type imports from the correct package
   - Update TypeScript to latest version

### Debug Mode

Enable debug logging:

```tsx
<AgentServiceProvider
  config={{
    baseUrl: 'https://api.example.com',
    enableLogging: true, // Enable debug logs
  }}
>
  <App />
</AgentServiceProvider>
```

### Performance Optimization

```tsx
// Lazy load components for better performance
const AgentTrace = React.lazy(() => import('@app-studio/web').then(m => ({ default: m.AgentTrace })));
const AgentEval = React.lazy(() => import('@app-studio/web').then(m => ({ default: m.AgentEval })));

// Use with Suspense
<React.Suspense fallback={<div>Loading...</div>}>
  <AgentTrace sessionId="session-123" userId="user123" appName="my-agent" />
</React.Suspense>
```

## Next Steps

1. Explore the [complete example](../src/examples/CompleteAgentApp.tsx)
2. Check out individual component examples in the `examples/` directories
3. Read the [full documentation](./adk-components.md)
4. Join our community for support and updates

## Support

- 📚 [Documentation](./adk-components.md)
- 🚀 [Quick Start](./adk-quick-start.md)
- 💻 [Complete Example](../src/examples/CompleteAgentApp.tsx)
- 🐛 [Issue Tracker](https://github.com/your-org/adk-components/issues)
