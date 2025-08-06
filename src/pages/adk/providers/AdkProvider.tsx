import React, { createContext, useContext, ReactNode } from 'react';
import { useAdk } from '../../../hooks/useAdk';

/**
 * ADK Context Type
 */
interface AdkContextType {
  // State
  isAuthenticated: boolean;
  user: any;
  currentSessionId: string | null;
  sessions: any[];

  // Actions
  createSession: (params: any) => void;
  loadSessions: (appName?: string) => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  runAgent: (request: any) => void;
  runAgentStreaming: (request: any) => void;
  checkHealth: () => void;
  getServiceInfo: () => void;
  setCurrentSessionId: (sessionId: string | null) => void;

  // Loading states
  isCreatingSession: boolean;
  isLoadingSessions: boolean;
  isLoadingSession: boolean;
  isDeletingSession: boolean;
  isRunningAgent: boolean;
  isRunningAgentStreaming: boolean;
  isCheckingHealth: boolean;
  isLoadingServiceInfo: boolean;

  // Data
  sessionData: any;
  agentResponse: any;
  agentStreamingResponse: any;
  healthData: any;
  serviceInfo: any;

  // Errors
  createSessionError: any;
  listSessionsError: any;
  getSessionError: any;
  deleteSessionError: any;
  runAgentError: any;
  runAgentStreamingError: any;
  healthError: any;
  serviceInfoError: any;

  // Connection status (for compatibility)
  isConnected: boolean;
  error: string | null;
}

/**
 * ADK Context
 */
const AdkContext = createContext<AdkContextType | undefined>(undefined);

/**
 * ADK Provider Props
 */
interface AdkProviderProps {
  children: ReactNode;
}

/**
 * ADK Provider Component
 *
 * Provides ADK functionality using the existing API services and auth store
 */
export const AdkProvider: React.FC<AdkProviderProps> = ({ children }) => {
  const adkHook = useAdk();

  // Create context value with compatibility layer
  const contextValue: AdkContextType = {
    ...adkHook,
    // Add compatibility properties
    isConnected: adkHook.isAuthenticated && !adkHook.healthError,
    error:
      adkHook.healthError?.message ||
      adkHook.createSessionError?.message ||
      adkHook.runAgentError?.message ||
      null,
  };

  return (
    <AdkContext.Provider value={contextValue}>{children}</AdkContext.Provider>
  );
};

/**
 * Hook to use ADK context
 */
export const useAdkContext = (): AdkContextType => {
  const context = useContext(AdkContext);

  if (context === undefined) {
    throw new Error('useAdkContext must be used within an AdkProvider');
  }

  return context;
};

/**
 * Legacy hook for compatibility with existing components
 */
export const useAgentService = () => {
  const context = useAdkContext();

  return {
    isConnected: context.isConnected,
    error: context.error,
    service: {
      // Legacy service methods for compatibility
      createSession: context.createSession,
      listSessions: context.loadSessions,
      getSession: context.loadSession,
      deleteSession: context.deleteSession,
      runAgent: context.runAgent,
      runAgentStreaming: context.runAgentStreaming,
      healthCheck: context.checkHealth,
      getServiceInfo: context.getServiceInfo,
    },
    // Additional state
    currentSessionId: context.currentSessionId,
    sessions: context.sessions,
    isCreatingSession: context.isCreatingSession,
    isLoadingSessions: context.isLoadingSessions,
    isRunningAgent: context.isRunningAgent,
    agentResponse: context.agentResponse,
    sessionData: context.sessionData,
  };
};
