/**
 * Agent Service Integration
 *
 * Enhanced service layer for backend communication with ADK agents.
 * Provides a unified interface for all agent-related operations.
 */

import React from 'react';
import {
  AgentSession,
  AgentMessage,
  AgentRunRequest,
} from '../../../components/adk/AgentChat/AgentChat/AgentChat.props';

import {
  TraceEvent,
  TraceSpan,
  TraceMetrics,
} from '../../../components/adk/AgentTrace/AgentTrace/AgentTrace.props';

import {
  EvaluationRun,
  EvaluationTestCase,
  EvaluationMetric,
} from '../../../components/adk/AgentEval/AgentEval/AgentEval.props';

/**
 * Configuration for the Agent Service
 */
export interface AgentServiceConfig {
  baseUrl: string;
  timeout?: number;
  retryCount?: number;
  enableLogging?: boolean;
  apiKey?: string;
  headers?: Record<string, string>;
}

/**
 * Event listener types for real-time updates
 */
export type AgentEventListener = (event: any) => void;

/**
 * Enhanced Agent Service Class
 *
 * Provides a comprehensive interface for interacting with ADK agents,
 * including session management, messaging, tracing, and evaluation.
 */
export class AgentService {
  private config: AgentServiceConfig;
  private eventListeners: Map<string, AgentEventListener[]> = new Map();
  private activeConnections: Map<string, EventSource | WebSocket> = new Map();

  constructor(config: AgentServiceConfig) {
    this.config = {
      timeout: 30000,
      retryCount: 3,
      enableLogging: false,
      ...config,
    };
  }

  /**
   * Session Management
   */

  /**
   * Create a new agent session
   */
  async createSession(
    appName: string,
    userId: string,
    metadata?: any
  ): Promise<AgentSession> {
    const response = await this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify({ appName, userId, metadata }),
    });

    return response.json();
  }

  /**
   * Get session details
   */
  async getSession(sessionId: string): Promise<AgentSession> {
    const response = await this.request(`/sessions/${sessionId}`);
    return response.json();
  }

  /**
   * List sessions for a user
   */
  async listSessions(
    userId: string,
    appName?: string,
    limit = 50
  ): Promise<AgentSession[]> {
    const params = new URLSearchParams({ userId, limit: limit.toString() });
    if (appName) params.append('appName', appName);

    const response = await this.request(`/sessions?${params}`);
    return response.json();
  }

  /**
   * Delete a session
   */
  async deleteSession(sessionId: string): Promise<void> {
    await this.request(`/sessions/${sessionId}`, { method: 'DELETE' });
  }

  /**
   * Messaging
   */

  /**
   * Send a message to an agent (non-streaming)
   */
  async sendMessage(request: AgentRunRequest): Promise<any> {
    const response = await this.request('/run', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    return response.json();
  }

  /**
   * Send a message to an agent with streaming response
   */
  async sendMessageStreaming(
    request: AgentRunRequest,
    onMessage: (message: AgentMessage) => void,
    onError?: (error: Error) => void,
    onComplete?: () => void
  ): Promise<void> {
    const eventSource = new EventSource(`${this.config.baseUrl}/run_sse`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(request),
    } as any);

    this.activeConnections.set(`stream-${request.sessionId}`, eventSource);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        onError?.(error as Error);
      }
    };

    eventSource.onerror = (error) => {
      onError?.(new Error('Streaming connection error'));
      eventSource.close();
      this.activeConnections.delete(`stream-${request.sessionId}`);
    };

    eventSource.addEventListener('complete', () => {
      onComplete?.();
      eventSource.close();
      this.activeConnections.delete(`stream-${request.sessionId}`);
    });
  }

  /**
   * Cancel a streaming request
   */
  cancelStreaming(sessionId: string): void {
    const connection = this.activeConnections.get(`stream-${sessionId}`);
    if (connection) {
      connection.close();
      this.activeConnections.delete(`stream-${sessionId}`);
    }
  }

  /**
   * Tracing
   */

  /**
   * Get trace events for a session
   */
  async getTraceEvents(
    sessionId: string,
    filters?: {
      eventTypes?: string[];
      startTime?: number;
      endTime?: number;
      limit?: number;
    }
  ): Promise<TraceEvent[]> {
    const params = new URLSearchParams({ sessionId });

    if (filters?.eventTypes) {
      params.append('eventTypes', filters.eventTypes.join(','));
    }
    if (filters?.startTime) {
      params.append('startTime', filters.startTime.toString());
    }
    if (filters?.endTime) {
      params.append('endTime', filters.endTime.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    const response = await this.request(`/trace/events?${params}`);
    return response.json();
  }

  /**
   * Get trace spans for a session
   */
  async getTraceSpans(sessionId: string): Promise<TraceSpan[]> {
    const response = await this.request(`/trace/spans?sessionId=${sessionId}`);
    return response.json();
  }

  /**
   * Get trace metrics for a session
   */
  async getTraceMetrics(sessionId: string): Promise<TraceMetrics> {
    const response = await this.request(
      `/trace/metrics?sessionId=${sessionId}`
    );
    return response.json();
  }

  /**
   * Subscribe to real-time trace updates
   */
  subscribeToTraceUpdates(
    sessionId: string,
    onUpdate: (update: any) => void,
    onError?: (error: Error) => void
  ): void {
    const protocol = this.config.baseUrl.startsWith('https') ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${this.config.baseUrl.replace(
      /^https?:\/\//,
      ''
    )}/trace/ws?sessionId=${sessionId}`;

    const ws = new WebSocket(wsUrl);
    this.activeConnections.set(`trace-${sessionId}`, ws);

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        onUpdate(update);
      } catch (error) {
        onError?.(error as Error);
      }
    };

    ws.onerror = (error) => {
      onError?.(new Error('WebSocket connection error'));
    };

    ws.onclose = () => {
      this.activeConnections.delete(`trace-${sessionId}`);
    };
  }

  /**
   * Evaluation
   */

  /**
   * Create a new evaluation
   */
  async createEvaluation(
    name: string,
    appName: string,
    userId: string,
    testCases: EvaluationTestCase[],
    metrics: EvaluationMetric[],
    config?: any
  ): Promise<EvaluationRun> {
    const response = await this.request('/evaluations', {
      method: 'POST',
      body: JSON.stringify({
        name,
        appName,
        userId,
        testCases,
        metrics,
        config,
      }),
    });

    return response.json();
  }

  /**
   * Start an evaluation
   */
  async startEvaluation(evaluationId: string): Promise<void> {
    await this.request(`/evaluations/${evaluationId}/start`, {
      method: 'POST',
    });
  }

  /**
   * Cancel an evaluation
   */
  async cancelEvaluation(evaluationId: string): Promise<void> {
    await this.request(`/evaluations/${evaluationId}/cancel`, {
      method: 'POST',
    });
  }

  /**
   * Get evaluation details
   */
  async getEvaluation(evaluationId: string): Promise<EvaluationRun> {
    const response = await this.request(`/evaluations/${evaluationId}`);
    return response.json();
  }

  /**
   * List evaluations
   */
  async listEvaluations(
    appName: string,
    userId: string,
    limit = 50
  ): Promise<EvaluationRun[]> {
    const params = new URLSearchParams({
      appName,
      userId,
      limit: limit.toString(),
    });
    const response = await this.request(`/evaluations?${params}`);
    return response.json();
  }

  /**
   * Delete an evaluation
   */
  async deleteEvaluation(evaluationId: string): Promise<void> {
    await this.request(`/evaluations/${evaluationId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Subscribe to evaluation updates
   */
  subscribeToEvaluationUpdates(
    userId: string,
    onUpdate: (update: any) => void,
    onError?: (error: Error) => void
  ): void {
    const protocol = this.config.baseUrl.startsWith('https') ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${this.config.baseUrl.replace(
      /^https?:\/\//,
      ''
    )}/evaluations/ws?userId=${userId}`;

    const ws = new WebSocket(wsUrl);
    this.activeConnections.set(`eval-${userId}`, ws);

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        onUpdate(update);
      } catch (error) {
        onError?.(error as Error);
      }
    };

    ws.onerror = (error) => {
      onError?.(new Error('WebSocket connection error'));
    };

    ws.onclose = () => {
      this.activeConnections.delete(`eval-${userId}`);
    };
  }

  /**
   * Utility Methods
   */

  /**
   * Make an HTTP request with retry logic
   */
  private async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    let lastError: Error;

    for (let attempt = 0; attempt <= this.config.retryCount!; attempt++) {
      try {
        if (this.config.enableLogging) {
          console.log(
            `[AgentService] ${requestOptions.method || 'GET'} ${url}`,
            requestOptions
          );
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.config.timeout
        );

        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (this.config.enableLogging) {
          console.log(`[AgentService] Response:`, response);
        }

        return response;
      } catch (error) {
        lastError = error as Error;

        if (attempt < this.config.retryCount!) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }

  /**
   * Get default headers for requests
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    return headers;
  }

  /**
   * Event Management
   */

  /**
   * Add event listener
   */
  addEventListener(event: string, listener: AgentEventListener): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  /**
   * Remove event listener
   */
  removeEventListener(event: string, listener: AgentEventListener): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to listeners
   */
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }

  /**
   * Cleanup all connections and listeners
   */
  cleanup(): void {
    // Close all active connections
    this.activeConnections.forEach((connection) => {
      connection.close();
    });
    this.activeConnections.clear();

    // Clear all event listeners
    this.eventListeners.clear();
  }
}

/**
 * Default Agent Service Instance
 *
 * Pre-configured service instance for common use cases
 */
export const createAgentService = (
  config: AgentServiceConfig
): AgentService => {
  return new AgentService(config);
};

/**
 * Agent Service Hook for React Components
 *
 * Provides a convenient way to use the Agent Service in React components
 */
export const useAgentServiceHook = (config: AgentServiceConfig) => {
  const [service] = React.useState(() => createAgentService(config));

  React.useEffect(() => {
    return () => {
      service.cleanup();
    };
  }, [service]);

  return service;
};
