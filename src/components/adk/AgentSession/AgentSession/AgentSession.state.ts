import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AgentSessionProps,
  AgentSession,
  SessionFilters,
  SessionSortOptions,
  SessionExportData,
  SessionImportOptions,
} from './AgentSession.props';
import { generateId } from '../../../../utils/generateId';

/**
 * Custom hook for managing AgentSession state and operations
 */
export const useAgentSession = (props: AgentSessionProps) => {
  const {
    appName,
    userId,
    apiBaseUrl = '',
    maxSessions = 100,
    refreshInterval = 30000,
    enableAutoRefresh = false,
    initialSessions = [],
    selectedSessionId,
    defaultFilters = {},
    defaultSort = { field: 'updatedAt', direction: 'desc' },
    onSessionSelect,
    onSessionCreate,
    onSessionUpdate,
    onSessionDelete,
    onSessionImport,
    onSessionExport,
    onError,
    onRefresh,
  } = props;

  // Core state
  const [sessions, setSessions] = useState<AgentSession[]>(initialSessions);
  const [selectedSession, setSelectedSession] = useState<AgentSession | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(
    defaultFilters.searchQuery || ''
  );
  const [filters, setFilters] = useState<SessionFilters>(defaultFilters);
  const [sortOptions, setSortOptions] =
    useState<SessionSortOptions>(defaultSort);

  // Refs
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Fetch sessions from API
   */
  const fetchSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${apiBaseUrl}/sessions?userId=${userId}&appName=${appName}&limit=${maxSessions}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch sessions: ${response.statusText}`);
      }

      const data: AgentSession[] = await response.json();
      setSessions(data);
      onRefresh?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, userId, appName, maxSessions, onRefresh, onError]);

  /**
   * Create a new session
   */
  const createSession = useCallback(
    async (metadata?: {
      title?: string;
      description?: string;
      tags?: string[];
    }) => {
      try {
        setIsCreating(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            appName,
            metadata,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create session: ${response.statusText}`);
        }

        const newSession: AgentSession = await response.json();
        setSessions((prev) => [newSession, ...prev]);
        setSelectedSession(newSession);
        onSessionCreate?.(newSession);
        onSessionSelect?.(newSession);

        return newSession;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
        throw error;
      } finally {
        setIsCreating(false);
      }
    },
    [apiBaseUrl, userId, appName, onSessionCreate, onSessionSelect, onError]
  );

  /**
   * Select a session
   */
  const selectSession = useCallback(
    async (sessionId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // First try to find in current sessions
        let session = sessions.find((s) => s.id === sessionId);

        // If not found, fetch from API
        if (!session) {
          const response = await fetch(`${apiBaseUrl}/sessions/${sessionId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch session: ${response.statusText}`);
          }
          session = await response.json();
        }

        if (session) {
          setSelectedSession(session);
          onSessionSelect?.(session);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [sessions, apiBaseUrl, onSessionSelect, onError]
  );

  /**
   * Delete a session
   */
  const deleteSession = useCallback(
    async (sessionId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/sessions/${sessionId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete session: ${response.statusText}`);
        }

        setSessions((prev) => prev.filter((s) => s.id !== sessionId));

        if (selectedSession?.id === sessionId) {
          setSelectedSession(null);
        }

        onSessionDelete?.(sessionId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiBaseUrl, selectedSession, onSessionDelete, onError]
  );

  /**
   * Export session to JSON
   */
  const exportSession = useCallback(
    (session: AgentSession) => {
      try {
        const exportData: SessionExportData = {
          session,
          exportedAt: Date.now(),
          exportedBy: userId,
          version: '1.0.0',
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `session-${session.id}-${
          new Date().toISOString().split('T')[0]
        }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
        onSessionExport?.(session);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to export session');
        setError(error.message);
        onError?.(error);
      }
    },
    [userId, onSessionExport, onError]
  );

  /**
   * Import session from JSON file
   */
  const importSession = useCallback(
    async (file: File, options: SessionImportOptions = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const text = await file.text();
        const importData: SessionExportData = JSON.parse(text);

        if (!importData.session) {
          throw new Error('Invalid session file format');
        }

        let session = importData.session;

        // Generate new ID if not preserving
        if (!options.preserveIds) {
          session = { ...session, id: generateId() };
        }

        // Update timestamps if requested
        if (options.updateTimestamps) {
          const now = Date.now();
          session = { ...session, createdAt: now, updatedAt: now };
        }

        // Check if session already exists
        const existingSession = sessions.find((s) => s.id === session.id);
        if (existingSession && !options.overwriteExisting) {
          throw new Error(
            'Session already exists. Enable overwrite to replace it.'
          );
        }

        // Import via API
        const response = await fetch(`${apiBaseUrl}/sessions/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session, options }),
        });

        if (!response.ok) {
          throw new Error(`Failed to import session: ${response.statusText}`);
        }

        const importedSession: AgentSession = await response.json();

        if (existingSession) {
          setSessions((prev) =>
            prev.map((s) => (s.id === importedSession.id ? importedSession : s))
          );
        } else {
          setSessions((prev) => [importedSession, ...prev]);
        }

        onSessionImport?.(importedSession);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to import session');
        setError(error.message);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [sessions, apiBaseUrl, onSessionImport, onError]
  );

  /**
   * Filter and sort sessions
   */
  const getFilteredAndSortedSessions = useCallback(() => {
    let filtered = [...sessions];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (session) =>
          session.metadata?.title?.toLowerCase().includes(query) ||
          session.metadata?.description?.toLowerCase().includes(query) ||
          session.metadata?.tags?.some((tag) =>
            tag.toLowerCase().includes(query)
          ) ||
          session.id.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    if (filters.dateRange) {
      filtered = filtered.filter(
        (session) =>
          session.createdAt >= filters.dateRange!.start.getTime() &&
          session.createdAt <= filters.dateRange!.end.getTime()
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((session) =>
        session.metadata?.tags?.some((tag) => filters.tags!.includes(tag))
      );
    }

    if (filters.messageCountRange) {
      filtered = filtered.filter((session) => {
        const count = session.metadata?.messageCount || 0;
        return (
          count >= filters.messageCountRange!.min &&
          count <= filters.messageCountRange!.max
        );
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortOptions.field) {
        case 'title':
          aValue = a.metadata?.title || '';
          bValue = b.metadata?.title || '';
          break;
        case 'messageCount':
          aValue = a.metadata?.messageCount || 0;
          bValue = b.metadata?.messageCount || 0;
          break;
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case 'updatedAt':
        default:
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
      }

      if (sortOptions.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [sessions, searchQuery, filters, sortOptions]);

  /**
   * Handle file import
   */
  const handleFileImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        importSession(file);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [importSession]
  );

  /**
   * Initialize sessions on mount
   */
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  /**
   * Set up auto-refresh
   */
  useEffect(() => {
    if (enableAutoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(fetchSessions, refreshInterval);
      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
    return undefined;
  }, [enableAutoRefresh, refreshInterval, fetchSessions]);

  /**
   * Select initial session
   */
  useEffect(() => {
    if (selectedSessionId && sessions.length > 0 && !selectedSession) {
      selectSession(selectedSessionId);
    }
  }, [selectedSessionId, sessions, selectedSession, selectSession]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return {
    // State
    sessions: getFilteredAndSortedSessions(),
    selectedSession,
    isLoading,
    isCreating,
    error,
    searchQuery,
    filters,
    sortOptions,

    // Actions
    fetchSessions,
    createSession,
    selectSession,
    deleteSession,
    exportSession,
    importSession,
    handleFileImport,
    setSearchQuery,
    setFilters,
    setSortOptions,
    setError,

    // Refs
    fileInputRef,

    // Event handlers
    handleFileSelect,
  };
};
