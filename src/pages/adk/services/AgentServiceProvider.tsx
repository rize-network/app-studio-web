import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AgentService,
  AgentServiceConfig,
  createAgentService,
} from './AgentService';

/**
 * Agent Service Context
 *
 * Provides the Agent Service instance throughout the React component tree
 */
interface AgentServiceContextType {
  service: AgentService | null;
  isConnected: boolean;
  error: string | null;
  reconnect: () => void;
}

const AgentServiceContext = createContext<AgentServiceContextType>({
  service: null,
  isConnected: false,
  error: null,
  reconnect: () => {},
});

/**
 * Agent Service Provider Props
 */
export interface AgentServiceProviderProps {
  config: AgentServiceConfig;
  children: React.ReactNode;
  onConnectionChange?: (isConnected: boolean) => void;
  onError?: (error: Error) => void;
}

/**
 * Agent Service Provider Component
 *
 * Provides the Agent Service instance to all child components
 * and manages connection state and error handling.
 */
export const AgentServiceProvider: React.FC<AgentServiceProviderProps> = ({
  config,
  children,
  onConnectionChange,
  onError,
}) => {
  const [service, setService] = useState<AgentService | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize the service
   */
  const initializeService = () => {
    try {
      const newService = createAgentService(config);
      setService(newService);
      setIsConnected(true);
      setError(null);
      onConnectionChange?.(true);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to initialize service');
      setError(error.message);
      setIsConnected(false);
      onError?.(error);
      onConnectionChange?.(false);
    }
  };

  /**
   * Reconnect to the service
   */
  const reconnect = () => {
    if (service) {
      service.cleanup();
    }
    initializeService();
  };

  /**
   * Test connection to the service
   */
  const testConnection = async () => {
    if (!service) return;

    try {
      // Try to make a simple request to test connectivity
      await service.listSessions('test-user', undefined, 1);
      setIsConnected(true);
      setError(null);
      onConnectionChange?.(true);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Connection test failed');
      setError(error.message);
      setIsConnected(false);
      onError?.(error);
      onConnectionChange?.(false);
    }
  };

  /**
   * Initialize service on mount
   */
  useEffect(() => {
    initializeService();

    return () => {
      if (service) {
        service.cleanup();
      }
    };
  }, [config.baseUrl, config.apiKey]);

  /**
   * Test connection periodically
   */
  useEffect(() => {
    if (!service) return;

    const interval = setInterval(testConnection, 30000); // Test every 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [service]);

  const contextValue: AgentServiceContextType = {
    service,
    isConnected,
    error,
    reconnect,
  };

  return (
    <AgentServiceContext.Provider value={contextValue}>
      {children}
    </AgentServiceContext.Provider>
  );
};

/**
 * Hook to use the Agent Service
 *
 * Provides access to the Agent Service instance and connection state
 */
export const useAgentService = (): AgentServiceContextType => {
  const context = useContext(AgentServiceContext);

  if (!context) {
    throw new Error(
      'useAgentService must be used within an AgentServiceProvider'
    );
  }

  return context;
};

/**
 * Hook for Agent Service Operations
 *
 * Provides common operations with built-in error handling and loading states
 */
export const useAgentOperations = () => {
  const { service, isConnected } = useAgentService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Execute an operation with error handling
   */
  const executeOperation = async <T,>(
    operation: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    if (!service || !isConnected) {
      const error = new Error('Service not available');
      onError?.(error);
      setError(error.message);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Operation failed');
      onError?.(error);
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Session operations
   */
  const sessionOperations = {
    create: (appName: string, userId: string, metadata?: any) =>
      executeOperation(() => service!.createSession(appName, userId, metadata)),

    get: (sessionId: string) =>
      executeOperation(() => service!.getSession(sessionId)),

    list: (userId: string, appName?: string, limit?: number) =>
      executeOperation(() => service!.listSessions(userId, appName, limit)),

    delete: (sessionId: string) =>
      executeOperation(() => service!.deleteSession(sessionId)),
  };

  /**
   * Messaging operations
   */
  const messageOperations = {
    send: (request: any) =>
      executeOperation(() => service!.sendMessage(request)),

    sendStreaming: (
      request: any,
      onMessage: (message: any) => void,
      onComplete?: () => void
    ) =>
      executeOperation(() =>
        service!.sendMessageStreaming(request, onMessage, undefined, onComplete)
      ),

    cancelStreaming: (sessionId: string) => {
      service?.cancelStreaming(sessionId);
    },
  };

  /**
   * Trace operations
   */
  const traceOperations = {
    getEvents: (sessionId: string, filters?: any) =>
      executeOperation(() => service!.getTraceEvents(sessionId, filters)),

    getSpans: (sessionId: string) =>
      executeOperation(() => service!.getTraceSpans(sessionId)),

    getMetrics: (sessionId: string) =>
      executeOperation(() => service!.getTraceMetrics(sessionId)),

    subscribe: (sessionId: string, onUpdate: (update: any) => void) => {
      service?.subscribeToTraceUpdates(sessionId, onUpdate);
    },
  };

  /**
   * Evaluation operations
   */
  const evaluationOperations = {
    create: (
      name: string,
      appName: string,
      userId: string,
      testCases: any[],
      metrics: any[],
      config?: any
    ) =>
      executeOperation(() =>
        service!.createEvaluation(
          name,
          appName,
          userId,
          testCases,
          metrics,
          config
        )
      ),

    start: (evaluationId: string) =>
      executeOperation(() => service!.startEvaluation(evaluationId)),

    cancel: (evaluationId: string) =>
      executeOperation(() => service!.cancelEvaluation(evaluationId)),

    get: (evaluationId: string) =>
      executeOperation(() => service!.getEvaluation(evaluationId)),

    list: (appName: string, userId: string, limit?: number) =>
      executeOperation(() => service!.listEvaluations(appName, userId, limit)),

    delete: (evaluationId: string) =>
      executeOperation(() => service!.deleteEvaluation(evaluationId)),

    subscribe: (userId: string, onUpdate: (update: any) => void) => {
      service?.subscribeToEvaluationUpdates(userId, onUpdate);
    },
  };

  return {
    isLoading,
    error,
    setError,
    executeOperation,
    sessions: sessionOperations,
    messages: messageOperations,
    trace: traceOperations,
    evaluations: evaluationOperations,
  };
};

/**
 * Connection Status Component
 *
 * Displays the current connection status of the Agent Service
 */
export interface ConnectionStatusProps {
  showDetails?: boolean;
  onReconnect?: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  showDetails = false,
  onReconnect,
}) => {
  const { isConnected, error, reconnect } = useAgentService();

  const handleReconnect = () => {
    reconnect();
    onReconnect?.();
  };

  if (isConnected) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#0369a1',
        }}
      >
        <span style={{ color: '#059669' }}>●</span>
        <span>Connected</span>
        {showDetails && (
          <span style={{ fontSize: '12px', opacity: 0.8 }}>
            Agent service is online
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#fef2f2',
        border: '1px solid #f87171',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#dc2626',
      }}
    >
      <span style={{ color: '#dc2626' }}>●</span>
      <span>Disconnected</span>
      {showDetails && error && (
        <span style={{ fontSize: '12px', opacity: 0.8 }}>{error}</span>
      )}
      <button
        onClick={handleReconnect}
        style={{
          marginLeft: '8px',
          padding: '4px 8px',
          fontSize: '12px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reconnect
      </button>
    </div>
  );
};
