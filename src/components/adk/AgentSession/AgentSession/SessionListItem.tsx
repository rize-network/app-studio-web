import React from 'react';
import { View, Horizontal, Vertical, Text, Button } from 'app-studio';
import { AgentSession } from './AgentSession.props';
import { DefaultAgentSessionStyles } from './AgentSession.style';

export interface SessionListItemProps {
  session: AgentSession;
  isSelected: boolean;
  compactMode?: boolean;
  showInfo?: boolean;
  enableDelete?: boolean;
  enableExport?: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onExport: () => void;
  formatDate: (timestamp: number) => string;
  views?: {
    container?: any;
    info?: any;
    deleteButton?: any;
    exportButton?: any;
  };
}

/**
 * SessionListItem Component
 *
 * Renders individual session items in the session list
 */
export const SessionListItem: React.FC<SessionListItemProps> = ({
  session,
  isSelected,
  compactMode = false,
  showInfo = true,
  enableDelete = true,
  enableExport = true,
  onSelect,
  onDelete,
  onExport,
  formatDate,
  views = {},
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExport();
  };

  const containerStyles = compactMode
    ? DefaultAgentSessionStyles.compactSessionItem
    : isSelected
    ? DefaultAgentSessionStyles.activeSessionItem
    : DefaultAgentSessionStyles.sessionItem;

  return (
    <View {...containerStyles} {...views.container} onClick={onSelect}>
      <Horizontal gap={12} alignItems="flex-start">
        {/* Status Indicator */}
        <View
          {...DefaultAgentSessionStyles.statusIndicator}
          {...DefaultAgentSessionStyles.activeStatus}
          marginTop="4px"
        />

        {/* Session Info */}
        <View {...DefaultAgentSessionStyles.sessionInfo} {...views.info}>
          <Vertical gap={compactMode ? 2 : 4}>
            {/* Title */}
            <Text {...DefaultAgentSessionStyles.sessionTitle}>
              {session.metadata?.title || `Session ${session.id.slice(0, 8)}`}
            </Text>

            {/* Description (if not compact) */}
            {!compactMode && session.metadata?.description && (
              <Text {...DefaultAgentSessionStyles.sessionDescription}>
                {session.metadata.description}
              </Text>
            )}

            {/* Tags */}
            {session.metadata?.tags && session.metadata.tags.length > 0 && (
              <View {...DefaultAgentSessionStyles.tagContainer}>
                {session.metadata.tags
                  .slice(0, compactMode ? 2 : 5)
                  .map((tag, index) => (
                    <View key={index} {...DefaultAgentSessionStyles.tag}>
                      <Text fontSize="10px">{tag}</Text>
                    </View>
                  ))}
                {session.metadata.tags.length > (compactMode ? 2 : 5) && (
                  <View {...DefaultAgentSessionStyles.tag}>
                    <Text fontSize="10px">
                      +{session.metadata.tags.length - (compactMode ? 2 : 5)}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Metadata */}
            {showInfo && (
              <Horizontal gap={16} alignItems="center">
                <Text {...DefaultAgentSessionStyles.sessionMeta}>
                  {formatDate(session.updatedAt)}
                </Text>
                {session.metadata?.messageCount !== undefined && (
                  <Text {...DefaultAgentSessionStyles.sessionMeta}>
                    {session.metadata.messageCount} message
                    {session.metadata.messageCount !== 1 ? 's' : ''}
                  </Text>
                )}
                <Text {...DefaultAgentSessionStyles.sessionMeta}>
                  ID: {session.id.slice(0, 8)}...
                </Text>
              </Horizontal>
            )}
          </Vertical>
        </View>

        {/* Actions */}
        <Horizontal gap={4} alignItems="center">
          {enableExport && (
            <Button
              {...DefaultAgentSessionStyles.exportButton}
              {...views.exportButton}
              onClick={handleExport}
              aria-label={`Export session ${session.id}`}
              title="Export session"
            >
              📤
            </Button>
          )}

          {enableDelete && (
            <Button
              {...DefaultAgentSessionStyles.deleteButton}
              {...views.deleteButton}
              onClick={handleDelete}
              aria-label={`Delete session ${session.id}`}
              title="Delete session"
            >
              🗑️
            </Button>
          )}
        </Horizontal>
      </Horizontal>
    </View>
  );
};
