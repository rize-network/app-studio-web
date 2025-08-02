/**
 * Agent Services
 *
 * Enhanced service layer for backend communication with ADK agents.
 * Provides a unified interface for all agent-related operations.
 */

// Core Service
export {
  AgentService,
  createAgentService,
  useAgentServiceHook,
  type AgentServiceConfig,
  type AgentEventListener,
} from './AgentService';

// React Provider and Hooks
export {
  AgentServiceProvider,
  useAgentService,
  useAgentOperations,
  ConnectionStatus,
  type AgentServiceProviderProps,
  type ConnectionStatusProps,
} from './AgentServiceProvider';

// Utilities
export {
  MessageUtils,
  TraceUtils,
  EvaluationUtils,
  FileUtils,
  FormatUtils,
} from './AgentServiceUtils';

/**
 * Service Configuration Presets
 */
export const ServicePresets = {
  /**
   * Development configuration
   */
  development: {
    baseUrl: 'http://localhost:8000',
    timeout: 30000,
    retryCount: 3,
    enableLogging: true,
  },

  /**
   * Production configuration
   */
  production: {
    baseUrl: process.env.REACT_APP_AGENT_API_URL || 'https://api.example.com',
    timeout: 30000,
    retryCount: 3,
    enableLogging: false,
  },

  /**
   * Testing configuration
   */
  testing: {
    baseUrl: 'http://localhost:8001',
    timeout: 10000,
    retryCount: 1,
    enableLogging: true,
  },
};

/**
 * Default Service Configuration
 */
export const defaultServiceConfig = ServicePresets.development;
