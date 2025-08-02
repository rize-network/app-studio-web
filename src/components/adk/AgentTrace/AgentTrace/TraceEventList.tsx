import React from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { TraceEvent } from './AgentTrace.props';
import { DefaultAgentTraceStyles } from './AgentTrace.style';

export interface TraceEventListProps {
  events: TraceEvent[];
  selectedEvent?: TraceEvent | null;
  onEventSelect: (eventId: string) => void;
  showDetails?: boolean;
  compactMode?: boolean;
  views?: {
    container?: any;
    eventItem?: any;
    selectedEventItem?: any;
  };
}

/**
 * TraceEventList Component
 *
 * Renders a list of trace events with selection and detail display
 */
export const TraceEventList: React.FC<TraceEventListProps> = ({
  events,
  selectedEvent,
  onEventSelect,
  showDetails = true,
  compactMode = false,
  views = {},
}) => {
  /**
   * Get event type badge style
   */
  const getEventTypeStyle = (type: string) => {
    const baseStyle = DefaultAgentTraceStyles.eventType;

    switch (type) {
      case 'llm_request':
        return { ...baseStyle, ...DefaultAgentTraceStyles.eventTypeRequest };
      case 'llm_response':
        return { ...baseStyle, ...DefaultAgentTraceStyles.eventTypeResponse };
      case 'function_call':
      case 'function_response':
        return { ...baseStyle, ...DefaultAgentTraceStyles.eventTypeFunction };
      case 'error':
        return { ...baseStyle, ...DefaultAgentTraceStyles.eventTypeError };
      default:
        return { ...baseStyle, ...DefaultAgentTraceStyles.eventTypeSystem };
    }
  };

  /**
   * Format timestamp
   */
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    } as Intl.DateTimeFormatOptions);
  };

  /**
   * Format duration
   */
  const formatDuration = (duration?: number) => {
    if (!duration) return '';
    if (duration < 1000) return `${duration.toFixed(1)}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  /**
   * Get event icon
   */
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'llm_request':
        return '🤖';
      case 'llm_response':
        return '💬';
      case 'function_call':
        return '🔧';
      case 'function_response':
        return '✅';
      case 'user_input':
        return '👤';
      case 'agent_output':
        return '🎯';
      case 'error':
        return '❌';
      case 'system':
        return '⚙️';
      default:
        return '📝';
    }
  };

  /**
   * Render event data preview
   */
  const renderEventDataPreview = (event: TraceEvent) => {
    if (!showDetails) return null;

    let preview = '';
    try {
      if (typeof event.data === 'string') {
        preview =
          event.data.length > 100
            ? event.data.substring(0, 100) + '...'
            : event.data;
      } else if (event.data) {
        const dataStr = JSON.stringify(event.data);
        preview =
          dataStr.length > 100 ? dataStr.substring(0, 100) + '...' : dataStr;
      }
    } catch (err) {
      preview = '[Complex data structure]';
    }

    return preview;
  };

  return (
    <View {...DefaultAgentTraceStyles.eventList} {...views.container}>
      <Vertical gap={compactMode ? 4 : 8}>
        {events.map((event) => {
          const isSelected = selectedEvent?.id === event.id;
          const containerStyle = isSelected
            ? {
                ...DefaultAgentTraceStyles.selectedEventItem,
                ...views.selectedEventItem,
              }
            : { ...DefaultAgentTraceStyles.eventItem, ...views.eventItem };

          return (
            <View
              key={event.id}
              {...containerStyle}
              onClick={() => onEventSelect(event.id)}
            >
              <Vertical gap={compactMode ? 4 : 8}>
                {/* Event Header */}
                <Horizontal justifyContent="space-between" alignItems="center">
                  <Horizontal gap={8} alignItems="center">
                    <Text fontSize="16px">{getEventIcon(event.type)}</Text>
                    <View {...getEventTypeStyle(event.type)}>
                      <Text>{event.type.replace('_', ' ')}</Text>
                    </View>
                    {event.metadata?.title && (
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="color.gray.900"
                      >
                        {event.metadata.title}
                      </Text>
                    )}
                  </Horizontal>

                  <Horizontal gap={8} alignItems="center">
                    {event.duration && (
                      <Text {...DefaultAgentTraceStyles.eventDuration}>
                        {formatDuration(event.duration)}
                      </Text>
                    )}
                    <Text {...DefaultAgentTraceStyles.eventTimestamp}>
                      {formatTimestamp(event.timestamp)}
                    </Text>
                  </Horizontal>
                </Horizontal>

                {/* Event Description */}
                {event.metadata?.description && !compactMode && (
                  <Text fontSize="sm" color="color.gray.600">
                    {event.metadata.description}
                  </Text>
                )}

                {/* Event Data Preview */}
                {showDetails && !compactMode && (
                  <View {...DefaultAgentTraceStyles.eventContent}>
                    <Text
                      fontSize="sm"
                      fontFamily="Monaco, Consolas, monospace"
                    >
                      {renderEventDataPreview(event)}
                    </Text>
                  </View>
                )}

                {/* Event Tags */}
                {event.metadata?.tags &&
                  event.metadata.tags.length > 0 &&
                  !compactMode && (
                    <Horizontal gap={4} flexWrap="wrap">
                      {event.metadata.tags.map((tag, index) => (
                        <View key={index} {...DefaultAgentTraceStyles.tag}>
                          <Text fontSize="10px">{tag}</Text>
                        </View>
                      ))}
                    </Horizontal>
                  )}

                {/* Event Level Indicator */}
                {event.metadata?.level && event.metadata.level !== 'info' && (
                  <Horizontal alignItems="center" gap={4}>
                    <View
                      width="8px"
                      height="8px"
                      borderRadius="50%"
                      backgroundColor={
                        event.metadata.level === 'error'
                          ? 'color.red.500'
                          : event.metadata.level === 'warning'
                          ? 'color.yellow.500'
                          : 'color.blue.500'
                      }
                    />
                    <Text
                      fontSize="xs"
                      color="color.gray.600"
                      textTransform="uppercase"
                    >
                      {event.metadata.level}
                    </Text>
                  </Horizontal>
                )}

                {/* Expanded Details for Selected Event */}
                {isSelected && showDetails && (
                  <View {...DefaultAgentTraceStyles.eventMetadata}>
                    <Vertical gap={8}>
                      <Text
                        fontSize="xs"
                        fontWeight="600"
                        color="color.gray.700"
                      >
                        Event Details
                      </Text>

                      <Horizontal gap={16}>
                        <Text fontSize="xs" color="color.gray.600">
                          ID: {event.id}
                        </Text>
                        {event.parentId && (
                          <Text fontSize="xs" color="color.gray.600">
                            Parent: {event.parentId.slice(0, 8)}...
                          </Text>
                        )}
                      </Horizontal>

                      {event.attributes &&
                        Object.keys(event.attributes).length > 0 && (
                          <View>
                            <Text
                              fontSize="xs"
                              fontWeight="600"
                              color="color.gray.700"
                              marginBottom={4}
                            >
                              Attributes
                            </Text>
                            <View
                              padding={8}
                              backgroundColor="color.gray.100"
                              borderRadius="4px"
                              maxHeight="100px"
                              overflowY="auto"
                            >
                              <Text
                                fontSize="xs"
                                fontFamily="Monaco, Consolas, monospace"
                              >
                                {JSON.stringify(event.attributes, null, 2)}
                              </Text>
                            </View>
                          </View>
                        )}

                      <View>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="color.gray.700"
                          marginBottom={4}
                        >
                          Data
                        </Text>
                        <View
                          padding={8}
                          backgroundColor="color.gray.100"
                          borderRadius="4px"
                          maxHeight="150px"
                          overflowY="auto"
                        >
                          <Text
                            fontSize="xs"
                            fontFamily="Monaco, Consolas, monospace"
                          >
                            {typeof event.data === 'string'
                              ? event.data
                              : JSON.stringify(event.data, null, 2)}
                          </Text>
                        </View>
                      </View>
                    </Vertical>
                  </View>
                )}
              </Vertical>
            </View>
          );
        })}
      </Vertical>
    </View>
  );
};
