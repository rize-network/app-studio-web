import React, { useState } from 'react';
import { View, Vertical, Text } from 'app-studio';
import { AgentSession } from '../AgentSession';
import { AgentSession as AgentSessionType } from '../AgentSession/AgentSession.props';

/**
 * Default AgentSession Example
 *
 * Demonstrates basic usage of the AgentSession component
 */
export const DefaultDemo = () => {
  const [selectedSession, setSelectedSession] =
    useState<AgentSessionType | null>(null);

  const handleSessionSelect = (session: AgentSessionType) => {
    console.log('Session selected:', session);
    setSelectedSession(session);
  };

  const handleSessionCreate = (session: AgentSessionType) => {
    console.log('Session created:', session);
    setSelectedSession(session);
  };

  const handleSessionDelete = (sessionId: string) => {
    console.log('Session deleted:', sessionId);
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
    }
  };

  const handleError = (error: Error) => {
    console.error('AgentSession error:', error);
  };

  return (
    <Vertical gap={32} padding={20}>
      <Text fontSize={20} fontWeight="600">
        AgentSession Component - Default Example
      </Text>

      <Text color="color.gray.600">
        A comprehensive session management interface for ADK agents. Handles
        session creation, listing, selection, deletion, and import/export.
      </Text>

      {/* Selected Session Info */}
      {selectedSession && (
        <View
          padding={16}
          backgroundColor="color.green.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.green.200"
        >
          <Text fontSize={14} fontWeight="600" color="color.green.800">
            Selected Session
          </Text>
          <Text fontSize={12} color="color.green.600">
            ID: {selectedSession.id}
          </Text>
          <Text fontSize={12} color="color.green.600">
            Title: {selectedSession.metadata?.title || 'Untitled'}
          </Text>
          <Text fontSize={12} color="color.green.600">
            Messages: {selectedSession.metadata?.messageCount || 0}
          </Text>
        </View>
      )}

      {/* AgentSession Component */}
      <View
        height="500px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="12px"
      >
        <AgentSession
          appName="demo-agent"
          userId="demo-user"
          apiBaseUrl="http://localhost:3000/adk"
          showSessionHistory={true}
          enableSessionImport={true}
          enableSessionExport={true}
          enableSessionDelete={true}
          enableSessionSearch={true}
          showSessionInfo={true}
          showSessionActions={true}
          showCreateButton={true}
          showRefreshButton={true}
          maxSessions={50}
          enableAutoRefresh={false}
          onSessionSelect={handleSessionSelect}
          onSessionCreate={handleSessionCreate}
          onSessionDelete={handleSessionDelete}
          onError={handleError}
          views={{
            container: {
              height: '100%',
            },
            sessionList: {
              backgroundColor: 'color.gray.100',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Compact AgentSession Example
 *
 * Shows the component in compact mode
 */
export const CompactDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Compact AgentSession Example
      </Text>

      <View
        height="300px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentSession
          appName="compact-agent"
          userId="user123"
          compactMode={true}
          showSessionInfo={false}
          enableSessionSearch={false}
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
 * Customized AgentSession Example
 *
 * Shows advanced customization options
 */
export const CustomizedDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Customized AgentSession Example
      </Text>

      <View
        height="400px"
        border="1px solid"
        borderColor="color.purple.200"
        borderRadius="12px"
      >
        <AgentSession
          appName="custom-agent"
          userId="user123"
          enableSessionTags={true}
          enableSessionMetadata={true}
          maxSessions={25}
          views={{
            container: {
              backgroundColor: 'color.purple.25',
              height: '100%',
            },
            header: {
              backgroundColor: 'color.purple.500',
              color: 'white',
            },
            sessionList: {
              backgroundColor: 'color.white',
            },
            activeSessionItem: {
              backgroundColor: 'color.purple.100',
              borderColor: 'color.purple.500',
            },
            sessionActions: {
              backgroundColor: 'color.purple.50',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Enhanced Customization Example
 *
 * Shows comprehensive customization using enhanced views prop and container props
 */
export const EnhancedCustomizationDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Enhanced AgentSession Customization
      </Text>

      <Text color="color.gray.600" fontSize={14}>
        Demonstrates comprehensive customization using the enhanced views prop
        and container props for complete control over session management UI.
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.green.200"
        borderRadius="12px"
      >
        <AgentSession
          appName="enhanced-agent"
          userId="user123"
          showSessionHistory={true}
          enableSessionImport={true}
          enableSessionExport={true}
          enableSessionDelete={true}
          enableSessionSearch={true}
          enableBulkOperations={true}
          enableSessionTags={true}
          enableSessionMetadata={true}
          compactMode={false}
          colorScheme="green"
          layout="list"
          showPreviews={true}
          containerProps={{
            backgroundColor: 'color.green.25',
            border: '2px solid',
            borderColor: 'color.green.300',
          }}
          views={{
            // Main areas
            container: {
              backgroundColor: 'color.green.25',
            },
            header: {
              backgroundColor: 'color.green.500',
              color: 'white',
              padding: '16px',
              borderRadius: '12px 12px 0 0',
            },
            toolbar: {
              backgroundColor: 'color.green.50',
              padding: '12px',
              borderBottom: '1px solid',
              borderBottomColor: 'color.green.200',
            },
            sessionList: {
              backgroundColor: 'color.white',
              padding: '16px',
            },

            // Session items
            sessionItem: {
              backgroundColor: 'color.green.50',
              borderRadius: '8px',
              margin: '4px 0',
              padding: '12px',
              border: '1px solid',
              borderColor: 'color.green.200',
            },
            activeSessionItem: {
              backgroundColor: 'color.green.100',
              borderColor: 'color.green.500',
              borderWidth: '2px',
            },
            sessionTitle: {
              fontWeight: '600',
              color: 'color.green.900',
              fontSize: '16px',
            },
            sessionDescription: {
              color: 'color.green.700',
              fontSize: '14px',
            },
            sessionTimestamp: {
              color: 'color.green.600',
              fontSize: '12px',
            },
            sessionStats: {
              backgroundColor: 'color.green.100',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              color: 'color.green.800',
            },

            // Action buttons
            createButton: {
              backgroundColor: 'color.green.500',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: '600',
            },
            deleteButton: {
              backgroundColor: 'color.red.500',
              color: 'white',
              borderRadius: '6px',
              padding: '6px 12px',
            },
            exportButton: {
              backgroundColor: 'color.blue.500',
              color: 'white',
              borderRadius: '6px',
              padding: '6px 12px',
            },

            // Search and filters
            searchInput: {
              borderRadius: '20px',
              border: '2px solid',
              borderColor: 'color.green.200',
              backgroundColor: 'white',
              padding: '8px 16px',
            },

            // State displays
            emptyState: {
              textAlign: 'center',
              padding: '40px',
              color: 'color.green.600',
            },
            loadingState: {
              textAlign: 'center',
              padding: '40px',
              color: 'color.green.500',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Session with Mock Data Example
 *
 * Demonstrates the component with initial session data
 */
export const MockDataDemo = () => {
  const mockSessions: AgentSessionType[] = [
    {
      id: 'session-1',
      userId: 'user123',
      appName: 'demo-agent',
      state: {},
      events: [],
      createdAt: Date.now() - 86400000, // 1 day ago
      updatedAt: Date.now() - 3600000, // 1 hour ago
      metadata: {
        title: 'Customer Support Chat',
        description: 'Helping customer with product questions',
        tags: ['support', 'product', 'urgent'],
        messageCount: 15,
        lastActivity: Date.now() - 3600000,
      },
    },
    {
      id: 'session-2',
      userId: 'user123',
      appName: 'demo-agent',
      state: {},
      events: [],
      createdAt: Date.now() - 172800000, // 2 days ago
      updatedAt: Date.now() - 7200000, // 2 hours ago
      metadata: {
        title: 'Code Review Assistant',
        description: 'Reviewing pull request and suggesting improvements',
        tags: ['code-review', 'development'],
        messageCount: 8,
        lastActivity: Date.now() - 7200000,
      },
    },
    {
      id: 'session-3',
      userId: 'user123',
      appName: 'demo-agent',
      state: {},
      events: [],
      createdAt: Date.now() - 259200000, // 3 days ago
      updatedAt: Date.now() - 10800000, // 3 hours ago
      metadata: {
        title: 'Data Analysis Session',
        description: 'Analyzing sales data and generating insights',
        tags: ['analytics', 'data', 'sales'],
        messageCount: 23,
        lastActivity: Date.now() - 10800000,
      },
    },
  ];

  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        AgentSession with Mock Data
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentSession
          appName="demo-agent"
          userId="user123"
          initialSessions={mockSessions}
          selectedSessionId="session-1"
          enableSessionSearch={true}
          enableSessionTags={true}
          defaultSort={{ field: 'updatedAt', direction: 'desc' }}
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
 * Session Management Features Example
 *
 * Demonstrates import/export and advanced features
 */
export const FeaturesDemo = () => {
  const [importedSessions, setImportedSessions] = useState<AgentSessionType[]>(
    []
  );

  const handleSessionImport = (session: AgentSessionType) => {
    console.log('Session imported:', session);
    setImportedSessions((prev) => [...prev, session]);
  };

  const handleSessionExport = (session: AgentSessionType) => {
    console.log('Session exported:', session);
  };

  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        AgentSession Management Features
      </Text>

      {importedSessions.length > 0 && (
        <View
          padding={12}
          backgroundColor="color.blue.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.blue.200"
        >
          <Text fontSize={14} fontWeight="600" color="color.blue.800">
            Imported Sessions ({importedSessions.length})
          </Text>
          {importedSessions.map((session) => (
            <Text key={session.id} fontSize={12} color="color.blue.600">
              • {session.metadata?.title || session.id}
            </Text>
          ))}
        </View>
      )}

      <View
        height="400px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentSession
          appName="features-agent"
          userId="user123"
          enableSessionImport={true}
          enableSessionExport={true}
          enableSessionDelete={true}
          enableBulkOperations={true}
          onSessionImport={handleSessionImport}
          onSessionExport={handleSessionExport}
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
