import { useState, useEffect, useCallback } from 'react';
import {
  useAdkControllerCreateSessionService,
  useAdkControllerListSessionsService,
  useAdkControllerGetSessionService,
  useAdkControllerDeleteSessionService,
  useAdkControllerRunAgentService,
  useAdkControllerRunAgentStreamingService,
  useAdkControllerHealthCheckService,
  useAdkControllerGetServiceInfoService,
} from '../../services/api/services/AdkService';
import { useAuthStore } from '../../stores/AuthStore';
import type {
  CreateSessionParams,
  AgentRunRequest,
  SessionResponse,
} from '../../services/api';

/**
 * Custom hook for ADK operations
 * Integrates with the existing ADK service and auth store
 */
export const useAdk = () => {
  const { isAuthentificated, user } = useAuthStore();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionResponse[]>([]);

  // Health check service
  const healthCheckService = useAdkControllerHealthCheckService({
    onSuccess: (data) => {
      console.log('ADK service is healthy:', data);
    },
    onError: (error) => {
      console.error('ADK health check failed:', error);
    },
  });

  // Service info service
  const serviceInfoService = useAdkControllerGetServiceInfoService({
    onSuccess: (data) => {
      console.log('ADK service info:', data);
    },
    onError: (error) => {
      console.error('Failed to get ADK service info:', error);
    },
  });

  // Create session service
  const createSessionService = useAdkControllerCreateSessionService({
    onSuccess: (data) => {
      console.log('Session created:', data);
      setCurrentSessionId(data.id);
      // Refresh sessions list
      listSessionsService.run();
    },
    onError: (error) => {
      console.error('Failed to create session:', error);
    },
  });

  // List sessions service
  const listSessionsService = useAdkControllerListSessionsService({
    onSuccess: (data) => {
      console.log('Sessions loaded:', data);
      setSessions(data);
    },
    onError: (error) => {
      console.error('Failed to list sessions:', error);
    },
  });

  // Get session service
  const getSessionService = useAdkControllerGetSessionService({
    onSuccess: (data) => {
      console.log('Session loaded:', data);
    },
    onError: (error) => {
      console.error('Failed to get session:', error);
    },
  });

  // Delete session service
  const deleteSessionService = useAdkControllerDeleteSessionService({
    onSuccess: () => {
      console.log('Session deleted');
      // Clear current session if it was deleted
      if (currentSessionId) {
        setCurrentSessionId(null);
      }
      // Refresh sessions list
      listSessionsService.run();
    },
    onError: (error) => {
      console.error('Failed to delete session:', error);
    },
  });

  // Run agent service (non-streaming)
  const runAgentService = useAdkControllerRunAgentService({
    onSuccess: (data) => {
      console.log('Agent response:', data);
    },
    onError: (error) => {
      console.error('Agent run failed:', error);
    },
  });

  // Run agent streaming service
  const runAgentStreamingService = useAdkControllerRunAgentStreamingService({
    onSuccess: (data) => {
      console.log('Agent streaming response:', data);
    },
    onError: (error) => {
      console.error('Agent streaming failed:', error);
    },
  });

  // Initialize ADK services when authenticated
  useEffect(() => {
    if (isAuthentificated && user) {
      // Check health and get service info
      healthCheckService.run();
      serviceInfoService.run();
      // Load user sessions
      listSessionsService.run();
    }
  }, [isAuthentificated, user]);

  // Helper functions
  const createSession = useCallback(
    (params: CreateSessionParams) => {
      if (!isAuthentificated) {
        console.error('User must be authenticated to create session');
        return;
      }
      createSessionService.run(params);
    },
    [isAuthentificated, createSessionService]
  );

  const loadSessions = useCallback(
    (appName?: string) => {
      if (!isAuthentificated) {
        console.error('User must be authenticated to load sessions');
        return;
      }
      listSessionsService.run(appName);
    },
    [isAuthentificated, listSessionsService]
  );

  const loadSession = useCallback(
    (sessionId: string) => {
      if (!isAuthentificated) {
        console.error('User must be authenticated to load session');
        return;
      }
      getSessionService.run(sessionId);
      setCurrentSessionId(sessionId);
    },
    [isAuthentificated, getSessionService]
  );

  const deleteSession = useCallback(
    (sessionId: string) => {
      if (!isAuthentificated) {
        console.error('User must be authenticated to delete session');
        return;
      }
      deleteSessionService.run(sessionId);
    },
    [isAuthentificated, deleteSessionService]
  );

  const runAgent = useCallback(
    (request: AgentRunRequest) => {
      if (!isAuthentificated) {
        console.error('User must be authenticated to run agent');
        return;
      }
      runAgentService.run(request);
    },
    [isAuthentificated, runAgentService]
  );

  const runAgentStreaming = useCallback(
    (request: AgentRunRequest) => {
      if (!isAuthentificated) {
        console.error('User must be authenticated to run agent streaming');
        return;
      }
      runAgentStreamingService.run(request);
    },
    [isAuthentificated, runAgentStreamingService]
  );

  const checkHealth = useCallback(() => {
    healthCheckService.run();
  }, [healthCheckService]);

  const getServiceInfo = useCallback(() => {
    serviceInfoService.run();
  }, [serviceInfoService]);

  return {
    // State
    isAuthenticated: isAuthentificated,
    user,
    currentSessionId,
    sessions,

    // Actions
    createSession,
    loadSessions,
    loadSession,
    deleteSession,
    runAgent,
    runAgentStreaming,
    checkHealth,
    getServiceInfo,
    setCurrentSessionId,

    // Service states
    isCreatingSession: createSessionService.loading,
    isLoadingSessions: listSessionsService.loading,
    isLoadingSession: getSessionService.loading,
    isDeletingSession: deleteSessionService.loading,
    isRunningAgent: runAgentService.loading,
    isRunningAgentStreaming: runAgentStreamingService.loading,
    isCheckingHealth: healthCheckService.loading,
    isLoadingServiceInfo: serviceInfoService.loading,

    // Service data
    sessionData: getSessionService.data,
    agentResponse: runAgentService.data,
    agentStreamingResponse: runAgentStreamingService.data,
    healthData: healthCheckService.data,
    serviceInfo: serviceInfoService.data,

    // Service errors
    createSessionError: createSessionService.error,
    listSessionsError: listSessionsService.error,
    getSessionError: getSessionService.error,
    deleteSessionError: deleteSessionService.error,
    runAgentError: runAgentService.error,
    runAgentStreamingError: runAgentStreamingService.error,
    healthError: healthCheckService.error,
    serviceInfoError: serviceInfoService.error,
  };
};
