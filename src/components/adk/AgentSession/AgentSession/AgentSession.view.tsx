import React from 'react';
import { View, Vertical, Horizontal, Text, Button } from 'app-studio';
import { AgentSessionProps } from './AgentSession.props';
import { useAgentSession } from './AgentSession.state';
import { DefaultAgentSessionStyles } from './AgentSession.style';
import { SessionListItem } from './SessionListItem';
import { SessionActions } from './SessionActions';
import { SessionFilters } from './SessionFilters';
import { Alert } from 'src/components/Alert/Alert';
import { Loader } from 'src/components/Loader/Loader';
import { TextField } from 'src/components/Form/Form';

export interface AgentSessionViewProps
  extends AgentSessionProps,
    ReturnType<typeof useAgentSession> {}

/**
 * AgentSession View Component
 *
 * Renders the complete session management interface with session list, actions, and filters
 */
const AgentSessionView: React.FC<AgentSessionViewProps> = ({
  // Props
  showSessionHistory = true,
  enableSessionImport = true,
  enableSessionExport = true,
  enableSessionDelete = true,
  enableSessionSearch = true,
  showSessionInfo = true,
  showSessionActions = true,
  showCreateButton = true,
  showRefreshButton = true,
  compactMode = false,
  views,
  ariaLabel = 'Agent Session Manager',
  ariaDescribedBy,

  // State from hook
  sessions,
  selectedSession,
  isLoading,
  isCreating,
  error,
  searchQuery,
  filters,
  sortOptions,
  fetchSessions,
  createSession,
  selectSession,
  deleteSession,
  exportSession,
  handleFileImport,
  setSearchQuery,
  setFilters,
  setSortOptions,
  setError,
  fileInputRef,
  handleFileSelect,

  ...props
}) => {
  /**
   * Handle session creation
   */
  const handleCreateSession = async () => {
    try {
      await createSession({
        title: `Session ${new Date().toLocaleString()}`,
        description: 'New agent session',
      });
    } catch (error) {
      // Error is handled in the hook
    }
  };

  /**
   * Handle session selection
   */
  const handleSessionSelect = (sessionId: string) => {
    selectSession(sessionId);
  };

  /**
   * Handle session deletion
   */
  const handleSessionDelete = async (sessionId: string) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      await deleteSession(sessionId);
    }
  };

  /**
   * Handle session export
   */
  const handleSessionExport = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      exportSession(session);
    }
  };

  /**
   * Format session date
   */
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View
      {...DefaultAgentSessionStyles.container}
      {...views?.container}
      {...props}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {/* Header */}
      <View {...DefaultAgentSessionStyles.header} {...views?.header}>
        <Horizontal justifyContent="space-between" alignItems="center">
          <Vertical gap={4}>
            <Text fontSize="lg" fontWeight="600">
              Agent Sessions
            </Text>
            <Text fontSize="sm" color="color.gray.600">
              {sessions.length} session{sessions.length !== 1 ? 's' : ''}
            </Text>
          </Vertical>

          <Horizontal gap={8}>
            {showRefreshButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSessions}
                disabled={isLoading}
                aria-label="Refresh sessions"
              >
                🔄
              </Button>
            )}

            {showCreateButton && (
              <Button
                variant="filled"
                size="sm"
                onClick={handleCreateSession}
                disabled={isCreating}
                aria-label="Create new session"
              >
                {isCreating ? <Loader size="xs" /> : '+ New Session'}
              </Button>
            )}
          </Horizontal>
        </Horizontal>
      </View>

      {/* Error Display */}
      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      {enableSessionSearch && (
        <View
          padding={16}
          borderBottom="1px solid"
          borderBottomColor="color.gray.200"
        >
          <Vertical gap={12}>
            <TextField
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={setSearchQuery}
              views={{
                container: views?.searchInput,
              }}
            />

            <SessionFilters
              filters={filters}
              sortOptions={sortOptions}
              onFiltersChange={setFilters}
              onSortChange={setSortOptions}
            />
          </Vertical>
        </View>
      )}

      {/* Session Actions */}
      {showSessionActions && (
        <SessionActions
          enableImport={enableSessionImport}
          enableExport={enableSessionExport}
          selectedSession={selectedSession}
          onImport={handleFileImport}
          onExport={handleSessionExport}
          views={{
            container: views?.sessionActions,
            importButton: views?.importButton,
            exportButton: views?.exportButton,
          }}
        />
      )}

      {/* Session List */}
      <View {...DefaultAgentSessionStyles.sessionList} {...views?.sessionList}>
        {isLoading && sessions.length === 0 ? (
          <View
            {...DefaultAgentSessionStyles.loadingState}
            {...views?.loadingState}
          >
            <Loader size="md" />
            <Text color="color.gray.600">Loading sessions...</Text>
          </View>
        ) : sessions.length === 0 ? (
          <View
            {...DefaultAgentSessionStyles.emptyState}
            {...views?.emptyState}
          >
            <Text fontSize="lg" color="color.gray.500" textAlign="center">
              No sessions found
            </Text>
            <Text fontSize="sm" color="color.gray.400" textAlign="center">
              Create a new session to get started
            </Text>
          </View>
        ) : (
          <Vertical gap={8} padding={16}>
            {sessions.map((session) => (
              <SessionListItem
                key={session.id}
                session={session}
                isSelected={selectedSession?.id === session.id}
                compactMode={compactMode}
                showInfo={showSessionInfo}
                enableDelete={enableSessionDelete}
                enableExport={enableSessionExport}
                onSelect={() => handleSessionSelect(session.id)}
                onDelete={() => handleSessionDelete(session.id)}
                onExport={() => handleSessionExport(session.id)}
                formatDate={formatDate}
                views={{
                  container:
                    selectedSession?.id === session.id
                      ? views?.activeSessionItem
                      : views?.sessionItem,
                  info: views?.sessionInfo,
                  deleteButton: views?.deleteButton,
                  exportButton: views?.exportButton,
                }}
              />
            ))}
          </Vertical>
        )}
      </View>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </View>
  );
};

export default AgentSessionView;
