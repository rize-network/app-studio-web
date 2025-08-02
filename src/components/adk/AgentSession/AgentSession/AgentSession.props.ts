import React from 'react';
import { ViewProps } from 'app-studio';

/**
 * Core ADK Session Types
 */
export interface AgentSession {
  id: string;
  userId: string;
  appName: string;
  state: any;
  events: AgentEvent[];
  createdAt: number;
  updatedAt: number;
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
    messageCount?: number;
    lastActivity?: number;
  };
}

export interface AgentEvent {
  id: string;
  sessionId: string;
  type: string;
  data: any;
  timestamp: number;
  title?: string;
  author?: 'user' | 'bot' | 'system';
  content?: {
    parts?: any[];
  };
}

export interface SessionSummary {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
}

/**
 * Component View Customization
 */
export interface AgentSessionViews {
  container?: ViewProps;
  header?: ViewProps;
  sessionList?: ViewProps;
  sessionItem?: ViewProps;
  activeSessionItem?: ViewProps;
  sessionInfo?: ViewProps;
  sessionActions?: ViewProps;
  createButton?: ViewProps;
  deleteButton?: ViewProps;
  exportButton?: ViewProps;
  importButton?: ViewProps;
  refreshButton?: ViewProps;
  searchInput?: ViewProps;
  emptyState?: ViewProps;
  loadingState?: ViewProps;
  errorState?: ViewProps;
}

/**
 * Event Handlers
 */
export interface AgentSessionEventHandlers {
  onSessionSelect?: (session: AgentSession) => void;
  onSessionCreate?: (session: AgentSession) => void;
  onSessionUpdate?: (session: AgentSession) => void;
  onSessionDelete?: (sessionId: string) => void;
  onSessionImport?: (session: AgentSession) => void;
  onSessionExport?: (session: AgentSession) => void;
  onError?: (error: Error) => void;
  onRefresh?: () => void;
}

/**
 * Session Filter and Sort Options
 */
export interface SessionFilters {
  searchQuery?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  messageCountRange?: {
    min: number;
    max: number;
  };
  isActive?: boolean;
}

export interface SessionSortOptions {
  field: 'createdAt' | 'updatedAt' | 'messageCount' | 'title';
  direction: 'asc' | 'desc';
}

/**
 * Main AgentSession Props Interface
 */
export interface AgentSessionProps extends ViewProps, AgentSessionEventHandlers {
  // Required props
  appName: string;
  userId: string;

  // Optional configuration
  apiBaseUrl?: string;
  
  // Feature toggles
  showSessionHistory?: boolean;
  enableSessionImport?: boolean;
  enableSessionExport?: boolean;
  enableSessionDelete?: boolean;
  enableSessionSearch?: boolean;
  enableAutoRefresh?: boolean;
  
  // Limits and constraints
  maxSessions?: number;
  refreshInterval?: number; // in milliseconds
  
  // UI customization
  showSessionInfo?: boolean;
  showSessionActions?: boolean;
  showCreateButton?: boolean;
  showRefreshButton?: boolean;
  compactMode?: boolean;
  
  // Styling
  views?: AgentSessionViews;
  
  // Initial state
  initialSessions?: AgentSession[];
  selectedSessionId?: string;
  
  // Filtering and sorting
  defaultFilters?: SessionFilters;
  defaultSort?: SessionSortOptions;
  
  // Advanced features
  enableSessionTags?: boolean;
  enableSessionMetadata?: boolean;
  enableBulkOperations?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Session Action Types
 */
export type SessionAction = 
  | 'create'
  | 'select'
  | 'delete'
  | 'export'
  | 'import'
  | 'refresh'
  | 'search'
  | 'filter'
  | 'sort';

/**
 * Session Status Types
 */
export type SessionStatus = 
  | 'active'
  | 'inactive'
  | 'archived'
  | 'error';

/**
 * Session Import/Export Format
 */
export interface SessionExportData {
  session: AgentSession;
  exportedAt: number;
  exportedBy: string;
  version: string;
}

export interface SessionImportOptions {
  overwriteExisting?: boolean;
  preserveIds?: boolean;
  updateTimestamps?: boolean;
}
