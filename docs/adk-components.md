# ADK Agent Components

This document provides an overview of the React components created for compatibility with the ADK (Agent Development Kit) system.

## Overview

The ADK Agent Components are a collection of React components designed to work seamlessly with ADK agents, following the same patterns and protocols used in the original adk-web Angular application. These components provide a complete interface for agent interaction, session management, and more.

## Components

### 1. AgentChat Component

**Location**: `src/components/AgentChat/`

A comprehensive chat interface for interacting with ADK agents.

#### Key Features:
- ✅ Real-time messaging via Server-Sent Events (SSE)
- ✅ File upload support (images, videos, audio, documents)
- ✅ Function call visualization and execution
- ✅ Code execution and result display
- ✅ Agent thought process visualization
- ✅ Evaluation and scoring support
- ✅ Streaming and non-streaming responses
- ✅ Fully customizable styling and theming
- ✅ Accessibility-first design

#### Usage:
```tsx
import { AgentChat } from '@app-studio/web';

<AgentChat
  appName="my-agent"
  userId="user123"
  enableFileUpload={true}
  enableStreaming={true}
  enableThoughts={true}
  onSessionCreate={(session) => console.log('Session created:', session)}
  onMessageSent={(message) => console.log('Message sent:', message)}
/>
```

#### Props:
- `appName` (required): Name of the ADK agent application
- `userId` (required): Unique identifier for the user
- `sessionId`: Existing session ID to resume
- `apiBaseUrl`: Base URL for ADK API endpoints
- `enableFileUpload`: Enable file attachment functionality
- `enableStreaming`: Enable real-time streaming responses
- `enableThoughts`: Show agent thought processes
- `views`: Custom styling options

### 2. AgentSession Component

**Location**: `src/components/AgentSession/`

A comprehensive session management component for ADK agents.

#### Key Features:
- ✅ Session creation, listing, and selection
- ✅ Session deletion and management
- ✅ Import/export functionality
- ✅ Search and filtering capabilities
- ✅ Auto-refresh and real-time updates
- ✅ Session metadata and tagging
- ✅ Compact and full display modes
- ✅ Bulk operations support

#### Usage:
```tsx
import { AgentSession } from '@app-studio/web';

<AgentSession
  appName="my-agent"
  userId="user123"
  showSessionHistory={true}
  enableSessionImport={true}
  enableSessionExport={true}
  onSessionSelect={(session) => console.log('Selected:', session)}
  onSessionCreate={(session) => console.log('Created:', session)}
/>
```

#### Props:
- `appName` (required): Name of the ADK agent application
- `userId` (required): Unique identifier for the user
- `showSessionHistory`: Show session history list
- `enableSessionImport`: Enable session import from JSON
- `enableSessionExport`: Enable session export to JSON
- `enableSessionSearch`: Enable search functionality
- `maxSessions`: Maximum number of sessions to display
- `views`: Custom styling options

## Architecture

### Component Structure

Each component follows the established app-studio pattern:

```
ComponentName/
├── ComponentName.tsx                 # Main component file
├── ComponentName/                    # Inner folder for core files
│   ├── ComponentName.props.ts        # Props interface definitions
│   ├── ComponentName.state.ts        # Custom state hook
│   ├── ComponentName.view.tsx        # Presentational component
│   ├── ComponentName.style.ts        # Style constants
│   └── [SupportingComponents].tsx    # Additional components
└── examples/                         # Usage examples
    └── default.tsx                   # Default usage examples
```

### ADK Integration

The components are designed to integrate with the ADK backend using the same API patterns as the original adk-web application:

#### Required Backend Endpoints:
- `POST /sessions` - Create new agent session
- `POST /run_sse` - Send message with streaming response
- `POST /run` - Send message with regular response
- `GET /sessions/:id` - Get session details
- `DELETE /sessions/:id` - Delete session
- `POST /sessions/import` - Import session

#### Message Format:
The components use the same message format as the original ADK system:

```typescript
interface AgentRunRequest {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: {
    role: string;
    parts: MessagePart[];
  };
  streaming?: boolean;
}
```

### Design System Compliance

All components follow the app-studio design system:

- **Typography**: Inter/Geist font family with standardized sizes (xs:10, sm:12, md:14, lg:16, xl:20)
- **Spacing**: 4px grid system for consistent spacing
- **Colors**: app-studio color system (color.[color].[number]) instead of hardcoded values
- **Shapes**: Consistent border radius and rounded corners
- **Animations**: Using app-studio Animation object with proper duration and timing

### Reusability

The components are designed to be:

- **Modular**: Each component can be used independently
- **Customizable**: Extensive styling options via the `views` prop
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Responsive**: Works across mobile, tablet, and desktop breakpoints
- **Themeable**: Support for light/dark themes and custom color schemes

## Examples and Documentation

### Demo Pages

- **AgentChat Demo**: `src/pages/agentChat.page.tsx`
- **Component Examples**: Available in each component's `examples/` directory

### Usage Examples

Each component includes multiple usage examples:

1. **Default Usage**: Basic implementation with minimal configuration
2. **Minimal Usage**: Simplest possible setup
3. **Customized Usage**: Advanced styling and configuration options
4. **Feature Demos**: Showcasing specific features like function calls, file uploads, etc.

## Integration Guide

### 1. Installation

The components are part of the app-studio component library and can be imported directly:

```tsx
import { AgentChat, AgentSession } from '@app-studio/web';
```

### 2. Backend Setup

Ensure your ADK backend provides the required endpoints and follows the expected API format.

### 3. Basic Implementation

```tsx
import React from 'react';
import { AgentChat, AgentSession } from '@app-studio/web';
import { View, Horizontal } from 'app-studio';

const MyAgentApp = () => {
  return (
    <View height="100vh" padding={20}>
      <Horizontal gap={20} height="100%">
        {/* Session Management */}
        <View width="300px">
          <AgentSession
            appName="my-agent"
            userId="user123"
          />
        </View>
        
        {/* Chat Interface */}
        <View flex={1}>
          <AgentChat
            appName="my-agent"
            userId="user123"
          />
        </View>
      </Horizontal>
    </View>
  );
};
```

### 4. Advanced Configuration

```tsx
<AgentChat
  appName="my-agent"
  userId="user123"
  apiBaseUrl="https://api.example.com"
  enableFileUpload={true}
  enableStreaming={true}
  enableThoughts={true}
  maxFileSize={10 * 1024 * 1024}
  allowedFileTypes={['image/*', 'video/*', 'application/pdf']}
  onSessionCreate={(session) => {
    console.log('New session:', session);
  }}
  onMessageSent={(message) => {
    console.log('Message sent:', message);
  }}
  onError={(error) => {
    console.error('Chat error:', error);
  }}
  views={{
    container: { backgroundColor: 'color.gray.50' },
    userMessage: { backgroundColor: 'color.blue.500' },
    botMessage: { backgroundColor: 'color.green.100' },
  }}
/>
```

## Complete Component Library

All planned components have been successfully implemented:

### ✅ **AgentTrace Component**
- **Timeline visualization** of agent execution traces
- **Event filtering and search** capabilities
- **Performance metrics** and analytics
- **Real-time trace updates** via WebSocket
- **Multiple visualization types** (timeline, tree, table, flamegraph)
- **Export functionality** (JSON, CSV, SVG)

### ✅ **AgentEval Component**
- **Evaluation creation and management** interface
- **Test case execution** and monitoring
- **Results analysis** and comparison
- **Metrics calculation** and visualization
- **Batch evaluation** support
- **Template system** for reusable evaluations

### ✅ **Agent Service Integration**
- **Enhanced service layer** for backend communication
- **React Provider pattern** for service management
- **Utility functions** for common operations
- **Real-time updates** via WebSocket and SSE
- **Error handling and retry logic**
- **Connection status monitoring**

## Service Integration

The ADK components include a comprehensive service layer:

```tsx
import { AgentServiceProvider, useAgentService } from '@app-studio/web';

// Wrap your app with the service provider
<AgentServiceProvider config={{ baseUrl: 'https://api.example.com' }}>
  <MyApp />
</AgentServiceProvider>

// Use the service in components
const { service, isConnected } = useAgentService();
```

## Demo Page

A comprehensive demo page showcasing all components is available at:
- **File**: `src/pages/adkComponents.page.tsx`
- **Features**: Interactive demos, customization examples, integration guides

## Support

For questions, issues, or contributions related to the ADK Agent Components, please refer to the main app-studio documentation or create an issue in the repository.

## Production Ready

All ADK Agent Components are **production-ready** and provide:
- ✅ Full ADK backend compatibility
- ✅ TypeScript support with comprehensive type definitions
- ✅ Accessibility compliance (ARIA labels, keyboard navigation)
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Comprehensive error handling and loading states
- ✅ Real-time updates and streaming support
- ✅ Extensive customization options
- ✅ Complete documentation and examples
