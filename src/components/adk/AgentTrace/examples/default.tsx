import React, { useState } from 'react';
import { View, Vertical, Text } from 'app-studio';
import { AgentTrace } from '../AgentTrace';
import { TraceEvent } from '../AgentTrace/AgentTrace.props';

/**
 * Default AgentTrace Example
 *
 * Demonstrates basic usage of the AgentTrace component
 */
export const DefaultDemo = () => {
  const [selectedEvent, setSelectedEvent] = useState<TraceEvent | null>(null);

  const handleEventSelect = (event: TraceEvent) => {
    console.log('Event selected:', event);
    setSelectedEvent(event);
  };

  const handleError = (error: Error) => {
    console.error('AgentTrace error:', error);
  };

  return (
    <Vertical gap={32} padding={20}>
      <Text fontSize={20} fontWeight="600">
        AgentTrace Component - Default Example
      </Text>

      <Text color="color.gray.600">
        A comprehensive trace visualization component for ADK agents. Displays
        execution traces, events, and performance metrics in an interactive
        format.
      </Text>

      {/* Selected Event Info */}
      {selectedEvent && (
        <View
          padding={16}
          backgroundColor="color.purple.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.purple.200"
        >
          <Text fontSize={14} fontWeight="600" color="color.purple.800">
            Selected Event
          </Text>
          <Text fontSize={12} color="color.purple.600">
            ID: {selectedEvent.id}
          </Text>
          <Text fontSize={12} color="color.purple.600">
            Type: {selectedEvent.type}
          </Text>
          <Text fontSize={12} color="color.purple.600">
            Duration:{' '}
            {selectedEvent.duration ? `${selectedEvent.duration}ms` : 'N/A'}
          </Text>
        </View>
      )}

      {/* AgentTrace Component */}
      <View
        height="600px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="12px"
      >
        <AgentTrace
          sessionId="session-123"
          userId="demo-user"
          appName="demo-agent"
          apiBaseUrl="http://localhost:3000/adk"
          showTimeline={true}
          showMetrics={true}
          showVisualization={true}
          enableFiltering={true}
          enableExport={true}
          enableSearch={true}
          enableAutoRefresh={false}
          visualizationType="timeline"
          onEventSelect={handleEventSelect}
          onError={handleError}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * AgentTrace with Mock Data Example
 *
 * Shows the component with sample trace data
 */
export const MockDataDemo = () => {
  const mockEvents: TraceEvent[] = [
    {
      id: 'event-1',
      sessionId: 'session-123',
      type: 'user_input',
      timestamp: Date.now() - 10000,
      duration: 50,
      data: { message: 'Hello, can you help me with my code?' },
      metadata: {
        title: 'User Message',
        description: 'User asks for coding help',
        level: 'info',
        tags: ['user', 'input'],
      },
    },
    {
      id: 'event-2',
      sessionId: 'session-123',
      type: 'llm_request',
      timestamp: Date.now() - 9000,
      duration: 1200,
      data: {
        model: 'gpt-4',
        prompt: 'Help user with coding question',
        tokens: 150,
      },
      metadata: {
        title: 'LLM Request',
        description: 'Sending request to language model',
        level: 'info',
        tags: ['llm', 'request'],
      },
      parentId: 'event-1',
    },
    {
      id: 'event-3',
      sessionId: 'session-123',
      type: 'function_call',
      timestamp: Date.now() - 8000,
      duration: 800,
      data: {
        function: 'analyze_code',
        arguments: { language: 'python', code: 'def hello(): print("world")' },
      },
      metadata: {
        title: 'Code Analysis',
        description: 'Analyzing user code for improvements',
        level: 'info',
        tags: ['function', 'analysis'],
      },
      parentId: 'event-2',
    },
    {
      id: 'event-4',
      sessionId: 'session-123',
      type: 'function_response',
      timestamp: Date.now() - 7000,
      duration: 100,
      data: {
        result: {
          suggestions: [
            'Add type hints',
            'Use more descriptive variable names',
          ],
          score: 85,
        },
      },
      metadata: {
        title: 'Analysis Result',
        description: 'Code analysis completed successfully',
        level: 'info',
        tags: ['function', 'response'],
      },
      parentId: 'event-3',
    },
    {
      id: 'event-5',
      sessionId: 'session-123',
      type: 'llm_response',
      timestamp: Date.now() - 6000,
      duration: 300,
      data: {
        response: 'I analyzed your code and have some suggestions...',
        tokens: 200,
      },
      metadata: {
        title: 'LLM Response',
        description: 'Language model provides response',
        level: 'info',
        tags: ['llm', 'response'],
      },
      parentId: 'event-2',
    },
    {
      id: 'event-6',
      sessionId: 'session-123',
      type: 'agent_output',
      timestamp: Date.now() - 5000,
      duration: 150,
      data: {
        message: 'Here are some suggestions to improve your code...',
        suggestions: ['Add type hints', 'Use more descriptive variable names'],
      },
      metadata: {
        title: 'Agent Response',
        description: 'Final response sent to user',
        level: 'info',
        tags: ['agent', 'output'],
      },
      parentId: 'event-1',
    },
  ];

  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        AgentTrace with Mock Data
      </Text>

      <View
        height="600px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentTrace
          sessionId="session-123"
          userId="demo-user"
          appName="demo-agent"
          initialEvents={mockEvents}
          showTimeline={true}
          showMetrics={true}
          enableFiltering={true}
          visualizationType="timeline"
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Compact AgentTrace Example
 *
 * Shows the component in compact mode
 */
export const CompactDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Compact AgentTrace Example
      </Text>

      <View
        height="400px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentTrace
          sessionId="session-123"
          userId="user123"
          appName="compact-agent"
          compactMode={true}
          showTimeline={false}
          showVisualization={false}
          enableFiltering={false}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Real-time AgentTrace Example
 *
 * Demonstrates real-time updates and auto-refresh
 */
export const RealTimeDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Real-time AgentTrace Example
      </Text>

      <Text fontSize={14} color="color.gray.600">
        This example shows real-time trace updates with auto-refresh enabled.
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentTrace
          sessionId="session-123"
          userId="user123"
          appName="realtime-agent"
          enableAutoRefresh={true}
          enableRealTimeUpdates={true}
          refreshInterval={5000}
          showTimeline={true}
          showMetrics={true}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Customized AgentTrace Example
 *
 * Shows advanced customization options
 */
export const CustomizedDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Customized AgentTrace Example
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.orange.200"
        borderRadius="12px"
      >
        <AgentTrace
          sessionId="session-123"
          userId="user123"
          appName="custom-agent"
          visualizationType="tree"
          showPerformanceMetrics={true}
          enableExport={true}
          views={{
            container: {
              backgroundColor: 'color.orange.25',
              height: '100%',
            },
            header: {
              backgroundColor: 'color.orange.500',
              color: 'white',
            },
            timeline: {
              backgroundColor: 'color.white',
            },
            eventList: {
              backgroundColor: 'color.white',
            },
            metrics: {
              backgroundColor: 'color.orange.50',
            },
          }}
        />
      </View>
    </Vertical>
  );
};
