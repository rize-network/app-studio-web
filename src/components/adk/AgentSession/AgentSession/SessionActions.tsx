import React from 'react';
import { View, Horizontal, Button } from 'app-studio';
import { AgentSession } from './AgentSession.props';
import { DefaultAgentSessionStyles } from './AgentSession.style';

export interface SessionActionsProps {
  enableImport?: boolean;
  enableExport?: boolean;
  selectedSession?: AgentSession | null;
  onImport: () => void;
  onExport: (sessionId: string) => void;
  views?: {
    container?: any;
    importButton?: any;
    exportButton?: any;
  };
}

/**
 * SessionActions Component
 * 
 * Renders action buttons for session management (import, export, etc.)
 */
export const SessionActions: React.FC<SessionActionsProps> = ({
  enableImport = true,
  enableExport = true,
  selectedSession,
  onImport,
  onExport,
  views = {},
}) => {
  const handleExport = () => {
    if (selectedSession) {
      onExport(selectedSession.id);
    }
  };

  return (
    <View {...DefaultAgentSessionStyles.sessionActions} {...views.container}>
      <Horizontal gap={8} alignItems="center">
        {enableImport && (
          <Button
            {...DefaultAgentSessionStyles.importButton}
            {...views.importButton}
            onClick={onImport}
            aria-label="Import session from file"
            title="Import session from JSON file"
          >
            📥 Import
          </Button>
        )}
        
        {enableExport && (
          <Button
            {...DefaultAgentSessionStyles.exportButton}
            {...views.exportButton}
            onClick={handleExport}
            disabled={!selectedSession}
            aria-label="Export selected session"
            title="Export selected session to JSON file"
          >
            📤 Export
          </Button>
        )}
      </Horizontal>
    </View>
  );
};
